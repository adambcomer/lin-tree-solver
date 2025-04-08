import { Head } from 'vike-react/Head'

const Page = () => (
  <>
    <Head>
      <link
        rel='canonical'
        href='https://lin-tree-solver.adambcomer.com/support'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support'
      />
    </Head>
    <div>
      <h1 className='text-5xl mt-16'>Support</h1>

      <p className='mt-4'>Helpful documentation to solve common problems.</p>

      <h2 className='text-3xl mt-8'>Pages:</h2>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
        <a href='/support/new-tree-root'>
          <div className='p-4 bg-slate-200 rounded-medium h-[144px]'>
            <h2 className='text-2xl text-nowrap overflow-hidden overflow-ellipsis'>
              Changing the Root of a Tree
            </h2>
            <p className='mt-2 line-clamp-3'>
              Sometimes you don&apos;t want to build a tree for a complete
              sentence, but rather for an individual clause within a sentence
              like a noun phrase or verb phrase. This guide shows you how to
              modify a rule set to build trees that start from a different root.
            </p>
          </div>
        </a>
        <a href='/support/sharing-trees'>
          <div className='p-4 bg-slate-200 rounded-medium h-[144px]'>
            <h2 className='text-2xl text-nowrap overflow-hidden overflow-ellipsis'>
              Sharing Trees
            </h2>
            <p className='mt-2 line-clamp-3'>
              Sharing Parse Trees is simple, just copy the URL.
            </p>
          </div>
        </a>
      </div>
    </div>
  </>
)

export default Page
