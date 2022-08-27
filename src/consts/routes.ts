const RouteNames = {
    HOME: 'home',
    SESSION: {
        ROOT: 'session',
        NEW: 'session-new',
        ID: 'session-id',
    },
    BUGS: 'bugs',
    CONFIGURE: 'configure',
    CHECKBOX: {
        TOC: 'checkbox-toc',
        TECHNOLOGIES: 'checkbox-technologies',
        REMINDERS: 'checkbox-reminders',
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

    },
    CONFIG: `/config`,
    BUGS: `/bugs`,
    CHECKBOX: {
        TOC: '/checkbox/toc',
        TECHNOLOGIES: '/checkbox/technologies',
        REMINDERS: '/checkbox/reminders'
    }
}

export {
    RouteNames,
    RoutePath,
    RouteParams,
}