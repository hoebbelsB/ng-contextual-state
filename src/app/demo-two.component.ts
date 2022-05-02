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
import { MovieService } from './movie.service';

@Component({
  selector: 'app-demo-two',
  templateUrl: './demo-two.component.html',
  styleUrls: ['./demo-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoTwoComponent {
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
