Cách truy cập các chỉ mục trong JavaScript và điều này có thể thay đổi như thế nào với` Array.prototype.at ()`

Đôi khi mình cảm thấy cần phải truy cập các phần tử mảng từ cuối lên, có thể là từ cuối cùng hoặc từ mục kế cuối.

Cách tiếp cận việc này không bao giờ đơn giản như trong một số ngôn ngữ khác, như là truy xuất mảng **[-1]** và lấy được giá trị mong muốn.
Thay vào đó, chúng ta phải làm những thứ như mảng **[array.length-1]**, v.v.

Cú pháp **[]** không chỉ dành riêng cho mảng và chuỗi; nó áp dụng cho tất cả các object. Để refer tới một phần tử trong mảng, như cách gọi array[1], thực ra chỉ đề cập đến thuộc tính của đối tượng với key 1, đây là thứ mà bất kỳ đối tượng nào cũng có thể có. Vì vậy, khi truy xuất  [-1] của mảng đã "*hoạt động*" trong các code như hiện tại, nhưng nó trả về giá trị của thuộc tính -1 của đối tượng, thay vì trả về một chỉ số đếm ngược từ cuối lên trong mảng.


**Truy cập các phần tử**
Việc cố gắng lấy giá trị cho một chỉ mục không có trong mảng sẽ trả về giá trị không xác định trong JavaScript.
```
const arr = ['a', 'b', 'c', 'd', 'e'];
arr [1] // b
arr [4] // e
arr [-1] // không xác định
```
Thông thường như hiện tại, chúng ta có thể thực hiện arr [arr.length - 1] hoặc arr.slice (-1) [0] và điều này sẽ cung cấp cho chúng ta phần tử **"e"** dưới dạng đầu ra cho mảng trên.


**Thuộc tính được đề xuất - “at”**

Với thuộc tính mới này, việc truy cập các phần tử trong mảng sẽ trở nên thuận tiện hơn trong tương lai.
Cách để truy cập các giá trị sẽ không thay đổi nhưng việc truy cập các chỉ mục sẽ trở nên dễ dàng. Như sau:
```
const arr = ['a', 'b', 'c', 'd', 'e'];
arr.at (1) // b
arr.at (4) // e
arr.at (-1) // e
arr.at (10) // không xác định
```


**Kết luận**
Hy vọng rằng điều này sẽ sớm được chuyển sang Giai đoạn 4 và được chính thức áp dụng. Mình khá hào hứng với điều này và có thể thấy điều này trở thành một đường cú pháp để truy cập các phần tử mảng.
Cũng có một thuộc tính cuối cùng đang được thảo luận (truy cập phần tử cuối cùng của một mảng / chuỗi) nhưng nó vẫn đang ở giai đoạn 1 và cũng có thể bị loại bỏ để có lợi cho thuộc tính mới này vì nó đã ở giai đoạn 3 và giải quyết cùng một mục đích và hơn thế nữa.

Nguồn: Ảnh của La-Rel Easter trên Unsplash

Tham khảo:
https://javascript.plainenglish.io/array-at-will-change-how-we-access-array-values-in-javascript-517c3a13d505
https://github.com/tc39/proposal-array-last
https://github.com/tc39/proposal-relative-indexing-method