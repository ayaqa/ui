import { defineStore } from 'pinia'

import { SessionStoreInterface } from 'src/types/store'
import { fetchManifest, fetchBugs, storeBugs } from 'src/api/bug'
import { BugManifestInterface } from 'src/types/api'
import { APPLICABLE_TO } from 'src/consts'
import { toRaw } from 'vue'

export const useSessionStore = defineStore('session', {
    state: (): SessionStoreInterface => ({
        meta: {
            loaded: false,
            cases: {},
            automations: {}
        },
        bugManifest: undefined,
        bugs: []
    }),
    getters: {
        hasCases: (state) => {
            return (sectionId: string) => state.meta.cases.hasOwnProperty(sectionId)
        },
        getCases () {
            return (sectionId: string) => this.hasCases(sectionId) ? this.meta.cases[sectionId] : 0
        },
        hasAutomations: (state) => {
            return (sectionId: string) => state.meta.automations.hasOwnProperty(sectionId)
        },
        getAutomations () {
            return (sectionId: string) => this.hasAutomations(sectionId) ? this.meta.automations[sectionId] : 0
        }
    },
    actions: {
        async fetchMeta () {
            console.log('Fetching App meta')
        },
        async fetchBugManifest () {
            try {
                const response = await fetchManifest()

                this.bugManifest = response.data
            } catch (error) {
                return error
            }
        },
        removeBug (bugRow: BugManifestInterface) {
            let indexToRemove = this.bugs.findIndex((item) => item === bugRow)

            this.bugs.splice(indexToRemove, 1)
        },
        addEmptyBug () {
            this.bugs.push({
                target: 'any',
                applicable: APPLICABLE_TO.ANY,
                bug: '',
                bugConfig: { key: '', value: '' },
                condition: '',
                conditionConfig: { key: '', value: '' }
            })
        },
        async fetchConfiguredBugs () {
            try {
                const response = await fetchBugs()

                this.bugs = response.data
            } catch (error) {
                return error
            }
        },
        refreshManifestAndBugs () {
            this.fetchBugManifest()
            this.fetchConfiguredBugs()
        },
        async storeBugs () {
            try {
                const resp = await storeBugs(toRaw(this.bugs))

                this.bugs = resp.data
            } catch (error) {
                return error
            }
        }
    }
})