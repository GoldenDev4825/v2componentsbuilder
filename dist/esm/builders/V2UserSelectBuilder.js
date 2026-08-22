import { ComponentType, SelectMenuDefaultValueType } from 'discord-api-types/v10';
export class V2UserSelectBuilder {
    constructor() {
        this.type = ComponentType.UserSelect;
    }
    setId(id) {
        Reflect.set(this, "id", id);
        return this;
    }
    setCustomId(custom_id) {
        if (custom_id.length < 1 || custom_id.length > 100) {
            throw new Error("custom_id must be between 1 and 100 characters");
        }
        Reflect.set(this, 'custom_id', custom_id);
        return this;
    }
    setPlaceholder(placeholder) {
        if (placeholder.length > 150) {
            throw new Error("Max length for placeholder is 150 characters");
        }
        Reflect.set(this, 'placeholder', placeholder);
        return this;
    }
    setMinValues(min_values) {
        if (min_values < 0 || min_values > 25) {
            throw new Error("min_values must be between 0 and 25");
        }
        Reflect.set(this, 'min_values', min_values);
        return this;
    }
    setMaxValues(max_values) {
        if (max_values < 1 || max_values > 25) {
            throw new Error("max_values must be between 1 and 25");
        }
        Reflect.set(this, 'max_values', max_values);
        return this;
    }
    setRequired(required) {
        Reflect.set(this, 'required', required);
        return this;
    }
    setDisabled(disabled) {
        Reflect.set(this, 'disabled', disabled);
        return this;
    }
    setDefaultValues(...values) {
        const flattenedValues = values.flat();
        if (flattenedValues.length > 25) {
            throw new Error("Cannot have more than 25 default values");
        }
        Reflect.set(this, 'default_values', flattenedValues.map((id) => ({
            id,
            type: SelectMenuDefaultValueType.User
        })));
        return this;
    }
    toJSON() {
        if (!this.custom_id)
            throw new Error("custom_id is required");
        const isRequired = this.required ?? true;
        if (isRequired && this.min_values === 0) {
            throw new Error("min_values must be at least 1 if required is true or omitted");
        }
        return {
            id: this.id,
            type: this.type,
            custom_id: this.custom_id,
            placeholder: this.placeholder,
            default_values: this.default_values,
            min_values: this.min_values,
            max_values: this.max_values,
            required: this.required,
            disabled: this.disabled ?? false
        };
    }
}
