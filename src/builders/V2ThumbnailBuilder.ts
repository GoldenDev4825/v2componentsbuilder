import { APIThumbnailComponent, ComponentType, APIUnfurledMediaItem } from 'discord-api-types/v10';

export class V2ThumbnailBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.Thumbnail;
  public readonly media!: APIUnfurledMediaItem;
  public readonly description?: string;
  public readonly spoiler?: boolean;

  public constructor(media?: APIUnfurledMediaItem) {
    if (media) this.setThumbnail(media);
  }

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setDescription(description: string): this {
    if (description.length > 1024) {
      throw new Error("Description text max length is 1024 characters");
    }
    Reflect.set(this, 'description', description);
    return this;
  }

  public setThumbnail(media: APIUnfurledMediaItem): this {
    Reflect.set(this, 'media', media);
    return this;
  }
  
  public setURL(url: string): this {
    Reflect.set(this, 'media', { url });
    return this;
  }

  public setSpoiler(spoiler: boolean): this {
    Reflect.set(this, 'spoiler', spoiler);
    return this;
  }

  public toJSON(): APIThumbnailComponent {
    if (!this.media) throw new Error("Thumbnail media item is required");

    return {
      id: this.id,
      type: this.type as ComponentType.Thumbnail,
      media: this.media,
      spoiler: this.spoiler ?? false,
      description: this.description,
    };
  }
}