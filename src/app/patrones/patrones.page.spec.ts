import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatronesPage } from './patrones.page';

describe('PatronesPage', () => {
  let component: PatronesPage;
  let fixture: ComponentFixture<PatronesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatronesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
