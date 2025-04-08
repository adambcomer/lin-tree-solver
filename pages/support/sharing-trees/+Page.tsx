import { Head } from 'vike-react/Head'

const Page = () => (
  <>
    <Head>
      <link
        rel='canonical'
        href='https://lin-tree-solver.adambcomer.com/support/sharing-trees'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support/sharing-trees'
      />
    </Head>
    <div>
      <h1 className='text-5xl mt-16'>Sharing Parse Trees</h1>

      <p className='mt-8'>
        You've built your trees and now want to share them with a friend or
        colleague. Sharing the sentence and parse trees is as simple as copying
        the URL in the browser with your Workspace ID.
      </p>

      <p className='mt-4'>
        <b>Note:</b> The trees are stored on server and are accessible by the
        Workspace ID on the builder page. The Syntax Rules, Sentence
        Annotations, and Trees can be overwritten by anyone with the Workspace
        ID, so only had it out to trusted parties.
      </p>
    </div>
  </>
)

export default Page
