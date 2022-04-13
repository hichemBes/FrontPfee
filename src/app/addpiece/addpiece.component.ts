import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PieceService } from './../core/services/piece.service';

@Component({
  selector: 'app-addpiece',
  templateUrl: './addpiece.component.html',
  styleUrls: ['./addpiece.component.scss']
})
export class AddpieceComponent implements OnInit {
  actionTypeForm: FormGroup = new FormGroup({})
  selectedFile: File;
  @Input() fromParent
  event: EventEmitter<any> = new EventEmitter()
  constructor(public activeModal: NgbActiveModal, private p: PieceService) { }
  formData = new FormData();
  ngOnInit(): void {
    console.log(this.fromParent)
  }
  submit() {

  }
  chooseFile(files: FileList) {

    this.selectedFile = files[0];
  }
  upload() {

    this.formData = new FormData();
    this.formData.append('files', this.selectedFile);


    this.p.upload(this.fromParent, this.formData).subscribe(data => {
      console.log(data)
      this.event.emit('refresh')
    },
      err => {
        console.log(err)
      })



  }
  onSubmit(f: any) {
    console.log(f.value)
  }
}