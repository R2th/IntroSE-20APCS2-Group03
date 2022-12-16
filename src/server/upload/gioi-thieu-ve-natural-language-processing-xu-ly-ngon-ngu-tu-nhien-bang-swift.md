Hiện nay, **Natural Language Processing** - Xử lý ngôn ngữ tự nhiên ( gọi tắt là **NLP**) chưa được phổ biến và sử dụng, nó vẫn còn là một frameworks ẩn của iOS SDK. NLP có thể sử dụng được cả trên Swift và Objective-C, nó có thể chia nhỏ đoạn văn các từ nhỏ, các danh từ, động từ, tính từ hoặc nhận diện đó là ngôn ngữ gì. Dựa theo các thông tin mà nó có thể cung cấp được thì chúng ta có thể áp dụng rất nhiều vào **Machine Learning Programs (MLKit)** để có thể sử lý rất nhiều các vấn đề sau nay như Siri chẳng hạn, nó phân tích giọng nói của chúng ta thành các phần nhỏ, rồi đưa thông tin vào MLKit, dựa vào các thông tin đã thu thập trước đây, MLKit quyết định Siri cần phải làm gì để đúng theo mong muốn của người dùng.

## **Let Start**
Để bắt đầu thì chúng ta đơn giản chỉ cần có Xcode, và tạo mới file playerground để có thể chạy thử ngay chức năng của **NLP** có thể làm được gì.
```
import  Foundation
```
Vì hiện tại NLP vẫn là một framework ẩn, nó chưa public và tách ra thành một framework chính thức, nên để sử dụng được thì đơn giản chỉ cần import Foundation.

Trong NLP thì tagger là là một phần cơ bản để đọc được đoạn text và giử các "tag" thông tin như loại từ, nhận diện tên hoặc ngôn ngữ... Chúng ta chỉ cần gọi class **NSLinguisticTagger**.
Trong playground, chúng ta thêm các đoạn code này:
```
let quote = "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do. - Steve Jobs (Founder of Apple Inc.)"
let vntext = "Framgia Việt Nam là công ty IT Nhật Bản được thành lập vào tháng 10/2012"

let tagger = NSLinguisticTagger(tagSchemes:[.tokenType, .language, .lexicalClass, .nameType, .lemma], options: 0) 
let options: NSLinguisticTagger.Options = [.omitPunctuation, .omitWhitespace, .joinNames]
```

## **Language Identification**
Việc đầu tiên là chúng ta sẽ kiểu tra xem đoạn text ở trên là ngôn ngữ gì.
```
func determineLanguage(for text: String) {
    tagger.string = text
    let language = tagger.dominantLanguage
    print("The language is \(language!)")
}
determineLanguage(for: quote) // The language is en
determineLanguage(for: vntext) // The language is fr
```
Ở đây, ở đoạn text đầu, **NLP** đã nhanh chóng nhận diện được là đoạn text tiếng anh nhưng đối với đoạn text tiếng việt thì **NLP** chỉ có thể nhận diện đó là tiếng Pháp (uhm thì chữ tiếng việt do người Pháp phát triển ra mà).

## **Tokenization**
Tiếp theo, chúng ta sẽ phân tích đoạn text ra thành các token gọi là **tokenization**, việc là việc chia các vế câu, ngữ pháp, từ trong câu. Trong trường hợp này, chúng ta sẽ cắt nhỏ đoạn quote ra thành các từ.

```
func tokenizeText(for text: String) {
    tagger.string = text
    let range = NSRange(location: 0, length: text.utf16.count)
    tagger.enumerateTags(in: range, unit: .word, scheme: .tokenType, options: options) { tag, tokenRange, stop in
        let word = (text as NSString).substring(with: tokenRange)
        print(word)
    }
}
```
Dùng hàm trên để phân tích đoạn văn quote:
```
Here
's
to
the
...... {rất nhiều từ, tạm skip}
ones
who
do
Steve Jobs
Founder
of
Apple Inc.
```
Kết quả là chúng ta sẽ nhận rất nhiều từ, dựa vào các từ này mà cho vào MLKit thôi.
## **Parts of Speech**
Tiếp tục vào sâu hơn, để nhận diện được các từ được cắt ở trên là loại từ gì. Chúng ta lại sử dụng hàm:
```
func partsOfSpeech(for text: String) {
    tagger.string = text
    let range = NSRange(location: 0, length: text.utf16.count)
    tagger.enumerateTags(in: range, unit: .word, scheme: .lexicalClass, options: options) { tag, tokenRange, _ in
        if let tag = tag {
            let word = (text as NSString).substring(with: tokenRange)
            print("\(word): \(tag.rawValue)")
        }
    }
}
```
Chạy hàm này cho đoạn quote thì kết quả:
```
The: Determiner // Xác định từ
troublemakers: Noun // Danh từ
The: Determiner
round: Noun
pegs: Noun
in: Preposition
the: Determiner
square: Adjective // Tính từ
holes: Noun
The: Determiner
ones: Noun
who: Pronoun // Đại từ
see: Verb // Động từ
```
Dựa vào kết quả, chúng ta lại có thể phân nhỏ được các từ trong câu là thuộc loại từ gì để có thể phân tích một cách chính xác hơn.

## **Named Entity Recognition**
Cuối cùng, việc chúng ta có thể nhận diện được danh từ đó là tên, tổ chức, hay địa điểm nào đó trong đoạn văn:
```
func namedEntityRecognition(for text: String) {
    tagger.string = text
    let range = NSRange(location: 0, length: text.utf16.count)
    let tags: [NSLinguisticTag] = [.personalName, .placeName, .organizationName]
    tagger.enumerateTags(in: range, unit: .word, scheme: .nameType, options: options) { tag, tokenRange, stop in
        if let tag = tag, tags.contains(tag) {
            let name = (text as NSString).substring(with: tokenRange)
            print("\(name): \(tag.rawValue)")
        }
    }
}
 
namedEntityRecognition(for: quote)
```
Và kết quả ta sẽ có được là:
```
Apple Inc.: Noun
Steve Jobs: PersonalName
Apple Inc.: OrganizationName
```
Vậy chúng ta đã tách được các danh từ và xác định xem nó là gì luôn, **thật là nhiệm màu.**

## **What’s Next**
Vì framework này vẫn còn là một **hidden framework** của Apple, mong rằng về sau Apple vẫn sẽ tiếp tục xuất bản thêm các tính năng nhiều hơn nửa.

Toàn bộ đoạn code trên bạn có thể tải về tại [đây](https://github.com/appcoda/NaturalLanguageProcessing)

---- 
Bài viết được học hỏi và dịch lại từ: https://www.appcoda.com/natural-language-processing-swift/