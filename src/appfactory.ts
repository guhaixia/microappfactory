import { Frame, RegisterMicroAppResult } from './interface'

/**
 * 抽象化工厂类
 */
export abstract class MicroAppFactory {
    /**
     * 框架
     */
    protected frame: Frame;

    constructor(frame: Frame) {
        this.frame = frame;
    }

    /**
     * 注册
     */
    public abstract register(): RegisterMicroAppResult;
}

/**
 * 扩展工厂类
 */
export class RefinedMicroAppFactory extends MicroAppFactory {
    public register(): RegisterMicroAppResult {
        const { start, onGlobalStateChange, setGlobalState, offGlobalStateChange } = this.frame

        return {
            start,
            onGlobalStateChange,
            setGlobalState,
            offGlobalStateChange,
        }
    }
}