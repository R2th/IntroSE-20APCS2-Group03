**Giới thiệu**

Tháng vừa rồi là một tháng ngập đầu trong công việc của tôi. Nhiều vấn đề khách quan khiến dự án tôi đang join lụt trong task và bug =)). 
Trong vòng đời của developer chắc ai cũng phải trải qua nhiều giai đoạn thế này. Tôi tin chắc các bạn cũng vậy, không biết các bạn thế nào
nhưng tôi lại thích như vậy (Nhưng đừng liên tục cả năm chắc chớt =)) ). Bởi mọi thứ cứ trôi qua trong bình yên thì không có gì vui cả, tôi thích 
thử thách vì tôi "nghiện" cái cảm giác khi vượt qua nó. Quay lại chủ đề chính một chút, sau khi tôi giải quyết công việc gần ổn thoả thì tôi chợt nhớ
nợ Viblo một cái gì đó mà khá lâu tôi chưa trả. Lục lại contents thì mới "À" bài chia sẻ về những cái mới của Swift 5 vẫn còn dang dở. Không biết bây 
giờ là muộn chưa nhưng tôi hy vọng nó vẫn còn hữu ích với các bạn. 

Đây là bài viết về những thay đổi khi chúng ta sử dùng Swift 5 phần I: https://viblo.asia/p/co-nhung-gi-moi-trong-swift-5-phan-i-OeVKBq8r5kW
Tôi đã giới thiệu với các bạn 2 thay đổi khá thú vị đó là : Result type và Raw strings. 

Hôm nay tôi giới thiệu với các bạn về `Customizing string interpolation`.

**I. Customizing string interpolation**

- Về cơ bản thì `Customizing string interpolation` cho phép chúng ta kiểm soát các objects xuất hiện trong strings. 
Swift có default behavior cho struct giúp chúng ta có thể debug dễ dàng bằng cách print các giá trị của properties trong struct. 
Nhưng khi sử dụng với class thì không có defaut behavior nên chúng ta sẽ sử dụng `Customizing string interpolation` 
là giải pháp tốt nhất để thực hiện debug. 

Ví dụ chúng ta có một struct như này : 

```
struct User {
    var name: String
    var age: Int
}
```

Nếu chúng ta muôn thêm một string interpolation để lấy giá trị User dễ dàng, chúng ta có thể viết một extension cho string như sau :

```
extension String.StringInterpolation {
    mutating func appendInterpolation(_ value: User) {
        appendInterpolation("My name is \(value.name) and I'm \(value.age)")
    }
}
```

Bây giờ chúng ta có thể tạo một user và print thử giá trị của nó: 

```
let user = User(name: "Guybrush Threepwood", age: 33)
print("User details: \(user)")
```

Sẽ có kết là " User details: My name is Guybrush Threepwood and I'm 33".  Trong khi đó chúng ta có thể custom string interpolation và print được kết quả là:
"User details: User(name: "Guybrush Threepwood", age: 33). "  Nó có thể lấy được tất cả các giá trị của tất cả properties chỉ cần một lần. 

Bạn có thể gọi appendInterpolation() nhiều lần. Ví dụ chúng ta có thêm một string interpolation để lặp lại một string nhiều lần như sau: 

```
extension String.StringInterpolation {
    mutating func appendInterpolation(repeat str: String, _ count: Int) {
        for _ in 0 ..< count {
            appendLiteral(str)
        }
    }
}

print("Baby shark \(repeat: "doo ", 6)")
```

Thật tiện lợi cho công việc của chúng ta. Có thể nói đây là một trong những thay đổi khá hay và cần thiết của Swift 5. 

**II. Checking for integer multiples**

Ở Swift tôi phát hiện ra một method mới cho kiểu integers để kiểm tra xem một số của phải là bội số của số khác không nhằm thay thế cho dấu "%". 
Trước đây chúng ta hay check một số có phải là bội số của số khác không bằng cách : 

`if A % B == 0 `

Bây giờ chúng ta có thể thay bằng : 

`if A.isMultiple(of: B)`

**III Kết luận**

Mỗi lần Swift có version mới thường thì chúng ta sẽ phải update kiến thức và update code cho project khá nhiều. Nhưng Swift 5 lần này thì sự bất tiện đó 
dường như không gặp lại nữa. Hầu hết sự thay đổi đều là những tính năng mới nên chúng ta không cần quá quan tâm đến việc update code cho project. 
Còn một số những thay đổi nữa nhưng tôi sẽ update ở bài tiếp theo. Sau đây là link tham khảo cho các bạn nếu các bạn cần tìm hiểu hết một lần. 

https://www.hackingwithswift.com/articles/126/whats-new-in-swift-5-0

Hãy cùng học hỏi để tiến bộ hơn ! Chào các bạn.