# Giới thiệu tốt hơn về React?
Thật không may, hầu hết các hướng dẫn về React không có sự cân nhắc về các phương pháp hay nhất và không phải lúc nào cũng dạy bạn cách "đúng" để thực hiện React.

Trong hướng dẫn này, tôi sẽ giới thiệu cho các bạn những điều cơ bản về React và các lỗi phổ biến nhất mà bạn có thể gặp phải.

Hướng dẫn này sẽ dài, vì vậy hãy nhớ lấy cho mình một ít cà phê!

# Tại sao chọn React?
Trước khi bắt đầu, chúng ta hãy dừng lại một chút và xem tại sao React thực sự là lựa chọn tốt nhất.

## Declarative
Trong React, bạn mô tả những gì sẽ hiển thị (thay vì cho trình duyệt biết cách thực hiện).

Trong React, bạn chỉ cần bắt đầu viết mã, nó không có bảng soạn sẵn component nào mà bạn phải tạo. Có một số thiết lập liên quan, nhưng khi nói đến các component, bạn có thể thể hiện chúng dưới dạng các pure functions.

## Clear syntax
JSX trong React giống như HTML, không có cú pháp đặc biệt nào để học:

```
const Greetings = ({ firstName }) => (
   <div>Hi, {firstName}</div>
);
```

## Learning curve
Learning curve là rất quan trọng khi chọn một khung giao diện người dùng.React có ít sự trừu tượng nhất. 

Nếu bạn biết JavaScript thì bạn có thể bắt đầu viết mã React trong một ngày.

Đúng vậy, cần có thời gian để chọn ra các phương pháp hay nhất, nhưng bạn sẽ có thể bắt đầu rất nhanh.

## Functional

Theo ý kiến của tôi, sức mạnh lớn nhất của React đến từ việc bạn thậm chí không bị buộc phải sử dụng các class. Các class làm tới mức phức tạp hoá các codebase mà không mang lại bất kì giá trị nào.

Trong React, tất cả các UI có thể được thể hiện dưới dạng một tập hợp các pure functions, và sử dụng chúng để render UI một cách dễ dàng.

# Nào, bắt đầu code thôi!
Bây giờ tôi hy vọng có thể thuyết phục bản sử dụng React và viết một số mã!

## Node.js
Node.js là một môi trường thời gian chạy JavaScript cho phép chúng tôi biên dịch mã React tuyệt vời!

Trước hết, hãy đảm bảo rằng bạn đã cài đặt Node.js. Nếu không, bạn có thể tải xuống từ đây: https://nodejs.org/en/download

## create-react-app
Chúng tôi sẽ sử dụng create-react-app từ Facebook để xây dựng ứng dụng của mình. Đây là cách phổ biến thiết lập môi trường và viết code.
Nó đi kèm với các công cụ cần thiết được tích hợp sẵn, giúp chúng ta loại bỏ nhiều thứ thừa.

Để cài đặt:
```
npm i -g create-react-app
```
Sau đó để mở đầu cho việc chạy dự án đầu tiên của bạn: 
```
create-react-app react-intro
```

Giờ thì start 
```
cd react-intro
npm start
```

Thao tác này sẽ khởi chạy một máy chủ phát triển và cho phép bạn mở ứng dụng React mới và "sáng bóng" bằng cách truy cập http://localhost:3000/ trong trình duyệt của bạn.


Bây giờ, hãy xem mọi thứ đang hoạt động như thế nào. Sử dụng IDE bạn chọn (tôi khuyên bạn nên dùng Visual Studio Code) để mở dự án mới được tạo.

