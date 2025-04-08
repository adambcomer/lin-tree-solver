import { Head } from 'vike-react/Head'

const Page = () => (
  <>
    <Head>
      <link
        rel='canonical'
        href='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support/new-tree-root'
      />
    </Head>
    <div>
      <h1 className='text-5xl mt-16'>Changing the Root of a Tree</h1>

      <p className='mt-8'>
        Sometimes you don&apos;t want to build a tree for a complete sentence,
        but rather for an individual clause within a sentence like a noun phrase
        or verb phrase. This guide shows you how to modify a rule set to build
        trees that start from a different root. Most of the time this looks like
        building a tree where instead of starting at a SP or CP, you want to
        build a tree starting at a NP or VP. To do this, we have to adjust the
        &quot;root&quot; rule to shift the root to our desired clause type.
      </p>

      <h2 className='text-3xl mt-8'>1. Find your Syntax Rules</h2>
      <p className='mt-4'>
        Start by going to the Syntax Rules and clicking the edit button on the
        Syntax Rule set you wish to use.
      </p>
      <img
        className='mt-4 border-solid border-2'
        src='/images/new-tree-root/edit_syntax_rules.png'
      />

      <h2 className='text-3xl mt-8'>2. Edit the Root Tags</h2>
      <p className='mt-4'>
        Next, edit the root tags for these Syntax Rules. The root tags tell the
        tree builder where to start from to build your tree. The default for the
        rules{' '}
        <i>
          Chapter 3: Constituency, Trees, and Rules, Syntax: A Generative
          Introduction, by Andrew Carnie
        </i>{' '}
        is the CP tag or clause. Click the small &quot;X&quot; next ot the CP to
        remove it from the set of tags.
      </p>
      <img
        className='mt-4 border-solid border-2'
        src='/images/new-tree-root/edit_syntax_rule.png'
      />

      <h2 className='text-3xl mt-8'>3. Save the Rules</h2>
      <p className='mt-4'>
        Finally, click save in the top-right-hand corner. You should no be able
        to go to the Sentence Editor and the Tree Viewer to build and view your
        new trees. For my example, I can now build and view trees that look like
        this:
      </p>
      <img
        className='mt-4 border-solid border-2'
        src='/images/new-tree-root/final_tree.png'
      />
    </div>
  </>
)

export default Page
