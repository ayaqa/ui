import { BugManifestInterface, ManifestResponseInterface } from '../api'

// session store
export interface DynamicKeyNumberInterface {
    [key: string]: number
}

export interface SessionStoreInterface {
    meta: {
        loaded: boolean,
        cases: DynamicKeyNumberInterface,
        automations: DynamicKeyNumberInterface
    },
    bugManifest?: ManifestResponseInterface
    bugs: Array<BugManifestInterface>
}