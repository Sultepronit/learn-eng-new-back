const urlBase = 'https://dthjysrf.duckdns.org/node-learn-eng/audio';
const speakers = ['m2', 'f1', 'f2', 'm1'];

export default function urlsForExpression(expression) {
    return speakers.map(speaker =>
        `${urlBase}/${expression}_${speaker}.wav`
    );
}