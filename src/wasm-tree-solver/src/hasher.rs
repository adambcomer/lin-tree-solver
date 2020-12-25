use std::hash::BuildHasher;
use std::hash::Hasher;

pub struct MyHasher {
  state: u64,
}

impl MyHasher {
  pub fn new() -> MyHasher {
    return MyHasher { state: 5381 };
  }
}

impl Default for MyHasher {
  fn default() -> MyHasher {
    return MyHasher::new();
  }
}

impl Hasher for MyHasher {
  fn finish(&self) -> u64 {
    return self.state;
  }

  fn write(&mut self, bytes: &[u8]) {
    for b in bytes {
      self.state = ((self.state << 5) + self.state) + *b as u64;
    }
  }
}

impl BuildHasher for MyHasher {
  type Hasher = MyHasher;
  fn build_hasher(&self) -> MyHasher {
    return MyHasher::new();
  }
}
