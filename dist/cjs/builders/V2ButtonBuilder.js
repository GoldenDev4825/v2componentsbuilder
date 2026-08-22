"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2ButtonBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2ButtonBuilder {
    constructor() {
        this.type = v10_1.ComponentType.Button;
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setCustomId(custom_id) {
        if (custom_id.length < 1 || custom_id.length > 100) {
            throw new Error("custom_id must be between 1 and 100 characters");
        }
        Reflect.set(this, 'custom_id', custom_id);
        return this;
    }
    setLabel(label) {
        if (label.length > 80) {
            throw new Error("Label max length is 80 characters");
        }
        Reflect.set(this, 'label', label);
        return this;
    }
    setEmoji(emoji) {
        const formattedEmoji = typeof emoji === 'string' ? { name: emoji } : emoji;
        Reflect.set(this, 'emoji', formattedEmoji);
        return this;
    }
    setStyle(style) {
        Reflect.set(this, 'style', style);
        return this;
    }
    setURL(url) {
        if (url.length > 512) {
            throw new Error("URL max length is 512 characters");
        }
        Reflect.set(this, 'url', url);
        return this;
    }
    setDisabled(disabled) {
        Reflect.set(this, 'disabled', disabled);
        return this;
    }
    setSKU(sku_id) {
        Reflect.set(this, 'sku_id', sku_id);
        return this;
    }
    toJSON() {
        if (!this.style)
            throw new Error("Button style is required");
        if (this.style === v10_1.ButtonStyle.Link) {
            if (!this.url)
                throw new Error("Link buttons must have a URL");
            if (this.custom_id)
                throw new Error("Link buttons cannot have a custom_id");
            return {
                id: this.id,
                type: this.type,
                style: v10_1.ButtonStyle.Link,
                label: this.label,
                emoji: this.emoji,
                url: this.url,
                disabled: this.disabled ?? false,
            };
        }
        if (this.style === v10_1.ButtonStyle.Premium) {
            if (!this.sku_id)
                throw new Error("Premium buttons must have a sku_id");
            if (this.custom_id || this.label || this.url || this.emoji) {
                throw new Error("Premium buttons cannot have a custom_id, label, url, or emoji");
            }
            return {
                id: this.id,
                type: this.type,
                style: v10_1.ButtonStyle.Premium,
                sku_id: this.sku_id,
                disabled: this.disabled ?? false,
            };
        }
        if (!this.custom_id)
            throw new Error("Non-link, non-premium buttons must have a custom_id");
        return {
            id: this.id,
            type: this.type,
            style: this.style,
            custom_id: this.custom_id,
            label: this.label,
            emoji: this.emoji,
            disabled: this.disabled ?? false,
        };
    }
}
exports.V2ButtonBuilder = V2ButtonBuilder;
