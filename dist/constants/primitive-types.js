"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitiveTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
exports.primitiveTypes = new Set([
    Boolean,
    Number,
    String,
    Date,
    graphql_1.ID,
    graphql_1.Int,
    graphql_1.Float,
    graphql_1.GraphQLISODateTime,
    graphql_1.GraphQLTimestamp,
]);
//# sourceMappingURL=primitive-types.js.map