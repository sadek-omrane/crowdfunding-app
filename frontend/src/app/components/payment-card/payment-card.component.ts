
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripeService, StripePaymentElementComponent, injectStripe, StripeElementsDirective } from 'ngx-stripe';
import {
  StripeCardElementChangeEvent,
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentService } from 'src/app/services/payment.service';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.development';
import { MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { MaterialModule } from 'src/app/material.module';
import { Validators } from 'ngx-editor';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatStepperModule,
    AsyncPipe,
    TablerIconsModule,
  ],
  providers: [
    StripeService,
    PaymentService,
    ProjectService,
  ],
})
export class PaymentCardComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @ViewChild(StripeElementsDirective)
  elements!: StripeElementsDirective;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
    clientSecret:  null,
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  form: FormGroup;

  stripe = injectStripe(environment.stripePublicKey);
  paying = signal(false);

  projects : Project[] = [];
  filteredProjects: Observable<Project[]>;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.filteredProjects = this.form.get('project')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.loadProjects(value);
        return this.projects;
      }),
    );

    //this.setupPaymentIntent();
  }

  buildForm(): void {
    this.form = this.fb.group({
      project: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  setupPaymentIntent(): void {
    this.paymentService.createPaymentIntent(this.form.value)
      .subscribe((res) => {
        this.elementsOptions.clientSecret = res.data.client_secret as string;
      });
  }

  pay() {
    if (this.paying() || this.form.invalid) return;
    this.paying.set(true);
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.form.get('name').value as string,
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        console.log('Result', result);
      });
  }

  onChange(ev: StripeCardElementChangeEvent) {
    console.log('Event', ev);
  }

  loadProjects(key: string | null) {
    this.projectService.get(null, {
      limit: 10,
      page: 1,
      key: key,
    }).subscribe((res:any)=> this.projects = res.data);
  }

  displayFn(project: Project) {
    return project ? project.name : '';
  }

  onSelectionChange(event: any) {
    console.log('event ', event);
    let index = event.selectedIndex;
    if (index == 1) {
      this.setupPaymentIntent();
    }
  }
}
