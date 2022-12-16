# 1. Render bằng JavaScript khác React như thế nào?
## 1.1 Render bằng JavaScript
Ví dụ có 1 đoạn HTML như sau
```javascript
<div id='root'></div>
```

Bây giờ muốn thêm 
```javascript 
<div class='container'>Hello World</div>
``` 
vào div root đó có thể sử dụng ```document API``` của javascript như sau:

```javascript
// Fetching the root div element
const rootElement = document.getElementById('root')

// Creating a new div as per our requirements
const divElement = document.createElement('div')
divElement.textContent = 'Hello World'
divElement.className = 'container'

// Appending newly created div element to the root element.
rootElement.append(divElement)
```

Những gì đang làm ở đây rất đơn giản:

* Nhận tham chiếu đến element root trong actual DOM 
* Tạo một element div mới bằng cách sử dụng **document.createElement** và sau đó đặt **Class** và **textContent** của nó
* Nối element mới tạo này vào root div element.

Đoạn HTML sau sẽ được tạo ra

```javascript
<div id='root'>
    <div class='container'>Hello World</div>
</div>
```

## 1.2 Render sử dụng React APIs
Sử dụng React APIs (raw) để tạo đoạn HTML cần thay vì sử dụng (vanilla) javascript.

Cần hai API quan trọng để đạt được mục đích ở đây. Trong (vanilla) javascript sẽ là

```javascript
document.createElement()
rootElement.append(domElement)
```

Tương đương trong React với hai API này là:

```javascript
React.createElement()
ReactDOM.render(reactElement, rootElement)
```

Và chi tiết hơn như sau:

**React.createElement()** chấp nhận 3 tham số:

* Component hoặc Tag để sử dụng tạo element
* Props của component
* Children

API sẽ được gọi như sau 
```javascript 
React.createElement(component, props, ...children)
``` 
và để tạo một element như ```<div class='container'>Hello World</div>``` sẽ là

```javascript
React.createElement('div', { className: 'container' }, 'Hello World')
```

HTML ở đây là: 
```javascript
<div id="root"></div>
```

Bây giờ, để thêm ```<div class='container'>Hello World</div>``` vào element root bằng React như sau

```javascript
const rootElement = document.getElementById('root')

const divElement = React.createElement('div', {className: 'container'}, 'Hello World')

ReactDOM.render(divElement, rootElement)
```

**Tạo các element lồng nhau như sau**
Cho đoạn HTML sau:

```javascript
<div class='container'>
    <span>Hello</span>
    <span>World</span>
</div>
```

Render trong React sẽ như sau:

```javascript
const rootElement = document.getElementById('root')

const helloElement = React.createElement('span', null, 'Hello')
const worldElement = React.createElement('span', null, 'World')
const divElement = React.createElement('div', {className: 'container'}, helloElement, worldElement)

ReactDOM.render(divElement, rootElement)
```

**Sử dụng tham số children prop**
```javascript
React.createElement('div', {className: 'container', children: [helloElement, worldElement]})
```

Tương đương với đoạn code sau:

```javascript
React.createElement('div', {className: 'container'}, helloElement, worldElement)
```

# 2. JSX trong React
## 2.1 Sử dụng JSX
JSX là đường cú pháp giống HTML nằm trên các API React raw.

Ví dụ:

```javascript
const divElement = <div id='container'>Hello World</div>
```

Đoạn code trên tương đương với
```javascript
const divElement = React.createElement('div', {id: 'container'}, 'Hello World')
```

Nhưng JSX không phải là code javascript hợp lệ, vì vậy cần sử dụng trình biên dịch được gọi là ```Babel``` để chuyển đổi code JSX sang code tương ứng của nó là ```React.createElement```.

Ví dụ:
```javascript
<div class='container'>
    <span>Hello</span>
    <span>World</span>
</div>
```

Chuyển đổ qua JSX sẽ như sau
```javascript
const rootElement = document.getElementById('root')

const divElement = <div className='container'><span>Hello</span><span>World</span></div>

ReactDOM.render(divElement, rootElement)
```

Lưu ý rằng có một số khác biệt nhỏ giữa JSX và HTML. Ví dụ, trong HTML để thêm Class vào một element, có thể thêm như sau: ```class='container'```, trong khi trong JSX cần viết ```className='container'```.

