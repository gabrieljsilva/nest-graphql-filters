"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterArgsDecorator = void 0;
const graphql_1 = require("@nestjs/graphql");
const get_options_and_pipes_1 = require("./get-options-and-pipes");
const createFilterArgsDecorator = (storage) => {
    return function FilterArgs(type, optionsOrPipe, ...pipes) {
        const { options, pipes: extractedPipes } = (0, get_options_and_pipes_1.getOptionsOrPipes)(optionsOrPipe, ...pipes);
        return (target, key, index) => {
            const filterType = storage.typesToFilterMap.getValueByKey(type);
            (0, graphql_1.Args)(options.name, {
                type: () => filterType,
                name: options.name,
                description: options?.description,
                nullable: true,
            }, ...extractedPipes)(target, key, index);
        };
    };
};
exports.createFilterArgsDecorator = createFilterArgsDecorator;
//# sourceMappingURL=create-filter-args-decorator.js.map