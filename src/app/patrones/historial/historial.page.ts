import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IonContent, IonDatetimeButton, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AppService } from 'src/app/services/app.service';
import { UiService } from 'src/app/services/ui.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EstimacionesPatrones } from 'src/entities/EstimacionesPatrones';
import { TableClass } from 'src/app/shared/tableClass';
import { ComparativaComponent } from './comparativa/comparativa.component';
import { EstimacionesEstimado } from 'src/entities/EstimacionesEstimado';
import { EstimacionesObservado } from 'src/entities/EstimacionesObservado';
import { HistorialData, PatronesService } from '../patrones.service';
import { VerRegistroComponent } from './ver-registro/ver-registro.component';
import { UtilService } from 'src/app/services/util.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage extends TableClass implements OnInit, AfterViewInit {

  @ViewChild("content", { static: false })
  content: IonContent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['select',
    'opciones', 'fecha', 'v2m', 'ctotal', 'hfm', 'lineas',
    'distancia_lineas',
    'velocidadFajasEstimado', 'longitudLlamaFajasEstimado',
    'velocidadFlancosEstimado', 'longitudLlamaFlancosEstimado',
    'velocidadPuntosEstimado', 'longitudLlamaPuntosEstimado',
    'velocidadFajasObservado', 'longitudLlamaFajasObservado',
    'velocidadFlancosObservado', 'longitudLlamaFlancosObservado',
    'velocidadPuntosObservado', 'longitudLlamaPuntosObservado'];

  dataSource: MatTableDataSource<HistorialData>;

  @ViewChild(IonModal) modal: IonModal;

  button: IonDatetimeButton

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  estimaciones: HistorialData[] = [];

  data: EstimacionesPatrones[] = [];

  filterDate: Date;

  isFilterByDate: boolean;

  datesEnabled = [];

  constructor(public ui: UiService, private patronesService: PatronesService,
    private modalController: ModalController, private utilService: UtilService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.patronesService.getResultadosPatronesUpdated().subscribe(() => {
      this.loadData();
    });
  }

  get today() {
    return new Date().toISOString();
  }

  filterFecha = () => {
    this.isFilterByDate = !this.isFilterByDate
  };

  isEnableDay = (dateString: string) => {
    let index = this.datesEnabled.findIndex(date => date === dateString);
    return index !== -1;
  };

  filterDataByDate(date) {
    this.patronesService.getEstimacionesPatronesByDate(date.split('T')[0])
      .subscribe(data => {
        this.prepareDataToShow(data);
        this.renderTable();
      })
  }

  ngAfterViewInit() {
    this.translateService.get(['registros por pagina']).subscribe(translations => {
      this.paginator._intl.itemsPerPageLabel = translations['registros por pagina'];
    });
  }

  loadData() {
    this.patronesService.getAllEstimacionesPatrones()
      .subscribe(data => {
        this.prepareDataToShow(data);
        this.renderTable();
      })
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource(this.estimaciones);
    this.dataSource.paginator = this.paginator;
  }

  private prepareDataToShow(data: EstimacionesPatrones[]) {
    this.data = data;
    this.estimaciones = [];
    this.convertToDataTable(data);

    if (data.length === 0) {
      this.estimaciones = [];
    }
  }



  private convertToDataTable(data: EstimacionesPatrones[]) {
    data.forEach(row => {
      this.datesEnabled.push(row.fecha.split('T')[0]);

      this.estimaciones.push({
        id: row.id.toString(),
        fecha: row.fecha,
        velocidadViento: row.velocidadViento,
        cargaCombustibleFinoMuerto: row.cargaCombustibleFinoMuerto,
        cargaTotal: row.cargaTotal,
        numeroLineasEncendido: row.numeroLineasEncendido,
        distanciaLineasEncendido: row.distanciaLineasEncendido,
        resultadosEstimado: row.estimado,
        resultadosObservado: row.observado
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async verRegistro(registro: HistorialData) {
    const modal = await this.modalController.create({
      component: VerRegistroComponent,
      componentProps: {
        registro: registro
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async delete() {
    let continuar = true;

    const confirm = await this.ui.confirmationAlert("Confirmación",
      "¿Desea CONTINUAR y eliminar los elementos seleccionados?");

    if (confirm) {
      continuar = true;
    } else {
      continuar = false;
    }

    if (continuar) {
      const selectedLen = this.selection.selected.length;
      let count = 0;
      this.selection.selected.forEach((element: HistorialData) => {
        const index = this.data.findIndex(item => item.id.toString() === element.id)
        const estimacion = this.data[index];
        this.data.splice(index, 1);
        this.patronesService.deleteEstimacionPatrones(estimacion).subscribe(() => {
          count++
          if (count === selectedLen) {
            this.ui.presentToast("mensaje borrado");
            this.selection.clear();
            this.loadData();
          }
        })
      });
    }
  }

  async export() {
    this.ui.presentLoading("Exportando...");

    let blob = await this.utilService.generarInformeExcel(this.estimaciones);

    this.utilService.saveFile(blob, "AppRXfire");

    this.ui.dismissLoading();
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }

}

