import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  private createMode = true;
  private postId : number;
  post: any;


  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.createMode = false;
        this.postId = Number(paramMap.get('postId'));
        console.log(this.postId);
        this.post = this.postService.getPost(this.postId);
      } else {
        this.createMode = true;
      }
    });
  }

  onSavePost(form: NgForm){
    if (form.invalid){
      return;
    }
    if (this.createMode){
      this.postService.addPost(form.value.title, form.value.content);
    }
    else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
