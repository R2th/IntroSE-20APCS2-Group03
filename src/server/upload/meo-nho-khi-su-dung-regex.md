## Lời Mở Đầu
Regular expression, hay còn được gọi là 'regex', thường được sử dụng trong xử lý string. Dưới đây là những tip nhỏ của mình khi sử dụng Regex.

## Kiểm tra một regex 

Sử dụng method `.test()`

```
let demoString = "My test string";
let demoRegex = /string/;
testRegex.test(demoString);
```

## Kiểm tra multiple patterns

Sử dụng OR operator `|`

`const regex = /yes|no|maybe/;`

## Tách kết quả đều tiên vào 1 variable

Sử dụng function `.match() `

`const find = "Hello World!".match(/hello/i); // "Hello"`

## Tách tất cả các kêt quả vào 1 array

Sử dụng function `g`

```
const demoString = "Demo demo deMO";
const regexWithAllMatches = /Demo/gi;
demoString.match(regexWithAllMatches); // ["Demo", "demo", "deMO"]
```

## Tìm kiếm tất cả các number
Sử dụng [0-9], hoặc sử dụng shorthand `\d`
```
const digitsRegex = /\d/g;
const stringWithDigits = "My dog eats $70.00 worth of food a week.";

stringWithDigits.match(digitsRegex); // ["7", "0", "0", "0"]
```

## Tìm kiếm tất cả các non-number
Sử dụng shorthand `\D` thay vì `\d`
```
const nonDigitsRegex = /\D/g;
const stringWithLetters = "100 degrees";

stringWithLetters.match(nonDigitsRegex); // [" ", "d", "e", "g", "r", "e", "e", "s"]
```

## Tìm kiếm kết quả phù hợp với 1 trong số các điều kiện

```
// To match "cat", "BAT", "fAT", "mat"
const regexWithWildcard = /.at/gi;
const testString = "cat BAT cupcakes fAT mat doggo";
const allMatchingWords = testString.match(regexWithWildcard); // ["cat", "BAT", "fAT", "mat"]
```

## Tìm kiếm kí tự có tồn tại trong chuỗi
Sử dụng function `?`

```
const britishSpelling = "colour";
const americanSpelling = "Color";
const languageRegex = /colou?r/i;

languageRegex.test(britishSpelling); // true
languageRegex.test(americanSpelling); // true
```

## Tìm kiếm non-whitespace  trong chuỗi

```
const sentenceWithWhitespace = "D o g"
const nonWhiteSpaceRegex = /\S/g;
sentenceWithWhitespace.match(nonWhiteSpaceRegex); // ["D", "o", "g"]
```

## Lời Kết
Sử dụng regex giúp bạn giảm thời gian viết logic code đi rất nhiều nên hãy cố gắng lưu lại những đoạn regex cần thiết để sử dụng trong tương lai 
Have a good day :D