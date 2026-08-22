"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2TextDisplayBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2TextDisplayBuilder {
    constructor(content) {
        this.type = v10_1.ComponentType.TextDisplay;
        if (content)
            this.setContent(content);
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setContent(content) {
        Reflect.set(this, 'content', content);
        return this;
    }
    toJSON() {
        if (!this.content && this.content !== "") {
            throw new Error("Content is required for Text Display");
        }
        return {
            id: this.id,
            type: this.type,
            content: this.content,
        };
    }
}
exports.V2TextDisplayBuilder = V2TextDisplayBuilder;
