import { DisplayFinalAnswerPipe } from './final-answers.pipe';

describe('DisplayFinalAnswerPipe', () => {
  let displayFinalAnswerPipe: DisplayFinalAnswerPipe;
  beforeEach(() => {
    displayFinalAnswerPipe = new DisplayFinalAnswerPipe();
  });

  it('should return the answer if the user entered something', () => {
    expect(displayFinalAnswerPipe.transform('Ja')).toBe('Ja');
  });

  it('should return "Keine Antwort" if the user did not answer', () => {
    expect(displayFinalAnswerPipe.transform('')).toBe('Keine Antwort');
  });
});
