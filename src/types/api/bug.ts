import { APPLICABLE_TO, CONFIGURABLE } from 'src/consts'


export interface MinimalItemInterface {
    id: string,
    text: string,
}

export interface TargetManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    elements: Array<MinimalItemInterface>,
    params: Array<MinimalItemInterface>,
    bugs: Array<string>
}

export interface BugManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    for: APPLICABLE_TO,
    configurable: CONFIGURABLE,
    conditions: Array<string>,
    description?: string
}

export interface ConfigurableManifestInterface {
    key: string,
    value: string,
}

export interface ConditionManifestItemInterface extends MinimalItemInterface {
    id: string,
    text: string,
    configurable: CONFIGURABLE,
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