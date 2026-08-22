"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2FileBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2FileBuilder {
    constructor() {
        this.type = v10_1.ComponentType.File;
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setFile(file) {
        Reflect.set(this, 'file', file);
        return this;
    }
    setURL(url) {
        Reflect.set(this, 'file', { url });
        return this;
    }
    setSpoiler(spoiler) {
        Reflect.set(this, 'spoiler', spoiler);
        return this;
    }
    toJSON() {
        if (!this.file)
            throw new Error("File media item is required");
        return {
            id: this.id,
            type: this.type,
            file: this.file,
            spoiler: this.spoiler ?? false,
        };
    }
}
exports.V2FileBuilder = V2FileBuilder;
