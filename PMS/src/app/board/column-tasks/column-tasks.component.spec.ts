import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTasksComponent } from './column-tasks.component';

describe('ColumnTasksComponent', () => {
  let component: ColumnTasksComponent;
  let fixture: ComponentFixture<ColumnTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
