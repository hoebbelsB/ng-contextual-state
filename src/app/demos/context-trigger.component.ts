import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'context-trigger',
  templateUrl: './context-trigger.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextTriggerComponent {
  private searchTerm$ = new BehaviorSubject<string>('');

  createState = () =>
    this.searchTerm$.pipe(
      switchMap(term => this.movieService.searchMovies(term))
    );

  /** template state **/
  state$ = this.createState();

  /** template triggers **/
  suspenseTrigger$ = new BehaviorSubject<void>(void 0);
  completeTrigger$ = new Subject<void>();
  errorTrigger$ = new Subject<void>();
  nextTrigger$ = new Subject<void>();

  constructor(private readonly movieService: MovieService) {}

  /** methods to implement **/
  search(term: string) {
    this.triggerSuspense();
    this.searchTerm$.next(term);
  }

  /** demo ui bindings **/

  showError() {
    this.movieService.withError = true;
    this.reset();
    setTimeout(() => (this.movieService.withError = false));
  }

  reset() {
    this.state$ = this.createState();
  }

  triggerSuspense() {
    this.suspenseTrigger$.next();
  }

  triggerComplete() {
    this.completeTrigger$.next();
  }

  triggerNext() {
    this.nextTrigger$.next();
  }

  triggerError() {
    this.errorTrigger$.next();
  }
}
