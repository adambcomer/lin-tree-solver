use crate::hasher::MyHasher;
use crate::rule_set::RuleSet;
use crate::tree::Tree;
use std::collections::HashSet;
use std::rc::Rc;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct TreeSolver {
  tokens: Vec<HashSet<String, MyHasher>>,
  rules: RuleSet,
  searched: usize,
}

#[wasm_bindgen]
impl TreeSolver {
  #[wasm_bindgen(constructor)]
  pub fn new(tokens: &JsValue, rules: &JsValue) -> TreeSolver {
    let tokens: Vec<Vec<String>> = tokens.into_serde().unwrap();
    let tokens: Vec<HashSet<String, MyHasher>> = tokens
      .into_iter()
      .map(|t| {
        let mut map = HashSet::with_capacity_and_hasher(t.len(), MyHasher::new());
        map.extend(t);
        return map;
      })
      .collect();

    let mut rules: RuleSet = rules.into_serde().unwrap();

    rules.init();

    return TreeSolver {
      tokens,
      rules,
      searched: 0,
    };
  }

  pub fn get_tree(&mut self, initial_rules: &JsValue) -> Option<Box<[JsValue]>> {
    let mut stack: Vec<Tree> = Vec::with_capacity(128);

    let initial_rules: Vec<String> = initial_rules.into_serde().unwrap();

    for r in initial_rules {
      if let Some(rule) = self.rules.get_rule(&r) {
        let t = Tree::new(&rule.name, &self.rules);
        if t.is_valid(&self.tokens) {
          stack.push(t);
        }
      }
    }

    while let Some(t) = stack.pop() {
      self.searched += 1;

      if t.is_solution(&self.tokens) {
        let vals: Vec<JsValue> = t
          .nodes
          .iter()
          .map(|n| JsValue::from_serde(n).unwrap())
          .collect();

        return Some(vals.into_boxed_slice());
      }

      for i in 0..t.nodes.len() {
        if t.expandable(i) {
          let mut new_tree = t.clone();
          new_tree.expand(i);

          if new_tree.is_valid(&self.tokens) {
            stack.push(new_tree)
          }
        }
      }
    }
    return None;
  }

  pub fn get_trees(&mut self, initial_rules: &JsValue) -> Box<[JsValue]> {
    let mut cycle_checker: HashSet<Rc<Tree>, MyHasher> =
      HashSet::with_capacity_and_hasher(128, MyHasher::new());
    let mut solutions: HashSet<Tree, MyHasher> = HashSet::with_hasher(MyHasher::new());
    let mut stack: Vec<Rc<Tree>> = Vec::with_capacity(128);

    let initial_rules: Vec<String> = initial_rules.into_serde().unwrap();

    for r in initial_rules {
      if let Some(rule) = self.rules.get_rule(&r) {
        let t = Tree::new(&rule.name, &self.rules);
        if t.is_valid(&self.tokens) {
          stack.push(Rc::new(t));
        }
      }
    }

    while let Some(t) = stack.pop() {
      self.searched += 1;

      if t.is_solution(&self.tokens) {
        if !solutions.contains(&t) {
          solutions.insert((*t).clone());
        }
        continue;
      }

      cycle_checker.insert(t.clone());

      for i in 0..t.nodes.len() {
        if t.expandable(i) {
          let mut new_tree = (*t).clone();
          new_tree.expand(i);

          if !cycle_checker.contains(&new_tree) && new_tree.is_valid(&self.tokens) {
            stack.push(Rc::new(new_tree));
          }
        }
      }
    }
    let solutions: Vec<JsValue> = solutions
      .iter()
      .map(|s| JsValue::from_serde(s).unwrap())
      .collect();

    return solutions.into_boxed_slice();
  }

  pub fn get_searched(&self) -> usize {
    return self.searched;
  }
}
