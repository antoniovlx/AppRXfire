import { AfterContentInit, AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common';
import { AppService } from '../services/app.service';
import { UiService } from '../services/ui.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, AfterViewInit {

  title: string = "Créditos";
  imagePath: string = "./assets/img/question.png";

  @ViewChild("content", { static: false })
  content: IonContent;

  constructor(private uiService: UiService) { }

  ngAfterViewInit(): void {
 
  }

  ngOnInit() {

  }

  ScrollToTop() {
    this.uiService.scrollTop$(this.content);
  }
}
