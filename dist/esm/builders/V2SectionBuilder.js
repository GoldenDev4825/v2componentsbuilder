import { ComponentType } from 'discord-api-types/v10';
const AccessoryTypes = [
    ComponentType.Button,
    ComponentType.StringSelect,
    ComponentType.UserSelect,
    ComponentType.RoleSelect,
    ComponentType.MentionableSelect,
    ComponentType.ChannelSelect,
    ComponentType.Thumbnail,
];
export class V2SectionBuilder {
    constructor() {
        this.type = ComponentType.Section;
        this.components = [];
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setComponents(...components) {
        const flattenedComponents = components.flat();
        if (flattenedComponents.length < 1 || flattenedComponents.length > 3) {
            throw new Error('Sections must contain between 1 and 3 text display components.');
        }
        Reflect.set(this, 'components', flattenedComponents.map(c => c.toJSON()));
        return this;
    }
    addComponents(...components) {
        const flattenedComponents = components.flat();
        const newComponents = [...this.components, ...flattenedComponents.map(c => c.toJSON())];
        if (newComponents.length > 3) {
            throw new Error('Sections cannot contain more than 3 text display components.');
        }
        Reflect.set(this, 'components', newComponents);
        return this;
    }
    setAccessory(component) {
        const accessory = component.toJSON();
        if (!AccessoryTypes.includes(accessory.type)) {
            throw new Error(`Invalid accessory type ${accessory.type}. ` +
                `Must be one of: ${AccessoryTypes.join(', ')}.`);
        }
        Reflect.set(this, 'accessory', accessory);
        return this;
    }
    toJSON() {
        if (this.components.length === 0) {
            throw new Error("Sections must contain at least 1 text display component.");
        }
        if (!this.accessory) {
            throw new Error("Sections must have an accessory component.");
        }
        return {
            id: this.id,
            type: this.type,
            components: this.components,
            accessory: this.accessory,
        };
    }
}
