Bài viết được dịch từ nguồn https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

## React Stateless Functional Components

React.14 đã giới thiệu một cách đơn giản hơn để định nghĩa các `Component` được gọi là `stateless fuctional components`. Các `Component` này sử dụng các hàm JavaScript đơn giản. Dưới đây là trước và sau trong ES6:

![](https://images.viblo.asia/335ed602-3181-47fb-a7cc-026bf0af1ee7.png)

27 dòng so với 21 dòng không khác nhau quá nhiềiu… Ngoài ra, lưu ý rằng `nested function`  `sayHi` ở bên phải phải được tránh vì lý do hiệu suất. Xem nhận xét vì sao.

Sự khác biệt ở trên có thể có vẻ tinh tế ngay từ cái nhìn đầu tiên, nhưng việc cắt giảm là thay đổi lớn.

Đây là lý do tại sao.

### No Class Needed

`Drama` xung quanh các `class ES6` là `overblown`. Các hàm đơn giản thường là thích hợp hơn, và loại bỏ lớp `cruft` liên quan như mở rộng và hàm tạo trong ví dụ trên là một thay đổi tích cực.

### No this Keyword

Như bạn có thể thấy ở trên, `stateless functional component` chỉ là một hàm. Do đó, tất 
cả các quirks gây phiền nhiễu và khó hiểu với từ khóa này của Javascript đều tránh được. Toàn bộ thành phần trở nên dễ hiểu hơn nếu không có từ khóa này. Chỉ cần so sánh trình xử lý nhấp chuột trong mỗi cách tiếp cận:

```
onClick={this.sayHi.bind(this)}>Say Hi</a>
onClick={sayHi}>Say Hi</a>
```

Lưu ý rằng `bind` không cần thiết cho `stateless functional component`. `Dumping class` loại bỏ sự cần thiết phải `calling bind` để `pass context` xung quanh. Do từ khóa này khó hiểu của JavaScript là với nhiều nhà phát triển, tránh nó là thay đổi tích cực.

Oh, như một lưu ý phụ, có năm cách khác nhau để `handle binding` React. Link sau đây là một bài viết ngắn về các cách khác nhau để `handle binding`. (https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)

### Enforced Best Practices

`Stateless functionalcComponent` rất hữu ích cho các thành phần `dump/presentational component`. `Presentational component` tập trung vào giao diện người dùng thay vì hành vi, vì vậy điều quan trọng là tránh sử dụng `state` trong các `presentational component`. Thay vào đó, `state` nên được quản lý bởi các thành phần `container` cấp cao hơn, hoặc thông qua Flux / Redux / etc. `Stateless functional component` không hỗ trợ các `state` hoặc vòng đời. Đây là một điều tốt.

Hãy xem, bạn luôn phải thêm `state` vào một `presentational component`. Đó là một cách nhanh chóng để hack trong một tính năng. Vì `stateless functional component` không hỗ trợ `state`, bạn không thể dễ dàng tấn công ở một số trạng thái. Do đó, các `stateless fucntional cpmponent` theo chương trình thực thi việc giữ `component pure`. Bạn buộc phải quản lý `state` trong các thành phần chứa cấp cao hơn.

### High Signal-to-Noise Ratio

Như bạn có thể thấy trong hình trên, các `stateless functional component` gọn hơn. Điều này sẽ làm giảm độ phức tạp. Như đã thảo luận trong “Writing Code for Humans”, `code` tuyệt vời càng dễ hiểu và dễ `maintain`. Các thành phần dòng 27 đã trở thành 21 dòng, giảm ~ 20%. Bạn có thể tiến thêm một bước về các `component` đơn giản. Với câu lệnh trả về một dòng, bạn có thể bỏ qua dấu ngoặc kép và dấu ngoặc nhọn. Nếu bạn làm điều này và cũng sử dụng ES6 destructuring trên đạo cụ, kết quả là gần như tất cả các `signal`:

```
import React from ‘react’;

const HelloWorld = ({name}) => (
 <div>{`Hi ${name}`}</div>
);

export default HelloWorld;
```

Đó là một hàm lấy tham số và trả về 1 `div`. Gọn nhẹ điều này có khả thi có thể tốt hơn không?

### Code Completion/Intellisense

Nếu bạn hủy cấu trúc các `props` của bạn trong ES6 như tôi đã làm trong ví dụ trên, thì tất cả dữ liệu bạn sử dụng bây giờ được chỉ định như một đối số hàm đơn giản. Điều này có nghĩa là bạn cũng cải thiện `completion/intellisense`  so với các `base component`.

### Bloated Components and Poor Data Structures Are Easily Spotted

Tất cả chúng ta đều biết một hàm có rất nhiều tham số là một `code`. Khi bạn sử dụng ES6 destructuring với các `stateless functional component`, danh sách đối số sẽ chuyển tải rõ ràng các phụ thuộc của `component`. Vì vậy, thật dễ dàng để phát hiện các `component` cần chú ý. Trong trường hợp này, bạn có thể chia nhỏ `component` hoặc suy nghĩ lại các cấu trúc dữ liệu bạn đang truyền đi. Đôi khi một danh sách dài các `props` có thể dễ dàng được giải quyết bằng cách chuyển một đối tượng thay thế. Nhưng nếu các `props` không đủ liên quan về mặt logic để biện minh cho một đối tượng, thì có thể là thời gian để cấu trúc lại `component` thành nhiều `component` riêng biệt.

### Easy to Understand

Như chúng ta vừa thấy, khi bạn nhìn thấy một `stateless functional component`, bạn biết đó đơn giản chỉ là một chức năng lấy `props` và trả lại HTML. Ngay cả khi nó chứa rất nhiều chức năng `mackup` và `nested function` bên trong hiển thị, nó đơn giản về mặt khái niệm. Đó là một `pure function`. Điều này dẫn đến thay đổi tích cực lớn tiếp theo…

### Easy to Test

Vì nó là một `pure function` các xác nhận của bạn rất đơn giản: Với các giá trị này cho các `props`, tôi mong đợi nó trả về `markup` này. Vì vậy, đối với ví dụ `component` HelloWorld, tôi có thể khẳng định rằng khi hàm render được gọi với giá trị ‘Cory’ cho props.name, nó trả về một div với ‘Hi Cory’ bên trong.

### Performance

Cuối cùng, các `stateless functional component` cũng có thể sớm cải thiện hiệu năng. Vì không có `state` và `life cyrcle`, nhóm React có kế hoạch tránh các kiểm tra không cần thiết và cấp phát bộ nhớ trong các bản phát hành trong tương lai.

Thậm chí ngày nay, các `function component` đơn giản hơn `class component`, có nghĩa là `functional components = smaller bundles`:

![](https://images.viblo.asia/6c0597f6-0cd0-4cae-8744-36915f26a086.png)

Cải thiện hiệu suất với cú pháp, khả năng kiểm tra và khả năng đọc?

### Summary

Vì tất cả những lý do này, chúng ta nên cố gắng sử dụng các `stateless functional component` bất cứ khi nào có thể. Các `stateless functional component` cung cấp phương pháp tuyệt với nhất mà tôi đã thấy để tạo thành phần có thể tái sử dụng trong bất kỳ khung phổ biến nào. Có, kể cả Angular 2.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn!