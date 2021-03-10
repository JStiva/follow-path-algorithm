export const checkIsStringValid = (asciiMapString) => {
    const startChar = asciiMapString.split("@");
    if (startChar.length !== 2) {
        return false;
    }

    const endChar = asciiMapString.split("x");
    if (endChar.length !== 2) {
        return false;
    }
    return true;
};

export const createMatrixFromString = (asciiMapString) => {
    const splitString = asciiMapString.split("\n");

    const longestString = splitString.reduce(
        (a, b) => {
            return a.length > b.length ? a : b;
        }
    ).length;

    let startPosition = [];
    const matrix = splitString.map((row, index) => {
        const startColumnIndex = row.indexOf("@");
        if (startColumnIndex !== -1) {
            startPosition = [index, startColumnIndex];
        }

        if (row.length < longestString) {
            // add whitespace to full len
            row = row + " ".repeat(longestString - row.length);
        }
        return Array.from(row);
    })
    return [startPosition, matrix];
};

export const pathFollowingAlgorithm = (asciiMapString) => {
    let collectedLetters = [];
    let pathCharacters = [];

    if (!checkIsStringValid(asciiMapString)) {
        throw new Error("String is not valid!")
    }

    const [startPosition, asciiMapMatrix] = createMatrixFromString(asciiMapString);

    let previousPosition = [startPosition[0], startPosition[1]];

    const isCurrentLetter = (currentChar) => {
        return /^[a-zA-Z]$/.test(currentChar);
    }

    const addToCollectedLetters = (currentChar) => {
        if (collectedLetters.indexOf(currentChar) === -1) {
            collectedLetters.push(currentChar);
        }
    }

    const checkDirection = (i, j, m, n, k, p, isLetter, checkDir = false) => {
        // visited or no path
        if (asciiMapMatrix[m][n] === " ") {
            return false;
        }

        // current char is + and don't go back to previous if letter because they are unvisited
        if (asciiMapMatrix[i][j] === "+" && !(m === previousPosition[0] && n === previousPosition[1])) {
            if (k === previousPosition[p]) return false;
            startPosition[0] = m;
            startPosition[1] = n;
            return true;
        }

        // letter on turn
        if (isLetter && !checkDir && !(m === previousPosition[0] && n === previousPosition[1])) {
            startPosition[0] = m;
            startPosition[1] = n;
            return true;
        }

        // check direction
        if ((m === previousPosition[0] || n === previousPosition[1]) && !(m === previousPosition[0] && n === previousPosition[1])) { // case for visited letter
            startPosition[0] = m;
            startPosition[1] = n;
            return true;
        }
        return false;
    };

    while (asciiMapMatrix[startPosition[0]][startPosition[1]] !== "x") {
        const currentChar = asciiMapMatrix[startPosition[0]][startPosition[1]];
        const isLetter = isCurrentLetter(currentChar);

        const i = startPosition[0];
        const j = startPosition[1];

        const goLeft = j - 1 < 0 ? false : checkDirection(i, j, i, j - 1, i, 0, isLetter);
        const goRight = (j + 1 > asciiMapMatrix[0].length - 1) ? false : checkDirection(i, j, i, j + 1, i, 0, isLetter);
        const goUp = (i - 1 < 0) ? false : checkDirection(i, j, i - 1, j, j, 1, isLetter);
        const goDown = (i + 1 > asciiMapMatrix.length - 1) ? false : checkDirection(i, j, i + 1, j, j, 1, isLetter);

        if (goLeft + goRight + goUp + goDown !== 1) {
            if (isLetter) {
                const left = j - 1 < 0 ? false : checkDirection(i, j, i, j - 1, i, 0, isLetter, true);
                const right = (j + 1 > asciiMapMatrix[0].length - 1) ? false : checkDirection(i, j, i, j + 1, i, 0, isLetter, true);
                const up = (i - 1 < 0) ? false : checkDirection(i, j, i - 1, j, j, 1, isLetter, true);
                const down = (i + 1 > asciiMapMatrix.length - 1) ? false : checkDirection(i, j, i + 1, j, j, 1, isLetter, true);

                if (left + right + up + down !== 1) {
                    break
                } else {
                    previousPosition[0] = i;
                    previousPosition[1] = j;
                    if (isCurrentLetter(currentChar)) {
                        addToCollectedLetters(currentChar)
                        pathCharacters.push(currentChar);
                    } else {
                        pathCharacters.push(currentChar);
                    }
                }
            } else {
                // T-fork!
                break;
            }
        } else {
            previousPosition[0] = i;
            previousPosition[1] = j;
            if (isCurrentLetter(currentChar)) {
                addToCollectedLetters(currentChar)
                pathCharacters.push(currentChar);
            } else {
                pathCharacters.push(currentChar);
            }
        }
    }

    pathCharacters.push(asciiMapMatrix[startPosition[0]][startPosition[1]]);

    return [collectedLetters.length > 0 ? collectedLetters.join("") : "", pathCharacters.length > 0 ? pathCharacters.join("") : ""];
};
