import { ComponentType } from 'discord-api-types/v10';
export class V2ContainerBuilder {
    constructor() {
        this.type = ComponentType.Container;
        this.components = [];
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setComponents(...components) {
        const flattenedComponents = components.flat();
        if (flattenedComponents.length < 1 || flattenedComponents.length > 10) {
            throw new Error('Containers must contain between 1 and 10 components.');
        }
        Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
        return this;
    }
    addComponents(...components) {
        const flattenedComponents = components.flat();
        const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON())];
        if (newComponents.length > 10) {
            throw new Error('Containers cannot exceed 10 components.');
        }
        Reflect.set(this, 'components', newComponents);
        return this;
    }
    setColor(accent_color) {
        if (accent_color < 0x000000 || accent_color > 0xFFFFFF) {
            throw new Error("Accent color must be between 0x000000 and 0xFFFFFF");
        }
        Reflect.set(this, 'accent_color', accent_color);
        return this;
    }
    setSpoiler(spoiler) {
        Reflect.set(this, 'spoiler', spoiler);
        return this;
    }
    toJSON() {
        if (this.components.length === 0) {
            throw new Error("Containers must contain at least 1 component");
        }
        return {
            id: this.id,
            type: this.type,
            components: this.components,
            accent_color: this.accent_color,
            spoiler: this.spoiler ?? false,
        };
    }
}
