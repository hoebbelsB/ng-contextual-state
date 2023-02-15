import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { ContextTriggerComponent } from './demos/context-trigger.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListSkeletonComponent } from './movie-list-skeleton/movie-list-skeleton.component';
import { StarRatingModule } from './star-rating/star-rating.module';
import { SimpleLoaderComponent } from './demos/simple-loader.component';
import { StreamComponent } from './demos/stream.component';
import { SearchComponent } from './demos/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    SimpleLoaderComponent,
    StreamComponent,
    SearchComponent,
    ContextTriggerComponent,
    MovieListSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    LetModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    provideRouter([
      {
        path: 'simple-loader',
        component: SimpleLoaderComponent,
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
        redirectTo: 'simple-loader',
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
