import { APISelectMenuOption, APIStringSelectComponent, APIMessageComponentEmoji } from 'discord-api-types/v10';
type StringSelectOptionInput = {
    label: string;
    value: string;
    description?: string;
    emoji?: APIMessageComponentEmoji;
    default?: boolean;
};
export declare class V2StringSelectBuilder {
    readonly id?: number;
    readonly type: number;
    readonly custom_id: string;
    readonly options: APISelectMenuOption[];
    readonly placeholder?: string;
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
    addOptions(...options: (StringSelectOptionInput | StringSelectOptionInput[])[]): this;
    setOptions(...options: (StringSelectOptionInput | StringSelectOptionInput[])[]): this;
    toJSON(): APIStringSelectComponent & {
        required?: boolean;
    };
}
export {};
