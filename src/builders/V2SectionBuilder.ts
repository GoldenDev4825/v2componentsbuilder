import { APISectionComponent, APISectionAccessoryComponent, APITextDisplayComponent, ComponentType } from 'discord-api-types/v10';
import { type V2TextDisplayBuilder } from './V2TextDisplayBuilder';
import { type V2ButtonBuilder } from './V2ButtonBuilder';
import { type V2ThumbnailBuilder } from './V2ThumbnailBuilder';

const AccessoryTypes = [
  ComponentType.Button,
  ComponentType.StringSelect,
  ComponentType.UserSelect,
  ComponentType.RoleSelect,
  ComponentType.MentionableSelect,
  ComponentType.ChannelSelect,
  ComponentType.Thumbnail,
] as const;

type SectionAccessoryType = typeof AccessoryTypes[number];
type SectionAccessoryComponent = Extract<APISectionAccessoryComponent, { type: SectionAccessoryType }>;

export class V2SectionBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.Section;
  public readonly components: APITextDisplayComponent[] = [];
  public readonly accessory!: SectionAccessoryComponent;

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setComponents(...components: (V2TextDisplayBuilder | V2TextDisplayBuilder[])[]): this {
    const flattenedComponents = components.flat();
    if (flattenedComponents.length < 1 || flattenedComponents.length > 3) {
      throw new Error('Sections must contain between 1 and 3 text display components.');
    }
    Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
    return this;
  }

  public addComponents(...components: (V2TextDisplayBuilder | V2TextDisplayBuilder[])[]): this {
    const flattenedComponents = components.flat();
    const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON())];
    
    if (newComponents.length > 3) {
      throw new Error('Sections cannot contain more than 3 text display components.');
    }
    Reflect.set(this, 'components', newComponents);
    return this;
  }

  public setAccessory(component: V2ButtonBuilder | V2ThumbnailBuilder): this {
    const accessory = component.toJSON();
    if (!AccessoryTypes.includes(accessory.type as SectionAccessoryType)) {
      throw new Error(
        `Invalid accessory type ${accessory.type}. ` +
        `Must be one of: ${AccessoryTypes.join(', ')}.`
      );
    }
    Reflect.set(this, 'accessory', accessory);
    return this;
  }

  public toJSON(): APISectionComponent {
    if (this.components.length === 0) {
      throw new Error("Sections must contain at least 1 text display component.");
    }
    if (!this.accessory) {
      throw new Error("Sections must have an accessory component.");
    }

    return {
      id: this.id,
      type: this.type as ComponentType.Section,
      components: this.components,
      accessory: this.accessory,
    };
  }
}