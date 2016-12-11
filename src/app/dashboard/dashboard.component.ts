import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from "./chat-service";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  messages = [];
  positiveMessage = [];
  neutralMessages = [];
  negativeMessages = [];
  noResultMessages=[];
  connection;
  message;

  public doughnutChartLabels: string[] = ['Negative', 'Positive', 'Neutral'];
  public doughnutChartData: number[] = [1, 1, 1];
  public doughnutChartType: string = 'doughnut';
  public doughtnutChartOptions: any = {"animation": "false"};

  keywords = [];
  activeKeywordIndex;

  constructor(private chatService: ChatService) {
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
      //console.log(JSON.parse(message));
      if (tweet.sentiment == 'Negative'  || (tweet.misenti > 0 && tweet.misenti <= 40 ) || (tweet.ibm.score > 0 && tweet.ibm.score <= 80 )) {
        this.negativeMessages.unshift(tweet);
      }else if (tweet.sentiment == 'Positive' || tweet.misenti >= 66 || tweet.ibm.score >= 132) {
        console.log({P: tweet});
        this.positiveMessage.unshift(tweet);
      } else if (tweet.sentiment == 'Neutral' || (tweet.misenti < 66 && tweet.misenti > 40 ) || (tweet.ibm.score < 132 && tweet.ibm.score > 80 ) ) {
        console.log({N: tweet});
        this.neutralMessages.unshift(tweet);
      } else if (tweet.sentiment == 'NoResult' || tweet.misent == 0 || tweet.ibm.score == 0) {
        this.noResultMessages.unshift(tweet);
      }

    })
  }

getMicrosoftCogn(){
  //this.chatService.getMicrosoftCogn();
}

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
