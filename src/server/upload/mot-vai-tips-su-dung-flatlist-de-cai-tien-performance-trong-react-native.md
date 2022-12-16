![](https://images.viblo.asia/0234f46b-e4f3-4b5b-8ebf-f9a55322b54a.png)


Nếu bạn đã từng hoặc đang code với React Native thì chắc hẳn không còn xa lạ với cái tên Flatlist. Một component render listview được cung cấp sẵn rất nhiều props tiện ích trong React Native.

Nhưng bạn đã thực sự hiểu Flatlist chưa? Khi scroll với 100 - 200 items có smooth không?

Ở đây tôi sẽ cố gắng tạo ra một tài liệu đầy đủ để giúp bạn và user cho trải nghiệm tốt nhất khi sử dụng Flatlist.

Trước tiên, khi sử dụng Flatlist có thể các bạn đã gặp các trường hợp như : app scroll không mượt, bộ nhớ tiêu thụ cao dẫn tới crash app, độ phản hồi của app khi user tương tác chậm, đang scroll nhưng sinh ra khoảng trắng do chưa tải kịp nội dung, ...

Để giải quyết các vấn đề này, chúng ta cùng đi xem lại các props hữu ích có sẵn của FlatList.

### 1. removeClippedSubviews
Khi sử dụng props này, Flatlist có thể loại bỏ các thành phần không nằm trong tầm nhìn của bạn, nghĩa là các item mà không nằm trong vùng nhìn scroll của bạn đã bị xóa đi.

**Ưu điểm:**  removeClippedSubviews rất thân thiện với bộ nhớ, vì bạn sẽ luôn có một lượng nhỏ các mục được hiển thị thay vì toàn bộ danh sách.

**Đánh đổi?** Có thể có lỗi nếu nội dung của bạn thiếu.

### 2. maxToRenderPerBatch
`maxToRenderPerBatch = {number}`

đây là một prop bạn có thể kiểm soát số lượng mục được hiển thị mỗi đợt, default là 10. 

**Ưu điểm :** Nếu số lớn hơn có nghĩa là các blank area trực quan ít hơn khi cuộn (tỷ lệ lấp đầy tốt hơn).

**Đánh đổi ?**  Nhiều mục hơn mỗi đợt có nghĩa là performance javascript ít hơn, và Responsiveness phản hồi kém hơn, nếu muốn sử dụng props này thì nên chọn các list không có sự tương tác.

### 3. updateCellsBatchingPeriod

Trong khi **maxToRenderPerBatch** cho biết số lượng mục được hiển thị mỗi đợt, thì **updateCellsBatchingPeriod = {number}** sẽ nói với VirtualizedList của bạn độ trễ, tính bằng mili giây, giữa các lần hiển thị hàng loạt. Nói cách khác, nó xác định tần suất thành phần của bạn sẽ hiển thị. Default là 50.

**Ưu điểm :** Kết hợp với maxToRenderPerBatch mang lại cho ta một sự hoàn hảo đấy.

**Đánh đổi ?** Batches ít thường xuyên hơn có thể gây ra các khu vực trống. Batches thường xuyên hơn có thể gây ra phản ứng và mất hiệu suất.

### 4. initialNumToRender
Định nghĩa là số lượng ban đầu của các mục được render. Default 10.

Ưu điểm và Đánh đổi mình nghĩ các bạn cũng đoán được rồi :D

### 5. windowSize

`windowSize = {number}`

Number ở đây là một đơn vị đo lường trong đó 1 tương đương với chiều cao khung nhìn của bạn. Default là 21, là 10 khung nhìn ở trên, 10 bên dưới và một ở giữa.

**Ưu điểm :** Nếu bạn lo lắng chủ yếu về performance, bạn có thể đặt một số lớn hơn để danh sách của bạn sẽ chạy trơn tru và có ít không gian trống hơn. Nếu bạn chủ yếu lo lắng về mức memory consumption bạn có thể đặt mộ số thấp hơn để danh sách kết xuất của bạn sẽ nhỏ hơn.

**Đánh đổi ?**  Đối với một số lớn hơn, bạn sẽ có mức tiêu thụ bộ nhớ lớn hơn. Đối với kích thước cửa sổ thấp hơn, bạn sẽ có hiệu suất thấp hơn và cơ hội nhìn thấy các blank area lớn hơn.

### 6. legacyImplementation

Hmm, với props này các bạn cần phân biệt được ListView và VirtualizedList. 

**VirtualizedList** là thành phần đằng sau FlatList và là triển khai khái niệm 'virtual list' của React Native.

Còn [đây](https://reactnative.dev/docs/listview#__docusaurus) là khái niệm về ListView, props này sẽ sử dụng ListView thay vì VirtualizedList.

**Ưu điểm :** Điều này sẽ làm cho danh sách của bạn chắc chắn hoạt động tốt hơn, vì nó loại bỏ ảo hóa và hiển thị tất cả các mục của bạn cùng một lúc.

**Đánh đổi ?** Tiêu thụ bộ nhớ của bạn tăng lên và ...

Và dưới đây là một số tip cá nhân mình tích góp được

**a. Use simple components**

Component của bạn càng phức tạp, chúng sẽ càng chậm. Cố gắng tránh nhiều logic và lồng trong các mục danh sách của bạn. Nếu bạn đang sử dụng lại component này rất nhiều trong ứng dụng của mình, hãy tạo một bản sao chỉ dành cho các danh sách lớn của bạn và làm cho chúng có ít logic nhất có thể và càng ít lồng nhau càng tốt.

**b. Use light components**

Component của bạn càng nặng thì chúng càng chậm. Tránh các hình ảnh nặng. Nói chuyện với nhóm thiết kế của bạn, sử dụng ít hiệu ứng và tương tác và thông tin nhất có thể trong danh sách của bạn.

**c. Use cached optimized images**

Cá nhân mình sử dụng [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image). Mỗi hình ảnh trong danh sách của bạn là một thể hiện Image () mới. Tốc độ truy cập vào hook được tải càng nhanh, chuỗi Javascript của bạn sẽ nhanh hơn một lần nữa.

**d. Use getItemLayout**

Nếu tất cả các component trong list của bạn có cùng chiều cao (hoặc chiều rộng, đối với danh sách nằm ngang), việc sử dụng prop này sẽ loại bỏ nhu cầu đối với FlatList của bạn để tự động tính toán nó mỗi lần. Đây là một kỹ thuật tối ưu hóa rất mong muốn và nếu các thành phần của bạn có kích thước động và bạn thực sự cần hiệu suất, hãy xem xét hỏi nhóm thiết kế của bạn nếu họ có thể nghĩ đến thiết kế lại để thực hiện tốt hơn. Phương pháp của bạn sẽ giống như thế này, đối với các mục có chiều cao khoảng 70:

```js
getItemLayout = (data, index) => ({
     length: 70,
     offset: 70 * index,
     index
   })
```

**e. Use keyExtractor**

Prop này được sử dụng để lưu vào bộ đệm và làm một `key` để theo dõi thứ tự sắp xếp lại. Ví dụ: nếu bạn đang sử dụng id của mình làm khóa:

```js
   keyExtractor={item => item.id}
```

**f. Use shouldComponentUpdate**

Nếu bạn vẫn sử dụng class component thì không nên bỏ qua.

```js
 shouldComponentUpdate() {
      return false
    }
```

Trên đây là một số tip mà mình đúc kết được khi làm việc với React Native, hy vọng có thể giúp app của bạn được awesome hơn!