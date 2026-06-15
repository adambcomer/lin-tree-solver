/*
 * Copyright 2025 Adam Bishop Comer
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

import { RuleSet } from '../proto/bundle.js'

export const DEFAULT_RULESET: RuleSet.$Properties = {
  roots: ['CP'],
  pos: ['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'],
  rules: [
    {
      name: 'CP',
      tags: [
        { values: ['C'], optional: true, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'TP',
      tags: [
        { values: ['NP', 'CP'], optional: false, repeated: false },
        { values: ['T'], optional: true, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'VP',
      tags: [
        { values: ['AdvP'], optional: true, repeated: true },
        { values: ['V', 'V_Conj'], optional: false, repeated: false },
        { values: ['NP'], optional: true, repeated: false },
        { values: ['NP', 'CP'], optional: true, repeated: false },
        { values: ['AdvP'], optional: true, repeated: true },
        { values: ['PP'], optional: true, repeated: true },
        { values: ['AdvP'], optional: true, repeated: true }
      ]
    },
    {
      name: 'NP',
      tags: [
        { values: ['D'], optional: true, repeated: false },
        { values: ['AdjP'], optional: true, repeated: true },
        { values: ['N', 'N_Conj'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: true },
        { values: ['CP'], optional: true, repeated: false }
      ]
    },
    {
      name: 'PP',
      tags: [
        { values: ['P', 'P_Conj'], optional: false, repeated: false },
        { values: ['NP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdvP',
      tags: [
        { values: ['AdvP'], optional: true, repeated: false },
        { values: ['Adv', 'Adv_Conj'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdjP',
      tags: [
        { values: ['AdjP'], optional: true, repeated: false },
        { values: ['Adj', 'Adj_Conj'], optional: false, repeated: false }
      ]
    },
    {
      name: 'CP',
      tags: [
        { values: ['CP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['CP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'TP',
      tags: [
        { values: ['TP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'VP',
      tags: [
        { values: ['VP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'NP',
      tags: [
        { values: ['NP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['NP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'PP',
      tags: [
        { values: ['PP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdvP',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdvP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdjP',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdjP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'N_Conj',
      tags: [
        { values: ['N'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['N'], optional: false, repeated: false }
      ]
    },
    {
      name: 'V_Conj',
      tags: [
        { values: ['V'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['V'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adj_Conj',
      tags: [
        { values: ['Adj'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adj'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adv_Conj',
      tags: [
        { values: ['Adv'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adv'], optional: false, repeated: false }
      ]
    },
    {
      name: 'P_Conj',
      tags: [
        { values: ['P'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['P'], optional: false, repeated: false }
      ]
    }
  ]
}

export const XBAR_RULESET: RuleSet.$Properties = {
  roots: ['CP'],
  pos: ['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'],
  rules: [
    // ['CP', '(C) TP'],
    {
      name: 'CP',
      tags: [
        { values: ['C'], optional: true, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    // ['TP', '{NP/CP} (T) VP'],
    {
      name: 'TP',
      tags: [
        { values: ['NP', 'CP'], optional: false, repeated: false },
        { values: ['T'], optional: true, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    // ['VP', 'V_bar'],
    {
      name: 'VP',
      tags: [{ values: ['V_bar'], optional: false, repeated: false }]
    },
    // ['V_bar', 'V_bar PP'],
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'V_bar AdvP'],
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['AdvP'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'AdvP V_bar'],
    {
      name: 'V_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['V_bar'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'V (NP)'],
    {
      name: 'V_bar',
      tags: [
        { values: ['V'], optional: false, repeated: false },
        { values: ['NP'], optional: true, repeated: false }
      ]
    },
    // ['NP', '(D) N_bar'],
    {
      name: 'NP',
      tags: [
        { values: ['D'], optional: true, repeated: false },
        { values: ['N_bar'], optional: false, repeated: false }
      ]
    },
    // ['N_bar', 'AdjP N_bar'],
    {
      name: 'N_bar',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['N_bar'], optional: false, repeated: false }
      ]
    },
    // ['N_bar', 'N_bar PP'],
    {
      name: 'N_bar',
      tags: [
        { values: ['N_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['N_bar', 'N'],
    {
      name: 'N_bar',
      tags: [{ values: ['N'], optional: false, repeated: false }]
    },
    // ['PP', 'P_bar'],
    {
      name: 'PP',
      tags: [{ values: ['P_bar'], optional: false, repeated: false }]
    },
    // ['P_bar', 'P_bar PP'],
    {
      name: 'P_bar',
      tags: [
        { values: ['P_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['P_bar', 'AdvP P_bar'],
    {
      name: 'P_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['P_bar'], optional: false, repeated: false }
      ]
    },
    // ['P_bar', 'P (NP)'],
    {
      name: 'P_bar',
      tags: [
        { values: ['P'], optional: false, repeated: false },
        { values: ['NP'], optional: true, repeated: false }
      ]
    },
    // ['AdvP', 'Adv_bar'],
    {
      name: 'AdvP',
      tags: [{ values: ['Adv_bar'], optional: false, repeated: false }]
    },
    // ['Adv_bar', 'AdvP Adv_bar'],
    {
      name: 'Adv_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['Adv_bar'], optional: false, repeated: false }
      ]
    },
    // ['Adv_bar', 'Adv (PP)'],
    {
      name: 'Adv_bar',
      tags: [
        { values: ['Adv'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: false }
      ]
    },
    // ['AdjP', 'Adj_bar'],
    {
      name: 'AdjP',
      tags: [{ values: ['Adj_bar'], optional: false, repeated: false }]
    },
    // ['Adj_bar', 'AdjP Adj_bar'],
    {
      name: 'Adj_bar',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['Adj_bar'], optional: false, repeated: false }
      ]
    },
    // ['Adj_bar', 'Adj (PP)'],
    {
      name: 'Adj_bar',
      tags: [
        { values: ['Adj'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: false }
      ]
    },
    // Phrasal-level conjunctions (XP Conj XP)
    {
      name: 'CP',
      tags: [
        { values: ['CP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['CP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'TP',
      tags: [
        { values: ['TP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'VP',
      tags: [
        { values: ['VP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'NP',
      tags: [
        { values: ['NP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['NP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'PP',
      tags: [
        { values: ['PP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdvP',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdvP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdjP',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdjP'], optional: false, repeated: false }
      ]
    },
    // Bar-level conjunctions (X_bar Conj X_bar)
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['V_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'N_bar',
      tags: [
        { values: ['N_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['N_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'P_bar',
      tags: [
        { values: ['P_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['P_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adv_bar',
      tags: [
        { values: ['Adv_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adv_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adj_bar',
      tags: [
        { values: ['Adj_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adj_bar'], optional: false, repeated: false }
      ]
    },
    // Head-level conjunctions (X Conj X)
    {
      name: 'V',
      tags: [
        { values: ['V'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['V'], optional: false, repeated: false }
      ]
    },
    {
      name: 'N',
      tags: [
        { values: ['N'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['N'], optional: false, repeated: false }
      ]
    },
    {
      name: 'P',
      tags: [
        { values: ['P'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['P'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adv',
      tags: [
        { values: ['Adv'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adv'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adj',
      tags: [
        { values: ['Adj'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adj'], optional: false, repeated: false }
      ]
    }
  ]
}

export const DP_HYPOTHESIS_RULESET: RuleSet.$Properties = {
  roots: ['CP'],
  pos: ['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'],
  rules: [
    // ['CP', 'C_bar']
    {
      name: 'CP',
      tags: [{ values: ['C_bar'], optional: false, repeated: false }]
    },
    // ['C_bar', '(C) TP']
    {
      name: 'C_bar',
      tags: [
        { values: ['C'], optional: true, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    // ['TP', '{DP/CP} T_bar']
    {
      name: 'TP',
      tags: [
        { values: ['DP', 'CP'], optional: false, repeated: false },
        { values: ['T_bar'], optional: false, repeated: false }
      ]
    },
    // ['T_bar', 'T VP']
    {
      name: 'T_bar',
      tags: [
        { values: ['T'], optional: false, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    // ['VP', 'V_bar']
    {
      name: 'VP',
      tags: [{ values: ['V_bar'], optional: false, repeated: false }]
    },
    // ['V_bar', 'V_bar PP']
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'V_bar AdvP']
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['AdvP'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'AdvP V_bar']
    {
      name: 'V_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['V_bar'], optional: false, repeated: false }
      ]
    },
    // ['V_bar', 'V (DP)']
    {
      name: 'V_bar',
      tags: [
        { values: ['V'], optional: false, repeated: false },
        { values: ['DP'], optional: true, repeated: false }
      ]
    },
    // ['DP', '(DP) D_bar']
    {
      name: 'DP',
      tags: [
        { values: ['DP'], optional: true, repeated: false },
        { values: ['D_bar'], optional: false, repeated: false }
      ]
    },
    // ['D_bar', 'D (NP)']
    {
      name: 'D_bar',
      tags: [
        { values: ['D'], optional: false, repeated: false },
        { values: ['NP'], optional: true, repeated: false }
      ]
    },
    // ['NP', 'N_bar']
    {
      name: 'NP',
      tags: [{ values: ['N_bar'], optional: false, repeated: false }]
    },
    // ['N_bar', 'AdjP N_bar']
    {
      name: 'N_bar',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['N_bar'], optional: false, repeated: false }
      ]
    },
    // ['N_bar', 'N_bar PP']
    {
      name: 'N_bar',
      tags: [
        { values: ['N_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['N_bar', 'N (PP)']
    {
      name: 'N_bar',
      tags: [
        { values: ['N'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: false }
      ]
    },
    // ['PP', 'P_bar']
    {
      name: 'PP',
      tags: [{ values: ['P_bar'], optional: false, repeated: false }]
    },
    // ['P_bar', 'P_bar PP']
    {
      name: 'P_bar',
      tags: [
        { values: ['P_bar'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    // ['P_bar', 'AdvP P_bar']
    {
      name: 'P_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['P_bar'], optional: false, repeated: false }
      ]
    },
    // ['P_bar', 'P (DP)']
    {
      name: 'P_bar',
      tags: [
        { values: ['P'], optional: false, repeated: false },
        { values: ['DP'], optional: true, repeated: false }
      ]
    },
    // ['AdvP', 'Adv_bar']
    {
      name: 'AdvP',
      tags: [{ values: ['Adv_bar'], optional: false, repeated: false }]
    },
    // ['Adv_bar', 'AdvP Adv_bar']
    {
      name: 'Adv_bar',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['Adv_bar'], optional: false, repeated: false }
      ]
    },
    // ['Adv_bar', 'Adv (PP)']
    {
      name: 'Adv_bar',
      tags: [
        { values: ['Adv'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: false }
      ]
    },
    // ['AdjP', 'Adj_bar']
    {
      name: 'AdjP',
      tags: [{ values: ['Adj_bar'], optional: false, repeated: false }]
    },
    // ['Adj_bar', 'AdjP Adj_bar']
    {
      name: 'Adj_bar',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['Adj_bar'], optional: false, repeated: false }
      ]
    },
    // ['Adj_bar', 'Adj (PP)']
    {
      name: 'Adj_bar',
      tags: [
        { values: ['Adj'], optional: false, repeated: false },
        { values: ['PP'], optional: true, repeated: false }
      ]
    },
    // Phrasal-level conjunctions (XP Conj XP)
    {
      name: 'CP',
      tags: [
        { values: ['CP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['CP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'TP',
      tags: [
        { values: ['TP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['TP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'VP',
      tags: [
        { values: ['VP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['VP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'DP',
      tags: [
        { values: ['DP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['DP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'NP',
      tags: [
        { values: ['NP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['NP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'PP',
      tags: [
        { values: ['PP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['PP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdvP',
      tags: [
        { values: ['AdvP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdvP'], optional: false, repeated: false }
      ]
    },
    {
      name: 'AdjP',
      tags: [
        { values: ['AdjP'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['AdjP'], optional: false, repeated: false }
      ]
    },
    // Bar-level conjunctions (X_bar Conj X_bar)
    {
      name: 'C_bar',
      tags: [
        { values: ['C_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['C_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'T_bar',
      tags: [
        { values: ['T_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['T_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'V_bar',
      tags: [
        { values: ['V_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['V_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'D_bar',
      tags: [
        { values: ['D_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['D_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'N_bar',
      tags: [
        { values: ['N_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['N_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'P_bar',
      tags: [
        { values: ['P_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['P_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adv_bar',
      tags: [
        { values: ['Adv_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adv_bar'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adj_bar',
      tags: [
        { values: ['Adj_bar'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adj_bar'], optional: false, repeated: false }
      ]
    },
    // Head-level conjunctions (X Conj X)
    {
      name: 'C',
      tags: [
        { values: ['C'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['C'], optional: false, repeated: false }
      ]
    },
    {
      name: 'T',
      tags: [
        { values: ['T'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['T'], optional: false, repeated: false }
      ]
    },
    {
      name: 'V',
      tags: [
        { values: ['V'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['V'], optional: false, repeated: false }
      ]
    },
    {
      name: 'D',
      tags: [
        { values: ['D'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['D'], optional: false, repeated: false }
      ]
    },
    {
      name: 'N',
      tags: [
        { values: ['N'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['N'], optional: false, repeated: false }
      ]
    },
    {
      name: 'P',
      tags: [
        { values: ['P'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['P'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adv',
      tags: [
        { values: ['Adv'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adv'], optional: false, repeated: false }
      ]
    },
    {
      name: 'Adj',
      tags: [
        { values: ['Adj'], optional: false, repeated: false },
        { values: ['Conj'], optional: false, repeated: false },
        { values: ['Adj'], optional: false, repeated: false }
      ]
    }
  ]
}
