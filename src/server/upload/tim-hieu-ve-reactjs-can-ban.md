Chắc hẳn "React" đã không còn là từ mới lạ đối với các bạn nữa vì sự phổ biến của nó, đã có nhiều "đàn anh" đi trước như : Angular, Backbone,... Thế nhưng sự cạnh tranh của React là không hề kém cạnh, thậm chí cho đến thời điểm hiện tại sự phát triển vượt trội React đã được thể hiện qua những con số cụ thể như sau
![](https://images.viblo.asia/42245bd3-e37c-4f43-97e3-b958523a2576.png)
Nhìn qua biểu đồ này chúng ta cũng đã biết được có nên học React hay không rồi đúng không.
Bắt đầu tìm hiểu React, bạn sẽ search keyword mà đầu tiên ai cũng nghĩ tới: "React", rồi có lẽ bạn sẽ vào trang chủ của nó rồi tìm tài liệu để đọc, đối với các developer có kinh nghiệm, việc đọc document trên trang chủ thì không có vấn đề gì cả, nhưng đối với người mới bắt đầu tìm hiểu, chưa có nhiều kiến thức lẫn kinh nghiệm học thông qua offical document mình khuyên các bạn nên tìm hiểu theo 1 serries nào đó mà bạn cảm thấy dễ hiểu, sau đó mới lên đọc lại những tài liệu chính thức trên trang chủ để đối chiếu và khớp lại kiến thức.
Mới bắt đầu tìm hiểu về công nghệ này, mình cũng đã lên tìm rất nhiều tài liệu ở trên google, nhưng rồi càng tìm càng hoang mang vì "MỘT BẦU TRỜI KIẾN THỨC" này. Dưới đây sẽ là một số kinh nghiệm mình chia sẻ trong quá trình làm beginner của mình :v: 

# Basic knowleaged
* Điểm qua những kiến thức cơ bản mà chúng mình cùng tìm hiểu nào
* React là gì ?
* Tại sao lại dùng React ?
* Component
* Functional Component
* State and Props

# React là gì ?
React.js là một thư viện Javascript đang nổi lên trong những năm gần đây với xu hướng Single Page Application, được ra đời vào đầu năm 2013 bởi các kỹ sư Facebook, cho đến hiện nay vẫn được Facebook phát triển và bảo trì.
Trong khi những framework khác cố gắng hướng đến một mô hình MVC hoàn thiện thì React nổi bật với sự đơn giản và dễ dàng phối hợp với những thư viện Javascript khác. Nếu như AngularJS là một Framework cho phép nhúng code javascript trong code html thông qua các attribute như ng-model, ng-repeat...thì với react là một library cho phép nhúng code html trong code javascript nhờ vào JSX, bạn có thể dễ dàng lồng các đoạn HTML vào trong JS. Tích hợp giữa javascript và HTML vào trong JSX làm cho các component dễ hiểu hơn.

# Tại sao lại dùng React ?
Đi lòng vòng trên các tài liệu trên google, mình cũng đã rút ra được một số kết luận tại sao lại dùng như sau:
## 1. Đơn giản
React là một framework học "tương đối" dễ vào, chỉ cần nắm bắt được một vài kiến thức cơ bản như component, JSX, functional component, props và state là bạn đã có thể tự tạo cho mình được một ứng dụng React cơ bản rồi đó, Sau khi có trong tay những kiến thức trên, không cần quá đào sâu, bạn hãy lên và làm theo ví dụ trên trang chủ của react về trò chơi Tic Tac Toe (X O), rồi bạn sẽ nhận ra được những điều căn bản và cốt lõi của framework này mà thôi.

## 2. Tái sử dụng
Một trong các ưu điểm của React là tạo ra các component, các component được lưu trữ riêng biệt và nhỏ lẻ trong từng file nên việc quản lí và tái sử dụng ở nhiều nơi là rất  khả thi, tránh được tình trạng lặp lại code và khó quản lý cũng như bảo trì.

## 3. Render tầng server
Một trong những vấn đề với các ứng dụng đơn trang là tối ưu SEO và thời gian tải trang. Nếu tất cả việc xây dựng và hiển thị trang đều thực hiện ở client, thì người dung sẽ phải chờ cho trang được khởi tạo và hiển thị lên. Điều này thực tế là chậm. Hoặc nếu giả sử người dung vô hiệu hóa Javascript thì sao? Reactjs là một thư viện component, nó có thể vừa render ở ngoài trình duyệt sử dụng DOM và cũng có thể render bằng các chuỗi HTML mà server trả về.

## 4. Cộng đồng lớn
Cho tới thời điểm hiện tại, React vẫn đang là một framework phổ biến và được rất nhiều lập trình viên ưa chuộng, chính vi vậy cộng đồng hỗ trợ và hỏi đáp rất đông đảo cũng như có rất nhiều tool, extendsion hỗ trợ được React được ra đời.

# Component
Component là một trong những kiến thức cơ bản mình nói ở bên trên, vậy component là gì ? 
Giả sử bạn có 1 header như sau
![](https://images.viblo.asia/6f61f5e7-7a81-47bd-913f-c3888fb6835b.png)
Ở header này bạn sẽ thấy nó gồm nhiều thành phần, mình sẽ tạm chia các thành phần như sau:
- Menu
  + Ảnh logo.
  + Thanh gồm các tiêu đề : Docs, Tutorial, Community, Blog.
  + Thanh input search.
  + Thanh gồm: Phiên bản, ngôn ngữ, github.
- Banner (Phần còn lại bên dưới).

Mình đã chia header này thành 2 phần : Menu và banner, 2 thành phần này chính là 2 component, trong component Menu lại được chia ra thành các component con đó là : Logo, input search,...
Như vậy, chúng ta có lẽ cũng đã hiểu được một component là gì, đây chính là một kiến thức cơ bản và cần thiết nhất khi chân ướt chân ráo bước vào "học nghề".

# Functional Component
Functional Component là một hàm Javascript (hoặc ES6) trả về 1 phần tử/1 element React. Theo official docs của React, hàm dưới đây là một component React hợp lệ :
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#  State and Props
Để nói về state và Props, có lẽ ta sẽ phải chạy qua một vài ví dụ
## Props
Props là viết tắt cho từ Properties (thuộc tính). Như các bạn đã biết , một thẻ HTML có thể có nhiều thuộc tính, ví dụ như : name, id , value,... React cũng sử dụng tương tự như vậy
Ở ví dụ này, mình giả sử các bạn đã biết khởi tạo ứng dụng react mới như thế nào.
```
//App.js
import React from 'react';

export default class Person extend React.Component{
   render() {
       return(
            <div>
                Hello {this.props.name_of_person}
            </div>
       );
   }
}
```

```
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Person from './App';

ReactDOM.render(<Person name_of_person="Mr.Bean" />,document.getElementById('root'));
```

```
//index.html
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

Như 3 đoạn code ở 3 file trên, ta đã có thể render ra một component với dạng text như sau : Hello Mr.Bean.
Vậy quy trình ở đây là gì ?
Đầu tiên, ở file App.js ta đã định nghĩa ra một component có tên là Person, trong component này chúng ta return về một div có text bên trong là : "Hello ten_nguoi_nao_do", vậy tên người nào đó React lấy ở đâu ra ? Chính là đoạn ta truyền vào ở file index.js, khi ta goị đến thẻ Person (thẻ này đã được định nghĩa ở file trên), ta truyền vào một props có tên là name_of_person với giá trị là "Mr.Bean". Vì vậy mỗi khi render, component Person sẽ hiểu được this.props.name_of_person (chính nó -> các thuộc tính -> lấy ra thuộc tính có tên là name_of_person).
Sau khi hoàn thành xong việc gọi component Peson, React sẽ tiến hành render component này vào thẻ <div> có id là "root".
    
## State
```
//App.js
import React from 'react';

export default class Person extend React.Component{
   constructor(props){
        super(props);
        this.state = {
            name: "Mr.Bean1"
        }
    }
    
    changeName() {
        this.setState({
            name: "Mr.Bean2"
        });
    }
    
   render() {
       return(
            <div>
                Hello {this.state.name}
                <button onClick={() => this.changeName}> Bấm vào đây để đổi tên</button>
            </div>
       );
   }
}
```

```
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Person from './App';

ReactDOM.render(<Person />,document.getElementById('root'));
```

```
//index.html
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```
Đối với example này, chúng ta cũng sẽ thu được một đoạn text có nội dung là : "Hello Mr.Bean1", nhưng ngoài ra ta còn có thêm một button, sau khi click vào ta sẽ thu được đoạn text có nội dung khác, đó chính là: "Hello Mr.Bean2"
Như vậy là xong rồi đó, chúng ta đã có thể hiểu cách hoạt động của react cũng như tạo ra được một ứng dụng đơn giản với nó. Hẹn gặp lại các bạn ở bài viết tiếp theo !
    
Tài liệu tham khảo
    
https://www.codeinwp.com/blog/angular-vs-vue-vs-react/.
    
https://viblo.asia/p/gioi-thieu-ve-reactjs-phan-i-cac-khai-niem-co-ban-V3m5WzjblO7.
    
https://viblo.asia/p/react-js-hieu-ve-functional-va-class-components-Qbq5QpkRlD8.
    
https://hpphat.wordpress.com/2017/01/03/uu-va-khuyet-diem-cua-reactjs/