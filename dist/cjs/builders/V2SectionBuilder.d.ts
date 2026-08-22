import { APISectionComponent, APISectionAccessoryComponent, APITextDisplayComponent, ComponentType } from 'discord-api-types/v10';
import { type V2TextDisplayBuilder } from './V2TextDisplayBuilder';
import { type V2ButtonBuilder } from './V2ButtonBuilder';
import { type V2ThumbnailBuilder } from './V2ThumbnailBuilder';
declare const AccessoryTypes: readonly [ComponentType.Button, ComponentType.StringSelect, ComponentType.UserSelect, ComponentType.RoleSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect, ComponentType.Thumbnail];
type SectionAccessoryType = typeof AccessoryTypes[number];
type SectionAccessoryComponent = Extract<APISectionAccessoryComponent, {
    type: SectionAccessoryType;
}>;
export declare class V2SectionBuilder {
    readonly id?: number;
    readonly type: number;
    readonly components: APITextDisplayComponent[];
    readonly accessory: SectionAccessoryComponent;
    constructor();
    setId(id: number): this;
    setComponents(...components: (V2TextDisplayBuilder | V2TextDisplayBuilder[])[]): this;
    addComponents(...components: (V2TextDisplayBuilder | V2TextDisplayBuilder[])[]): this;
    setAccessory(component: V2ButtonBuilder | V2ThumbnailBuilder): this;
    toJSON(): APISectionComponent;
}
export {};
