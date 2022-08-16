import { defineStore } from 'pinia'

interface DynamicObject {
    [key: string]: number
}

interface MetaStore {
    loaded: boolean,
    cases: DynamicObject,
    automations: DynamicObject
}

export const useMetaStore = defineStore('meta', {
    state: (): MetaStore => ({
        loaded: false,
        cases: {
            'cb-01': 12
        },
        automations: {
            'cb-01': 22
        }
    }),
    getters: {
        hasCases: (state) => {
            return (sectionId: string) => state.cases.hasOwnProperty(sectionId)
        },
        getCases () {
            return (sectionId: string) => this.hasCases(sectionId) ? this.cases[sectionId] : 0
        },
        hasAutomations: (state) => {
            return (sectionId: string) => state.automations.hasOwnProperty(sectionId)
        },
        getAutomations () {
            return (sectionId: string) => this.hasAutomations(sectionId) ? this.automations[sectionId] : 0
        }
    }
})