### សួស្តី
It's been two months that I had shift my focus from NLP world to CV. Now let's continue our NLP article. In the past few months, I have been talking with Mr. [Chem Vatho](https://www.facebook.com/chem.vatho) who has very awesome knowledge about Khmer language. During our discussion, we share many great idea related to applications of Khmer language and one of his idea really stand out to me is converting from Khmer to Romanized character.

### What/why?
Khmer to Romanized character is a process of converting Khmer alphabet into Romanized alphabet. This conversion is very useful  for many types of applications. For example, it serves as a supporting tool for foreigner who learn to read Khmer words. Another example, we could use it further to develop a text to speech application.  Be side these two example, there are many other applications that can use or extend from Khmer to Romanized character system.

Enough talk, let's has some fun. :)

### How to implementation IT
For this application, I am going to implemnt in `Go` programing langauge. Therefore make sure you have `Go` install on your system. And if you want to learn more about Golang, there are serial of articles written by Mr. [Norin](https://viblo.asia/u/norin) where you can go and check it out [here](https://viblo.asia/p/putting-together-a-golang-app-part-i-Qbq5QLJXlD8).

First, let's start on logic of convert Khmer to Romanized.
```go
package romanization

func Roman(ch rune) string {
	wordsList := map[rune]string{
		6016: "k",   //ក
		6017: "kh",  //ខ
		6018: "k",   //គ
		6019: "kh",  //ឃ
		6020: "ng",  //ង
		6021: "ch",  //ច
		6022: "chh", //ឆ
		6023: "ch",  //ជ
		6024: "chh", //ឈ
		6025: "nh",  //ញ
		6026: "d",   //ដ
		6027: "th",  //ឋ
		6028: "d",   //ឌ
		6029: "th",  //ឍ
		6030: "n",   //ណ
		6031: "t",   //ត
		6032: "th",  //ថ
		6033: "t",   //ទ
		6034: "th",  //ធ
		6035: "n",   //ន
		6036: "b",   //ប
		6037: "ph",  //ផ
		6038: "p",   //ព
		6039: "ph",  //ភ
		6040: "m",   //ម
		6041: "y",   //យ
		6042: "r",   //រ
		6043: "l",   //ល
		6044: "v",   //វ
		6045: "s",   //ឝ
		6046: "s",   //ឞ
		6047: "sa",  //ស
		6048: "h",   //ហ
		6049: "l",   //ឡ
		6050: "a",   //អ
		6051: "a",   //ឣ
		6052: "aa",  //ឤ
		6053: "I",   //ឥ
		6054: "I",   //ឦ
		6055: "U",   //ឧ
		6056: "Uu",  //ឨ
		6057: "Uu",  //ឩ
		6058: "Au",  //ឪ
		6059: "Ry",  //ឫ
		6060: "Ryy", //ឬ
		6061: "Ly",  //ឭ
		6062: "Lyy", //ឮ
		6063: "E",   //ឯ
		6064: "Ai",  //ឰ
		6065: "Ao",  //ឱ
		6066: "Ao",  //ឲ
		6067: "Au",  //ឳ
		6070: "aa",  //ា
		6071: "e",   //ិ
		6072: "ei",  //ី
		6073: "oe",  //ឹ
		6074: "eu",  //ឺ
		6075: "o",   //ុ
		6076: "au",  //ូ
		6077: "uo",  //ួ
		6078: "ae",  //ើ
		6079: "ue",  //ឿ
		6080: "ie",  //ៀ
		6081: "e",   //េ
		6082: "e",   //ែ
		6083: "ai",  //ៃ
		6084: "ao",  //ោ
		6085: "aw",  //ៅ
		6086: "om",  //ំ
		6087: "ah",  //ះ
		6091: "a",   //់
		6092: "r",   //៌
		6095: "a",   //៏

		6100: ".",     //។
		6101: ".",     //៕
		6102: ":",     //៖
		6104: ".etc.", //៘

		6128: "0", //៰
		6129: "1", //៱
		6130: "2", //៲
		6131: "3", //៳
		6132: "4", //៴
		6133: "5", //៵
		6134: "6", //៶
		6135: "7", //៷
		6136: "8", //៸
		6137: "9", //៹
		6112: "0", //០
		6113: "1", //១
		6114: "2", //២
		6115: "3", //៣
		6116: "4", //៤
		6117: "5", //៥
		6118: "6", //៦
		6119: "7", //៧
		6120: "8", //៨
		6121: "9", //៩
		6098: "",  //=្
		6089: "",  //=៉
	}
	if r_ch, isMatch := wordsList[ch]; isMatch {
		return r_ch
	}

	return string(ch)
}

func Romanize(word string) string {
	characters := []rune(word)
	result := ""

	for _, ch := range characters {
		result = result + Roman(ch)
	}

	return result
}
```
In code above, we map all Khmer alphabets to  its associated Romanized alphabets. Then in `Romanize` we get the Khmer sentences then loop to check and replace on every single character.


Next, we implement a simple web server to listen the request from client.
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	rm "github.com/khmerlang/Khmer2Romance/models/romanization"
)

type KhmerWords struct {
	Sentences string `json:"sentences"`
}

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})

		api.POST("/kh2rm", Kh2RmHandler)
	}

	// Start and run the server
	router.Run(":3000")
}

func Kh2RmHandler(c *gin.Context) {
	var sentences KhmerWords
	c.BindJSON(&sentences)

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"message": rm.Romanize(sentences.Sentences),
	})
}

```
This code will create a web server and listen on port `3000`. When client request to `/api/kh2rm`, it parse submited Khmer sentences into Romanized and respond back to client.

The moment of true.
Let's run it.
```sh
./watch.sh
```
![](https://images.viblo.asia/7f2e76e7-d7f6-41eb-9fc6-40c22c60e7fe.png)
It running now.
Let make some request.
![](https://images.viblo.asia/3a492e3c-593c-4282-96f9-b21e1fa51afd.png)

And compare it with google.
![](https://images.viblo.asia/a6667931-04e5-4fb7-9db0-594e8f80355a.png)

Cool it works :)
### Resources
- Source [code](https://github.com/khmerlang/Khmer2Romanized)
- https://en.wikipedia.org/wiki/Khmer_script
- https://r12a.github.io/scripts/khmer/block
### What next
We have implemented a small application for converting Khmer character in Latin character. However, this application cannot convert some Khmer words into Latin due to the complexity of those words. Hopefully, after a meeting and guiding by Mr. [Chem Vatho](https://www.facebook.com/chem.vatho), we could improve our application to make it works well in any case.  Stay tuned for our near future article :)