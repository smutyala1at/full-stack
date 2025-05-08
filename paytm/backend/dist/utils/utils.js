"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrors = void 0;
const formatErrors = (errors) => {
    const uniqueErrors = new Map();
    for (const error of errors.issues) {
        const path = error.path[0];
        // add only first message for each path
        if (!uniqueErrors.has(path)) {
            uniqueErrors.set(path, error.message);
        }
    }
    return Array.from(uniqueErrors.entries()).map(([path, message]) => ({
        path,
        message
    }));
};
exports.formatErrors = formatErrors;
