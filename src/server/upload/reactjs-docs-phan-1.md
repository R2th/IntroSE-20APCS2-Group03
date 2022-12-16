## I. INSTALLATION
### 1. Thêm React tới một Website
 - Thêm React trong 1 phút
     - Bước 1: Thêm 1 DOM Container tới HTML
         - Đầu tiên, mở một trang HTML mà bạn muốn edit, thêm một tag div rỗng, đánh dấu vị trí mà bạn muốn hiển thị gì đấy với React. Ví dụ:
             ```
             <div id="like-button-container"></div>
             ```
     - Bước 2: Thêm Script Tags
         - thêm 3 thẻ script vào trang HTML:
             ```
             <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
             <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
             <script src="like_button.js"></script>
             ```
         - 2 thẻ đầu tiên sẽ load React, còn thẻ thứ 3 sẽ load ra component code của bạn
     - Bước 3: Tạo 1 React Component
         - Tạo 1 file với tên gọi là `like_button.js`
         - Mở file trên và bắt đầu viết các dòng lệnh tạo component đầu tiên
             ```
             const domContainer = document.querySelector('#like-button-container');
             ReactDOM.render(e(LikeButton), domContainer);
             ```
         - Dòng đầu tiên sẽ tìm tới thẻ có id là `like-button-container`, sau đó dòng thứ 2 có nhiệm vụ hiện ra `Like` button component từ bên trong nó 
     - Rất đơn giản phải không?
### 2. Tiếp theo chúng ta sử dụng React với JSX (điều này không bắt buộc nhưng khuyên dùng)
- Trong ví dụ ở trên, chúng ta chỉ dựa vào các tính năng được hỗ trợ từ các browsers. Đây là lý do tại sao chúng ta sử dụng lệnh gọi hàm Javascript để báo cho React những gì sẽ hiển thị:
    ```
    const e = React.createElement;
    // Display a "Like" button
    return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
    );
    ```
- Tuy nhiên, React hỗ trợ việc viết JSX để thay thế:
    ```
    // Display a "Like" button
    return(
    <button onClick={() => this.setState({ liked: true })}>
    Like
    </button>
    );
    // Cực kì đơn giản và tiện lợi :D
    ```

- Để sử dụng nhanh JSX chúng ta cần thêm vào 1 thẻ script là:
    ```
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    ```
- Còn muốn thêm JSX vào Project thì dùng các lệnh sau:
    - `npm init -y` (nếu có lỗi khi chạy thì vào đây để xem sửa lỗi https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d)
    - `npm install babel-cli@6 babel-preset-react-app@3`
    - 2 bước đơn giản và bạn có thể sử dụng JSX trong project của chính mình
### 3. Tạo mới một App React
- Tạo một React App là cách tốt để học về React và là tốt nhất để xây dựng một single-page application trong React.
- Để có thể tạo được app React bạn phải có 2 thứ là Node (version >= 6) và npm (version >= 5.2) trên máy.
- Dùng các lệnh sau để tạo một project React
    ```
    // Dòng dưới để tạo project tên my-app
    npx create-react-app my-app
    // Vào thư mục my-app
    cd my-app
    // Chạy server
    npm start
    ```
### 4. Next.js
- Là một bộ framework nhẹ và phổ biến cho applications tĩnh và server-rendered. Nó bao gồm styling và routing solutions và nếu bạn dùng node.js làm server environment thì nên dùng framework này (Có thời gian mình sẽ làm docs về next.js này)
### 5. Gatsby
- Có thể nói Gatsby là cách tốt nhất để tạo ra một websites tĩnh với React, cho xem bạn sử dụng thành phần React nhưng lại xuất ra thành HTML và CSS được kết xuất sẵn để đảm bảo thời gian load nhanh nhất.
- Bạn có thể đọc thêm ở đây https://www.gatsbyjs.org/
### 6. CDN Links (Content Delivery Network Links)
- Cả React và ReactDOM đều khả dụng trên CDN
    ```
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    ```
- 2 phiên bản trên chỉ phù hợp với môi trường development, còn khi build lên product thì dùng 2 bản này:
    ```
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    ```
## II. MAIN CONCEPTS
### 1. Giới thiệu về JSX
- Đầu tiên là tại sao lại là JSX?
    - React chấp nhận thực tế rằng rendering logic vốn đã được ghép nối với logic UI khác: Cách events handled, Cách state thay đổi theo thời gian và cách các dữ liệu được chuẩn bị để hiển thị.
    - React không yêu cầu sử dụng JSX, nhưng hầu hết mọi người đều cảm thấy nó hữu ích nhất là khi làm việc với UI bên trong code Javascript. Nó cũng thông báo cũng như lỗi một cách rõ ràng và hiệu quả hơn.
