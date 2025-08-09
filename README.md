# SearchEngine

## This is a DSA based Search Engine for Leetcode problems.

*TF* : term frequency -> No of times a "keyword" appears in a document

*IDF* : inverse document frequency -> indicates how rare a "keyword" is.

*TF-IDF(IMPORTANCE) = TF X IDF*

```sh
tf (t,d) = f(t,d) / sigma f(t,d)
```

```sh
idf(t,D) = log(N / nt)
```
D = corpus , N = no of documents , nt = no of docs containing t 



## Tech Stack 

*Frontend* : Nextjs 
*Backend* : ExpressJS and NodeJS
*Scrapper* : Python
*Deployment* : Vercel
