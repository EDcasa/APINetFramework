import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-saving',
  templateUrl: './detail-saving.component.html',
  styleUrls: []
})
export class DetailSavingComponent implements OnInit {

  
  @Input() cPlanType:any;
  arrAccount:Array<any>=[];
  constructor() { }

  ngOnInit(): void {
    for (let numberMonth = 0; numberMonth < 12; numberMonth++) {
      this.arrAccount.push({
        "month":numberMonth+1,
        "interestedMonthly":(this.cPlanType.montlyInterested/100),
        "valueSaving":this.cPlanType.amount*(this.cPlanType.montlyInterested/100),
        "totalSaving":this.cPlanType.amount+this.cPlanType.amount*((this.cPlanType.montlyInterested/100)*(numberMonth+1))
      })
    }
  }

}
