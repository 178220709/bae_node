/// <reference path="./express.d.ts" />
/// <reference path="./lodash.d.ts" />
/// <reference path="./mongodb.d.ts" />



/* define some variable to use global */
import LoDashExplicitArrayWrapper = _.LoDashExplicitArrayWrapper;
import LoDashExplicitObjectWrapper = _.LoDashExplicitObjectWrapper;
interface IGlobal {
    db:any;
    util:any;
    apis:[string];
}

/* define some function to use global */


declare var baejs:IGlobal;
declare var util:any;

interface StringConstructor {
    format(str:string, ...args: any[]): string;
}

interface String {
    format(...args: any[]): string;
}
interface Array<T> {
    chain(): LoDashExplicitObjectWrapper<T>;
}
