import { ComponentType, APIFileComponent, APIUnfurledMediaItem } from 'discord-api-types/v10';

export class V2FileBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.File;
  public readonly file!: APIUnfurledMediaItem;
  public readonly spoiler?: boolean;

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setFile(file: APIUnfurledMediaItem): this {
    Reflect.set(this, 'file', file);
    return this;
  }

  public setURL(url: string): this {
    Reflect.set(this, 'file', { url });
    return this;
  }

  public setSpoiler(spoiler: boolean): this {
    Reflect.set(this, 'spoiler', spoiler);
    return this;
  }

  public toJSON(): APIFileComponent {
    if (!this.file) throw new Error("File media item is required");

    return {
      id: this.id,
      type: this.type as ComponentType.File,
      file: this.file,
      spoiler: this.spoiler ?? false,
    };
  }
}