function get_function_name(code) {
  /**
    
    Extract function name from a line beginning with "def "
    **/
  if (!code.startsWith('def ')) throw new Error("Code does not start with 'def'");
  return code.slice('def '.length, code.indexOf('('));
}
function get_until_no_space(all_lines, i) {
  /**
    
    Get all lines until a line outside the function definition is found.
    **/
  const ret = [all_lines[i]];
  for (let j = i + 1; j < i + 10000; j++) {
    if (j < all_lines.length) {
      if (all_lines[j].length === 0 || all_lines[j][0] === ' ' || all_lines[j][0] === '\t' || all_lines[j][0] === ')') {
        ret.push(all_lines[j]);
      } else {
        break;
      }
    }
  }
  return ret.join('\n');
}
export function get_functions(whole_code, filepath) {
  /**
    
    Get all functions in a Python file.
    **/
  const all_lines = whole_code.split('\n');
  const functions = [];
  for (let i = 0; i < all_lines.length; i++) {
    if (all_lines[i].startsWith('def ')) {
      const code = get_until_no_space(all_lines, i);
      const function_name = get_function_name(all_lines[i]);
      functions.push({ code, function_name, filepath });
    }
  }
  return functions;
}
