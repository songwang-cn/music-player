
import { appStore } from '@/config/store'
import { computed } from 'vue'

 export const tokens = ['sumBlLtuZ4h4r7DO', '4DmiRet8RdSa37h4'] //ALAPI 获取的token
 
 export const token = computed(() => tokens[appStore().tokenIndex])


 
 //  ALAPI账号 
 //  1: 18166335309 swa0654....
 //  2: 15310975275 swa0654....