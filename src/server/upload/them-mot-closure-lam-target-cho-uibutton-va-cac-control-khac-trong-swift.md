> Mẫu target-action được sử dụng kết hợp với các điều khiển giao diện người dùng như một lệnh callback  sự kiện người dùng. Bất cứ khi nào một button được nhấn vào target, hành động của nó sẽ được gọi. Thực tế là phương thức không được xác định gần với định nghĩa điều khiển đôi khi được coi là một nhược điểm và đó là lý do để rất nhiều dev như chúng ta tìm kiếm các giải pháp closure dựa trên trên các trang web như Stack Overflow. 

> SDK iOS 14 đã giới thiệu các API mới cho phép chúng ta sử dụng UIControls kết hợp với closure. Các phần tử UIControl phổ biến là UIButton, UISegmentedControl và UISwitch nhưng có rất nhiều phần tử khác đều kế thừa từ đối tượng UIControl.Tất cả các phần tử giao diện đó hiện có thể được sử dụng với API mới này.

### 1. Sử dụng UIControl với closure callback 
Có thể bạn đã quen thuộc với đoạn code sau:

```
final class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let button = UIButton(type: .system)
        button.addTarget(self, action: #selector(buttonTapped(_:)), for: .touchUpInside)

    }

    @IBAction func buttonTapped(_ sender: UIButton) {
        print("Button tapped!")
    }
}
```

Phương thức **buttonTapped (_ : )** sẽ được gọi mỗi khi chạm vào button. Đoạn code tương tự bây giờ có thể được viết như sau:

```
final class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let button = UIButton(type: .system, primaryAction: UIAction(title: "Button Title", handler: { _ in
            print("Button tapped!")
        }))
    }
}
```

Điều này giữ cho hành động gần với định nghĩa điều khiển có thể cải thiện khả năng khám phá code của bạn.

### 2. Nhận tham chiếu đến control sender 

Một điểm khác biệt trong đoạn code trên là phương thức của chúng ta có tham chiếu đến sender. Điều này có thể hữu ích trong một số trường hợp khi bạn muốn biết các điều khiển tại chỗ được gọi là phương thức được liên kết.

Với API dựa trên closure mới, bạn có thể sử dụng đối số hành động để truy cập sender. Ví dụ: khi bạn muốn đọc text từ một text field:

```
let textField = UITextField()
textField.addAction(UIAction(title: "", handler: { action in
    let textField = action.sender as! UITextField
    print("Text is \(textField.text)")
}), for: .editingChanged)
```

### 3. Ta có nên luôn sử dụng API closure mới không?

Bây giờ bạn có thể thấy hấp dẫn để sử dụng closure ở mọi nơi. Tuy nhiên, một hành động control có thể dễ dàng phát triển trong code, làm cho code của bạn trở nên khó đọc hơn. Trong những trường hợp đó, bạn có thể quay lại mẫu target-action cũ để cho phép bạn sử dụng một phương thức riêng biệt. Vì các phương thức trong Swift dễ đọc hơn khi hành động control của bạn yêu cầu nhiều dòng code.

### 4. Kết luận 
Sử dụng nhiều closure có thể dễ dàng làm cho code của bạn khó đọc hơn và chỉ nên được sử dụng nếu logic gọi lại control có thể được viết trong một vài dòng code. Nếu không, tốt hơn là sử dụng mẫu target-action cũ.

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