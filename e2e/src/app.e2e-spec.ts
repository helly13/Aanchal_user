import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
<<<<<<< HEAD
    expect(page.getParagraphText()).toEqual('Welcome to app!');
=======
    expect(page.getTitleText()).toEqual('Welcome to user!');
>>>>>>> 8ff0d726bad012b67fd430cf4f10175e866960e4
  });
});
