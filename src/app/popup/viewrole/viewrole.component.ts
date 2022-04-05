import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserauthService } from 'src/app/core/services/userauth.service';
import { UsersComponent } from './../../users/users.component';

@Component({
  selector: 'app-viewrole',
  templateUrl: './viewrole.component.html',
  styleUrls: ['./viewrole.component.scss']
})
export class ViewroleComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  roles: any
  event: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal, private sa: UserauthService) { }

  ngOnInit(): void {

    console.log(this.fromParent)
    this.sa.getRolebyusername(this.fromParent).subscribe(data => {
      this.roles = data
      console.log(this.roles)
    },
      error => {
        console.log(error)
      })
  }
}