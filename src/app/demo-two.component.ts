import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import {
  BehaviorSubject,
  catchError,
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

  /** async start **/
  createState = () =>
    this.movieService.streamMovies().pipe(
      map(movies => ({
        movies: [...movies],
      })),
      catchError(() => of({ error: true }))
    );

  /** async final **/
  /*createState = () =>
    this.movieService.streamMovies().pipe(
      map(movies => ({
        movies,
      })),
      catchError(() =>
        of({
          error: true,
        })
      ),
      materialize(),
      map(({ kind, value }) => {
        if (kind === 'C') {
          return {
            complete: true,
          };
        }
        return value;
      })
    );*/

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
