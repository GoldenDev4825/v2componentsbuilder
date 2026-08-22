import { APIThumbnailComponent, APIUnfurledMediaItem } from 'discord-api-types/v10';
export declare class V2ThumbnailBuilder {
    readonly id?: number;
    readonly type: number;
    readonly media: APIUnfurledMediaItem;
    readonly description?: string;
    readonly spoiler?: boolean;
    constructor(media?: APIUnfurledMediaItem);
    setId(id: number): this;
    setDescription(description: string): this;
    setThumbnail(media: APIUnfurledMediaItem): this;
    setURL(url: string): this;
    setSpoiler(spoiler: boolean): this;
    toJSON(): APIThumbnailComponent;
}
