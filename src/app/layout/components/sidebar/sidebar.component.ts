import { Component, OnInit } from '@angular/core';
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('toggleSidebar', [
      state(
        'expanded',
        style({
          width: '15rem',
        }),
      ),
      state(
        'collapsed',
        style({
          width: '3.75rem',
        }),
      ),
      transition(
        'expanded <=> collapsed',
        group([query('@*', animateChild()), animate('300ms ease-in-out')]),
      ),
    ]),
    trigger('toggleText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('rotateArrow', [
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)',
        }),
      ),
      state(
        'collapsed',
        style({
          transform: '*',
        }),
      ),
      transition('expanded <=> collapsed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  isCompact: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  onToggle(): void {
    this.isCompact = !this.isCompact;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1023.99px)']).subscribe((result) => {
      this.isCompact = result.matches;
    });
  }
}
