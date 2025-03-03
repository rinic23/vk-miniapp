/** Спецификация: https://confluence.vk.team/display/IM/IM.+Common.+Mini+Apps */
import { TSendActionDescriptor, TSubscribeActionDescriptor } from './types';
export declare enum TeamsSendAction {
    /** Информирование клиентского приложения о завершении загрузки мини-аппа. */
    LoadingCompleted = "LoadingCompleted",
    /** Открыть профиль пользователя, бота или группы */
    OpenProfile = "OpenProfile",
    /** Открыть диалог */
    OpenDialog = "OpenDialog",
    /** Открыть тред */
    OpenThread = "OpenThread",
    /** Переслать задачу (открывает диалог пересылки) */
    ForwardTask = "ForwardTask",
    /** Установить заголовок страницы мини-аппа */
    SetTitle = "SetTitle",
    /** Установить значение счётчика на иконке мини-аппа */
    SetBadge = "SetBadge",
    /** Открыть ссылку. */
    OpenLink = "OpenLink",
    /** Отобразить всплывающее сообщение в нижней части экрана */
    ShowToast = "ShowToast",
    /** Получить настройки темы, которую необходимо использовать при оформлении мини-аппа */
    GetThemeSettings = "GetThemeSettings",
    /** Получить ссылку, ведущую на страницу мини-аппа внутри VK Teams */
    GetMiniAppShareLink = "GetMiniAppShareLink",
    /** Получить используемый клиентом язык */
    GetLanguage = "GetLanguage",
    /** Отобразить Pop-Up */
    OpenPopUp = "OpenPopUp",
    /** Добавить пару ключ-значение в персистентное хранилище */
    StoragePut = "StoragePut",
    /** Получить значение из персистентного хранилища */
    StorageGet = "StorageGet",
    /** Удалить пару ключ-значение из персистентного хранилища */
    StorageDelete = "StorageDelete",
    /** Очистить персистентное хранилище данных мини-аппа */
    StorageClear = "StorageClear",
    /** Начать голосовой звонок */
    StartAudioCall = "StartAudioCall",
    /** Начать видеозвонок */
    StartVideoCall = "StartVideoCall",
    /** Открыть модальное окно для выполнения пользователем аутентификации. */
    OpenAuthModal = "OpenAuthModal",
    /** Уведомить основное приложение о возможности перехода на предыдущее состояние в навигации по мини-аппу */
    SetCanGoBack = "SetCanGoBack",
    /** Уведомить основное приложение о невозможности перехода на предыдущее состояние в навигации по мини-аппу */
    SetCanNotGoBack = "SetCanNotGoBack",
    /** Открыть модальное окно выбора контактов */
    OpenContactSelectionDialog = "OpenContactSelectionDialog",
    /** Установить содержимое панели кнопок */
    SetButtonGroup = "SetButtonGroup",
    /** Получить идентификатор текущего пользователя */
    GetSelfId = "GetSelfId",
    /** Скачать файл */
    DownloadFile = "DownloadFile",
    /** Открыть модальное окно создания группового чата */
    CreateChat = "CreateChat",
    /** Переслать опрос (открывает диалог пересылки) */
    ForwardSurvey = "ForwardSurvey",
    /** Возвращает авторизационные данные */
    GetAuth = "GetAuth",
    /** Возвращает текущую версию клиента */
    GetPlatformVersion = "GetPlatformVersion",
    /** Возвращает конфиг миниаппа */
    GetMiniappConfig = "GetMiniappConfig",
    /** Включить запись логов миниаппа */
    EnableLog = "EnableLog"
}
/** Специфичные коды ошибок */
export declare enum TeamsBridgeErrorCode {
    /** Запрос выполнен дважды */
    ALREADY_CALLED = "ALREADY_CALLED",
    /** Профиль не найден */
    PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND",
    /** Диалог не найден */
    DIALOG_NOT_FOUND = "DIALOG_NOT_FOUND",
    /** Тред не найден */
    THREAD_NOT_FOUND = "THREAD_NOT_FOUND",
    /** Попап был закрыт */
    POPUP_CLOSED = "POPUP_CLOSED",
    /** Превышено ограничение на размер ключа. Максимальный размер ограничен значением omicron-переменной miniapp-storage-key-max-size (в байтах, дефолт — 1024) */
    KEY_IS_TOO_LARGE = "KEY_IS_TOO_LARGE",
    /** Превышено ограничение на размер значение.
     * Максимальный размер ограничен значением omicron-переменной miniapp-storage-value-max-size (в байтах, дефолт — 10М)
     * */
    VALUE_IS_TOO_LARGE = "VALUE_IS_TOO_LARGE",
    /** Превышено ограничение на суммарный размер всех записей, хранящихся в персистентном хранилище мини-аппа.
     * Максимальный размер ограничен значением omicron-переменной miniapp-storage-total-max-size (в байтах, дефолт — 10М)
     * */
    TOTAL_LIMIT_EXCEEDED = "TOTAL_LIMIT_EXCEEDED",
    /** Ключ — не валидный UTF-8 */
    INVALID_KEY = "INVALID_KEY",
    /** Значение — не валидный Base64 */
    INVALID_VALUE = "INVALID_VALUE",
    /** Ключ не найден */
    KEY_NOT_FOUND = "KEY_NOT_FOUND",
    /** Пользователь с таким id не найден */
    USER_NOT_FOUND = "USER_NOT_FOUND",
    /** Модальное окно было закрыто пользователем */
    MODAL_CLOSED = "MODAL_CLOSED",
    /** Неизвестное имя группы */
    UNKNOWN_GROUP = "UNKNOWN_GROUP",
    /** Одна из переданных иконок не поддерживается */
    UNKNOWN_ICON = "UNKNOWN_ICON",
    /** Размер callbackData для одной из кнопок превышает максимально допустимый размер */
    CALLBACK_DATA_TOO_LARGE = "CALLBACK_DATA_TOO_LARGE",
    /** Превышено ограничение на максимальное количество кнопок для панели */
    TOO_MANY_BUTTONS = "TOO_MANY_BUTTONS",
    /** Объект не был создан из-за ошибок на стороне "клиента", либо из-за внутренних ошибок на стороне сервера. */
    CREATE_FAILED = "CREATE_FAILED",
    UNAUTHTORIZED = "401",
    FORBIDDEN = "403",
    SERVER_ERROR = "500"
}
export type TLoadingCompleted = TSendActionDescriptor<{
    ok: boolean;
}, null, TeamsBridgeErrorCode.ALREADY_CALLED>;
export type TOpenProfile = TSendActionDescriptor<{
    chatId: string;
}, null, TeamsBridgeErrorCode.PROFILE_NOT_FOUND>;
export type TOpenDialog = TSendActionDescriptor<{
    chatId: string;
    messageId?: string;
}, null, TeamsBridgeErrorCode.DIALOG_NOT_FOUND>;
export type TOpenThread = TSendActionDescriptor<{
    threadId: string;
    messageId?: string;
}, null, TeamsBridgeErrorCode.THREAD_NOT_FOUND>;
export type TForwardTask = TSendActionDescriptor<{
    taskId: string;
}>;
export type TSetTitle = TSendActionDescriptor<{
    title: string;
}>;
export type TSetBadge = TSendActionDescriptor<{
    count: number;
}>;
export type TOpenLink = TSendActionDescriptor<{
    url: string;
}>;
export type TShowToast = TSendActionDescriptor<{
    text: string;
}>;
export type TGetThemeSettings = TSendActionDescriptor<null, {
    colorsScheme: 'dark' | 'light';
    colors: Record<string, string>;
}>;
export type TGetMiniAppShareLink = TSendActionDescriptor<{
    miniappId: string;
}, {
    url: string;
}>;
export type TGetLanguage = TSendActionDescriptor<null, {
    language: string;
}>;
export type TOpenPopUp = TSendActionDescriptor<{
    title: string;
    text?: string;
    mainButton?: string;
    secondaryButton?: string;
}, {
    feedback: 'main' | 'secondary';
}, TeamsBridgeErrorCode.POPUP_CLOSED>;
export type TStoragePut = TSendActionDescriptor<{
    key: string;
    value: string;
}, null, TeamsBridgeErrorCode.KEY_IS_TOO_LARGE | TeamsBridgeErrorCode.VALUE_IS_TOO_LARGE | TeamsBridgeErrorCode.TOTAL_LIMIT_EXCEEDED | TeamsBridgeErrorCode.INVALID_KEY | TeamsBridgeErrorCode.INVALID_VALUE>;
export type TStorageGet = TSendActionDescriptor<{
    key: string;
}, {
    value: string;
}, TeamsBridgeErrorCode.KEY_NOT_FOUND | TeamsBridgeErrorCode.INVALID_KEY>;
export type TStorageDelete = TSendActionDescriptor<{
    key: string;
}, null, TeamsBridgeErrorCode.KEY_NOT_FOUND | TeamsBridgeErrorCode.INVALID_KEY>;
export type TStorageClear = TSendActionDescriptor;
export type TStartAudioCall = TSendActionDescriptor<{
    userId: string;
}, null, TeamsBridgeErrorCode.USER_NOT_FOUND>;
export type TStartVideoCall = TSendActionDescriptor<{
    userId: string;
}, null, TeamsBridgeErrorCode.USER_NOT_FOUND>;
export type TOpenAuthModal = TSendActionDescriptor<{
    url: string;
    redirectUrlParamName: string;
}, {
    querystring: string;
}, TeamsBridgeErrorCode.MODAL_CLOSED>;
export type TSetCanGoBack = TSendActionDescriptor;
export type TSetCanNotGoBack = TSendActionDescriptor;
export type TOpenContactSelectionDialog = TSendActionDescriptor<{
    title: string;
    multiple?: boolean;
    maxCount?: number;
    filter?: Array<'users' | 'bots' | 'groups' | 'channels'>;
    /** Отображать только контакты, которым можно написать сообщение. */
    writableOnly?: boolean;
    /** Текст, отображаемый на кнопке подтверждения выбора контактов */
    confirmButton?: string;
}, {
    contacts: Array<{
        id: string;
        type: 'user' | 'bot' | 'group' | 'channel';
    }>;
}, TeamsBridgeErrorCode.MODAL_CLOSED>;
export type TSetButtonGroup = TSendActionDescriptor<{
    /** Название панели, для которой устанавливается набор кнопок.
     *  - headerLeft - Максимальное количество кнопок для панели — 1
     *  - headerRight - Максимальное количество кнопок для панели — 2
     *  */
    group: 'headerLeft' | 'headerRight';
    buttons: Array<{
        icon: 'add' | 'edit' | 'menu' | 'event' | 'send' | 'done' | 'search' | 'more' | 'tune' | 'orgstructure' | 'home';
        /** ASCII-строка, задаваемая мини-аппом для возврата в коллбэке при нажатии на кнопку (максимум — 1КБ) */
        callbackData: string;
        tooltip?: string;
    }>;
}, null, TeamsBridgeErrorCode.UNKNOWN_GROUP | TeamsBridgeErrorCode.UNKNOWN_ICON | TeamsBridgeErrorCode.CALLBACK_DATA_TOO_LARGE | TeamsBridgeErrorCode.TOO_MANY_BUTTONS>;
export type TGetSelfId = TSendActionDescriptor<null, {
    userId: string;
}>;
export type TDownloadFile = TSendActionDescriptor<{
    url: string;
}>;
export type TCreateChat = TSendActionDescriptor<{
    name?: string;
    members?: string[];
}, {
    chatId: string;
    url: string;
}, TeamsBridgeErrorCode.MODAL_CLOSED | TeamsBridgeErrorCode.CREATE_FAILED>;
export type TForwardSurvey = TSendActionDescriptor<{
    surveyId: string;
    privateKey: string;
}>;
export type TGetAuth = TSendActionDescriptor<null, string, TeamsBridgeErrorCode.UNAUTHTORIZED | TeamsBridgeErrorCode.FORBIDDEN | TeamsBridgeErrorCode.SERVER_ERROR>;
export type TPlatform = 'web' | 'desktop' | 'mobile';
export type TGetPlatformVersion = TSendActionDescriptor<null, {
    platform: TPlatform;
    version: string;
}>;
export type TGetMiniappConfig = TSendActionDescriptor<null, Record<string, unknown>>;
export type TEnableLog = TSendActionDescriptor<{
    active: boolean;
}>;
export type TTeamsSendActionsDescriptor = {
    [TeamsSendAction.LoadingCompleted]: TLoadingCompleted;
    [TeamsSendAction.OpenProfile]: TOpenProfile;
    [TeamsSendAction.OpenDialog]: TOpenDialog;
    [TeamsSendAction.OpenThread]: TOpenThread;
    [TeamsSendAction.ForwardTask]: TForwardTask;
    [TeamsSendAction.SetTitle]: TSetTitle;
    [TeamsSendAction.SetBadge]: TSetBadge;
    [TeamsSendAction.OpenLink]: TOpenLink;
    [TeamsSendAction.ShowToast]: TShowToast;
    [TeamsSendAction.GetThemeSettings]: TGetThemeSettings;
    [TeamsSendAction.GetMiniAppShareLink]: TGetMiniAppShareLink;
    [TeamsSendAction.GetLanguage]: TGetLanguage;
    [TeamsSendAction.OpenPopUp]: TOpenPopUp;
    [TeamsSendAction.StoragePut]: TStoragePut;
    [TeamsSendAction.StorageGet]: TStorageGet;
    [TeamsSendAction.StorageDelete]: TStorageDelete;
    [TeamsSendAction.StorageClear]: TStorageClear;
    [TeamsSendAction.StartAudioCall]: TStartAudioCall;
    [TeamsSendAction.StartVideoCall]: TStartVideoCall;
    [TeamsSendAction.OpenAuthModal]: TOpenAuthModal;
    [TeamsSendAction.SetCanGoBack]: TSetCanGoBack;
    [TeamsSendAction.SetCanNotGoBack]: TSetCanNotGoBack;
    [TeamsSendAction.OpenContactSelectionDialog]: TOpenContactSelectionDialog;
    [TeamsSendAction.SetButtonGroup]: TSetButtonGroup;
    [TeamsSendAction.GetSelfId]: TGetSelfId;
    [TeamsSendAction.DownloadFile]: TDownloadFile;
    [TeamsSendAction.CreateChat]: TCreateChat;
    [TeamsSendAction.ForwardSurvey]: TForwardSurvey;
    [TeamsSendAction.GetAuth]: TGetAuth;
    [TeamsSendAction.GetPlatformVersion]: TGetPlatformVersion;
    [TeamsSendAction.GetMiniappConfig]: TGetMiniappConfig;
    [TeamsSendAction.EnableLog]: TEnableLog;
};
export declare enum TeamsSubscribeAction {
    /** Изменились настройки темы */
    ThemeSettings = "ThemeSettings",
    /** Изменились настройки языка */
    Language = "Language",
    /** Пользователь нажал кнопку "Назад". */
    BackButtonPressed = "BackButtonPressed",
    /** Пользователь нажал на одну из кнопок, установленных при помощи метода SetButtonGroup */
    ButtonPressed = "ButtonPressed"
}
export type TThemeSettings = TSubscribeActionDescriptor<TGetThemeSettings['output']>;
export type TLanguage = TSubscribeActionDescriptor<TGetLanguage['output']>;
export type TBackButtonPressed = TSubscribeActionDescriptor;
export type TButtonPressed = TSubscribeActionDescriptor<{
    callbackData: string;
}>;
export type TTeamsSubscribeActionsDescriptor = {
    [TeamsSubscribeAction.ThemeSettings]: TThemeSettings;
    [TeamsSubscribeAction.Language]: TLanguage;
    [TeamsSubscribeAction.BackButtonPressed]: TBackButtonPressed;
    [TeamsSubscribeAction.ButtonPressed]: TButtonPressed;
};
