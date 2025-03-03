export declare enum BaseBridgeErrorCode {
    BAD_REQUEST = "BAD_REQUEST",
    NETWORK_ERROR = "NETWORK_ERROR",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    UNKNOWN_SUBSCRIPTION_NAME = "UNKNOWN_SUBSCRIPTION_NAME"
}
/**
 * I - Входящие данные
 * O - Исходящие данные
 * E - Возможные ошибки
 */
export type TSendActionDescriptor<I extends Record<string, unknown> | null = null, O = null, E extends string | never = never> = {
    input: I;
    output: O;
    errorCode: BaseBridgeErrorCode.BAD_REQUEST | BaseBridgeErrorCode.NETWORK_ERROR | BaseBridgeErrorCode.INTERNAL_ERROR | E;
};
/**
 * A - Аргументы, передаваемые в колл-бэк
 * P - параметры подписки
 * E - Возможные ошибки
 */
export type TSubscribeActionDescriptor<A extends Record<string, unknown> | null = null, P extends Record<string, unknown> | null = null, E extends string | never = never> = {
    args: A;
    params: P;
    errorCode: BaseBridgeErrorCode.UNKNOWN_SUBSCRIPTION_NAME | BaseBridgeErrorCode.INTERNAL_ERROR | E;
};
export interface IFunctionCallMessage {
    type: 'functionCall';
    data: IFunctionCallData;
}
export interface IFunctionCallData {
    reqId: string;
    name: 'subscribe' | 'send' | 'newEvent';
    args: any[];
}
export interface ICallBackMessage {
    type: 'callBack';
    data: IFunctionCallData;
}
export interface ICallBackReplyMessage {
    type: 'callBackReply';
    data: ICallBackReplyData;
}
export interface ICallBackReplyData {
    reqId: string;
    ok?: unknown;
    err?: {
        code: string;
        reason: string;
    };
}
export interface IFunctionCallReplyMessage {
    type: 'functionCallReply';
    data: ICallBackReplyData;
}
/** Позволяет достать тип callback из TSubscribeActionDescriptor */
export type TCallback<DESCRIPTOR extends TSubscribeActionDescriptor<any, any, any>> = (args: DESCRIPTOR['args']) => void;
/** Позволяет достать тип аргументов на вход из TSendActionDescriptor */
export type TInput<DESCRIPTOR extends TSendActionDescriptor<any, any, any>> = DESCRIPTOR['input'];
/** Позволяет достать тип аргументов на вход из TSendActionDescriptor */
export type TOutput<DESCRIPTOR extends TSendActionDescriptor<any, any, any>> = DESCRIPTOR['output'];
/** Позволяет достать возможные коды ошибок из TSendActionDescriptor или TSubscribeActionDescriptor */
export type TErrorCode<DESCRIPTOR extends TSendActionDescriptor<any, any, any> | TSubscribeActionDescriptor<any, any, any>> = DESCRIPTOR['errorCode'];
/** Позволяет достать тип функции bridge.send() из TSendActionDescriptor */
export type TSendHandler<DESCRIPTOR extends TSendActionDescriptor<any, any, any>> = (args: TInput<DESCRIPTOR>) => Promise<TOutput<DESCRIPTOR>>;
export type TConsoleMethodsName = Array<keyof Pick<Console, 'log' | 'warn' | 'error' | 'info'>>;
export interface ISendLogMessage {
    type: 'sendLog';
    data: {
        reqId: string;
        name: 'sendLog';
        logData: IMiniAppLog;
    };
}
export interface IMiniAppLog {
    text: string;
    type: TConsoleMethodsName[number];
}
