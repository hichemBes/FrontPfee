import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-addfunction',
  templateUrl: './addfunction.component.html',
  styleUrls: ['./addfunction.component.scss']
})
export class AddfunctionComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})

  @Input()
  event: EventEmitter<any> = new EventEmitter()

  constructor(private sa: FunctionService, public activeModal: NgbActiveModal, private route: Router) { }

  ngOnInit(): void {
  }
  onSubmit(f: any) {
    this.sa.post(f.value).subscribe((data) => {
      this.event.emit('refresh')
    })
  }
}