import { APITextDisplayComponent } from 'discord-api-types/v10';
export declare class V2TextDisplayBuilder {
    readonly id?: number;
    readonly type: number;
    readonly content: string;
    constructor(content?: string);
    setId(id: number): this;
    setContent(content: string): this;
    toJSON(): APITextDisplayComponent;
}
