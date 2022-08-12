const RouteNames = {
    HOME: 'home',
    SESSION: {
        ROOT: 'session',
        NEW: 'session-new',
        ID: 'session-id',
        CONFIGURE: 'session-configure',
        BUGS: 'session-bugs',
    },
    CHECKBOX: {
        TOC: 'checkbox-toc'
    }
}

const RouteParams = {
    REDIRECT_TO: 'redirectTo',
    SESSION: {
        ID: 'id'
    }
}

const RoutePath = {
    HOME: '/',
    SESSION: {
        ROOT: '/session',
        NEW: `/session/new`,
        ID: `/session/:${RouteParams.SESSION.ID}`,
        CONFIG: `/session/config`,
        BUGS: `/session/bugs`,
    },
    CHECKBOX: {
        TOC: '/checkbox/toc'
    }
}

export {
    RouteNames,
    RoutePath,
    RouteParams,
}