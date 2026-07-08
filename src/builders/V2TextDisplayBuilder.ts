import { APITextDisplayComponent, ComponentType } from 'discord-api-types/v10';

export class V2TextDisplayBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.TextDisplay;
  public readonly content!: string;

  public constructor(content?: string) {
    if (content) this.setContent(content);
  }

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setContent(content: string): this {
    Reflect.set(this, 'content', content);
    return this;
  }

  public toJSON(): APITextDisplayComponent {
    if (!this.content && this.content !== "") {
      throw new Error("Content is required for Text Display");
    }

    return {
      id: this.id,
      type: this.type as ComponentType.TextDisplay,
      content: this.content,
    };
  }
}