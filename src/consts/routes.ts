const RouteNames = {
    HOME: 'home',
    SESSION: 'session',
    GOTO: {
        NEW: 'goto-new',
        ID: 'goto-id',
    }
}

const RouteParams = {
    GOTO: {
        ID: 'id'
    }
}

const RoutePath = {
    HOME: '/',
    GOTO: {
        NEW: `/session/new`,
        ID: `/session/:${RouteParams.GOTO.ID}`
    }
}

export {
    RouteNames,
    RoutePath,
    RouteParams,
};