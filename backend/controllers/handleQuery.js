import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function queryHandler(q) {
    // Load and clean corpus
    const filePath = path.resolve(__dirname, "../corpus/leetcode_title.txt");
    const cachedQuestions = fs
        .readFileSync(filePath, "utf-8")
        .split("\n")
        .map(line => line.trim().toLowerCase())
        .filter(Boolean); // remove empty lines

    // Normalize query
    q = String(q).toLowerCase().trim();
    const terms = q.split(/\s+/);

    // Term Frequency
    function getTF(doc, terms) {
        const docWords = doc.split(/\s+/);
        const tf = {};
        for (let term of terms) {
            const count = docWords.filter(word => word === term).length;
            tf[term] = docWords.length ? count / docWords.length : 0;
        }
        return tf;
    }

    // Inverse Document Frequency
    function getIDF(corpus, terms) {
        const idf = {};
        const N = corpus.length;
        for (let term of terms) {
            let count = 0;
            for (let doc of corpus) {
                const words = doc.split(/\s+/);
                if (words.includes(term)) count++;
            }
            idf[term] = Math.log((N + 1) / (count + 1)) + 1; // smoothed
        }
        return idf;
    }

    // Compute TF-IDF for query
    const idf = getIDF(cachedQuestions, terms);
    const queryTF = getTF(q, terms);
    const queryTFIDF = {};
    for (let term of terms) {
        queryTFIDF[term] = queryTF[term] * idf[term];
    }

    // Score each question
    const scoredResults = cachedQuestions.map((question) => {
        const tf = getTF(question, terms);
        let score = 0;
        for (let term of terms) {
            score += (tf[term] * idf[term]) * (queryTFIDF[term] || 0);
        }
        return { question, score };
    });

    // Sort & return top 9
    scoredResults.sort((a, b) => b.score - a.score);
    return scoredResults.slice(0, 9).map(item => item.question);
}

export default queryHandler;
