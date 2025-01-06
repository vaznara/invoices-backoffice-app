import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NgClass } from '@angular/common';

export interface AutocompleteOption {
  uid: string;
  value: string;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule, ClickOutsideDirective, NgClass],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit {
  autocompleteControl: FormControl<string> = new FormControl();

  @Input() set searchResult(res: any[]) {
    this.options = res;
    if (res.length) this.showDropdown();
  }
  @Input() uidKey!: string;
  @Input() valueKey!: string;

  @Output() searchValue: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();

  isOpen: boolean = false;
  options: any[] = [];

  constructor() {}

  ngOnInit() {
    this.autocompleteControl.valueChanges
      .pipe(
        debounceTime(500),
        filter((value) => value.length > 2),
      )
      .subscribe((value) => {
        this.searchValue.emit(value);
      });
  }

  onSelect(option: any) {
    this.hideDropdown();
    this.autocompleteControl.setValue(option[this.valueKey], { emitEvent: false });
    this.selected.emit(option);
  }

  hideDropdown() {
    this.isOpen = false;
  }

  showDropdown() {
    this.isOpen = true;
  }
}
