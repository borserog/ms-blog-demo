import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Posts, PostsService} from "../services/posts.service";
import {Observable, startWith, Subject, switchMap} from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostCardComponent} from "./post-card/post-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, PostCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly #postsService = inject(PostsService);
  readonly #loadPosts$ = new Subject<void>();
  newPost = new FormControl('');
  posts$: Observable<Posts> = this.#loadPosts$.pipe(
    startWith(null),
    switchMap(() => {
      return this.#postsService.getPosts();
    })
  )

  createPost(title: string | null) {
    this.#postsService.createPost(title || '-').subscribe(() => {
      this.newPost.reset('');
      this.#loadPosts$.next()
    });
  }

  onNewComment() {
    this.#loadPosts$.next();
  }
}
