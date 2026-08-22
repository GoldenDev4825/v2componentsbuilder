import { ComponentType } from 'discord-api-types/v10';
export class V2TextDisplayBuilder {
    constructor(content) {
        this.type = ComponentType.TextDisplay;
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
