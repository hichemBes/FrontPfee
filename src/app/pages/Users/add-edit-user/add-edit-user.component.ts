import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from 'src/app/core/DTO/user-dto';
import { User } from 'src/app/core/models/user';
import { IdentityServerService } from 'src/app/core/services/identity-server.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: []
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({})
  @Input() user: User = {} 
  resultedUserList: any[] = []
  AppRoleList: any[] = [];
  event: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private identityService: IdentityServerService, private userService: UserService) { }

  ngOnInit(): void {
    this.createUserForm(this.user)
    this.getRolesByApplicationId()
  }
  createUserForm(user: User) {
    this.userForm = new FormGroup({
      userID: new FormControl(user.userID == undefined ? '00000000-0000-0000-0000-000000000000' : user.userID),
      appRoleId: new FormControl(user.appRoleId == undefined ? '00000000-0000-0000-0000-000000000000' : user.appRoleId)
    })

  }
  onSearchChange(event: any) {
    if (event.term.length >= 3) {
      this.userService.serachUserWithKeyWord(event.term).subscribe((res: any) => {
        this.resultedUserList = res as any[]
      }
      )
    }
  }
  getRolesByApplicationId() {
    this.identityService.getRoleByApplicationId().subscribe(
      res => {
        this.AppRoleList = res as any[]
      }
    )
  }
  onSubmit() {
    let identityUserObject=new UserDto ();

    let selectedUser = this.resultedUserList.find(u => u.userID == this.userForm.value.userID)
    identityUserObject.applicationId = environment.ApplicationId
    identityUserObject.userEmployeeId = selectedUser.matricule
    identityUserObject.userUserName = selectedUser.matricule
    identityUserObject.userFullName = selectedUser.fullName
    identityUserObject.userEmail = selectedUser.lotusAdress
    identityUserObject.userSubsidiaryCode = selectedUser.subsidiaryCode
    identityUserObject.userPassword = selectedUser.matricule
    identityUserObject.userIsEnabled = selectedUser.isActive
    identityUserObject.userApplicationRoles==undefined?identityUserObject.userApplicationRoles=[] : identityUserObject.userApplicationRoles=identityUserObject.userApplicationRoles
    identityUserObject.userApplicationRoles.push({ roleId: this.userForm.value.appRoleId, roleName: '' })
    //debugger
    this.identityService.postUser(identityUserObject).subscribe(res => {
      console.log(res);
      this.event.emit('refresh')
      // this.identityService.getUsersByAppId().subscribe(res => {
      //   this.identityService.listUsersByAppId = res as any[]
      // })
    })    
  }

}
