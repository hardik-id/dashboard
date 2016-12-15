import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ChatService} from "./chat-service";
import * as _ from 'lodash';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {


  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;



  messages = [];
  positiveMessage = [];
  neutralMessages = [];
  negativeMessages = [];
  noResultMessages=[];
  connection;
  message;
  mood=1;


  public doughnutChartLabels: string[] = ['Negative', 'Positive', 'Neutral'];
  public doughnutChartData: number[] = [1, 1, 1];
  public doughnutChartType: string = 'doughnut';
  public doughtnutChartOptions: any = {"animation": "false"};

  keywords = [];
  activeKeywordIndex;

  constructor(private chatService: ChatService) {
    /*this.alerts.push({
      type: 'success',
      message: 'This is an success alert'
    });*/
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  sendMessage(key) {
    this.keywords.push(key.value);
  }

  start() {
    console.log("inside start");
    this.chatService.startStream(this.keywords);
  }

  stop() {
    this.chatService.stopStream();
  }

  public countChanged = false;

  ngOnInit() {
    setInterval(() => {
      if (this.countChanged) {
        this.doughnutChartData = [this.negativeMessages.length, this.positiveMessage.length, this.neutralMessages.length];
        this.countChanged = false;
      }
    }, 2000);
    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log("Message received");
      this.countChanged = true;
      let response = <any> message;
      let tweet = JSON.parse(response.text);
      console.log(tweet);
      if(tweet.message){
        console.log(tweet.message);
        var words = _.words(tweet.message);
        console.log(words);
        if(words.indexOf('down') > 0 || words.indexOf('ddos') > 0 || words.indexOf('hack') > 0){
          console.log(tweet.message);
          this.alerts.push({type: 'danger',message: tweet});
          this.chatService.sendMail(tweet);
        }
      }
      //console.log(JSON.parse(message));
      this.messages.unshift(tweet);
      if (tweet.sentiment == 'Negative' || tweet.miimg == 'Negative'  || (tweet.misenti > 0 && tweet.misenti <= 40 ) || (tweet.ibm.score > 0 && tweet.ibm.score <= 80 )) {
        this.negativeMessages.unshift(tweet);
      }else if (tweet.sentiment == 'Positive' || tweet.misenti >= 66 || tweet.ibm.score >= 132 || tweet.miimg == 'Positive') {
        console.log({P: tweet});
        this.positiveMessage.unshift(tweet);
      } else if (tweet.sentiment == 'Neutral' || (tweet.misenti < 66 && tweet.misenti > 40 ) || (tweet.ibm.score < 132 && tweet.ibm.score > 80 ) || tweet.ibm.type == 'neutral' ) {
        console.log({N: tweet});
        this.neutralMessages.unshift(tweet);
      } else if (tweet.sentiment == 'NoResult' || tweet.misent == 0 || tweet.ibm.score == 0) {
        this.noResultMessages.unshift(tweet);
      }
      this.findMood();
    })
  }

  public findMood(){
    let totalCount = this.messages.length;
    let positiveCount = this.positiveMessage.length;
    let per = positiveCount * 100 / totalCount;
    console.log("Finding MOOODDD:::::::::::::");
    if(per >= 80 ){
      this.mood=1;
    }else if(per < 80 && per >= 60){
      this.mood=2;
    }else if(per < 60 && per >= 40){
      this.mood=3;
    }else if(per < 40 && per >= 20){
      this.mood=4;
    }else if(per < 20){
      this.mood=5;
    }
console.log(this.mood);
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}

export interface IAlert {
  type: string;
  message: string;
}
