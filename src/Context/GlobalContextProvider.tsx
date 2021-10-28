import React, { FC, useState } from 'react'
import { RuleSet } from '../helpers/ruleset'
import { RuleSetsContext } from './RuleSetsContext'
import { SentenceContext, Word } from './SentenceContext'

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

const GlobalContextProvider: FC = ({ children }) => {
  const [words, setWords] = useState<Word[]>(
    [
      { word: 'The', pos: ['D'] },
      { word: 'small', pos: ['Adj'] },
      { word: 'dog', pos: ['N'] },
      { word: 'quickly', pos: ['Adv'] },
      { word: 'ran', pos: ['V'] },
      { word: 'home', pos: ['N'] },
      { word: 'to', pos: ['P'] },
      { word: 'his', pos: ['D'] },
      { word: 'owner', pos: ['N'] }
    ]
  )
  const [ruleSets, setRuleSets] = useState<RuleSet[]>([ruleSet0, ruleSet1])
  const [ruleSetIdx, setRuleSetIdx] = useState(0)

  return (
    <SentenceContext.Provider value={{ words: words, setWords: setWords }}>
      <RuleSetsContext.Provider value={{ ruleSets: ruleSets, idx: ruleSetIdx, setRuleSets: setRuleSets, setRuleSetIdx: setRuleSetIdx }}>
        {children}
      </RuleSetsContext.Provider>
    </SentenceContext.Provider>
  )
}

export default GlobalContextProvider
