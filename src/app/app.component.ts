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
  data:Gitissue[];
  gitrepo = new FormControl('');
  ngOnInit(){
  
  }
  constructor(private apiService: ApiService){
   
  }
  getIssue(){
    this.apiService.getRepoIssue(this.gitrepo.value).subscribe((res:Gitissue[])=>{
      console.log(res);
      this.data=res;
    });  
  }
}
