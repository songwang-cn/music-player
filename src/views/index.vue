<template>
  <div class="music" :style="{
    backgroundImage: `url(${appStore().bgUrl})`
  }">
    <div class="music-content">
      <div class="top-bar">
        <div class="bar-item" @click="openTodoList">
          <div class="iconfont icon-liebiao" />
          <div class="bar-t">播放列表</div>
        </div>
        <div class="bar-item" @click="UseRandomBg">
          <i class="iconfont icon-dongtaibizhi" />
          <div class="bar-t">随机背景</div>
        </div>
        <div class="bar-item" @click="openSearchPanel">
          <i class="iconfont icon-sousuo" />
          <div class="bar-t">歌曲搜索</div>
        </div>
      </div>
      <div class="music-top" :key="MusicObj.id">
        <div :class="[
          'music-pic',
          isPlaying && 'playing'
        ]">
          <van-image :class="isPlaying ? 'playing' : 'pause'" class="music_img" :src="MusicObj.coverUrl" width="65%"
            height="65%" />
          <div class="mask" />
        </div>
      </div>
      <div class="ctl">
        <div class="song-name">{{ MusicObj.name }}&nbsp;-&nbsp;{{ MusicObj.singer }}</div>
        <div class="progress">
          <div class="time">

            {{ getMusicTimeString(musicAudio.getDuration()) }}
          </div>
          <van-slider v-model="progress" @change="onProgressChange" />
          <div class="time">
            {{ getMusicTimeString(MusicObj.dt / 1000) }}
          </div>
        </div>
        <div class="act">
          <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onPre" />
          <i :class="['music-ctrl iconfont', isPlaying ? 'icon-zanting' : 'icon-zantingbofang']" @click="onPlay" />
          <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onNext" style="transform: rotate(180deg);" />
        </div>
      </div>
    </div>

    <Search v-model="searchPanelIsOpen" @on-play="playSong" />
    <HistoryList v-model="showToDoList" :music-obj="MusicObj" @on-play="playSong" @on-next="onNext"
      :is-playing="isPlaying" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MusicAudio } from "@/musicAudio/index";
import { appStore } from "@/config/store"
import Search from "./search.vue";
import HistoryList from "./historyList.vue";
import { SRequest } from "@/request";
import HttpUrl from "@/request/HttpUrl";
import { tokens } from '@/request/config'
import { showToast } from "vant";
import { UseRandomBg } from "@/use/UseRandomBg";


const searchPanelIsOpen = ref(false)

const showToDoList = ref(false)

function openSearchPanel() {
  searchPanelIsOpen.value = true
}

function openTodoList() {
  showToDoList.value = true
}

const isPlaying = ref(false)

const progress = ref(0)

const MusicObj = ref(appStore().lastMusicObj)

console.log(MusicObj.value)

const musicAudio = new MusicAudio().setUrl(MusicObj.value.url)

musicAudio.onEnded(() => {
  console.log('当前歌曲播放完毕')
  setTimeout(() => {
    onNext()
  }, 1000)
})

function onProgressChange(num: number) {
  clearPlayTimer()
  musicAudio.setCurrentTime(num / 100 * MusicObj.value.dt / 1000)
  initPlayTimer()
}

function onPlay() {
  if (!MusicObj.value.url) {
    return showToast('暂无音乐，点击右上角去搜索歌曲')
  }
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    musicAudio.play()
    initPlayTimer()
  } else {
    musicAudio.pause()
    clearPlayTimer()
  }
}

function onPre() {
  isPlaying.value = false
  const historyList = appStore().historyMusicList
  if (!historyList.length) {
    return showToast('播放列表为空')
  }
  const currentIndex = historyList.findIndex(v => v.id === MusicObj.value.id)
  if (currentIndex === 0) {
    playSong(historyList[historyList.length - 1])
  } else {
    playSong(historyList[currentIndex - 1])
  }
}

function onNext() {
  isPlaying.value = false
  const historyList = appStore().historyMusicList
  if (!historyList.length) {
    return showToast('播放列表为空')
  }
  const currentIndex = historyList.findIndex(v => v.id === MusicObj.value.id)
  if (currentIndex < historyList.length - 1) {
    playSong(historyList[currentIndex + 1])
  } else {
    playSong(historyList[0])
  }
}

