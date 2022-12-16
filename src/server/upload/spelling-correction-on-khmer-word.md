In my previous article, we had implemented an algorithm to segment Khmer word from scratch where we can search those words in our dictionary to check whether it is a correct word or not. This post, we are going to implement a spelling correction on Khmer word using Symmetric Delete Spelling Correction (SymSpell) algorithm. We choise this algorithm since a author of this [post](https://medium.com/@wolfgarbe/1000x-faster-spelling-correction-algorithm-2012-8701fcd87a5f) claims that it is 1000x Faster Spelling Correction algorithm. So what is SymSpell?

#### What is SymSpell Algorithm?
> The Symmetric Delete spelling correction algorithm reduces the complexity of edit candidate generation and dictionary lookup by using deletes only instead of deletes +transposes + replaces + inserts. It is six orders of magnitude faster (for edit distance=3) and language independent.

SymsSpell is an algorithm to find all strings within an maximum edit distance from a huge compus of words in very short time. It is faster than other algorithms since only deletes are required, no transposes + replaces + inserts. Transposes + replaces + inserts of the input term are transformed into deletes of the dictionary term. Therefore, It can be used for spelling correction and fuzzy string search.

Now, let's play with it.
#### Implement the SymSpell
The [SymSpell](https://github.com/wolfgarbe/symspell) algorithm was implemented in **C#** . However, it has reimplemented into other programming languages such as [Python](https://github.com/mammothb/symspellpy), [Go](https://github.com/sajari/fuzzy), [Javascript](https://github.com/Lundez/JavaSymSpell) and more...

In post, we are going to use [SymSpell](https://github.com/sajari/fuzzy) library written in [golang](https://golang.org/) developed by [sajari](https://www.sajari.com/) team.

First, you need to have golang installed on your machine. Then we can add SymSpell library into our go src via:
```
go get github.com/sajari/fuzzy
```
Next, we import needed packages for our demo.
```go
import (
	"fmt"
	"github.com/sajari/fuzzy"
)
```

And we init the SymSpell model with some cofigure value.
```go
model := fuzzy.NewModel()
model.SetThreshold(1)
model.SetDepth(5)
```
Then, we load words and fit it into the model.
```
words := []string{"...", "..."}
model.Train(words)
```
Finally, we can use the model to give a suggestion word or words.
```go
// Check Spelling
fmt.Println("កកែករ => ", model.SpellCheck("កកែករ"))
fmt.Println(" \"កលិ\". Did you mean?: ", model.Suggestions("កលិ", false))
```


Full code:
```go
package main

import (
	"fmt"
	"github.com/sajari/fuzzy"
)

func main() {
	model := fuzzy.NewModel()
	model.SetThreshold(1)
	model.SetDepth(5)
	words := []string{
		"កក", "កករ", "កកាត", "កកាយ", "កកិចកកុច",
		"កកិត", "កកិល", "កកូរ", "កកេបកកាប", "កកេរ", "កកេះ",
		"កកែកកកោក", "កកែកករ", "កកែងកកោង", "កកែប", "កកោក",
		"កកោស", "កកោះ", "កក់", "កក៌ដ", "កក្កដ", "កក្រិត", "កក្រើក",
	}
	fmt.Println("Start train complete")
	fmt.Println(len(words))
	model.Train(words)
	fmt.Println("Train complete")

	// Check Spelling
	fmt.Println("\nSPELL CHECKS")
	fmt.Println("កកែករ => ", model.SpellCheck("កកែករ"))
	fmt.Println("កោះ => ", model.SpellCheck("កោះ"))
	fmt.Println("កកិ => ", model.SpellCheck("កកិ"))

	// Suggest completions
	fmt.Println("\nQUERY SUGGESTIONS")
	fmt.Println(" \"កលិ\". Did you mean?: ", model.Suggestions("កលិ", false))

	// save the trained model
	model.Save("modal.dict")
}

```

Run build and run code:
```sh
go build main.go
./main
```
![](https://images.viblo.asia/499faea1-a4d0-4a97-b2ee-cb5774150c1d.png)

Looking good.
Awesome. :)

#### Resources
- Source Code: https://gist.github.com/RathanakSreang/c8ae832c2268cc675c466676e69d74c4
- https://medium.com/@wolfgarbe/1000x-faster-spelling-correction-algorithm-2012-8701fcd87a5f
- https://github.com/wolfgarbe/symspell
- https://github.com/sajari/fuzzy
- https://machinelearnings.co/deep-spelling-9ffef96a24f6
- https://medium.com/scribd-data-science-engineering/neural-spelling-corrections-and-the-importance-of-accuracy-977c0063d20f
- https://towardsdatascience.com/symspell-vs-bk-tree-100x-faster-fuzzy-string-search-spell-checking-c4f10d80a078

#### What's next?
We have just experimented with one of the most popular spelling correction algorithms where its performance is really fast.  However, there are many other algorithms that we can use for this task such as DeepSpelling where they use deep learning(seq2seq) to correct a spelling mistake. Therefore, we will discuss more detail about DeepSpelling in our next article. Stay tuned. :)