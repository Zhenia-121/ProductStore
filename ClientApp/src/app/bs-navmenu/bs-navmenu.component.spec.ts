import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavmenuComponent } from './bs-navmenu.component';

describe('BsNavmenuComponent', () => {
  let component: BsNavmenuComponent;
  let fixture: ComponentFixture<BsNavmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
