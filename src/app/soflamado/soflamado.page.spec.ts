import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoflamadoPage } from './soflamado.page';

describe('SoflamadoPage', () => {
  let component: SoflamadoPage;
  let fixture: ComponentFixture<SoflamadoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SoflamadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoflamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
