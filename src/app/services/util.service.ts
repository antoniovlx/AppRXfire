import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";
import { TranslateService } from '@ngx-translate/core';
import { UiService } from './ui.service';
import { AppService } from './app.service';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import * as FileSaver from 'file-saver';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { firstValueFrom, Observable } from 'rxjs';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isMobile: boolean = false;

  constructor(private appService: AppService,
    private translateService: TranslateService,
    private uiService: UiService, private fileOpener: FileOpener) {

  }

  isObjectEmpty(object) {
    for (const property in object) {
      return false;
    }
    return true;
  }

  async getTranslate(key: string) {
    return await firstValueFrom(this.translateService.get(key));
  }

  /*async parseDataToBlob() {
    const data = Papa.unparse({
      "fields": ["Variable", "Value"],
      "data": await this.prepareResultData()
    });

    let blob = new Blob([data], { type: "text/csv" });
    return blob;
  }*/

  async prepareResultData(data) {
    let resultDataArray = [];
    return resultDataArray.concat(await this.getArrayOfDataTranslated(data))
  }

  async getArrayOfDataTranslated(estimaciones) {
    let data = [];

    await this.addRowHeader(estimaciones, data);
    this.addRowData(estimaciones, data);

    return data;
  }


  private addRowData(estimaciones: any, data: any[]) {
    for (let index = 0; index < estimaciones.length; index++) {
      let row = [];
      const estimacion = estimaciones[index];
      for (const key in estimacion) {
        if (typeof estimacion[key] === 'object') {
          for (const keyObject in estimacion[key]) {
            if (keyObject !== 'id') {
              row.push(estimacion[key][keyObject]);
            }
          }
        } else {
          if (key !== 'id') {
            row.push(estimacion[key]);
          }
        }
      }
      data.push(row);
    }
  }

  private async addRowHeader(estimaciones: any, data: any) {
    let row = [];
    for (const key in estimaciones[0]) {
      if (typeof estimaciones[0][key] === 'object') {
        for (const keyObject in estimaciones[0][key]) {
          if (keyObject !== 'id') {
            row.push(await this.getTranslate(keyObject));
          }
        }
      } else {
        if (key !== 'id') {
          row.push(await this.getTranslate(key));
        }
      }
    }
    data.push(row);
  }

  async saveFile(data: Blob, fileName: string) {
    let now = new Date(Date.now())
    var formattedDateTime = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}`;

    if (this.appService.isMobile()) {
      this.writeAndOpenFile(data, `${fileName}_${formattedDateTime}.xlsx`);
    } else {
      FileSaver.saveAs(data, `${fileName}_${formattedDateTime}.xlsx`);
      this.uiService.presentToast("Datos exportados correctamente");
    }
    this.uiService.dismissLoading();
  }

  async generarInformeExcel(data) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(await this.prepareResultData(data), { skipHeader: true });
    const workbook: XLSX.WorkBook = { Sheets: { 'AppRXfire': worksheet }, SheetNames: ['AppRXfire'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    return new Blob([excelBuffer], { type: "application/octet-stream" });
  }

  async writeAndOpenFile(data: Blob, fileName: string) {
    var reader = new FileReader();
    reader.readAsDataURL(data);
    const that = this;
    reader.onloadend = async function () {
      var base64data = reader.result;
      try {
        const result = await Filesystem.writeFile({
          path: fileName,
          data: <string>base64data,
          directory: Directory.Data,
          recursive: true
        });

        that.uiService.presentToast("Datos exportados correctamente");

        let type = data.type;
        if (data.type === 'application/octet-stream') {
          type = 'application/vnd.ms-excel';
        }

        that.fileOpener.showOpenWithDialog(result.uri, type)
          .then(() => {
            console.log('File is opened');
          })
          .catch(e => {
            console.log('Error opening file', e);
            that.uiService.presentAlertToast("Error opening file");
          });



        console.log('Wrote file', result.uri);
      } catch (e) {
        console.error('Unable to write file', e);
      }
    }
  }

  writeXLSX(workbook, wopts) {
    return XLSX.write(workbook, wopts);
  }

  exportTableToExcel(ws: XLSX.WorkSheet, data): XLSX.WorkSheet {
    ws = XLSX.utils.sheet_add_dom(ws, data, {
      cellDates: true, raw: true
    });

    return ws;
  }

  init_sheet(data: any[], skipHeader: boolean): XLSX.WorkSheet {
    return XLSX.utils.json_to_sheet(data, { skipHeader: skipHeader });
  }

  add_content_to_sheet(ws: XLSX.WorkSheet, row: number, data: any[], skipHeader?: boolean): XLSX.WorkSheet {
    return XLSX.utils.sheet_add_json(ws, data, { skipHeader: skipHeader, origin: 'A' + row });
  }

  create_book() {
    return XLSX.utils.book_new();
  }

  append_worksheet_to_book(workbook: XLSX.WorkBook, worksheet: XLSX.WorkSheet, name?: string) {
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
  }
}

