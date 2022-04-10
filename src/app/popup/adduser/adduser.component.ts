import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FunctionService } from 'src/app/core/services/function.service';
import { UserauthService } from './../../core/services/userauth.service';
import { functionofuserService } from './../../core/services/functionofuser.service.';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  actionTypeForm: FormGroup = new FormGroup({})
  utlisateurs: any
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()

  constructor(private fa: functionofuserService, private sa: FunctionService, public activeModal: NgbActiveModal, private fb: FormBuilder, private route: Router, private ut: UserauthService) { }

  ngOnInit(): void {

    this.getallusers()
  }
  searchForm = this.fb.group({
    fk_User: ''
  });
  getallusers() {
    this.ut.getallusers().subscribe(data => {
      this.utlisateurs = data
      console.log(this.utlisateurs)

    }, erro => {
      console.log(erro)
    })
  }

  submit() {
    var d = this.searchForm.value.fk_User

    var c = this.fromParent


    var data = {
      "fk_Function": c,
      "fk_User": d
    }
    console.log(data)

    this.fa.postfunctionuser(data).subscribe(res => {
      console.log(res)
      this.event.emit('refresh')
    }, err => {
      console.log(err)
    }
    )
  }
  delete(id: any) {

    //   const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //       confirmButton: 'btn btn-success',
    //       cancelButton: 'btn btn-danger'
    //     },
    //     buttonsStyling: false
    //   })

    //   swalWithBootstrapButtons.fire({
    //     title: 'Voulez vous supprimer cet enregistrement ?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'oui, Supprimer!',
    //     cancelButtonText: 'Non , Annuler!',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.service.deleteorganisme(id).subscribe({
    //         next: res => {
    //           console.log(res)
    //           this.getallirganisme()
    //           Swal.fire(
    //             {
    //               toast: true,
    //               position: 'top-end',
    //               showConfirmButton: false,
    //               timer: 5000, title: 'Supprimé avec succées',
    //               icon: 'success',
    //             })
    //         }


    //       })

    //     } else if (
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) {
    //       Swal.fire(
    //         {
    //           toast: true,
    //           position: 'top-end',
    //           showConfirmButton: false,
    //           timer: 5000, title: 'Opération annlé',
    //           icon: 'success',
    //         })
    //     }
    //   })

  }
}


