use js_sys::Array;
use serde::{Serialize};
use wasm_bindgen::JsValue;

mod rule_set;
mod solver;
mod tree;
mod hasher;

use wasm_bindgen::prelude::*;

pub fn slice_to_array<T: Serialize>(slice: &[T]) -> Array {
  let a = Array::new_with_length(slice.len() as u32);
  for (i, s) in slice.iter().enumerate() {
    a.set(i as u32, JsValue::from_serde(s).unwrap());
  }
  return a;
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}
