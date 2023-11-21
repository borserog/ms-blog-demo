import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Post {
  id: string;
  title: string;
}

export interface PostComment {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending'
}

export interface PostWithComments extends Post {
  comments: PostComment[];
}

export interface Posts {
  [id: string]: PostWithComments
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly ORIGIN = "http://posts.com";
  private readonly POSTS_CREATE_URL_API = `${this.ORIGIN}/posts/create`;
  private readonly COMMENTS_URL_API = `${this.ORIGIN}/posts/:id/comments`;
  private readonly QUERY_URL_API = `${this.ORIGIN}/posts`;
  private readonly http = inject(HttpClient);

  getPosts(): Observable<Posts> {
    return this.http.get<Posts>(this.QUERY_URL_API);
  }

  createPost(title: string): Observable<Post> {
    return this.http.post<Post>(this.POSTS_CREATE_URL_API, {title});
  }

  createComment(postId: string, content: string) {
    return this.http.post<PostComment[]>(this.COMMENTS_URL_API.replace(':id', postId), {content});
  }
}
