import { Frame, Adapter, RegisterMicroAppResult, RegisterMicroAppParams } from './interface'
import { QiankunFrame } from './frame'
import { RefinedMicroAppFactory, MicroAppFactory } from './appfactory'

let appfactory: MicroAppFactory

const registerMicroApp: (registerMicroAppParams: RegisterMicroAppParams) => RegisterMicroAppResult = ({
    adapter = Adapter.Qiankun,
    ...otherParmas
}) => {
    if (appfactory) {
        return appfactory.register()
    }

    let frame: Frame;

    switch(adapter) {
        case Adapter.Qiankun:
            frame = new QiankunFrame(otherParmas)
            break

        default:
            // TODO，其他微前端框架
    }

    appfactory = new RefinedMicroAppFactory(frame)
    return appfactory.register()
}

export {
    registerMicroApp
}