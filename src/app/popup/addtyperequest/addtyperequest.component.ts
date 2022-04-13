import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/core/services/categorie.service';
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
  categories: any

  event: EventEmitter<any> = new EventEmitter()


  constructor(public activeModal: NgbActiveModal, private c: CategorieService, private fb: FormBuilder, private route: Router, private s: typeRequestService) { }

  ngOnInit(): void {
    this.getallCategorie()
  }
  searchForm = this.fb.group({

    requestTypeName: ''
  });

  onSubmit(f: any) {
    this.s.post(f.value).subscribe(data => {
      this.event.emit('refresh')
    })

  }
  getallCategorie() {
    this.c.getallcategories().subscribe(data => {
      this.categories = data
      console.log(this.categories)

    }, err => {
      console.log(err)
    }
    )
  }
  submit() {
    var d = this.searchForm.value
    console.log(d)
    this.s.post(d).subscribe(data => {
      this.event.emit('refresh')
      console.log(data)
    }, err => {
      console.log(err)
    }
    )


  }
}
