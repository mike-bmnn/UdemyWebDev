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

  private mode = 'create';
  private postId : number;
  post: any;


  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = Number(paramMap.get('postId'));
        console.log(this.postId);
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
      }
    });
  }

  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
