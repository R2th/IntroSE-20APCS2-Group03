# 1. Action Extension là gì?
Trước hết App Extension theo định nghĩa của Apple là tiện ích mở rộng của ứng dụng cung cấp cho Users quyền truy cập vào chức năng và nội dung của ứng dụng của bạn trên iOS.

Action Extension là một phần mở rộng được Apple cung cấp để người phát triển có thể tạo ra một phần chức năng có sẳn ở một ứng dụng và có thể sử dụng chức năng này ở ứng dụng khác. Cụ thể như các chức năng rất quen thuộc các bạn sử dụng thường xuyên như chia sẻ qua facebook, instagram...trong các ứng dụng. Nó là 1 kiểu Action Extensions, giúp các apps có thể sử dụng chức năng này.

![](https://images.viblo.asia/5cec86d2-774e-45f8-91e2-30c4d07d6d34.png)

Ví dụ trong ứng dụng Safari chúng ta click vào nút share sẽ show ra một danh sách Action Extensions có sẵn để sử dụng.

# 2. Tạo ứng dụng demo trên iOS.
Để tạo demo cho chức năng này mình sẽ tạo một Action Extension về đọc nội dung văn bản để các bạn có thể hình dung được Action Extension nó hoạt động như thế nào.

Đầu tiên chúng ta tạo Project như bình thường và add Action Extension vào. Nó sẽ giống như chúng ta add Targets vào trong Project của mình. Extensions cũng sẽ tạo ra 1 thư mục nhưng bình thường và ta có thể đặt tên tuỳ ý cho extension của mình.
![](https://images.viblo.asia/8e410e52-8dbd-41b8-9d1f-7d4d7bc893de.png)


Khi tạo xong Extension thì sẽ có 1 thư mục Extension được tạo ra, để chúng ta thực hiện code trên thư mục này. Về giao diện của Extension đọc văn bản chúng ta có thể thiết kế như thế này:

![](https://images.viblo.asia/7f094908-d61f-4514-b5bc-ac5a8dedd2f8.png)

Như đầu bài chúng ta thấy dạng hiển thị của Action Extensions như thế nào, trong code iOS chúng ta sẽ sử dụng UIActivityViewController để hiển thị nó.

Để thêm icon cho Action Extension chúng ta vào trong targets chọn Action Extension target vừa tạo. Vào Build Settings và tìm key Asset Catalog App Icon Set Name để thay tên App Icon vào.

![](https://images.viblo.asia/b19b7285-f559-4a9e-b705-59e526919123.png)

Ở ứng dụng chính chúng ta thiết kế một màn hình đơn giản có button Share dùng để hiển thị UIActivityViewController và truyền text vào trong UIActivityViewController để Action Extensions có thể đọc được text này.
![](https://images.viblo.asia/6765445b-b270-4c2c-96d9-82472570f9f3.png)

```
    // MARK: - Action
    @IBAction func shareButtonAction(_ sender: Any) {
        let activityViewController = UIActivityViewController(activityItems: [self.textView.text], applicationActivities: nil)
        self.present(activityViewController, animated: true, completion: nil)
    }
```
Trong đoạn code trên self.textView.text là dữ liệu text truyền vào dùng đề đọc đoạn văn. Như hình trên mình có paste thẳng một đoạn văn vào sẵn.

Trong thư mục Action Extension sẽ cung cấp  NSExtensionItem và NSItemProvider để lấy dữ liệu truyền vào từ UIActivityViewController ở trên. Đoạn code như sau:
```
    func readText() {
        guard let textItem = self.extensionContext?.inputItems.first
            as? NSExtensionItem, let textItemProvider = textItem.attachments?.first
                as? NSItemProvider else {
                    return
        }
        if textItemProvider.hasItemConformingToTypeIdentifier(
            kUTTypeText as String) {
            textItemProvider.loadItem(forTypeIdentifier:
                kUTTypeText as String, options: nil, completionHandler: { (result, error) in
                    if let text = result as? String {
                        let speechSynthesizer = AVSpeechSynthesizer()
                        let speechUtterance = AVSpeechUtterance(string: text)
                        speechUtterance.voice = AVSpeechSynthesisVoice(language: "en-US")
                        speechUtterance.rate = 0.1
                        speechSynthesizer.speak(speechUtterance)
                    }
            })
        }
    }
```
Ở đoạn code trên extensionContext sẽ lấy ra được NSExtensionItem được truyền vào từ activityItems của UIActivityViewController chỗ hàm shareButtonAction ở bên trên. Từ NSExtensionItem chúng ta sẽ lấy được NSItemProvider dùng để load text mà chúng ta đã truyền vào.

Sau khi lấy được text chúng ta sẽ thực hiện đọc đoạn văn như bình thường bằng framework Speech của Apple. Ở đây chúng ta có thể chọn ngôn ngữ mà Speech hỗ trợ để đọc text này.

Và đây là kết quả:
![](https://images.viblo.asia/5b526327-7c7a-44eb-aa27-e7e83de89ec2.png)


Khi muốn đọc văn bản ở trên chúng ta chỉ cần nhấn nút ReadText và nó sẽ hiển thị lên màn hình Action Extension đã design trước đó và đọc đoạn văn bản cho mình.