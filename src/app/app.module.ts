import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';

import { AppComponent } from './app.component';
import { ContextTriggerComponent } from './demos/context-trigger.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StarRatingModule } from './star-rating/star-rating.module';
import { SingleShotComponent } from './demos/single-shot.component';
import { StreamComponent } from './demos/stream.component';
import { SearchComponent } from './demos/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    SingleShotComponent,
    StreamComponent,
    SearchComponent,
    ContextTriggerComponent,
  ],
  imports: [BrowserModule, StarRatingModule, LetModule, RouterModule],
  providers: [
    provideRouter([
      {
        path: 'single-shot',
        component: SingleShotComponent,
      },
      {
        path: 'stream',
        component: StreamComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'context-trigger',
        component: ContextTriggerComponent,
      },
      {
        path: '**',
        redirectTo: 'single-shot',
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
