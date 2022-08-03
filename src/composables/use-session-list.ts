import { ref, Ref } from 'vue';
import { i18n } from 'src/locales';

export enum SessionCheckState {
    LOADING = 'loading',
    DONE = 'done',
    ERROR = 'error',
}

export type SessionCheckItem = {
    title: string,
    icon: string,
    state: Ref<SessionCheckState>
}

export type usableSessionList = {
    list: Array<SessionCheckItem>,
    markSesssionCheck: (state: SessionCheckState) => void,
    markMigrateDB: (state: SessionCheckState) => void,
    markSeedDB: (state: SessionCheckState) => void,
}

export default function useSessionList (isNew: boolean): usableSessionList {
    const sessionCheck = ref<SessionCheckState>(SessionCheckState.LOADING);
    const migrateDB = ref<SessionCheckState>(SessionCheckState.LOADING);
    const seedDB = ref<SessionCheckState>(SessionCheckState.LOADING);

    const list = isNew ?
        [
            { title: i18n.global.t('init.create_session'), icon: 'fact_check', state: sessionCheck },
            { title: i18n.global.t('init.migrate_db'), icon: 'storage', state: migrateDB },
            { title: i18n.global.t('init.seed_db'), icon: 'storage', state: seedDB }
        ] :
        [
            { title: i18n.global.t('init.session_check'), icon: 'fact_check', state: sessionCheck },
            { title: i18n.global.t('init.db_check'), icon: 'storage', state: migrateDB },
            { title: i18n.global.t('init.db_data_check'), icon: 'storage', state: seedDB },
        ];

    return { list, markSesssionCheck, markMigrateDB, markSeedDB }

    function markSesssionCheck (state: SessionCheckState) {
        sessionCheck.value = state;
    }

    function markMigrateDB (state: SessionCheckState) {
        migrateDB.value = state;
    }

    function markSeedDB (state: SessionCheckState) {
        seedDB.value = state;
    }

}