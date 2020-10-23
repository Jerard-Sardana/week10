import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebothComponent } from './deleteboth.component';

describe('DeletebothComponent', () => {
  let component: DeletebothComponent;
  let fixture: ComponentFixture<DeletebothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletebothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
