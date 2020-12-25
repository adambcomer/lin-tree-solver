import { RuleSet } from '../../tree-solver'
import { RuleSetActionTypes } from '../actions/rulesets'
import { ADD_RULE_SET, UPDATE_RULE_SET, REMOVE_RULE_SET, SET_DEFAULT_RULE_SET } from '../actions/types'

export interface RuleSetsReducerState {
  index: number
  ruleSets: RuleSet[]
}

const ruleSet = new RuleSet('Chapter 2, Syntax: A Generative Introduction, by Andrew Carnie');
['N', 'D', 'V', 'Adj', 'Adv', 'P', 'Conj', 'C', 'T'].forEach(t => {
  ruleSet.addPos(t)
});
[
  ['AdvP', '(AdvP) Adv'],
  ['AdjP', '(AdjP) Adj'],
  ['PP', 'P (NP)'],
  ['NP', '(D) (AdjP+) N (PP+)'],
  ['VP', '(AdvP+) V (NP) (AdvP+) (PP+) (AdvP+)'],
  ['TP', '(NP) (T) (VP)']
].forEach(([name, rule]) => {
  ruleSet.addRule(name, rule)
})

const initialState: RuleSetsReducerState = {
  index: 0,
  ruleSets: [ruleSet]
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function reducer (state = initialState, action: RuleSetActionTypes): RuleSetsReducerState {
  switch (action.type) {
    case UPDATE_RULE_SET: {
      const { index, pos, rules } = action.payload
      if (index >= state.ruleSets.length) {
        return state
      }

      const ruleSet = new RuleSet(state.ruleSets[index].name)
      pos.forEach(t => {
        ruleSet.addPos(t)
      })
      rules.forEach(([name, rule]) => {
        ruleSet.addRule(name, rule)
      })

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
