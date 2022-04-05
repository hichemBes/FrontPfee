import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganismeService } from 'src/app/core/services/organisme.service';
import { UserauthService } from 'src/app/core/services/userauth.service';
import { OrganismeComponent } from './../../organisme/organisme.component';

@Component({
  selector: 'app-addorganisme',
  templateUrl: './addorganisme.component.html',
  styleUrls: ['./addorganisme.component.scss']
})
export class AddorganismeComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})

  @Input()
  event: EventEmitter<any> = new EventEmitter()
  constructor(private org: OrganismeService, private sa: UserauthService, public activeModal: NgbActiveModal, private route: Router) { }

  ngOnInit(): void {
  }


  onSubmit(f: any) {
    this.org.postorganisme(f.value).subscribe((data) => {
      this.event.emit('refresh')
    })
  }
}