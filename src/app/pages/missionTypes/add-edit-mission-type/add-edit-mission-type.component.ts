import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionType } from 'src/app/core/models/mission-type';
import { MissionTypesService } from 'src/app/core/services/mission-types.service';

@Component({
  selector: 'app-add-edit-mission-type',
  templateUrl: './add-edit-mission-type.component.html',
  styleUrls: []
})
export class AddEditMissionTypeComponent implements OnInit {
  MissionTypeForm:FormGroup=new FormGroup({})
  @Input() MissionType:MissionType={}
  event:EventEmitter<any>=new EventEmitter()
  constructor(public activeModal:NgbActiveModal, private MissionTypeService:MissionTypesService) { }

  ngOnInit(): void {
    this.createMissionTypeForm(this.MissionType)
  }
  createMissionTypeForm(type:MissionType){
    this.MissionTypeForm=new FormGroup({
      missionTypeId: new FormControl(type.missionTypeId==undefined? '00000000-0000-0000-0000-000000000000' : type.missionTypeId),
      missionTypeName: new FormControl(type.missionTypeName, Validators.required),
    })
  }
  onSubmit(){
    if(this.MissionTypeForm.value.missionTypeId=='00000000-0000-0000-0000-000000000000'){
      this.MissionTypeService.addType(this.MissionTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
    else{
      this.MissionTypeService.editType(this.MissionTypeForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
  }

}
