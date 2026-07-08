import { ComponentType, APIContainerComponent, APIComponentInContainer } from 'discord-api-types/v10';
import { type V2ActionRowBuilder } from './V2ActionRowBuilder';
import { type V2TextDisplayBuilder } from './V2TextDisplayBuilder';
import { type V2SectionBuilder } from './V2SectionBuilder';
import { type V2MediaGalleryBuilder } from './V2MediaGalleryBuilder';
import { type V2SeparatorBuilder } from './V2SeparatorBuilder';
import { type V2FileBuilder } from './V2FileBuilder';

type AllowedChildren =
  | V2ActionRowBuilder
  | V2TextDisplayBuilder
  | V2SectionBuilder
  | V2MediaGalleryBuilder
  | V2SeparatorBuilder
  | V2FileBuilder;

export class V2ContainerBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.Container;
  public readonly components: APIComponentInContainer[] = [];
  public readonly accent_color?: number;
  public readonly spoiler?: boolean;

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setComponents(...components: (AllowedChildren | AllowedChildren[])[]): this {
    const flattenedComponents = components.flat();
    if (flattenedComponents.length < 1 || flattenedComponents.length > 10) {
      throw new Error('Containers must contain between 1 and 10 components.');
    }
    Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
    return this;
  }

  public addComponents(...components: (AllowedChildren | AllowedChildren[])[]): this {
    const flattenedComponents = components.flat();
    const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON() as APIComponentInContainer)];
    if (newComponents.length > 10) {
      throw new Error('Containers cannot exceed 10 components.');
    }
    Reflect.set(this, 'components', newComponents);
    return this;
  }

  public setColor(accent_color: number): this {
    if (accent_color < 0x000000 || accent_color > 0xFFFFFF) {
      throw new Error("Accent color must be between 0x000000 and 0xFFFFFF");
    }
    Reflect.set(this, 'accent_color', accent_color);
    return this;
  }

  public setSpoiler(spoiler: boolean): this {
    Reflect.set(this, 'spoiler', spoiler);
    return this;
  }

  public toJSON(): APIContainerComponent {
    if (this.components.length === 0) {
      throw new Error("Containers must contain at least 1 component");
    }

    return {
      id: this.id,
      type: this.type as ComponentType.Container,
      components: this.components,
      accent_color: this.accent_color,
      spoiler: this.spoiler ?? false,
    };
  }
}