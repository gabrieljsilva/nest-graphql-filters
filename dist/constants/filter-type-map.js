"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTypeMap = void 0;
const graphql_1 = require("@nestjs/graphql");
const boolean_filter_filter_1 = require("../filters/boolean-filter.filter");
const string_filter_1 = require("../filters/string.filter");
const float_filter_filter_1 = require("../filters/float-filter.filter");
const date_time_filter_1 = require("../filters/date-time.filter");
const id_filter_filter_1 = require("../filters/id-filter.filter");
const int_filter_filter_1 = require("../filters/int-filter.filter");
const timestamp_filter_1 = require("../filters/timestamp.filter");
exports.filterTypeMap = [
    [Boolean, boolean_filter_filter_1.BooleanFilter],
    [String, string_filter_1.StringFilter],
    [Number, float_filter_filter_1.FloatFilter],
    [Date, date_time_filter_1.DateTimeFilter],
    [graphql_1.ID, id_filter_filter_1.IdFilter],
    [graphql_1.Int, int_filter_filter_1.IntFilter],
    [graphql_1.GraphQLTimestamp, timestamp_filter_1.TimestampFilter],
];
//# sourceMappingURL=filter-type-map.js.map