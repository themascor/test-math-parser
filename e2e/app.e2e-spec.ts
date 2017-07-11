import { SimpleCalcPage } from './app.po';

describe('simple-calc App', () => {
  let page: SimpleCalcPage;

  beforeEach(() => {
    page = new SimpleCalcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
