import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  //private url = 'http://ec2-54-187-214-87.us-west-2.compute.amazonaws.com:3000';
  private mURL = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
  private socket;

  constructor(private http: Http){}

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  startStream(body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.url + '/tweets/start-stream',{keywords : body.join()},options).subscribe();
    return;
  }
  stopStream(){
    this.http.get(this.url + '/tweets/stop-stream').subscribe();
    return;
  }

  getMicrosoftCogn(txt){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Ocp-Apim-Subscription-Key', 'd220b2fb4b2b4f23a996993368ed3c69');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "documents": [
        {
          "language": "en",
          "id": "string",
          "text": "This is amazing, it works like charm."
        }
      ]
    };
    this.http.post(this.mURL,body,options).subscribe(function (data) {
      console.log(data);
    });
  }
}
