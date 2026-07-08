import { ComponentType, APIMediaGalleryComponent, APIMediaGalleryItem } from 'discord-api-types/v10';

export class V2MediaGalleryBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.MediaGallery;
  public readonly items: APIMediaGalleryItem[] = [];

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setItems(...items: (APIMediaGalleryItem | APIMediaGalleryItem[])[]): this {
    const flattenedItems = items.flat();
    if (flattenedItems.length < 1 || flattenedItems.length > 10) {
      throw new Error('Media Galleries must contain between 1 and 10 items');
    }
    
    for (const item of flattenedItems) {
      if (item.description && item.description.length > 1024) {
        throw new Error("Item description max length is 1024 characters");
      }
    }

    Reflect.set(this, 'items', flattenedItems);
    return this;
  }

  public addItems(...items: (APIMediaGalleryItem | APIMediaGalleryItem[])[]): this {
    const flattenedItems = items.flat();
    const newItems = [...this.items, ...flattenedItems];
    
    if (newItems.length > 10) {
      throw new Error('Media Galleries cannot exceed 10 items');
    }

    for (const item of flattenedItems) {
      if (item.description && item.description.length > 1024) {
        throw new Error("Item description max length is 1024 characters");
      }
    }

    Reflect.set(this, 'items', newItems);
    return this;
  }

  public toJSON(): APIMediaGalleryComponent {
    if (this.items.length === 0) {
      throw new Error("Media Galleries must contain at least 1 item");
    }

    return {
      id: this.id,
      type: this.type as ComponentType.MediaGallery,
      items: this.items,
    };
  }
}