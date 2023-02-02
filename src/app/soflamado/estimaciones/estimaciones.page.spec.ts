import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstimacionesPage } from './estimaciones.page';

describe('EstimacionesPage', () => {
  let component: EstimacionesPage;
  let fixture: ComponentFixture<EstimacionesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstimacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
