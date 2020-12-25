import { combineReducers } from 'redux'
import rules, { RuleSetsReducerState } from './rulesets'
import sentence, { SentenceReducerState } from './sentence'

export interface RootState{
  sentence: SentenceReducerState
  rules: RuleSetsReducerState
}

export default combineReducers({ sentence, rules })
