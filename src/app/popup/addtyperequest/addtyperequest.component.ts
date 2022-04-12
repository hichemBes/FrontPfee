import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { typeRequestService } from 'src/app/core/services/typerequest.service';

@Component({
  selector: 'app-addtyperequest',
  templateUrl: './addtyperequest.component.html',
  styleUrls: ['./addtyperequest.component.scss']
})
export class AddtyperequestComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  utlisateurs: any
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private route: Router, private s: typeRequestService) { }

  ngOnInit(): void { }
  searchForm = this.fb.group({
    fk_User: ''
  });

  onSubmit(f: any) {
    this.s.post(f.value).subscribe(data => {
      this.event.emit('refresh')
    })

  }

}
