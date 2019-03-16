import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

<<<<<<< HEAD
  getParagraphText() {
=======
  getTitleText() {
>>>>>>> 8ff0d726bad012b67fd430cf4f10175e866960e4
    return element(by.css('app-root h1')).getText();
  }
}
