import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSamplePanel } from './code-sample-panel';

describe('CodeSamplePanel', () => {
  let component: CodeSamplePanel;
  let fixture: ComponentFixture<CodeSamplePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSamplePanel],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeSamplePanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
