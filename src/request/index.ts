import { showToast } from "vant"
import { token } from './config'
import { appStore } from "@/config/store"

export class SRequest {

    url: string = ''

    method: string = 'GET'

    constructor(url: string) {
        this.url = url
    }

    setMethod(method: string) {
        this.method = method
    }

    async get(params: Record<string, any>) {
        this.setMethod('GET')
        return this.onRequest(params)
    }

    async post(params: Record<string, any>): Promise<any> {
        this.setMethod('POST')
        return this.onRequest(params)
    }

    async onRequest(params: Record<string, any>) {
        showToast({
            type: 'loading',
            message: '加载中...',
            duration: 2
        })
        const res = await fetch(this.url, {
            method: this.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token.value,
                ...params

            })
        })
        appStore().changeTokenIndex()
        const json = await res.json()
        return json.data
    }
}