import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog.component';

describe('ShoppingCompleteDialogComponent', () => {
  let component: ShoppingCompleteDialogComponent;
  let fixture: ComponentFixture<ShoppingCompleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCompleteDialogComponent]
    });
    fixture = TestBed.createComponent(ShoppingCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
