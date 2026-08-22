import { APIContainerComponent, APIComponentInContainer } from 'discord-api-types/v10';
import { type V2ActionRowBuilder } from './V2ActionRowBuilder';
import { type V2TextDisplayBuilder } from './V2TextDisplayBuilder';
import { type V2SectionBuilder } from './V2SectionBuilder';
import { type V2MediaGalleryBuilder } from './V2MediaGalleryBuilder';
import { type V2SeparatorBuilder } from './V2SeparatorBuilder';
import { type V2FileBuilder } from './V2FileBuilder';
type AllowedChildren = V2ActionRowBuilder | V2TextDisplayBuilder | V2SectionBuilder | V2MediaGalleryBuilder | V2SeparatorBuilder | V2FileBuilder;
export declare class V2ContainerBuilder {
    readonly id?: number;
    readonly type: number;
    readonly components: APIComponentInContainer[];
    readonly accent_color?: number;
    readonly spoiler?: boolean;
    constructor();
    setId(id: number): this;
    setComponents(...components: (AllowedChildren | AllowedChildren[])[]): this;
    addComponents(...components: (AllowedChildren | AllowedChildren[])[]): this;
    setColor(accent_color: number): this;
    setSpoiler(spoiler: boolean): this;
    toJSON(): APIContainerComponent;
}
export {};
