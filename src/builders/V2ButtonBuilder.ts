import { ComponentType, ButtonStyle, APIMessageComponentEmoji, Snowflake, APIButtonComponent } from 'discord-api-types/v10';

export class V2ButtonBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.Button;
  public readonly style!: ButtonStyle;
  public readonly label?: string;
  public readonly emoji?: APIMessageComponentEmoji;
  public readonly custom_id?: string;
  public readonly sku_id?: Snowflake;
  public readonly url?: string;
  public readonly disabled?: boolean;

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setCustomId(custom_id: string): this {
    if (custom_id.length < 1 || custom_id.length > 100) {
      throw new Error("custom_id must be between 1 and 100 characters");
    }
    Reflect.set(this, 'custom_id', custom_id);
    return this;
  }

  public setLabel(label: string): this {
    if (label.length > 80) {
      throw new Error("Label max length is 80 characters");
    }
    Reflect.set(this, 'label', label);
    return this;
  }

  public setEmoji(emoji: string | APIMessageComponentEmoji): this {
    const formattedEmoji = typeof emoji === 'string' ? { name: emoji } : emoji;
    Reflect.set(this, 'emoji', formattedEmoji);
    return this;
  }

  public setStyle(style: ButtonStyle): this {
    Reflect.set(this, 'style', style);
    return this;
  }
  
  public setURL(url: string): this {
    if (url.length > 512) {
      throw new Error("URL max length is 512 characters");
    }
    Reflect.set(this, 'url', url);
    return this;
  }

  public setDisabled(disabled: boolean): this {
    Reflect.set(this, 'disabled', disabled);
    return this;
  }

  public setSKU(sku_id: string): this {
    Reflect.set(this, 'sku_id', sku_id);
    return this;
  }

  public toJSON(): APIButtonComponent {
    if (!this.style) throw new Error("Button style is required");

    if (this.style === ButtonStyle.Link) {
      if (!this.url) throw new Error("Link buttons must have a URL");
      if (this.custom_id) throw new Error("Link buttons cannot have a custom_id");
      
      return {
        id: this.id,
        type: this.type,
        style: ButtonStyle.Link,
        label: this.label,
        emoji: this.emoji,
        url: this.url,
        disabled: this.disabled ?? false,
      } as APIButtonComponent;
    } 
    
    if (this.style === ButtonStyle.Premium) {
      if (!this.sku_id) throw new Error("Premium buttons must have a sku_id");
      if (this.custom_id || this.label || this.url || this.emoji) {
        throw new Error("Premium buttons cannot have a custom_id, label, url, or emoji");
      }

      return {
        id: this.id,
        type: this.type,
        style: ButtonStyle.Premium,
        sku_id: this.sku_id,
        disabled: this.disabled ?? false,
      } as APIButtonComponent;
    }

    if (!this.custom_id) throw new Error("Non-link, non-premium buttons must have a custom_id");
    
    return {
      id: this.id,
      type: this.type,
      style: this.style,
      custom_id: this.custom_id,
      label: this.label,
      emoji: this.emoji,
      disabled: this.disabled ?? false,
    } as APIButtonComponent;
  }
}