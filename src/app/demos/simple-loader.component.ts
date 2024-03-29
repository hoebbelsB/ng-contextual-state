import { Component, ChangeDetectionStrategy } from '@angular/core';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'simple-loader',
  templateUrl: './simple-loader.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleLoaderComponent {
  /** state creation functions **/

  /** async start **/
  // Observable | Promise
  createState = () => this.movieService.getMovies();

  /** final async **/
  /*createState = () =>
    this.movieService.getMovies().pipe(
      map(movies => ({
        movies: [...movies],
      })),
      catchError(() => of({ error: true }))
    );*/

  /** template state **/
  state$ = this.createState();

  constructor(private readonly movieService: MovieService) {}

  /** methods to implement **/

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
