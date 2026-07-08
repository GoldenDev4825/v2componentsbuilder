import { ComponentType, APISeparatorComponent } from 'discord-api-types/v10';

export class V2SeparatorBuilder {
  public readonly id?: number;
  public readonly type: number = ComponentType.Separator;
  public readonly divider?: boolean;
  public readonly spacing?: number;

  public constructor() {}

  public setId(id: number): this {
    Reflect.set(this, 'id', id);
    return this;
  }

  public setSpacing(spacing: number): this {
    if (spacing !== 1 && spacing !== 2) {
      throw new Error("Spacing must be exactly 1 (small) or 2 (large).");
    }
    Reflect.set(this, 'spacing', spacing);
    return this;
  }

  public setDivider(divider: boolean): this {
    Reflect.set(this, 'divider', divider);
    return this;
  }

  public toJSON(): APISeparatorComponent {
    return {
      id: this.id,
      type: this.type as ComponentType.Separator,
      spacing: this.spacing ?? 1,
      divider: this.divider ?? true,
    };
  }
}