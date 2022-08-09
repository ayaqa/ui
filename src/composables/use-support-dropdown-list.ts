import { computed, ComputedRef, reactive, UnwrapNestedRefs } from "vue"
import { URLS, AYAQA_ATTRS } from 'src/consts'
import config from 'src/config'

export interface menuListItem {
    icon: string,
    url: string,
    text: string,
    ayaqa: string,
    addSeparatorAfter?: boolean
}

export interface usableSupportDropdownList {
    menuListItems: ComputedRef<menuListItem[]>,
    refreshMenuList: () => void
}

export default function useSupportDropdownList (): usableSupportDropdownList {
    const dynamicList: UnwrapNestedRefs<Array<menuListItem>> = reactive([]);

    const menuListItems: ComputedRef<Array<menuListItem>> = computed(() => {
        return [
            { icon: 'info', url: `${URLS.AYAQA_VERSION_INFO}/${config.APP_VERSION}`, text: 'support_dropdown.version', ayaqa: AYAQA_ATTRS.topNavSupport.version },
            { icon: 'pest_control', url: `${URLS.AYAQA_GITHUB_REPORT_BUT}`, text: 'support_dropdown.report_bug', addSeparatorAfter: true, ayaqa: AYAQA_ATTRS.topNavSupport.reportBug },
            { icon: 'public', url: URLS.AYAQA_SITE, text: 'support_dropdown.ayaqa_web', ayaqa: AYAQA_ATTRS.topNavSupport.ayaqaWeb },
            { icon: 'hub', url: URLS.AYAQA_GITHUB, text: 'support_dropdown.ayaqa_github', addSeparatorAfter: true, ayaqa: AYAQA_ATTRS.topNavSupport.ayaqaGithub },
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