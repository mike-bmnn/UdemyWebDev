import {Post} from "./post.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post.postid
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: number){
    return {
      ...this.posts.find(p => p.id == id)
    }
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content}
    this.httpClient.post<{ message: string, id: number }>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      post.id = responseData.id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts])
    })
  }

  deletePost(postId: number) {
    this.httpClient.delete<{ message: string }>('http://localhost:3000/api/posts/' + postId).subscribe((responseData)=>{
      console.log(responseData);
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.posts])
    })
  }
}
