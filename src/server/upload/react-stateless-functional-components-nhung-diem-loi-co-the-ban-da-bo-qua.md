## Tổng quan

Ở phiên bản React .14, một cách đơn giản hơn để định nghĩa các component được gọi là stateless functional components. Đây là những component sử dụng các hàm Javascript thuần túy. Sau đây là trước và sau khi có ES6:

![](https://images.viblo.asia/c7f29641-5a0e-46b5-ba5e-2c0bf8f1f3ae.png)

Có lẽ việc cắt giảm 27 dòng code xuống 21 dòng không phải là một thay đổi quá lớn. Những điểm khác biệt ở trên thoạt nhìn có thể chưa rõ ràng, không có gì quá to tát, nhưng việc có thể giảm thiểu được một số thứ không cần thiết lại là điều vô cùng có lợi và đáng làm. Sau đây là các lý do:

### Không cần khai báo Class
Việc sử dụng các hàm thuần túy thực sự là điều nên làm, và việc loại bỏ được những thứ không hề mong muốn liên quan đến Class như `extends` và hàm `constructor` như ở ví dụ trên là một trong những điểm lợi.

### Không sử dụng từ khóa `this`
Như bạn có thể thấy ở trên, stateless component chỉ đơn thuần là một hàm. Thế nên, tất cả những vấn đề không minh bạch, gây rắc rối và khó chịu gây ra bởi từ khóa `this` đều được loại bỏ. Toàn bộ component trở nên dễ hiểu hơn khi không có từ khóa `this`. Chỉ cần so sánh hai cách khai báo hàm onClick thôi là ta cũng có thể thấy rõ:

```
onClick={this.sayHi.bind(this)}>Say Hi</a>
onClick={sayHi}>Say Hi</a>
```

Ta thấy rằng từ khóa `bind` đã trở nên không cần thiết đối với stateless component. Việc từ bỏ các Class đã loại bỏ được sự phụ thuộc vào việc phải gọi từ khóa `bind` để truyền vào ngữ cảnh `this` . Từ khóa `this` là một trong những yếu tố trong Javascript gây khó hiểu nhất đối với rất nhiều lập trình viên, vây nên việc tránh phải sử dụng nó là một điểm lợi nữa.

### Buộc chúng ta sử dụng các Best Practices
Các Stateless function component rất hữu dụng trong việc xây dựng các component chuyên dùng để hiển thị (dumb/presentational component). Các Presentational Component tập trung vào việc hiển thị hơn là xử lý các sự kiện, vì thế nên việc tránh phải sử dụng state trong các Presentational Component là điều quan trọng. Thay vào đó, state nên được quản lý bởi các component chứa ở tầng cao hơn, hoặc thông qua việc sử dụng Flux/Redux/ v.v... Các Stateless functional component không hỗ trợ state hay các lifecycle method. Đây là một điều tốt, bởi nó giúp ta tránh khỏi sự lười biếng.

Có thể thấy rằng, việc thêm state vào cho các presetational component lúc nào cũng rất hấp dẫn, nhất là khi chúng ta đang vội. Đó là một cách nhanh chóng để ta có thể hoàn thành một feature nào đó. Nhưng vì stateless functional component không hỗ trợ local state, nên cho dù lười biếng đến thế nào bạn cũng không thể "tiện tay" sử dụng chúng chỉ vì muốn hoàn thành nhanh một chức năng nào đó. Vậy nên các stateless functional component về mặt lập trình sẽ giúp ta giữ cho các component sạch sẽ hơn (pure component). Bạn sẽ buộc phải đặt việc quản lý state ở đúng chỗ của nó: tại các component chứa ở tầng cao hơn.

### Tỷ số "Tín hiệu trên nhiễu" - SNR cao hơn
Tỷ số này có thể hiểu như việc viết ít code khiến ta đỡ rối mắt hơn ( ít nhiễu hơn) nhưng lại dễ hiểu hơn truyền tải được đúng thông điệp (nhiều tín hiệu hơn). Như bạn có thể thấy ở ảnh trên, các stateless functional component yêu cầu gõ code ít hơn, những dòng code tuyệt vời là những dòng code có thể tối ưu hóa được tỷ số trên. 27 dòng code trong một component trở thành 21 dòng, giảm được 20%. Bạn có thể tiến thêm một bước trong việc đơn giản hóa các component. Nếu chỉ có duy nhất một dòng ở câu lệnh `return`, thì bạn có thể loại bỏ từ khóa `return` cùng với các ngoặc đơn. Nếu bạn làm điều này và sử dụng destructor của ES6 trên props truyền vào component, kết quả đạt được sẽ là toàn "tín hiệu":

```
import React from ‘react’;

const HelloWorld = ({name}) => (
 <div>{`Hi ${name}`}</div>
);

export default HelloWorld;
```

Đó chỉ đơn thuần là một hàm nhận các tham số và trả về HTML. Liệu còn có gì có thể sạch sẽ hơn?

### Các component code ẩu và cấu trúc dữ liệu không tốt có thể dễ dàng được phát hiện
Chúng ta đều biết rằng nếu để một hàm mà nhận vào quá nhiều tham số cùng lúc tức là ta đang code "xấu". Khi sử dụng destructor của chuẩn ES6 lên các stateless component, danh sách các tham số có thể truyền tải được rõ ràng các sự phụ thuộc của các component. Nhờ đó, bạn có thể dễ dàng thấy được các component cần được chú ý đến. Trong trường hợp này, bạn có thể chia nhỏ component đó ra hoặc nghĩ lại về cấu trúc các dữ liệu mà bạn đang truyền vào các component. Đôi khi, một danh sách dài các props có thể dễ dàng được giải quyết bằng cách thay vào đó truyền vào một object. Nhưng nếu các props không có sự liên quan đến mức có thể cho vào cùng một object, thì đó là lúc bạn cần refactor component thành các component riêng biệt.

### Dễ dàng để hiểu
Như ta vừa thấy, khi bạn nhìn một stateless functional component, bạn biết nó chỉ đơn thuần là một hàm nhận vào props và trả ra HTML. Cho dù nó có chứa rất nhiều các đoạn HTML và các hàm lồng ở trong đoạn render, thì nó vẫn rất đơn giản. Đó là pure function. Điều này dẫn đến một điểm lợi lớn tiếp theo.

### Dễ dàng để Test
VÌ nó là một pure function, những dòng code của bạn sẽ truyền tải một quy tắc khẳng định vô cùng chắc chắc và thẳng thắng: "Nếu truyền vào những giá trị này cho props, tôi mong chờ nó trả về về đoạn HTML như thế này". Vì thế nên với component HelloWorld ở trong ví dụ, ta có thể khẳng định rằng khi hàm render được gọi với giá trị "Cory" được truyền cho props.name, thì hàm sẽ trả về thẻ `div` với giá trị "Hi Cory" ở trong.

> Với các stateless functional component của React, mỗi component có thể được test một cách dễ dàng một cách độc lập. Không cần phải vẽ mock, mô phỏng state, các thư viện đặc biệt hay các quy trình test cầu kỳ nào.

### Điểm yếu
Không có phương pháp nào là hoàn hảo, nhưng bạn sẽ cần phải chuyển hóa các functional component thành các class nếu bạn cần phải sử dụng các lifecycle method, refs, hoặc muốn tối ưu hóa hiệu năng sử dụng `shouldComponentUpdate/PureComponent`. 

## Tổng kết
Với tất cả các lý do ở trên, chúng ta nên cố gắng sử dụng các stateless functional component bất cứ lúc nào có thể. React Stateless component cung cấp cho ta một cách tiếp cận tao nhã nhất để có thể tạo ra các component có thể sử dụng lại ở bất kỳ một framework nào khác.