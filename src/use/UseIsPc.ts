import {computed, ref} from 'vue'

export function UseIsPc() {
    const userAgentInfo = navigator.userAgent

    const isPc = computed(() => {
        return (userAgentInfo.indexOf("Windows") > -1 && userAgentInfo.indexOf("NT") > -1) || userAgentInfo.indexOf("Macintosh") > -1
    })

    return {
        isPc
    }
}