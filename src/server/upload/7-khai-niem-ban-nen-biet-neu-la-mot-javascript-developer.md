# 1. Design Patterns 


`A Pattern is a Reusable solution that can be applied to commonly occurring problems in Software Engineering.`

Câu này có thể hiểu đơn giản là: mô hình là một giải pháp có thể tái sử dụng, có thể được áp dụng cho  vấn đề thường xảy ra trong kỹ thuật phần mềm.

Việc sử dụng tốt Design Patterns sẽ giúp code của bạn ngắn gọn nhiều hơn. Đặc biệt nếu bạn làm việc theo team, mọi người đều phải quen thuộc với mô hình này, bởi nó giúp giao tiếp tốt hơn trong việc quản lí dự án tốt. Trong Javascript, có rất nhiều Design Patterns, nhưng bạn không cần phải học tất cả chúng.

Dưới đây là một vài Design Pattern bạn nên biết trong Javascript

**1. Constructor Pattern**: Nó rất hữu ích khi làm việc với Thiết kế hướng đối tượng.
Một trong những nhược điểm lớn của thiết kế này là nó không hỗ trợ tính kế thừa. Do đó, một thuốc tính giữa các đối tượng khác nhau sẽ luôn được lặp lại.

**2. Prototype Pattern**: Vì chúng ta có một thuộc tính trong object cần được định nghĩa lại trong Constructor Pattern, nên để giải quyết vấn đề này, chúng ta tạo một hàm bên trong hàm nguyên mẫu trong Prototype Pattern. Nhưng nó cũng có nhược điểm là bạn không có quyền kiểm soát đối với các thuộc tính private hay public.

**3. Module Pattern**: Một cải tiến của Prototype Pattern, ở đây chúng ta có thể đặt các type của module khác nhau với sự linh hoạt của thay đổi tên function công khai. Nhược điểm là bạn không có khả năng ghi đè các chức năng đã tạo từ môi trường bên ngoài. 

**4. Singleton Pattern**: Một Design Pattern rất thực tế được sử dụng để xây dựng nhiều ứng dụng tin cậy. 

Ví dụ:

Giả sử ứng dụng của bạn phải thiết lập kết nối với cơ sở dữ liệu, nơi bạn không muốn tạo một phiên bản của cơ sở dữ liệu khi nó đã được tạo và bạn chỉ cần một phiên bản mới khi phiên bản kia bị đóng hoặc dừng một phiên bản đang diễn ra. Pattern này đảm bảo rằng phiên bản chỉ được tạo một lần. Tuy nhiên, nhược điểm duy nhất là khó kiểm tra. 

# 2. Javascript engines 
Là một Javascript developer, bạn luôn muốn nhận được kết quả tốt nhất có thể từ code của mình và hiểu rõ về công cụ Javascript sẽ giúp bạn viết code tốt hơn thay vì code một cách ngẫu nhiên. 

```
Bạn nghĩ sao chúng ta cần phải học một thứ gì đó đang hoạt động tốt? 
```

Đây sẽ là ví dụ. 

Giả sử, bạn có một cặp object lưu trữ một số giá trị, bây giờ chúng ta cố gắng trả lại các giá trị này trong một hàm khoảng 1 tỷ lần, thì sẽ mất thời gian thực thi gần 1.5 s trên bộ xử lí cao cấp. Nhưng, nếu chúng ta chỉ nhân đôi các thuộc tính được lưu trữ trong các object của mình, thì thời gian thực thi sẽ là gần 10s. Và đó là rất nhiều khác biệt khi bạn làm việc với các ứng dụng Javascript trong thế giới thực. 

# 3. Double Equals & Triple Equals 
Trong javascript, chúng ta có hai cách trực quan giống nhau để kiểm tra sự bằng nhau. Chúng ta có == & ===.

**3.1 Double Equals** : Chúng ta kiểm tra sự bằng nhau lỏng lẻo và nó cũng thực hiện Type Coercion, có nghĩa là hai giá trị chỉ được so sánh khi cố gắng chuyển đổi chúng thành một kiểu chung. 
Ví dụ: 
```
11 == '11' // true
```

