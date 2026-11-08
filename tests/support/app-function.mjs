import { readFileSync } from 'node:fs';
import vm from 'node:vm';
// Extract the actual function from the app, ending at its next section marker.
// Compile and demand exactly one named function; never replace it with a model.
export function appFunction(file, name, globals={}) {
 const text=readFileSync(new URL('../../'+file,import.meta.url),'utf8');
 const start=text.indexOf(`function ${name}(`);
 if(start<0) throw new Error(`Missing actual app function: ${name}`);
 const asyncStart=text.slice(Math.max(0,start-6),start)==='async ' ? start-6 : start;
 const end=text.indexOf('// ============================================================',start);
 const source=text.slice(asyncStart,end<0?text.length:end);
 const context=vm.createContext({...globals});
 new vm.Script(source+`;globalThis.actualFunction=${name};`).runInContext(context);
 return context.actualFunction;
}
