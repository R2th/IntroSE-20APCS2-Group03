Các bạn có thể coi P1 ở [đây](https://viblo.asia/p/tim-hieu-mot-vai-nguyen-nhan-gay-crash-app-cho-beginner-ios-ByEZkxQ4lQ0)

## Exhibit B: Weak Grip — Weak References

Đến với tình huống crash thứ hai mà bạn sẽ học fix bug liên quan đến một cách hiển thị và ẩn view một cách bất thường.
![](https://images.viblo.asia/c7c20ffa-2966-4cae-af1c-c7b0ace24a5f.gif)

Màn hình **Weak Referenceences** là một vd đơn giản gồm 2 bước, trong đó bước 2 chỉ hoạt động nếu câu trả lời cho câu hỏi đầu tiên là "có".

Lưu ý: Có nhiều cách bạn có thể đạt bị kết quả tương tự khác với cách hiển thị trong vd này. Mục đích là để hiển thị một kịch bản gây ra crash.
Khi bạn turn of switch, câu hỏi thứ hai sẽ biến mất, nhưng khi bạn bật lại thì có một lần nữa.
![](https://images.viblo.asia/5880480d-4c6f-46e5-80e6-648b59d7877e.png)

Ứng dụng đã bị crash trong dòng 37 trong **WeakReferencesViewController.swift**.

*WeakReferencesViewController* có ba mục: 

1. Một IBOutlet tới stackView.

2. Một IBOutlet tới secondQuestionView.

3. Một IBAction tới switchValueChanged(_: ), bạn có thể thay đổi giá trị của switch để  xoá secondQuestionView hoặc thêm nó trở lại bên dưới của stackView.

Có hai cách để tìm hiểu lý do tại sao Xcode hiển thị *nil*: Xem các giá trị từ  **Variables View** hoặc kiểm tra giá trị của hai biến được tìm thấy trên dòng log crash từ **Console Log**.

![](https://images.viblo.asia/42f45db5-5774-4204-9c75-0c7f53db061e.png)

Từ những gì đưa ra của trình debug thì giá trị của secondQuestionView là nil, nhưng tại sao? Thêm một breakpoint trên dòng đầu tiên của switchValueChanged (_ :) và restart lại app để bắt đầu điều tra.

Build and run.

![](https://images.viblo.asia/e17440f2-efb4-4c3c-8555-b52398465034.png)

secondQuestionView không nil khi bạn turn off switch. Tuy nhiên, Khi bạn turn on lại thì view bị biến mất, đây là nguyên nhân nó bị nil.


### Understanding the Crash

Lý do cho điều đó là vì reference chain trong UIKit. Mỗi view có một strong reference đến các subview bên trong nó. Miễn là secondQuestionView nằm trong screen view hierarchy thì sẽ có một tham chiếu mạnh mẽ đến nó.

Vì vậy, khi bạn xóa secondQuestionView từ superview, bạn đã phá vỡ mối quan hệ đó. Và nhìn vào định nghĩa IBOutlet của secondQuestionView, bạn sẽ thấy nó bị đánh dấu là "weak". Do đó, nó được giải phóng khỏi bộ nhớ và reference của nó và thay đổi thành nil vì không thứ gì giữ nó để ngăn chặn hệ thống làm điều đó.

Khi bạn xóa từ khóa "weak" trong phần khai báo secondQuestionView, thì crash sẽ biến mất. Bạn có thể thực hiện tương tự cho stackView để đề phòng, nhưng nó sẽ không có tác dụng lắm do bạn không bao giờ xóa stackView khỏi superview nên bạn để weak với stackView cũng ko sao.

Loại bỏ các từ khóa weak, sau đó build and run để test lại kịch bản.

![](https://images.viblo.asia/783da723-1109-436d-9114-83063ac4aca9.gif)

Bạn có thể thấy rằng các hình thức hoạt động tốt bây giờ. View xuất hiện và biến mất như mong muốn.

## Exhibit C: Unexpected Updates — Invalid Table Updates

Tình huống thứ ba hơi khác so với những lần trước.

Mở mục thứ ba, được gọi là **Invalid Table Update**, trên gallery screen để bắt đầu điều tra.

![](https://images.viblo.asia/7f8cfc24-42e4-4493-9ba3-0c59f0f44935.png)

Màn hình này là 1 tableView với 4 cell. Mỗi cell có số được ghi trên đó. Ngoài ra còn có một nút nhỏ ở góc trên bên phải để thêm nhiều cell.

Thử Run và nhấn nút đó. Như bạn có thể dự đoán, có một vụ crash xảy ra. Nhưng dòng nào đang gây ra crash? Và những gì trong tất cả những gì trong log?

![](https://images.viblo.asia/3fe0cb1e-6354-48d8-bf02-1e2f46c54e2a.png)

Xcode đã dừng tại AppDelegate.swift ngay dòng 32.

Hãy thêm một exception breakpoint cho project của bạn, sau đó build and run để thấy sự khác biệt.

![](https://images.viblo.asia/31284861-f897-4e61-afe0-0c2f3a1b4256.png)

Lần này, Xcode đã dừng trong **InvalidTableUpdatesViewController.swift** trên dòng 37. Log bị trống và không có thông tin nào được cung cấp vì điểm dừng đã dừng ngay trước khi exception xảy ra. Đây là một loại crash khác với những lần trước.

Khi bạn nhấn nút **Continue**, Xcode sẽ trở về dòng khai báo lớp trong **AppDelegate.swift** và log sẽ có thông tin crash.

![](https://images.viblo.asia/d9427a77-6fa9-46b0-82e6-3c73d882ee0a.png)

Log chứa thông tin về crash và thông tin **stack trace** khi sự cố xảy ra. Hầu hết các tình huống thì bạn đã đạt được thông tin cần thiết khi bạn debug từ Xcode và bật exception breakpoint. Hãy xem thông tin crash.

```
*** Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'attempt to insert row 4 into section 0, but there are only 4 rows in section 0 after the update.
```

### A Wider View of the Problem

Trước khi kiểm tra nguyên nhân của crash, bạn nên hiểu mục đích của addPressed (). Ba dòng làm như sau:

1. Tạo một đối tượng IndexPath sau hàng cuối cùng của section 0. Index 4 đại diện cho item thứ 5, vì các chỉ số bắt đầu từ 0.

2. Nói với tableView để chèn một hàng mới tại newIndex.

3. Thêm hàng mới vào mảng itemsList .

Đầu tiên, hãy nhìn vào flow: Nó có ý nghĩa và nó chính xác. Nhưng Xcode chỉ nói với bạn rằng nó không có. Vì vậy, những gì sai trái với nó?

### Narrowing Down the Problem

Exception breakpoint dừng lại ở dòng thứ hai, vì vậy app đã không thêm cell mới vào *itemsList*. Tại thời điểm này, nó có vẻ như là một sửa chữa đơn giản - thêm mục mới vào mục ListList trước khi chèn nó vào tableView. Nó giúp hiểu thêm về nguyên nhân gây ra vụ crash.

Hãy chắc chắn rằng bạn đã kích hoạt exception breakpoint, sau đó build and run và mở lại cùng một màn hình.

Mở **InvalidTableUpdatesViewController.swift** và thêm các breakpoint trên dòng 37, điều này gây ra crash và trên dòng 44, đó là sự return của tableView(_:numberOfRowsInSection:) . Nhấn nút Add để ứng dụng dừng ở breakpoint đầu tiên, sau đó nhấn Continue. Bây giờ, hãy nhìn vào ngăn xếp cuộc gọi bên trái:

![](https://images.viblo.asia/3b8588f6-2d2a-4161-862c-2f2f66c31158.png)

Chú ý rằng insertRows(at:with:)  có gọi hàm tableView(_:numberOfRowsInSection:) để kiểm tra kích thước mới của itemsList. 

Hay nói cách khác, bạn nói rằng tableView có 1 item mới, nhưng tableView không thấy rằng itemsList được tăng thêm.

Đây là một bằng chứng về hoạt động tableView. Di chuyển code nơi bạn thêm mục vào itemList, giữa hai dòng còn lại. addPress () bây giờ trông như thế này:

```
@IBAction func addPressed() {
  let newIndex = IndexPath(row: itemsList.count, section: 0)
  itemsList.append((itemsList.last ?? 0) + 1)
  tableView.insertRows(at: [newIndex], with: .automatic)
}
```

Điều này cập nhật nguồn dữ liệu trước khi cập nhật chế độ xem. Build and run, sau đó nhấn nút Add để xem mọi thứ có hoạt động không:

![](https://images.viblo.asia/2183b770-26e3-4e26-b736-4a309efa0059.gif)

Tuyệt vời, giờ bạn đã sửa cả ba màn hình trong ứng dụng. Nhưng vẫn còn một điểm nữa về crash app mà bạn nên biết.

## Assertions

**Assertion** là crash được kích hoạt bằng tay, bạn có thể chèn vào code của mình. Câu hỏi rõ ràng xuất hiện trong đầu là: Tại sao bạn lại viết code để làm hỏng ứng dụng của chính mình?

Đó là một câu hỏi rất hay. Tuy nhiên có vẻ phi logic, bạn có thể hiểu tại sao điều này hữu ích trong chốc lát. :]

Hãy tưởng tượng bạn đang viết một đoạn code phức tạp và có một số luồng trong logic của bạn mà không ai nên tiếp cận bởi vì tiếp cận chúng có nghĩa là đã xảy ra sự cố nghiêm trọng.

Những tình huống này là lý tưởng cho các assertion. Họ sẽ giúp bạn hoặc bất kỳ ai khác sử dụng code của bạn phát hiện ra rằng một thứ gì đó không hoạt động đúng trong quá trình phát triển.

### Writing Your Own Reusable Code

Viết một framework cũng là một ví dụ tốt trong đó các assertion có thể hữu ích. Bạn có thể đưa ra một assertion nếu nhà developer khác cung cấp đầu vào không hợp lý cho framework của bạn không giành được hiệu suất như mong đợi.

Một ví dụ về thời điểm tiện dụng này có trong **ForceUnwrappingViewController.swift**. Sẽ không có gì xảy ra trong *showResult(result:)* nếu *result* không được lồng vào *Int* hoặc *String*, và bất cứ ai đang sử dụng code của bạn đều không biết điều gì đang diễn ra ngay lặp tức. Tất nhiên họ đã làm điều gì đó sai, nhưng sẽ thật tuyệt vời nếu code đủ thông minh để nói với họ điều gì?

Để dùng thử, hãy thêm code này vào cuối *showResult(result:)*

```
else {
  assertionFailure("Only Int or Strings are accepted in this function")
}
```

Bạn đưa ra một assertion nếu result không phải là một *Int* hoặc một *String*. Thêm dòng code này vào cuối tính *calculatePressed(:)* để xem cách nó hoạt động:

```
showResult(result: UIView())
```

Tại đây, bạn gửi *showResult(result:)* một giá trị rất bất ngờ, một *UIView*!

Build and run, mở màn hình **Force Unwrapping** và nhấn nút **Calculate**.

![](https://images.viblo.asia/7cf8b8b0-eafb-4198-8631-5fe4a1dab0f2.png)

Ứng dụng của bạn bị crash trong **ForceUnwrappingViewController.swift** trên dòng 65.

Đúng như dự đoán, crash là vì assertion, nhưng bạn đã hoàn toàn trả lời câu hỏi. Mã code có nên nằm trong ứng dụng cuối cùng trên AppStore nếu developer không xử lí cho tất cả các trường hợp?

Câu trả lời cho câu hỏi là: Nó không quan trọng. :]

Các assertion thực sự tồn tại trong sản phẩm cuối cùng của bạn, nhưng nó sẽ như thể chúng không có gì cả.

Các assertion chỉ hoạt động trong khi ứng dụng của bạn đang được assertion theo cấu hình **debug**. Các assertion sẽ không làm gì trong cấu hình **release**, đó là cách bạn sẽ build ứng dụng của mình khi bạn tải nó lên AppStore.

Bạn muốn xem nó cho chính mình? Bạn sẽ thử nó trong bước tiếp theo.

## Changing Your Build Configuration

Nhấp vào target **CrashGallery** ở góc trên bên trái của cửa sổ Xcode của bạn. Chọn **Edit Scheme** từ drop-down menu, sau đó chọn **Run** từ phía bên trái của cửa sổ mới và chọn **Release** từ **Build Configuration**.

![](https://images.viblo.asia/267c1555-6c43-47a3-84a2-967a8d5797bc.gif)

Build and run, và bấm the **Calculate** button lần nữa.

![](https://images.viblo.asia/6e163252-39a5-4f2e-9eea-72736f8051f3.png)

Không có crash, không có các assertion. Nó hoạt động bình thường. Code của bạn đã không làm bất cứ điều gì khi nó có một giá trị lạ, vì vậy bước này không có hiệu lực.

Nhưng cũng lưu ý rằng cấu hình release không phải là để debug. Bạn sẽ thấy rằng khi bạn debug với Bản release được chọn, Xcode đã hoạt động được như mong đợi. Nó có thể hiển thị sai khi thực thi dòng, **Variables View** có thể không hiển thị bất kỳ giá trị nào hoặc **Console Log** có thể không print các giá trị ra cho bạn.

Sử dụng cấu hình này nếu bạn muốn đo hiệu suất, không phải để theo dõi mã và gỡ lỗi.

Các Assertion là một công cụ hữu ích để giúp các developer đồng nghiệp của bạn hoặc chính bạn fix mọi thứ trước khi bạn quên chúng. Nhưng không nên lạm dụng chúng, vì chúng có thể trở nên khó chịu hơn là hữu ích :)).

**Note**: Dùng preconditionFailure(_:file:line:) hoặc fatalError(_:file:line:) thay vì assertionFailure(_:file:line:)  để làm ứng dụng của bạn crash trên bản release configuration.

Nguồn [link](https://www.raywenderlich.com/6334294-my-app-crashed-now-what#c-rate)