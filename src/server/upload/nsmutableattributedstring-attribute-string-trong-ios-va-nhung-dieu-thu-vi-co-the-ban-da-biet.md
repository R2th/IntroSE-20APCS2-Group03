Hello Bây be, Xin chào các bạn. Hôm nay mình giới thiệu một chút những gì mình đọc và biết được về Attribute String. Có thể sẽ thiếu xót nhiều mong các bạn comment góp ý để mình có thể sửa ạ.
# Ứng dụng
- Attribute string mà mình ứng dụng được là để có thể custom các đoạn text hiện thị theo ý của mình và text mặc định của các widget trong ios không hỗ trợ 
Ví dụ như:
- Dãn khoảng cách giữa các character hay các dòng text với nhau.
- Thay đổi font, màu, kiểu chữ ... tóm lại là thuộc tính của text có thể của một substring hay cả đoạn string bên trong một string khác chẳng hạn
- Ứng dụng tôi thấy có 1 chút khó khăn để làm bài viết này đó là: Click vào một subString bên trong 1 string để thực hiện một func nào đó. Nào! Chúng ta sẽ xem ví dụ và hướng giải quyết ở cuối bài nhé.

Đảo qua một chút lý thuyết chứ nhỉ.
# NSTextStorage
Tại sao tôi lại nói đến NSTextStorage ở đây bởi vì:
Class NSTextStorage là một subClass của NSMutableAttributedString để thêm các thuộc tính, phương thức để quản lý đối tượng NSLayoutManager (sẽ nói dưới đây).
NSTextStorage sẽ thông báo cho layout manager của nó về những thay đổi về characters hay attributes cuả nó cho phép layout manager có thể tái hiển thị văn bản nếu cần.

Chú ý:
- NSTextStorage thực hiện quản lý thay đổi như `beginEditing()` hay `endEditing()` function, xác định thuộc tính (attribute), xử lý delegate và thông báo cho layout manager.
- NSTextStorage không quản lý lưu trữ chuỗi thực tế, cái mà được quản lý bởi subClasses bằng việc NSAttributeed String ghi đè 2 primitives là `string` và `attributes(at:effectiveRange:)` 
- subClasses cũng ghi đè 2 primitives của NSMutableAttributedString là `replaceCharacters(in:with:)` và `setAttributes(_:range:)`
Những primitives thể hiện sự thay đổi sau khi gọi `edited(_:range:changeInLength:)` để cho lớp cha biết đến sự thay đổi.
# NSTextContainer
NSLayoutManager sử dụng NSTextContainer để bao đóng một text. Bạn hình dung nó là một hình chữ nhật bao đóng đoạn text của bạn vậy và bạn có thể xác định vùng văn bản hiển thị. Bạn có thể tạo ra các vùng văn bản tròn hay vùng trống hay mốt vùng dọc theo một hình hoạ nào đó.
NSTextContainer định nghĩa các 
# NSLayoutManager
NSLayoutManager là đối tượng điều phối việc bố trí và hiển thị các ký tự được giữ trong một đối tượng NSTextStorage

Theo mình hiểu thì nó sẽ đảm nhiệm việc đo đạc để có thể hiển thị lên NSTextView phụ thuộc vào các thuộc tính đã config ở NSTextcontainer và NSTextStorage.
->  Và công việc của nó là hiện thị ra view.
# Giải quyết vấn đề
## Bài toán: 
Mình có một chuỗi string như sau: "Nếu bạn chưa có tài khoản hãy `Đăng kí`" và hiện thị nó lên view với `Đăng kí` là một click dẫn đến một hành động nào đó như sang màn hình khác.
## Ý tưởng: 
Một UILabel + UIButton cạnh nhau. nhưng nếu màn hình và text dài thì sao. Thì UILabel sẽ xuống dòng nhưng UIButton thì vẫn ở cuối và đoạn text không liền mạch.

=> Không ổn nhỉ.
## Hướng giải quyết 
Hướng giải quyết của mình nhờ sự giúp đỡ của một anh cùng dự án. Có thể k phải là tối ưu nhất nhưng minh rất thích.
## Giải pháp
- Chúng ta sẽ chỉ sử dụng một UILabel
- Add một UITapGestureRecognizer (phục vụ cho việc tap và UILabel) và bật tính năng `isUserInteractionEnabled = true` của label lên để ta có thể tab vào nó.
- Bạn hình dung UILabel là hình chữ nhật. Chúng ta sẽ thực hiện tap lên hình chữ nhật đó và tìm ra index kí tự trong đoạn string mà chúng ta TAP vào.
- Nếu bạn chưa có tài khoản hãy `Đăng kí` Thì chúng ta sẽ phải tìm ra index của việc TAP trong sâu kí tự bên để so sánh với nếu trùng với kí tự của chữ `Đăng kí` thì chúng ta sẽ thực hiện function đó. (Khó hiểu tý)
Tức là chúng ta tìm ra vị trí kí tự trong xâu tại điểm chúng ta TAP vào UILABEL chứ không phải là vị trí kí tự chúng ta đếm trong string.

