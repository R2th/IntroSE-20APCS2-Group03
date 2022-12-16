[AVSpeechSynthesizer](https://developer.apple.com/documentation/avfoundation/avspeechsynthesizer) là một phần của framework AVFoundation được sử dụng để chuyển đổi văn bản thành âm thanh nói. Nó là một công cụ tuyệt vời để chuyển đổi văn bản thành âm thanh nói. Trong bài viết ngắn này, chúng ta sẽ sử dụng AVSpeechSynthesizer trên một ứng dụng demo nhỏ.

### The Example

Bài viết sẽ dựa trên ứng dụng [speechsynth](https://gitlab.com/agostini.tech/DADependencyInjection/tree/feature/speechsynth) kết nối với ‘[themoviedb](https://www.themoviedb.org/)‘ và tải xuống một danh sách các bộ phim nổi tiếng. Sau đó, bạn có thể hiển thị một số chi tiết về một bộ phim nhất định. Ứng dụng  sẽ nói ra tiêu đề của bộ phim đã chọn và nó sẽ đọc phần mô tả ngắn nếu người dùng nhấn nút. Ứng dụng cũng sẽ có một số thanh trượt để chúng ta có thể kiểm soát cao độ, tốc độ và âm lượng.

<br>


Giao diện sẽ khá đơn giản:

<br>

![](https://images.viblo.asia/e4cce6fc-01db-45e5-bf9b-a9999e16a5d4.png)

Chúng ta sẽ có một số thuộc tính private mà chúng ta sẽ sử dụng sau:

```
private let speechSynthesizer = AVSpeechSynthesizer()
private var pitch: Float = 1.0
private var rate = AVSpeechUtteranceDefaultSpeechRate
private var volume: Float = 1.0
```

Trên cùng là bộ synthesizer, chúng ta khởi tạo nó ngay lập tức. Một điều cần lưu ý là thuộc tính 'rate', có giới hạn trên và dưới được xác định bởi AVSpeechUtteranceMinimumSpeechRate’ và ‘AVSpeechUtteranceMaximumSpeechRate’. Vì vậy, chúng ta sẽ phải đặt thanh trượt tỷ lệ của mình thành các giá trị tối thiểu và tối đa đó:

<br>

```
self.rateSlider.minimumValue = AVSpeechUtteranceMinimumSpeechRate
self.rateSlider.maximumValue = AVSpeechUtteranceMaximumSpeechRate
self.rateSlider.value = AVSpeechUtteranceDefaultSpeechRate
```

Các hành động trượt khá đơn giản, chúng chỉ cập nhật các biến cục bộ:

```
@IBAction func onPitchChanged(_ sender: UISlider) {
    self.pitch = sender.value
}
    
@IBAction func onRateChanged(_ sender: UISlider) {
    self.rate = sender.value
}
    
@IBAction func onVolumeChanged(_ sender: UISlider) {
    self.volume = sender.value
}
```

Ở phía trên cùng của giao diện, chúng ta có ‘Read’ button. Chúng ta muốn button này bị vô hiệu hóa trong khi trình đang nói.

<br>

```
extension DetailsViewController: AVSpeechSynthesizerDelegate {
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didStart utterance: AVSpeechUtterance) {
        self.readButton.isEnabled = false
    }
    
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        self.readButton.isEnabled = true
    }
}
```

Khi chế độ xem được tải, chúng ta sẽ có bộ tổng hợp đọc tiêu đề của bộ phim.

```
let utterance = AVSpeechUtterance(string: self.titleLabel.text ?? "")
self.speechSynthesizer.speak(utterance)

```

Tất cả những gì bạn phải làm là khởi tạo ‘AVSpeechUtterance’, với chuỗi và điều đó.

```
@IBAction func read() {
    let utterance = self.getUtterance(self.detailsLabel.text ?? "")
    
    self.speechSynthesizer.speak(utterance)
}
    
private func getUtterance(_ text: String) -> AVSpeechUtterance {
    let utterance = AVSpeechUtterance(string: text)
    utterance.pitchMultiplier = self.pitch
    utterance.rate = self.rate
    utterance.volume = self.volume
    
    return utterance
}
```

Bây giờ, khi bạn run app và chọn một bộ phim từ danh sách, bạn sẽ nghe thấy tiêu đề được nói với bạn. Hãy thử và nhấn ‘Read’ button  và [xem điều gì sẽ xảy ra](https://photos.google.com/share/AF1QipMXe6DP-IKBsju_cXq6M-cHvf89VAJXsWeDVsCv7YX56ckAqsiDcIxgyvNDVgKnAQ?key=RTJncC04OXdCX1JKbF8tYTJtbG8zVzdJOGNtc2l3) 🙂

<br>

Bạn có ứng dụng của bạn nói chuyện với bạn chỉ với một vài dòng mã. Khá tuyệt!
<br>

### Conclusion

Các trường hợp sử dụng cho văn bản để nói rất nhiều. Ứng dụng điều hướng là một ví dụ hoàn hảo cho việc này. Nhưng bạn có thể dễ dàng có một ứng dụng đọc tin tức để đọc các bài báo cho người dùng.

<br>

Bài viết được dịch theo [bài viết cùng tên của tác giả Dejan Agostini ](https://agostini.tech/2018/11/11/using-avspeechsynthesizer/). Và source code ứng dụng đầy đủ tại [GitLab](https://gitlab.com/agostini.tech/DADependencyInjection/tree/feature/speechsynth).