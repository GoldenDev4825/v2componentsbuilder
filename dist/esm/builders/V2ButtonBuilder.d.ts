import { ButtonStyle, APIMessageComponentEmoji, Snowflake, APIButtonComponent } from 'discord-api-types/v10';
export declare class V2ButtonBuilder {
    readonly id?: number;
    readonly type: number;
    readonly style: ButtonStyle;
    readonly label?: string;
    readonly emoji?: APIMessageComponentEmoji;
    readonly custom_id?: string;
    readonly sku_id?: Snowflake;
    readonly url?: string;
    readonly disabled?: boolean;
    constructor();
    setId(id: number): this;
    setCustomId(custom_id: string): this;
    setLabel(label: string): this;
    setEmoji(emoji: string | APIMessageComponentEmoji): this;
    setStyle(style: ButtonStyle): this;
    setURL(url: string): this;
    setDisabled(disabled: boolean): this;
    setSKU(sku_id: string): this;
    toJSON(): APIButtonComponent;
}
