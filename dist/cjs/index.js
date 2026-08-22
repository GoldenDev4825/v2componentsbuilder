"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2ComponentBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2ComponentBuilder {
    constructor() {
        this.flags = v10_1.MessageFlags.IsComponentsV2;
        this.components = [];
    }
    setEphemeral(ephemeral) {
        if (ephemeral) {
            Reflect.set(this, 'flags', this.flags | v10_1.MessageFlags.Ephemeral);
        }
        else {
            Reflect.set(this, 'flags', this.flags & ~v10_1.MessageFlags.Ephemeral);
        }
        return this;
    }
    setComponents(...components) {
        const flattenedComponents = components.flat();
        if (flattenedComponents.length > 10)
            throw new Error("Max 10 top-level components");
        Reflect.set(this, 'components', flattenedComponents);
        return this;
    }
    addComponents(...components) {
        const flattenedComponents = components.flat();
        if (this.components.length + flattenedComponents.length > 10) {
            throw new Error("Max 10 top-level components");
        }
        Reflect.set(this, 'components', [...this.components, ...flattenedComponents]);
        return this;
    }
    toJSON() {
        return {
            flags: this.flags,
            components: this.components,
        };
    }
}
exports.V2ComponentBuilder = V2ComponentBuilder;
__exportStar(require("./builders"), exports);
