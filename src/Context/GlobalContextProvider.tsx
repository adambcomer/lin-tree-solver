/*
 * Copyright 2022 Adam Bishop Comer
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

import React, { useState } from 'react'
import { RuleSet } from '../helpers/ruleset'
import { RuleSetsContext } from './RuleSetsContext'
import { SentenceContext, Word } from './SentenceContext'

const ruleSet0 = new RuleSet(
  'Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  ruleSet0.addPos(t)
)
;['CP'].forEach((t) => ruleSet0.addRoot(t))
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
].forEach(([name, rule]) => ruleSet0.addRule(name, rule))

const ruleSet1 = new RuleSet(
  'Chapter 6: X-bar Theory, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  ruleSet1.addPos(t)
)
;['CP'].forEach((t) => ruleSet1.addRoot(t))
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
].forEach(([name, rule]) => ruleSet1.addRule(name, rule))

const ruleSet2 = new RuleSet(
  'Chapter 7: Extending X-bar Theory, Syntax: A Generative Introduction, by Andrew Carnie'
)
;['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'].forEach((t) =>
  ruleSet2.addPos(t)
)
;['CP'].forEach((t) => ruleSet2.addRoot(t))
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
].forEach(([name, rule]) => ruleSet2.addRule(name, rule))

interface GlobalContextProviderProps {
  children: React.ReactNode
}

const GlobalContextProvider = ({
  children
}: GlobalContextProviderProps): JSX.Element => {
  const [words, setWords] = useState<Word[]>([
    { word: 'The', pos: ['D'] },
    { word: 'small', pos: ['Adj'] },
    { word: 'dog', pos: ['N'] },
    // { word: '[PAST]', pos: ['T'] }, // Necessary for DP-hypothesis
    { word: 'quickly', pos: ['Adv'] },
    { word: 'ran', pos: ['V'] },
    // { word: 'ø', pos: ['D'] }, // Necessary for DP-hypothesis
    { word: 'home', pos: ['N'] },
    { word: 'to', pos: ['P'] },
    { word: 'his', pos: ['D'] },
    { word: 'owner', pos: ['N'] }
  ])
  const [ruleSets, setRuleSets] = useState<RuleSet[]>([
    ruleSet0,
    ruleSet1,
    ruleSet2
  ])
  const [ruleSetIdx, setRuleSetIdx] = useState(0)

  return (
    <SentenceContext.Provider value={{ words: words, setWords: setWords }}>
      <RuleSetsContext.Provider
        value={{
          ruleSets: ruleSets,
          idx: ruleSetIdx,
          setRuleSets: setRuleSets,
          setRuleSetIdx: setRuleSetIdx
        }}
      >
        {children}
      </RuleSetsContext.Provider>
    </SentenceContext.Provider>
  )
}

export default GlobalContextProvider
