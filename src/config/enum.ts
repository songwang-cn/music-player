export enum PlayMode{
    LIST = 'list',
    LOOP = 'loop'
}

export const PlayModeRecord: Record<PlayMode, string> = {
    [PlayMode.LIST]: '列表循环',
    [PlayMode.LOOP]: '单曲循环'
}