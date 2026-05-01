import mut from "./module.js"; // MUT = Module Under Test

// sum tests
test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing sum of zero -- success", () => {
  const expected = 0;
  const got = mut.sum(0, 0);
  expect(got).toBe(expected);
});

// div tests
test("Testing divide by zero -- success", () => {
  const expected = NaN;
  const got = mut.div(0, 0);
  expect(got).toBe(expected);
});

test("Testing divide zero by # -- success", () => {
  const expected = 0;
  const got = mut.div(0, 10);
  expect(got).toBe(expected);
});

// contains tests
test("Testing contains no numbers -- success", () => {
  const expected = false;
  const input = "bigfatnoob";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

test("Testing contains one number -- success", () => {
  const expected = true;
  const input = "1";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

test("Testing contains multiple numbers -- success", () => {
  const expected = true;
  const input = "1big2fat3noob";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

test("empty input -- success", () => {
  const expected = false;
  const input = "";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

test("Testing symbols -- success", () => {
  const expected = false;
  const input = "$%&$@)";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

// in javascript " " === 0
test("Testing spaces -- success", () => {
  const expected = false;
  const input = "DROP ";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});

test("Testing brackets -- success", () => {
  const expected = false;
  const input = "[]";
  const got = mut.containsNumbers(input);
  expect(got).toBe(expected);
});
