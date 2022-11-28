import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private utilService: UtilService) { }

}
