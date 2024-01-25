import { showToast } from "vant"
import { token } from './config'

export class SRequest {

    url: string = ''

    method: string = 'GET'

    constructor(url: string) {
        this.url = url
    }

    setMethod(method: string) {
        this.method = method
    }

    async get(params: Record<string, any>): Promise<any> {
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
        let result
        switch (this.method) {
            case 'GET':
                result = await fetch(this.url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                break
            case 'POST':
                result = await fetch(this.url, {
                    method: this.method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token,
                        ...params
                    })
                })
                break
        }
        
        const json = await result?.json()
        return json.data
    }
}