## 2.2 Interpolation trong JSX
Vì JSX được viết bằng chính javascript, nên JSX có khả năng sử dụng javascript bên trong JSX. Bất cứ khi nào JSX thực hiện phép nội suy sẽ cần sử dụng {} bao quanh. Điều này giúp trình biên dịch Babel biết rằng phép nội suy đang được sử dụng ở đây.

Ví dụ
```javascript 
const divElement = <div className='container'>Hello World</div>
```

Bây giờ, muốn tên Class và contentText trở nên động (dynamic) thì có thể làm như sau:
```javascript
const divClassName = 'container'
const divTextContent = 'Hello World'

const divElement = <div className={divClassName}>{divTextContent}</div>
```

## 2.3 Conditionals và Loops trong JSX
```javascript
{ condition ? <div>Hello World</div> : <div>Goodbye World</div> }
```

Để sử dụng các condition trong JSX thì sẽ sử dụng toán tử ba ngôi. Còn đối với các vòng lặp thì sẽ sử dụng hàm ```map```.

```javascript
{items.map((item) => <div key={item.id}>{item.title}</div>)}
```

```javascript
const element = <div id={`item-${itemId}`}>{itemContent}</div>
```

# 3. Tạo custom components
```javascript
<div className='container'>
  <div className='message'>Hello World</div>
  <div className='message'>Goodbye World</div>
</div>
```

Ở đây có thể thấy đoạn code```div className='message'></div>``` được tạo ở hai div.

Để tránh trùng lặp, điều đơn giản nhất có thể làm là tạo một hàm và sau đó gọi hàm đó thay thế.

```javascript
function message(text) {
    return <div className='message'>{text}</div>
}
```

```javascript
<div className='container'>
    {message('Hello World')}
    {message('Goodbye World')}
</div>
```

Cấu trúc lại để sử dụng ```React.createElement```
```javascript
function message({children}) {
    return <div className='message'>{children}</div>
}
```

```javascript
<div className='container'>
    {React.createElement(message, null, 'Hello World')}
    {React.createElement(message, null, 'Goodbye World')}
</div>
```

Ở các ví dụ trước đó, đối số đầu tiên của ```React.createElement ()``` là một chuỗi như  **span** hoặc **div**. Nhưng ```React.createElement``` cũng chấp nhận một hàm trả về có thể render được như JSX, một số chuỗi, số, v.v. Đó là lý do tại sao đoạn code trên hoạt động và chuyển code trên thành JSX như sau

```javascript
function message({children}) {
    return <div className='message'>{children}</div>
}
```
```javascript
<div className='container'>
    <message>Hello World</message>
    <message>Goodbye World</message>
</div>
```

Đoạn mã trên sẽ không hoạt động như mong muốn. Vì cách ```babel``` biên dịch cde JSX thành code ```React.createElement ()``` tương ứng.

```<message />``` được biên dịch bởi ```babel``` thành ```React.createElement('message')``` chứ không phải là ```React.createElement(message)```. Trong trường hợp đầu tiên, đối số đầu tiên là một chuỗi, trong trường hợp thứ hai, đó là một hàm. Để ```babel``` chuyển đổi đoạn code đúng mục đích thì phải đặt tên hàm là chữ hoa.

```javascript
function Message({children}) {
    return <div className='message'>{children}</div>
}
```
```javascript
<div className='container'>
    <Message>Hello World</Message>
    <Message>Goodbye World</Message>
</div>
```

Bây giờ, ```<Message>Hello World</Message>``` sẽ được biên dịch thành ```React.createElement(Message, {children: 'Hello World'})```.

Ví dụ về cách Babel biên dịch từng định dạng JSX.

```javascript
JSX	React.createElement ()
<Capitalized />	React.createElement(Capitalized)
<property.access />	React.createElement(property.access)
<Property.Access />	React.createElement(Property.Access)
<Property['Access'] />	SyntaxError
<lowercase />	React.createElement('lowercase')
<kebab-case />	React.createElement('kebab-case')
<Upper-Kebab-Case />	React.createElement('Upper-Kebab-Case')
<Upper_Snake_Case />	React.createElement(Upper_Snake_Case)
<lower_snake_case />	React.createElement('lower_snake_case')
```
Vì vậy, tên component cần phải là ```Upper Camel Cased```

# 4. React Fragments
```javascript
<div id='root'></div>
```

Giả sử cần thêm đoạn code ```<span>Hello</span>và <span>World</span>``` cho root element sử dụng trong React thì cần chuyển đổi như sau:

```javascript
<div id='root'>
    <span>Hello</span>
    <span>World</span>
</div>
```

