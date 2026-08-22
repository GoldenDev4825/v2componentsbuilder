import { APIChannelSelectComponent, Snowflake, ChannelType, SelectMenuDefaultValueType, APISelectMenuDefaultValue } from 'discord-api-types/v10';
export declare class V2ChannelSelectBuilder {
    readonly id?: number;
    readonly type: number;
    readonly custom_id: string;
    readonly placeholder?: string;
    readonly default_values?: APISelectMenuDefaultValue<SelectMenuDefaultValueType.Channel>[];
    readonly channel_types?: ChannelType[];
    readonly min_values?: number;
    readonly max_values?: number;
    readonly required?: boolean;
    readonly disabled?: boolean;
    constructor();
    setId(id: number): this;
    setCustomId(custom_id: string): this;
    setPlaceholder(placeholder: string): this;
    setChannelTypes(...channel_types: (ChannelType | ChannelType[])[]): this;
    setMinValues(min_values: number): this;
    setMaxValues(max_values: number): this;
    setRequired(required: boolean): this;
    setDisabled(disabled: boolean): this;
    setDefaultValues(...channels: (Snowflake | Snowflake[])[]): this;
    toJSON(): APIChannelSelectComponent & {
        required?: boolean;
    };
}
