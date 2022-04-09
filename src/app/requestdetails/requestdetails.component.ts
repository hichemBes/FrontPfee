import { Component, OnInit } from '@angular/core';
import { RequestService } from './../core/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PieceService } from './../core/services/piece.service';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {
  de: any
  tab: any
  p: any
  pieces: any
  constructor(private req: RequestService, private route: ActivatedRoute, private piece: PieceService) { }

  ngOnInit(): void {
    this.de = this.route.snapshot.paramMap.get("detail")
    console.log(this.de)
    this.getrequestdetails()
    this.getallpiecejointe()

  }
  getrequestdetails() {
    this.req.getrequestbyid(this.de).subscribe(data => {
      this.tab = data
      console.log(this.tab)

      if (this.tab.status == 'InProgress') {
        this.tab.status = 'En Cours'
      }
      console.log(this.tab)


    }, error => {
      console.log(error)
    })
  }
  getallpiecejointe() {
    this.piece.get(this.de).subscribe(data => {
      this.pieces = data
      console.log(this.pieces)
    },
      err => {
        console.log(err)
      })
  }

  getp(id: any) {
    console.log(typeof (id), id)
    this.piece.getpiece(id).subscribe(blob => {
      console.log(blob)
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = 'file';
      a.click();
      URL.revokeObjectURL(objectUrl);
    }

    )


  }
}
