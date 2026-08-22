import { ComponentType } from 'discord-api-types/v10';
export class V2SeparatorBuilder {
    constructor() {
        this.type = ComponentType.Separator;
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setSpacing(spacing) {
        if (spacing !== 1 && spacing !== 2) {
            throw new Error("Spacing must be exactly 1 (small) or 2 (large).");
        }
        Reflect.set(this, 'spacing', spacing);
        return this;
    }
    setDivider(divider) {
        Reflect.set(this, 'divider', divider);
        return this;
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            spacing: this.spacing ?? 1,
            divider: this.divider ?? true,
        };
    }
}
