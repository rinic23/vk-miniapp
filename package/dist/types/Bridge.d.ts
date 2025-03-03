import { TSendActionDescriptor, TSubscribeActionDescriptor, TInput, TCallback, TOutput, IMiniAppLog } from './types';
export declare class Bridge<SubscribeAction extends string, SubscribeDescriptor extends Record<SubscribeAction, TSubscribeActionDescriptor<any, any, any>>, SendAction extends string, SendDescriptor extends Record<SendAction, TSendActionDescriptor<any, any, any>>> {
    private subscriptions;
    private promises;
    private enableLog;
    private callBackHandlers;
    constructor();
    private callFunction;
    /** Отправить событие в супер-апп */
    send: <A extends SendAction>(action: A, payload: TInput<SendDescriptor[A]>) => Promise<TOutput<SendDescriptor[A]>>;
    /** Подписаться на событие из супер-апп */
    subscribe: <A extends SubscribeAction>(action: A, callback: TCallback<SubscribeDescriptor[A]>, params?: SubscribeDescriptor[A]["params"]) => Promise<{
        unsubscribe: () => void;
    }>;
    /** Переопределить методы console что бы они отправляли логи в супер-апп */
    private setupConsoleProxy;
    /** Функция отправки логов в супер-апп */
    sendLog: ({ text, type }: IMiniAppLog) => void;
    /** Изменяем включени/выключение отправки логов в супер-апп */
    changeEnableLog: ({ enabled }: {
        enabled: boolean;
    }) => Promise<void>;
    private getUnsubscribe;
    private handleMessage;
    private handleFunctionCallReply;
    private readonly handleCallBack;
}
