import { BaseEntity } from "./BaseEntity";
import DefaultCover from '@/assets/img/Jay.png'

export class MusicEntity extends BaseEntity{

    url: string = ''

    coverUrl: string = new URL(DefaultCover, import.meta.url).href

    dt: number = 0

    singer?:string
    
    setUrl(url: string) {
        this.url = url
        return this
    }

    setCoverUrl(url: string) {
        this.coverUrl = url
        return this
    }

    setDuration(dt: number) {
        this.dt = dt
        return this
    }

    setSinger(singer: string) {
        this.singer = singer
        return this
    }

}