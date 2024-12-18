export default function parseWord(word) {
    if (word[0] === '/') {
        const parts = word.split('/');
        const wordVariants = [];
        for (let i = 1; i * 2 < parts.length; i++) {
            // console.log(parts[i], parts[i + (parts.length - 1) / 2]);
            const commentDetails = parts[i][0] !== '*'
                ? { comment: parts[i] }
                : { comment: parts[i].substring(1), canonicComment: true };
            wordVariants.push({
                variant: parts[i + (parts.length - 1) / 2],
                ...commentDetails
            });
        }
        console.log(wordVariants);
        // console.log(JSON.stringify(wordVariants));
        return JSON.stringify(wordVariants);
    }

    return word;
}