import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CoverType } from '@modules/covers-types/models/cover-type.model';
import { CoversTypesDataService } from '@modules/covers-types/services/covers-types-data.service';
import { NGXLogger } from 'ngx-logger';

const LOG_PREFIX: string = "[Covers Types Records Creation Component]";

@Component({
  selector: 'sb-covers-types-records-creation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './covers-types-records-creation.component.html',
  styleUrls: ['covers-types-records-creation.component.scss'],
})
export class CoversTypesRecordsCreationComponent implements OnInit, OnDestroy {

  // Instantiate an 'initialized' state notification Emitter.
  // This will allow us to notify the parent component that the component was successfully initialized
  @Output() initialized: EventEmitter<void> = new EventEmitter<void>();

  // Instantiate a 'succeeded' state notification Emitter.
  // This will allow us to broadcast notifications of successful creation events
  @Output() succeeded: EventEmitter<void> = new EventEmitter<void>();

  // Instantiate a 'failed' state notification Emitter.
  // This will allow us to broadcast notifications of failed creation events
  @Output() failed: EventEmitter<number> = new EventEmitter<number>();

  // Instantitate a new reactive Form Group for the CoversTypes Form.
  // This will allow us to define and enforce the validation rules for all the form controls.
  coversTypesForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      this.exists("code")
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      this.exists("description")
    ])    
  });


  constructor(
    private coversTypesDataService: CoversTypesDataService,
    private log: NGXLogger) {

  }


  ngOnInit() {
    this.log.trace(`${LOG_PREFIX} Initializing Component`);
  }


  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.log.trace(`${LOG_PREFIX} Destroying Component`);
  }


  /**
   * Internal validator that checks whether a Cover Type Record already exists
   * @returns 
   */
  private exists(attribute: string): ValidatorFn {

    this.log.trace(`${LOG_PREFIX} Checking whether ${attribute} already exists`);

    const values: string[] =
      attribute == "code" ? <Array<string>>this.coversTypesDataService.records.map(d => d.code) :
        attribute == "description" ? <Array<string>>this.coversTypesDataService.records.map(d => d.description) :
            [];

    this.log.debug(`${LOG_PREFIX} Existing ${attribute} values = ${values}`);

    return (control: AbstractControl): ValidationErrors | null => {

      if (values != null && values.length > 0) {

        if (control.value) {

          const s: string = control.value;

          this.log.debug(`${LOG_PREFIX} Checking whether ${s} matches any value in ${values}`);

          if (values.map(v => v.toLowerCase()).includes(s.toLowerCase())) {

            this.log.trace(`${LOG_PREFIX} Matching ${attribute} found`);

            return { 'exists': true }
          }
        }
      }

      return null;
    }
  }



  /**
   * Validates and saves a new Cover Type Record.
   * Emits a succeeded or failed event in response to whether or not the creation exercise was successful.
   * Error 400 = Indicates an invalid Form Control Entry was supplied.
   * Error 500 = Indicates something unexpected happened at the server side
   */
  public save(): void {

    if (this.coversTypesForm.valid) {

      // Read in the provided code
      this.log.trace(`${LOG_PREFIX} Reading in the provided code`);
      const code: string | null = this.coversTypesForm.get('code') == null ? null : this.coversTypesForm.get('code')?.value;
      this.log.debug(`${LOG_PREFIX} Cover Type Name = ${code}`);

      // Read in the provided description
      this.log.trace(`${LOG_PREFIX} Reading in the provided description`);
      const description: string | null = this.coversTypesForm.get('description') == null ? null : this.coversTypesForm.get('description')?.value;
      this.log.debug(`${LOG_PREFIX} Cover Type Description = ${description}`);      

      // Save the record
      this.log.trace(`${LOG_PREFIX} Saving the Cover Type Record`);
      this.coversTypesDataService
        .createCoverType(new CoverType({ code: code, description: description }))
        .subscribe(
          (response: CoverType) => {

            // The Cover Type Record was saved successfully
            this.log.trace(`${LOG_PREFIX} Cover Type Record was saved successfuly`);

            // Reset the form
            this.log.trace(`${LOG_PREFIX} Resetting the form`);
            this.coversTypesForm.reset();

            // Emit a 'succeeded' event
            this.log.trace(`${LOG_PREFIX} Emitting a 'succeeded' event`);
            this.succeeded.emit();
          },
          (error: any) => {

            // The Cover Type Record was not saved successfully
            this.log.trace(`${LOG_PREFIX} Cover Type Record was not saved successfuly`);

            // Emit a 'failed' event
            this.log.trace(`${LOG_PREFIX} Emitting a 'failed' event`);
            this.failed.emit(500);
          });
    } else {

      // Validate the form fields
      this.log.trace(`${LOG_PREFIX} Validating the form fields`);
      this.validateAllFormFields(this.coversTypesForm);

      // Emit an 'invalid' event
      this.log.trace(`${LOG_PREFIX} Emitting a 'failed' event`);
      this.failed.emit(400);
    }
  }

  /**
   * See: https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit
   * @param formGroup 
   */
  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


}
