/*
 * Copyright 2024 Adam Bishop Comer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { RuleSet, isRuleSetProperties } from 'src/helpers/ruleset'

const DEFAULT_RULESET_0 = new RuleSet(
  'Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  DEFAULT_RULESET_0.addPos(t)
)
;['CP'].forEach((t) => DEFAULT_RULESET_0.addRoot(t))
;[
  ['CP', '(C) TP'],
  ['TP', '{NP/CP} (T) VP'],
  ['VP', '(AdvP+) {V/V_Conj} (NP) ({NP/CP}) (AdvP+) (PP+) (AdvP+)'],
  ['NP', '(D) (AdjP+) {N/N_Conj} (PP+) (CP)'],
  ['PP', '{P/P_Conj} NP'],
  ['AdvP', '(AdvP) {Adv/Adv_Conj}'],
  ['AdjP', '(AdjP) {Adj/Adj_Conj}'],

  ['CP', 'CP Conj CP'],
  ['TP', 'TP Conj TP'],
  ['VP', 'VP Conj VP'],
  ['NP', 'NP Conj NP'],
  ['PP', 'PP Conj PP'],
  ['AdvP', 'AdvP Conj AdvP'],
  ['AdjP', 'AdjP Conj AdjP'],
  ['N_Conj', 'N Conj N'],
  ['V_Conj', 'V Conj V'],
  ['Adj_Conj', 'Adj Conj Adj'],
  ['Adv_Conj', 'Adv Conj Adv'],
  ['P_Conj', 'P Conj P']
].forEach(([name, rule]) => DEFAULT_RULESET_0.addRule(name, rule))

const DEFAULT_RULESET_1 = new RuleSet(
  'Chapter 6: X-bar Theory, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  DEFAULT_RULESET_1.addPos(t)
)
;['CP'].forEach((t) => DEFAULT_RULESET_1.addRoot(t))
;[
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
  ['N_bar', 'N'],
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
].forEach(([name, rule]) => DEFAULT_RULESET_1.addRule(name, rule))

const DEFAULT_RULESET_2 = new RuleSet(
  'Chapter 7: Extending X-bar Theory, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  DEFAULT_RULESET_2.addPos(t)
)
;['CP'].forEach((t) => DEFAULT_RULESET_2.addRoot(t))
;[
  ['CP', 'C_bar'],
  ['C_bar', '(C) TP'],
  ['TP', '{DP/CP} T_bar'],
  ['T_bar', 'T VP'],
  ['VP', 'V_bar'],
  ['V_bar', 'V_bar PP'],
  ['V_bar', 'V_bar AdvP'],
  ['V_bar', 'AdvP V_bar'],
  ['V_bar', 'V (DP)'],
  ['DP', '(DP) D_bar'],
  ['D_bar', 'D (NP)'],
  ['NP', 'N_bar'],
  ['N_bar', 'AdjP N_bar'],
  ['N_bar', 'N_bar PP'],
  ['N_bar', 'N (PP)'],
  ['PP', 'P_bar'],
  ['P_bar', 'P_bar PP'],
  ['P_bar', 'AdvP P_bar'],
  ['P_bar', 'P (DP)'],
  ['AdvP', 'Adv_bar'],
  ['Adv_bar', 'AdvP Adv_bar'],
  ['Adv_bar', 'Adv (PP)'],
  ['AdjP', 'Adj_bar'],
  ['Adj_bar', 'AdjP Adj_bar'],
  ['Adj_bar', 'Adj (PP)'],
  ['XP', 'XP Conj XP'],
  ['X', 'X Conj X']
].forEach(([name, rule]) => DEFAULT_RULESET_2.addRule(name, rule))

const DEFAULT_RULESETS = [
  DEFAULT_RULESET_0,
  DEFAULT_RULESET_1,
  DEFAULT_RULESET_2
]

const parseRuleSetsParam = (ruleSets: string): RuleSet[] | null => {
  try {
    const parsedRuleSets: unknown = JSON.parse(
      Buffer.from(ruleSets, 'base64').toString('utf-8')
    )

    return Array.isArray(parsedRuleSets)
      ? parsedRuleSets
          .filter(isRuleSetProperties)
          .map((r) => RuleSet.FromProps(r))
      : null
  } catch (e) {
    console.error(e)
  }

  return null
}

interface UseRulesResponse {
  ruleSets: RuleSet[]
  setRuleSets: (ruleSets: RuleSet[]) => void
  currentRuleSetIndex: number
  setCurrentRuleSetIndex: (index: number) => void
}

export const useRules = (): UseRulesResponse => {
  if (typeof location === 'undefined') {
    return {
      ruleSets: DEFAULT_RULESETS,
      setRuleSets: () => {},
      currentRuleSetIndex: 0,
      setCurrentRuleSetIndex: () => {}
    }
  }

  const params = new URLSearchParams(
    location.hash.length ? location.hash.slice(1) : ''
  )

  const ruleSets =
    parseRuleSetsParam(params.get('ruleSets') ?? '') ?? DEFAULT_RULESETS

  const currentRuleSetIndex =
    parseInt(params.get('currentRuleSetIndex') ?? '0') || 0

  return {
    ruleSets,
    setRuleSets: () => {},
    currentRuleSetIndex,
    setCurrentRuleSetIndex: () => {}
  }
}
