import { ComponentType } from 'discord-api-types/v10';
export class V2FileBuilder {
    constructor() {
        this.type = ComponentType.File;
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
