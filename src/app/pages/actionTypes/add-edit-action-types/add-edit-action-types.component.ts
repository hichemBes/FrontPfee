import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/core/models/action-type';
import { ActionTypeService } from 'src/app/core/services/action-type.service';

@Component({
  selector: 'app-add-edit-action-types',
  templateUrl: './add-edit-action-types.component.html',
  styleUrls: []
})
export class AddEditActionTypesComponent implements OnInit {
  actionTypeForm:FormGroup=new FormGroup({})
  @Input() actionType:ActionType={}
  event:EventEmitter<any>=new EventEmitter()
  constructor(public activeModal:NgbActiveModal, private actionTypeService:ActionTypeService) { }

  ngOnInit(): void {
    this.createActionTypeForm(this.actionType)
  }
  createActionTypeForm(type:ActionType){
    this.actionTypeForm=new FormGroup({
      actionTypeId: new FormControl(type.actionTypeId==undefined? '00000000-0000-0000-0000-000000000000' : type.actionTypeId),
      actionTypeName: new FormControl(type.actionTypeName, Validators.required),
    })
  }
  onSubmit(){
    if(this.actionTypeForm.value.actionTypeId=='00000000-0000-0000-0000-000000000000'){
      this.actionTypeService.addType(this.actionTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
    else{
      this.actionTypeService.editType(this.actionTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
  }
}
