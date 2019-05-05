import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ej2tableComponent } from './ej2table.component';

describe('Ej2tableComponent', () => {
  let component: Ej2tableComponent;
  let fixture: ComponentFixture<Ej2tableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ej2tableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ej2tableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
