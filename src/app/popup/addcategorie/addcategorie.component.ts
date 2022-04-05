import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from './../../core/services/categorie.service';

@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.scss']
})
export class AddcategorieComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})

  @Input()
  event: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal, private route: Router, private c: CategorieService) { }

  ngOnInit(): void {
  }
  onSubmit(f: any) {
    this.c.post(f.value).subscribe(data => {
      console.log(data),
        this.event.emit('refresh')

    })
  }
}