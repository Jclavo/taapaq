import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslationDetailPage } from './translation-detail.page';

describe('TranslationDetailPage', () => {
  let component: TranslationDetailPage;
  let fixture: ComponentFixture<TranslationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