Trong trường hợp này, Javascript chuyển đổi giá trị của chúng ta thành một loại tương tự.

**3.2 Triple Equals** : Chúng ta kiểu tra sự bằng nhau một cách nghiêm ngăt, có nghĩa là trong khi so sánh, cả loại và giá trị phải giống nhau.
Ví dụ 
```
11 === 11 // true 
11 === '11' // false 
```

# 4. DOM 
 DOM cung cấp các API quan trọng để tạo ra các ứng dụng tuyệt vời và sáng tạo, hiểu biết tốt kiến thức cơ bản về DOM là yếu tố then chốt để tạo ra ứng dụng đáng kinh ngạc. DOM ( Document Object Model) là một giao diện đại diện cho các trình duyệt đọc các tài liệu HTML và XML của bạn và khi trình duyệt của bạn đọc tài hiệu HTML, nó sẽ tạo ra một cây đại diện.
 
 `Bạn có thể làm gì với DOM và sự sáng tạo của mình ? `
  
  Xây dựng các ứng dụng có thể tuỳ chỉnh theo hành động của người dùng, chẳng hạn như các thay đổi trong bố cục của trang mà không cần làm mới. 
  
#  5. Call Stack
Nói một cách dễ hiểu, call stack là một cấu trúc dữ liệu sử dụng nguyên tắc: Last In, First Out để lưu trữ tạm thời các lời gọi hàm. 

Ví dụ: 
```
function first(){ 
    console.log('Executed first function');
}

function second(){
    first();
    console.log('Second function excuted');
}

second();
```

- Khi mà hàm second() được thực thi, một khung ngăn xếp trống được tạo ra, đây là điểm vào chính của chương trình.
- Sau khi thực thi hàm secound(), nó gọi hàm first() được đẩy vào ngăn xếp, nơi nó trả về  'Executed first function' ra console và bật ra khỏi ngăn xếp. 
- Sau đó, quá trình thực thi sẽ chuyển đến hàm second() nơi nó trả về và in 'Second function excuted' ra console và sau khi thực thi, nó bật ra khỏi ngăn xếp trong khi xoá bộ nhớ. 

# 6. Scope 
Bạn có thể nói Scope là một hộp ranh giới riêng cho các biến, hàm và đối tượng. Theo mặc định, bạn luôn ở trong root Scope, nơi các ranh giới xác định quyền truy cập vào biến hay không.

Scope có thể được định nghĩa theo 2 hướng: 
- **Local Scope**: Mọi thứ đều được phép trong phạm vi ranh giới 
- **Global Scope**: Trong trường hợp Global Scope, bạn không thể truy cập vào các biến đã định nghĩa trong Local Scope vì nó được bao bọc từ môi trường bên ngoài, cho đến khi bạn return chúng. 

Ví dụ: 

Nếu chúng ta cố gắng code như bên dưới, bạn sẽ gặp lỗi not-defined trong console,vì tên biến được định nghĩa trong hàm, có nghĩa là chúng ta không thể truy cập nó bên ngoài hàm này (Local Scope).

```
function username(){
    var name = 'Mohit';
}

username()
console.log(name);
```

# 7. Hoisting 
Có những lúc Javascript developer hiểu sai về Hoisting và cách thức hoạt động của nó. Thông qua khái niệm này, bạn có thể đối phó với nhiều lỗi và bạn có thể gọi một hàm trước khi nó được định nghĩa để tránh lỗi như 'UncaughtReferenceError'. Trong Hoisting, trình thông dịch Javascipt luôn di chuyển các biến và hàm lên đầu phạm vi hiện tại trước khi thực thi.

Ví dụ: 

```
// without Hoisting 
function userAge(age){
    console.log(age);
 }
 
 userAge('23');
 // return 23 
```

```
// with Hoisting 
userAge('23');

function userAge(age){
    console.log(age);
 }
 
 // return 23 
```

Bài viết trên được dịch từ: 
https://sal.vn/wbNZC7