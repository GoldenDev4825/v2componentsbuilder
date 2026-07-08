import { MessageFlags } from 'discord-api-types/v10';
import * as Builders from './builders';

type BuilderInstances = {
  [K in keyof typeof Builders]: typeof Builders[K] extends new (...args: any) => any
    ? InstanceType<typeof Builders[K]>
    : never;
}[keyof typeof Builders];

export class V2ComponentBuilder {
  public readonly flags: number = MessageFlags.IsComponentsV2;
  public readonly components: BuilderInstances[] = [];

  public setEphemeral(ephemeral: boolean) {
    if (ephemeral) {
      Reflect.set(this, 'flags', this.flags | MessageFlags.Ephemeral);
    } else {
      Reflect.set(this, 'flags', this.flags & ~MessageFlags.Ephemeral);
    }
    return this;
  }

  public setComponents(...components: (BuilderInstances | BuilderInstances[])[]) {
    const flattenedComponents = components.flat();
    if (flattenedComponents.length > 10) throw new Error("Max 10 top-level components");
    Reflect.set(this, 'components', flattenedComponents);
    return this;
  }

  public addComponents(...components: (BuilderInstances | BuilderInstances[])[]) {
    const flattenedComponents = components.flat();
    if (this.components.length + flattenedComponents.length > 10) {
      throw new Error("Max 10 top-level components");
    }
    Reflect.set(this, 'components', [...this.components, ...flattenedComponents]);
    return this;
  }

  public toJSON() {
    return {
      flags: this.flags,
      components: this.components,
    };
  }
}

export * from './builders';