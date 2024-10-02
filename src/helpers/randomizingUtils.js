function pullRandomFromArray(array) {
    const index = Math.floor(Math.random() * array.length);
    const item = array[index];
    array.splice(index, 1);
    return item;
}

/**
 * gets the randomized pard from array, with appointed length;
 * without the length it would return whole the array randomized
 * (while the original array would be empty)
 */
export function getRandomizedPart(data, length = data.length) {
    const result = [];
    while(result.length < length) {
        result.push(pullRandomFromArray(data));
    }
    return result;
}