- Nhúng biểu thức trong JSX
    - Với ví dụ dưới đây, ta khai báo một biến được gọi tên và sử dụng nó trong JSX bằng cách gọi nó trong dấu ngoặc nhọn:
        ```
        const name = 'Trung';
        const element = <h1>Hello, {name}</h1>

        ReatDOM.render(
            element,
            document.getElementById('root');
        );
        ```
    - Bạn cũng có thể đặt bất kỳ biểu thức Javascript hợp lệ nào vào bên trong dấu ngoặc nhọn của JSX. Ví dụ: `2 + 2`, `user.firstName`, formatName(user), ..., tất cả chúng đều hợp lệ.
    - Dưới đây là ví dụ về việc nhúng kết quả gọi hàm Javascript formatName(user) vào 1 element `h1`
        ```
        formatName = (user) => {
            return user.firstName + ' ' + user.lastName;
        }

        const user = {
            firstName: 'Trung',
            lastName: 'Ngo',
        }

        const element = (
            <h1>
                Hello, {formatName(user)}!
            </h1>
        );

        ReactDOM.render(
            element,
            document.getElementById('root')
        );
        ```
    - Nên chia JSX thành nhiều dòng để dễ đọc. Mặc dù không cần thiết nhưng khi thực hiện điều này nên gói nó vào trong ngoặc đơn để tránh những trường hợp tự chèn dấu chấm phẩy tự động.
- JSX cũng là một biểu thức
    - Sau khi biên dịch, các biểu thức trong JSX trở thành các lệnh gọi hàm JavaScript thông thường và phỏng đoán các đối tượng của Javascript. Có nghĩa là bạn có thể sử dụng JSX trong các câu lệnh if, trong các vòng lặp, gán nó cho các biến, chấp nhận nó như đối số và trả về từ các hàm.
        ```
        getGreeting = (user) => {
            if (user) {
                return <h1>Hello, {formatName(user)}!</h1>
            }
            return <h1>Hello, Stranger.</h1>
        }
        ```
- Chỉ định các thuộc tính với JSX
    - Bạn có thể sử dụng dấu ngoặc kép để chỉ định chuỗi ký tự là thuộc tính
        ```
        const element = <div tabIndex="0"></div>
        ```
    - Bạn cũng có thể dùng ngoặc nhọn để nhúng biểu thức Javácript trong một thuộc tính
        ```
        const element = <img src={user.avatarUrl}></img>;
        ```
    - Warning: 
        - Không đặt dấu ngoặc kép quanh dấu ngoặc nhọn, chỉ được sử dụng 1 trong 2, nếu không nó sẽ hiểu đó là một kiểu chuỗi
        - Vì JSX gần JavaScript hơn HTML nên ReactDOM sử dụng `camelCase` để đặt tên convention của tên các thuộc tính HTML, ví dụ: `class` thành `className`, `tabindex` thành `tabIndex`, ...
    - Specifying Children với  JSX
        - Nếu 1 tag là rỗng, ta có thể thay đóng tag là `/>`, giống như XML
            ```
            const element = <img src={user.avatarUrl} />;
            ```
        - Các tag JSX có thể chứ children
            ```
            const element = (
                <div>
                    <h1>Hello!</h1>
                    <h2>Good to see you here.</h2>
                </div>
            );
            ```
    - JSX ngăn chặn các cuộc tấn công Injection
        - Mặc định, ReactDOM thoát khỏi mọi giá trị được nhúng trong JSX trước khi render chúng ra. Do đó, nó đảm bảo rằng bạn không bao giờ có thể inject bất cứ thứ gì mà không được viết rõ ràng trong application của bạn.
        - Tất cả mọi thứ đều được chuyển đổi thành kiểu chuỗi trước khi được render. Điều này giúp ngăn chặn các cuộc tấn công [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) (cross-site-scripting)
    - JSX đại diện cho các Object
        - Babel biên dịch JSX xuống các lệnh gọi `React.createElement()`
        - 2 ví dụ dưới đây là giống nhau
            ```
            const element = (
                <h1 className="greeting">
                    Hello, world!
                </h1>
            );
            ```
            ```
            const element = React.createElement(
                'h1',
                {className: 'greeting'},
                'Hello, world!',
            );
            ```
        - `React.createElement()` thực hiện một vài kiểm tra để giúp bạn viết mã không lỗi nhưng về cơ bản, nó tạo ra một đối tượng
            ```
                // Note: Cấu trúc này đã được đơn giản hóa
                const element = {
                    type: 'h1',
                    props: {
                        className: 'greeting',
                        children: 'Hello, world',
                    }
                };
            ```
        - Các object này được gọi là `React element`. Có thể nghĩ chúng như những mô tả về những gì bạn muốn thấy trên màn hình. React đọc các đối tượng này và sử dụng chúng để xây dựng DOM và cập nhật nó.
        - Góp ý: Nên sử dụng định nghĩa ngôn ngữ Babel cho editor của bạn để mã ES6 và JSX đều được highlight chính xác.
