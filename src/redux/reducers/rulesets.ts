import { RuleSet } from '../../helpers/ruleset'
import { RuleSetActionTypes } from '../actions/rulesets'
import { ADD_RULE_SET, UPDATE_RULE_SET, REMOVE_RULE_SET, SET_DEFAULT_RULE_SET } from '../actions/types'

export interface RuleSetsReducerState {
  index: number
  ruleSets: RuleSet[]
}

const ruleSet = new RuleSet('Chapter 3, Syntax: A Generative Introduction, by Andrew Carnie');
['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach(t => ruleSet.addPos(t));
['CP'].forEach(t => ruleSet.addRoot(t));
[
  ['CP', '(C) TP'],
  ['TP', '{NP/CP} (T) VP'],
  ['VP', '(AdvP+) V (NP) ({NP/CP}) (AdvP+) (PP+) (AdvP+)'],
  ['NP', '(D) (AdjP+) N (PP+) (CP)'],
  ['PP', 'P NP'],
  ['AdvP', '(AdvP) Adv'],
  ['AdjP', '(AdjP) Adj'],
  ['XP', 'XP Conj XP'],
  ['X', 'X Conj X']
].forEach(([name, rule]) => ruleSet.addRule(name, rule))

const initialState: RuleSetsReducerState = {
  index: 0,
  ruleSets: [ruleSet]
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function reducer(state = initialState, action: RuleSetActionTypes): RuleSetsReducerState {
  switch (action.type) {
    case UPDATE_RULE_SET: {
      const { index, ruleSet } = action.payload
      if (index >= state.ruleSets.length) {
        return state
      }

      state.ruleSets[index] = ruleSet

      return {
        ...state,
        ruleSets: [...state.ruleSets]
      }
    }
    case ADD_RULE_SET: {
      const { name } = action.payload

      const ruleSet = new RuleSet(name)

      return {
        ...state,
        ruleSets: [...state.ruleSets, ruleSet]
      }
    }
    case REMOVE_RULE_SET: {
      const { index } = action.payload

      state.ruleSets.splice(index, 1)

      return {
        ...state,
        ruleSets: [...state.ruleSets]
      }
    }
    case SET_DEFAULT_RULE_SET: {
      const { index } = action.payload

      return {
        ...state,
        index
      }
    }
    default:
      return state
  }
}
