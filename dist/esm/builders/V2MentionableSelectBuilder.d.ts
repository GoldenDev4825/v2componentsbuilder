import { APIMentionableSelectComponent, Snowflake, SelectMenuDefaultValueType, APISelectMenuDefaultValue } from 'discord-api-types/v10';
type MentionableDefaultValue = APISelectMenuDefaultValue<SelectMenuDefaultValueType.User | SelectMenuDefaultValueType.Role>;
type MentionableDefaultValueInput = {
    id: Snowflake;
    type: 'user' | 'role';
};
export declare class V2MentionableSelectBuilder {
    readonly id?: number;
    readonly type: number;
    readonly custom_id: string;
    readonly placeholder?: string;
    readonly default_values?: MentionableDefaultValue[];
    readonly min_values?: number;
    readonly max_values?: number;
    readonly required?: boolean;
    readonly disabled?: boolean;
    constructor();
    setId(id: number): this;
    setCustomId(custom_id: string): this;
    setPlaceholder(placeholder: string): this;
    setMinValues(min_values: number): this;
    setMaxValues(max_values: number): this;
    setRequired(required: boolean): this;
    setDisabled(disabled: boolean): this;
    setDefaultValues(...values: (MentionableDefaultValueInput | MentionableDefaultValueInput[])[]): this;
    toJSON(): APIMentionableSelectComponent & {
        required?: boolean;
    };
}
export {};
