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
  event: EventEmitter<any> = new EventEmitter()

  constructor(private s: typeRequestService, public activeModal: NgbActiveModal, private fb: FormBuilder, private organisme: OrganismeService) { }

  ngOnInit(): void {
    this.moment()
    this.getallorganisme()
    this.gettyprequest()
  }
  searchForm = this.fb.group({
    fk_Organisme: ''
  });
  getallorganisme() {
    this.organisme.getAllorganisme().subscribe(
      data => {
        this.organismes = data

      }
    )

  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

  }
  gettyprequest() {
    this.s.getlltyperequestList().subscribe(data => {
      this.ts = data,
        console.log(this.ts)
    }, err => {
      console.log(err)
    })
  }
  moment() {
    moment.locale('Fr')
    let now = moment().format('LLLL');

    console.log(now)

  }
  submit() {

  }

}
