import {NewStory} from './newStory.model';
import {Picture} from './picture.model';
import {StoryComment} from './storyComment.model';
import {StoryLike} from './storyLike.model';

export class Story extends NewStory {
  public id: string;
  public pictures: Array<Picture>;
  public likes: Array<StoryLike>;
  public comments: Array<StoryComment>;

  constructor(userId: string, title: string, text: string, color: string, id?: string, pictures?: Array<Picture>, likes?: Array<StoryLike>, comments?: Array<StoryComment>
  ) {
    super(userId, title, text, color);
    this.id = id;
    this.pictures = pictures;
    this.likes = likes;
    this.comments = comments;
  }
}
