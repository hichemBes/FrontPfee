import { Component, OnInit } from '@angular/core';
import { UserauthService } from '../core/services/userauth.service';
import { Router } from '@angular/router';
import { RequestService } from './../core/services/request.service';
import { SignalRService } from '../core/services/singal.service';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public chartLabels: string[] = ['Statistique sur  Les Demandes  '];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]
  data: any
  role: any;
  username: any;
  number
  total
  Cours
  notDone
  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  constructor(private sa: UserauthService, private route: Router, private req: RequestService, public http: HttpClient, public signalRService: SignalRService) {
    this.username = localStorage.getItem('username')
    this.getrequestuser()
    console.log("username ", this.username)
    if (this.sa.Role() == true) {
      this.role = "Admin"

    }

    if (this.sa.loggedIn() == false) {
      this.route.navigate(["login"])
    }
    else {
      this.role = this.sa.Role()
    }
    // if (this.sa.loggedIn() == true) {
    //   console.log("connected")
    // } else {

    //   this.route.navigate(["login"])

    // }
  }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:44324/chart')
      .build();
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      console.log('error', err.toString())
      return console.error(err.toString());

    });

    connection.on("transferchartdata", () => {
      this.startHttpRequest()
      console.log("transferchartdata")




    })
    this.startHttpRequest()


  }
  public startHttpRequest = () => {
    this.http.get('https://localhost:44324/api/Chart/Get2')
      .subscribe(res => {
        this.data = res
        console.log(res);
      })
  }

  getrequestuser() {
    var id = localStorage.getItem("userid")
    console.log(id)
    this.req.getstatitcs(id).subscribe(
      data => {
        this.number = data
        this.total = this.number.total
        this.notDone = this.number.waitingvalidation
        this.Cours = this.number.inProgress
        if (this.number == null) {
          this.number = 0
        }
        console.log(this.number)
      }, error => {
        console.log(error)
      }

    )

  }
}