async function getSongDetail(song: any) {

  const data = await new SRequest(HttpUrl.Music.Detail).post({
    id: song.id
  })
  /**
   * 设置音乐信息
   * @param name
   * @param coverUrl
   * @param duration
   */
  const songObj = data.songs[0]
  MusicObj.value
    .setName(songObj.name)
    .setCoverUrl(songObj.al.picUrl)
    .setDuration(songObj.dt)
    .setSinger(songObj.ar.map(v => v.name).join(','))
}

async function playSong(song: any) {
  if (song.id === MusicObj.value.id && isPlaying.value) {
    return showToast('正在播放')
  }
  await getSongDetail(song)

  const playUrl = `${HttpUrl.Music.PlayUrl}?id=${song.id}&token=${tokens[appStore().tokenIndex]}`
  /**
  * 设置音乐信息
  * @param id
  * @param url
  */
  MusicObj.value
    .setId(song.id)
    .setUrl(playUrl)

  musicAudio.setUrl(playUrl).play()
  appStore().setLastMusicObj(MusicObj.value)
  isPlaying.value = true
  initPlayTimer()
}

const playTimer = ref(null as any)

function initPlayTimer() {
  clearPlayTimer()
  playTimer.value = setInterval(() => {
    progress.value = musicAudio.getDuration() * 1000 / MusicObj.value.dt * 100
  }, 1000)
}

function clearPlayTimer() {
  clearInterval(playTimer.value)
  playTimer.value = null
}

function getMusicTimeString(seconds: number) {
  return `${Math.floor(seconds / 60)}:${fillString(Math.ceil(seconds % 60))}`
}

function fillString(num: number) {
  return num >= 10 ? num : '0' + num
}

</script>

<style lang="scss" scoped>
.music {
  user-select: none;
  position: fixed;
  inset: 0;
  cursor: pointer;
  background-size: cover;
  background-position: center center;

  .music-content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: linear-gradient(#111, rgba(0, 0, 0, 0.1), #111);

    .top-bar {
      height: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      .bar-item {
        text-align: center;
        font-size: 12px;
        color: #fff;
        transition: 300ms;

        &:active {
          transform: scale(.9);
        }

        .bar-t {
          padding-top: 3px;
        }
      }

      .iconfont {
        font-size: 30px;
      }
    }

    .music-top {
      height: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .music-pic {
        width: 300px;
        height: 300px;
        background: url('@/assets/img/music-bg.png');
        background-size: 100% 100%;
        position: relative;
        border-radius: 100%;
        transition: 400ms all ease-in-out;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          margin: -5% auto;
          width: 5%;
          height: 50%;
          opacity: 0;
          border-radius: 20px;
          background: #f1f1f1;
          transform-origin: 50% 0%;
          transition: 500ms;
          transform: rotate(-90deg);
        }


        &.playing {
          &::after {
            opacity: 1;
            transform: rotate(-50deg);
          }
        }

        .music_img {
          overflow: hidden;
          border-radius: 100%;
          animation: ring infinite 30s linear;
          position: absolute;
          inset: 0;
          margin: auto;
          animation-delay: 600ms;

          /*   &::after{
                      content: '';
                      inset: 0;
                      width: 10%;
                      height: 10%;
                      margin: auto;
                      position: absolute;
                      border-radius: 100%;
                      background: #000000;
                      box-shadow: 0 0 20px #acacac;
                  } */
          &.playing {
            box-shadow: 0 0 20px #929292;
            animation-play-state: running;
          }

          &.pause {
            box-shadow: none;
            animation-play-state: paused;
          }
        }

        .mask {
          position: absolute;
          inset: 0;
        }

        @keyframes ring {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      }
    }

    .ctl {
      height: 20%;
      width: 65%;
      margin: 30px auto;

      .song-name {
        width: 100%;
        text-align: center;
        font-size: 16px;
        white-space: nowrap;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .progress {
        width: 100%;
        padding: 30px 0;
        display: flex;
        align-items: center;
        position: relative;

        .time {
          color: #fff;
          font-size: 12px;
          position: absolute;

          &:nth-child(1) {
            left: -40px;
          }

          &:last-child {
            right: -40px;
          }
        }
      }

      .act {
        padding: 30px 0;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
      }

      .iconfont {
        font-size: 24px;
        color: #fff;
      }
    }
  }

}
</style>
