import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ChartModel } from '../models/ChartModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    // constructor(private _http: HttpClient) { }
    // public data: ChartModel[];
    // private hubConnection: signalR.HubConnection
    // public startConnection = () => {
    //     this.hubConnection = new signalR.HubConnectionBuilder()
    //         .configureLogging(signalR.LogLevel.Information)
    //         .withUrl('https://localhost:5001/chart')
    //         .build();
    //     this.hubConnection
    //         .start()
    //         .then(() => console.log('Connection started'))
    //         .catch(err => console.log('Error while starting connection: ' + err))
    // }
    // public addTransferChartDataListener = () => {
    //     this.hubConnection.on('transferchartdata', (data) => {
    //         this.data = data;
    //         console.log(data);
    //     });
    // }
    // public startHttpRequest = () => {
    //     this._http.get('https://localhost:5001/api/chart')
    //         .subscribe(res => {
    //             console.log(res);
    //         })
    // }
}