import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Post {
    id: string;
    title: string;
}

export interface Posts {
    [id: string]: Post
}

export interface PostComment {
    id: string;
    content: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private readonly POSTS_URL_API = `http://localhost:4000/posts`;
    private readonly COMMENTS_URL_API = `http://localhost:4001/posts/:id/comments`;
    private readonly http = inject(HttpClient);

    getPosts(): Observable<Posts> {
        return this.http.get<Posts>(this.POSTS_URL_API);
    }

    createPost(title: string): Observable<Post> {
        return this.http.post<Post>(this.POSTS_URL_API, {title});
    }

    getComments(postId: string): Observable<PostComment[]> {
        return this.http.get<PostComment[]>(this.COMMENTS_URL_API.replace(':id', postId));
    }

    createComment(postId: string, content: string) {
        return this.http.post<PostComment[]>(this.COMMENTS_URL_API.replace(':id', postId), {content});
    }
}
