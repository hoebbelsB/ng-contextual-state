import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private searchTerm$ = new Subject<string>();
  private stop$ = new Subject<void>();

  /** state creation functions **/

  createState = () => this.movieService.getMovies();
  /* .pipe(
      map(movies => ({
       movies: [...movies],
       })),
       catchError(() => of({ error: true }))
     );*/

  createStreamedState = () => this.movieService.streamMovies();
  /*.pipe(
      /!*map(movies => ({
        movies: [...movies],
      })),
      catchError(() => of({ error: true })),*!/
      /!*startWith(undefined),
      materialize(),
      map(({ kind, value }) => {
        if (kind === 'C') {
          return { complete: true };
        }
        if (kind === 'E') {
          return { error: true };
        }
        return value;
      }),
      pairwise(),
      map(([prev, cur]) => {
        if ((cur as any)?.complete && !!(prev as any).movies) {
          return { ...cur, ...prev };
        }
        return cur;
      }),*!/
      // takeUntil(this.stop$),
      );*/

  createSearchState = () => this.movieService.searchMovies(this.searchTerm$);

  /** template state **/
  state$ = this.createState();
  streamedState$ = this.createStreamedState();
  searchState$ = this.createSearchState();

  /** template triggers **/

  suspenseTrigger$ = new Subject<void>();
  completeTrigger$ = new Subject<void>();
  errorTrigger$ = new Subject<void>();

  constructor(private readonly movieService: MovieService) {}

  /** methods called from ui **/

  stop() {
    this.stop$.next();
  }

  showError() {
    this.movieService.withError = true;
    this.reset();
    this.movieService.withError = false;
  }

  reset() {
    this.state$ = this.createState();
    this.streamedState$ = this.createStreamedState();
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }

  triggerSuspense() {
    this.suspenseTrigger$.next();
  }

  triggerComplete() {
    this.completeTrigger$.next();
  }

  triggerError() {
    this.errorTrigger$.next();
  }
}
