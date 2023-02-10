import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IonContent, IonDatetimeButton, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AppService } from 'src/app/services/app.service';
import { UiService } from 'src/app/services/ui.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EstimacionesPatrones } from 'src/entities/EstimacionesPatrones';
import { TableClass } from 'src/app/shared/tableClass';
import { EstimacionesEstimado } from 'src/entities/EstimacionesEstimado';
import { EstimacionesObservado } from 'src/entities/EstimacionesObservado';
import { UtilService } from 'src/app/services/util.service';
import { SoflamadoService } from '../soflamado.service';
import { EstimacionesSoflamado } from 'src/entities/EstimacionesSoflamado';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage extends TableClass implements OnInit {

  @ViewChild("content", { static: false })
  content: IonContent;

  displayedColumns: string[] = ['select',
    'fecha', 'temp', 'alturaArbolado', 'alturaRama', 'hayHuecos',
    'localizacion', 'distanciaHuecos', 'alturaSoflamadoMedia', 'volumenSoflamado', 'alturaSoflamadoHuecos'];

  dataSource: MatTableDataSource<EstimacionesSoflamado>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(IonModal) modal: IonModal;

  button: IonDatetimeButton

  name: string;

  data: EstimacionesSoflamado[] = [];

  filterDate: Date;

  isFilterByDate: boolean;

  datesEnabled = [];

  constructor(public ui: UiService, private soflamadoService: SoflamadoService,
    private utilService: UtilService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.soflamadoService.getResultadosSoflamadoUpdated().subscribe(() => {
      this.loadData();
    })
  }

  get today() {
    return new Date().toISOString();
  }

  isEnableDay = (dateString: string) => {
    let index = this.datesEnabled.findIndex(date => date === dateString);
    return index !== -1;
  };

  filterFecha = () => {
    this.isFilterByDate = !this.isFilterByDate
  };

  filterDataByDate(date) {
    this.soflamadoService.getEstimacionesSoflamadoByDate(date.split('T')[0])
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
    this.soflamadoService.getAllEstimacionesSoflamado()
      .subscribe(data => {
        this.prepareDataToShow(data);
        this.renderTable();
      })
  }

  private renderTable() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  private prepareDataToShow(data: EstimacionesSoflamado[]) {
    data.forEach(row => {
      this.datesEnabled.push(row.fecha.split('T')[0]);
    })

    this.data = data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async verRegistro(registro) {
    /*const modal = await this.modalController.create({
      component: VerRegistroComponent,
      componentProps: {
        registro: registro
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }*/
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
      this.selection.selected.forEach((element: EstimacionesSoflamado) => {
        const index = this.data.findIndex(item => item.id === element.id)
        const estimacion = this.data[index];
        this.data.splice(index, 1);
        this.soflamadoService.deleteEstimacionSoflamado(estimacion).subscribe(() => {
          count++
          if (count === selectedLen) {
            this.ui.presentToast("Mensaje borrado");
            this.selection.clear();
            this.loadData();
          }
        })
      });
    }
  }

  async export() {
    this.ui.presentLoading("Exportando...");

    let blob = await this.utilService.generarInformeExcel(this.data);

    this.utilService.saveFile(blob, "AppRXfire");

    this.ui.dismissLoading();
  }

  ScrollToTop() {
    this.ui.scrollTop$(this.content);
  }

}

