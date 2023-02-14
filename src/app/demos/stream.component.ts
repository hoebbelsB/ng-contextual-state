import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import {
  BehaviorSubject,
  catchError,
  endWith,
  map,
  materialize,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'stream',
  templateUrl: './stream.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {
  /** state creation functions **/

  /** async **/
  createState = () =>
    this.movieService.streamMovies().pipe(
      map(movies => ({
        movies: [...movies],
      })),
      catchError(() => of({ error: true }))
      /*endWith({
        complete: true,
      })*/
    );

  /** rxlet **/
  // createState = () => this.movieService.streamMovies();

  /** template state **/
  state$ = this.createState();

  constructor(private readonly movieService: MovieService) {}

  /** demo ui bindings **/

  showError() {
    this.movieService.withError = true;
    this.reset();
    setTimeout(() => (this.movieService.withError = false));
  }

  reset() {
    this.state$ = this.createState();
  }
}
