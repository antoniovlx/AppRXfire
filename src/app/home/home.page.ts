import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {IonTabs } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public title: string;

  @ViewChild(IonTabs, { static: false }) tabs: IonTabs;

  constructor( private router: Router, public uiService: UiService) { }

  ngOnInit() {
    this.title = this.router.url;

    this.uiService.getSelectTab().subscribe(title =>{
      this.tabs.select(title);
    });
  }
}
