"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2MediaGalleryBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2MediaGalleryBuilder {
    constructor() {
        this.type = v10_1.ComponentType.MediaGallery;
        this.items = [];
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setItems(...items) {
        const flattenedItems = items.flat();
        if (flattenedItems.length < 1 || flattenedItems.length > 10) {
            throw new Error('Media Galleries must contain between 1 and 10 items');
        }
        for (const item of flattenedItems) {
            if (item.description && item.description.length > 1024) {
                throw new Error("Item description max length is 1024 characters");
            }
        }
        Reflect.set(this, 'items', flattenedItems);
        return this;
    }
    addItems(...items) {
        const flattenedItems = items.flat();
        const newItems = [...this.items, ...flattenedItems];
        if (newItems.length > 10) {
            throw new Error('Media Galleries cannot exceed 10 items');
        }
        for (const item of flattenedItems) {
            if (item.description && item.description.length > 1024) {
                throw new Error("Item description max length is 1024 characters");
            }
        }
        Reflect.set(this, 'items', newItems);
        return this;
    }
    toJSON() {
        if (this.items.length === 0) {
            throw new Error("Media Galleries must contain at least 1 item");
        }
        return {
            id: this.id,
            type: this.type,
            items: this.items,
        };
    }
}
exports.V2MediaGalleryBuilder = V2MediaGalleryBuilder;
