/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegularsaverComponent } from './regularsaver.component';

describe('RegularsaverComponent', () => {
  let component: RegularsaverComponent;
  let fixture: ComponentFixture<RegularsaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularsaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularsaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
