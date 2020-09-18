import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModelListPage } from './model-list.page';

describe('ModelListPage', () => {
  let component: ModelListPage;
  let fixture: ComponentFixture<ModelListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
