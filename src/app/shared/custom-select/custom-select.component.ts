import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-vf-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input() className = 'form-control mandatory';
  @Input() defaultOption = {
    key: '',
    value: '-- select one --',
  };
  @Input() isDisabled: boolean;
  @Input('selectedOption') val: any;
  @Input() values: any[];
  @Input() isRequired: string;

  @Input() keyField = 'key';
  @Input() valueField = 'value';
  @Input() isDefaultDisabled = true;

  @Output() valueChange = new EventEmitter();

  inputError: boolean;
  isFirst: boolean = true;

  onChange: any = () => {};
  onTouch: any = () => {};

  @Input() set isDirty(val) {
    if (val) {
      this.checkValidation();
    }
  }

  set selectedOption(val) {
    if (!val) {
      return;
    }
    this.val = val;
    this.onChange(this.val);
    const selectedValue = this.getSelectedObject();
    this.valueChange.emit(selectedValue);
    this.checkValidation();
  }

  getSelectedObject() {
    return this.values && Array.isArray(this.values)
      ? this.values.find(
          (value) => String(value[this.keyField]) === this.selectedOption
        )
      : {};
  }

  get selectedOption() {
    return this.val;
  }

  constructor() {}

  ngOnInit() {
    this.selectedOption = this.selectedOption || this.defaultOption.key;
  }

  checkValidation() {
    if (this.val) {
      this.inputError = false;
      return;
    }
    if ( this.isRequired) {
      this.inputError = true;
    } else {
      this.inputError = false;
    }
  }

  ngOnChanges() {
    console.log('this.selectedOption',this.selectedOption);
    if (this.selectedOption) {
      this.onChange(this.val);
    }
  }

  writeValue(val) {
    this.val = val;
    if ((!val && this.isFirst) || this.isFirst) {
      this.isFirst = false;
      this.inputError = false;
      return;
    }
    if (!this.val) {
      this.checkValidation();
      this.isFirst = false;
      //this.inputError = false;
    } else {
      this.inputError = false;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  setDisabledState(state: boolean) {
    this.isDisabled = state;
  }

  validate(c) {
    return !this.inputError
      ? null
      : {
          customError: {
            valid: false,
          },
        };
  }
  onBlurMethod(event) {
    const newValue = event.target.value;

    if (!newValue && this.isRequired) {
      this.displayError(this.isRequired);
      return;
    }
  }
  displayError(msg: string) {
    this.isRequired = msg;
    this.inputError = true;
  }
}

