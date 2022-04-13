import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { OrganismeService } from 'src/app/core/services/organisme.service';
import { typeRequestService } from 'src/app/core/services/typerequest.service';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.scss']
})
export class AddrequestComponent implements OnInit {
  Request: FormGroup
  ts: any
  organismes: any

  selectedFile: File;
  event: EventEmitter<any> = new EventEmitter()

  constructor(private s: typeRequestService, public activeModal: NgbActiveModal, private fb: FormBuilder, private organisme: OrganismeService) { }
  formData = new FormData();
  ngOnInit(): void {

    this.getallorganisme()
    this.gettyprequest()
  }
  chooseFile(files: FileList) {

    this.selectedFile = files[0];
  }
  // upload() {



  // }
  searchForm = this.fb.group({
    fk_Organisme: '',
    RequestDescription: '',
    fk_Filliale: ''
  });
  getallorganisme() {
    this.organisme.getAllorganisme().subscribe(
      data => {
        this.organismes = data

      }
    )

  }

  gettyprequest() {
    this.s.getlltyperequestList().subscribe(data => {
      this.ts = data,
        console.log(this.ts)
    }, err => {
      console.log(err)
    })
  }
  // moment() {
  // 
  //   let now = moment().format('LLLL');
  //   console.log(now)
  //   return now

  // }
  submit() {
    var d = this.searchForm.value
    moment.locale('Fr')
    var Fk_User = localStorage.getItem('userid')
    let now = moment().format('LLLL');
    d['creationDate'] = now
    d['Fk_User'] = Fk_User
    console.log(d)
    this.formData = new FormData();
    this.formData.append('files', this.selectedFile);
    console.log(this.formData)

  }

}
