import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsService, PostWithComments} from "../../services/posts.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: PostWithComments;
  @Output() requestPostsReload = new EventEmitter<void>();

  readonly #postsService = inject(PostsService);

  // comments$: Observable<PostComment[]> = this.#loadComments.pipe(
  //     startWith(null),
  //     switchMap(() => {
  //         return this.#postsService.getComments(this.post.id);
  //     })
  // );
  comment = new FormControl();

  createComment(id: string) {
    this.#postsService.createComment(this.post.id, this.comment.value).subscribe(() => {
      this.comment.reset('');
      this.requestPostsReload.emit();
    });
  }

  reload() {
    this.requestPostsReload.emit();
  }
}
