import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client.model';
import { ClientPlanTypeService } from 'src/app/shared/client-plan-type.service';
import { ClientPlanType } from 'src/app/models/clientPlantype.model';
import {
  validateMinValueSaving
} from "../../shared/customvalidator.validator";

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  formClient: FormGroup = new FormGroup({});

  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService,
    private _serviceSaving:ClientPlanTypeService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formClient = this.formBuilder.group({
      documentNumber: ["", [Validators.required,Validators.maxLength(10)]],
      firstName: ["", [Validators.required, Validators.maxLength(100)]],
      lastName: ["", [Validators.required, Validators.maxLength(100)]],
      amountSaving: ["", [Validators.required]],
    },{
      validator: validateMinValueSaving("amountSaving")
    });

  }


  onSubmit() {
    let clientData:Client = {
      firstName: this.formClient.value.firstName,
      lastName: this.formClient.value.lastName,
      documentNumber: this.formClient.value.documentNumber
    }

    this.service.postPaymentDetail(clientData).subscribe((res:Client)=>{
      if(res.id){
        let cPlanType:ClientPlanType = {
          Amount: this.formClient.value.amountSaving,
          AnnualInterested: '3',
          MontlyInterested: (3/12).toString(),
          ClientId: res.id,
          PlanTypeId: 1
        }
        this._serviceSaving.postClientPlanType(cPlanType).subscribe(cRes=>{
            this.service.cPlantype.next(cRes);
            this.toastr.success('Registro Exitoso', 'Su ahorro ha sido generado exitosamente');
            this.formClient.reset();
        })
      }
    })
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Payment Detail Register')
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

  reloadPage(){
    window.location.reload()
  }
}
