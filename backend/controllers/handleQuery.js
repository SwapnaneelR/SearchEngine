import fs from "fs";

function queryHandler(q) {
    let cachedQuestions = [];
    let cachedURLs = [];

    const qns = fs.readFileSync("../corpus/leetcode_title.txt", "utf8");
    cachedQuestions = qns.split("\n");

    const urls = fs.readFileSync("../corpus/leetcode_urls.txt", "utf8");
    cachedURLs = urls.split("\n");

    const results = [];
    q = String(q);
    const terms = q.toLowerCase().split(" ");

    function getTF(doc, terms) {
        const docWords = doc.toLowerCase().split(" ");
        const tf = {};
        for (let term of terms) {
            const count = docWords.filter(word => word === term).length;
            tf[term] = count / docWords.length;
        }
        return tf;
    }

    function getIDF(corpus, terms) {
        const idf = {};
        const N = corpus.length;
        for (let term of terms) {
            let count = 0;
            for (let doc of corpus) {
                if (doc.toLowerCase().includes(term)) {
                    count++;
                }
            }
            idf[term] = Math.log((N + 1) / (count + 1)) + 1;
        }
        return idf;
    }

    function getSimilarity(tfidf1, tfidf2) {
        let dot = 0, mag1 = 0, mag2 = 0;
        for (let term in tfidf1) {
            dot += (tfidf1[term] || 0) * (tfidf2[term] || 0);
            mag1 += Math.pow(tfidf1[term] || 0, 2);
            mag2 += Math.pow(tfidf2[term] || 0, 2);
        }
        if (mag1 === 0 || mag2 === 0) return 0;
        return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
    }

    const idf = getIDF(cachedQuestions, terms);
    const queryTF = getTF(q, terms);
    const queryTFIDF = {};
    for (let term of terms) {
        queryTFIDF[term] = queryTF[term] * idf[term];
    }

    const scoredResults = cachedQuestions.map((question, idx) => {
        const tf = getTF(question, terms);
        const tfidf = {};
        for (let term of terms) {
            tfidf[term] = tf[term] * idf[term];
        }
        const score = getSimilarity(queryTFIDF, tfidf);
        return {
            question,
            url: cachedURLs[idx],
            score
        };
    });

    scoredResults.sort((a, b) => b.score - a.score);

    return scoredResults.slice(0, 9);  
}

export default queryHandler;
