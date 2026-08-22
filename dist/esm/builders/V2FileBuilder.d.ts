import { APIFileComponent, APIUnfurledMediaItem } from 'discord-api-types/v10';
export declare class V2FileBuilder {
    readonly id?: number;
    readonly type: number;
    readonly file: APIUnfurledMediaItem;
    readonly spoiler?: boolean;
    constructor();
    setId(id: number): this;
    setFile(file: APIUnfurledMediaItem): this;
    setURL(url: string): this;
    setSpoiler(spoiler: boolean): this;
    toJSON(): APIFileComponent;
}
