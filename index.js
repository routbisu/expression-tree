const assert = require("assert");

// Removed switch case logic to reduce code repetition and make it more extendable
// to add new operators in the future by just adding to this configuration

// Map operators to evaluator functions, can add new operators here
const operatorsMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const Node = (operator, value, left, right) => {
  // Evaluator function picked from the operators map
  // When no evaluator function is found, it denotes that the element is not an operator
  const evaluatorFunc = operatorsMap[operator];

  const result = () =>
    evaluatorFunc ? evaluatorFunc(left.result(), right.result()) : value;

  const toString = () =>
    evaluatorFunc
      ? `(${left.toString()} ${operator} ${right.toString()})`
      : value.toString();

  return {
    operator,
    value,
    left,
    right,
    result,
    toString,
  };
};

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
