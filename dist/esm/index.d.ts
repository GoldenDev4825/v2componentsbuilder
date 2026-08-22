import * as Builders from './builders';
type BuilderInstances = {
    [K in keyof typeof Builders]: typeof Builders[K] extends new (...args: any) => any ? InstanceType<typeof Builders[K]> : never;
}[keyof typeof Builders];
export declare class V2ComponentBuilder {
    readonly flags: number;
    readonly components: BuilderInstances[];
    setEphemeral(ephemeral: boolean): this;
    setComponents(...components: (BuilderInstances | BuilderInstances[])[]): this;
    addComponents(...components: (BuilderInstances | BuilderInstances[])[]): this;
    toJSON(): {
        flags: number;
        components: BuilderInstances[];
    };
}
export * from './builders';
