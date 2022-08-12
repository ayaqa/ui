import { computed, ComputedRef, reactive, UnwrapNestedRefs } from "vue"
import { SUPPORT_DROPDOWN_LIST, SupportDropDownItem } from 'src/consts/menu'

export interface usableSupportDropdownList {
    menuListItems: ComputedRef<SupportDropDownItem[]>,
    refreshMenuList: () => void
}

export default function useSupportDropdownList (): usableSupportDropdownList {
    const dynamicList: UnwrapNestedRefs<Array<SupportDropDownItem>> = reactive([]);

    const menuListItems: ComputedRef<Array<SupportDropDownItem>> = computed(() => {
        return [
            ...SUPPORT_DROPDOWN_LIST,
            ...dynamicList
        ]
    })

    const refreshMenuList = () => {
        // @TODO implement fetching from remote
    }

    return {
        menuListItems,
        refreshMenuList
    }
}