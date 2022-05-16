import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserModalComponent } from './project-user-modal.component';

describe('ProjectUserModalComponent', () => {
  let component: ProjectUserModalComponent;
  let fixture: ComponentFixture<ProjectUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
