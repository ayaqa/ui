import { defineStore } from 'pinia'

import { fetchUIBugs } from 'src/api/bug'
import { ConfiguredBugGenericConfig, ConfiguredBugsStoreInterface, ConfiguredBugsStoreItemInterface } from 'src/types/api/bug'
import { CONFIGURED_BUGS } from 'src/consts'

export const useBugStore = defineStore('bugs', {
    state: (): ConfiguredBugsStoreInterface => ({
        areHashed: false,
        bugs: null
    }),
    getters: {
        areKeysHashed (state): boolean { return state.areHashed },
        hasBugs: (state) => (bugType: CONFIGURED_BUGS) => state.bugs?.[bugType],
        isAlways: (state) => (bugType: CONFIGURED_BUGS, bugId: string): boolean => state.bugs?.[bugType]?.[bugId]?.isAlways === true,
        getBugConfig: (state) => (bugType: CONFIGURED_BUGS, bugId: string): ConfiguredBugGenericConfig | undefined => state.bugs?.[bugType]?.[bugId]?.bugConfig,
        getConditionConfig: (state) => (bugType: CONFIGURED_BUGS, bugId: string): ConfiguredBugGenericConfig | undefined => state.bugs?.[bugType]?.[bugId]?.conditionConfig,
    },
    actions: {
        async fetchBugs () {
            try {
                const response = await fetchUIBugs()

                const bugs: ConfiguredBugsStoreItemInterface = JSON.parse(atob(response.data.bugs))

                console.log(bugs)

                this.bugs = bugs
                this.areHashed = response.data.areHashed
            } catch (error) {
                return error
            }
        },
    }
})