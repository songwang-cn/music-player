<template>
    <van-popup round :overlay-style="{ background: 'none' }" v-model:show="show" :position="isPc ? 'right' : 'bottom'"
        :style="{
            width: isPc ? '40%' : '100%',
            height: isPc ? '100%' : '90%',
        }">
        <div class="pop-panel">
            <div class="pop-t">音乐搜索</div>
            <div class="content">
                <van-search placeholder="输入关键词搜索歌曲" style="padding: 0;" v-model="keyword" @search="onSearch" />
                <div class="artist" v-if="!keyword">
                    <div class="item" v-for="item of artist" @click="keyword = item.name; onSearch()">{{ item.name }}</div>
                </div>
                <div v-if="songList.length" class="song-list">
                    <div v-for="song of songList" class="item" @click="onPlay(song)">
                        <div class="left">
                            <div class="name">
                                {{ song.name }}&nbsp;&nbsp;&nbsp;
                                {{ song.artists.map((v: any) => v.name).join(',') }}
                            </div>
                        </div>
                        <div class="action">
                            <i @click.stop="onPlay(song)" class="iconfont icon-bofang" />
                            <i @click.stop="addInToDoList(song)" class="iconfont icon-tianjiadingdan1" />
                        </div>
                    </div>
                </div>
                <van-empty v-else style="flex: 1;" description="空空如也" />
                <van-pagination mode="simple" :items-per-page="pageSize" v-if="songList.length" v-model="currentPage"
                    :total-items="totalCount" @change="onPageChange" />
            </div>
        </div>
    </van-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { UseIsPc } from "@/use/UseIsPc";
import { PropType } from "vue";
import { watch } from "vue";
import { SRequest } from "@/request/index";
import HttpUrl from "@/request/HttpUrl";
import { artist } from './config'
import { appStore } from "@/config/store";
import { MusicEntity } from "@/entity/MusicEntity";
import { showToast } from "vant";

const { isPc } = UseIsPc()

const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const show = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    show.value = val
})

const emits = defineEmits(['onPlay', 'update:modelValue'])

watch(() => show.value, (val) => {
    emits('update:modelValue', val)
})

function onPlay(song: any) {
    emits('onPlay', song)
    show.value = false
}

async function addInToDoList(song: any) {

    const entity = new MusicEntity()
        .setId(song.id)
        .setName(song.name)
        .setDuration(song.duration)
        .setSinger(song.artists.map(v => v.name).join(','))

    appStore().addMusicToHistory(entity)
    showToast({
        type: "success",
        message: "已添加到播放列表"
    })
}



const keyword = ref('')

const songList = ref([] as any[])

const currentPage = ref(1)

const pageSize = ref(30)

const totalCount = ref(0)

async function onSearch() {
    const data = await new SRequest(HttpUrl.Music.Search).post({
        keyword: keyword.value,
        page: currentPage.value,
        limit: pageSize.value,
    })
    songList.value = data.songs
    totalCount.value = data.songCount
}

function onPageChange(page: number) {
    currentPage.value = page
    onSearch()
}


</script>

<style lang="scss" scoped>
.pop-panel {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #252323;
    display: flex;
    flex-direction: column;

    .pop-t {
        text-align: center;
        color: #fff;
        padding: 20px;
        font-size: 16px;
    }

    .content {
        flex: 1;
        padding: 0 20px 20px 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        :deep(.van-empty__description) {
            color: #eee;
        }
    }

    .artist {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;

        .item {
            width: 50px;
            height: 50px;
            padding: 10px;
            transform: scale(.9);
            background-color: #ea3e3c;
            color: #fff;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-radius: 100%;
            text-align: center;
            transition: 300ms;
        }

        @media screen and (max-width: 500px) {
            .item {
                width: 40px;
                height: 40px;
                padding: 5px;
            }
        }
    }

    .song-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px 0;
        font-size: 14px;

        .item {
            padding: 15px 5px;
            color: #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: 200ms;

            .left {
                display: flex;
                align-items: center;
                flex: 1;

                &:hover {
                    color: #ea3e3c;
                }
            }

            .action {
                .iconfont {
                    color: #ea3e3c;
                    font-weight: bold;
                    padding: 0 10px;
                }
            }
        }
    }

    :deep(.van-pagination__page-desc) {
        color: #eee;
    }

    :deep(.van-empty__description) {
        color: #aaaaaa !important;
    }
}
</style>
