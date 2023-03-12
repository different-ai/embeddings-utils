// function extractFunctions(code) {
//   const functionRegex = /(?:async\s+)?function\s+(\w+)\s*\(([\w\s,]*)\)\s*{([\S\s]*?)}/g;
//   const arrowFunctionRegex = /const\s+(\w+)\s*=\s*\(([\w\s,]*)\)\s*=>\s*{([\S\s]*?)}/g;

//   const functions = [];

//   let match;

//   while ((match = functionRegex.exec(code))) {
//     const [, name, parameters, body] = match;
//     functions.push({ name, parameters, body });
//   }

//   while ((match = arrowFunctionRegex.exec(code))) {
//     const [, name, parameters, body] = match;
//     functions.push({ name, parameters, body });
//   }

//   return functions;
// }
import ts from 'typescript';

function extractFunctions(filename: string): string[] {
  console.log(filename);
  const program = ts.createProgram([filename], {});
  const sourceFile = program.getSourceFile(filename);
  console.log(sourceFile);

  const collectedFunctions: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      collectedFunctions.push(node.name.text);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return collectedFunctions;
}

export { extractFunctions as getChunksByJavascript };
