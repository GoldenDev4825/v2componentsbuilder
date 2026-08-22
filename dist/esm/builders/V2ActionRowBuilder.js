import { ComponentType } from 'discord-api-types/v10';
export class V2ActionRowBuilder {
    constructor() {
        this.type = ComponentType.ActionRow;
        this.components = [];
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setComponents(...components) {
        const flattenedComponents = components.flat();
        if (flattenedComponents.length === 0) {
            throw new Error("Action Rows must contain at least 1 component.");
        }
        const isSelect = flattenedComponents[0].type !== ComponentType.Button;
        if (isSelect) {
            if (flattenedComponents.length > 1)
                throw new Error("Action Rows can only contain 1 select component.");
        }
        else {
            if (flattenedComponents.some(c => c.type !== ComponentType.Button)) {
                throw new Error("Action Rows cannot mix buttons and select components.");
            }
            if (flattenedComponents.length > 5)
                throw new Error("Action Rows can contain up to 5 buttons.");
        }
        Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
        return this;
    }
    addComponents(...components) {
        const flattenedComponents = components.flat();
        const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON())];
        if (newComponents.length === 0)
            return this;
        const isSelect = newComponents[0]?.type !== ComponentType.Button;
        if (isSelect) {
            if (newComponents.length > 1)
                throw new Error("Action Rows can only contain 1 select component.");
        }
        else {
            if (newComponents.some(c => c.type !== ComponentType.Button)) {
                throw new Error("Action Rows cannot mix buttons and select components.");
            }
            if (newComponents.length > 5)
                throw new Error("Action Rows can contain up to 5 buttons.");
        }
        Reflect.set(this, 'components', newComponents);
        return this;
    }
    toJSON() {
        if (this.components.length === 0) {
            throw new Error("Action Row must have at least one component");
        }
        return {
            id: this.id,
            type: this.type,
            components: this.components,
        };
    }
}
