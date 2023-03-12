function get_function_name(code) {
    /**
        
        Extract function name from a line beginning with "def "
        **/
    if (!code.startsWith('def '))
        throw new Error("Code does not start with 'def'");
    return code.slice('def '.length, code.indexOf('('));
}
function get_until_no_space(all_lines, i) {
    /**
        
        Get all lines until a line outside the function definition is found.
        **/
    var ret = [all_lines[i]];
    for (var j = i + 1; j < i + 10000; j++) {
        if (j < all_lines.length) {
            if (all_lines[j].length === 0 || all_lines[j][0] === ' ' || all_lines[j][0] === '\t' || all_lines[j][0] === ')') {
                ret.push(all_lines[j]);
            }
            else {
                break;
            }
        }
    }
    return ret.join('\n');
}
function getFunctions(code) {
    /**
        
        Get all functions in a Python file.
        **/
    if (code.length === 0)
        throw new Error('Code is empty');
    var all_lines = code.split('\n');
    var functions = [];
    for (var i = 0; i < all_lines.length; i++) {
        if (all_lines[i].startsWith('def ')) {
            var code_1 = get_until_no_space(all_lines, i);
            var function_name = get_function_name(all_lines[i]);
            functions.push({ code: code_1, function_name: function_name });
        }
    }
    return functions;
}
exports.getChunksByPython = getFunctions;
