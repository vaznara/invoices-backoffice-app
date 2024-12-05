import { AfterViewInit, Component, DestroyRef } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TitleService } from '../shared/services/title.service';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../shared/services/loader.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, AsyncPipe, SnackbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  isLoading: boolean = true;
  constructor(
    public titleService: TitleService,
    public loaderService: LoaderService,
    private destroy: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.loaderService.isLoading$.pipe(takeUntilDestroyed(this.destroy)).subscribe((x) => {
      setTimeout(() => (this.isLoading = x));
    });
  }
}
