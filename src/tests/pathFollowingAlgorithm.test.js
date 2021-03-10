import { pathFollowingAlgorithm, checkIsStringValid, createMatrixFromString } from "../utils/pathFollowingAlgorithm";

test("String is valid", () => {
    expect(checkIsStringValid(`  @---A---+
          |
  x-B-+   C
      |   |
      +---+`)).toBe(true);
});

test("String is not valid", () => {
    expect(checkIsStringValid(`  @--A---+
        |
  B-+   C
    |   |
    +---+`)).toBe(false);
});

test("Create matrix from string", () => {
    expect(createMatrixFromString(`  @---A---+
          |
  x-B-+   C
      |   |
      +---+`)).toStrictEqual([[0, 2], [[" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"], [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"], [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"], [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"]]]);
});

test("Get letters and path from string Map1", () => {
    expect(pathFollowingAlgorithm(`  @---A---+
          |
  x-B-+   C
      |   |
      +---+`)).toStrictEqual(["ACB", "@---A---+|C|+---+|+-B-x"]);
});

test("Get letters and path from string Map2", () => {
    expect(pathFollowingAlgorithm(`  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`)).toStrictEqual(["ABCD", "@|A+---B--+|+--C-+|-||+---D--+|x"]);
});

