## 1. Giới Thiệu
### 1. 1.Protocol

sơ lược về định nghĩa protocol như sau:

*  là một kiểu interface
*  mang tính chất trừu tượng
*  khai báo các properties vs methods
*  không định nghĩa chúng
*  implement được vào class/struct/enum
*  implement được vào nhiều chứ không phải một
*  có thể xem như là một kiểu dữ liệu

> và bạn sẽ tìm hiểu đầy đủ hơn tại bài biết này: [Protocol trong 10 phút](https://fxstudio.dev/protocol-trong-10-phut/)

### 1. 2.Closure

Closure là một block code, có thể phân tách ra để tái sử dụng. Hiểu đơn giản thì Closure là function, nhưng khuyết danh. Ta có thể gán Closure vào biến và tái sử dụng như các kiểu value khác

- Các điểm cần chú ý:
        
     - block code
     - function
     - khuyết danh
     - biến

> và bạn sẽ tìm hiểu đầy đủ hơn tại bài viết này: [Closure trong 10 phút](https://fxstudio.dev/closure-trong-10-phut/)
      
## 2. Áp dụng

Sau đây, mình sẽ liệt kê những trường hợp mà bạn có thể áp dụng được một các triệt để **Protocol & Closure.** Và đó là những vấn đề hết sức cơ bản trong lập trình IOS.
### 2.1 Custom View

- Custom View là tạo ra các UI Control mới, để cho giao diện ứng dụng theo đúng vơi thiết kế giao diện của ứng dụng IOS.
- Các thiết kế giao diện thường sẽ phức tạp và không sử dụng các UI Control cơ bản.

Ta sẽ áp dụng **Protocol** vào các việc truyền tải dữ  liệu (Passing Data) Từ Custom View về ViewController. Chi tiết hướng dẫn bạn xem ở link dưới đây:
      
   - [Basic IOS tutorial : Custom View](https://fxstudio.dev/basic-ios-tutorial-custom-view/)

### 2.2. TableView 

> Bạn chỉ cần thành thạo TableView là thành thạo lập trình IOS.

Đây là một tỏng nhưng UI Control huyền thoại của IOS. Và đi kèm với TableView là các **Delegate & Datasource Protocol** của nó, mà bạn bắt buộc phải sử dụng được. Mẫu thiết kế Protocol này được dùng cho hầu hết các UI Control còn lại, như: CollectionView, PickerView, MapView...

Chi tiết về bài viết này thì bạn có thể xem ở link dưới đây: 
 - [Basic iOS tutorial : Table View](https://fxstudio.dev/basic-ios-tutorial-table-view/)

### 2.3. Delegate Pattern

Bài viết trong link dưới đây sẽ giải thích cụ thể việc áp dụng **Protocol** trong vấn đề passing Data. Với cái tên Delegate & Datascource thì bạn sẽ quen thuộc nhiều hơn. Cũng là một trong những Skill bạn cần phải đạt được 

- [Basic iOS tutorial : Delegation Pattern](https://fxstudio.dev/basic-ios-tutorial-delegation-pattern/)

### 2.4. MVVM 

Đây làm một mô hình được sử dụng nhiều nhất cho IOS Project hiện tại. Chúng ta không đi vào phân tích cấu trúc của MVVM, mà tập trung vào ứng dụng của **Closure** cho mô hình này. Closure phát huy rất hiêu quả trong việc thực hiện **CallBack** từ ViewModel cho View/ViewController biết.
Đây cũng là một trong những ký thuật cơ bản mà một Dev IOS bắt buộc phải làm được. Bạn có thể đọc về nó tại link dưới đây:

- [ Basic iOS tutorial : MVVM](https://fxstudio.dev/basic-ios-tutorial-mvvm/)

### 2.5. Connect Networking & Core API

Đây là một trong những áp dụng kinh điển của **Closure**. Thế mạnh của Closure chính là sử lý bất đồng bộ. Và sẽ được áp dụng vào việc tương tác với API từ app. Bạn có thể theo dõi lại qua vài viết cơ bản dưới đây: 

- [Connect Networking](https://fxstudio.dev/basic-ios-tutorial-connect-networking/)
 - [ Core API](https://fxstudio.dev/basic-ios-tutorial-core-api/)

## 3. Phân Biệt 

Phần thứ 3 này, chúng ta sẽ tìm hiểu về các bài phân tích sự giống nhau và khác nhau của hai thế lực **Protocol & Closure** này.
### 3.1. Passing Data

Việc truyền dữ liệu đi (Passing Data) không lúc nào đơn giản cả. Bạn cần nắm được các cách sử dụng **Protocol & Closure** trong việc sử lý những vấn đề tương đồng trong viêc truyền dữ liệu. Từ đó bạn có thể thấy được điểm giống nhau của 2 phương pháp này.

chi tiết bài viết này ở link dưới đây: 
- [Passing Data](https://fxstudio.dev/protocol-vs-closure-passing-data/)

### 3.2 Asynchronous 
Từ vấn đề bất đồng bộ, chúng ta sẽ thấy được sự khác biệt giữa **Protocol & Closure**. Với từng cách giải quyết chúng ta cần phải lưu ý từng vấn đề thuộc về bản chất của mỗi loại. KHi đó bán sẽ dễ dàng học code của những người khác, của những thư viện ... có áp dụng Protocol & Closure vào sử lý bất dồng bộ

Để bạn thoát khỏi cách phải code một cáh máy móc, thì bạn có thể tham khảo link bài viết dưới đây: 

- [Asynchronous](https://fxstudio.dev/protocol-vs-closure-asynchronous/)

### 3.3. Delegate vs Closure callback

Cuối cùng chúng ta sẽ biết lúc nào lựa chọn Delegate hay Closure. Ưu t& nhược điểm. Tại bài viết dưới đây, mình cũng đã tổng hợp được các trường hợp hay gặp phải trong quá trình lập trình IOS 
- [ Delegates vs. Closure Callback](https://fxstudio.dev/delegates-vs-closure-callback/)

## Tạm kết
Qua Trên, bạn sẽ có được cái nhìn tổng quát về **Protocol & Closure** trong lập trình IOS. Đây cũng là vấn đề chung cho một bạn newbie khi mới vào dự án. Hi vọng bài viết này sẽ giúp ích được cho bạn.