<<<<<<< HEAD
=======
import 'hammerjs';
>>>>>>> 8ff0d726bad012b67fd430cf4f10175e866960e4
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
<<<<<<< HEAD
  .catch(err => console.log(err));
=======
  .catch(err => console.error(err));
>>>>>>> 8ff0d726bad012b67fd430cf4f10175e866960e4
