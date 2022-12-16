### TL;DR

Vậy là 1 mùa phượng đỏ nữa lại đến, mang theo trong mình hơi thở nồng ấm của mùa hè. Mùa hè là mùa của sự bùng cháy, phát triển mãnh liệt. Cũng là mùa mà các em nhỏ xa thầy cô, xa bạn bè xa mái trường yêu dấu, ngày đêm quên ăn quên ngủ phá rank mùa hè.

![](https://genknews.genkcdn.vn/thumb_w/640/2018/2/26/photo-1-15196451771732033637935.jpg)

Trong bất cứ game đấu nào, bạn cũng có thể bắt gặp các em nhỏ miệt mài cống hiến cho nền e-sport nước nhà
- Rừng gank team
- Óc ch*
- Thích ra solo
- Team như l**

Thỉnh thoảng cũng có 1 vài anh hùng ngã xuống vì bị mẹ gank. Các đồng đội khác lại ân cần hỏi han "Đ* con ch- lại afk"

Nhưng trong lúc chơi game, không thể chat 1 dòng text dài như vậy được. Màn hình của bạn sẽ lập tức dổi màu xám (nhân vật chết)

Để đáp ứng nhu cầu động viên nhanh, ra yêu cầu 1 cách lịch sự của các em sửa nhi, chúng ta cùng vận dụng 1 tí kiến thức đơn giản về iOS để làm 1 cái bàn phím dành riêng cho các em nhỏ

Bàn phím sẽ phục vụ việc xả stress mà vẫn đảm bảo một môi trường e-sport lành mạnh

### Lên ý tưởng
Để thực hiện nhu cầu trên, bạn cần 1 cái bàn phím custom, với 1 số ít các button.

Khi bấm vào các button trên, `keyboard` của bạn sẽ tự động sinh ra các dòng text mang ý nghĩa nhân văn cao đẹp

### Chuẩn bị giao diện, nội dung text
Giao diện bàn phím sẽ như thế này
![](https://images.viblo.asia/d568919e-ec9c-4bbe-8ba1-023be70072b4.png)


Text hiển thị trên bàn phím
```
DCMM | Óc cờ hó | Team lol | Solo | Tuổi lol
Jungle | AP | AD | Top | Gank
Cố thủ | Đẩy lẻ | Tập trung | Farm | Đẩy trụ
Ăn KK | Bỏ KK | All Mid | Win luôn | Đầu hàng
```

Text thực tế sẽ output ra
```
Tôi muốn đưa mẫu hậu của đồng chí lên đỉnh | Đồng chí thật sáng dạ | Thật tuyệt khi được sát cánh cùng các đồng chí | T muốn so tài cùng đồng chí | Trình độ của đồng chí thật muốn t đâm vào
T sẽ làm rừng gank team | Mid cứ tin ở t | T làm AD nhé | T đi đường KK | Làm ơn giúp mình
Cố thủ, đừng feed | Thủ nhà để t đẩy lẻ | Tập trung chuẩn bị vào | Farm đi, đợi late | Đẩy trụ đi",
Ăn KingKong luôn | Không ổn, bỏ KK đi | All Mid | Win luôn | Mãi là anh em nhé, trận sau gặp lại
```


### Start
Bạn có thể đọc thêm về Custom Keyboard ở đây

https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/CustomKeyboard.html

Tạo 1 project với tên tùy thích theo ý bạn.

Tại project đã tạo, add `CustomKeyboardExtension` bằng cách
> File > New > Target > CustomKeyboardExtension

![](https://images.viblo.asia/3f4e8521-e3c3-4b9d-8ffa-bf722eb75acc.png)

Bạn sẽ thấy có 1 thư mục mới được thêm vào trong project

![](https://images.viblo.asia/826dd70f-7f10-4134-ac10-88f76f9489b5.png)

**Note : ** *đừng quên chuyển `Deployment Target` của Extension sang cùng `Deployment Target` của app nhé*

![](https://images.viblo.asia/11201909-a807-478d-928f-7aa2d6fb22c7.png)

**Run app**

Lần đầu tiên chạy app, bạn sẽ không thấy keyboard mới của bạn đâu. Hãy vào setting để add nó
>Settings > General > Keyboard > Add New Keyboard

	
 ![alt](https://images.viblo.asia/e18de87a-1451-4a1f-a092-45801f3fdb6e.PNG)
    
### KeyboardViewController
Đây là controller quản lý keyboard của bạn.
- `self.inputView` -> chính là phần keyboard view mặc định
- `self.textDocumentProxy`

Bạn không thể trực tiếp thao tác với editor (textfield, textview ...) mà phải thực hiện việc đó thông qua `textDocumentProxy`

### Khởi tạo giao diện bàn phím
**Một bàn phím sẽ nên có các thành phần**
- Next keyboard button
- Space
- Delete button
- Các button khác


** Khởi tạo các phím chức năng**

Để tiện cho việc khởi tạo giao diện bàn phím, bạn có thể tạo view qua file `.xib` cho dễ hình dung

> File > New > File > View

Đừng quên check vào Target `KeyboardExtension`

![](https://images.viblo.asia/b4cf2d06-b699-4898-a1d3-e846be7d1c83.png)

Bạn có thể set height của nó thành `216` cho tương đồng với kích thước của các bàn phím khác. Kéo thả các button chức năng

![](https://images.viblo.asia/492eb3a9-a540-47f8-876f-7bcdc2eb4241.png)

**Khởi tạo text button**

Bàn phím của chúng ta sẽ có 4x5 button -> chúng ta sẽ dùng code để khởi tạo chúng (hoặc bạn có thể kéo thả 20 cái button tùy theo sở thích)

Ở đây, tôi sẽ sử dụng [SnapKit](https://github.com/SnapKit/SnapKit) để support việc tạo `autolayout` cho các button.

```
let numRow = 4
let numColumn = 5
let space: CGFloat = 6.0
let lineSpace: CGFloat = 10.0

let texts = [
        "DCMM", "Óc cờ hó", "Team lol", "Solo", "Tuổi lol",
        "Jungle", "AP", "AD", "Top", "Gank",
        "Cố thủ", "Đẩy lẻ", "Tập trung", "Farm", "Đẩy trụ",
        "Ăn KK", "Bỏ KK", "All Mid", "Win luôn", "Đầu hàng"
    ]

let displayTexts = [
        "Tôi muốn đưa mẫu hậu của đồng chí lên đỉnh", "Đồng chí thật sáng dạ", "Thật tuyệt khi được sát cánh cùng các đồng chí", "T muốn so tài cùng đồng chí", "Trình độ của đồng chí thật muốn t đâm vào",
        "T sẽ làm rừng gank team", "Mid cứ tin ở t", "T làm AD nhé", "T đi đường KK", "Làm ơn giúp mình",
        "Cố thủ, đừng feed", "Thủ nhà để t đẩy lẻ", "Tập trung chuẩn bị vào", "Farm đi, đợi late", "Đẩy trụ đi",
        "Ăn KingKong luôn", "Không ổn, bỏ KK đi", "All Mid", "Win luôn", "Mãi là anh em nhé, trận sau gặp lại"
    ]

private func setupButtons() {
    // 1
    var indexColumnButton: ShapeButton?
    var indexRowButton: ShapeButton?
    // 2
    let widthOffset = space * CGFloat(numColumn + 1) / CGFloat(numColumn)
    let heightOffset = (lineSpace * CGFloat(numRow + 1) + 50) / CGFloat(numRow)
    // 3
    for i in 0..<numRow {
        for j in 0..<numColumn {
            let button = ShapeButton(type: .system)
            button.tag = (i * numColumn + j)
            button.setTitle(texts[button.tag], for: .normal)
            button.addTarget(self, action: #selector(didSelectTextButton(btn:)), for: .touchDown)
            self.addSubview(button)
            button.snp.makeConstraints { (maker) in
                maker.width.equalTo(self.snp.width).dividedBy(numColumn).offset(-widthOffset)
                maker.height.equalTo(self).dividedBy(numRow).offset(-heightOffset)
                if let lastButton = indexColumnButton {
                    maker.leading.equalTo(lastButton.snp.trailing).offset(space)
                    maker.top.equalTo(lastButton.snp.top)
                } else {
                    if let lastRow = indexRowButton {
                        maker.top.equalTo(lastRow.snp.bottom).offset(lineSpace)
                    } else {
                        maker.top.equalTo(self).offset(lineSpace)
                    }
                    maker.leading.equalTo(self).offset(space)
                }
            }
            indexColumnButton = button
            if j == 0 {
                indexRowButton = button
            }
        }
        indexColumnButton = nil
    }
}

private func commonInit() {
    setupButtons()
}

```
Đoạn code trên có thể hiểu như sau

- Có tổng cộng 4x5 `ShapeButton` (custom of `UIButton` class, bạn có thể dùng `UIButton`)
- Set property, tag + target cho button
- Mỗi button sẽ được set `layoutconstraint` như sau:
 - Tất cả các button có size bằng nhau
 - Khoảng cách giữa button với button trước nó = 6
 - Khoảng cách giữa button với button trên nó = 10
 - Các button ở biên (trên dưới trái phải) sẽ cách biên = 6

*Nếu bạn không dùng `autolayout` mà sử dụng frame thì nhớ set lại frame mỗi khi `layoutSubview` được gọi nhé*

### Add keyboard view

Sau khi đã khởi tạo xong custom keyboard view, chúng ta sẽ add nó vào `KeyboardViewController`
```
var leKeyboard: LeKeyboardView!

override func viewDidLoad() {
    super.viewDidLoad()
    guard let inputView = self.inputView else {
        return
    }
    let view = LeKeyboardView(frame: inputView.bounds)
    self.leKeyboard = view
    inputView.addSubview(self.leKeyboard)
    leKeyboard.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([
        leKeyboard.leftAnchor.constraint(equalTo: inputView.leftAnchor),
        leKeyboard.topAnchor.constraint(equalTo: inputView.topAnchor),
        leKeyboard.rightAnchor.constraint(equalTo: inputView.rightAnchor),
        leKeyboard.bottomAnchor.constraint(equalTo: inputView.bottomAnchor)
        ])
}
```
Chạy ứng dụng để check Keyboard

![](https://images.viblo.asia/29b6918f-67e4-4676-a1e8-60373316b3d8.PNG)

### Add action cho Keyboard
**Next Keyboard Button**

Đây là 1 button đặc biệt, hãy để `KeyboardViewController` xử lý nó
```
leKeyboard.nextKeyboardButton.addTarget(
    self,
    action: #selector(handleInputModeList(from:with:)),
    for: .allTouchEvents)
```
iOS sẽ tự động xử lý nó như `nextKeyboardButton` ở các keyboard mặc định
- Tap to next
- Hold to select

### Delete Button
Ở `KeyboardView.swift`, chúng ta sẽ add action cho delete button, và trả sự kiện qua closure
```
var didTapDelete: (() -> Void)?

func commonInit {
    self.deleteButton.addTarget(self,
        action: #selector(didTapDeleteButton(_:)),
        for: .touchDown
    )
}

@IBAction private func didTapDeleteButton(_ sender: Any) {
    didTapDelete?()
}

```
và xử lý tại `KeyboardViewController`
```
leKeyboard.didTapDelete = { [weak self] in
    let proxy = self?.textDocumentProxy
    if let lastText = proxy?.documentContextBeforeInput?.components(separatedBy: " ").last {
        if lastText.isEmpty {
            proxy?.deleteBackward()
            return
        }
        for _ in 0..<lastText.count {
            proxy?.deleteBackward()
        }
    } else {
        proxy?.deleteBackward()
    }
}
```
*textDocumentProxy.deleteBackward chỉ delete 1 ký tự, chúng ta có thể sửa lại để nó delete 1 từ*

**Text Button và Space button**
Tương tự như Delete Button, chúng ta cũng add target cho các button (tại nơi khởi tạo ở vòng for)
```
button.addTarget(self, action: #selector(didSelectTextButton(btn:)), for: .touchDown)
```
```
var didTapButton: ((String) -> Void)?

@IBAction private func didSelectTextButton(btn: UIButton) {
    let text = displayTexts[btn.tag]
    didTapButton?(text)
}
```
và xử lý tại `KeyboardViewController`
```
leKeyboard.didTapButton = { [weak self] text in
    self?.textDocumentProxy.insertText(text)
}
```

### Run app và nhận kết quả

![](https://images.viblo.asia/4c61d6fa-3f3e-490f-acd6-efb370ce7616.PNG)

### Một số custom khác
> Porn lover

Bạn có thể đổi text để tạo ra 1 bàn phím dành riêng cho việc `học tập`
```
let texts = [
        "Porn1", "Porn2" ...
    ]

let displayTexts = [
        "www.porn1.com", "www.porn2.com" ...
    ]
```

> Porn love random

bàn phím chỉ có 1 button, và bạn có thể random chọn 1 trong số các site trong list trên để truyền text

> Daily Report =))


> Gửi lời chúc

Tự nhắn đê cho ý nghĩa ...

### Resource
Ứng dụng được làm dựa trên ý tưởng bàn phím riêng của box iMessage
> [Download Here](https://github.com/quocnb/LeKeyboard)