import { RuleSet } from '../../helpers/ruleset'
import { UPDATE_RULE_SET, ADD_RULE_SET, REMOVE_RULE_SET, SET_DEFAULT_RULE_SET } from './types'

interface UpdateRuleSetAction {
  type: typeof UPDATE_RULE_SET
  payload: {
    index: number
    ruleSet: RuleSet
  }
}

interface AddRuleSetAction {
  type: typeof ADD_RULE_SET
  payload: {
    name: string
  }
}

interface RemoveRuleSetAction {
  type: typeof REMOVE_RULE_SET
  payload: {
    index: number
  }
}

interface SetDefaultRuleSetAction {
  type: typeof SET_DEFAULT_RULE_SET
  payload: {
    index: number
  }
}

export type RuleSetActionTypes = UpdateRuleSetAction | AddRuleSetAction | RemoveRuleSetAction | SetDefaultRuleSetAction

export function updateRuleSet (index: number, ruleSet: RuleSet): RuleSetActionTypes {
  return {
    type: UPDATE_RULE_SET,
    payload: {
      index,
      ruleSet
    }
  }
}

export function addRuleSet (name: string): RuleSetActionTypes {
  return {
    type: ADD_RULE_SET,
    payload: {
      name
    }
  }
}

export function removeRuleSet (index: number): RuleSetActionTypes {
  return {
    type: REMOVE_RULE_SET,
    payload: {
      index
    }
  }
}

export function setDefaultRuleSet (index: number): RuleSetActionTypes {
  return {
    type: SET_DEFAULT_RULE_SET,
    payload: {
      index
    }
  }
}
