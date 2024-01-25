import { defineStore } from 'pinia'
import { MusicEntity } from '@/entity/MusicEntity'
import { showToast } from 'vant'
import { tokens } from '@/request/config'
import { PlayMode, PlayModeRecord } from './enum'
import { AppConfig } from '@/AppConfig'

function getLastMusicObjFromStorage(): any {
    const entity = new MusicEntity()
    if(localStorage.getItem('lastMusicObj')) {
        const last = JSON.parse(localStorage.getItem('lastMusicObj') as any)
        return entity.setUrl(last.url).setCoverUrl(last.coverUrl).setId(last.id).setDuration(last.dt).setName(last.name).setSinger(last.singer)
    }else{
        return null
    }
}
function getHistoryMusicList() {
    const historyList = JSON.parse(localStorage.getItem('historyMusicList') as any) || []
    const list = [] as MusicEntity[]
    historyList.map((music: any) => {
        if(!list.some((item: MusicEntity) => item.id === music.id)){
            list.push(new MusicEntity().setUrl(music.url).setCoverUrl(music.coverUrl).setId(music.id).setDuration(music.dt).setName(music.name).setSinger(music.singer))       
        }
    })
    return list
}


export const appStore = defineStore('app' ,{
    state: () => ({
        bgUrl: localStorage.getItem('bgUrl') || new URL(`@/assets/img/wallPaper/bg.webp`, import.meta.url).href,
        lastBgUrl: localStorage.getItem('lastBgUrl') || new URL(`@/assets/img/wallPaper/bg.webp`, import.meta.url).href,
        lastMusicObj: getLastMusicObjFromStorage() || new MusicEntity(),
        historyMusicList: getHistoryMusicList() || [],
        tokenIndex: Number(localStorage.getItem('tokenIndex') || 0),
        playMode: localStorage.getItem('playMode') || PlayMode.LIST,  //1-顺序播放 2-单曲循环
    }),
    actions: {
        setBgUrl(url: string){
            this.bgUrl = url
            localStorage.setItem('bgUrl', this.bgUrl)
            this.setLastBgUrl(this.bgUrl)
        },
        setLastBgUrl(url: string){
            this.lastBgUrl = url
            localStorage.setItem('lastBgUrl', this.lastBgUrl)
        },
        setLastMusicObj(music: MusicEntity) {
            this.addMusicToHistory(JSON.parse(JSON.stringify(music)))
            this.lastMusicObj = music
            localStorage.setItem('lastMusicObj', JSON.stringify(music))
        },
        addMusicToHistory(music: MusicEntity) {
            if(!this.historyMusicList.some((item: MusicEntity) => item.id === music.id)){
                this.historyMusicList.push(music)
            }else{
                const entity = this.historyMusicList.find((item: MusicEntity) => item.id === music.id)
                entity?.setId(music.id).setName(music.name).setCoverUrl(music.coverUrl).setUrl(music.url).setDuration(music.dt)
            }
            localStorage.setItem('historyMusicList', JSON.stringify(this.historyMusicList))
        },
        deleteInHistory(music: MusicEntity) {
            const list = this.historyMusicList.filter((item: MusicEntity) => item.id !== music.id)
            this.historyMusicList = list
            localStorage.setItem('historyMusicList', JSON.stringify(this.historyMusicList))
            showToast({
                type: 'success',
                message: '删除成功'
            })
        },
        changeTokenIndex() {
            if(this.tokenIndex < tokens.length - 1){
                this.tokenIndex += 1
            }else{
                this.tokenIndex = 0
            }
        },
        changePlayMode() {
            if(this.playMode === PlayMode.LIST) {
                this.playMode = PlayMode.LOOP
            }else{
                this.playMode = PlayMode.LIST
            }
            AppConfig.Audio.setLoop(this.playMode === PlayMode.LOOP)
            showToast({
                type: 'success',
                message: `已切换为${PlayModeRecord[this.playMode as PlayMode]}`
            })
            localStorage.setItem('playMode', this.playMode)
        }
    }
})