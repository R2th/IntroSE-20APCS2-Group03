Vâng mình xin giới thiệu cách sử dụng `UITextView` để hiển thị text trong các file định dạng `(*.rtf)`

Luồng thao tác sẽ như sau 
* Import rtf vào `mainbundle`
* từ file rtf create `NSAttributeStrings`
* Assign vào property `attributedText` của `UITextView` 

##  Import rtf vào `mainbundle`
Như ở ví dụ của mình mình sử dụng file `Terms.rtf` để import vào main bundle 

## Từ file rtf create `NSAttributeStrings`
Ở file code dưới đây mình đã tạo method `getTermAttributeString`. và trong đó tạo `NSAttributeStrings`
```
enum FileError: Error {
    case notExitPath
    case faildRead
}

func getTermAttributeString() throws -> NSAttributedString {

        if let url =  Bundle.main.url(forResource: "Terms", withExtension: "rtf") {
            do {
                let terms = try Data(contentsOf: url)
                let attributeString = try NSAttributedString(data: terms, options: [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.rtf], documentAttributes: nil)
                return attributeString

            } catch let error {
                print("ファイルの読み込みに失敗しました: \(error.localizedDescription)")
                throw FileError.faildRead
            }
        } else {
            throw FileError.notExitPath
        }
    }
```

Mình sẽ giải thích các bước trong đoạn code trên 
```
if let url =  Bundle.main.url(forResource: "Terms", withExtension: "rtf")
```

Ta sử dụng hàm `Bundle.main.url` để bắt URL của file trong main bundle. 
```
try NSAttributedString(data: terms, options: [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.rtf], documentAttributes: nil)
```

Ở đây ta khởi tạo `NSAttributedString` và trong `options` ta chỉ định document type là `[NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.rtf]`
Đến đây là ta có thể tạo được `NSAttributedString` từ `RichTextFormat`

## Assign vào property `attributedText` của `UITextView` 
`NSAttributedString` đã được tạo chúng ta assign vào `attributedText` bằng đoạn code này 
```
termsTextView.attributedText = try viewModel.getTermAttributeString()
```

### Tham khảo 
*  [Xcode 9.1 Swift 4, unable to compile with NSDocumentTypeDocumentAttribute if “if #available” is used](https://stackoverflow.com/questions/47281756/xcode-9-1-swift-4-unable-to-compile-with-nsdocumenttypedocumentattribute-if-if)
*  [ja.stackoverflow.com](https://ja.stackoverflow.com/questions/8813/swift%E3%81%A7uitextview%E3%81%AEattributedtext%E3%81%AE%E5%86%85%E5%AE%B9%E3%82%92%E3%83%AA%E3%83%83%E3%83%81%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%ABtest-rtf%E3%81%A8%E3%81%97%E3%81%A6%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF)
*  [Objective C - How to create rtf from NSAttributedString](https://stackoverflow.com/questions/24134217/objective-c-how-to-create-rtf-from-nsattributedstring)

Nguồn bài dịch : [Qiita](https://qiita.com/SatoTakeshiX/items/429c9ab108c79680557c)