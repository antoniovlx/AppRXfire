import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComparativaComponent } from './comparativa.component';

describe('ComparativaComponent', () => {
  let component: ComparativaComponent;
  let fixture: ComponentFixture<ComparativaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
