import { registerMicroApps, start, initGlobalState, setDefaultMountApp, runAfterFirstMounted } from 'qiankun'
import { AppFacotry, OnGlobalStateChange, SetGlobalState, OffGlobalStateChange } from '../interface'

/**
 * ie11 Object.assign 兼容性处理
 */
const setObjectAssign = () => {
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target) { // .length of function is 2
                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
    
                const to = Object(target);
        
                for (let index = 1; index < arguments.length; index++) {
                    const nextSource = arguments[index];
        
                    if (nextSource !== null && nextSource !== undefined) {
                        for (const nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

              return to;
            },
            writable: true,
            configurable: true
        });
    }
}


/**
 * ie11 sandbox 兼容性处理
 */
const setInterval = () => {
    if (!window.hasOwnProperty('setInterval') && window.setInterval) {
        window['setInterval'] = window.setInterval
    }

    if (!window.hasOwnProperty('clearInterval') && window.clearInterval) {
        window['clearInterval'] = window.clearInterval
    }
}

export default class QiankunAppFacotry implements AppFacotry {
    onGlobalStateChange: OnGlobalStateChange = () => {};

    setGlobalState: SetGlobalState = () => false;

    offGlobalStateChange: OffGlobalStateChange = () => false;

    start: () => void;

    constructor({ apps, lifecycles, globalState, defaultMountApp, onFirstAppMounted }) {
        setInterval()
        setObjectAssign()
        registerMicroApps(apps, lifecycles)

        if (globalState) {
            const { onGlobalStateChange, setGlobalState, offGlobalStateChange } = initGlobalState(globalState)

            this.onGlobalStateChange = onGlobalStateChange
            this.setGlobalState = setGlobalState
            this.offGlobalStateChange = offGlobalStateChange
        }

        if (defaultMountApp) {
            setDefaultMountApp(defaultMountApp)
        }

        if (onFirstAppMounted) {
            runAfterFirstMounted(onFirstAppMounted)
        }

        this.start = start
    }
}