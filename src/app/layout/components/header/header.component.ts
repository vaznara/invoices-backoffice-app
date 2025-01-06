import { Component } from '@angular/core';
import { ToggleBootstrapElDirective } from '../../../shared/directives/toggle-bootstrap-el.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleBootstrapElDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
