import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRectiveFormComponent } from './item-rective-form.component';

describe('ItemRectiveFormComponent', () => {
  let component: ItemRectiveFormComponent;
  let fixture: ComponentFixture<ItemRectiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRectiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRectiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
