# SearchEngine

## This is a DSA based Search Engine for Leetcode problems.

*TF* : term frequency -> No of times a "keyword" appears in a document

*IDF* : inverse document frequency -> indicates how rare a "keyword" is.

*IMPORTANCE = TF X IDF*

```sh
tf (t,d) = f(t,d) / sigma f(t,d)
```

```sh
idf(t,D) = log(N / nt)
```
D = corpus , N = no of documents , nt = no of docs containing t 



### Similarity

It is given by cosine identity : 

```sh
S = ( v . d ) / ( |v| |d| )
```

Similaity represent the actual similarity of query string with our document value 

