use crate::hasher::MyHasher;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::collections::HashSet;
use std::rc::Rc;

#[derive(Serialize, Deserialize, Clone, Hash, PartialEq)]
pub struct Tag {
  pub name: String,
  pub optional: bool,
  pub repeated: bool,
}

#[derive(Deserialize)]
pub struct Expression {
  pub name: String,
  pub tags: Vec<Rc<Tag>>,
}

#[derive(Deserialize)]
pub struct RuleSet {
  pub pos: Vec<String>,
  pub rules: HashMap<String, Expression, MyHasher>,

  #[serde(skip_deserializing)]
  pub pos_index: HashSet<String, MyHasher>,
}

impl RuleSet {
  pub fn init(&mut self) {
    let mut pos_index = HashSet::with_hasher(MyHasher::new());
    for p in &self.pos {
      pos_index.insert(p.clone());
    }
    self.pos_index = pos_index;
  }

  pub fn has_pos(&self, name: &str) -> bool {
    return self.pos_index.contains(name);
  }

  pub fn get_rule(&self, name: &str) -> Option<&Expression> {
    return self.rules.get(name);
  }
}
