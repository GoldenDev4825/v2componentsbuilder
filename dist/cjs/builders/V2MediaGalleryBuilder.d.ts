import { APIMediaGalleryComponent, APIMediaGalleryItem } from 'discord-api-types/v10';
export declare class V2MediaGalleryBuilder {
    readonly id?: number;
    readonly type: number;
    readonly items: APIMediaGalleryItem[];
    constructor();
    setId(id: number): this;
    setItems(...items: (APIMediaGalleryItem | APIMediaGalleryItem[])[]): this;
    addItems(...items: (APIMediaGalleryItem | APIMediaGalleryItem[])[]): this;
    toJSON(): APIMediaGalleryComponent;
}
