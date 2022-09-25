import { APPLICABLE_TO, CONFIG_TYPE, CONFIGURED_BUGS } from 'src/consts'

export interface MinimalItemInterface {
    id: string,
    text: string,
}

export interface TargetManifestAttributesInterface {
    ui: Array<MinimalItemInterface>,
    reqParams: Array<MinimalItemInterface>,
    respParams: Array<MinimalItemInterface>,
}

export interface TargetManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    attributes: TargetManifestAttributesInterface
    bugs: Array<string>
}

export interface BugManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    for: APPLICABLE_TO,
    configType: CONFIG_TYPE,
    conditions: Array<string>,
    description?: string
}

export interface ConfigurableManifestInterface {
    key: string | null,
    value: string | null,
}

export interface ConditionManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    configType: CONFIG_TYPE,
    description?: string
}

export interface BugManifestInterface {
    target: string,
    applicable: string,
    bug: string,
    bugConfig: ConfigurableManifestInterface
    condition: string
    conditionConfig: ConfigurableManifestInterface,
}

export interface ManifestResponseInterface {
    targets: Array<TargetManifestItemInterface>,
    bugs: Array<BugManifestItemInterface>,
    conditions: Array<ConditionManifestItemInterface>,
    applicable: Array<MinimalItemInterface>
}


// configured bugs
export interface ConfiguredBugGenericConfig {
    key: null | string,
    value: null | boolean | string
}

export interface ConfiguredBugConfig {
    isAlways: boolean
    bugConfig: ConfiguredBugGenericConfig,
    conditionConfig: ConfiguredBugGenericConfig
}

export interface DynamicConfiguredBug {
    [key: string]: ConfiguredBugConfig
}

export interface ConfiguredBugsResponseInterface {
    areHashed: boolean,
    bugs: string
}

export interface ConfiguredBugsStoreItemInterface {
    [CONFIGURED_BUGS.DETACH_SAVE_BTN]?: DynamicConfiguredBug,
    [CONFIGURED_BUGS.HIDE_UI_ELEMENT]?: DynamicConfiguredBug,
    [CONFIGURED_BUGS.UPDATE_UI_LABEL]?: DynamicConfiguredBug
}

export interface ConfiguredBugsStoreInterface {
    areHashed: boolean,
    bugs: ConfiguredBugsStoreItemInterface | null
}

export interface DyanmicKeysObject {
    [key: string]: any
}