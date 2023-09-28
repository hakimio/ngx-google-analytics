import {Primitive} from './primitive.type';


export type GtagFnArgs = (Primitive | { [param: string]: Primitive })[];
/**
 * Google Analytics GTagFn call signature
 */
export type GtagFn = (...args: GtagFnArgs) => void;
