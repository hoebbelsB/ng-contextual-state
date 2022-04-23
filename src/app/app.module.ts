import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LetModule } from '@rx-angular/template/let';

import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StarRatingModule } from './star-rating/star-rating.module';

@NgModule({
  declarations: [AppComponent, MovieCardComponent],
  imports: [BrowserModule, StarRatingModule, LetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
