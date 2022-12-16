Nếu bạn đang muốn tìm kiếm một công cụ nào đó để phát hiện loại ngôn ngữ hay phân tích cấu trúc ngữ pháp mà user nhập vào thì sau đây mình xin giới thiệu một công cụ rất hữu ích và tiết kiệm thời gian nhưng nó lại hay bị lãng quên, không được sử dụng và không phổ biến bị ẩn đi trong iOS SDK. Đó chính là NSLinguisticTagger.
### Overview
**NSLinguisticTagger** là class giúp phân tích ngôn ngữ tự nhiên để tag part of speech, từ vựng, xác định tên, thực hiện lemmatization, xác định loại ngôn ngữ và script.

(Các bạn có thể tìm hiểu part of speech và lemmatization [tại đây](https://chienuit.wordpress.com/2016/05/03/nlp-stemming-va-lemmatization/))

Khi bạn tạo một linguistic tagger, bạn chỉ định loại thông tin bạn quan tâm bằng cách chuyển một hoặc nhiều giá trị NSLinguisticTagScheme. Để thông qua đó để nhận được các thông tin mình cần. 

NSLinguisticTagScheme gồm có nhưng loại sau:

1. **Token Type:** property phân loại từng ký tự dưới dạng một từ, dấu chấm câu hoặc khoảng trắng.
2. **Language:** Xác định ngôn ngữ của mỗi token.
3. **Lexical Class:** property phân loại mỗi token theo loại của nó: part of speech for words, loại dấu chấm câu hoặc khoảng trống, v.v.
4. **Name Type:**  phân loại các tokens để xem chúng có phải là một phần của các thực thể được đặt tên theo các loại khác nhau hay không.
5. **Lemma:** cung cấp biểu mẫu gốc của mỗi word token.
### Language Identification:
Bây giờ chứng ta sẽ xác định 1 đoạn text xem nó được viết bằng ngôn ngữ gì? thông qua đoạn code đơn giản dưới đây:
```
let text = "Ceci n'est pas une pipe"
if let language = NSLinguisticTagger.dominantLanguage(for: text) {
    print("The language is: \(language)")
} else {
    print("Unknown language")
}
```
**Kết quả:**

![](https://images.viblo.asia/7094db71-53ec-48c6-aea9-0020154f45c0.png)

### Tokenization:
```
import UIKit

let options = NSLinguisticTagger.Options.omitWhitespace.rawValue | NSLinguisticTagger.Options.joinNames.rawValue
let tagger = NSLinguisticTagger(tagSchemes: NSLinguisticTagger.availableTagSchemes(forLanguage: "en"), options: Int(options))

let inputString = "Hello playground"
tagger.string = inputString

let range = NSRange(location: 0, length: inputString.utf16.count)
tagger.enumerateTags(in: range, scheme: .tokenType, options: NSLinguisticTagger.Options(rawValue: options)) { tag, tokenRange, sentenceRange, stop in
    guard let range = Range(tokenRange, in: inputString) else { return }
    let token = inputString[range]
    print(token)
}
```
**Kết quả:**

![](https://images.viblo.asia/e96cedbb-220c-4634-8ab1-7ebccf0f966b.png)

### Parts of Speech:
```
let options = NSLinguisticTagger.Options.omitWhitespace.rawValue | NSLinguisticTagger.Options.joinNames.rawValue
let tagger = NSLinguisticTagger(tagSchemes: NSLinguisticTagger.availableTagSchemes(forLanguage: "en"), options: Int(options))

let inputString = "I am a robot"
tagger.string = inputString

let range = NSRange(location: 0, length: inputString.utf16.count)
tagger.enumerateTags(in: range, scheme: .nameTypeOrLexicalClass, options: NSLinguisticTagger.Options(rawValue: options)) { tag, tokenRange, sentenceRange, stop in
    guard let range = Range(tokenRange, in: inputString) else { return }
    let token = inputString[range]
    print("\(token): \(tag!.rawValue)")
}
```
**Kết quả:**

![](https://images.viblo.asia/98cee444-094e-4ab7-bf18-e4676af0e64a.png)

### Named Entity Recognition:
```
import UIKit

let options = NSLinguisticTagger.Options.omitWhitespace.rawValue | NSLinguisticTagger.Options.joinNames.rawValue
let tagger = NSLinguisticTagger(tagSchemes: NSLinguisticTagger.availableTagSchemes(forLanguage: "en"), options: Int(options))

let inputString = "Apple Inc Steve jobs"
tagger.string = inputString

let range = NSRange(location: 0, length: inputString.utf16.count)
tagger.enumerateTags(in: range, scheme: .nameType, options: NSLinguisticTagger.Options(rawValue: options)) { tag, tokenRange, sentenceRange, stop in
    guard let range = Range(tokenRange, in: inputString) else { return }
    let token = inputString[range]
    print("\(token): \(tag!.rawValue)")
}
```
**Kết quả:**

![](https://images.viblo.asia/eb52e514-a19a-48ef-a393-33bbc80bb1b1.png)

### Lemmatization:
```
import UIKit

let options = NSLinguisticTagger.Options.omitWhitespace.rawValue | NSLinguisticTagger.Options.joinNames.rawValue
let tagger = NSLinguisticTagger(tagSchemes: NSLinguisticTagger.availableTagSchemes(forLanguage: "en"), options: Int(options))

let inputString = "running run"
tagger.string = inputString

let range = NSRange(location: 0, length: inputString.utf16.count)
tagger.enumerateTags(in: range, scheme: .lemma, options: NSLinguisticTagger.Options(rawValue: options)) { tag, tokenRange, sentenceRange, stop in
    if let lemma = tag?.rawValue {
        print(lemma)
    }
}
```
**Kết quả:**

![](https://images.viblo.asia/123588ae-1882-4f48-9a34-7b69cec844d1.png)
### Kết:
Trên đây mình đã giới thiệu sơ qua về **NSLinguisticTagger**. Hy vọng nó có ích cho mọi người. Biết đâu khi biết NSLinguisticTagger này trong đầu các bạn nảy sinh ra được một ý tưởng nào đó để làm app chẳng hạn. Thanks! :)