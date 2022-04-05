import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserauthService } from 'src/app/core/services/userauth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from './../../users/users.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.scss']
})
export class AddroleComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()
  constructor(private route: Router, private sa: UserauthService, public activeModal: NgbActiveModal) {
    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
  }

  ngOnInit(): void {

  }
  onSubmit(f: any) {
    var d: any = f.value
    d["username"] = this.fromParent
    console.log(d)

    this.sa.postrole(d).subscribe(data => {
      var e = data
      this.event.emit('refresh')
      console.log(data);

    })

  }

}
