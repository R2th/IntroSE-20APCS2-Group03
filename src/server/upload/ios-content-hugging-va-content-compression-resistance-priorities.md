Priority (Độ ưu tiên) là khái niệm bạn sẽ gặp khá nhiều trong AutoLayout khi lập trình iOS. Mỗi constraint (ràng buộc) tạo ra đều có 1 priority là một con số nằm trong dãy từ 0 tới 1000.


> Theo như tài liệu của Apple thì: layout priority được dùng để chỉ cho constraint-based layout system (hệ thống layout dựa trên ràng buộc) biết rằng constraints nào quan trọng hơn, cho phép hệ thống đưa ra việc xữ lý thích hợp để đáp ứng toàn bộ các constraints trong hệ thống


Priority thường sẽ được xét tới nếu như có 2 constraints xung đột với nhau. Hệ thống sẽ ưu tiên hơn cho constraint nào có (higher priority) độ ưu tiên cao hơn. Chúng ta có thể xem, priority như là một nhân tố quyết định cho các constraints trong thế giới AutoLayout.
## Intrinsic Content Size

Người ta thường dùng contraints để định rõ vị trí và size của các view. Tuy nhiên, có một vài view thường có size co giản theo đúng nội dung mà nó chứa. Khái niệm này được gọi là `Intrinsic content size`(kích thước nội dung bên trong). Vd đơn gỉan hen: 1 button có intrinsic content size là kích thước của toàn bộ nội dung tên button cộng thêm một phần nhỏ của lề.

Bạn nên biết rằng, không phải toàn bộ các view đều có intrinsic content size. Đối với những view có thì intrinsic content size có thể mô tả độ cao, độ rộng hoặc thậm chí cã 2. Bạn sẽ thấy vài ví dụ trong bảng sau:


| View | Intrinsic content size| 
| -------- | -------- | 
| UIView và NSView     | Không có intrinsic content size     |
| Slider |Chỉ define mỗi độ rộng (width) trên iOS, define cã rộng và dài - dựa theo loại slider trên OS X |
| Label, button, switch và text field | Define cã cao và rộng|
| Text view và Image view | Intrinsic content size có thể khác nhau |


* Intrinsic content size dựa trên nội dung bên trong của 1 view. Intrinsic content size của 1 label hay button dựa trên số lượng text nội dung và font mà nó sử dụng. Đối với những view khác, intrinsic content size thậm chỉ có thể phức tạp hơn. Ví dụ, một imageView khi không có hình nào thì sẽ không có intrinsic content size. Ngay khi bạn add hình vào nó thì intrinsic content size của imageView đã được set lại là size của hình bạn vừa add.

* Intrinsic content size của một text view có thể khác nhau dựa trên nội dung của nó, khi nó được scroll lên hay không hoặc thậm chí là từ những contraints khác áp dụng vào cho text view này. Ví dụ nha, khi mà bạn enable việc scroll thì text view này sẽ không có intrinsic content size. Khi mà disable việc scroll, thường thì intrinsic content size sẽ được tính toán dựa trên size của đoạn text. Ví dụ tiếp nhé: nếu không có bất kì tác động gì thì nó sẽ tính toán độ dài rộng cần thiết của view với 1 dòng text, nếu bạn thêm các contraints cho chiều rộng của view, intrinsic content size sẽ xác định chiều cao cần thiết để hiển thị dựa trên chiều rộng đã được đưa.

* AutoLayout đại diện cho intrinsic content size của 1 view dựa trên việc dùng 1 cặp contraitns cho mỗi kích thước. The content hugging (scale nội dung) sẽ kéo view làm sao để nó vừa vặn với nội dung bên trong của nó. Trong khi the compression resistance (đề kháng việc nén --> cứ hiểu là làm nó bự ra) sẽ kéo view ra ngoài để nội dung bên trong không bị cắt.

