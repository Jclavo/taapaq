import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModuleLabelPage } from './module-label.page';

describe('ModuleLabelPage', () => {
  let component: ModuleLabelPage;
  let fixture: ComponentFixture<ModuleLabelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLabelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleLabelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
