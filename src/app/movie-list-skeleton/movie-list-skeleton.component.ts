import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'movie-list-skeleton',
  template: `
    <div class="movie-list">
      <div class="skeleton" *ngFor="let item of items">
        <ngx-skeleton-loader
          appearance="line"
          [theme]="{
            'height': '300px',
            'background-color': 'var(--palette-text-secondary)'
          }"
        ></ngx-skeleton-loader>
        <ngx-skeleton-loader
          [theme]="{ 'background-color': 'var(--palette-text-secondary)' }"
          appearance="line"
        ></ngx-skeleton-loader>
        <ngx-skeleton-loader
          style="display: flex; justify-content: center;"
          appearance="circle"
          count="5"
          [theme]="{
            'height': '20px',
            'width': '20px',
            'background-color': 'var(--palette-warning-main)'
          }"
        ></ngx-skeleton-loader>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListSkeletonComponent {
  items = [0];
  @Input()
  set amount(amount: number) {
    this.items = new Array(amount).fill(0);
  }
}
