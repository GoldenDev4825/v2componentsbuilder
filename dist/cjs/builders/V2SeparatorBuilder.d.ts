import { APISeparatorComponent } from 'discord-api-types/v10';
export declare class V2SeparatorBuilder {
    readonly id?: number;
    readonly type: number;
    readonly divider?: boolean;
    readonly spacing?: number;
    constructor();
    setId(id: number): this;
    setSpacing(spacing: number): this;
    setDivider(divider: boolean): this;
    toJSON(): APISeparatorComponent;
}
