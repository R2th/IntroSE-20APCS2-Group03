### សួស្តី (suosdei or suostei)
In my last [article](https://viblo.asia/p/khmer-to-romanized-character-conversion-Ljy5VpBGZra), we have implemented an algorithm for converting Khmer character to Roman character. The algorithm is very easy to implement where we just replace Khmer alphabets with English alphabets. By testing on few word, I though that my algorithm is ok and it's ready for production. 
### Eyes opening about  Khmer Romanization
However, after I met Mr. [Chem Vatho](https://www.facebook.com/chem.vatho) who proposed to me the idea of Khmer Romanization. During our meeting,  he had taught and shown me about the complexity of Khmer linguistic especially abput Khmer Romanization. He had point out many flaws of my  algorithm where it could not produce a correct Roman word for some conditions. Moreover, he drew flow of the complex rule of Khmer Romanization to me as a guide line for improving my algorithm. It's an eyes opening for me about the complexity of Khmer language. 

### Refactor the algorithm 
After my meeting with Mr. Vatho, now we can improve our algorithm here.

In the file `consonant.go`,  we use it for checking Khmer character to is it in group `អ` or `អ៊` since each group of consonant can affect to Raman character of next vowel.
```go
//consonant.go
package romanization

func IsKorGroup(ch rune) bool {
	korList := map[rune]string{
		6018: "k",   //គ
		6019: "kh",  //ឃ
		6020: "ng",  //ង
		6023: "ch",  //ជ
		6024: "chh", //ឈ
		6025: "nh",  //ញ
		6028: "d",   //ឌ
		6029: "th",  //ឍ
		6033: "t",   //ទ
		6034: "th",  //ធ
		6035: "n",   //ន
		6038: "p",   //ព
		6039: "ph",  //ភ
		6040: "m",   //ម
		6041: "y",   //យ
		6042: "r",   //រ
		6043: "l",   //ល
		6044: "v",   //វ
	}

	_, isKorWork := korList[ch]
	return isKorWork
}

func IsConsonant(ch rune) bool {
	consonantList := map[rune]string{
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
		6047: "s",   //ស
		6048: "h",   //ហ
		6049: "l",   //ឡ
		6050: "a",   //អ
	}

	_, isConsonant := consonantList[ch]
	return isConsonant
}

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
		6047: "s",   //ស
		6048: "h",   //ហ
		6049: "l",   //ឡ
		6050: "a",   //អ
		6051: "a",   //ឣ
		6052: "a",   //ឤ

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
	}
	if r_ch, isMatch := wordsList[ch]; isMatch {
		return r_ch
	}

	return ""
}
```

In the file `vowel.go`,  we use it for checking if the before Khmer character to is it in group `អ` or `អ៊`, so it could return the correct Raman alphabet. Moreover, we also implement logic to check for some special cases of Khmer vowel.
```go
//vowel.go
package romanization

var vowelForK = map[rune]string{
	6070: "a",   //ា
	6071: "e",   //ិ
	6072: "ei",  //ី
	6073: "oe",  //ឹ
	6074: "eu",  //ឺ
	6075: "o",   //ុ
	6076: "ou",  //ូ
	6077: "uo",  //ួ
	6078: "aeu", //ើ
	6079: "oea", //ឿ
	6080: "ie",  //ៀ
	6081: "e",   //េ
	6082: "ae",  //ែ
	6083: "ai",  //ៃ
	6084: "ao",  //ោ
	6085: "au",  //ៅ
	6086: "am",  //ំ
	6087: "ah",  //ះ
	6088: "ak",  //◌ៈ
	6089: "",    //=៉
	6091: "",    //់
	6092: "r",   //៌
	6095: "a",   //៏
	6096: "oa",  // ័
	6098: "",    //=្
}

var vowelForKor = map[rune]string{
	6070: "ea",  //ា
	6071: "i",   //ិ
	6072: "i",   //ី
	6073: "ue",  //ឹ
	6074: "ueu", //ឺ
	6075: "u",   //ុ
	6076: "u",   //ូ
	6077: "uo",  //ួ
	6078: "au",  //ើ
	6079: "oea", //ឿ
	6080: "ie",  //ៀ
	6081: "e",   //េ
	6082: "eae", //ែ
	6083: "ey",  //ៃ
	6084: "ou",  //ោ
	6085: "ov",  //ៅ
	6086: "um",  //ំ
	6087: "eah", //ះ
	6088: "eak", //◌ៈ
	6089: "",    //=៉
	6091: "",    //់
	6092: "r",   //៌
	6095: "a",   //៏
	6096: "oa",  // ័
	6098: "",    //=្
}

func IsVowel(ch rune) bool {
	_, isVowel := vowelForK[ch]

	return isVowel
}

func IsSuffixableVowel(ch rune) bool {
	suffixableVowelList := map[rune]string{
		6070: "ea", //ា => ាំ
		6071: "i",  //ិ => ិះ
		6075: "u",  //ុ => ុះ
		6081: "e",  //េ => េះ
		6084: "ou", //ោ => ោះ
		6086: "am", //ំ => ំុ
		6096: "oa", // ័
	}

	_, isSpecial := suffixableVowelList[ch]
	return isSpecial
}

func SpecialVowel(first rune, second rune, isKor bool) string {
	var specialVowelList map[rune]string
	if isKor {
		specialVowelList = map[rune]string{
			12161: "um",   //ំ => ំុ, 6086 + 6075 = 12161
			12156: "oam",  //ា => ាំ, 6070 + 6086 = 12156
			18176: "eang", //ាំង, 6070 + 6086 + 6020= 18176
			12168: "eh",   //េ => េះ, 6081 + 6087 = 12168
			12162: "uh",   //ុ => ុះ, 6075 + 6087 = 12162
			12171: "uoh",  //ោ => ោះ, 6084 + 6087 = 12171
			12158: "is",   //ិ => ិះ, 6071 + 6087 = 12158
			12116: "eang", //័ង , 6096 + 6020 = 12116
			12112: "eak",  //័ក , 6096 + 6016 = 12112
			12137: "ey",   //័យ , 6096 + 6041 = 12137
		}
	} else {
		specialVowelList = map[rune]string{
			12161: "om",  //ំ => ំុ, 6086 + 6075 = 12161
			12156: "am",  //ា => ាំ, 6070 + 6086 = 12156
			18176: "ang", //ាំង, 6070 + 6086 + 6020= 18176
			12168: "eh",  //េ => េះ, 6081 + 6087 = 12168
			12162: "oh",  //ុ => ុះ, 6075 + 6087 = 12162
			12171: "aoh", //ោ => ោះ, 6084 + 6087 = 12171
			12158: "eh",  //ិ => ិះ, 6071 + 6087 = 12158
			12116: "ang", //័ង , 6096 + 6020 = 12116
			12112: "ak",  //័ក , 6096 + 6016 = 12112
			12137: "ai",  //័យ , 6096 + 6041 = 12137
		}
	}

	if r_ch, isMatch := specialVowelList[first+second]; isMatch {
		return r_ch
	}

	if IsConsonant(second) {
		return VowelWord(first, isKor) + Roman(second)
	}

	return VowelWord(first, isKor) + VowelWord(second, false)
}

func VowelWord(ch rune, isKor bool) string {
	var wordsList map[rune]string
	if isKor {
		wordsList = vowelForKor
	} else {
		wordsList = vowelForK
	}
	if r_ch, isMatch := wordsList[ch]; isMatch {
		return r_ch
	}

	return ""
}
```

In the file `romanization.go`,  we use it for combind the logic when we just implemented above and return it result to the user.
```go
package romanization

func Romanize(word string) string {
	characters := []rune(word)
	result := ""
	rw := ""
	isThreeCh := false
	var vCh rune
	var lastCh rune

	for index, ch := range characters {
		// is Suffixable vowel? //ំ, ា, /េ, /ុ ,ោ, /ិ
		if IsSuffixableVowel(ch) && vCh == 0 {
			vCh = ch
			continue
		} else if vCh != 0 && (vCh+ch) == 12156 && isThreeCh == false {
			// if ាំ  special case
			isThreeCh = true
			continue
		}

		rw = Roman(ch)
		if isThreeCh {
			// if ch = ង
			if ch == 6020 {
				rw = SpecialVowel(12156, ch, IsKorGroup(lastCh))
			} else {
				rw = SpecialVowel(6070, 6086, IsKorGroup(lastCh)) + rw
			}

			isThreeCh = false
			vCh = 0
		} else if vCh != 0 {
			rw = SpecialVowel(vCh, ch, IsKorGroup(lastCh))
			vCh = 0
		} else if IsVowel(ch) {
			rw = VowelWord(ch, IsKorGroup(lastCh))
		} else if IsConsonant(lastCh) && IsConsonant(ch) {
			// ជ + ន = ជ + អr + ន
			// ជ + ណ = ជ + អ + ណ
			if index == 1 && lastCh == 6050 { //6050 = អ
				// if អ at the begin not cound
				rw = rw
			} else if IsKorGroup(lastCh) {
				rw = "o" + rw
			} else {
				rw = "a" + rw
			}
		}

		lastCh = ch
		result = result + rw
	}

	return result
}
```
### Testing
Now, it done, let run and test it.
```sh
./watch.sh
```
![](https://images.viblo.asia/59d55d5e-757b-4a56-8fb1-ccacd70687f3.png)
![](https://images.viblo.asia/342b6e17-6ec9-4e41-bdf6-3ae1b75a9ba4.png)
### Resources
- Source [code](https://github.com/khmerlang/Khmer2Romanized)
- https://unstats.un.org/unsd/geoinfo/UNGEGN/docs/8th-uncsgn-docs/inf/8th_UNCSGN_econf.94_INF.30_corr1.pdf
- https://en.wiktionary.org/wiki/Wiktionary:Khmer_romanization
- https://www.loc.gov/catdir/cpso/romanization/khmer.pdf
- http://www.eki.ee/wgrs/rom1_km.pdf

### Conclussion
Khmer is one of the most complex linguistic system in the world. Khmer Romanization is just a small tip of the iceberg of this complex langauge system. However, when we have an expert at our side, we  could implement the algorithm to solve this system with ease. Therefore, I am every thankfull to  Mr. [Chem Vatho](https://www.facebook.com/chem.vatho) that taking his take for teaching, guiding and supporting me for this chalenge.