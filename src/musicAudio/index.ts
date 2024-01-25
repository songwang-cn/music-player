export class MusicAudio{

    audio: HTMLAudioElement

    url: string = ''

    constructor() {
        this.audio = new Audio()
    }

    setUrl(url: string) {
        this.audio.src = url
        return this
    }

    getDuration() {
        return this.audio.currentTime
    }

    play() {
        this.audio.play()
    }

    pause() {
        this.audio.pause()
    }

    setCurrentTime(time: number) {
        this.audio.currentTime = time
        return this
    }

    onEnded(callback: any) {
        this.audio.onended = callback
    }
}