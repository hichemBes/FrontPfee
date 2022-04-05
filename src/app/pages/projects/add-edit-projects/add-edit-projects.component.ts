import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from 'src/app/core/DTO/user-dto';
import { Project } from 'src/app/core/models/project';
import { VisAVis } from 'src/app/core/models/vis-avis';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-edit-projects',
  templateUrl: './add-edit-projects.component.html',
  styleUrls: []
})
export class AddEditProjectsComponent implements OnInit {
  projectForm:FormGroup
  event:EventEmitter<any>=new EventEmitter()
  @Input() project:Project={}
  resultedUserList:UserDto[]=[]
   constructor(public activeModal:NgbActiveModal, private projectService:ProjectService,
     private userService:UserService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.createProjectForm(this.project)
  }

  createProjectForm(project:Project) {
    this.projectForm=new FormGroup({
      projectId: new FormControl(project.projectId==undefined? '00000000-0000-0000-0000-000000000000' : project.projectId),
      projectName: new FormControl(project.projectName,Validators.required),
      projectDescription: new FormControl(project.projectDescription, Validators.required),
      startDate: new FormControl(project.startDate==undefined? new Date():this.datePipe.transform(project.startDate,'yyyy-MM-dd')),
      visAvis: new FormControl(project.visAvis==undefined?[]:project.visAvis),
    //  realDuration: new FormControl(project.color),
      creationDate: new FormControl(project.creationDate==undefined? new Date(): new Date(project.creationDate)),
      closedDate: new FormControl(project.closedDate==undefined? new Date(): this.datePipe.transform(project.closedDate,'yyyy-MM-dd')),
      activeState: new FormControl(project.activeState==undefined? true: project.startDate),
      color: new FormControl(project.color)
    })
   
  }
  onSelectVisAVis(users:UserDto[]){
    users.forEach(u=>{
      if(this.projectForm.controls.visAvis?.value.filter(v=>v.fk_user==u.userID).length==0){
        var visAvis:VisAVis={
          fk_user:u.userID,
          matricule:u.matricule,
          fk_Project: '00000000-0000-0000-0000-000000000000'
        }
        this.projectForm.controls.visAvis.setValue(this.projectForm.controls.visAvis.value.concat(visAvis))

      }
   
    })
  
  }

  onSubmit(){
    if(this.projectForm.value.projectId=='00000000-0000-0000-0000-000000000000'){
      this.projectService.addproject(this.projectForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
    else{
      this.projectService.editproject(this.projectForm.value).subscribe((res)=>{
        this.event.emit('refresh')
      })      
    }
  }
  onSearchChange(event: any) {
    if (event.term.length >= 3) {
      this.userService.serachUserWithKeyWord(event.term).subscribe((res: any) => {
        this.resultedUserList = res as any[]
      }
      )
    }
  }

}
