## 1. Mở đầu
<hr>

Trong bài viết trước chúng ta cũng đã bàn luận về state, state management nghĩa là gì cũng như trong ứng thực tế trong ứng dụng ReactJS và VueJS nó sẽ ra sao và các vấn đề gặp phải  với việc quản lý state truyền thống của ReactJS và VueJS. Ở bài hôm nay chúng ta sẽ tiếp tục với những gì còn dang dở. Nếu bạn chưa đọc bài viết trước đó thì có thể xem tại [đây](https://viblo.asia/p/tan-man-ve-state-management-p1-GrLZD0DEZk0).

## 2. Thế giới của Redux và Vuex
<hr>

Như bài trước chúng ta có nói nhờ có các thư viện như Redux (hiện tại ReactJS đã có Context khá tương tự) và Vuex mà chúng ta có thể giải quyết bài toán khi mà một mảnh dữ liệu của chúng ta phải di chuyển qua quãng đường quá xa mới đến được đích nó cần và dẫn đến nhiều vấn đề khác nhau như:
- Code bị rối khó bảo trì, khó nắm được flow chạy
- Khó khăn trong việc refactor các component trung gian, dễ bị miss

![](https://images.viblo.asia/af820bc7-c8b1-4c2e-b0e6-bca321671d1a.png)

Với Redux và Vuex thì ta giường như giải quyết được phần nào bài toán trên khi mảnh dữ liệu của chúng ta không cần phải đi lòng vòng qua nhiều tầng nữa mà có thể đến được trực tiếp nơi nó cần:

![](https://images.viblo.asia/dc01940f-cd87-4a8d-8086-5b6daee21a4d.png)

Tuy nhiên bạn cũng cần rất cẩn thận trong việc bố trí cấu trúc store của Redux/ Vuex cũng như cách sử dụng chúng cho các component sao cho phù hợp và nhất quán với các thành viên khác trong team. Tránh trường hợp thiếu sự thống nhất dẫn tới việc code trở nên rối thêm. Một trong những cấu trúc mà mình và các thành viên trong team mình thường thử dụng đối với ReactJS đó là sử dụng cấu trúc dạng như `duck-modular` chi tiết bạn có thể xem tại [đây](https://github.com/erikras/ducks-modular-redux). Tất nhiên bạn có thể sử dụng bất cứ cấu trúc nào bạn muốn hoặc sửa đổi dựa trên các kiến trúc có sẵn miễn sao bạn và team mình cảm thấy thoải mái với cấu trúc đó. Đến đây, tưởng trừng công việc quản lý state đã đến hồi kết và chúng ta sẽ sống hạnh phúc mãi mãi với Redux và Vuex cộng thêm một cấu trúc hoàn hảo nào đó mà ta chọn nhưng mọi  thứ không hề như chúng ta nghĩ.

## 3. Các trở ngại
<hr>

### a. Flow chạy lằng nhằng

Khi mới tiếp cận với Redux và Vuex thì bản thân mình bân đầu cảm thấy nó khá là phức tạp và hơi khó hiểu, khó follow được. Tuy nhiên mình đã tự tìm ra phương pháp để tiếp cận và hiểu nó tốt hơn bằng cách mô hình hóa toàn bộ luồng chạy của nó. Bạn có thể hiểu đơn giản là thay vì bạn cố đọc chay documents hay đọc example code thì ta hãy tìm kiếm một hình ảnh mẫu trên mạng hoặc tự bạn vẽ lại luồng chạy của nó để có thể hiểu được nó hơn:

![](https://images.viblo.asia/a66c44f1-b6d9-415b-ae62-021c674e8dcf.png)

Với cá nhân mình việt chuyển nó thành một biểu đồ thì mình sẽ dễ nắm được cách nó hoạt động một cách tổng quán hơn và từ đó kết hợp với documents và code thì sẽ dễ dàng hiểu được mọi thứ hơn. Bạn có thể tham khảo các hình vẽ khác đã có sẵn trên mạng hoặc cũng có thể tự vẽ lại theo những gì mình đã hiểu rồi sau đó có thể so sánh với những hình viết mô tả flow khác trên mạng. Cách đưa mọi thứ từ text hoặc code sang một mô hình như này với mình khá là hiệu quả và mình đã áp dụng nó rất nhiều kể cả khi code front-end lẫn back-end và bạn cũng có thể thử xem biết đâu nó cũng hiệu quả với bạn.

### b. Khi nào dùng ?

Sau khi đã nắm được flow chạy cũng như quan thuộc với cú pháp và cách sử dụng store trong các dự án thì vấn đề tiếp theo mình tự hỏi bản thân đó là khi nào chúng ta cần sử dụng nó? Khi mới hiểu và dùng được nó có thể các bạn giống mình sẽ dùng nó cho tất cả các chỗ thậm chí thay hẳn cho state mặc định của ReactJS hay VueJS mà chuyển luôn qua store vì những lợi ích mà nó mang lại cho chúng ta. Tùy nhiên dần dần bạn sẽ nhận ra một vấn đề đó là **chúng ta đang phải code quá nhiều**. Đúng như vậy, khi dùng state của ReactJS hay VueJS thì chúng ta chỉ cần đơn giản như sau:

```js
//===== ReactJS =====//
// Tạo state
this.state = {
    modelVisible: false,
}

// Thay đổi state
this.setState({modelVisible: true});

//===== VueJS =====//
// Tạo state
data() {
    return {
        modelVisible: false
    }
}

// Thay đổi state
this.modelVisible = true
```

Tuy nhiên khi sử dụng thư viện Redux hay Vuex thì với mỗi mảnh state như trên, chúng ta sẽ cần phải tạo ra rất nhiều thứ khác như:
- Đinh nghĩa `modelVisible` mặc định trong store
- Tạo một action dùng để *"kích hoạt"* việc thay đổi dữ liệu
- Tạo ra một reducer hay một mutation dùng để thay đổi dữ liệu thực tết trong store
- Tạo ra một cái selector hay một getter dùng để lấy dữ liệu đó ra và dùng trong component

Như bạn thấy việc này dần dần trở nên khá không thoải mái khi chúng ta phải code quá nhiều cho một phần tính năng đơn giản như nói trên nên dần dần ta sẽ cần có một bộ quy tắc để biết khi nào ta dùng Store hay khi nào dùng State. Trên mạng thực tế có rất nhiều các bài viết nói về chủ đề này bạn có thể tự mình tìm đọc còn đối với bản thân mình tự đúc kết ra thì mình có các quy tắc cơ bản về những thứ mình sẽ không đưa vào store như sau:
- Dữ liệu trong form: Đối với mình dữ liệu input trong form nó thuộc dạng dữ liệu tạm thời cho đến khi bạn điền hết thông tin và gửi đi thì sẽ không cần nữa. Đồng thời chắc hẳn bạn cũng không muốn mỗi lần bạn gõ bất cứ nội dung gì vào ô input thì nó lại dispatch một action đến store. Chính vì vậy với bản thân mình thì các dữ liệu nằm trong form thông thường thì mình sẽ dùng luôn State mặc định của ReactJS và VueJS luôn. Tuy nhiên vẫn còn tùy thuộc vào trường hợp mà mình vẫn sẽ dùng đến store nếu cần
- Dữ liệu liên quan đến UI: Các kiểu dữ liệu dạng sử dụng dùng để ẩn hiện một phần UI nào đó hay dùng đề thu nhỏ, phóng to thanh sidebar chẳng hạn. Những loại dữ liệu này mình cũng thường sử dụng luôn state mà không cần động đến Store. Tất nhiên thì nó vẫn sẽ có những trường hợp ngoại lệ mà ta sẽ cần đến store.

Ở trên là những quy tắc cơ bản nhất mà mình đã và đang áp dụng trong thực tế tuy nhiên nó không nhất thiết phải là quy tắc chuẩn mực của bạn mà bạn hoàn toàn có thể tự tạo ra các quy tắc cơ bản khác, miễn là bạn và team mình cảm thấy  thoái mái với nó. Ngược lại thì cũng sẽ có một quy tắc mà mình cũng sử dụng để cân nhắc việc chuyển từ State sang Store đó là khi State của bạn bắt đầu phải truyền xuống sâu hơn 2 cấp độ:

![](https://images.viblo.asia/bffda133-5ddc-4f86-80cc-9bc8ec46f4a4.png)

Mình rất hay tạo ra các quy tắc cơ bản như nói trên để biết được một mốc cụ thể cho việc khi nào chúng ta phải refactor lại code nếu không ta sẽ bị mơ hồ hay thậm chí lười trong việc refactor lại mặc dù biết nó có thể dẫn tới tương lai tối tắm :v

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc. Ở bài viết tới mình sẽ chia sẻ với các bạn về một số trường hợp đặc biệt trong việc sử dụng Store cũng như 1 hoặc 2 tips cá nhân của mình cho các bạn. Cám ơn các bạn đã đọc bài và nếu thấy hay hãy để lại 1 upvote để ủng hộ mình nhé :D