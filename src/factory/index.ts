import { CreateAppFactory, Adapter } from '../interface'
import QiankunAppFacotry from './qiankunappfactory'

export const createAppFactory: CreateAppFactory = ({
    adapter,
    apps,
    lifecycles,
    globalState = {},
    defaultMountApp,
    onFirstAppMounted,
}) => {
    switch(adapter) {
        case Adapter.QianKun:
            return new QiankunAppFacotry({ apps, lifecycles, globalState, defaultMountApp, onFirstAppMounted })

        default:
            // TODO 其他微前端框架
    }
}