```javascript
const rootElement = document.getElementById('root')

const elementOne = React.createElement('span', null, 'Hello')
const elementTwo = React.createElement('span', null, 'World')

ReactDOM.render(?????, rootElement)
```

Ở vị trí của ```?????``` dòng cuối cùng không thể là ```elementOne``` cũng không thể là ```elementTwo```, bởi vì mục đích là cả hai đều được hiển thị (không phải một). Nhưng ```ReactDOM.render()``` chỉ lấy một element làm đối số và sau đó gắn nó vào root element. Một cách để hiển thị được cả 2 là bọc cả 2 element trong một element mới.

```javascript
const rootElement = document.getElementById('root')

const elementOne = React.createElement('span', null, 'Hello')
const elementTwo = React.createElement('span', null, 'World')

const combinedElement = React.createElement('div', null, elementOne, elementTwo)

ReactDOM.render(combinedElement, rootElement)
```

Đoạn code trên sẽ tạo ra HTML như sau:

```
<div id='root'>
    <div>
        <span>Hello</span>
        <span>World</span>
    </div>
</div>
```

```
function Message() {
    return <span>Hello</span><span>World</span>
}
```

Không có cách nào để ```babel``` có thể chuyển đổi đoạn code trên thành một ```React.createElement ()```. Và ```React Fragment``` được giới thiệu ở ```React v16.2.0``` để giải quyết vấn đề này. Bây giờ có thể trả về nhiều element bằng cách bọc ngoài các element bởi ```React.Fragment```.

Ví dụ,
```javascript
function Message() {
    return (
        <React.Fragment>
            <span>Hello</span>
            <span>World</span>
        </React.Fragment>
    )
}
```

React sẽ bỏ qua điều này ```React.Fragment``` khi render. Vì vậy, vấn đề không thể render 2 element có thể được giải quyết theo cách sau.

```javascript
const elementOne = React.createElement('span', null, 'Hello')
const elementTwo = React.createElement('span', null, 'World')

const combinedElement = React.createElement(React.Fragment, null, elementOne, elementTwo)

ReactDOM.render(combinedElement, rootElement)
```

# 5. Inline CSS
Trong HTML thông thường thì inline css là một cách trực tiếp thay đổi thuộc tính css của element. Ví dụ:

```javascript
<div style="color: red; font-style: italic;">Red Italic Text</div>
```

Đối với React sẽ thêm các style css vào ```style prop```, nhưng thay vì nhận string, ```style prop``` chấp nhận một object.

Ví dụ,
```javascript
const elementStyle = {
    color: 'red',
    fontStyle: 'italic'
}
<div style={elementStyle}>Red Italic Text</div>
```

```
<div style={{ color: 'red', fontStyle: 'italic' }}>
    Red Italic Text
</div>
```

Một sự khác biệt khác với các kiểu trong React so với kiểu của HTML là tên thuộc tính cần phải được đặt theo ```camelCased``` thay vì ```kebab-cased```. Ví dụ, trong các kiểu React, ```background-color``` sẽ trở thành ```backgroundColor```, ```font-style``` sẽ trở thành ```fontStyle```, v.v.

Ngoài ra, giá trị của thuộc tính style luôn là ```string``` hoặc ```number``` (vì ```style``` cần phải là một đối tượng javascript thích hợp, những thứ giống như ```#fff``` hoặc ```20px``` không phải là giá trị javascript thích hợp). Vì vậy, không thể viết kiểu đó giống như ```fontSize: 20px```, thay vào đó cần phải viết ```fontSize: '20px'```. Tương tự như vậy không thể viết ```color: #fff```, mà cần phải viết ```color: '#fff'```.

# 6. Forms
Ví dụ form sau:
```javascript
<form>
  <div>
    <label htmlFor="usernameId">Username:</label>
    <input id="usernameId" type="text" name="username" />
  </div>
  <button type="submit">Submit</button>
</form>
```

Bây giờ việc xử lý các Form trong React rất giống với cách làm trong javascript thông thường. Chỉ cần xác định một ```submit handler``` và sau đó gán nó cho sự kiện onSubmit của Form.
```javascript
function handleSubmit(event) {
    event.preventDefault()
    // You can get the value of username in one of the following ways.
    // event.target.elements[0].value
    // event.target.elements.usernameId.value
    // event.target.elements.username.value
   // Do whatever you want with the username
}
```


**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại!!!**

**link tham khảo https://blog.bhanuteja.dev/react-fundamentals**