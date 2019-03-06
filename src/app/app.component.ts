import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Gitissue } from './gitissue';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Gitissue[];
// Form Control Declaration
  gitrepo = new FormControl('');

  // Initialize result count into fixed array
  result: [0, 0, 0, 0];

  //Toggle the view for sucess and failure
  showtable: boolean;
  ngOnInit() {

  }
  constructor(private apiService: ApiService) {

  }
  getIssue() {
    this.result = [0, 0, 0, 0];
    this.apiService.getRepoIssue(this.gitrepo.value).subscribe((res: Gitissue[]) => {
      this.showtable = true;
      console.log(res);
      this.data = res;
      var today = new Date();
      this.data.forEach(dat => {
// Calculation of number of days passed till now from issue posted date
        var diff = Math.abs(today.getTime() - new Date(dat.created_at).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        console.log(diffDays);

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
      );
    }, error => {
      this.showtable = false;
      alert("OOPS! Git Repository NOT FOUND 404.");
    });
  }


}
