import { Component, OnInit } from '@angular/core';
import { RequestService } from './../core/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PieceService } from './../core/services/piece.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddrequestComponent } from './../popup/addrequest/addrequest.component';
import { AddpieceComponent } from './../addpiece/addpiece.component';
import { FormGroup } from '@angular/forms';

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
  searchForm: FormGroup = new FormGroup({})
  search: any
  constructor(private req: RequestService, private modalService: NgbModal, private route: ActivatedRoute, private piece: PieceService) { }

  ngOnInit(): void {
    this.de = this.route.snapshot.paramMap.get("detail")
    console.log(this.de)
    this.getrequestdetails()
    this.getallpiecejointe()

  }
  addPieces() {

    const config = { backdrop: true, size: 'lg' }
    var modalRef = this.modalService.open(AddpieceComponent, config)
    modalRef.componentInstance.fromParent = this.de

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

  getp(id: any, c: any) {
    console.log(typeof (id), id)
    console.log(c)
    this.piece.getpiece(id).subscribe(blob => {

      const a = document.createElement('a')



      const objectUrl = URL.createObjectURL(blob.body)
      a.href = objectUrl
      a.download = c;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }

    )


  }
  Search() {


    if (this.search == "") {
      this.ngOnInit();

    } else {
      this.pieces = this.pieces.filter(res => {
        return res.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
}
