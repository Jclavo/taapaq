import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectCompanyPage } from './project-company.page';

describe('ProjectCompanyPage', () => {
  let component: ProjectCompanyPage;
  let fixture: ComponentFixture<ProjectCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
