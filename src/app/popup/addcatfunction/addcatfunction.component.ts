import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-addcatfunction',
  templateUrl: './addcatfunction.component.html',
  styleUrls: ['./addcatfunction.component.scss']

})
export class AddcatfunctionComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  @Input() fromParent
  fonctions: any
  p: any;
  event: EventEmitter<any> = new EventEmitter()

  constructor(private f: FunctionService, private fb: FormBuilder, public activeModal: NgbActiveModal, private route: Router, private c: CategorieService) { }

  ngOnInit(): void {
    this.getall()
  }
  searchForm = this.fb.group({
    fk_User: ''
  });
  getall() {
    this.f.getallfunction().subscribe(data => {

      this.fonctions = data


    },
      err => {
        console.log(err)
      })

  }
  submit() {
    var d = this.searchForm.value.fk_User
    console.log(d)
    var c = this.fromParent.id
    console.log(c)
    var data = {
      "fk_IdFunction": d,
      "fk_CategoryId": c
    }
    this.c.addcategoriefunction(data).subscribe(res => {
      this.event.emit('refresh')
    }, err => {
      console.log(err)
    }
    )
    // var c = this.fromParent.fk_Function



  }

}
