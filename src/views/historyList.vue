<template>
    <van-popup :overlay-style="{ background: 'none' }" round v-model:show="show" :position="isPc ? 'left' : 'bottom'"
        :style="{
            width: isPc ? '400px' : '100%',
            height: '88%',
            background: 'rgba(0,0,0,.7)'
        }">
        <div class="pop-panel">
            <div class="pop-t">
                播放列表
            </div>
            <div class="content">
                <div v-if="appStore().historyMusicList.length" class="song-list">
                    <div v-for="song of appStore().historyMusicList" :class="['item', musicObj.id == song.id && 'current']"
                        @click="emits('onPlay', song)">
                        <div class="left">
                            <div class="name">
                                <i class="iconfont icon-zhengzaibofang" v-if="musicObj.id == song.id && isPlaying" />
                                {{ song.name }}&nbsp;&nbsp;{{ song.singer }}
                            </div>
                        </div>
                        <div class="action">
                            <i class="iconfont icon-shanchu1" @click.stop="onDelete(song)" />
                        </div>
                    </div>
                </div>
                <van-empty v-else style="flex: 1;" description="空空如也" />
            </div>
        </div>
    </van-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { UseIsPc } from "@/use/UseIsPc";
import { appStore } from "@/config/store";
import { PropType } from "vue";
import { MusicEntity } from "@/entity/MusicEntity";
import { watch } from "vue";

const { isPc } = UseIsPc()

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    musicObj: {
        type: Object as PropType<MusicEntity>,
        default: () => new MusicEntity()
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
})

const show = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    show.value = val
})

const emits = defineEmits(['onPlay', 'onNext', 'update:modelValue'])

watch(() => show.value, (val) => {
    emits('update:modelValue', val)
})

function onDelete(song: MusicEntity) {
    if (song.id === props.musicObj.id) {
        emits('onNext')
    }
    appStore().deleteInHistory(song)
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
    color: #ffffff;

    .pop-t {
        text-align: center;
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

    .song-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px 0;

        .item {
            font-size: 14px;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: 200ms;

            &.current {
                background: #ea3e3c;
                color: #fff;
            }

            .left {
                flex: 1;
                display: flex;
                align-items: center;

                .icon-zhengzaibofang {
                    animation: flow 1s infinite ease-in-out;
                    display: inline-block;
                }

                @keyframes flow {
                    0% {
                        transform: rotateX(-60deg);
                    }

                    100% {
                        transform: rotateX(60deg);
                    }
                }
            }
        }
    }

    :deep(.van-pagination__page-desc) {
        color: #fff;
    }
}
</style>