### 2. Rendering Elements
- `Element` là các block được building nhỏ nhất trong ứng dụng React. Không giống các phần tử DOM của trình duyệt, các phần tử React là các đối tượng đơn giản và dễ tạo. ReactDOM đảm nhiệm việc cập nhật DOM để khớp với các phần tử React.
- Render một Element tới DOM
    - Ta có một div với id là root
       ```
       <div id="root"></div>
       ```
    - Đây được gọi là DOM gốc vì mọi thứ bên trong sẽ được ReactDOM quản lý.
    - Các ứng dụng được xây dựng chỉ với React thường có một nút DOM gốc. Nếu bạn đang tích hợp React vào một ứng dụng hiện có, bạn có thể có bao nhiêu node DOM gốc tùy thích.
    - Để render phần tử React thành node DOM gốc, ta chuyển cả 2 cho ReactDOM.render()
        ```
        const element = <h1>Hello, world</h1>;
        ReactDOM.render(element, document.getElementById('root'));
        ```
- Cập nhật phần tử render
    - Các element React là immutable.
    - Khi bạn tạo 1 element, bạn có thể thay đổi children hoặc thuộc tính của nó. Nó giống như là khung hình trong một bộ phim vậy.
    - Nó đại diện UI tại một thời điểm nhất định.
    - Cách duy nhất để cập nhật UI là tạo một phần tử mới và pass nó vào ReactDOM.render().
        ```
        tick = () => {
            const element = (
                <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
            );
            ReactDOM.render(element, document.getElementById('root'));
        }
        
        setInterval(tick, 1000);
        ```
- Chỉ cập nhật những gì cần thiết
    - React DOM so sánh phần tử và các phần tử con của nó với phần tử trước đó và chỉ áp dụng các bản cập nhật DOM cần thiết để đưa DOM về trạng thái mong muốn.
 
