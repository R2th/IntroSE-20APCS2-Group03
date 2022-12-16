[Cách để so sánh chuỗi một cách hiệu quả trong go](https://hoovada.com/article/cach-de-so-sanh-chuoi-mot-cach-hieu-qua-trong-go)

Đây là bài viết của bạn [LilVNKid](https://hoovada.com/profile/lilvnkid) trên [Hoovada](https://hoovada.com/) - nền tảng hỏi và đáp chuyên nghiệp trên nhiều lĩnh vực khác nhau giúp giải đáp thắc mắc của mọi người.
![](https://images.viblo.asia/d20febf0-8634-4929-9150-c8606ca3838e.jpg)
So sánh chuỗi có thể không phải là điều bạn nghĩ tới khi tối ưu phần mềm. Thông thường, việc tối ưu bao gồm những việc như tách vòng lặp xuyên suốt các goroutine, tìm ra một thuật toán để hash(băm) nhanh hơn, hay một thứ gì đó nghe khoa học hơn. Chúng ta luôn có cảm giác mãn nguyện mỗi khi chỉnh sửa như thế. Tuy nhiên, việc so sánh chuỗi có thể là một nút thắt hàng đầu trong pipeline(đường dẫn). Ví dụ, đoạn mã dưới đây thường được dùng, nhưng nó lại là phương án tồi tệ nhất (các benchmark(điểm chuẩn) ở bên dưới) và đã gây nên vấn đề thật sự.

`strings.ToLower(tên) == strings.ToLower(tên khác)`

Đoạn mã trên trông rất đơn giản. Chuyển đổi từng chuỗi về chữ cái thường rồi so sánh. Để hiểu vì sao đây lại là phương án tồi tệ thì bạn cần phải biết thứ mà một chuỗi đại diện và cách mà ToLower hoạt động.

Nhưng đầu tiên, chúng ta hãy nói đến những trường hợp sử dụng của việc so sánh chuỗi. Khi so sánh chuỗi sử dụng toán tử ==, ta nhận được đáp án nhanh nhất và tối ưu nhất. Tuy nhiên, API và các phần mềm tương tự thường xem xét case(kiểu viết hoa hay thường của chữ cái). Đây là lúc ta thêm ToLower vào và gọi nó là tính năng hoàn chỉnh.

Trong Go, chuỗi là một dãy các rune bất biến. Rune là một thuật ngữ mà Go sử dụng để biểu thị một điểm mã. Bạn có thể đọc thêm về chuỗi, byte, rune và ký tự tại blog của Go. ToLower là một hàm thư viện tiêu chuẩn lặp lại trên mỗi rune trong một chuỗi, chuyển nó thành chữ cái thường và trả về chuỗi mới. Vì vậy, đoạn mã trên đi qua từng chuỗi hoàn toàn trước khi so sánh. Nó bị ràng buộc bởi độ dài của chuỗi. Đây là một số pseudocode(mã giả) thể hiện được mức độ phức tạp của đoạn mã trên.

Lưu ý: Bởi vì chuỗi là bất biến, `strings.ToLower` phân bổ không gian bộ nhớ mới cho hai chuỗi mới. Điều này góp phần vào sự phức tạp về thời gian, nhưng đấy không phải là trọng tâm bây giờ. Để cho nó ngắn gọn, pseudocode bên dưới giả định rằng các chuỗi có thể thay đổi được.

```
// Pseudocode
func CompareInsensitive(a, b string) bool {
    // lặp qua chuỗi a và chuyển đổi mọi rune thành chữ thường
    for i := 0; i < len(a); i++ { a[i] = unicode.ToLower(a[i]) }
     // lặp qua chuỗi b và chuyển đổi mọi rune thành chữ thường
    for i := 0; i < len(b); i++ { b[i] = unicode.ToLower(b[i]) }
    // lặp qua cả a và b và trả về false nếu có sự không trùng khớp
    for i := 0; i < len(a); i++ {
        if a[i] != b[i] {return false}
    }
    return true
}
```

Điều đó có nghĩa là chúng ta sẽ phải lặp lại lên tới 24 lần để phát hiện ra rằng hai chuỗi hoàn toàn khác nhau. Điều này rất kém hiệu quả. Chúng ta có thể biết các chuỗi này khác nhau bằng cách so sánh `unicode.ToLower (a [0]) và unicode.ToLower (b [0])` (pseudocode). Vì vậy, chúng ta hãy xem xét điều đó.

Để tối ưu hóa, chúng ta có thể loại bỏ hai vòng lặp đầu tiên trong CompareInsensitive và so sánh từng ký tự ở mỗi vị trí. Nếu các rune không khớp,chúng ta sẽ chuyển các rune thành chữ thường và so sánh lại. Nếu chúng vẫn không khớp thì chúng ta phá vỡ vòng lặp và coi hai chuỗi là không giống nhau. Nếu chúng khớp, chúng ta có thể tiếp tục với các rune tiếp theo cho đến khi kết thúc hoặc khi tìm thấy sự khác nhau. Chúng ta nên viết lại mã này.

```
// Pseudocode
func CompareInsensitive(a, b chuỗi) bool {
    //Một sự tối ưu hóa nhanh chóng. Nếu hai chuỗi có độ dài khác nhau thì chắc chắn chúng không giống nhau
    if len(a) != len(b) {return false}
    for i := 0; i < len(a); i++ {
    // Nếu các ký tự đã khớp thì chúng ta không cần thay đổi chúng sang chữ thường. Chúng ta có thể tiếp tục với rune tiếp theo
        if a[i] == b[i] {Continue}
        if unicode.ToLower(a[i]) != unicode.ToLower(b[i]) {
            // các ký tự viết thường không khớp, vì vậy chúng được coi là không khớp, kết thúc vòng lặp và trả về kết quả false
            return false
        }
    }
    // Độ dài chuỗi đã được duyệt qua mà không có sự không khớp, do đó, cả hai khớp với nhau
    return true
}
```

Chức năng mới hiệu quả hơn nhiều. Các giới hạn trên là độ dài của một chuỗi chứ không phải là tổng độ dài của cả hai chuỗi. Điều này trông như thế nào với so sánh ở trên? Vòng lặp sẽ chỉ chạy tối đa tám lần. Tuy nhiên, vì hai rune đầu tiên không giống nhau nên vòng lặp chỉ chạy một lần. Chúng ta đã tối ưu hóa so sánh của ta hơn gấp hai mươi lần!

 May mắn thay, có một chức năng trong string package cho việc này. Nó được gọi là `strings.EqualFold`.

**Benchmark**

Khi cả hai chuỗi giống nhau:
`Operations executedNanoseconds (ns) per operationBenchmarkEqualFoldBothEqual-820000000124 ns/opBenchmarkToLowerBothEqual-810000000339 ns/op`

Khi cả hai chuỗi giống nhau cho tới rune cuối cùng:
`Operations executedNs per operationBenchmarkEqualFoldLastRuneNotEqual-820000000129 ns/opBenchmarkToLowerLastRuneNotEqual-810000000346 ns/op`

Khi cả hai chuỗi khác nhau:
`Operations executedNs per operationBenchmarkEqualFoldFirstRuneNotEqual-830000000011.2 ns/opBenchmarkToLowerFirstRuneNotEqual-810000000333 ns/op`

Khi cả hai chuỗi có case khác nhau tại rune 0:
`Operations executedNs per operationBenchmarkEqualFoldFirstRuneDifferentCase-820000000125 ns/opBenchmarkToLowerFirstRuneDifferentCase-810000000433 ns/opp`

Khi cả hai chuỗi có case khác nhau ở giữa
`Operations executedNs per operationBenchmarkEqualFoldMiddleRuneDifferentCase-820000000123 ns/opBenchmarkToLowerMiddleRuneDifferentCase-810000000428 ns/op`

Có một sự khác biệt đáng kinh ngạc (gấp 30 lần!) khi rune đầu tiên của mỗi chuỗi không khớp. Điều này là do thay vì đi qua cả hai chuỗi và sau đó so sánh, vòng lặp chỉ chạy một lần và ngay lập tức trả về false. Trong mọi trường hợp, EqualFold tốt hơn so với so sánh ban đầu gấp nhiều lần.

**Nó có quan trọng không?**

Bạn có thể nghĩ rằng 400 nano giây không quan trọng. Trong hầu hết các trường hợp, bạn có thể đúng. Tuy nhiên, một số tối ưu hóa rất nhỏ cũng đơn giản như bất kỳ giải pháp nào khác. Trong trường hợp này, nó dễ dàng hơn so với giải pháp ban đầu.

Các kỹ sư chất lượng luôn đưa những tối ưu hóa đơn giản vào trong quy trình làm việc bình thường của họ. Họ không chờ đến khi phần mềm có vấn đề mới tối ưu nó, họ viết phần mềm đã được tối ưu hóa ngay từ đầu. Ngay cả đối với những kỹ sư giỏi nhất, việc viết phần mềm hiệu quả nhất từ đầu là điều rất khó. Họ hầu như không thể nghĩ ra mọi trường hợp và tối ưu hóa cho nó. Sau cùng thì, chúng ta hiếm khi biết được những hành vi điên rồ của người dùng cho đến khi chúng ta cho họ sử dụng phần mềm của mình.

Tuy nhiên, việc đưa các giải pháp đơn giản này vào quy trình làm việc bình thường của bạn sẽ cải thiện tuổi thọ của các phần mềm và ngăn chặn cácnút thắt không cần thiết trong tương lai. Ngay cả khi điều đó không bao giờ trở thành vấn đề, bạn không hề lãng phí bất kì nỗ lực nào.

Đây là bài viết của bạn [LilVNKid](https://hoovada.com/profile/lilvnkid) trên [Hoovada](https://hoovada.com/). Các bạn có thể kết nối với nhau thông qua [Hoovada trên Facebook](https://www.facebook.com/groups/144206164549707). Một số câu hỏi hay trên [Hoovada](https://hoovada.com/):

* [Những phần mềm thiết kế hình ảnh tốt trên smartphone?](https://hoovada.com/question/nhung-phan-mem-thiet-ke-hinh-anh-tot-tren-smartphone)
* [Vì sao càng ngày ngành công nghệ thông tin lại được quan tâm và trở thành mục tiêu của nhiều bạn trẻ ?](https://hoovada.com/question/vi-sao-cang-ngay-nganh-cong-nghe-thong-tin-lai-duoc-quan-tam-va-tro-thanh-muc-tieu-cua-nhieu-ban-tre)
* [Lịch sử hình thành youtube?](https://hoovada.com/question/lich-su-hinh-thanh-youtube)