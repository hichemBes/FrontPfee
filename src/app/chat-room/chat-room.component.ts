import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  messages = [];
  d;
  username
  message = '';
  constructor(private http: HttpClient) {
    this.username = localStorage.getItem('username')
  }

  ngOnInit(): void {
    this.getrealtimechat()
    Pusher.logToConsole = true;

    const pusher = new Pusher('557ecfdf74158e3e9d03', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.messages.push(data)
      this.http.get('https://localhost:44324/api/Chat/getMessages').subscribe(
        data => {
          console.log(data)
          this.d = data
          console.log(this.d)


          this.getrealtimechat()
        }
        , err => {
          console.log(err)
        }
      )


      console.log(this.messages)

    });


  }
  submit(): void {
    this.http.post('https://localhost:44324/api/Chat', {
      username: this.username,
      message: this.message
    }).subscribe(() => {
      this.message = '',
      this.getrealtimechat()


    });
  }



  getrealtimechat() {
    this.http.get('https://localhost:44324/api/Chat/getMessages').subscribe(
      data => {
        console.log(data)
        this.d = data



      }
      , err => {
        console.log(err)
      }
    )

  }
}