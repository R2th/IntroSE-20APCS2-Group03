# Giới thiệu
Trong các bài viết trước, tôi đã giới thiệu đến các bạn cách sử dụng MLKit API để nhận diện hình ảnh, và trong bài viết này tôi sẽ giới thiệu đến các bạn bài viết sử dụng MLKit để nhận diện ngôn ngữ của văn bản hay một chuỗi kí tự. Nhận diện ngôn ngữ rất hữu hữu ích khi làm việc với văn bản do người dùng cung cấp, thường không đi kèm với bất kỳ thông tin ngôn ngữ nào.

# Nhận diện ngôn ngữ
Trong bài Demo này, tôi sẽ thực hiện một ứng dụng nhập vào một chuỗi kí tự và thực hiện việc nhận diện xem đó là ngôn ngữ gì.
### Setup Project
1. Config Firebase theo hướng dẫn [này](https://firebase.google.com/docs/ios/setup) nếu bạn chưa có ứng dụng nào.
2. Sử dụng các thư viện ML Kit trong Podfile:
```
pod 'Firebase/Core'
pod 'Firebase/MLNaturalLanguage'
pod 'Firebase/MLNLLanguageID'
```
3. Trong Appdelegate, khởi tạo Firebase:
```
import Firebase
FirebaseApp.configure()
```
4. Trong ViewController, ta sẽ thực hiện input đầu vào là một textview chứa chuỗi văn bản để thực hiện việc nhận diện ngôn ngữ, và 2 chức năng ***Nhận diện ngôn ngữ của một chuỗi*** và ***Xác định độ tin cậy khi nhận diện ngôn ngữ của văn bản***

![](https://images.viblo.asia/81c3b341-8e0d-4d24-9fc2-504eeb70d69e.PNG)


### Nhận diện ngôn ngữ của một chuỗi
Để khởi chạy nhận diện ngôn ngữ của một chuỗi, bạn thực hiện như sau:
```
let languageId = NaturalLanguage.naturalLanguage().languageIdentification()

languageId.identifyLanguage(for: text) { (languageCode, error) in
  if let error = error {
    print("Failed with error: \(error)")
    return
  }
  if let languageCode = languageCode, languageCode != "und" {
    print("Identified Language: \(languageCode)")
  } else {
    print("No language was identified")
  }
}
```
Sau khi xử lý thành công thì đoạn mã trên sẽ trả về kết quả cho biết ngôn ngữ của văn bản, và ví dụ ở đây tôi sẽ nhận diện chuỗi 'Nguyễn Công Anh' là ngôn ngữ gì, kết quả sẽ trả về là 'vi'(Tiếng Việt)

![](https://images.viblo.asia/4ab2344d-2672-42d5-8f3b-0d58280caa83.PNG)

### Xác định độ tin cậy khi nhận diện ngôn ngữ của văn bản
Để có được các giá trị độ tin cậy của các ngôn ngữ có khả năng nhất của chuỗi, bạn thực hiện đoạn code:
```
let languageId = NaturalLanguage.naturalLanguage().languageIdentification()

languageId.identifyPossibleLanguages(for: text) { (identifiedLanguages, error) in
  if let error = error {
    print("Failed with error: \(error)")
    return
  }
  guard let identifiedLanguages = identifiedLanguages,
    !identifiedLanguages.isEmpty,
    identifiedLanguages[0].languageCode != "und"
  else {
    print("No language was identified")
    return
  }

  print("Identified Languages:\n" +
    identifiedLanguages.map {
      String(format: "(%@, %.2f)", $0.languageCode, $0.confidence)
      }.joined(separator: "\n"))
}
```

Cũng là ví dụ trên, ở đây tôi sẽ sử dụng nhận diện độ tin cậy của việc nhận diện ngôn ngữ, và kết quả trả về (vi, 1.00) nghĩa là đã nhận diện được ngôn ngữ Tiếng Việt với độ tin cậy là 100%

![](https://images.viblo.asia/b3f63abe-bcbb-44fa-9763-f11e8489f096.jpeg)

Thử một ví dụ khác với nhiều ngôn ngữ khác nhau, ở đây tôi sẽ cho input đầu vào sẽ là "アップカフェUP’ cafe in the green" bao gồm cả tiếng Nhật và tiếng Anh. 

![](https://images.viblo.asia/0e5f2a62-f20d-4bfe-8ff9-8ed60cbd4975.PNG)

Và kết quả sẽ ra là 79% nhận diện là tiếng Nhật, còn lại là các tiếng khác.

# Kết luận
Trên đây, tôi đã giới thiệu đến các bạn một API có thể nhận diện được ngôn ngữ của chuỗi văn bản trong iOS sử dụng MLKit của Firebase. Việc nhận diện ngôn ngữ này có thể giúp ích cho chúng ta khi gặp những trường hợp end-user request đến hệ thống, chúng ta có thể nhận diện được ngôn ngữ của họ và có thể dễ dàng sử dụng ngôn ngữ để support hơn. Một giải pháp khá là hữu ích phải không nào!
Rất cám ơn các bạn đã dành thời gian để đọc bài viết.

[Nguồn](https://firebase.google.com/docs/ml-kit/ios/identify-languages)