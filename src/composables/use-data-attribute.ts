const AYAQA_ATTRS = {
    topNav: {
        bar: 'top-navbar',
        sideMenuButton: 'top-navbar-side-menu',
        configureButton: 'top-navbar-item-configure',
        bugButton: 'top-navbar-item-bug',
        supportButton: 'top-navbar-item-support',
        logoutButton: 'top-navbar-item-logout'
    },
    topNavSupport: {
        version: 'top-navbar-support-version',
        reportBug: 'top-navbar-support-report-bug',
        ayaqaWeb: 'top-navbar-support-ayaqa-web',
        ayaqaGithub: 'top-navbar-support-ayaqa-web',
    },
    sideNav: {
        container: 'nav-side-container',
        home: 'nav-home',
        components: 'nav-dd-components',
        checkboxes: 'nav-checkboxes',
        item: 'nav-',
    },
    testCard: {
        card: 'test-card',
        save: 'test-card-save'
    }
}

export default function useDataAttribute () {
    function attr (attr: string) {
        return attr
    }

    return { attr }
}

export { AYAQA_ATTRS }