import { APIActionRowComponent, APIComponentInMessageActionRow } from 'discord-api-types/v10';
import { type V2RoleSelectBuilder } from './V2RoleSelectBuilder';
import { type V2StringSelectBuilder } from './V2StringSelectBuilder';
import { type V2UserSelectBuilder } from './V2UserSelectBuilder';
import { type V2MentionableSelectBuilder } from './V2MentionableSelectBuilder';
import { type V2ChannelSelectBuilder } from './V2ChannelSelectBuilder';
import { type V2ButtonBuilder } from './V2ButtonBuilder';
type V2SelectBuilder = V2RoleSelectBuilder | V2StringSelectBuilder | V2UserSelectBuilder | V2MentionableSelectBuilder | V2ChannelSelectBuilder;
type V2Component = V2SelectBuilder | V2ButtonBuilder;
export declare class V2ActionRowBuilder {
    readonly id?: number;
    readonly type: number;
    readonly components: APIComponentInMessageActionRow[];
    constructor();
    setId(id: number): this;
    setComponents(...components: (V2Component | V2Component[])[]): this;
    addComponents(...components: (V2Component | V2Component[])[]): this;
    toJSON(): APIActionRowComponent<APIComponentInMessageActionRow>;
}
export {};
