use crate::hasher::MyHasher;
use std::collections::HashSet;
use crate::rule_set::RuleSet;
use crate::rule_set::Tag;
use serde::Serialize;
use std::hash::Hash;
use std::hash::Hasher;
use std::rc::Rc;

#[derive(Serialize, Copy, Clone)]
pub struct Node<'a> {
  pub tag: &'a Tag,
  level: u32,
  pub expanded: bool,
}

#[derive(Serialize)]
pub struct Tree<'a> {
  root: &'a str,
  pub nodes: Vec<Rc<Node<'a>>>,

  #[serde(skip_serializing)]
  rules: &'a RuleSet,
}

impl<'a> Tree<'a> {
  pub fn new(root: &'a str, rules: &'a RuleSet) -> Tree<'a> {
    let nodes: Vec<Rc<Node>>;
    if let Some(rule) = rules.get_rule(root) {
      nodes = rule
        .tags
        .iter()
        .map(|t| {
          Rc::new(Node {
            tag: &t,
            level: 1,
            expanded: !t.optional,
          })
        })
        .collect();
    } else {
      nodes = Vec::new();
    }

    return Tree {
      root: root,
      nodes,
      rules: rules,
    };
  }

  pub fn clone(&self) -> Tree<'a> {
    return Tree {
      root: self.root,
      nodes: self.nodes.clone(),
      rules: self.rules,
    };
  }

  pub fn is_valid(&self, tokens: &[HashSet<String, MyHasher>]) -> bool {
    let mut j = 0;
    for n in &self.nodes {
      if !n.expanded || !self.rules.has_pos(&n.tag.name) {
        continue;
      }
      if j == tokens.len() {
        return false;
      }
      while !tokens[j].contains(&n.tag.name) {
        j += 1;

        if j == tokens.len() {
          return false;
        }
      }
      j += 1;
    }
    return true;
  }

  pub fn is_solution(&self, tokens: &[HashSet<String, MyHasher>]) -> bool {
    let mut j = 0;
    for n in &self.nodes {
      if !n.expanded || !self.rules.has_pos(&n.tag.name) {
        continue;
      }
      if j >= tokens.len() || !tokens[j].contains(&n.tag.name) {
        return false;
      }
      j += 1;
    }
    return j == tokens.len();
  }

  pub fn expandable(&self, index: usize) -> bool {
    return !self.nodes[index].expanded;
  }

  pub fn expand(&mut self, index: usize) {
    if self.rules.has_pos(&self.nodes[index].tag.name) {
      let mut n = *self.nodes[index];
      n.expanded = true;
      if self.nodes[index].tag.repeated {
        self.nodes.insert(index, Rc::new(n));
      } else {
        self.nodes[index] = Rc::new(n);
      }
      return;
    }

    if let Some(rule) = self.rules.get_rule(&self.nodes[index].tag.name) {
      let mut insert_nodes: Vec<Rc<Node>> = rule
        .tags
        .iter()
        .map(|t| {
          return Rc::new(Node {
            tag: &t,
            level: self.nodes[index].level + 1,
            expanded: !t.optional,
          });
        })
        .collect();
      let mut i = 0;
      while i < insert_nodes.len() {
        if insert_nodes[i].expanded {
          if let Some(expand_rule) = self.rules.get_rule(&insert_nodes[i].tag.name) {
            let expand_level = insert_nodes[i].level;

            for (k, t) in expand_rule.tags.iter().enumerate() {
              let mut expanded = !t.optional;
              if k == i {
                expanded = true;
              }

              insert_nodes.insert(
                i + k,
                Rc::new(Node {
                  tag: &t,
                  level: expand_level + 1,
                  expanded: expanded,
                }),
              );
            }
          } else {
            i += 1;
          }
        } else {
          i += 1;
        }
      }

      let mut n = *self.nodes[index];
      n.expanded = true;
      self.nodes[index] = Rc::new(n);
      for (k, t) in insert_nodes.into_iter().enumerate() {
        self.nodes.insert(index + k, t);
      }
    }
  }
}

impl<'a> Hash for Tree<'a> {
  fn hash<H: Hasher>(&self, state: &mut H) {
    for n in &self.nodes {
      if !n.expanded {
        continue;
      }
      n.tag.hash(state);
      n.level.hash(state);
      n.expanded.hash(state);
    }
  }
}

impl<'a> PartialEq for Tree<'a> {
  fn eq(&self, tree: &Self) -> bool {
    let mut i = 0;
    for n in &self.nodes {
      if !n.expanded {
        continue;
      }
      while i < tree.nodes.len() {
        if tree.nodes[i].expanded {
          break;
        }
        i += 1;
      }

      if i >= tree.nodes.len() {
        return false;
      }
      if n.level != tree.nodes[i].level || n.tag != tree.nodes[i].tag {
        return false;
      }
      i += 1
    }
    while i < tree.nodes.len() {
      if tree.nodes[i].expanded {
        return false;
      }
      i += 1;
    }

    return true;
  }
}

impl<'a> Eq for Tree<'a> {}
