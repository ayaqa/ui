const RouteNames = {
    HOME: 'home',
    SESSION: {
        ROOT: 'session',
        NEW: 'session-new',
        ID: 'session-id',
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
        ID: `/session/:${RouteParams.SESSION.ID}`
    }
}

export {
    RouteNames,
    RoutePath,
    RouteParams,
};