import { MessageFlags } from 'discord-api-types/v10';
export class V2ComponentBuilder {
    constructor() {
        this.flags = MessageFlags.IsComponentsV2;
        this.components = [];
    }
    setEphemeral(ephemeral) {
        if (ephemeral) {
            Reflect.set(this, 'flags', this.flags | MessageFlags.Ephemeral);
        }
        else {
            Reflect.set(this, 'flags', this.flags & ~MessageFlags.Ephemeral);
        }
        return this;
    }
    setComponents(...components) {
        const flattenedComponents = components.flat();
        if (flattenedComponents.length > 10)
            throw new Error("Max 10 top-level components");
        Reflect.set(this, 'components', flattenedComponents);
        return this;
    }
    addComponents(...components) {
        const flattenedComponents = components.flat();
        if (this.components.length + flattenedComponents.length > 10) {
            throw new Error("Max 10 top-level components");
        }
        Reflect.set(this, 'components', [...this.components, ...flattenedComponents]);
        return this;
    }
    toJSON() {
        return {
            flags: this.flags,
            components: this.components,
        };
    }
}
export * from './builders';
