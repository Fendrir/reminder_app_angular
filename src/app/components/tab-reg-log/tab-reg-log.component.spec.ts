import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRegLogComponent } from './tab-reg-log.component';

describe('TabRegLogComponent', () => {
  let component: TabRegLogComponent;
  let fixture: ComponentFixture<TabRegLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRegLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRegLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
