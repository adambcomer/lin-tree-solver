/*
 * Copyright 2022 Adam Bishop Comer
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

import { Grid } from '@mui/material'
import { Helmet } from 'react-helmet'
import {
  Subtitle,
  Paragraph,
  Subtitle2,
  Question,
  Answer,
  Link,
  OutboundLink,
  Title,
} from '../Components/common'
import withTracker from '../withTracker'

const Home = (): JSX.Element => {
  return (
    <Grid item xs sx={{ px: 2, py: 2 }}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Linguistics Tree Solver</title>
        <meta
          name='description'
          content='Automatically build trees based on linguistic syntax rules.'
        />

        <link rel='canonical' href='https://adambcomer.com/lin-tree-solver/' />

        <meta property='og:title' content='Linguistics Tree Solver' />
        <meta
          property='og:description'
          content='Automatically build trees based on linguistic syntax rules.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://adambcomer.com/lin-tree-solver/'
        />
      </Helmet>

      <Title>Linguistics Tree Solver</Title>

      <Subtitle>About:</Subtitle>
      <Paragraph>
        This tool automatically builds linguistics syntax trees.
      </Paragraph>
      <Paragraph>
        A major goal of this tool is to accept to a broad set of syntax rules.
        Nearly every textbook has different rules and standards. I want others
        to be able to add/modify the rules to work for them.
      </Paragraph>
      <Paragraph>
        I have included an annotated sentence and syntax rules from{' '}
        <i>
          Syntax: A Generative Introduction, Third Edition, by Andrew Carnie.{' '}
        </i>
        Click around to view the <Link to='/sentence'>sentence</Link>, the
        <Link to='/rules'> syntax rules</Link>, and{' '}
        <Link to='/viewer'>parsed trees</Link>.
      </Paragraph>

      <Subtitle>Tutorial:</Subtitle>

      <Subtitle2>1. Define Syntax Rules (One Time Step)</Subtitle2>
      <Paragraph>Work in progress.</Paragraph>

      <Subtitle2>2. Write and Annotate a Sentence</Subtitle2>
      <Paragraph>
        In the <Link to='/sentence'>Sentence Editor</Link>, add your sentence in
        the text box at the top. The sentence will be automatically be split by
        word. Under each word will be all of the Parts of Speech from the Syntax
        Rules. By coloring these Parts of Speech, the solver will find trees
        that satisfy these constraints.
      </Paragraph>
      <Paragraph>
        <b>Note:</b> You can select multiple Parts of Speech for a single word.
        At first, this may seem strange. How can a word be a Noun, Verb, and
        Adjective at the same time? But, what if we don&apos;t know what Part of
        Speech a word is? A word that has multiple Parts of Speech represents
        our uncertainty or lack of knowledge. The solver can use that
        uncertainty to work out all possible trees that satisfy the other
        constraints.
      </Paragraph>
      <Paragraph>
        Once the sentence has been annotated to the best of a our ability, we
        can compute the trees that satisfy the syntax rules in conjunction with
        the annotations.
      </Paragraph>

      <Subtitle2>
        3. Build/Solve/Compute All Syntax Trees For a Sentence
      </Subtitle2>
      <Paragraph>
        In the <Link to='/viewer'>Tree Viewer</Link>, you can view all of the
        parsed trees.
      </Paragraph>

      <Subtitle>Technologies:</Subtitle>
      <Paragraph>
        This project uses Web Workers to parse the trees. To get the best
        performance and support, use an up-to-date version of Chrome, Firefox,
        or Safari.
      </Paragraph>

      <Subtitle>FAQ:</Subtitle>

      <Question>
        Why are a few the syntax rules slightly different from the textbook?
      </Question>
      <Answer>
        The textbook has some rules that do&apos;t work well with parsers and
        were modified to work as the author intended. For example, the X-Bar
        rule in the textbook N&apos;&rarr;N&apos; (PP). This rule can be
        satisfied by an infinite chain of N&apos;s. Intuitively, we know that
        the shortest possible tree is the desired result, but the computer
        doesn&apos;t know that when it searches for every possible tree. I
        modified some of the rules to work with the parser to give the desired
        parsed trees rather then make the exact rules work.
      </Answer>

      <Question>Can I save a picture of the parsed trees?</Question>
      <Answer>
        Yes. In the <Link to='/viewer'>Tree Viewer</Link>, there is a Image
        button in the top right. Clicking this button will generate an image
        based on the viewer window and automatically download it.
      </Answer>

      <Question>
        How do I share my Sentence/Syntax Rules with a friend?
      </Question>
      <Answer>
        Currently, there are no sharing mechanisms. This feature is under active
        development. I&apos;m considering several strategies to make this
        feature work seamlessly.
      </Answer>

      <Question>Is this project open source?</Question>
      <Answer>
        Yes. You can view the code at my{' '}
        <OutboundLink href='https://github.com/adambcomer/lin-tree-solver'>
          Github Repository
        </OutboundLink>
        . I&apos;m happy to merge pull requests that build on the project.
      </Answer>

      <Question>
        Can I use this tool on my university linguistics syntax assignments?
      </Question>
      <Answer>
        This tool can solve many questions on introductory linguistics syntax
        assignments. If you are worried about committing an academic offence, I
        would recommend solving the trees by hand instead of using this tool.
      </Answer>

      <Subtitle>To-Do:</Subtitle>
      <ul>
        <li>
          <Paragraph>Saving of Sentences/Syntax Rules/Trees</Paragraph>
        </li>
        <li>
          <Paragraph>Sharing of Sentences/Syntax Rules/Trees</Paragraph>
        </li>
        <li>
          <Paragraph>Embeddable iframes</Paragraph>
        </li>
        <li>
          <Paragraph>Tooling to catch common syntax rule errors</Paragraph>
        </li>
        <li>
          <Paragraph>Improve rendering for larger trees</Paragraph>
        </li>
        <li>
          <Paragraph>
            Label structural relationships between all of the nodes in a tree
          </Paragraph>
        </li>
      </ul>

      <Subtitle>Resources:</Subtitle>
      <Paragraph>
        Email:{' '}
        <OutboundLink href='mailto:adambcomer@gmail.com'>
          adambcomer@gmail.com
        </OutboundLink>
      </Paragraph>
      <Paragraph>
        Project Site:{' '}
        <OutboundLink href='https://adambcomer.com/lin-tree-solver/'>
          Project Site
        </OutboundLink>
      </Paragraph>
      <Paragraph>
        Personal Site:{' '}
        <OutboundLink href='https://adambcomer.com/'>
          Personal Site
        </OutboundLink>
      </Paragraph>
      <Paragraph>
        Repository:{' '}
        <OutboundLink href='https://github.com/adambcomer/lin-tree-solver'>
          Project Github Repository
        </OutboundLink>
      </Paragraph>
    </Grid>
  )
}

export default withTracker(Home)