![](https://images.viblo.asia/dafefe98-8125-4638-ae51-3cdc1b9a32e1.png)

## Content hugging priority
Khi bạn muốn 1 view nào đó không tự scale bự hơn nội dung của nó thì bạn hãy gán cho view đó priority này càng lớn.

Hãy xem trường hợp dưới đây nhé. Giả sử có 2 label được đặt cạnh nhau nằm ngang như trong hình và bạn không gán bất kì contraints width nào cho chúng. Thì Xcode sẽ báo ngay là chúng đang bị xung đột constraints. Trong trường hợp này bạn phải xét `Content hugging priority` lớn hơn cho một view để giải quyết xung đột.

![](https://images.viblo.asia/049a79ce-f298-4e70-b4e5-568bc09dddba.png)

Xem hình bên trên nhé. Mình đã xét các contraints: leading, trailing và top cho cã 2 label màu xanh và màu đỏ. Constraint width của 2 label này không được xác định nên gây ra xung đột. Liết nhìn 1 tí ở thanh Size inspector bên phía phải bạn sẽ thấy cã 2 giá trị `horizontal` và `vertical` `Content hugging priority ` của label đều là 251. Như mình đã nói, bạn cần xét priority cho 1 label lớn hơn cái còn lại để tránh bị xung đột.

Khi mình set lại horizontal content hugging priority cho label màu xanh lớn hơn (mình để là 252) và không đụng gì vào thằng label đỏ. Trong trường hợp này, như mình đã nói, view nào có priority lớn hơn sẽ không scale vượt quá kích thước nội dung của nó. Nghĩa là view màu xanh sẽ thu hẹp lại sao cho bằng với nội dung bên trong của nó còn thằng view màu đỏ sẽ được scale bự ra.
![](https://images.viblo.asia/b9f6d3d8-7035-41fa-99fa-665a6edd3973.png)

*horizontal content hugging priority: (Blue: 252 - Red: 251)*

Y chang như vậy, nếu bây giờ mình set giá trị của label màu đỏ lớn hơn thì đương nhiên label màu xanh sẽ scale bự ra hơn so với kích thước nội dung của nó.
![](https://images.viblo.asia/7505df9a-fea0-4962-b219-85055c9d3916.png)

*horizontal content hugging priority: (Blue: 250 - Red: 251)*

> Giá trị content hugging priority càng lớn, thì bound của view sẽ càng ôm intrinsic content size của nó và ngăn chặn view đó scale bự hơn intrinsic content size.
> 
## Content compression resistance priority
Gán giá trị này càng lớn có nghĩa là bạn không muốn view thu nhỏ lại nhỏ hơn intrinsic content size.
C`ontent compression resistance priority ` khá dễ hiểu và không quá phức tạp cho lắm. Bạn cứ hiểu đơn giản là. Độ ưu tiên càng cao thì việc thì độ cản trở việc co lại càng khó (==> ở đây cứ hiểu độ ưu tiên càng cao thì nó càng phình to ra khó thu hẹp lại cho dễ)

Đặt trường hợp 1 button có title khá là dài nhé "Press me to be a superhero" chẳng hạn. Mình sẽ set các constraints cho button này và để ý kĩ ở chỗ là mình set width constraints cho nó với giá trị là 40. Bạn sẽ thấy là button sẽ bị scale lại và không nhìn rõ được title của nó.
![](https://images.viblo.asia/1ff4d118-be6a-40d8-9855-fc95699b9af0.png)

*Horizontal content compression resistance priority: 750 - Button width constraint: 1000*

Đừng lo, chúng ta sẽ fix nó 1 cách dễ dàng bằng việc set lại giá trị `Horizontal content compression resistance priority` là 1000 còn `width constraint` của button bạn có thể để giá trị của nó nằm trong khoảng từ 0 đến 999 tuỳ ý miễn sao nó thấp hơn thằng `Horizontal content compression resistance priority`. Bạn sẽ thấy ngay là chiều rộng button sẽ được scale bự ra sao cho phù hợp với intrinsic content size của button.

![](https://images.viblo.asia/c6e56625-df64-401d-b300-2100fccf1764.png)

*Horizontal content compression resistance priority: 1000 - Button width constraint: 999*

---
Bài dịch của mình đến đây là hết. Thật ra 2 khái niệm này khá khó hiểu cho đến khi mình vọc thử bằng project demo. Nên các bạn vừa đọc vừa làm theo thì sẽ dễ hiểu hơn đó.

Trong bài mình dùng khá nhiều từ tiếng anh chứ không dịch hết ra tiếng việt do như vậy sẽ làm các bạn sử dụng Xcode không biết nó là gì ==> điều này cũng làm bài dịch của mình khó hiểu hơn. >< mình rất xin lỗi.

Toàn bộ tài liệu mình tìm hiểu đều bắt nguồn từ trang này [Medium - iOS — content hugging and content compression resistance priorities](https://medium.com/@abhimuralidharan/ios-content-hugging-and-content-compression-resistance-priorities-476fb5828ef)

Cám ơn các bạn đã không ngại đọc hết tới cuối bài. Mình sẽ cố gắng hơn ở lần tới.