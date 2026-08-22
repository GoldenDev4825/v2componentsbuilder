import { ComponentType } from 'discord-api-types/v10';
export class V2ThumbnailBuilder {
    constructor(media) {
        this.type = ComponentType.Thumbnail;
        if (media)
            this.setThumbnail(media);
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setDescription(description) {
        if (description.length > 1024) {
            throw new Error("Description text max length is 1024 characters");
        }
        Reflect.set(this, 'description', description);
        return this;
    }
    setThumbnail(media) {
        Reflect.set(this, 'media', media);
        return this;
    }
    setURL(url) {
        Reflect.set(this, 'media', { url });
        return this;
    }
    setSpoiler(spoiler) {
        Reflect.set(this, 'spoiler', spoiler);
        return this;
    }
    toJSON() {
        if (!this.media)
            throw new Error("Thumbnail media item is required");
        return {
            id: this.id,
            type: this.type,
            media: this.media,
            spoiler: this.spoiler ?? false,
            description: this.description,
        };
    }
}