## index.html
Trong dự án, truy cập tệp `public/index.html`. Đây là những gì bạn sẽ thấy:
![](https://images.viblo.asia/d2a949eb-7b7f-4693-98eb-e5e10ffd358d.png)

Phần mà chúng tôi quan tâm là` <div id = "root"> </div>`. Đây là nơi ứng dụng React của chúng tôi sẽ đi đến.

Toàn bộ div gốc chỉ đơn giản là sẽ được thay thế bằng nội dung của ứng dụng React của chúng tôi. Mọi thứ khác sẽ không thay đổi.

## index.js
Bây giờ, hãy mở `src/index.js`. Đây là tệp khởi động toàn bộ ứng dụng React. Và nhân tiện, tất cả mã nguồn React của chúng ta sẽ đi vào thư mục src.

![](https://images.viblo.asia/03d3e528-7629-4246-8309-0ce8403b71c2.png)

 Dòng code tạo ra điều kì diệu:
```
ReactDOM.render(<App />, document.getElementById('root'));
```

Dòng này là một cách để yêu cầu React lấy thành phần Ứng dụng của chúng tôi (chúng ta sẽ thảo luận về nó một chút) và đặt nó trong div gốc đã được xác định ở trên trong tệp index.html.

Bây giờ chúng ta hãy tập trung vào phần <App />. Cái này trông rất giống HTML, phải không? Đây được gọi là JSX, và là một cú pháp JavaScript đặc biệt mà React sử dụng để thực hiện điều kỳ diệu của nó. Lưu ý rằng nó bắt đầu bằng chữ A viết hoa - nó là <App />, không phải <app />. Đây là quy ước được React sử dụng, cho phép nó phân biệt giữa các thẻ HTML thông thường và các thành phần React mà chúng tôi đã tạo. Nếu bạn không bắt đầu các thành phần của mình bằng một chữ cái viết hoa, thì React sẽ không thể hiển thị các thành phần của bạn.

Và bất cứ khi nào sử dụng JSX, chúng tôi luôn phải nhập React bằng cách thêm dòng sau trong tệp .js:

```
import React from 'react';
```

## App.js

Bây giờ chúng tôi đã sẵn sàng xem xét thành phần đầu tiên. Hãy mở `src/app.js`:

![](https://images.viblo.asia/0e1472ec-998f-4b64-ab9a-1c10afe55745.png)

Để tạo một thành phần React, chúng ta phải tạo một lớp kế thừa từ React.Component. Đó chính xác là những gì mà App extends Component làm. Tất cả các thành phần React nên triển khai một phương thức kết xuất - như bạn có thể đoán, tất cả việc kết xuất đều diễn ra trong phương thức này. Phương thức kết xuất phải trả về đánh dấu được hiển thị.

> Một lưu ý nhỏ: thuộc tính className tương đương với thuộc tính class trong HTML và được sử dụng để gán các lớp CSS để tạo kiểu. class là một từ khóa dành riêng trong JavaScript và không thể được sử dụng cho tên thuộc tính.


** Hãy tóm tắt lại:**
1. Thành phần có tên là App (viết hoa A)
2. Nó mở rộng lớp React.Component
3. Nó phải triển khai phương thức kết xuất, phương thức này trả về đánh dấu.


# Phương pháp sai # 1 - Thành phần lớp ở mọi nơi
Có hai cách để tạo các thành phần trong React: Class Components và Functional Components. Như bạn có thể thấy, ví dụ trên là về Class Components. Và thật không may, hầu hết các hướng dẫn cho người mới bắt đầu đều khuyến khích là Class Components.

Có vấn đề gì với Class Components? Chúng khó kiểm tra, có xu hướng phát triển thực sự lớn, dễ bị phân tách mối quan tâm kém, kết hợp logic với trình bày (khiến việc debug và test khó hơn). Nói chung, bạn sẽ tự bắn vào chân mình bằng cách sử dụng Class Components. Đặc biệt nếu bạn là người mới bắt đầu, tôi khuyên bạn nên tránh xa chúng hoàn toàn.
```
function App() {
  return (
    <div className="App">
      ...
    </div>
  );
}

export default App;
```

Xem những gì chúng tôi đã làm ở đây? Chúng tôi đã xóa lớp và thay thế phương thức kết xuất bằng hàm App () {...}. Và nếu chúng ta sử dụng các hàm mũi tên của ES6, nó sẽ trông đẹp hơn:
```
const App = () => (
  <div className="App">
    ...
  </div>
);

export default App;
```

Chúng tôi đã biến thành phần lớp thành một hàm trả về đánh dấu sẽ được hiển thị.

Hãy suy nghĩ về điều đó một chút… Một hàm trả về đánh dấu, không có mã soạn sẵn không cần thiết, chỉ là đánh dấu thuần túy! Nó có đẹp không?

Thành phần chức năng đọc tốt hơn nhiều và có tỷ lệ tín hiệu trên nhiễu cao hơn.


Trong bài viết này, chúng tôi sẽ gắn bó với các Class Components, vì chúng liên quan đến ít trừu tượng hơn và dễ dàng hơn để chứng minh các khái niệm React cốt lõi. Khi bạn đã hiểu rõ về các kiến thức cơ bản về React, tôi thực sự khuyên bạn nên đọc bài viết chuyên sâu hơn của tôi -  [Mastering React Functional Components with Recompose](https://medium.com/@ilyasz/mastering-react-functional-components-with-recompose-d4dd6ac98834)

# Giới thiệu về props

Props là một khái niệm trung tâm của React. Chính xác thì Props là gì? Suy nghĩ trong giây lát về các tham số được truyền cho một hàm. Props chỉ là vậy - các tham số được truyền cho một thành phần.

```
const Greetings = (props) => <div>Hey you! {props.firstName} {props.lastName}!</div>;

const App = () => (
  <div>
    <Greetings firstName="John" lastName="Smith" />
  </div>
);
```

Ở đây, chúng tôi đã tạo Greetings component và chúng tôi đang sử dụng thành phần này để chào John Smith từ bên trong App component. Điều này sẽ dẫn đến đánh dấu sau:

```
<div>
   <div>Hey you! John Smith!</div>
</div>
```

Dấu ngoặc nhọn trong {props.name} biểu thị mã JavaScript. Thành phần Greetings đã được chuyển firstName và lastName dưới dạng các tham số và chúng tôi chỉ cần truy xuất chúng bằng cách truy cập đối tượng props.

Lưu ý rằng thành phần đã nhận một đối tượng props duy nhất, không phải hai giá trị cho firstName và lastName.

Chúng tôi có thể đơn giản hóa mã hơn nữa bằng cách sử dụng cú pháp hủy cấu trúc đối tượng ES6:

```const Greetings = ({ firstName, lastName }) => <div>Hey you! {firstName} {lastName}!</div>;```

Lưu ý rằng (props) đã được thay thế bằng ({firstName, lastName}). Điều này có nghĩa là chúng tôi chỉ quan tâm đến hai thuộc tính đó của props object. Và điều này, đến lượt nó, cho phép chúng tôi truy cập trực tiếp các giá trị firstName và lastName mà không cần phải chỉ định rõ ràng props.firstName.
Điều gì sẽ xảy ra nếu chúng tôi đang sử dụng các thành phần lớp thay thế?

```

class Greetings extends React.Component {
  render() {
    return (
      <div>Hey you! {this.props.firstName} {this.props.lastName}!</div>
    );
  }
}
```

Tôi không biết về bạn, nhưng với tôi, điều này có vẻ cồng kềnh hơn nhiều! Chúng ta luôn phải sử dụng this.props một cách rõ ràng.

# Single Responsibility Principle (Nguyên tắc trách nhiệm đơn lẻ)

Nguyên tắc Trách nhiệm Đơn lẻ là nguyên tắc lập trình quan trọng nhất cần tuân theo. Nó nói rằng một mô-đun nên làm một việc và nó sẽ làm tốt điều đó. Không tuân theo nguyên tắc này một mình có thể biến bất kỳ cơ sở mã nào thành cơn ác mộng không thể duy trì.

Làm thế nào chúng ta có thể vi phạm nguyên tắc này? Cách phổ biến nhất là đặt những thứ không liên quan vào cùng một tệp.

Tôi sẽ đề cập đến Nguyên tắc trách nhiệm duy nhất nhiều lần trong hướng dẫn này.

Người mới bắt đầu thường đặt nhiều thành phần trong cùng một tệp. Ở đây, chúng tôi đã đặt các thành phần Greetings và App components trong cùng một tệp. Đây là một thực hành không tốt vì điều này vi phạm Nguyên tắc Trách nhiệm Đơn lẻ.

Ngay cả những thành phần nhỏ nhất (như Greetings component ở trên) cũng nên được đặt trong một tệp riêng biệt.

Nào, hãy đặt Greetings component vào file riêng: 
```
import React from "react";

const Greetings = ({ firstName, lastName }) => (
    <div>
        Hey you! {firstName} {lastName}!
    </div>
);

export default Greetings;
```

Và sử dụng trong App component:
```
import Greetings from "./Greetings";
const App = () => (
  ...
);
```

Đảm bảo rằng tên tệp khớp với tên thành phần. Thành phần ứng dụng nên được đặt trong App.js, thành phần Lời chào nên được đặt trong Greetings.js, v.v.

# Giới thiệu về state

State là một khái niệm trung tâm khác của React. Đây là nơi bạn muốn giữ dữ liệu của mình - những thứ có thể thay đổi. Lưu trữ giá trị được nhập vào một phần tử biểu mẫu? Sử dụng trạng thái. Theo dõi điểm số trong trò chơi của bạn? Sử dụng trạng thái.

Hãy xây dựng một biểu mẫu đơn giản lấy tên của người dùng. Lưu ý rằng tôi đang sử dụng một cách có chủ đích một thành phần lớp để thể hiện khái niệm. Tôi chứng minh việc tái cấu trúc một thành phần lớp thành một thành phần chức năng trong bài viết khác của tôi - [Mastering React Functional Components with Recompose.](https://medium.com/@ilyasz/mastering-react-functional-components-with-recompose-d4dd6ac98834)
```
import React from "react";

class SimpleForm extends React.Component {
  render() {
    return (
      <div>
        <input type="text" name="firstName" />
        <Greetings firstName="John" />
      </div>
    );
  }
}

const App = () => (
  <div>
    <SimpleForm />
  </div>
);
```

Ok, người dùng có thể nhập email của mình vào form, điều này thật tuyệt! Nếu bạn đã chú ý, thì bạn sẽ nhận thấy rằng bất kể thế nào, tên John sẽ được sử dụng trong lời chào. Điều gì xảy ra nếu không phải tất cả tên của người dùng của chúng tôi đều là John? Chúng ta sẽ tự đặt mình vào một tình huống rất khó chịu.
Làm thế nào chúng ta có thể sử dụng giá trị được nhập vào đầu vào? Trong React, chúng tôi không được phép truy vấn trực tiếp DOM. Đây là nơi mà các trình xử lý đầu vào và trạng thái xuất hiện.

```
class SimpleForm extends React.Component {
  state = {
    firstName: "",
  };

  onFirstNameChange = event =>
    this.setState({
      firstName: event.target.value
    });

  render() {
    return (
      <div>
        <input type="text" name="firstName" onChange={this.onFirstNameChange} />

        <Greetings firstName={this.state.firstName} />
      </div>
    );
  }
}
```

State về cơ bản là một đối tượng JavaScript đơn giản được lưu trữ dưới dạng thuộc tính trong thành phần lớp SimpleForm. Ở đây, chúng tôi đang thêm giá trị firstName vào lớp.

Đầu vào firstName của chúng tôi hiện có trình xử lý sự kiện onChange. Nó kích hoạt mỗi khi người dùng nhập một phím vào đầu vào. Và propertythis.onFirstNameChange trong lớp của chúng ta xử lý các sự kiện onChange.

Hãy xem thuộc tính onFirstNameChange:
```
this.setState(...)
```
Đây là cách chúng tôi cập nhật trạng thái của các thành phần của chúng tôi. Chúng tôi không nên cập nhật trạng thái thành phần trực tiếp, chỉ thông qua phương thức setState. Và để cập nhật giá trị của giá trị trạng thái firstName, chúng ta chỉ cần chuyển một đối tượng với các giá trị được cập nhật vào phương thức setState:

`{ firstName: event.target.value }`

Trong trường hợp này, event.target.value là giá trị được nhập vào đầu vào biểu mẫu. Trong trường hợp này, đây là tên của người dùng.

> Một lưu ý nhỏ: chúng tôi chưa định nghĩa onFirstNameChange là một phương thức. Điều này cực kỳ quan trọng để xác định nó là một thuộc tính hàm mũi tên trên lớp chứ không phải một phương thức. Nếu chúng ta đã định nghĩa nó là một phương thức thay vào đó, thì điều này sẽ bị ràng buộc với đầu vào biểu mẫu được gọi là phương thức, không phải với lớp như chúng ta mong đợi. Chi tiết nhỏ này thường làm khó người mới bắt đầu. Đây là một lý do khác để tránh các lớp trong JavaScript.


# Kết luận
Trên đây là những giới thiệu cơ bản về UI và component trong Reactjs. 
Bài viết được dịch từ bài gốc: 
https://medium.com/codeiq/react-js-a-better-introduction-to-the-most-powerful-ui-library-ever-created-ecd96e8f4621

Cám ơn các bạn đã đọc!