<template>
  <div
    class="music"
    :style="{
      backgroundImage: `url(${appStore().bgUrl})`
    }"
  >
    <div class="music-content">
      <div class="top-bar">
        <div
          class="bar-item"
          @click="UseRandomBg"
        >
          <i class="iconfont icon-dongtaibizhi" />
          <div class="bar-t">
            随机背景
          </div>
        </div>
        <div
          class="bar-item"
          @click="openSearchPanel"
        >
          <i class="iconfont icon-sousuo" />
          <div class="bar-t">
            歌曲搜索
          </div>
        </div>
      </div>
      <div
        :key="MusicObj.id"
        class="music-top"
      >
        <div
          :class="[
            'music-pic',
            isPlaying && 'playing'
          ]"
        >
          <van-image
            :class="isPlaying ? 'playing' : 'pause'"
            class="music_img"
            :src="MusicObj.coverUrl"
            width="65%"
            height="65%"
          />
          <div class="mask" />
        </div>
      </div>
      <div class="ctl">
        <div class="song-name">
          {{ MusicObj.name }}&nbsp;-&nbsp;{{ MusicObj.singer }}
        </div>
        <div class="progress">
          <div class="time">
            {{ getMusicTimeString(AppConfig.Audio.getDuration()) }}
          </div>
          <van-slider
            v-model="progress"
            @change="onProgressChange($event)"
          />
          <div class="time">
            {{ getMusicTimeString(MusicObj.dt / 1000) }}
          </div>
        </div>
        <div class="act">
          <i
            class="iconfont"
            :class="appStore().playMode === PlayMode.LIST ? 'icon-shunxubofang' : 'icon-danquxunhuan'"
            @click="appStore().changePlayMode()"
          />
          <i
            class="iconfont icon-shixin-shangyishou"
            @click="switchSong(0)"
          />
          <i
            class="iconfont"
            :class="isPlaying ? 'icon-zanting' : 'icon-zantingbofang'"
            @click="onPlay"
          />
          <i
            class="iconfont icon-shixin-shangyishou"
            style="transform: rotate(180deg);"
            @click="switchSong(1)"
          />
          <i
            class="iconfont icon-bofangliebiao"
            @click="openMusicList"
          />
        </div>
      </div>
    </div>

    <Search
      v-model="searchPanelIsOpen"
      @on-play="playSong"
    />
    <HistoryList
      v-model="showToDoList"
      :music-obj="MusicObj"
      :is-playing="isPlaying"
      @on-play="playSong"
      @on-next="switchSong(1)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { appStore } from '@/config/store'
import Search from './search.vue'
import HistoryList from './historyList.vue'
import { SRequest } from '@/request'
import HttpUrl from '@/request/HttpUrl'
import { token } from '@/request/config'
import { UseRandomBg } from '@/use/UseRandomBg'
import { PlayMode } from '@/config/enum'
import { AppConfig } from '@/AppConfig'

const searchPanelIsOpen = ref(false)

const showToDoList = ref(false)

function openSearchPanel() {
  searchPanelIsOpen.value = true
}

function openMusicList() {
  showToDoList.value = true
}

const isPlaying = ref(false)

const progress = ref(0)

const MusicObj = ref(appStore().lastMusicObj)

console.log('上一次播放的歌曲信息', MusicObj.value)

AppConfig.Audio
  .setUrl(MusicObj.value.url)
  .setLoop(appStore().playMode === PlayMode.LOOP)

AppConfig.Audio.onEnded(() => {
  console.log('当前歌曲播放完毕')
  setTimeout(() => {
    if (appStore().playMode === PlayMode.LIST) {
      switchSong(1)
      console.log('下一首')
    }
  }, 500)
})

function onProgressChange(num: number) {
  clearPlayTimer()
  AppConfig.Audio.setCurrentTime(num / 100 * MusicObj.value.dt / 1000)
  initPlayTimer()
}

function onPlay() {
  if (!MusicObj.value.url) {
    return showToast('暂无音乐，点击右上角去搜索歌曲')
  }
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    AppConfig.Audio.play()
    initPlayTimer()
  } else {
    AppConfig.Audio.pause()
    clearPlayTimer()
  }
}

function switchSong(type: number) {
  isPlaying.value = false
  progress.value = 0
  const historyList = appStore().historyMusicList
  if (!historyList.length) {
    return showToast('播放列表为空')
  }
  const currentIndex = historyList.findIndex((v) => v.id === MusicObj.value.id)
  switch (type) {
    // 上一首
    case 0:
      if (currentIndex === 0) {
        playSong(historyList[historyList.length - 1])
      } else {
        playSong(historyList[currentIndex - 1])
      }
      break
    // 下一首
    case 1:
      if (currentIndex < historyList.length - 1) {
        playSong(historyList[currentIndex + 1])
      } else {
        playSong(historyList[0])
      }
  }
}

async function getSongDetail(song: any) {
  const data = await new SRequest(HttpUrl.Music.Detail).post({
    id: song.id,
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
    .setSinger(songObj.ar.map((v: any) => v.name).join(','))
}

async function playSong(song: any) {
  if (song.id === MusicObj.value.id && isPlaying.value) {
    return showToast('正在播放这首歌')
  }
  
  await getSongDetail(song)

  const playUrl = `${HttpUrl.Music.PlayUrl}?id=${song.id}&token=${token.value}`
  /**
  * 设置音乐信息
  * @param id
  * @param url
  */
  MusicObj.value
    .setId(song.id)
    .setUrl(playUrl)

  AppConfig.Audio.setUrl(playUrl).play()
  appStore().setLastMusicObj(MusicObj.value)
  isPlaying.value = true
  initPlayTimer()
}

const playTimer = ref(null as any)

function initPlayTimer() {
  clearPlayTimer()
  playTimer.value = setInterval(() => {
    progress.value = AppConfig.Audio.getDuration() * 1000 / MusicObj.value.dt * 100
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
  return num >= 10 ? num : `0${num}`
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
    background: linear-gradient(#111, rgba(0, 0, 0, 0.1), #111);
    overflow-y: auto;

    .top-bar {
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

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
      height: 60%;
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
      height: 30%;
      width: 75%;
      margin: 10px auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

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
        padding: 0 35px;
        display: flex;
        align-items: center;
        position: relative;

        .time {
          color: #fff;
          font-size: 12px;
          position: absolute;

          &:nth-child(1) {
            left: -10px;
          }

          &:last-child {
            right: -10px;
          }
        }
      }

      .act {
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
