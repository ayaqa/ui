import { URLS, RouteNames, UI_SECTIONS } from 'src/consts'
import config from 'src/config'
import { AYAQA_ATTRS } from 'src/composables/use-data-attribute'

export interface SupportDropDownItem {
    icon: string,
    url: string,
    text: string,
    ayaqa: string,
    addSeparatorAfter?: boolean
}

export enum SideNavItemType {
    ITEM = 'item',
    HEADER = 'header',
}

export interface SideNavItem {
    type: SideNavItemType,
    title: string,
    icon: string,
    ayaqa: string,
    route?: string,
    children?: SideNavItem[]
    addSeparatorAfter?: boolean
    opened?: boolean
}

export const SUPPORT_DROPDOWN_LIST: Array<SupportDropDownItem> = [
    { icon: 'info', url: `${URLS.AYAQA_VERSION_INFO}/${config.APP_VERSION}`, text: 'support_dropdown.version', ayaqa: AYAQA_ATTRS.topNavSupport.version },
    { icon: 'pest_control', url: `${URLS.AYAQA_GITHUB_REPORT_BUT}`, text: 'support_dropdown.report_bug', addSeparatorAfter: true, ayaqa: AYAQA_ATTRS.topNavSupport.reportBug },
    { icon: 'public', url: URLS.AYAQA_SITE, text: 'support_dropdown.ayaqa_web', ayaqa: AYAQA_ATTRS.topNavSupport.ayaqaWeb },
    { icon: 'hub', url: URLS.AYAQA_GITHUB, text: 'support_dropdown.ayaqa_github', addSeparatorAfter: true, ayaqa: AYAQA_ATTRS.topNavSupport.ayaqaGithub },
]

export const NAV_BAR_LIST: Array<SideNavItem> = [
    { type: SideNavItemType.ITEM, title: 'sidemenu.home', icon: 'home', ayaqa: AYAQA_ATTRS.sideNav.home, addSeparatorAfter: true, route: RouteNames.HOME },
    {
        type: SideNavItemType.HEADER, title: 'sidemenu.components_header', icon: 'toggle_on', ayaqa: AYAQA_ATTRS.sideNav.components,
        children: [
            {
                type: SideNavItemType.HEADER, title: 'sidemenu.checkboxes', icon: 'check_box', ayaqa: AYAQA_ATTRS.sideNav.checkboxes,
                children: [
                    { type: SideNavItemType.ITEM, title: 'sidemenu.checkbox.toc', icon: 'handshake', ayaqa: AYAQA_ATTRS.sideNav.item + UI_SECTIONS.CHECKBOX_1, route: RouteNames.CHECKBOX.TOC },
                    { type: SideNavItemType.ITEM, title: 'sidemenu.checkbox.technologies', icon: '5g', ayaqa: AYAQA_ATTRS.sideNav.item + UI_SECTIONS.CHECKBOX_2, route: RouteNames.CHECKBOX.TECHNOLOGIES },
                    { type: SideNavItemType.ITEM, title: 'sidemenu.checkbox.reminders', icon: 'notifications_active', ayaqa: AYAQA_ATTRS.sideNav.item + UI_SECTIONS.CHECKBOX_3, route: RouteNames.CHECKBOX.REMINDERS }
                ]
            },
        ]
    },
]