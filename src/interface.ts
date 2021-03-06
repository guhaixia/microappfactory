export interface Frame {
    /**
     * 启动
     */
    start: () => void;

    /**
     * 全局状态变化的监听
     */
    onGlobalStateChange: OnGlobalStateChange;

    /**
     * 改变全局状态
     */
    setGlobalState: SetGlobalState;

    /**
     * 注销全局状态监听
     */
    offGlobalStateChange: OffGlobalStateChange;
}

/**
 * 注册的请求参数
 */
export interface AppParams {
    /**
     * 子应用信息数组
     */
    apps: Array<RegistrableApp>;

    /**
     * 生命周期
     */
    lifecycles?: LifeCycles;

    /**
     * 全局状态
     */
    globalState?: Record<string, any>;

    /**
     * 默认进入的子应用
     */
    defaultMountApp?: string;

    /**
     * 第一个子应用mount之后
     */
    onFirstAppMounted?: () => void;
}

/**
 * 注册的返回参数
 */
export interface RegisterMicroAppResult {
    /**
     * 启动
     */
    start: () => void;

    /**
     * 全局状态变化的监听
     */
    onGlobalStateChange: OnGlobalStateChange;

    /**
     * 改变全局状态
     */
    setGlobalState: SetGlobalState;

    /**
     * 注销全局状态监听
     */
    offGlobalStateChange: OffGlobalStateChange;
}

type Lifecycle = (app: RegistrableApp) => Promise<any>;

export interface LifeCycles {
    /**
     * function before app load
     */
    beforeLoad?: Lifecycle | Array<Lifecycle>;

    /**
     * function before app mount
     */
    beforeMount?: Lifecycle | Array<Lifecycle>;

    /**
     * function after app mount
     */
    afterMount?: Lifecycle | Array<Lifecycle>;

    /**
     * function before app unmount
     */
    beforeUnmount?: Lifecycle | Array<Lifecycle>;

    /**
     * function after app unmount
     */
    afterUnmount?: Lifecycle | Array<Lifecycle>;
}

export interface RegistrableApp {
    /**
     * 名称
     */
    name: string;

    /**
     * 微应用的入口
     */
    entry: string;

    /**
     * 微应用的容器节点的选择器或者 Element 实例
     */
    container: string | HTMLElement;

    /**
     * 微应用的激活规则
     */
    activeRule: string | ((locaiton: Location) => boolean) | Array<string | ((locaiton: Location) => boolean)>;

    /**
     * loading 状态发生变化时会调用的方法
     */
    loader?: (loading: boolean) => void;

    /**
     * 主应用需要传递给微应用的数据
     */
    props?: Record<string, any>;
}

/**
 * 在主应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
 */
export type OnGlobalStateChange = (callback: (state: Record<string, any>, prevState: Record<string, any>) => void, fireImmediately?: boolean) => void;

/**
 * 设置全局状态
 */
export type SetGlobalState = (state: Record<string, any>) => boolean;

/**
 * 移除全局状态监听
 */
export type OffGlobalStateChange = () => boolean;

export enum Adapter {
    Qiankun = 'qiankun'
}

export interface RegisterMicroAppParams extends AppParams {
    /**
     * 微前端框架
     */
    adapter: Adapter;
}
