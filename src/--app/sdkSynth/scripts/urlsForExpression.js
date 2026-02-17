// const speakers = ['m2', 'f1', 'f2', 'm1'];
const speakers = ['m2', 'f2', 'm1', 'f1'];

export default function urlsForExpression(expression, temp = false) {
    let urlBase = 'https://dthjysrf.duckdns.org/node-learn-eng/audio';
    if (temp) urlBase += '-temp';

    return speakers.map(speaker =>
        `${urlBase}/${expression}_${speaker}.wav`
    );
}