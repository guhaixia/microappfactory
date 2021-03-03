## 一、API

## registerMicroApp(registerMicroAppParams)

* 参数

    * registerMicroAppParams - ```RegisterMicroAppParams``` - 必选，注册的信息

* 类型

    * ```RegisterMicroAppParams```

        * adapter - ```'qiankun'``` - 可选，使用哪种微前端框架，默认为 ```'qiankun'```

            配置为```'qiankun'```则会使用 ```qiankun``` 框架，目前仅支持```'qiankun'```，后续再补充其他微前端框架

        * apps - ```Array<RegistrableApp>``` - 必选，微应用的注册信息

        * lifecycles - ```LifeCycles``` - 可选，全局的微应用生命周期钩子

        * globalState - ```Record<string, any>``` - 可选，初始设置的全局状态

        * defaultMountApp - ```string``` - 可选，默认进入的子应用

        * onFirstAppMounted - ```() => void;``` - 可选，第一个子应用mount之后

    * ```RegistrableApp```

        * name - ```string``` - 必选，微应用的名称，微应用之间必须确保唯一。

        * entry - ```string``` - 必选，微应用的入口，微应用的访问地址。如```'https://www.baidu.com'```

        * container - ```string``` - 必选，微应用的容器节点的选择器或者Element实例。如 ```'#root'```或```'document.querySelector('#root')'```

        * activeRule - ```string | (location: Location) => boolean | Array<string | (location: Location) => boolean>``` - 必选，微应用的激活规则。

            * 支持直接配置字符串或字符串数组，如```'/app1'```或 ```['/app1', '/app2']```，当配置为字符串时会直接跟url中的路径部分做前缀匹配，匹配成功标明当前应用会被激活。

            * 支持配置一个active function函数或一组active function。函数会传入当前location作为参数，函数返回true时标明当前微应用会被激活。如```(location) => location.pathname.startsWith('/app1')```

        * loader - ```(loading: boolean) => void``` - 可选，loading 状态发生变化时会调用的方法。

        * props - ```Record<string, any>``` - 可选，主应用需要传递给微应用的数据。

    * LifeCycles

        ```js
        type LifeCycle = (app: RegistrableApp) => Promise<any>;
        ```

        * beforeLoad - ```LifeCycle | Array<LifeCycle>``` - 可选，function before app load

        * beforeMount - ```LifeCycle | Array<LifeCycle>``` - 可选，function before app mount

        * afterMount - ```LifeCycle | Array<LifeCycle>``` - 可选，function after app mount

        * beforeUnmount - ```LifeCycle | Array<LifeCycle>``` - 可选，function before app unmount

        * afterUnmount - ```LifeCycle | Array<LifeCycle>``` - 可选，function after app unmount

* 返回

    * RegisterMicroAppResult

        * start - ```() => void;``` 启动

        * onGlobalStateChange - ```(callback: (state: Record<string, any>, prevState: Record<string, any>) => void, fireImmediately?: boolean) => void;```，在主应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback

        * setGlobalState - ```(state: Record<string, any>) => boolean;```，设置全局状态

        * offGlobalStateChange - ```() => boolean;```，移除全局状态监听，微应用 umount 时会默认调用

        注：只有传递了 ```globalState```，```onGlobalStateChange```、 ```setGlobalState```、```offGlobalStateChange```才有效


## 二、使用示例

### 1. 当 adapter 选择 ```'qiankun'``` 时，如果要兼容IE11，需要导入 ```polyfill.js```


* 第 1 种写法：在 html 中导入
    ```html
    <script src='microappfactory/dist/polyfill.js'></script>
    ```


* 第 2 种写法：在入口 js 的第一行导入

    ```js
    import 'microappfactory/dist/polyfill.js'
    ```


### 2. 注册

* 第 1 种写法：在 js 中导入 ```microappfactory.js```

```js
import { registerMicroApp } from 'microappfactory/dist/microappfactory.js';

const loader = (loading) => { console.log(loading) }
const props = {
    lang: 'zh-cn'
}
const apps = [
    {
        name: 'reactdemo',
        entry: '//localhost:1001',
        container: '#subapp-container',
        loader,
        activeRule: '/react',
        props
    },
    {
        name: 'vue',
        entry: '//localhost:1003',
        container: '#subapp-container',
        loader,
        activeRule: '/vue',
        props
    }
]

/**
 * 注册子应用
 */
const { start, onGlobalStateChange, setGlobalState } = registerMicroApp(
    {
        adapter: 'qiankun',
        apps,
        defaultMountApp: '/vue',
        lifecycles: {
            beforeLoad: [
                (app) => {
                    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
                },
            ],
            beforeMount: [
                (app) => {
                    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
                },
            ],
            afterUnmount: [
                (app) => {
                    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
                },
            ],
        },
        globalState: {
            tokenid: '12345678'
        },
        onFirstAppMounted: () => {
            console.log('first app mounted')
        }
    }
);

/**
 * 监听globalState
 */
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

/**
 * 改变globalState
 */
setGlobalState({
    tokenid: '9999999'
});

/**
 * 启动应用
 */
start()
```

* 第 2 种写法：在 html 中导入 ```microappfactory.js```

```html
<script src='microappfactory/dist/microappfactory.js'></script>
```

```js
/**
 * 注册子应用
 */
const { start, onGlobalStateChange, setGlobalState } = window.microappfactory.registerMicroApp(
    {
        adapter: 'qiankun',
        apps,
        defaultMountApp: '/vue',
        lifecycles: {
            beforeLoad: [
                (app) => {
                    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
                },
            ],
            beforeMount: [
                (app) => {
                    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
                },
            ],
            afterUnmount: [
                (app) => {
                    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
                },
            ],
        },
        globalState: {
            tokenid: '12345678'
        },
        onFirstAppMounted: () => {
            console.log('first app mounted')
        }
    }
)

/**
 * 监听globalState
 */
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

/**
 * 改变globalState
 */
setGlobalState({
    tokenid: '9999999'
});

/**
 * 启动应用
 */
start()
```