![](https://images.viblo.asia/a414a302-9e37-4357-adf5-aff2b2f81ce8.gif)
### 3. Components và Props
Component cho phép bạn chia UI thành các phần độc lập, có thể tái sử dụng và suy nghĩ về từng phần riêng lẽ. Về mặt khái niệm, thì các component giống các hàm JavaScript, chúng chấp nhận các đầu vào tùy ý (được gọi là `props`) và trả về các element React mô tả những gì sẽ xuất hiện trên màn hình.
- Function và Class Components
    - Cách đơn giản nhất để xác định thành phần là viết hàm JavaScript:
        ```
        Welcome = (props) => {
            return <h1>Hello, {props.name}</h1>
        }
        ```
   - Hàm này là một component hợp lệ vì nó chấp nhận một đối số props object đơn chỉ định có dữ liệu và trả về element React. Ta gọi các component này là component chức năng tại vì chúng là các hàm JavaScript.
   - Bạn có thể sử dụng class ES6 để định nghĩa component
       ```
       class Welcome extends React.Component {
           render() {
               return <h1>Hello, {this.props.name}</h1>;
           }
       }
       ```
- Render 1 Component
    - Trước đây, chúng ta chỉ gặp các phần tử React đại diện cho các thẻ DOM
        ```
        const element = <div />;
        ```
    - Tuy nhiên, các phần tử cũng có thể đại diện cho các thành phần do người dùng xác định:
        ```
        const element = <Welcome name="Trung" />;
        ```
    - Khi React thấy một phần tử đại diện cho một thành phần do người dùng định nghĩa, nó sẽ chuyển các thuộc tính JSX cho thành phần này dưới dạng một đối tượng. Chúng ta gọi đối tượng này là `props`.
        ```
        Welcome = (props) => {
             return <h1>Hello, {props.name}</h1>;
        }

        const element = <Welcome name="Trung" />;
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
        ```
    - Composing Components
        - Components có thể refer tới các componet khác trong đầu ra của nó. Điều này cho phép ta sử dụng component abstraction cho bất kỳ mức độ chi tiết nào.
        - 1 button, 1 form, 1 dialog, 1 screen, ... trong React app, tất cả những thứ đó thường được thể hiện dưới dạng các component.
        - Ví dụ, ta có thể Welcom nhiều lần
            ```
            Welcome = () => {
                return <h1>Hello, {props.name}</h1>;
            }
            
            App () {
                return (
                    <div>
                        <Welcome name="Trung" />
                        <Welcome name="Hương" />
                        <Welcome name="Ngân" />
                    </div>
                );
            }
            
            ReactDOM.render(
                <App />,
                document.getElementById('root')
            );
            ```
    - Extracting Components
        - Không sợ chia các component thành các component nhỏ hơn, ví dụ
            ```
            Comment = (props) => {
            return (
                <div className="Comment">
                    <div className="UserInfo">
                        <img className="Avatar"
                            src={props.author.avatarUrl}
                            alt={props.author.name}
                        />
                        <div className="UserInfo-name">
                            {props.author.name}
                        </div>
                    </div>
                    <div className="Comment-text">
                        {props.text}
                    </div>
                    <div className="Comment-date">
                        {formatDate(props.date)}
                    </div>
                </div>
            );
            }
            ```
        - Nó chấp nhận author (an object), text (a string) và date (a date) như một props và mô tả 1 comment như 1 social media website.
        - Các component này rất khó thay đổi vì tất cả lồng vào nhau và cũng khó để sử dụng lại các phần riêng lẻ của nó. Extract nó ra.
            ```
                Avatar = (props) {
                    return (
                        <img className="Avatar"
                            src={props.user.avatarUrl}
                            alt={props.user.name}
                    );
                }
            ```
        - Avatar không cần phải biết rằng nó đang được hiển thị trong một Comment, đây là lý do tại sao nên đặt prop của nó một tên chung hơn là user hơn là author.
        - Nên đặt tên props theo quan điểm riêng của component thay vì là bối cảnh
- Props chỉ Read-Only
    - Cho dù bạn khai báo một thành phần là một hàm hoặc một lớp, nó không bao giờ sửa đổi các props của chính nó. Như hàm `sum` dưới đây
        ```
            sum = (a, b) => {
                return a + b;
            }
        ```
    - Các chức năng như vậy được gọi là `pure`, vì chúng không cố gắng thay đổi đầu vào của chính nó và luôn trả về cùng một kết quả cho cùng một đầu vào
    - Ngược lại thì chức năng impure sẽ thay đổi đầu vào của chính nó
        ```
        withdraw = (account, amount) {
            account.total -= amount;
        }
        ```
    - React khá linh hoạt nhưng nó có một quy tắc nghiêm ngặt duy nhất:
        - All React components must act like pure functions with respect to their props. (Tất cả component phải hoạt động như các function pure với các props của chính nó)
    - Tất nhiên, UI ứng dụng rất năng động và thay đổi theo thời gian. Trong phần tiếp theo, ta sẽ biết một khái niệm mới là `state`. Trạng thái cho phép các thành phần React thay đổi đầu ra của chúng theo thời gian để đáp ứng với hành động của người dùng, phản hồi của network và bất cứ điều gì khác mà không vi phạm quy tắc này.
### 4. State và Lifecycle
Xem xét ví dụ `tick` từ các phần trước. Trong Rendering Elements, chúng ta chỉ học một cách để cập nhật giao diện người dùng. Ta gọi ReactDOM.render() để thay đổi đầu ra được render
 ```
tick = () => {
    const element = (
        <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
Trong phần này, chúng ta sẽ tìm hiểu cách làm cho thành phần `Clock` thực sự có thể tái sử dụng và đóng gói. Nó sẽ thiết lập bộ đếm thời gian riêng và tự cập nhật mỗi giây.
```
Clock = (props) => {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

tick = () => {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);
```
- Chuyển đổi một Function thành một Class
    - Function
        ```
        Clock = (props) => {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {props.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
        ```
    - Class
        ```
        class Clock extends React.Component {
            render() {
                return (
                    <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                    </div>
                );
        }
        ```
- Thêm Local State vào Class
    - Đổi `this.props.date` thành `this.state.date`
        ```
        class Clock extends React.Component {
          render() {
            return (
              <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>
            );
          }
        }
        ```
    - Để có thể dùng được `state.date` thì ta phải có giá trị khai báo
        ```
        class Clock extends React.Component {
          // khai báo giá trị
          constructor(props) {
            super(props);
            this.state = {date: new Date()};
          }

          render() {
            return (
              <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>
            );
          }
        }
        ```
- Thêm Lifecycle method vào Class
    - Trong các app có nhiều component, lifecycle methods rất quan trọng để giải phóng các tài nguyên được lấy bởi component khi chúng bị phá hủy
    - Chúng ta muốn thiết lập bộ hẹn giờ bất cứ khi nào Clock được render tới DOM lần đầu tiên (được gọi là `mounting` trong React).
    - Cũng như muốn clear bộ đệm thời gian bất cứ khi nào DOM do Clock tạo ra bị xóa (được gọi là `unmounting` trong React).
    - Chúng ta có thể khai báo các phương thức đặc biệt trên component class để chạy một số mã khi 1 component mount và unmount.
        ```
        class Clock extends React.Component {
          constructor(props) {
            super(props);
            this.state = {date: new Date()};
          }

          componentDidMount() {

          }

          componentWillUnmount() {

          }

          render() {
            return (
              <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>
            );
          }
        }
        ```
    - Đây được gọi là `Lifecycle methods`.
    - `componentDidMount()` chạy sau khi đầu ra component được render tới DOM. Đây là một nơi tốt để thiết lập timer
        ```
         componentDidMount() {
            this.timerID = setInterval(
              () => this.tick(),
              1000
            );
          }
        ```
    - Mặc dù this.props được thiết lập bởi chính React và this.state có ý nghĩa đặc biệt, bạn có thể tự do thêm các trường bổ sung vào class nếu bạn cần lưu trữ thứ gì đó mà không tham gia vào luồng dữ liệu (data flow) như `timerID`.
    - Chúng ta sẽ tear down bộ nhớ đệm trong `componentWillUnmount()`
        ```
        componentWillUnmount() {
            clearInterval(this.timerID);
          }
        ```
    - Cuối cùng, chúng ta thực hiện một thức goi là `tick()` mà component Clock sẽ chạy mỗi giây. Sử dụng `this.setState()` để cập nhật state.
        ```
        class Clock extends React.Component {
          constructor(props) {
            super(props);
            this.state = {date: new Date()};
          }

          componentDidMount() {
            this.timerID = setInterval(
              () => this.tick(),
              1000
            );
          }

          componentWillUnmount() {
            clearInterval(this.timerID);
          }

          tick() {
            this.setState({
              date: new Date()
            });
          }

          render() {
            return (
              <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>
            );
          }
        }

        ReactDOM.render(
          <Clock />,
          document.getElementById('root')
        );
        ```
- Sử dụng state một cách hợp lý
    - Có 3 điều cần lưu ý khi sử dụng state
        - Không sửa đổi state trực tiếp
        - Muốn sửa thì dùng hàm `setState()`
        - Nơi duy nhất có thể gán cho state là hàm tạo (constructor)
            ```
            // Sai
            this.state.comment = 'Hello';
            ```
            ```
            // Đúng
            this.setState({comment: 'Hello'});
            ```
            ```
            // Hàm tạo
            constructor() {
              super();
              this.state = {comment: 'Hello'};
           }
            ```
- State updates may be Asynchronous
    - React có thể batch multiple `setState()` thành một bản cập nhật để tăng performance.
        ```
        // Không nên
        this.setState({comment: 'Hello'});
        this.setState({comment2: 'Hello'});
        this.setState({comment3: 'Hello'});
        ```
        ```
        // Nên
        this.setState({
            comment: 'Hello',
            comment2: 'Hello',
            comment3: 'Hello',
        });
        ```
    - Vì `this.props` và `this.state` có thể được cập nhật không đồng bộ, bạn không nên đựa vào các giá trị của chúng để tính toán state tiếp theo.
        ```
        // Sai
        this.setState({
          counter: this.state.counter + this.props.increment,
        });
        ```
    - Muốn sửa như trên, thì sử dụng dạng thứ 2 của `setState()` là chấp nhận nó như một hàm chứ không phải là một object. Hàm nó sẽ nhận state và props từ ngoài vào
        ```
        this.setState((state, props) => ({
          counter: state.counter + props.increment
        }));
        ```
- State updates là Merged
    - Khi bạn gọi setState, React merges object mà bạn cung cấp vào state hiện tại (khó hiểu đúng không :v). Ví dụ: ta có 2 attribute posts và comments
        ```
        constructor(props) {
            super(props);
            this.state = {
              posts: [],
              comments: []
            };
          }
        ```
    - Sau đó bạn cần update 1 trong 2 attribute này
        ```
          componentDidMount() {
            fetchPosts().then(response => {
              this.setState({
                posts: response.posts
              });
            });

            fetchComments().then(response => {
              this.setState({
                comments: response.comments
              });
            });
          }
        ```
    - Thì đơn giản ở đây là bạn update thuộc tính posts thì comments được giữ nguyên và ngược lại
- The Data flows down (dữ liệu chảy xuống)
    - Cả component parent và child đều không thể biết liệu một component nào đó là trạng statefull hay stateless và chúng cũng không quan tâm đó là một hàm hay một class
    - Do đó, đây là lý do tại sao state được gọi là local hay encapsulated (đóng gói). Nó không thể truy cập được đối với bất kỳ thành phần nào ngoài thành phần sở hữu và thiết lập nó.
    - Một component có thể chọn chuyển state của nó xuống làm props cho các component con của nó
        ```
        <FormattedDate date={this.state.date} />
        ```
        ```
        function FormattedDate(props) {
          return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
        }
        ```
### 5. Handling Events
- Xử lý các event với React elements rất giống với việc xử lý các sự kiện trên DOM elements. 
- Có một số khác biệt:
    - Các event React được đặt tên dựa theo camelCase, thay vì lowercase
    - Với JSX, bạn truyền một hàm làm trình xử lý sự kiện, thay vì chuỗi.
        - HTML:
            ```
            <button onclick="activateLasers()">
              Activate Lasers
            </button>
            ```
        - React:
            ```
            <button onClick={activateLasers}>
              Activate Lasers
            </button>
            ```
    - Một sự khác biệt nữa là bạn không thể return false để prevent default (ngăn chặn hành vi mặt định) trong React mà bạn phải gọi một các rõ ràng (dùng preventDefault). Ví dụ:
        - HTML:
            ```
            <a href="#" onclick="console.log('The link was clicked.'); return false">
              Click me
            </a>
            ```
        - React:
            ```
            function ActionLink() {
              function handleClick(e) {
                e.preventDefault();
                console.log('The link was clicked.');
              }

              return (
                <a href="#" onClick={handleClick}>
                  Click me
                </a>
              );
            }
            ```
        - Ở đây `e` là một synthetic event (sự kiện tổng hơp), React định nghĩa `e` theo thông số [W3C](https://www.w3.org/TR/DOM-Level-3-Events/) nên bạn không cần lo lắng về khả năng tương thích giữa các trình duyệt
- Truyền đối số vào Event Handlers gồm 2 cách
    - Truyền qua arrow function
        ```
        (e) => this.functionName(e);
        ```
    - Truyền qua `bind`
        ```
        this.functionName.bind(e);
        ```
### 6. Conditional Rendering
Đơn giản là có thể thêm điều kiện `if`, `else` để render
```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```
- Element Variables
    - Bạn có thể sử dụng variables để lưu trữ elements, giúp bạn thay đổi một phần gì đấy mà không phải thay đổi hay tạo lại một render mới
        ```
        function LoginButton(props) {
          return (
            <button onClick={props.onClick}>
              Login
            </button>
          );
        }

        function LogoutButton(props) {
          return (
            <button onClick={props.onClick}>
              Logout
            </button>
          );
        }
        ```
    - chuyển thành
        ```
        function CommonButton(props) {
          return (
            <button onClick={props.onClick}>
            {props.titleButton}
            </button>
          );
        }
        ```
    - Trong class
    ```
    class LoginControl extends React.Component {
      constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false, titleButton: ''};
      }

      handleLoginClick() {
        this.setState({
          isLoggedIn: true,
          titleButton: 'Log Out',
        });
      }

      handleLogoutClick() {
        this.setState({
          isLoggedIn: false,
          titleButton: 'Log In',
        });
      }

      render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = <CommonButton 
          onClick={isLoggedIn ? this.handleLogoutClick : this.handleLoginClick}
          titleButton={isLoggedIn ? 'Log Out' : 'Log In'}
        />;

        return (
          <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
          </div>
        );
      }
    }

    ReactDOM.render(
      <LoginControl />,
      document.getElementById('root')
    );
    ```
- Bạn có thể nhúng toán tử vào
    ```
    function Mailbox(props) {
      const unreadMessages = props.unreadMessages;
      return (
        <div>
          <h1>Hello!</h1>
          // Ở đây điều kiện nghĩa là unreadMessages có length > 0 thì show ra nội dung sau &&
          {unreadMessages.length > 0 &&
            <h2>
              You have {unreadMessages.length} unread messages.
            </h2>
          }
        </div>
      );
    }

    const messages = ['React', 'Re: React', 'Re:Re: React'];
    ReactDOM.render(
      <Mailbox unreadMessages={messages} />,
      document.getElementById('root')
    );
    ```
- Ngăn chặn việc render
    ```
    function WarningBanner(props) {
    // Điều kiện ở đây nếu đúng sẽ return null, đối với return thì sẽ trả về giá trị ngay lập tức và không thực hiện các lệnh ở dưới trong hàm
      if (!props.warn) {
        return null;
      }

      return (
        <div className="warning">
          Warning!
        </div>
      );
    }

    class Page extends React.Component {
      constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
      }

      handleToggleClick() {
        this.setState(state => ({
          showWarning: !state.showWarning
        }));
      }

      render() {
        return (
          <div>
            <WarningBanner warn={this.state.showWarning} />
            <button onClick={this.handleToggleClick}>
              {this.state.showWarning ? 'Hide' : 'Show'}
            </button>
          </div>
        );
      }
    }

    ReactDOM.render(
      <Page />,
      document.getElementById('root')
    );
    ```
### 7. Lists và Keys
- Rendering Multiple Component (render nhiều component)
    - Ta tạo một mảng numbers, sau đó dùng map của JS để render lại ra phần tử `li`, rồi gán cho listItems
    ```
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    ```
    - Sau đó ta chỉ việc gọi `listItems` ra là được
        ```
        ReactDOM.render(
          <ul>{listItems}</ul>,
          document.getElementById('root')
        );
        ```
- Basic List Component
    - Ta có đoạn code dưới đây
        ```
        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            <li>{number}</li>
          );
          return (
            <ul>{listItems}</ul>
          );
        }

        const numbers = [1, 2, 3, 4, 5];
        ReactDOM.render(
          <NumberList numbers={numbers} />,
          document.getElementById('root')
        );
        ```
    - Khi chạy đoạn code này, bạn sẽ được cảnh báo là `A “key” is a special string attribute you need to include when creating lists of elements` (hiểu đơn giản là bạn cần một thuộc tính `key`). Để sửa thì chỉ cần thêm key là được =))
        ```
        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
          // Key đã được thêm vào
            <li key={number.toString()}>
              {number}
            </li>
          );
          return (
            <ul>{listItems}</ul>
          );
        }

        const numbers = [1, 2, 3, 4, 5];
        ReactDOM.render(
          <NumberList numbers={numbers} />,
          document.getElementById('root')
        );
        ```
- Keys
    - Các key hỗ trợ React xác định những item nào đã thay đổi, được thêm vào, hay là xóa. Các khóa nên được trao cho các element bên trong mảng để cung cấp một sự ổn định.
    - Key nên là duy nhất, không trùng các key khác
    - Cách tốt nhất để một key là duy nhất là sử dụng IDs từ data
        ```
        const todoItems = todos.map((todo) =>
          <li key={todo.id}>
            {todo.text}
          </li>
        );
        ```
    - Nếu bạn không có IDs, thì phương án cuối cùng là dùng `index`
        ```
        const todoItems = todos.map((todo, index) =>
          // Only do this if items have no stable IDs
          <li key={index}>
            {todo.text}
          </li>
        );
        ```
    - Chú ý: 
        - Key vì sao nên là duy nhất, mình có ví dụ là nếu có một mảng có 2 component được gọi 2 lần thì khi việc select tới component 1 trong 2 thì action hành động sẽ là chọn cả 2
        - Khuyến khích không sử dụng index của `map` mà hãy kèm theo tên gì đấy đằng trước rồi tới index, ví dụ: `category-1`, như vậy sẽ tránh bị trùng component có cùng index
    - Extracting Components with Keys
        - Sử dụng key không chính xác
            ```
            function ListItem(props) {
              const value = props.value;
              return (
                // Ở đây không cần chỉ định key
                <li key={value.toString()}>
                  {value}
                </li>
              );
            }

            function NumberList(props) {
              const numbers = props.numbers;
              const listItems = numbers.map((number) =>
                // Key nên được chỉ định tại ngay đây
                <ListItem value={number} />
              );
              return (
                <ul>
                  {listItems}
                </ul>
              );
            }

            const numbers = [1, 2, 3, 4, 5];
            ReactDOM.render(
              <NumberList numbers={numbers} />,
              document.getElementById('root')
            );
            ```
        - Sử dụng key chính xác
            ```
            function ListItem(props) {
              // Ở đây không cần chỉ định key
              return <li>{props.value}</li>;
            }

            function NumberList(props) {
              const numbers = props.numbers;
              const listItems = numbers.map((number) =>
                // Chỉ định key ở đây
                <ListItem key={number.toString()}
                          value={number} />

              );
              return (
                <ul>
                  {listItems}
                </ul>
              );
            }

            const numbers = [1, 2, 3, 4, 5];
            ReactDOM.render(
              <NumberList numbers={numbers} />,
              document.getElementById('root')
            );
            ```
    - Nhúng `map()` vào JSX
        - JSX cho phép nhứng bất kỳ biểu thức nào trong đấu ngoặc nhọn để có thể inline kết quả `map()`
            ```
            function NumberList(props) {
              const numbers = props.numbers;
              return (
                <ul>
                  {numbers.map((number) =>
                    <ListItem key={number.toString()}
                              value={number} />

                  )}
                </ul>
              );
            }
            ```
### 8. Forms
- Controlled Components
    - Trong HTML, những element form như `input`, `textarea`, `select`, ... thường duy trì state của chúng và cập nhật nó dựa vào user input. Trong React, `mutable state` thường được giữ trong `state property` của components và chỉ thay đổi với `setState()`.
    - Chúng ta có thể kết hợp cả 2 bằng cách biến state thành `single source of truth`. Sau đó, compoent React sẽ render 1 form, kiểm soát những gì xảy ra trong form đó từ người dùng nhập vào lần tiếp theo.
        ```
        class NameForm extends React.Component {
          constructor(props) {
            super(props);
            this.state = {value: ''};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          handleChange(event) {
            this.setState({value: event.target.value});
          }

          handleSubmit(event) {
            alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
          }

          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            );
          }
        }
        ```
- The textarea Tag
    - Trong React, `textarea` sử dụng thuộc tính `value` thay thế. Theo cách này, 1 form sử dụng 1 `textarea` có thể viết rất giống với với một form sử dụng `single-line input`
        ```
        class EssayForm extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              value: 'Please write an essay about your favorite DOM element.'
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          handleChange(event) {
            this.setState({value: event.target.value});
          }

          handleSubmit(event) {
            alert('An essay was submitted: ' + this.state.value);
            event.preventDefault();
          }

          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                <label>
                  Essay:
                  <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            );
          }
        }
        ```
- The select Tag
    - Trong HTML, `select` tạo `drop-down list`
        ```
        <select>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
        ```
    - Trong React, để thay đổi giá trị phải dùng thuộc tính value trong `select`
        ```
        class FlavorForm extends React.Component {
          constructor(props) {
            super(props);
            this.state = {value: 'coconut'};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }

          handleChange(event) {
            this.setState({value: event.target.value});
          }

          handleSubmit(event) {
            alert('Your favorite flavor is: ' + this.state.value);
            event.preventDefault();
          }

          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                <label>
                  Pick your favorite flavor:
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                  </select>
                </label>
                <input type="submit" value="Submit" />
              </form>
            );
          }
        }
        ```
- The file input Tag
    - Trong HTML , input có type là `file` cho phép người dùng chọn một hoặc nhiều tệp từ device để có thể tải lên server hoặc được JS xử lý thông qua `File API`
        ```
        <input type="file" />
        ```
    - Vì giá trị của nó là `read-only` nên được coi là thành phần `uncontrolled` trong React. Sẽ được nói cùng với những component `uncontrolled` khác trong phần khác, bạn có thể đọc trước [ở đây](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag).
- Xử lý Input Multiple
    - Khi bạn cần xử lý nhiều `controlled input element`, bạn có thể thêm thuộc tính name vào mỗi element và để chức năng xử lý chọn việc cần làm dựa trên giá trị của `event.target.name`
        ```
        class Reservation extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              isGoing: true,
              numberOfGuests: 2
            };

            this.handleInputChange = this.handleInputChange.bind(this);
          }

          handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
              [name]: value
            });
          }

          render() {
            return (
              <form>
                <label>
                  Is going:
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                  Number of guests:
                  <input
                    name="numberOfGuests"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange} />
                </label>
              </form>
            );
          }
        }
        ```
    - Lưu ý cách ta sử dụng ES6 tính toán thuộc tính name [(computed property name)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) để cập nhật state key tương ứng với input name đã cho.
        ```
        this.setState({
          [name]: value
        });
        ```
    - Tương đương với code ES5
        ```
        var partialState = {};
        partialState[name] = value;
        this.setState(partialState);
        ```
### 9. Lifeting state up
Thông thường, một số thành phần cần phản ánh cùng một dữ liệu thay đổi. Nên để state ở component cha lớn nhất. Trong ví dụ lần này, ta sẽ tạo máy tính nhiệt độ, để tính xem nhiệt độ xôi của nước có thích hợp hay không. Bắt đầu với component `BoilingVerdict`. Nó chấp nhận `celsius` (độ C) như một prop, và in xem nó có đủ để đun sôi nước không:
```
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```
Tiếp theo ta tạo ra một component là `Calculator`. Nó render một `input` cho phép bạn nhập nhiệt dộ và giữ giá trị của nó trong `this.state.temperature`
```
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```
- Thêm input thứ 2
    - Tạo thêm một input là `Fahrenheit` (độ F) và chúng được giữ đồng bộ
        ```
        const scaleNames = {
          c: 'Celsius',
          f: 'Fahrenheit'
        };

        class TemperatureInput extends React.Component {
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {temperature: ''};
          }

          handleChange(e) {
            this.setState({temperature: e.target.value});
          }

          render() {
            const temperature = this.state.temperature;
            const scale = this.props.scale;
            return (
              <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
              </fieldset>
            );
          }
        }
        ```
        ```
        class Calculator extends React.Component {
          render() {
            return (
              <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
              </div>
            );
          }
        }
        ```
- Conversion Functions
    - Đầu tiên, chúng ta viết 2 function để convert từ độ C sang độ F và ngược lại:
        ```
        function toCelsius(fahrenheit) {
          return (fahrenheit - 32) * 5 / 9;
        }

        function toFahrenheit(celsius) {
          return (celsius * 9 / 5) + 32;
        }
        ```
        ```
        function tryConvert(temperature, convert) {
          const input = parseFloat(temperature);
          if (Number.isNaN(input)) {
            return '';
          }
          const output = convert(input);
          const rounded = Math.round(output * 1000) / 1000;
          return rounded.toString();
        }
        ```
- Lifting state up
    - Hiện tại cả 2 component `TemperatureInput` đều đang giữ giá trị ở local
        ```
        class TemperatureInput extends React.Component {
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {temperature: ''};
          }

          handleChange(e) {
            this.setState({temperature: e.target.value});
          }

          render() {
            const temperature = this.state.temperature;
            // ...  
        ```
    - Tuy nhiên, chúng ta lại muốn sự đồng bộ giữa độ C và độ F, tức là ta nhập vào độ C thì độ F sẽ phản ánh lại nhiệt độ được chuyển đổi và ngược lại.
    - Vì vậy ta sẽ chuyển state ra bên ngoài lớp cha.
        ```
        class TemperatureInput extends React.Component {
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            // state được chuyển ra ngoài lớp cha, và được truyền vào đây như một prop
          }

          handleChange(e) {
            this.props.onTemperatureChange(e.target.value);
          }

          render() {
            const temperature = this.props.temperature;
            const scale = this.props.scale;
            return (
              <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
              </fieldset>
            );
          }
        }
        ```
        ```
        class Calculator extends React.Component {
          constructor(props) {
            super(props);
            this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
            this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
            // state được chuyển tới đây
            this.state = {temperature: '', scale: 'c'};
          }

          handleCelsiusChange(temperature) {
            this.setState({scale: 'c', temperature});
          }

          handleFahrenheitChange(temperature) {
            this.setState({scale: 'f', temperature});
          }

          render() {
            const scale = this.state.scale;
            const temperature = this.state.temperature;
            const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
            const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

            return (
              <div>
                <TemperatureInput
                  scale="c"
                  temperature={celsius}
                  onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInput
                  scale="f"
                  temperature={fahrenheit}
                  onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict
                  celsius={parseFloat(celsius)} />

              </div>
            );
          }
        }
        ```
        ![](https://images.viblo.asia/40b32d2a-6f5e-48ce-a0c1-5c044337f524.gif)