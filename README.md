# Linguistics Tree Solver

## About:

This tool automatically builds linguistics syntax trees.

A major goal of this tool is to accept to a broad set of syntax rules. Nearly every textbook has different rules and standards.

I want others to be able to add/modify the rules to work for them.

I have included an annotated sentence and syntax rules from _Syntax: A Generative Introduction, Third Edition, by Andrew Carnie_.

Click around to view the [sentence](https://lin-tree-solver.adambcomer.com/sentence), the [syntax rules](https://lin-tree-solver.adambcomer.com/rules), and [parsed trees](https://lin-tree-solver.adambcomer.com/viewer).

## Tutorial:

### 1. Define Syntax Rules (One Time Step)

Work in progress.

### 2. Write and Annotate a Sentence

In the [Sentence Editor](https://lin-tree-solver.adambcomer.com/sentence), add your sentence in the text box at the top. The sentence will be automatically be split by word. Under each word will be all of the Parts of Speech from the Syntax Rules. By coloring these Parts of Speech, the solver will find trees that satisfy these constraints.

**Note:** You can select multiple Parts of Speech for a single word. At first, this may seem strange. How can a word be a Noun, Verb, and Adjective at the same time? But, what if we don't know what Part of Speech a word is? A word that has multiple Parts of Speech represents our uncertainty or lack of knowledge. The solver can use that uncertainty to work out all possible trees that satisfy the other constraints.

Once the sentence has been annotated to the best of a our ability, we can compute the trees that satisfy the syntax rules in conjunction with the annotations.

### 3. Build/Solve/Compute All Syntax Trees For a Sentence

In the [Tree Viewer](https://lin-tree-solver.adambcomer.com/viewer), you can view all of the parsed trees.

## Technologies:

This project uses Web Workers to parse the trees. To get the best performance and support, use an up-to-date version of Chrome, Firefox, or Safari.

## FAQ:

### Why are a few the syntax rules slightly different from the textbook?

The textbook has some rules that don't work well with parsers and were modified to work as the author intended. For example, the X-Bar rule in the textbook N'&rarr;N' (PP). This rule can be satisfied by an infinite chain of N's. Intuitively, we know that the shortest possible tree is the desired result, but the computer doesn't know that when it searches for every possible tree. I modified some of the rules to work with the parser to give the desired parsed trees rather then make the exact rules work.

### Can I save a picture of the parsed trees?

Yes. In the [Tree Viewer](https://lin-tree-solver.adambcomer.com/viewer), there is a Image button in the top right. Clicking this button will generate an image based on the viewer window and automatically download it.

### How do I share my Sentence/Syntax Rules with a friend?

Currently, there are no sharing mechanisms. This feature is under active development. I'm considering several strategies to make this feature work seamlessly.

### Is this project open source?

Yes. You can view the code at my [Github Repository](https://github.com/adambcomer/lin-tree-solver). I'm happy to merge pull requests that build on the project.

## To-Do:

- Embeddable iframes
- Improve rendering for larger trees
- Label structural relationships between all of the nodes in a tree

## Done:

- Saving of Sentences/Syntax Rules/Trees
- Sharing of Sentences/Syntax Rules/Trees
- Tooling to catch common syntax rule errors

## Resources:

- Email: [adambcomer@gmail.com](mailto:adambcomer@gmail.com)
- Project Site: [Project Site](https://lin-tree-solver.adambcomer.com/)
- Personal Site: [Personal Site](https://adambcomer.com/)
- Repository: [Project Github Repository](https://github.com/adambcomer/lin-tree-solver)
