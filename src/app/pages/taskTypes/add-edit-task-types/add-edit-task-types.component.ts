import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskType} from 'src/app/core/models/task-type'
import { TaskTypeService } from 'src/app/core/services/task-type.service';
@Component({
  selector: 'app-add-edit-task-types',
  templateUrl: './add-edit-task-types.component.html',
  styleUrls: []
})
export class AddEditTaskTypesComponent implements OnInit {
  taskTypeForm:FormGroup
  @Input() taskType:TaskType={}
  event:EventEmitter<any>=new EventEmitter()
  constructor(public activeModal:NgbActiveModal, private taskTypeService:TaskTypeService) { }

  ngOnInit(): void {
    this.createTaskTypeForm(this.taskType)
  }
  createTaskTypeForm(taskType:TaskType){
    this.taskTypeForm=new FormGroup({
      taskTypeId:new FormControl(taskType.taskTypeId==undefined?'00000000-0000-0000-0000-000000000000':taskType.taskTypeId),
      taskTypeName:new FormControl(taskType.taskTypeName)
    })
  
  }
  onSubmit(){
    if(this.taskTypeForm.value.taskTypeId=='00000000-0000-0000-0000-000000000000'){
      this.taskTypeService.addType(this.taskTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })
    }
    else{
      this.taskTypeService.editType(this.taskTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })
    }
  }

}
 