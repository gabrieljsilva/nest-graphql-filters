"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsOrPipes = void 0;
const is_pipe_util_1 = require("@nestjs/graphql/dist/utils/is-pipe.util");
function getOptionsOrPipes(optionsOrPipes, ...pipes) {
    const extractedOptions = {
        name: 'filters',
    };
    if ((0, is_pipe_util_1.isPipe)(optionsOrPipes)) {
        pipes.push(optionsOrPipes);
    }
    else {
        const options = optionsOrPipes;
        extractedOptions.name = options?.name || extractedOptions.name;
        extractedOptions.description = options?.description;
    }
    return {
        pipes: pipes,
        options: extractedOptions,
    };
}
exports.getOptionsOrPipes = getOptionsOrPipes;
//# sourceMappingURL=get-options-and-pipes.js.map