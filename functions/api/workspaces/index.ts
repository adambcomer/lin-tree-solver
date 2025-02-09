interface Env {
  DB: D1Database
}

const DEFAULT_RULESET = JSON.stringify({
  root: ['CP'],
  pos: ['N', 'D', 'V', 'Adj', 'Adv', 'P', 'T', 'C', 'Conj'],
  rules: [
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
  ]
})

const DEFAULT_SENTENCE = JSON.stringify([
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const id = crypto.randomUUID()
  const timestamp = new Date()

  await context.env.DB.prepare(
    'INSERT INTO workspaces (id, sentence, ruleset, created_at, updated_at) VALUES(?, ?, ?, ?, ?)'
  )
    .bind(
      id,
      DEFAULT_SENTENCE,
      DEFAULT_RULESET,
      timestamp.toISOString(),
      timestamp.toISOString()
    )
    .run()

  return Response.json({ id })
}
