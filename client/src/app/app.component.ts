import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Posts, PostsService} from "../services/posts.service";
import {Observable, startWith, Subject, switchMap} from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly #postsService = inject(PostsService);
  readonly #loadPosts$ = new Subject<void>();
  newPost = new FormControl('');
  posts$: Observable<Posts> = this.#loadPosts$.pipe(
    startWith(null),
    switchMap(() => {
      return this.#postsService.getPosts();
    })
  )

  ngOnInit() {
    this.#loadPosts$.next();
  }

  createPost(title: string | null) {
    this.#postsService.createPost(title || '-').subscribe(() => this.#loadPosts$.next());
  }

}
