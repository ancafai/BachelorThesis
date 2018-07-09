import {LikeComment} from './likeComment.model';


export class StoryComment {
  public userId: string;
  public text: string;
  public likes: LikeComment;

  constructor(userId: string, text: string, likes: LikeComment) {
    this.userId = userId;
    this.text = text;
    this.likes = likes;
  }
}
