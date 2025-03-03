// src/error.ts
var BRIDGE_ERROR_TYPE = "BRIDGE_ERROR_TYPE";
var BridgeError = class extends Error {
  _error_type_ = BRIDGE_ERROR_TYPE;
  code;
  reason;
  constructor(code, reason) {
    super(`${code}: ${reason}`);
    this.code = code;
    this.reason = reason;
  }
};
var isBridgeError = (err) => {
  return err?._error_type_ === BRIDGE_ERROR_TYPE;
};

// src/types.ts
var BaseBridgeErrorCode = /* @__PURE__ */ ((BaseBridgeErrorCode2) => {
  BaseBridgeErrorCode2["BAD_REQUEST"] = "BAD_REQUEST";
  BaseBridgeErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  BaseBridgeErrorCode2["INTERNAL_ERROR"] = "INTERNAL_ERROR";
  BaseBridgeErrorCode2["UNKNOWN_SUBSCRIPTION_NAME"] = "UNKNOWN_SUBSCRIPTION_NAME";
  return BaseBridgeErrorCode2;
})(BaseBridgeErrorCode || {});

// src/helpers/getUniqueId.ts
function getUniqueId() {
  if ("crypto" in window && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  const startCharCode = 97;
  const endCharCode = 122;
  let uniqueId = "";
  for (let i = 0; i < 30; i++) {
    const randomCharCode = Math.floor(Math.random() * (endCharCode - startCharCode + 1)) + startCharCode;
    const randomChar = String.fromCharCode(randomCharCode);
    uniqueId += randomChar;
  }
  return `${timestamp}${uniqueId}`;
}

// src/helpers/logger.ts
var getMessageByTemplate = (message) => `[Bridge]: ${message}`;
var logger = {
  log: (message, ...args) => {
    console.log(getMessageByTemplate(message), ...args);
  },
  warn: (message, ...args) => {
    console.warn(getMessageByTemplate(message), ...args);
  }
};

// src/helpers/logsUtils.ts
var getStringFromLogParams = (params) => {
  return params.map((param) => typeof param === "object" ? JSON.stringify(param) : String(param)).join(" ");
};

// src/teamsTypes.ts
var TeamsSendAction = /* @__PURE__ */ ((TeamsSendAction2) => {
  TeamsSendAction2["LoadingCompleted"] = "LoadingCompleted";
  TeamsSendAction2["OpenProfile"] = "OpenProfile";
  TeamsSendAction2["OpenDialog"] = "OpenDialog";
  TeamsSendAction2["OpenThread"] = "OpenThread";
  TeamsSendAction2["ForwardTask"] = "ForwardTask";
  TeamsSendAction2["SetTitle"] = "SetTitle";
  TeamsSendAction2["SetBadge"] = "SetBadge";
  TeamsSendAction2["OpenLink"] = "OpenLink";
  TeamsSendAction2["ShowToast"] = "ShowToast";
  TeamsSendAction2["GetThemeSettings"] = "GetThemeSettings";
  TeamsSendAction2["GetMiniAppShareLink"] = "GetMiniAppShareLink";
  TeamsSendAction2["GetLanguage"] = "GetLanguage";
  TeamsSendAction2["OpenPopUp"] = "OpenPopUp";
  TeamsSendAction2["StoragePut"] = "StoragePut";
  TeamsSendAction2["StorageGet"] = "StorageGet";
  TeamsSendAction2["StorageDelete"] = "StorageDelete";
  TeamsSendAction2["StorageClear"] = "StorageClear";
  TeamsSendAction2["StartAudioCall"] = "StartAudioCall";
  TeamsSendAction2["StartVideoCall"] = "StartVideoCall";
  TeamsSendAction2["OpenAuthModal"] = "OpenAuthModal";
  TeamsSendAction2["SetCanGoBack"] = "SetCanGoBack";
  TeamsSendAction2["SetCanNotGoBack"] = "SetCanNotGoBack";
  TeamsSendAction2["OpenContactSelectionDialog"] = "OpenContactSelectionDialog";
  TeamsSendAction2["SetButtonGroup"] = "SetButtonGroup";
  TeamsSendAction2["GetSelfId"] = "GetSelfId";
  TeamsSendAction2["DownloadFile"] = "DownloadFile";
  TeamsSendAction2["CreateChat"] = "CreateChat";
  TeamsSendAction2["ForwardSurvey"] = "ForwardSurvey";
  TeamsSendAction2["GetAuth"] = "GetAuth";
  TeamsSendAction2["GetPlatformVersion"] = "GetPlatformVersion";
  TeamsSendAction2["GetMiniappConfig"] = "GetMiniappConfig";
  TeamsSendAction2["EnableLog"] = "EnableLog";
  return TeamsSendAction2;
})(TeamsSendAction || {});
var TeamsBridgeErrorCode = /* @__PURE__ */ ((TeamsBridgeErrorCode2) => {
  TeamsBridgeErrorCode2["ALREADY_CALLED"] = "ALREADY_CALLED";
  TeamsBridgeErrorCode2["PROFILE_NOT_FOUND"] = "PROFILE_NOT_FOUND";
  TeamsBridgeErrorCode2["DIALOG_NOT_FOUND"] = "DIALOG_NOT_FOUND";
  TeamsBridgeErrorCode2["THREAD_NOT_FOUND"] = "THREAD_NOT_FOUND";
  TeamsBridgeErrorCode2["POPUP_CLOSED"] = "POPUP_CLOSED";
  TeamsBridgeErrorCode2["KEY_IS_TOO_LARGE"] = "KEY_IS_TOO_LARGE";
  TeamsBridgeErrorCode2["VALUE_IS_TOO_LARGE"] = "VALUE_IS_TOO_LARGE";
  TeamsBridgeErrorCode2["TOTAL_LIMIT_EXCEEDED"] = "TOTAL_LIMIT_EXCEEDED";
  TeamsBridgeErrorCode2["INVALID_KEY"] = "INVALID_KEY";
  TeamsBridgeErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
  TeamsBridgeErrorCode2["KEY_NOT_FOUND"] = "KEY_NOT_FOUND";
  TeamsBridgeErrorCode2["USER_NOT_FOUND"] = "USER_NOT_FOUND";
  TeamsBridgeErrorCode2["MODAL_CLOSED"] = "MODAL_CLOSED";
  TeamsBridgeErrorCode2["UNKNOWN_GROUP"] = "UNKNOWN_GROUP";
  TeamsBridgeErrorCode2["UNKNOWN_ICON"] = "UNKNOWN_ICON";
  TeamsBridgeErrorCode2["CALLBACK_DATA_TOO_LARGE"] = "CALLBACK_DATA_TOO_LARGE";
  TeamsBridgeErrorCode2["TOO_MANY_BUTTONS"] = "TOO_MANY_BUTTONS";
  TeamsBridgeErrorCode2["CREATE_FAILED"] = "CREATE_FAILED";
  TeamsBridgeErrorCode2["UNAUTHTORIZED"] = "401";
  TeamsBridgeErrorCode2["FORBIDDEN"] = "403";
  TeamsBridgeErrorCode2["SERVER_ERROR"] = "500";
  return TeamsBridgeErrorCode2;
})(TeamsBridgeErrorCode || {});
var TeamsSubscribeAction = /* @__PURE__ */ ((TeamsSubscribeAction2) => {
  TeamsSubscribeAction2["ThemeSettings"] = "ThemeSettings";
  TeamsSubscribeAction2["Language"] = "Language";
  TeamsSubscribeAction2["BackButtonPressed"] = "BackButtonPressed";
  TeamsSubscribeAction2["ButtonPressed"] = "ButtonPressed";
  return TeamsSubscribeAction2;
})(TeamsSubscribeAction || {});

// src/Bridge.ts
var Bridge = class {
  subscriptions = {};
  promises = {};
  enableLog = true;
  callBackHandlers = {
    newEvent: (subscriptionId, eventAttributes) => {
      const callback = this.subscriptions[subscriptionId];
      if (!callback) {
        logger.warn(`no subscription found with id ${subscriptionId}`);
        return;
      }
      callback(eventAttributes);
    }
  };
  constructor() {
    window.addEventListener("message", this.handleMessage);
  }
  callFunction = (name, ...args) => {
    const reqId = getUniqueId();
    const message = {
      type: "functionCall",
      data: {
        reqId,
        name,
        args
      }
    };
    window.parent.postMessage(message, "*");
    return new Promise((resolve, reject) => {
      this.promises[reqId] = [resolve, reject];
    });
  };
  /** Отправить событие в супер-апп */
  send = (action, payload) => {
    return this.callFunction("send", action, payload);
  };
  /** Подписаться на событие из супер-апп */
  subscribe = async (action, callback, params = null) => {
    const { subscriptionId } = await this.callFunction(
      "subscribe",
      action,
      params
    );
    this.subscriptions[subscriptionId] = callback;
    return { unsubscribe: this.getUnsubscribe(subscriptionId) };
  };
  /** Переопределить методы console что бы они отправляли логи в супер-апп */
  setupConsoleProxy = () => {
    const consoleMethodsNames = ["log", "warn", "info", "error"];
    const sendLog = this.sendLog.bind(this);
    consoleMethodsNames.forEach((method) => {
      window.console[method] = new Proxy(console[method], {
        apply(target, ctx, args) {
          sendLog({
            type: method,
            text: getStringFromLogParams(args)
          });
          Reflect.apply(target, ctx, [...args]);
        }
      });
    });
  };
  /** Функция отправки логов в супер-апп */
  sendLog = ({ text, type }) => {
    if (this.enableLog) {
      const reqId = getUniqueId();
      const message = {
        type: "sendLog",
        data: {
          reqId,
          name: "sendLog",
          logData: { text, type }
        }
      };
      window.parent.postMessage(message, "*");
    }
  };
  /** Изменяем включени/выключение отправки логов в супер-апп */
  changeEnableLog = async ({ enabled }) => {
    this.enableLog = enabled;
    await this.send("EnableLog" /* EnableLog */, {
      active: enabled
    });
  };
  getUnsubscribe = (subscriptionId) => () => {
    if (subscriptionId in this.subscriptions) {
      delete this.subscriptions[subscriptionId];
    }
  };
  handleMessage = (event) => {
    const eventData = event.data;
    if (typeof eventData !== "object") {
      return;
    }
    switch (eventData.type) {
      case "functionCallReply":
        this.handleFunctionCallReply(eventData.data);
        break;
      case "callBack":
        this.handleCallBack(event, eventData.data);
        break;
    }
  };
  handleFunctionCallReply = (data) => {
    const promise = this.promises[data.reqId];
    if (promise) {
      delete this.promises[data.reqId];
      const [resolve, reject] = promise;
      if (data.ok !== void 0) {
        resolve(data.ok);
      } else {
        logger.warn(`rejecting req ${data.reqId} promise: ${JSON.stringify(data.err)}`);
        reject(data.err);
      }
    } else {
      logger.warn(`got reply to unknown function call with id ${data.reqId}`);
    }
  };
  handleCallBack = (event, data) => {
    const callBackReply = ({ ok, err }) => {
      if (ok === void 0 === (err === void 0)) {
        return callBackReply({
          reqId: data.reqId,
          err: {
            code: "INTERNAL_ERROR" /* INTERNAL_ERROR */,
            reason: "callBack handler protocol violation"
          }
        });
      }
      const message = {
        type: "callBackReply",
        data: {
          reqId: data.reqId,
          ok,
          err
        }
      };
      event.source?.postMessage(message, event.origin);
    };
    const result = {
      reqId: data.reqId
    };
    try {
      const callback = this.callBackHandlers[data.name];
      if (!callback) {
        const reason = `got callBack request with unknown name "${data.name}"`;
        logger.warn(reason);
        throw new BridgeError("BAD_REQUEST" /* BAD_REQUEST */, reason);
      }
      result.ok = callback(...data.args) || null;
    } catch (e) {
      let reason = isBridgeError(e) ? e.reason : "callBack handler raised an exception";
      if (e instanceof Error) {
        reason += ` "${e.name}": "${e.message}"`;
      }
      result.err = {
        code: isBridgeError(e) ? e.code : "INTERNAL_ERROR" /* INTERNAL_ERROR */,
        reason
      };
    }
    callBackReply(result);
  };
};
export {
  BaseBridgeErrorCode,
  Bridge,
  BridgeError,
  TeamsBridgeErrorCode,
  TeamsSendAction,
  TeamsSubscribeAction,
  isBridgeError
};
