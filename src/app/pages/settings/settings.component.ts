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
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    address_1: new FormControl<string>('', [Validators.required]),
    address_2: new FormControl<string>(''),
    phone: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
  });

  constructor(
    private settingsService: CompanySettingsService,
    public loaderService: LoaderService,
    private destroy: DestroyRef,
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
      .subscribe(() => {});
  }
}
