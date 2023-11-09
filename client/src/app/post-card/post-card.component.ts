import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post, PostComment, PostsService} from "../../services/posts.service";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-post-card',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
})
export class PostCardComponent {
    @Input() post!: Post;
    readonly #postsService = inject(PostsService);
    readonly #loadComments = new Subject<void>();

    comments$: Observable<PostComment[]> = this.#loadComments.pipe(
        startWith(null),
        switchMap(() => {
            return this.#postsService.getComments(this.post.id);
        })
    );
    comment = new FormControl();

    createComment(id: string) {
        this.#postsService.createComment(this.post.id, this.comment.value).subscribe(() => {
            this.comment.reset('');
            this.#loadComments.next();
        });
    }
}
