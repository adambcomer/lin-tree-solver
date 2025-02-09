import { usePageContext } from 'vike-react/usePageContext'
import { useData } from 'vike-react/useData'
import { Response, useWorkspace } from '../../../api/useWorkspace'
import { RulesetEditor } from './RulesetEditor'
import { SentenceEditor } from './SentenceEdtitor'
import { TreeViewer } from './TreeViewer'

const Page = () => {
  const { routeParams } = usePageContext()
  const initialData = useData<Response>()
  const { data, updateSentence, updateRuleset } = useWorkspace(initialData)

  return (
    <>
      <h1 className='text-5xl mt-16'>Linguistics Tree Solver</h1>
      <div className='mt-4 text-sm font-medium'>
        Workspace ID: {routeParams.workspace}
      </div>

      <h2 className='text-3xl mt-16'>1. Build Rule Set</h2>
      <RulesetEditor ruleset={data.ruleset} updateRuleset={updateRuleset} />

      <h2 className='text-3xl mt-16'>2. Annotate Sentence</h2>
      <SentenceEditor
        sentence={data.sentence}
        ruleset={data.ruleset}
        updateSentence={updateSentence}
      />

      <h2 className='text-3xl mt-16'>3. Draw Syntax Trees</h2>
      <TreeViewer ruleset={data.ruleset} sentence={data.sentence} />
    </>
  )
}

export default Page
