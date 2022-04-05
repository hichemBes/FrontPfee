import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: []
})
export class ListUsersComponent implements OnInit {
  Listusers: any[] = []
  p: any
  searchForm:FormGroup=new FormGroup({})
  constructor(private modalService: NgbModal, private identityService: IdentityServerService) { }

  ngOnInit(): void {
    this.getListUsers()
    this.createSearchForm()
  }
  createSearchForm(){
    this.searchForm=new FormGroup({
      userFullName: new FormControl()
    })
  }
  AddUser() {
    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddEditUserComponent, config)
    modalRef.componentInstance.event.subscribe((res: string) => {
      if (res == 'refresh') {
        Swal.fire(
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000, title: 'Ajouté avec succées',
            icon: 'success',
          })
        this.getListUsers()
        modalRef.close()
      }
    })
  }
  getListUsers() {
    this.identityService.getUsersByAppId().subscribe((res) => {
      this.Listusers = res as any[]
    })
  }
  edit(item: any) { }
  delete(item: any) { }

}
