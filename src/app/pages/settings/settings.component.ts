import { Component, DestroyRef, OnInit } from '@angular/core';
import { CompanySettingsService } from '../../shared/services/company-settings.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderService } from '../../shared/services/loader.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastService } from '../../shared/services/toast.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, NgClass, ToastComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    address_1: new FormControl<string>('', [Validators.required]),
    address_2: new FormControl<string>(''),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    description: new FormControl<string>(''),
  });

  toastId: string = 'successfullySavedToast';

  constructor(
    private settingsService: CompanySettingsService,
    public loaderService: LoaderService,
    private destroy: DestroyRef,
    private snackBar: MatSnackBar,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.settingsService
      .getSettings()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((x) => {
        this.settingsForm.patchValue(x, { emitEvent: false });
      });
  }

  onSave() {
    this.settingsService
      .updateSettings(this.settingsForm.value)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        this.toastService.open(this.toastId);
      });
  }
}
