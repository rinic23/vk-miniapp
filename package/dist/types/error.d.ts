export declare class BridgeError<CODE extends string> extends Error {
    _error_type_: string;
    code: CODE;
    reason: string;
    constructor(code: CODE, reason: string);
}
export declare const isBridgeError: <CODE extends string = string>(err: any) => err is BridgeError<CODE>;