## Code
###  Tìm vị trí của kí tự.
Chúng ta sẽ extension UILabel để thực hiện hàm sau
```
extension UILabel {
    func indexOfAttributedTextCharacterAtPoint(point: CGPoint) -> Int {
        let textStorage = NSTextStorage(attributedString: self.attributedText!)
        let layoutManager = NSLayoutManager()
        textStorage.addLayoutManager(layoutManager)
        let textContainer = NSTextContainer(size: self.frame.size)
        textContainer.lineFragmentPadding = 0
        textContainer.maximumNumberOfLines = self.numberOfLines
        textContainer.lineBreakMode = self.lineBreakMode
        layoutManager.addTextContainer(textContainer)

        let index = layoutManager.characterIndex(for: point, in: textContainer,
         fractionOfDistanceBetweenInsertionPoints: nil)
        return index
    }
}
```

**Bước 1:
Chúng ta tạo đối tượng NSTextStorage để có thể thông báo cho LayoutManger của nó.**
```
let textStorage = NSTextStorage(attributedString: self.attributedText!)
```
**Bước 2:
Xử lý văn bản với NSLayoutManager. Phục vụ cho tính toán tìm `characterIndex` bên dưới.**
```
let layoutManager = NSLayoutManager()
textStorage.addLayoutManager(layoutManager)
```
**Bước 3:
Đương nhiên là layou manager làm việc trên các NSTextContainer. Chúng ta cung cấp các thông số TextContainer để Layoutmanager có thể tính toán**
```
let textContainer = NSTextContainer(size: self.frame.size)
textContainer.lineFragmentPadding = 0
textContainer.maximumNumberOfLines = self.numberOfLines
textContainer.lineBreakMode = self.lineBreakMode
```
Ở đây khởi tạo NSTextContainer với đúng size mà uilabel đó có.
- textContainer.lineFragmentPadding = 0 là cho biết padding đầu và cuối hình chữ nhật là 0
- textContainer.maximumNumberOfLines = self.numberOfLines: Cho biết số dòng của text bằng số dòng của uiLabel
- textContainer.lineBreakMode = self.lineBreakMode: Cho biết kiểu breakMode là kiểu breakMode của UILabel


**Bước 4: Thêm TextConter vào cho layoutManger**
```
layoutManager.addTextContainer(textContainer)
```
**Bước 5:
Sử dụng LayoutManager để tìm ra index trên hình chữ nhật thông qua CGPoin chúng ta đã TAP**
```
let index = layoutManager.characterIndex(for: point, in: textContainer, fractionOfDistanceBetweenInsertionPoints: nil)
```
###  So sánh với vị trí kí tự trong xâu để tìm khoảng TAP cho chữ `Đăng kí`
```
@objc func handleLoginLabelTab(_ sender: UITapGestureRecognizer) {
        let tapLocation = sender.location(in: loginLabel)
        let index = loginLabel.indexOfAttributedTextCharacterAtPoint(point: tapLocation)
        if index > rangeText.location && index < rangeText.location + rangeText.length {
            self.gotoLoginScreen()
        }
    }
```
Chúng ta lấy ra toạ độ đã TAP vào UILabel
```
let tapLocaition = sender.location(in: introLabel)
```
Tìm ra index của kí tự chúng ta đã tab được
```
let indexTap = introLabel.indexOfAttributedTextCharacterAtPoint(point: tapLocaition)
```
Kiểm tra nếu index nằm trong khoảng kí tự của chữ `Đăng kí` thì thực hiện hành động
```
if index > rangeText.location && index < rangeText.location + rangeText.length {
  self.gotoLoginScreen()
}
```
```
rangeText.location # Sẽ trả về vị trí kí tự trước chữ `Đ`
```
```
rangeText.location + rangeText.length # Trả về kí tự bao gồm cả chữ đăng kí.
```

# Kết luận.
Bài viết còn thiếu xót và hiểu chưa cặn kẽ. Mong rằng các bạn nhẹ tay gạch đá.
# Tài liệu
- [APPLE DOCUMENT](https://developer.apple.com/documentation/uikit/nslayoutmanager?changes=_2)
- Code của Anh Tuấn cùng dự án đã trợ giúp.