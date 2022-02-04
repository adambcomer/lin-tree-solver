import React from 'react'
import { RuleSet } from '../helpers/ruleset'

export const RuleSetsContext = React.createContext<{ ruleSets: RuleSet[], idx: number, setRuleSets: (ruleSets: RuleSet[]) => void, setRuleSetIdx: (idx: number) => void }>({ ruleSets: [], idx: 0, setRuleSets: (ruleSets: RuleSet[]) => { }, setRuleSetIdx: (idx: number) => { } })
