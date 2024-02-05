"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterableEntityDecorator = void 0;
const graphql_1 = require("@nestjs/graphql");
const createFilterableEntityDecorator = (storage) => {
    return function FilterableEntity(name) {
        return (target) => {
            const filterInputType = storage.typesToFilterMap.getValueByKey(target);
            (0, graphql_1.InputType)(name || filterInputType.name)(filterInputType);
        };
    };
};
exports.createFilterableEntityDecorator = createFilterableEntityDecorator;
//# sourceMappingURL=create-filterable-entity-decorator.js.map