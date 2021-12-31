import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeaderComponent } from "./header.component";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  const expectedTitle = 'This a questionnaire ...';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [HeaderComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('"title" should be empty initially', () => {
    const titleContainer = debugElement.query(By.css('p'));
    const title = titleContainer.nativeElement.textContent;
    expect(title).toEqual('');
  });

  it('"title" should be set from outside', () => {
    component.titleOfQuestionnaire = expectedTitle;
    fixture.detectChanges();
    const titleContainer = debugElement.query(By.css('p'));
    const title = titleContainer.nativeElement.textContent;
    expect(title).toContain(expectedTitle);
  });
});
