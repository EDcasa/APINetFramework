import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ClientPlanType } from '../models/clientPlantype.model';

@Injectable({
  providedIn: 'root'
})
export class ClientPlanTypeService {

  readonly baseURL = 'http://localhost:61236/api/ClientPlanType'

  constructor(
    private http: HttpClient
  ) { }

  postClientPlanType(data:ClientPlanType) {
    return this.http.post<ClientPlanType>(this.baseURL, data);
  }

  putPaymentDetail() {
    // return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    // this.http.get(this.baseURL)
    //   .toPromise()
    //   .then(res =>this.list = res as PaymentDetail[]);
  }

}
