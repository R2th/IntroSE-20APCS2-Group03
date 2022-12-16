### What is Create React App?
**Create React App** là một tool được xây dựng bởi các nhà phát triển tại Facebook để giúp chúng ta xây dựng các ứng dụng React một cách nhanh chóng. Nó giúp chúng ta tiết kiệm từ thiết lập và cấu hình tốn thời gian. Chúng ta chỉ cần chạy một lệnh và create reaact app sẽ thiết lập các công cụ chúng ta cần để bắt đầu dự án React của mình.

Nhờ create reaact app chúng ta có thể tiết kiệm khá nhiều thời gian cho việc tìm hiểu cũng như cài đặt môi trường để chạy được các ứng dụng react, thay vào đó chúng ta sẽ dành toàn bộ thời gian và effort cho việc học ReactJs.

### Installing Create React App
Để cài đặt **creat-react-app** đầu tiên chúng ta phải cần **node >= 8.10 và npm >= 5.6** trên máy tính của mình(các bạn tự cài cái này nhé :D)

Nếu đã có được 2 điều kiện trên chúng ta có thể cài đặt **creat-react-app** bằng lệnh dưới đây:
``` ruby
npm install -g create-react-app
```
Việc tiếp theo chúng ta cần làm là tạo một react app(với tên là **my_react_app** chẳng hạn) và chạy thử ứng dụng đó trên **localhost:3000** bằng các lệnh sau:
``` ruby
npx create-react-app my_react_app
cd my_react_app
npm start
```
>**Chú ý:**
>- npx ở câu lênh đầu tiên là một công cụ chạy package đi kèm với npm 5.2+ (không phải gõ nhầm đâu nhé :P)
>- Tên app của bạn ko được chứ ký tự in hoa(vd như **myApp** là ko được nhé :))

<br>Sau khi chạy lệnh **npm start**, trình duyệt sẽ auto khởi động trang localhost:3000 cho chúng ta như hình bên dưới là thành công rồi nhé:

![react_app](https://images.viblo.asia/faee74e1-c2ee-4512-a7ae-149bd4c457ee.png)

Như vây là ta đã tạo thành công một react app với create-react-app với cấu trúc cây thư mục có dạng như bên dưới:
![](https://images.viblo.asia/77f22c82-96c0-4f83-ae69-341f56df5f90.png)

Ở những phần tiếp theo ta sẽ thực hành trên app vừa tạo để hiểu rõ hơn các nội dung liên quan trong reactjs(ES6, Render HTML, JSX, Component, Props, State ...vv...)

### React ES6
ES6 là viết tắt của ECMAScript 6. ECMAScript được tạo ra để chuẩn hóa JavaScript và ES6 là phiên bản thứ 6 của ECMAScript, nó được xuất bản vào năm 2015 và còn được gọi là ECMAScript 2015.


React sử dụng ES6 vì vậy ta nên làm quen với một số tính năng mới như:
- **Classes:** tương tự như lập trình hướng đối tượng(OOP) 
<br>Ex: Tạo một object "mycar" dựa trên class Car :

    ``` ruby
    class Car {
      constructor(name) {
        this.brand = name;
      }
    }

    mycar = new Car("Ford");
    mycar.brand # "Ford"
    ```
    **Chú ý:** Các thuộc tính được gán bên trong phương thức constructor(), và phương thức constructor được gọi tự động khi khởi tạo một object. 
 
- **Arrow Functions**: Được giới thiệu trong ES6, cho phép chúng ta viết function với cú pháp ngắn hơn.
    ``` ruby
    # before 
    hello = function() {
      return "Hello World!";
    }
    
    # with arrow funtion
    hello = () => {
      return "Hello World!";
    }
    # arrow functions Return value by default (chỉ những function mà chỉ có 1 câu lệnh)
    hello = () => "Hello World!";
    hello = (val) => "Hello " + val; # nếu có tham số
    hello = val => "Hello " + val; # nếu chỉ có 1 tham số
    ```
- **Variables (let, const, var):**
    <br>Trước ES6 chỉ có 1 cách để xác định các biến đó là dùng từ khóa **var**
    <br>Bây giờ với ES6 ta có 3 cách: **var, let,** and **const.**
    ```ruby
    # var có phạm vi funtion trong khi let có phạm vi block
     var x = 10;
        # Here x is 10
     {
      let x = 2;
          # Here x is 2
     }
        # Here x is 10 
        
     # const tương tụ như let nhưng có giá trị không thể  thay đổi một khi đã được khởi tạo.
     var x = 10;
        # Here x is 10
     {
      const x = 2;
          # Here x is 2 and cannot change
     }
        # Here x is 10
    ```
    
    **Ngoài ra  ES6 còn có rất nhiều tính năng nỗi trội khác các bạn có thể tự tìm hiểu nhé** :D
    
### React Render HTML

Mục tiêu của React là theo nhiều cách để hiển thị HTML trong một trang web. React renders HTML vào trang web bằng cách sử dụng hàm có tên **ReactDOM.render()**.

Hàm ReactDOM.render () có hai đối số đó là **code HTML** và **một phần tử HTML**. Mục đích của function này là hiển thị mã HTML được chỉ định bên trong phần tử HTML được chỉ định.
```ruby
    # in js file
    ReactDOM.render(<p>Hello</p>, document.getElementById('root'));
    
    # in html file
    <body>
      <div id="root"></div>
    </body>
```

### React JSX

JSX là viết tắt của JavaScript XML.

JSX cho phép chúng ta viết các phần tử HTML bằng JavaScript và đặt chúng vào DOM mà không cần bất kỳ phương thức **createdEuity ()** hay **appendChild()** nào.
>Lưu ý: Bạn không bắt buộc phải sử dụng JSX, nhưng JSX giúp viết các ứng dụng React dễ dàng hơn.
>
<br>Ex:
``` ruby
# with JSX
const myelement = <h1>I USE JSX!</h1>;

ReactDOM.render(myelement, document.getElementById('root'));

# without JSX
const myelement = React.createElement('h1', {}, 'I do not use JSX!');

ReactDOM.render(myelement, document.getElementById('root'));
```

Như bạn có thể thấy trong ví dụ đầu tiên, JSX cho phép chúng ta viết HTML trực tiếp trong mã JavaScript.(thật tiện lợi :))

### Kết
Ở bài này mình chỉ hướng dẫn các bạn cách tạo một react app với create-react-app và giới thiệu một số đặt tính của react.
Phần tiếp theo mình sẽ giới thiệu thêm các đặt tính khác nữa trong react như: component, props, state, lifecycle .... 

Bài viết còn sơ sài nếu có gì thiếu sót hoặc sai sót mong mọi người góp ý (bow).


**To be continue ...**