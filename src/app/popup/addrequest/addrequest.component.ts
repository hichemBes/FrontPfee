import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.scss']
})
export class AddrequestComponent implements OnInit {
  Request: FormGroup
  event: EventEmitter<any> = new EventEmitter()

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  onSubmit() {

  }

}
