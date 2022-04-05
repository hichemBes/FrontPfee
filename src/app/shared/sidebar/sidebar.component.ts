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
  c: any
  constructor(private sa: UserauthService) { }

  ngOnInit(): void {
    this.verif = this.sa.Role()


  }
}