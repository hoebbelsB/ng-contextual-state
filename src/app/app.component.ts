import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="title">Contextual State Demo</h1>
    <div class="navbar" style="margin: 1rem;">
      <a
        routerLinkActive="active"
        [routerLink]="'/simple-loader'"
        style="margin-right: 1rem;"
        >single shot</a
      >
      <a
        routerLinkActive="active"
        [routerLink]="'/stream'"
        style="margin-right: 1rem;"
        >stream</a
      >
      <a
        routerLinkActive="active"
        [routerLink]="'/search'"
        style="margin-right: 1rem;"
        >search</a
      >
      <a routerLinkActive="active" [routerLink]="'/context-trigger'"
        >context trigger</a
      >
    </div>
    <div style="padding: 1rem">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
