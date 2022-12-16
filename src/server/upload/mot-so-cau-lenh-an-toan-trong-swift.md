Một số cách giúp ứng dụng iOS hạn chế được việc crash trong quá trình phát triển và sử dụng từ giai đoạn code :grinning:


# Luôn xét giá trị mặc định
Swift cung cấp cho các nhà phát triển một cách rất thuận tiện để cung cấp một giá trị trong khi sử dụng một biến, trong trường hợp nó là nil. Hãy xem ví dụ dưới đây:

```
Server.request("getNumberOfLikes") { (response, error) in
    self.numberOfLikes = response as! Int
    self.updateUI()
}
```
Bạn có phát hiện ra vấn đề không? Mặc dù đây được coi là một sai lầm của người mới, nhưng nó cũng có thể xảy ra với các nhà phát triển có kinh nghiệm hơn. Trong trường hợp bạn không nhận thấy, đó là việc forced unwrap response

`response as! Int`

Cho dù bạn có chắc chắn rằng phản hồi sẽ luôn ở đó, nhưng sẽ có lúc xảy ra sự cố và ứng dụng sẽ bị crash. 

Rất có thể, điều đó có thể xảy ra do bạn hoặc người khác sẽ thay đổi trong tương lai. Một thuộc tính hoặc một phản hồi bây giờ có thể là bắt buộc, nhưng trong tương lai logic của bạn có thể thay đổi và hiển thị thuộc tính đó hoặc không có giá trị. Vì vậy, khi thay đổi đó có hiệu lực, rất có thể ứng dụng của bạn sẽ bị lỗi hàng loạt!
Đây là những gì bạn nên làm để tránh những thảm họa như vậy:

```
Server.request("getNumberOfLikes") { (response, error) in
    self.numberOfLikes = response as? Int ?? 0
    self.updateUI()
}
```

Cái đó ?? được gọi là toán tử liên kết **nil coalescing operator** . Thay vì kiểm tra xem một biến có phải là nil hay không và nếu có, hãy gán cho nó một giá trị, toán tử liên kết nil có thể làm điều đó trong 1 dòng code. Nó thực sự kiểm tra xem biểu thức bên trái có tạo ra giá trị không và nếu có, nó sẽ gán cho biến giá trị mà bạn cung cấp ở bên phải. Nếu không, nó sẽ mở biến một cách an toàn.

-----

# Sử dụng kiểu if-let & guard-let 
Mặc dù toán tử liên kết nil rất hữu ích, nhưng đôi khi bạn cần thêm một chút logic để tính toán. Ví dụ: trong trường hợp bạn biết rằng một giá trị đôi khi có thể là 0 và đôi khi không, bạn nên sử dụng câu lệnh if-let.

Ví dụ:
```
Server.request("getNumberOfLikes") { (response, error) in
    if response != nil {
        self.numberOfLikes = response as! Int
    }
    self.updateUI()
}
```

Mặc dù trường hợp trên có vẻ an toàn hơn so với việc force unwrap, nó vẫn có thể gây ra sự cố. Điều gì sẽ xảy ra nếu thực sự phản hồi không phải là con số không, nhưng vì lý do gì đó nó không phải là Int nữa?

Sử dụng ***if-let***

```
Server.request("getNumberOfLikes") { (response, error) in
    if let numberOfLikes = response as? Int {
        self.numberOfLikes = numberOfLikes
    }
    self.updateUI()
}
```

Bằng cách đó, bạn có thể kiểm tra cụ thể những gì bạn mong đợi, theo cách an toàn nhất có thể! Tất nhiên, bạn luôn có thể thêm nhiều lần kiểm tra hơn trong cùng một câu lệnh if-let, như sau:

```
Server.request("getNumberOfLikes") { (response, error) in
    if let numberOfLikes = response as? Int,
       let variable2 = something as? Type,
       let variable3 = somethingElse as? Type {
       ...
    }
    self.updateUI()
}
```

Câu lệnh if-let sẽ chỉ được coi là hợp lệ nếu tất cả các câu lệnh con không phải là nil. Rõ ràng, bạn có thể thêm các câu lệnh else-if-let và else nếu cần.


-----

Trong tiêu đề trên, tôi đã đề cập đến một loại câu lệnh khác, câu lệnh guard-let. Điều đó, không phải khai báo một biến để được sử dụng, nhưng đó là một điểm cộng. Bạn sẽ thấy nó hữu ích hơn trong những trường hợp bạn muốn dừng hoàn toàn dòng code của một function hoặc một block bên dưới nó.

```
Server.request("getNumberOfLikes") { (response, error) in
    guard let numberOfLikes = response as? Int else { return }
    self.updateUI()
}
```

Trong ví dụ này, hàm updateUI sẽ chỉ được gọi nếu câu lệnh guard-let không trả về. Nếu bạn chỉ muốn kiểm tra xem một biến có chứa giá trị mà không lưu trữ nó ở đâu đó hay không và nếu không, hãy trả về, thì bạn có thể thực hiện điều này:

```
Server.request("getNumberOfLikes") { (response, error) in
    guard response as? Int else { return }
    self.updateUI()
}
```

# Tổng kết

- Các toán tử liên kết nil - ??, cho phép bạn cung cấp giá trị mặc định cho một biến trong trường hợp biến đó là nil. Bạn nên sử dụng nó trong những trường hợp mà bạn luôn mong đợi một giá trị.
- Câu lệnh if-let, giúp bạn unwrap một cách an toàn các tùy chọn có thể có hoặc không có giá trị.
- Câu lệnh guard-let, phù hợp nhất cho các trường hợp bạn cần thoát block/func khi một biến hoặc tập hợp các biến bằng nil hoặc không khớp với các kiểm tra bạn cung cấp.