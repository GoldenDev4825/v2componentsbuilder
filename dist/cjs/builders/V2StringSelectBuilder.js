"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2StringSelectBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2StringSelectBuilder {
    constructor() {
        this.type = v10_1.ComponentType.StringSelect;
        this.options = [];
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
    addOptions(...options) {
        const flattenedOptions = options.flat();
        const newOptions = [...this.options];
        for (const option of flattenedOptions) {
            if (newOptions.length >= 25) {
                throw new Error("Cannot have more than 25 options");
            }
            if (option.label.length > 100) {
                throw new Error("Label max length is 100 characters");
            }
            if (option.value.length > 100) {
                throw new Error("Value max length is 100 characters");
            }
            if (option.description && option.description.length > 100) {
                throw new Error("Description max length is 100 characters");
            }
            newOptions.push({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji: option.emoji,
                default: option.default,
            });
        }
        Reflect.set(this, 'options', newOptions);
        return this;
    }
    setOptions(...options) {
        const flattenedOptions = options.flat();
        if (flattenedOptions.length > 25) {
            throw new Error("Cannot have more than 25 options");
        }
        for (const option of flattenedOptions) {
            if (option.label.length > 100) {
                throw new Error("Label max length is 100 characters");
            }
            if (option.value.length > 100) {
                throw new Error("Value max length is 100 characters");
            }
            if (option.description && option.description.length > 100) {
                throw new Error("Description max length is 100 characters");
            }
        }
        Reflect.set(this, 'options', flattenedOptions);
        return this;
    }
    toJSON() {
        if (!this.custom_id)
            throw new Error("custom_id is required");
        if (this.options.length === 0)
            throw new Error("Must have at least one option");
        const isRequired = this.required ?? true;
        if (isRequired && this.min_values === 0) {
            throw new Error("min_values must be at least 1 if required is true or omitted");
        }
        return {
            id: this.id,
            type: this.type,
            custom_id: this.custom_id,
            options: this.options,
            placeholder: this.placeholder,
            min_values: this.min_values,
            max_values: this.max_values,
            required: this.required,
            disabled: this.disabled ?? false
        };
    }
}
exports.V2StringSelectBuilder = V2StringSelectBuilder;
