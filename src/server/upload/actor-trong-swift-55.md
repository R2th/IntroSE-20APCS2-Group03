SE-0306 giới thiệu các Actor, về mặt khái niệm tương tự như các lớp an toàn để sử dụng trong các tác vụ Concurrent. Điều này có thể thực hiện được vì Swift đảm bảo rằng trạng thái có thể thay đổi bên trong Actor của bạn chỉ được truy cập bởi một luồng duy nhất tại bất kỳ thời điểm nào, giúp loại bỏ nhiều lỗi nghiêm trọng lúc compile. Hôm nay tôi sẽ giới thiệu đến bạn cách sử dụng công cụ này

Để giải thích vấn đề, chúng ta hãy tham khảo đoạn code tạo class `RiskyCollector` giúp trade card giữa các nhà sưu tập:
```
class RiskyCollector {
    var deck: Set<String>

    init(deck: Set<String>) {
        self.deck = deck
    }

    func send(card selected: String, to person: RiskyCollector) -> Bool {
        guard deck.contains(selected) else { return false }

        deck.remove(selected)
        person.transfer(card: selected)
        return true
    }

    func transfer(card: String) {
        deck.insert(card)
    }
}
```

Trong môi trường single-thread đoạn code trên sẽ không có vấn đề gì. chúng ta kiểm tra xem bộ bài của chúng ta có chứa thẻ được đề cập hay không, xóa nó, sau đó thêm nó vào bộ bài của người sưu tập khác. Tuy nhiên, trong môi trường đa luồng, mã của chúng ta tiềm ẩn điều kiện chạy đua, đây là một vấn đề, theo đó kết quả của mã sẽ khác nhau khi hai phần riêng biệt của mã của chúng ta chạy cạnh nhau.

Nếu chúng ta gọi function `send(card:to:)` nhiều hơn một lần cùng thời điểm, các kịch bản sau có thể xảy ra: 
    1. Luồng đầu tiên kiểm tra xem lá bài có trong bộ bài hay không và nó vẫn tiếp tục. 
    2. Luồng thứ hai cũng kiểm tra xem lá bài có trong bộ bài hay không, và nó vẫn tiếp tục. 
    3. Thread đầu tiên loại bỏ thẻ khỏi bộ bài và chuyển nó cho người khác. 
    4. Thread thứ hai cố gắng xóa lá bài khỏi bộ bài, nhưng thực sự nó đã biến mất nên sẽ không có gì xảy ra. Tuy nhiên, nó vẫn chuyển lá bài cho người kia.
    
Trong tình huống đó, một người chơi mất một thẻ trong khi người kia giành được hai thẻ và nếu thẻ đó là Black Lotus từ Magic the Gathering thì bạn đã gặp phải một vấn đề lớn!

Các tác nhân giải quyết vấn đề này bằng cách giới thiệu sự cô lập Actor: các thuộc tính và phương thức được lưu trữ không thể được đọc từ bên ngoài đối tượng Actor trừ khi chúng được thực hiện không đồng bộ và các thuộc tính được lưu trữ hoàn toàn không thể được ghi từ bên ngoài đối tượng Actor. Hành vi không đồng bộ không có để thực hiện; thay vào đó là do Swift tự động đặt các yêu cầu này vào hàng đợi được xử lý tuần tự để tránh các race condition.

Vì vậy chúng ta có thể viết lại `RiskyCollector` thành `SafeCollector` như sau:

```
actor SafeCollector {
    var deck: Set<String>

    init(deck: Set<String>) {
        self.deck = deck
    }

    func send(card selected: String, to person: SafeCollector) async -> Bool {
        guard deck.contains(selected) else { return false }

        deck.remove(selected)
        await person.transfer(card: selected)
        return true
    }

    func transfer(card: String) {
        deck.insert(card)
    }
}
```

Có một số điều cần lưu ý trong ví dụ đó: 
    1. Actor được tạo bằng từ khóa Actor mới. Đây là một kiểu concrete nominal type mới trong Swift, kết hợp các cấu trúc, lớp và enum.
    2. Phương thức send () được đánh dấu là không đồng bộ, vì nó sẽ cần phải tạm dừng công việc của mình trong khi chờ quá trình chuyển hoàn tất. 
    3. Mặc dù phương thức ` tranfer(card : )` không được đánh dấu là không đồng bộ, chúng ta vẫn cần gọi nó với await vì nó sẽ đợi cho đến khi tác nhân SafeCollector khác có thể xử lý yêu cầu.
  
Nói rõ hơn, một Actor có thể sử dụng các thuộc tính và phương thức của riêng nó một cách tự do, không đồng bộ hoặc theo cách khác, nhưng khi tương tác với một Actor khác, nó phải luôn được thực hiện một cách không đồng bộ. Với những thay đổi này, Swift có thể đảm bảo rằng tất cả trạng thái tách biệt với Actor không bao giờ được truy cập đồng thời và quan trọng hơn điều này được thực hiện tại thời điểm biên dịch để đảm bảo an toàn.

Các Actor và Class có một số điểm tương đồng: 
    - Cả hai đều là loại tham chiếu, vì vậy chúng có thể được sử dụng cho trạng thái chia sẻ. 
    - Chúng có thể có các phương thức, thuộc tính, bộ khởi tạo và subscript. 
    - Chúng có thể tuân theo các giao thức và generic. 
    - Mọi thuộc tính và phương thức tĩnh đều hoạt động giống nhau trong cả hai loại, bởi vì chúng không có khái niệm về self và do đó không bị cô lập.
    
Ngoài sự cô lập Actor, có hai điểm khác biệt quan trọng khác giữa các Actor và Class: 
    - Các Actor hiện không hỗ trợ kế thừa, điều này làm cho các trình khởi tạo của chúng đơn giản hơn nhiều - không cần các trình khởi tạo tiện lợi, ghi đè, từ khóa cuối cùng và hơn thế nữa. Điều này có thể thay đổi trong tương lai.
    - Tất cả các Acotr hoàn toàn tuân theo một giao thức Actor mới; không có concrete type nào khác có thể sử dụng điều này. Điều này cho phép bạn hạn chế các phần khác của mã để nó chỉ có thể hoạt động với các Actor.

Chúc bạn ứng dụng thành công Actor vào code của mình!