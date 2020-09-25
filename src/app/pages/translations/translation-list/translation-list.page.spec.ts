import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslationListPage } from './translation-list.page';

describe('TranslationListPage', () => {
  let component: TranslationListPage;
  let fixture: ComponentFixture<TranslationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
