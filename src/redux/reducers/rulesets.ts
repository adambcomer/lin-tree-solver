import { RuleSet } from '../../helpers/ruleset'
import { RuleSetActionTypes } from '../actions/rulesets'
import { ADD_RULE_SET, UPDATE_RULE_SET, REMOVE_RULE_SET, SET_DEFAULT_RULE_SET } from '../actions/types'

export interface RuleSetsReducerState {
  index: number
  ruleSets: RuleSet[]
}

const ruleSet0 = new RuleSet('Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative Introduction, by Andrew Carnie');
['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach(t => ruleSet0.addPos(t));
['CP'].forEach(t => ruleSet0.addRoot(t));
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
].forEach(([name, rule]) => ruleSet0.addRule(name, rule))

const ruleSet1 = new RuleSet('Chapter 6: X-bar Theory, Syntax: A Generative Introduction, by Andrew Carnie');
['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach(t => ruleSet1.addPos(t));
['CP'].forEach(t => ruleSet1.addRoot(t));
[
  ['CP', '(C) TP'],
  ['TP', '{NP/CP} (T) VP'],
  ['VP', 'V_bar'],
  ['V_bar', 'V_bar PP'],
  ['V_bar', 'V_bar AdvP'],
  ['V_bar', 'AdvP V_bar'],
  ['V_bar', 'V (NP)'],
  ['NP', '(D) N_bar'],
  ['N_bar', 'AdjP N_bar'],
  ['N_bar', 'N_bar PP'],
  ['N_bar', 'N (PP)'],
  ['PP', 'P_bar'],
  ['P_bar', 'P_bar PP'],
  ['P_bar', 'AdvP P_bar'],
  ['P_bar', 'P (NP)'],
  ['AdvP', 'Adv_bar'],
  ['Adv_bar', 'AdvP Adv_bar'],
  ['Adv_bar', 'Adv (PP)'],
  ['AdjP', 'Adj_bar'],
  ['Adj_bar', 'AdjP Adj_bar'],
  ['Adj_bar', 'Adj (PP)'],
  ['XP', 'XP Conj XP'],
  ['X', 'X Conj X']
].forEach(([name, rule]) => ruleSet1.addRule(name, rule))

const initialState: RuleSetsReducerState = {
  index: 0,
  ruleSets: [ruleSet0, ruleSet1]
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
