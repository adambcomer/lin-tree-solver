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

import { IRuleSet } from '../proto/bundle.js'

export const DEFAULT_RULESET: IRuleSet = {
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
