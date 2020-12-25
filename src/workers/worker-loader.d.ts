declare module 'worker-loader!*' {
  class WasmSolverWorker extends Worker {
    constructor ();
  }

  export default WasmSolverWorker
}
