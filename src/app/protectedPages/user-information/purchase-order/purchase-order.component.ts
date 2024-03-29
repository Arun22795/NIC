import { Component, OnInit,Input, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  @Input('userObj') user : any

  displayedColumns : string[] = ['purchaseNo','projectNo','piAmt','remarks','remainder']

  userList : any[] =   [
    {purchaseNo : 114,projectNumber : 5345,piAmt:24250,reminder:'Send Reminder'},
    {purchaseNo : 197,projectNumber : 5465,piAmt:25000,reminder:'Send Reminder'},
    {purchaseNo : 767,projectNumber : 2344,piAmt:45000,reminder:'Send Reminder'},
    {purchaseNo : 678,projectNumber : 2367,piAmt:24250,reminder:'Send Reminder'},
    {purchaseNo : 114,projectNumber : 5654,piAmt:28000,reminder:'Send Reminder'},
    {purchaseNo : 114,projectNumber : 5345,piAmt:34000,reminder:'Send Reminder'},
  ];
  poStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
  piStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
    piReceivedIn: any[] = [
      { key: 0, value: 'Full' },
      { key: 1, value: 'Partial' }]
  
    paymentStatus: any[] = [
      { key: 0, value: 'Pending' },
      { key: 1, value: 'Received' },
      { key: 2, value: 'On Hold' }]

      departmentListData = [
        {key:0,value:'Department of Sainik Welfare'},
        {key:1,value:'Minstry of minority affairs'},
        {key:2,value:'Vishakhapatnam port Trust'},
        {key:3,value:'Ministry of trible affairs'},
        {key:4,value:'Bureasu of Naviks.Mumbai'}
    ];
    
      
  dataSource = new MatTableDataSource<any>(this.userList);

  date = new FormControl();
  PurchaseOrderForm:FormGroup;
  labels: any = {};
  isDirty: boolean;

  searchForm: FormGroup;

  constructor(
    private labelsService: LabelsService,
    private DatePipe:DatePipe
    ) { }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
      console.log('label',this.labels)
    })
    this.PurchaseOrderForm = new FormGroup({
      userName: new FormControl(null),
    
      piNumber: new FormControl(null),
      poNumber: new FormControl(null),
      smsApproved: new FormControl(null),
      projectName:new FormControl(null),
      date:new FormControl(null),
      withoutTax: new FormControl(null),
      poStatus:new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      userEmail:new FormControl(null),
      poManagerEmail: new FormControl(null),
      projectNo:new FormControl(null),
      poAmountWithTax: new FormControl(null),
      departmentName: new FormControl(''),
      paymentStatus:new FormControl(''),
      uploadDoc:new FormControl(null),
    

    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })
    
  }
  POForm(){
    if(this.PurchaseOrderForm.invalid) {
     
      this.isDirty = true;

      return
    }
    this.PurchaseOrderForm.value['date']=this.DatePipe.transform(this.PurchaseOrderForm.value['date'],'dd/MM/yyyy')
   console.log(this.PurchaseOrderForm.value)
   this.PurchaseOrderForm.reset();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  onSearch() {

    console.log(this.searchForm.value)
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })
  }


}
