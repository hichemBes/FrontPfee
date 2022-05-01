import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/core/services/userauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {
  role: any
  verif = false
  responsable = false;
  c: any
  constructor(private sa: UserauthService) { }

  ngOnInit(): void {
    this.verif = this.sa.Role()
    if (localStorage.getItem("Role") == "responsable") {
      console.log('aaaa')
      this.responsable = true
    }
  }
}