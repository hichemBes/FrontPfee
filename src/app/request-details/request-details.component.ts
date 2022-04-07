import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  de: any;
  tab: any = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.de = this.route.snapshot.paramMap.get("detail")
    console.log(this.de)
  }

}
