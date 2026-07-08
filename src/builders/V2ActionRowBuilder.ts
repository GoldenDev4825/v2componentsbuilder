import { ComponentType, APIActionRowComponent, APIComponentInMessageActionRow } from 'discord-api-types/v10';
import { type V2RoleSelectBuilder } from './V2RoleSelectBuilder';
import { type V2StringSelectBuilder } from './V2StringSelectBuilder';
import { type V2UserSelectBuilder } from './V2UserSelectBuilder';
import { type V2MentionableSelectBuilder } from './V2MentionableSelectBuilder';
import { type V2ChannelSelectBuilder } from './V2ChannelSelectBuilder';
import { type V2ButtonBuilder } from './V2ButtonBuilder';

type V2SelectBuilder =
  | V2RoleSelectBuilder
  | V2StringSelectBuilder
  | V2UserSelectBuilder
  | V2MentionableSelectBuilder
  | V2ChannelSelectBuilder;

type V2Component = V2SelectBuilder | V2ButtonBuilder;

export class V2ActionRowBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.ActionRow;
  public readonly components: APIComponentInMessageActionRow[] = [];

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setComponents(...components: (V2Component | V2Component[])[]): this {
    const flattenedComponents = components.flat();
    if (flattenedComponents.length === 0) {
      throw new Error("Action Rows must contain at least 1 component.");
    }
    
    const isSelect = flattenedComponents[0].type !== ComponentType.Button;
    
    if (isSelect) {
      if (flattenedComponents.length > 1) throw new Error("Action Rows can only contain 1 select component.");
    } else {
      if (flattenedComponents.some(c => c.type !== ComponentType.Button)) {
        throw new Error("Action Rows cannot mix buttons and select components.");
      }
      if (flattenedComponents.length > 5) throw new Error("Action Rows can contain up to 5 buttons.");
    }

    Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
    return this;
  }

  public addComponents(...components: (V2Component | V2Component[])[]): this {
    const flattenedComponents = components.flat();
    const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON() as APIComponentInMessageActionRow)];
    
    if (newComponents.length === 0) return this;

    const isSelect = newComponents[0]?.type !== ComponentType.Button;
    
    if (isSelect) {
      if (newComponents.length > 1) throw new Error("Action Rows can only contain 1 select component.");
    } else {
      if (newComponents.some(c => c.type !== ComponentType.Button)) {
        throw new Error("Action Rows cannot mix buttons and select components.");
      }
      if (newComponents.length > 5) throw new Error("Action Rows can contain up to 5 buttons.");
    }

    Reflect.set(this, 'components', newComponents);
    return this;
  }

  public toJSON(): APIActionRowComponent<APIComponentInMessageActionRow> {
    if (this.components.length === 0) {
      throw new Error("Action Row must have at least one component");
    }

    return {
      id: this.id,
      type: this.type as ComponentType.ActionRow,
      components: this.components,
    };
  }
}