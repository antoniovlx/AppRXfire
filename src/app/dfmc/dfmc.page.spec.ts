import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DfmcPage } from './dfmc.page';

describe('DfmcPage', () => {
  let component: DfmcPage;
  let fixture: ComponentFixture<DfmcPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DfmcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DfmcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
});
