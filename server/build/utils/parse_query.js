"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumberQuery = (q) => {
    if (Array.isArray(q)) {
        throw new Error(`Param ${q} not be array`);
    }
    return Number.parseInt(q);
};
exports.parseStringQuery = (q) => {
    if (Array.isArray(q)) {
        throw new Error(`Param ${q}  not be array`);
    }
    return q + "";
};
exports.parseBooleanQuery = (q) => {
    if (Array.isArray(q)) {
        throw new Error(`Param ${q}  not be array`);
    }
    return !!q;
};
