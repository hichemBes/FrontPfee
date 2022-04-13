import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categtypeservice } from '../core/services/categtyperequest.service';
import { CategorieService } from './../core/services/categorie.service';

@Component({
  selector: 'app-typerequestcatg',
  templateUrl: './typerequestcatg.component.html',
  styleUrls: ['./typerequestcatg.component.scss']
})
export class TyperequestcatgComponent implements OnInit {
  categories: any
  actionTypeForm: FormGroup = new FormGroup({})
  utlisateurs: any
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()

  constructor(private c: CategorieService, public activeModal: NgbActiveModal, private fb: FormBuilder, private s: Categtypeservice) { }

  ngOnInit(): void {
    this.getallCategorie()
  }

  searchForm = this.fb.group({

    fk_CategoryId: '',

  });
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
    d['fK_typeRequest'] = this.fromParent
    this.s.post(d).subscribe(data => {
      this.event.emit('refresh')
    })

  }

}
