# I. Một số tools cần thiết #
Mình khuyên các bạn nên cài thêm 1 số package như **React Developer Tools** và **react-detector** để tiện cho việc phát triển.

   - **React Developer Tools**: là một tiện ích mở rộng Chrome DevTools cho thư viện JavaScript React nguồn mở. Nó cho phép bạn kiểm tra các cấu trúc thành phần React trong Công cụ dành cho nhà phát triển Chrome.
   - **React-detector**: dùng để phát hiện website nào sử dụng **react**
   
   Sau khi bạn cài đặt xong sẽ thấy icon của react phái góc bên phải, nếu nó sáng nên là website này đang sử dụng react ta có thể mở inspect nên chuyển qua tab React để xem các component, props, state của trang web.
   ![](https://images.viblo.asia/83f50053-9c87-4ceb-a089-fa424bb200bb.png)

# II. JSX #
React sử dụng JSX để tạo template thay vì JavaScript. JSX không phải là cần thiết để sử dụng, tuy nhiên, sau đây là một số ưu điểm mà đi kèm với nó:

- **Nhanh hơn** vì nó thực hiện tối ưu hóa trong khi biên dịch mã thành JavaScript.
- **An toàn** và hầu hết các lỗi có thể bị bắt trong quá trình biên dịch.
- Giúp bạn viết mẫu **dễ dàng hơn** và **nhanh hơn**, nếu bạn quen thuộc với HTML.

### Sử dụng JSX ###

JSX trông giống như một HTML thông thường trong hầu hết các trường hợp. Mình sẽ dùng luôn file Example của bài trước nhá, các bạn thay đổi nội dung nó thành như sau:
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div>
                <h1>Hello World!!!</h1>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```

Các bạn nhớ chạy 2 câu lệnh này để mở serve và compile nhá:
> php artisan serve
> 
> npm run watch

  - npm run dev: là để biên dịch 1 lần
  - npm run watch: là để biên dịch trong suất quá trình phát triển, nếu mà nó không tự biên dịch bạn nên thêm --poll phía sau:
 
 > npm run watch --poll

Sau đó các bạn mở trình duyệt web nên và xem kết quả, ở trên là mình sử dụng cú pháp của JSX đó bạn à, nếu mà không sử dụng JSX cú pháp của nó sẽ là như sau:
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            React.createElement("h1", {}, "Hello World")
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Các bạn thấy khó nhìn phải không? và mỗi khi mình cần render thêm, ví dụ như 1 thẻ `span` hay `h1` nữa các bạn lại phải gọi câu lệnh `React.createElement()` một lần nữa! :v

Mặc dù nó tương tự như HTML, nhưng có một vài điều chúng ta cần lưu ý khi làm việc với JSX.

1. **Phần tử lồng nhau:**

    Nếu bạn muốn trả về nhiều phần tử hơn, chúng ta cần bọc nó với một phần tử, phần tử gì cũng được miễn sao nó bao bọc những thẻ còn lại, mình thường sử dụng thẻ `<div>`.
    ```js
    import React, { Component } from 'react';
    import ReactDOM from 'react-dom';

    export default class Example extends Component {
        render() {
            return (
                <div>
                    <h1>Header</h1>
                    <h2>Content</h2>
                    <p>This is the content!!!</p>
                </div>
            );
        }
    }

    if (document.getElementById('example')) {
        ReactDOM.render(<Example />, document.getElementById('example'));
    }
    ```
    Kết quả:
    ![](https://images.viblo.asia/1f105874-3f46-4066-ae8e-1089d42c5ded.png)
2. **Thuộc tính**

    Nếu muốn sử dụng các thuộc tính tùy chỉnh của riêng các bạn ngoài các thuộc tính và thuộc tính HTML thông thường. Ví dụ ta muốn thêm thuộc tính tùy chỉnh, chúng ta cần sử dụng **tiền tố data-**. Trong ví dụ sau, mình đã thêm `data-myattribute` làm thuộc tính của phần tử `p`.
    ```js
    <p data-myattribute = "somevalue">This is the content!!!</p>
    ```
    Các bạn refesh lại trang và mở inspect lên xem kết quả nhá

3. **Biểu thức Javascript**
    
    Các biểu thức JavaScript có thể được sử dụng bên trong JSX. Chúng ta chỉ cần bọc nó với dấu ngoặc nhọn {}. Ví dụ sau sẽ hiển thị số 2.
    ```js
    <div>
        <h1>{ 1+1 }</h1>
    </div>
    ```
    Chúng ta không thể sử dụng các câu lệnh if bên trong JSX, thay vào đó chúng ta có thể sử dụng các biểu thức có điều kiện (**ternary**). Trong ví dụ sau, nếu i bằng 1 sẽ trả về `True`, ngược lai là giá trị khác sẽ trả về `False`.
    ```js
    <div>
        <h1>{ i == 1 ? 'True!' : 'False' }</h1>
    </div>
    ```
4. Style

   Style trong JSX sử dụng **inline**. Khi chúng ta muốn thiết lập style, chúng ta cần sử dụng cú pháp **camelCase**. React cũng sẽ tự động thêm **px** sau giá trị số trên các phần tử cụ thể. Ví dụ sau đây cho thấy cách thêm style inline vào phần tử h1.
    
   ```js
    render() {
        var myStyle = {
            fontSize: 100,
            color: '#FF0000'
            }
        return (
            <div>
                <h1 style = { myStyle }>Header</h1>
                <h2>Content</h2>
                <p data-myattribute = "somevalue">This is the content!!!</p>
            </div>
        );
    }
   ```
5. **Comment**

    Khi cần comment, chúng ta cần đặt nó trong dấu ngoặc nhọn {}.
    ```js
    {//End of the line Comment...}
    {/*Multi line comment...*/}
    ```
6. **Quy ước đặt tên**
    
    Thẻ HTML luôn sử dụng tên thẻ thường, trong khi các thành phần React bắt đầu bằng chữ hoa.
    
    **Lưu ý** - Bạn nên sử dụng **className** và **htmlFor** làm tên thuộc tính XML thay vì `class` và `for`.
    
    Vì JSX là JavaScript, nên các mã định danh như `class` và `for` không được khuyến khích là các tên thuộc tính XML. Thay vào đó, các thành phần React DOM mong đợi các tên thuộc tính DOM như **className** và **htmlFor**  tương ứng.
    
    ```js
    <div className="container">
        <h1 style = { myStyle }>Header</h1>
        <h2>Content</h2>
        <p data-myattribute = "somevalue">This is the content!!!</p>
        <label htmlFor="ex">Name: </label>
        <input type="text" id="ex" placeholder="Something" />
    </div>
    ```
# III. Component #
Component cho phép bạn tách giao diện người dùng thành các phần độc lập, có thể tái sử dụng và làm việc với từng phần riêng biệt.

**Note** - Tên component bắt đầu bằng chữ hoa

Về mặt khái niệm, components giống như các hàm JavaScript. Cùng xem qua ví dụ phía dưới nhá.

Ví dụ mình có 4 thẻ `<h1>` có nội dung giống nhau, việc đầu tiên các bạn sẽ nghĩ ngay đó là **copy-paste** nó như này:


```js
export default class Example extends Component {
    render() {
        var myStyle = {
             fontSize: 100,
             color: '#FF0000'
         }
        return (
            <div className="container">
                <h1 style={ myStyle }>Content</h1>
                <h1 style={ myStyle }>Content</h1>
                <h1 style={ myStyle }>Content</h1>
                <h1 style={ myStyle }>Content</h1>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Như vậy cũng được thôi, nhưng chẳng may về sau bạn thay đổi nội dung nó thành `"Header"` đi chẳng hạn, vậy lại phải check từng dòng sửa 1 ư? Các bạn thấy thẻ `<h1>` phía trên là đối tượng mình có thể sử dụng đi sử dụng lại nhiều lần thì chúng ta sẽ khai báo cho nó là 1 Component.

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <Content/>
                <Content/>
                <Content/>
                <Content/>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            <div>
                <h1>Content</h1>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Các bạn refesh lại trang và kiểm tra kết quả xem có giống nhau không nhá!

### Component lồng nhau ###
Các bạn xem qua ví dụ phía dưới nhá:
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <h1>Content</h1>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Ví dụ phía trên mình có 3 component đó là **Example**, **Header**, **Content**, Example sẽ làm component cha và chứa 2 component còn lại, đơn giản là bạn chỉ cần gọi tên component con trong component cha.

Cảm ơn các bạn đã đọc tới đây, do viết dài sẽ bị giật nên mình xin phép chia bài viết ra làm 2 phần, phần sau mình sẽ nói về Props và State sự khác nhau giữa chúng.