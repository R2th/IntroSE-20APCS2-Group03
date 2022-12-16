# Mở đầu
Swift là một ngôn ngữ mới với nhiều sự tiện lợi khi đem so sánh với các ngôn ngữ truyền thống như C, C++ hay Java. Một trong số những sự tiện lợi mà mình cảm thấy thích nhất khi làm việc với Swift là chúng ta ít khi phải quan tâm đến những vấn đề về bộ nhớ. Mặc định, Swift sẽ ngăn chặn các hành vi không an toàn xảy ra trong code của chúng ta. Ví dụ: luôn đảm bảo các biến đã được khởi tạo trước khi chúng được sử dụng, các vùng nhớ không thể truy cập được sau khi bị giải phóng,... Swift cũng đảm bảo rằng nhiều truy cập đồng thời vào cùng 1 phân vùng bộ nhớ sẽ không gây ra xung đột. Những việc quản lý bộ nhớ này được Swift thực hiện hoàn toàn tự động nên hầu hết thời gian chúng ta sẽ không cần quan tâm đến chúng. Tuy nhiên, việc hiểu được khi nào sẽ xảy ra xung đột trong khi truy cập bộ nhớ cũng rất quan trọng, nó sẽ giúp chúng ta tránh viết ra những đoạn code lỗi hoặc có thể fix lỗi của người khác. 

# Thế nào là xung đột khi truy cập bộ nhớ
Việc truy cập bộ nhớ xảy ra khi code của bạn làm những việc như gán giá trị cho biến hay truyền tham số vào trong các hàm,... Các bạn có thể xem qua ví dụ dưới đây để hiểu rõ hơn
```Swift
// Ghi giá trị vào bộ nhớ
var one = 1

// Đọc giá trị từ bộ nhớ
print("We're number \(one)!")
```
Xung đột trong việc truy cập bộ nhớ sẽ xảy ra khi những phần khác nhau trong code của bạn cố gắng truy cập vào cùng một phân vùng trong bộ nhớ tại cùng một thời điểm. Việc có nhiều luồng truy cập vào cùng 1 vùng bộ nhớ và thực hiện các thao tác đọc ghi trên đó tại cùng 1 thời điểm có thể gây ra những kết quả không thể dự đoán trước được trong code của bạn. 
> Nếu bạn đã từng viết những đoạn code đa luồng thì việc xảy ra xung đột khi truy cập bộ nhớ có thể là một vấn đề khá quen thuộc. Tuy nhiên, vấn đề xung đột hoàn toàn có thể xảy ra kể cả khi bạn làm việc với những dòng code đơn luồng.
> Nếu bạn gặp phải những vấn để về truy cập bộ nhớ khi làm việc đơn luồng, Swift đảm bảo bạn sẽ nhận được complie error hoặc runtime error.
# Khi nào thì xung đột xảy ra
Như đã nói ở trên thì Complier của Swift sẽ giúp chúng ta trong việc phát hiện ra đoạn code nào đang gây ra xung đột. Tuy nhiên nếu như một ngày nào đó cái complier lại không hoạt động thì sao, như khi đi phỏng vấn chả hạn, bạn hoàn toàn có thể nhận được vài mẩu code trên giấy và được yêu cầu phải debug nó trong đầu của bạn. Nếu như trường hợp đó xảy ra thì bạn hãy cố gắng nhớ lại những gì bạn đọc được dưới đây nhé :).

 Việc xung đột khi truy cập bộ nhớ sẽ xảy ra khi bạn có hai luồng truy cập khác nhau đảm bảo toàn bộ các điều kiện sau:
*   Ít nhất một trong hai luồng thực hiện ghi dữ liệu hoặc là nonatomic access
*   Chúng truy cập tới cùng 1 vị trí trong bộ nhớ
*   Chúng tiền hành truy cập tại cùng 1 thời điểm

Các kiểu truy cập bộ nhớ có thể chia ra làm 2 loại:
* Tức thời - **Instantaneous**
* Dài hạn - **Long** **Term**

Một đoạn code truy cập tức thời sẽ không cho phép các đoạn code khác chạy sau khi nó hoạt động và trước khi nó kết thúc, sẽ không bao giờ có 2 đoạn code truy cập tức thời nào được chạy cùng lúc. Hầu hết các truy cập chúng ta sử dụng khi code đều là tức thời. Ngược lại với truy cập tức thời là truy cập dài hạn - Long Term Access, kiểu truy cập này cho phép các đoạn code có thể chạy vào cùng 1 phân vùng tại cùng 1 thời điểm, từ đó gây ra hiện tượng chồng chéo - **overlap**. Longterm Access có thể gây ra hiện tượng **overlap** đối với 1 LongTerm Access hoặc 1 Instantaneous Access khác. Các truy cập chồng chéo kiểu này thường xuất hiện khi chúng ta sử dụng tham số dạng **inout** trong các hàm của mình
```Swift
var stepSize = 1

func increment(_ number: inout Int) {
    number += stepSize
}

increment(&stepSize)
// Error: conflicting accesses to stepSize
```
Trong đoạn code trên, bạn có thể thấy **stepSize** là một biến global có thể truy cập bình thường bên trong hàm **increment()**. Tuy nhiên, khi chúng ta thực hiện **read access** đến **stepSize** thì lđồng thời chúng ta cũng thực **write access** tới **number**. Hai truy cập lại cùng đang tác động đến cùng một địa chỉ trong bộ nhớ từ đó gây ra hiện tượng **overlap**. Các bạn có thể xem qua sơ đồ sau để hình dung rõ hơn.

![](https://images.viblo.asia/e88f5125-97ee-4bf8-b004-e1849ce46488.png)
Một giải pháp cho vấn đề này đó là tạo ra 1 bản copy cho stepSize
```Swift
// Tạo ra 1 bản copy
var copyOfStepSize = stepSize
increment(&copyOfStepSize)

// Cập nhật bản gốc.
stepSize = copyOfStepSize
// stepSize = 2
```
Một ví dụ khác là khi chúng ta truyền 1 biến vào trong một hàm sử dụng nhiều tham số **inout**
```Swift
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}
var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore)  // OK
balance(&playerOneScore, &playerOneScore)
// Error: conflicting accesses to playerOneScore
```
Dễ thấy ở trường hợp đầu tiên khi chúng ta truyền hai giá biến nhau vào hàm **balance()** thì không có lỗi gì xảy ra cả vì mặc dù hai biến này được truy cập đồng thời nhưng chúng lại nằm ở 2 địa chỉ khác nhau trong bộ nhớ. Còn ở trường hợp thứ hai, khi chúng ta truyền **playerOneScore**  vào cả 2 tham số có của hàm thì xung đột đã xảy ra vì chúng ta đang thực hiện 2 **write access** vào cùng 1 địa chỉ.
# Lời kết
Mong rằng qua bài viết này các bạn đã hiểu hơn về cách code của chúng ta thực hiện các truy cập tới bộ nhớ. Hẹn gặp lại các bạn trong những bài viết tiếp theo