import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Default select';
  @Input() placeholder: string = 'Select an option';
  @Input() set options(x: any[]) {
    this._options = x;
    this.filteredOptions = [...x];
  }
  @Input() isDisabled: boolean = false;
  @Input() valueKey!: string;
  @Input() idKey!: string;
  /**
   * Indicates whether the item or entity is searchable.
   *
   * When set to true, the item or entity can be included in search operations.
   * When set to false, it will be excluded from search functionalities.
   *
   * This property is typically used to control the search indexing or
   * visibility of the item in search results.
   *
   * Default value is false.
   */
  @Input() isSearchable: boolean = false;
  /**
   * Indicates whether the item or data set can be filtered.
   * Determines if filtering functionality is enabled for this particular context.
   * Defaults to `false`.
   *
   * @type {boolean}
   */
  @Input() isFilterable: boolean = false;

  @Output() searchQuery: EventEmitter<string> = new EventEmitter();

  _options: any[] = [];
  searchControl: FormControl = new FormControl('');
  selectedOption: string = '';
  isOpen: boolean = false;
  isTouched: boolean = false;
  filteredOptions: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  hide() {
    this.isOpen = false;
  }

  _onChange(_option: any) {}

  _onTouched() {
    if (!this.isTouched) {
      this.isTouched = true;
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(option: any) {
    this.selectedOption = option[this.valueKey];
    this.hide();
    this._onChange(option);
  }

  onTouched() {
    this._onTouched();
  }

  writeValue(option: any): void {
    if (option) {
      this.selectedOption = option[this.valueKey];
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((x) => {
      if (this.isFilterable) {
        this.filteredOptions = x.length
          ? [
              ...this._options.filter((option) =>
                option[this.valueKey].toLowerCase().includes(x.toLowerCase()),
              ),
            ]
          : [...this._options];
        this.cdr.detectChanges();
        return;
      }

      if (this.isSearchable && x.length < 2) {
        this.searchQuery.emit(x);
      }
    });
  }
}
