import {computed, ref} from 'vue'

export function UseIsPc() {
    const userAgentInfo = navigator.userAgent

    const isPc = computed(() => {
        return  window.innerWidth > 500 && ((userAgentInfo.indexOf("Windows") > -1 && userAgentInfo.indexOf("NT") > -1) || userAgentInfo.indexOf("Macintosh") > -1)
    })

    return {
        isPc
    }
}