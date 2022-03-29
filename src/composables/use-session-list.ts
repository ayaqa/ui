import { ref, Ref } from 'vue';
import { i18n } from 'src/locales';

export enum ItemState {
    LOADING = 'loading',
    DONE = 'done',
    ERROR = 'error',
}

export type Item = {
    title: string,
    icon: string,
    state: Ref<ItemState>
}

export type usableSessionList = {
    list: Array<Item>,
    markSesssionCheck: (state: ItemState) => void,
    markMigrateDB: (state: ItemState) => void,
    markSeedDB: (state: ItemState) => void,
}

export default function useSessionList (isNew: boolean): usableSessionList {
    const sessionCheck = ref<ItemState>(ItemState.LOADING);
    const migrateDB = ref<ItemState>(ItemState.LOADING);
    const seedDB = ref<ItemState>(ItemState.LOADING);

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

    function markSesssionCheck (state: ItemState) {
        sessionCheck.value = state;
    }

    function markMigrateDB (state: ItemState) {
        migrateDB.value = state;
    }

    function markSeedDB (state: ItemState) {
        seedDB.value = state;
    }

}