In my previous article, we descause about word correction using SymSpell algoritm where it check and suggestion a typo word with list of similar words.  However, However, there are many other algorithms for us to explore. Thoerefore, in this post we are going to reimplement on other spelling algorithm call DeepSpelling.  What is DeepSpelling? Deep Spelling is a spelling correction algorithm which using deep learning(seq2seq) approach.

### How seq2seq ?
Seq2seq is a  a method of encoder-decoder based machine translation that maps an input of sequence to an output of sequence with a tag and attention value. it is a popular deep learning approach that we use for Machine Translation, Text Summarization, Conversational Modeling, Image Captioning, ChatBot, and more. Therefore, we could use this mechanism to build our Khmer spelling correction. As we know a seq2seq or (Encoder Decoder) consists of two main parts :

**1. Encoder:**

The encoder simply takes the input data, and train on it then it passes the last state of its recurrent layer as an initial state to the first recurrent layer of the decoder part ( in our case the encoder is an incoreect Khmer sentences).
```
Encoder input : Incorrect Khmer sentences
```

**2. Decoder**

The decoder takes the last state of encoder’s last recurrent layer and uses it as an initial state to its first recurrent layer , the input of the decoder is the sequences that we want to get ( in our case the Coreect Khmer sentences).
```
Encoder input : Correct Khmer sentences
```

### Data collection
In order to build a good deep learning model, it needs to learn from lots of data(in our case Khmer sentences). So we need to gather as much as Khmer text from any sources we could find. However, there isn't sources that we could get a copus of Khmer sentences for free. Therefore, we need to collect data by ourselves. Now, let's write simple golang script to scrap the Khmer text from some popular Khmer website.

**Prerequisites**
-  [Go](https://golang.org/): The Go programming language
-  [goquery](https://github.com/PuerkitoBio/goquery):  is a package which help finding the content of article HTML in go.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func SeperateSentences(sentences string) []string {
	sentences = strings.Replace(sentences, " ", "", -1) //remove space
	sentences = strings.Replace(sentences, "​", "", -1) //remove zero space
	return strings.SplitAfter(sentences, "។")           // separate sentences into sentence
}

func GetContent(file *os.File, index int) {
	// Make HTTP request
	response, err := http.Get("https://www.khmerload.com/news/" + strconv.Itoa(index))
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()
	if response.StatusCode != 200 {
		fmt.Println(response.StatusCode)
		return
	}

	// Create a goquery document from the HTTP response
	document, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		log.Fatal("Error loading HTTP response body. ", err)
	}

	// Get the article content
	document.Find(".article-body .article-content div").Each(func(i int, element *goquery.Selection) {
		text := element.Find("p").Text()
		if text != "" {
			for _, sentence := range SeperateSentences(text) {
				// write to file
				fmt.Fprintln(file, sentence)
			}
		}
	})
}

func main() {
	file, err := os.Create("khmer_compus.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	// 101511 is number of article
	for i := 1; i <= 10; i++ {
		fmt.Println(i)
		GetContent(file, i)
	}
}

```

Then run
```go
go run main.go
```
And we got it. Yay!
![](https://images.viblo.asia/7195e0bf-cb5b-4c3d-99cb-278ed90f0eba.png)

### Resources
- [Source code](https://github.com/khmerlang/ScrapWord)
- https://github.com/mdcramer/Deep-Speeling
- https://medium.com/@BhashkarKunal/spelling-correction-using-deep-learning-how-bi-directional-lstm-with-attention-flow-works-in-366fabcc7a2f
- https://medium.com/scribd-data-science-engineering/neural-spelling-corrections-and-the-importance-of-accuracy-977c0063d20f
- http://pavel.surmenok.com/2017/02/06/improving-deepspell-code/
- https://machinelearnings.co/deep-spelling-9ffef96a24f6
- https://towardsdatascience.com/nlp-sequence-to-sequence-networks-part-2-seq2seq-model-encoderdecoder-model-6c22e29fd7e1
- https://towardsdatascience.com/how-to-implement-seq2seq-lstm-model-in-keras-shortcutnlp-6f355f3e5639
- https://www.devdungeon.com/content/web-scraping-go
### What next?
We have just collected the data needed to train our seq2seq model, in the next article we going to implement a seq2seq model and train it using our collected data in this article.
Happy coding! :)