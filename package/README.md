# VK teams bridge
Библиотека реализует прослойку между супер аппом и мини веб аппом. Главный функционал в мэтчинге запросов между клиентами

Подробная инстукция о том как это работает и список доступных методов в [документации](https://confluence.vk.team/display/IM/IM.+Common.+Mini+Apps)

## Публикация новых версий пакета
Для публикации новой версии пакета необходимо:
1. Поднять версию в package.json
2. Запустить скрипт сборки из корня проекта командой `npm run build`
3. Запустить скрипт публикации из корня проекта командой `npm publish`

*Важно! Публиковать новую версию лучше после код-ревью и мержа ветки в мастер*

### Как выбрать номер версии
Учитывая номер версии МАЖОРНАЯ.МИНОРНАЯ.ПАТЧ, следует увеличивать:

* МАЖОРНУЮ версию, когда сделаны обратно несовместимые изменения API.
* МИНОРНУЮ версию, когда вы добавляете новую функциональность, не нарушая обратной совместимости.
* ПАТЧ-версию, когда вы делаете обратно совместимые исправления.

[Подробнее](https://semver.org/lang/ru/)

### Как проверить новую версию перед публикацией
Для проверки работоспособности пакета после правок необходимо:
1. Запустить скрипт сборки из корня проекта командой `npm run build`
2. Запустить скрипт упаковки из корня проекта командой `npm pack` 
3. В результате выполнения скрипта в корне будет создан tgz архив с именем instant-messengers-vk-teams-bridge-{{номер версии}}.tgz
4. Установить в проект новую версию пакета командой `npm install {{путь instant-messengers-vk-teams-bridge-{{номер версии}}.tgz}}`
5. Проверить работоспособность

## Установка
Добавляем ``@instant-messengers:registry=https://gitlab.corp.mail.ru/api/v4/packages/npm/`` в ``.npmrc``. Далее загружаем как npm пакет.

Или добавляем скрипт на страницу, если в проекте нет сборщика:
```html
<head>
    <script src="./index.min.js"></script>
    <script>
        window.VKTBridge.send('LoadingCompleted', { ok: true })
            .then((bridgeResponse) => {
                console.log({ bridgeResponse });
            })
            .catch((bridgeError) => {
                console.log({ bridgeError });
            });
    </script>
</head>
```

### Инициализация экземпляра класса и типизация
Для правильной типизации `bridge` необходимо при инициализации класса передать в его конструктор следующие generic аргументы:

- `SUBSCRIBE_ACTION` - enum, описывающий возможные имена подписок (`TeamsSubscribeAction`)
- `SUBSCRIBE_DESCRIPTOR` - тип формата `Record<SUBSCRIBE_ACTION,TSubscribeActionDescriptor<any, any, any>>` (`TTeamsSubscribeActionsDescriptor`)
- `SEND_ACTION` - enum, описывающий возможные имена ивентов для отправки (`TeamsSendAction`)
- `SEND_DESCRIPTOR` - тип формата `Record<SUBSCRIBE_ACTION,TSendActionDescriptor<any, any, any>>` (`TTeamsSendActionsDescriptor`)

Пример: `new Bridge<SUBSCRIBE_ACTION, SUBSCRIBE_DESCRIPTOR, SEND_ACTION, SEND_DESCRIPTOR>()`

Для стандартного использования, все вышеописанные типы можно импортировать прямо из пакета:

```tsx
import {
	Bridge,
	TeamsSubscribeAction,
	TTeamsSubscribeActionsDescriptor,
	TeamsSendAction,
	TTeamsSendActionsDescriptor
} from '@instant-messengers/vk-teams-bridge';

const bridge = new Bridge<TeamsSubscribeAction, TTeamsSubscribeActionsDescriptor, TeamsSendAction, TTeamsSendActionsDescriptor>()
```

Если нужны кастомные события, можно по аналогии описать свои типы с помощью хелперов, встроенных в пакет.

## Настройка для супер аппа
Настройка зависит от платформы супер аппа (веб, айос, андроид, десктоп)
Для реализации в iframe достаточно слушать событие message и парсить ивент.
Подробнее о настройке [тут](https://confluence.vk.team/display/IM/IM.+Common.+Mini+Apps#IM.Common.MiniApps-%D0%A0%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8FAPI%D0%BF%D1%80%D0%B8%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B5mini-app%D0%B2iframe).

## Настройка для мини веб аппа

Описание и список доступных методов [тут](https://confluence.vk.team/display/IM/IM.+Common.+Mini+Apps#IM.Common.MiniApps-%D0%A0%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9ExternalAPI%D0%BF%D1%80%D0%B8%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8%D0%B8%D0%B2%D0%B5%D0%BD%D1%82%D0%BE%D0%B2)

### Эмит событий в супер-апп
Для отправки событий в супер-апп необходимо вызвать метод send экземпляра класса `Bridge`.

Метод `send` принимает в качкестве аргументов 2 парамета:

- action - одно из значений enum, переданного аргументом `SEND_ACTION` в generic конструктора класса `Bridge`
- payload - аргумент, передаваемый в качестве пэйлоада с типом `TSendActionDescriptor[’input’]`

Результатом вызова метода будет Promise который либо зарезолвится со значением типа `TSendActionDescriptor[’output’]`
либо зареджектится с ошибкой `BridgeError` и кодом ошибки с типом `TSendActionDescriptor[’errorCode’]`

```tsx
import { TeamsSendAction, isBridgeError, TErrorCode, TTeamsSendActionsDescriptor } from '@instant-messengers/vk-teams-bridge';

import { bridge } from '.../.../bridge'; // импорт из кода проекта

async function openPopUp() {
    try {
        const { feedback } = await bridge.send(TeamsSendAction.OpenPopUp, {
            title: 'Важные новости!',
            text: 'Крокодил Гена украл Чебурашку!',
            mainButton: 'Верю!',
            secondaryButton: 'Не верю!',
        });

        if (feedback === 'main') {
            //..
        } else {
            //..
        }
    } catch (err) {
        // Проверяем на то, что ошибка соответствует типу BridgeError
        if (isBridgeError<TErrorCode<TTeamsSendActionsDescriptor[TeamsSendAction.OpenPopUp]>>(err)) {
            switch (err.code) {
                case TeamsErrorCode.POPUP_CLOSED:
                    // обработка ошибки с кодом POPUP_CLOSED
                    break;
                case BaseBridgeErrorCode.BAD_REQUEST:
                    // обработка ошибки с кодом BAD_REQUEST
                    break;
                //...
            }
        } else {
            // обработка других ошибок
        }
    }
}
```

### Подписка на события из супер-апп
Для подписки на события из супер-апп необходимо воспользоваться методом subscribe экземпляра класса `Bridge`.

Метод subscribe принимает в качестве аргументов 3 парамета:

- action - одно из значений enum, переданного аргументом SUBSCRIBE_ACTION в generic конструктора класса `Bridge`
- callback - функция-обработчки, которая будет вызвана при наступлении action
- params - дополнительные параметры подписки события

Результатом вызова метода будет `Promise` который либо зарезолвится объектом со значением типа  `{ unsubscribe: () ⇒ void }`, где `unsubscribe` - метод,
вызов которого отменяет подписку, либо зареджектится с ошибкой `BridgeError` и кодом ошибки с типом `TSubscribeActionDescriptor[’errorCode’]`.

```tsx
import { TeamsSendAction, isBridgeError, TErrorCode, TTeamsSendActionsDescriptor } from '@instant-messengers/vk-teams-bridge';

import { bridge } from '.../.../bridge'; // импорт из кода проекта

async function subscribeToChangeLanguage() {
    try {
        // Для отписки от события необходимо вызвать метод unsubscribe
        const { unsubscribe } = await bridge.subscribe(TeamsSubscribeAction.Language, (data) => {
            console.log(`Язык сменился на ${data.language}`)
        });
    } catch (err) {
        // Проверяем на то, что ошибка соответствует типу BridgeError
        if (isBridgeError<TErrorCode<TTeamsSubscribeActionsDescriptor[TeamsSubscribeAction.Language]>>(err)) {
            switch (err.code) {
                case BaseBridgeErrorCode.INTERNAL_ERROR:
                    // обработка ошибки с кодом INTERNAL_ERROR
                    break;
                //... обработка других кейсов
            }
        } else {
            // обработка других ошибок
        }
    }
}
```

### Обработка ошибок
`Bridge` может выбросить ошибку в виде экземпляра класса `BridgeError`. Для явной проверки на то, что ошибка, 
которую мы словили в `catch` является экземпляром класса `BridgeError` есть хелпер `isBridgeError()`.

`isBridgeError` в качестве аргумента generic принимает `TErrorCode<{Дескриптор события, которое мы обрабатываем}>`, 
а  в качестве аргумента функции принимает саму ошибку.

Примеры работы с этим хелпером описаны выше. 
Обратите внимание на то, что в качестве аргумента generic `TErrorCode` можно воспользоваться встроенными в пакет типами дескрипторов,  
которые есть на каждое стандартное действие. Так, например запись `isBridgeError<TErrorCode<TTeamsSendActionsDescriptor[TeamsSendAction.OpenPopUp]>>(err)` из примера 
работы с методом `bridge.send()` можно заменить на `isBridgeError<TErrorCode<TOpenPopUp>>(err)`, 
а запись `isBridgeError<TErrorCode<TTeamsSubscribeActionsDescriptor[TeamsSubscribeAction.Language]>>(err)` из примера работы 
с методом `bridge.subscribe()` можно заменить на `isBridgeError<TErrorCode<TLanguage>>(err)`.

`TOpenPopUp` и `TLanguage`, как и другие типы импортируются из пакета.
