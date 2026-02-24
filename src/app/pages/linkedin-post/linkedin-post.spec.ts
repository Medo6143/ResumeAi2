import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinPost } from './linkedin-post';

describe('LinkedinPost', () => {
  let component: LinkedinPost;
  let fixture: ComponentFixture<LinkedinPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedinPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedinPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
