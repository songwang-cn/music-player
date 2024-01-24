import { defineStore } from 'pinia'
import { MusicEntity } from '@/entity/MusicEntity'

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
        lastMusicObj: getLastMusicObjFromStorage() || new MusicEntity(),
        historyMusicList: getHistoryMusicList() || []
    }),
    actions: {
        setLastMusicObj(music: MusicEntity) {
            this.addMusicToHistory(JSON.parse(JSON.stringify(music)))
            this.lastMusicObj = music
            localStorage.setItem('lastMusicObj', JSON.stringify(music))
        },
        addMusicToHistory(music: MusicEntity) {
            if(!this.historyMusicList.some((item: MusicEntity) => item.id === music.id)){
                this.historyMusicList.push(music)
                localStorage.setItem('historyMusicList', JSON.stringify(this.historyMusicList))
            }
        }
    }
})