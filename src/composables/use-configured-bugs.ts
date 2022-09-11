
import { useBugStore } from 'src/stores/bugs'
import { CONFIGURED_BUGS } from 'src/consts'

export default function useConfiguredBugs () {
    const bugStore = useBugStore()

    function isHidden (sectionId: string, elementKey: string) {
        return handleCheck(CONFIGURED_BUGS.HIDE_UI_ELEMENT, sectionId, elementKey)
    }

    function isSaveButtonDetached (sectionId: string) {
        return handleCheck(CONFIGURED_BUGS.DETACH_SAVE_BTN, sectionId)
    }

    function getLabel (sectionId: string, elementKey: string): string | null {
        if (bugStore.hasBugs(CONFIGURED_BUGS.UPDATE_UI_LABEL)) {
            const bugConfig = bugStore.getBugConfig(CONFIGURED_BUGS.UPDATE_UI_LABEL, getKey(sectionId, elementKey))

            if (bugConfig?.value) {
                return bugConfig?.value as string
            }
        }

        return null
    }

    // internal
    ///////////
    function getKey (...keys: Array<string | null>) {
        if (bugStore.areKeysHashed) {
            // @TODO
        }

        return keys.join('|')
    }

    function handleCheck (bugType: CONFIGURED_BUGS, ...keys: Array<string | null>) {
        let isAlways = false
        if (bugStore.hasBugs(bugType)) {
            isAlways = bugStore.isAlways(bugType, getKey(...keys))
        }

        return isAlways
    }

    return {
        isHidden,
        isSaveButtonDetached,
        getLabel
    }
}
