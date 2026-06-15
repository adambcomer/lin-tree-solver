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

const Page = () => (
  <>
    <Head>
      <link rel='canonical' href='https://lin-tree-solver.adambcomer.com/support' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://lin-tree-solver.adambcomer.com/support' />
    </Head>

    {/* Hero Section */}
    <div className='text-center py-12'>
      <h1 className='text-5xl font-bold mb-4'>Support &amp; Guides</h1>
      <p className='text-xl text-default-600 max-w-3xl mx-auto'>
        Helpful documentation to get the most out of Linguistics Tree Solver. Browse our guides
        below to learn how to customize your syntax trees and share your work.
      </p>
    </div>

    {/* Guide Cards */}
    <div className='mb-16'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>Getting Started Guides</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <a href='/support/new-tree-root' className='block'>
          <Card className='h-full hover:shadow-lg transition-shadow'>
            <CardHeader>
              <h3 className='text-2xl font-semibold'>Changing the Root of a Tree</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Learn how to build trees for individual clauses like noun phrases or verb phrases
                instead of complete sentences. This guide shows you how to modify your rule set to
                start from a different root element.
              </p>
            </CardBody>
          </Card>
        </a>

        <a href='/support/sharing-trees' className='block'>
          <Card className='h-full hover:shadow-lg transition-shadow'>
            <CardHeader>
              <h3 className='text-2xl font-semibold'>Sharing Trees</h3>
            </CardHeader>
            <CardBody>
              <p className='text-default-600'>
                Share your syntax trees with classmates, students, or colleagues. Learn how
                workspace URLs work and what information gets shared when you send a link.
              </p>
            </CardBody>
          </Card>
        </a>
      </div>
    </div>

    {/* Need More Help Section */}
    <div className='py-12 border-t border-default-200'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Still Need Help?</h2>
        <p className='text-default-600 mb-6 max-w-2xl mx-auto'>
          Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll be happy to help
          you get started.
        </p>
        <a
          href='mailto:adambcomer@gmail.com?subject=Help with Linguistics Tree Solver'
          className='text-primary hover:underline text-lg'
        >
          Contact Support
        </a>
      </div>
    </div>
  </>
)

export default Page
