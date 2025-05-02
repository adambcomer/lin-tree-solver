# Linguistics Tree Solver

## About:

This tool automatically builds linguistics syntax trees.

A major goal of this tool is to accept to a broad set of syntax rules. Nearly
every textbook has different rules and standards. I want others to be able to
add/modify the rules to work for them.

I have included an annotated sentence and syntax rules from _Syntax: A
Generative Introduction, Third Edition, by Andrew Carnie_.

[Website](https://lin-tree-solver.adambcomer.com)

![Syntax tree for the sentence "The small dog quickly ran home to his owner"](images/tree.jpeg)

## Tutorial:

### 1. Define Syntax Rules

The Linguistics Tree Solver starts with a basic set of syntax rules to construct
a basic tree, but you can modify the rules to construct nearly any syntax tree.

Syntax Rule consist of three parts: Parts-of-Speech, Syntax Rules, and Roots.
Parts-of-Speech represent each atomic unit of your sentence. In English, this
this commonly a word, possessive, or tense modifier, but your language might
differ. Syntax Rules are the EBNF-like grammar for your language. Roots are the
starting Syntax Rules or Parts-of-Speech that inform the Solver where to start.

#### Grammar:

- `{...}`: Set of Part-of-Speech or Syntax Rule
- `(...)`: Optional (one or none) Part-of-Speech or Syntax Rule
- `({...})`: Optional Set (one or none) Part-of-Speech or Syntax Rule
- `(...+)`: Optional Repeated (none, one, or more) Part-of-Speech or Syntax Rule

### 2. Write and Annotate a Sentence

In the Sentence Editor, add your sentence in the text box . The sentence will be
automatically be split by word. Under each word will be all of the Parts of
Speech from the Syntax Rules. By annotating these Parts of Speech, the solver
will find trees that satisfy these constraints.

**Note:** You can select multiple Parts of Speech for a single word. At first,
this may seem strange. How can a word be a Noun, Verb, and Adjective at the same
time? But, what if we don&apos;t know what Part of Speech a word is? A word that
has multiple Parts of Speech represents our uncertainty or lack of knowledge.
The solver can use that uncertainty to work out all possible trees that satisfy
the other constraints.

Once the sentence has been annotated to the best of a our ability, we can
compute the trees that satisfy the syntax rules in conjunction with the
annotations.

### 3. Build/Solve/Compute All Syntax Trees For a Sentence

In the Tree Viewer, you can view all of the parsed trees.

## FAQ:

### Why are a few the syntax rules slightly different from the textbook?

The textbook has some rules that don't work well with parsers and were modified
to work as the author intended. For example, the X-Bar rule in the textbook
N'&rarr;N' (PP). This rule can be satisfied by an infinite chain of N's.
Intuitively, we know that the shortest possible tree is the desired result, but
the computer doesn't know that when it searches for every possible tree. I
modified some of the rules to work with the parser to give the desired parsed
trees rather then make the exact rules work.

### Can I save a picture of the parsed trees?

Yes. In the Tree Viewer, there is a Image button in the top right. Clicking this
button will generate an image based on the viewer window and automatically
download it.

### How do I share my Sentence/Syntax Rules with a friend?

Yes, just copy the URL in the toolbar and share with your friends. Each Syntax
Tree comes with a workspace that stores the syntax rules, sentence, and
parts-of-speech annotations.

**Note:** The trees are stored on a central server and are accessible by the
Workspace ID on the builder page. The syntax rules, sentence, and sentence
annotations can be overwritten by anyone with the Workspace ID.

### Is this project open source?

Yes. You can view the code at my
[Github Repository](https://github.com/adambcomer/lin-tree-solver).
Contributions are always welcome.

### Can I use this tool on my university linguistics syntax assignments?

This tool can solve many questions on introductory linguistics syntax
assignments. If you are worried about committing an academic offence, I would
recommend solving the trees by hand instead of using this tool.

## Resources:

- Email: [adambcomer@gmail.com](mailto:adambcomer@gmail.com)
- Project Site: [Project Site](https://lin-tree-solver.adambcomer.com/)
