import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function initState(){
    return {
        isCollapse: true,
    }

}
export const useAllDataStore = defineStore('allData', () => {
    const state = ref(initState())

    return { state }
})