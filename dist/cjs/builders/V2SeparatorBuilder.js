"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2SeparatorBuilder = void 0;
const v10_1 = require("discord-api-types/v10");
class V2SeparatorBuilder {
    constructor() {
        this.type = v10_1.ComponentType.Separator;
    }
    setId(id) {
        Reflect.set(this, 'id', id);
        return this;
    }
    setSpacing(spacing) {
        if (spacing !== 1 && spacing !== 2) {
            throw new Error("Spacing must be exactly 1 (small) or 2 (large).");
        }
        Reflect.set(this, 'spacing', spacing);
        return this;
    }
    setDivider(divider) {
        Reflect.set(this, 'divider', divider);
        return this;
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            spacing: this.spacing ?? 1,
            divider: this.divider ?? true,
        };
    }
}
exports.V2SeparatorBuilder = V2SeparatorBuilder;
