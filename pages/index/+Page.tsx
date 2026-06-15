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

import { useState } from 'react'
import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { navigate } from 'vike/client/router'
import { addToast } from '@heroui/toast'
import { Head } from 'vike-react/Head'

import treeJPEG from '/images/tree.jpeg'
import treeAVIF from '/images/tree.avif'
import treeJXL from '/images/tree.jxl'

enum RuleSetType {
  Basic = 'basic',
  XBar = 'xbar',
  DPHypothesis = 'dphypothesis'
}

interface CreatWorkspaceResponse {
  id: string
}

const Page = () => {
  const [basicTreeLoading, setBasicTreeLoading] = useState(false)
  const [xbarTreeLoading, setXBarTreeLoading] = useState(false)
  const [dphypothesisTreeLoading, setDPHypothesisTreeLoading] = useState(false)

  const newSyntaxTree = (type: RuleSetType, setLoading: (newState: boolean) => void) => {
    setLoading(true)

    void fetch('/api/workspaces', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ type })
    })
      .then((res) => res.json())
      .then((data: CreatWorkspaceResponse) => navigate(`/${data.id}/builder`))
      .catch(() => {
        setLoading(false)
        addToast({
          title: 'Error Creating a New Workspace',
          color: 'danger'
        })
      })
  }

  return (
    <>
      <Head>
        <title>Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Automatically build trees based on linguistic syntax rules.'
        />
        <meta
          property='og:description'
          content='Automatically build trees based on linguistic syntax rules.'
        />
        <link rel='canonical' href='https://lin-tree-solver.adambcomer.com' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://lin-tree-solver.adambcomer.com' />
      </Head>

      {/* Hero Section */}
      <div className='text-center py-12'>
        <h1 className='text-5xl font-bold mb-4'>Linguistics Tree Solver</h1>
        <p className='text-xl text-default-600 mb-2'>
          Automatically generate syntax trees from your sentences
        </p>
        <p className='text-lg text-default-500 max-w-3xl mx-auto'>
          A powerful tool that builds all possible syntax trees based on your grammar rules and
          sentence annotations. Perfect for linguistics students, researchers, and educators.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Get Started</h2>
        <p className='text-center text-default-600 mb-8 max-w-2xl mx-auto'>
          Choose a syntax framework to begin. Each comes with pre-configured rules and an example
          sentence to help you understand how it works.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card>
            <CardHeader className='flex-col items-start'>
              <Chip color='primary' variant='flat' className='mb-2'>
                Recommended
              </Chip>
              <h3 className='text-xl font-semibold'>Basic Syntax</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Simple phrase structure grammar based on Andrew Carnie&apos;s textbook. Great for
                beginners learning basic syntactic structures like NP, VP, PP, and CP.
              </p>
            </CardBody>
            <CardFooter>
              <Button
                color='primary'
                size='lg'
                fullWidth
                onPress={() => newSyntaxTree(RuleSetType.Basic, setBasicTreeLoading)}
                isLoading={basicTreeLoading}
                disabled={basicTreeLoading || xbarTreeLoading || dphypothesisTreeLoading}
              >
                Start with Basic
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className='flex-col items-start'>
              <Chip color='default' variant='flat' className='mb-2'>
                Intermediate
              </Chip>
              <h3 className='text-xl font-semibold'>X-Bar Theory</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                X-Bar theory with specifiers, heads, and complements. Provides a more detailed
                hierarchical structure for phrasal categories and their internal organization.
              </p>
            </CardBody>
            <CardFooter>
              <Button
                color='default'
                size='lg'
                fullWidth
                onPress={() => newSyntaxTree(RuleSetType.XBar, setXBarTreeLoading)}
                isLoading={xbarTreeLoading}
                disabled={basicTreeLoading || xbarTreeLoading || dphypothesisTreeLoading}
              >
                Start with X-Bar
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className='flex-col items-start'>
              <Chip color='default' variant='flat' className='mb-2'>
                Advanced
              </Chip>
              <h3 className='text-xl font-semibold'>DP Hypothesis</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Implements the DP Hypothesis where determiners head their own phrases. Used in
                modern generative syntax for analyzing noun phrases with functional projections.
              </p>
            </CardBody>
            <CardFooter>
              <Button
                color='default'
                size='lg'
                fullWidth
                onPress={() => newSyntaxTree(RuleSetType.DPHypothesis, setDPHypothesisTreeLoading)}
                isLoading={dphypothesisTreeLoading}
                disabled={basicTreeLoading || xbarTreeLoading || dphypothesisTreeLoading}
              >
                Start with DP Hypothesis
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Example Tree Image */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Example Output</h2>

        <Card>
          <CardBody className='p-0'>
            <picture>
              <source srcSet={treeJXL} type='image/jxl' />
              <source srcSet={treeAVIF} type='image/avif' />
              <img
                src={treeJPEG}
                className='w-full rounded-lg'
                alt='Syntax tree for the sentence "The small dog quickly ran home to his owner"'
                height={2828}
                width={4000}
              />
            </picture>
          </CardBody>
        </Card>
      </div>

      {/* How It Works */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>How It Works</h2>
        <p className='text-center text-default-600 mb-8 max-w-2xl mx-auto'>
          Three simple steps to generate your syntax trees
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl font-bold text-primary'>1</span>
            </div>
            <h3 className='text-xl font-semibold mb-3'>Define Grammar Rules</h3>
            <p className='text-default-600'>
              Start with preset rules or customize your own. Define parts-of-speech, syntax rules,
              and root elements using our EBNF-like grammar notation.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl font-bold text-primary'>2</span>
            </div>
            <h3 className='text-xl font-semibold mb-3'>Annotate Your Sentence</h3>
            <p className='text-default-600'>
              Enter your sentence and assign parts-of-speech to each word. You can select multiple
              tags when uncertain—the solver finds all valid interpretations.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl font-bold text-primary'>3</span>
            </div>
            <h3 className='text-xl font-semibold mb-3'>View All Possible Trees</h3>
            <p className='text-default-600'>
              The solver automatically computes all valid syntax trees that match your rules and
              annotations. Export or share your results.
            </p>
          </div>
        </div>
      </div>

      {/* Grammar Notation Guide */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Grammar Notation</h2>
        <Card>
          <CardBody>
            <p className='text-default-600 mb-4'>
              Our syntax rules use an EBNF-like notation for maximum flexibility:
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-3'>
                <code className='bg-default-100 px-3 py-1 rounded text-sm font-mono shrink-0'>
                  &#123;A/B&#125;
                </code>
                <div>
                  <p className='font-medium'>Set</p>
                  <p className='text-sm text-default-600'>Choose one of A or B</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <code className='bg-default-100 px-3 py-1 rounded text-sm font-mono shrink-0'>
                  (A)
                </code>
                <div>
                  <p className='font-medium'>Optional</p>
                  <p className='text-sm text-default-600'>Zero or one occurrence of A</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <code className='bg-default-100 px-3 py-1 rounded text-sm font-mono shrink-0'>
                  (&#123;A/B&#125;)
                </code>
                <div>
                  <p className='font-medium'>Optional Set</p>
                  <p className='text-sm text-default-600'>Zero or one of A or B</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <code className='bg-default-100 px-3 py-1 rounded text-sm font-mono shrink-0'>
                  (A+)
                </code>
                <div>
                  <p className='font-medium'>Repeated Optional</p>
                  <p className='text-sm text-default-600'>Zero or more occurrences of A</p>
                </div>
              </div>
            </div>
            <p className='text-default-600 mt-4 text-sm'>
              Example:{' '}
              <code className='bg-default-100 px-2 py-1 rounded font-mono text-sm'>
                VP → (AdvP+) &#123;V/V_Conj&#125; (NP) (PP+)
              </code>{' '}
              means a VP has optional leading adverbs, a required verb, optional NP, and optional
              trailing PPs.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Features */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Key Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Flexible Grammar System</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Works with any textbook or framework. Customize parts-of-speech and syntax rules to
                match your specific needs and linguistic theory.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Multiple Valid Trees</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Automatically finds all possible interpretations when words have ambiguous
                parts-of-speech, helping you explore different syntactic analyses.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Shareable Workspaces</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Each workspace gets a unique URL. Share your syntax rules, sentences, and trees with
                classmates, students, or colleagues.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Export to Images</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Download your trees as high-quality images for use in papers, presentations, or
                assignments.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mb-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Frequently Asked Questions</h2>

        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>How do I share my work with others?</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Simply copy the URL from your browser. Each workspace has a unique ID that lets
                anyone access your syntax rules, sentence, and annotations.
              </p>
              <p className='text-default-600 mt-2'>
                <strong>Note:</strong> Workspaces are stored on a central server and can be edited
                by anyone with the URL. Don&apos;t share the link if you want to keep your work
                private.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Can I export my syntax trees?</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Yes! In the Tree Viewer, click the Image button in the top right corner to generate
                and download a high-quality image of your tree.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>
                Why are some rules different from my textbook?
              </h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Some textbook rules can create infinite loops when parsed by a computer. For
                example, the X-Bar rule N&apos; → N&apos; (PP) could generate an endless chain of
                N&apos;s. We&apos;ve modified such rules to achieve the intended result without
                infinite recursion.
              </p>
              <p className='text-default-600 mt-2'>
                You can always customize the rules to match your specific textbook or framework.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Is this project open source?</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Yes! The code is available on{' '}
                <a
                  href='https://github.com/adambcomer/lin-tree-solver'
                  className='text-primary hover:underline'
                >
                  GitHub
                </a>
                . Contributions and feedback are always welcome.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className='text-lg font-semibold'>Can I use this for my linguistics homework?</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                This tool can solve many introductory syntax problems. However, if you&apos;re
                concerned about academic integrity, we recommend using it as a learning aid to check
                your work rather than generating answers directly.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Footer/Resources */}
      <div className='py-12 border-t border-default-200'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold mb-4'>Need Help?</h2>
          <p className='text-default-600 mb-6'>Have questions or feedback? Get in touch!</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              as='a'
              href='mailto:adambcomer@gmail.com?subject=Help Drawing Syntax Tree'
              variant='bordered'
              size='lg'
            >
              Email Support
            </Button>
            <Button
              as='a'
              href='https://github.com/adambcomer/lin-tree-solver'
              target='_blank'
              variant='bordered'
              size='lg'
            >
              View on GitHub
            </Button>
          </div>
          <p className='text-sm text-default-500 mt-8'>
            Based on <i>Syntax: A Generative Introduction, Third Edition</i> by Andrew Carnie
          </p>
        </div>
      </div>
    </>
  )
}

export default Page
