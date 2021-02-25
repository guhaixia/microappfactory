import { Adapter, AppFacotry, RegisterMicroApp } from './interface'
import { createAppFactory } from './factory'

let appfactory: AppFacotry 

/**
 * 注册
 */
const registerMicroApp: RegisterMicroApp = ({
    adapter = Adapter.QianKun,
    apps,
    lifecycles = {},
    globalState,
    defaultMountApp,
    onFirstAppMounted,
}) => {
    appfactory = appfactory || createAppFactory({
        adapter,
        apps,
        lifecycles,
        globalState,
        defaultMountApp,
        onFirstAppMounted,
    })

    return {
        start: appfactory.start,
        onGlobalStateChange: appfactory.onGlobalStateChange,
        setGlobalState: appfactory.setGlobalState,
        offGlobalStateChange: appfactory.offGlobalStateChange,
    }
}

export {
    registerMicroApp,
}