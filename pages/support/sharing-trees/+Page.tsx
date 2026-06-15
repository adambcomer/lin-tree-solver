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

import { Head } from 'vike-react/Head'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Chip } from '@heroui/chip'

const Page = () => (
  <>
    <Head>
      <link rel='canonical' href='https://lin-tree-solver.adambcomer.com/support/sharing-trees' />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://lin-tree-solver.adambcomer.com/support/sharing-trees'
      />
    </Head>

    {/* Hero Section */}
    <div className='text-center py-12'>
      <h1 className='text-5xl font-bold mb-4'>Sharing Parse Trees</h1>
      <p className='text-xl text-default-600 max-w-3xl mx-auto'>
        Share your syntax trees with classmates, students, or colleagues in just a few clicks.
      </p>
    </div>

    {/* How to Share */}
    <div className='mb-12'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>How to Share</h2>
      <Card>
        <CardBody>
          <div className='space-y-4'>
            <p className='text-default-600'>
              You&apos;ve built your trees and now want to share them with a friend or colleague.
              Sharing your sentence and parse trees is as simple as copying the URL from your
              browser.
            </p>
            <div className='bg-default-100 p-4 rounded-lg'>
              <p className='text-sm text-default-600 mb-2 font-medium'>Example Workspace URL:</p>
              <code className='text-sm font-mono text-primary break-all'>
                https://lin-tree-solver.adambcomer.com/abc123def456/builder
              </code>
            </div>
            <p className='text-default-600'>
              Each workspace has a unique ID (like{' '}
              <code className='bg-default-100 px-2 py-1 rounded font-mono text-sm'>
                abc123def456
              </code>
              ) that identifies your work. Anyone with this URL can access your syntax rules,
              sentence annotations, and generated trees.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>

    {/* What Gets Shared */}
    <div className='mb-12'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>What Gets Shared</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <h3 className='text-lg font-semibold'>Syntax Rules</h3>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>
              All your custom grammar rules, including parts-of-speech tags, syntax rules, and root
              elements.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className='text-lg font-semibold'>Sentence Annotations</h3>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>
              The sentence you entered along with all the parts-of-speech tags you assigned to each
              word.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className='text-lg font-semibold'>Generated Trees</h3>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>
              All the syntax trees that were automatically generated from your rules and
              annotations.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>

    {/* Important Note */}
    <div className='mb-12'>
      <Card className='border-2 border-warning'>
        <CardHeader className='flex-col items-start'>
          <Chip color='warning' variant='flat' className='mb-2'>
            Important
          </Chip>
          <h3 className='text-xl font-semibold'>Privacy &amp; Security</h3>
        </CardHeader>
        <CardBody>
          <div className='space-y-3'>
            <p className='text-default-600'>
              <strong>Workspaces are publicly accessible:</strong> Anyone with the workspace URL can
              view and edit your work. There is no password protection or access control.
            </p>
            <p className='text-default-600'>
              <strong>Only share with trusted parties:</strong> To prevent unwanted modifications to
              your work, only share the workspace URL with people you trust.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>

    {/* Back to Support */}
    <div className='py-12 border-t border-default-200'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Need More Help?</h2>
        <p className='text-default-600 mb-6'>Check out our other guides or contact support.</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <a href='/support' className='text-primary hover:underline text-lg'>
            Back to Support
          </a>
          <span className='hidden sm:inline text-default-400'>•</span>
          <a
            href='mailto:adambcomer@gmail.com?subject=Help Sharing Trees'
            className='text-primary hover:underline text-lg'
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  </>
)

export default Page
