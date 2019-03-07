import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Gitissue } from './gitissue';
import { FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Gitissue[];
  // Form Control Declaration
  gitrepo = new FormControl();
  // Variable for spinner
  spinner:boolean=false;

  // Initialize result count into fixed array
  result: [0, 0, 0, 0];

  //Toggle the view for sucess and failure
  showtable: boolean;
  ngOnInit() {

  }
  constructor(private apiService: ApiService) {

  }
  calculate(data: Gitissue[]) {
    var today = new Date();
    data.forEach(dat => {
      // Calculation of number of days passed till now from issue posted date
      // If pull request exist it in not a issue
      if (dat.pull_request == null) {
        var diff = Math.abs(today.getTime() - new Date(dat.created_at).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        // console.log(diffDays);

        //Segraration of count
        this.result[0]++;
        if (diffDays < 1) {
          this.result[1]++;
        } else if (diffDays < 7) {
          this.result[2]++;
        } else {
          this.result[3]++;
        }
      }

    }
    );
  }
  getIssue() {
    this.result = [0, 0, 0, 0];
    this.spinner=true;
    this.showtable = false;
    this.apiService.getRepoIssue(this.gitrepo.value.trim(), 1).subscribe((res) => {
      
      this.result = [0, 0, 0, 0];
      this.data = <Gitissue[]>res.body;
      this.calculate(this.data);

      if (res.headers.get('link') != null) {
        // Fetching the total number of pages from link header
        var x = res.headers.get('link').split(",")[1].split(";")[0];
        console.log(x.substring(2, x.length - 1));
        var url = new URL(x.substring(2, x.length - 1));
        let c = url.searchParams.get("page");
        // var icnt=2;

        var tasks$ = [];
    
        for (var i = 2; i <= Number(c); i++) {
          tasks$.push(this.apiService.getRepoIssue(this.gitrepo.value.trim(), i));
         

        }

        // Joining all async api calls
        forkJoin(tasks$).subscribe(results => {
          for (var i = 0; i < results.length; i++) {
            var data = <Gitissue[]>results[i].body;
            this.calculate(data);
          }
          this.spinner=false;
          this.showtable = true;
        });
      }else{
        this.spinner=false;
        this.showtable = true;
      }

      

    }, error => {
      this.showtable = false;
      this.spinner=false;
      alert("OOPS! Git Repository NOT FOUND 404.");
    });
  }


}
