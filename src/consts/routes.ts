const RouteNames = {
    HOME: 'home',
    SESSION: {
        ROOT: 'session',
        NEW: 'session-new',
        ID: 'session-id',
        CONFIG: 'session-configure',
        BUGS: 'session-bugs',
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
        CONFIG: `/session/:${RouteParams.SESSION.ID}/config`
    }
}

export {
    RouteNames,
    RoutePath,
    RouteParams,
}