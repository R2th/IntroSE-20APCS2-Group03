Hi All.
Hôm nay chúng ta sẽ tiếp tục về hành trình tìm hiểu ReactJS, và bài hôm nay chúng ta sẽ tìm hiểu về Components và Props nhé.

Nếu như mọi người có theo dõi quá trình phát triển của Javascript thì sẽ thấy xu hướng phát triển hiện nay là theo Component, vì sao lại như vậy:
 - Thứ nhất nếu code theo kiểu Component thì việc tái sử dụng code sẽ dễ dàng hơn, một Component có thể được sử dụng ở nhiều nơi
 - Thứ hai, khi code theo kiểu Component thì việc maintenance cũng sẽ dễ dàng hơn khi đọc code
 - Thứ ba, với sự phát triển của các tool như WebPack thì việc viết code theo Component sẽ dễ dàng hơn bao giờ hết, chúng ta ko cần quá lo lắng về việc import cái gì vào file html nữa.

Và ReactJS mà một trong những library tiêu biểu nhất cho việc này. Và chúng ta sẽ cùng đi tìm hiểu Component trong ReactJS là như nào nhé.

# Components
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. 
> 

> Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
> 

Tư tưởng của ReactJs là sẽ chia nhỏ page thành các phần nhỏ (components) và các components hướng tới việc hoạt động độc lập với nhau.
Còn về mặt hoạt động thì các Component vẫn là một Javascript Function, có thể truyền tùy ý Parameter (Props).

## Function and Class Components
Khi sử dụng ReactJS chúng ta sẽ có 2 cách để định nghĩa 1 Component:
- Function
- Class

Cách đơn giản nhất là sử dụng Function:

```Javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

"Function" đáp ứng được yêu cầu của một component, nó nhận vào một Props (Props có thể là bất cứ là gì) và nó trả về một React Element.
"Function" được sử dụng để làm component khi đó là một Component đơn giản, ít xử lý về logic hay các life cycle của React.

Còn ở một mức độ phức tạp hơn thì chúng ta sử dụng Class.
Lưu ý là sử dụng ES6 để định nghĩa một class là Component.

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Class thì nó có nhiều chức năng hơn là một Function, chúng ta có thể handle các Life Cyle hay nói một cách khác, chúng ta nên sử dụng Class khi cần xử lý nhiều logic hay cần handle data ở nhiều thời điểm.

## Rendering a Component
Trong các bài trước thì chúng ta đang sử dụng các element của DOM tags:

```
const element = <div />;
```

Thì hôm nay chúng ta sẽ biết thêm được rằng các Component cũng có thể render như các element của DOM tag

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```


Cơ chế hoạt động như sau:
 - Đầu tiên ReactJS sẽ gom toàn bộ các attributes và nhé nó vào 1 parameter tên là "props"
 - React sẽ gọi Component đó như 1 function và truyền "props" vào
 - React nhận về element mà Component trả về và hiển thị lên page

> Note: Tên Component bắt buộc phải bắt đầu bằng một ký tự viết hoa "<Welcome />"
> 
>Bởi vì DOM tags bắt đầu bằng các ký tự viết thường nên các Component phải viết hoa để tránh nhầm lẫn giữa 2 bên 
>
>Đọc thêm [JSX In Depth.](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)
>

## Extracting Components

Chúng ta hãy cùng xem một ví dụ về Component sau:
```
function Comment(props) {
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

Props có chứa cả 3 loại data:
 - author (object)
 - text (string)
 - date (date)

Cả loại đều được sử dụng trong Component Comment, nhìn vào thì chúng ta sẽ thấy khá là rối và thực sự điều này là không tốt cho việc mainteance:
Component nếu phân tích ra sẽ có các phần sau:

```
<div className="UserInfo">
    <img className="Avatar"
      src={props.author.avatarUrl}
      alt={props.author.name}
    />
 </div>
```
```
 <div className="Comment-text">
        {props.text}
 </div>
```
      
```
  <div className="Comment-date">
    {formatDate(props.date)}
  </div>
```

Nếu như sau này cần sửa một trong 3 phần trên sẽ khá là rối mắt khi chúng ta cần tìm giới hạn của các phần trên.
Và lợi thế của Component sẽ được thể hiện như sau:
Chúng ta sẽ cùng chia nhỏ  Component Comment thành các Component nhỏ hơn:

1. Component Avatar
```
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
Chúng ta thiết kế Component Avatar như trên.
Có người sẽ hỏi vì sao khi tạo Component Avatar thì ko sử dụng name là "author" mà sử dụng "user", thì bởi vì như sau:
 - Component Avatar có thể sử dụng nhiều nơi khác nữa nên việc sử dụng name "user" sẽ dễ dàng hơn cho việc đọc code.

Cho nên ở Component Component chúng ta chỉ việc truyền vào Component Avatar attribute "user" = "author"

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
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

Nhìn code có vẻ vẫn hơi dài nhỉ.
Mọi người có thể thấy chúng ta có thể tách `<div className="UserInfo">` làm một Component nữa.
Có người sẽ hỏi dựa vào đâu để mình tách như vậy:
 - Theo như mình thì mình sẽ tập trung vào mục đích sử dụng của Component, trong trường hợp này thì `<div className="UserInfo">` sẽ là Component chịu trách nhiệm hiển thị toàn bộ thông tin của user.
 
 Và Component UserInfo sẽ được thiết kế như sau:
 ```
 function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
 ```

Và giờ chúng ta sẽ so sánh code trước vào sau nhé

Trước khi sửa

```function Comment(props) {
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

Sau khi sửa:

```
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
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

Việc Extra Component thì có các note như sau:
 - Nên tính toán trước từ đầu để có thể dễ dàng tái sử dụng, tránh trường hợp code xong rồi mới nghĩ tới việc tách nhỏ Component
 - Nên list hết các Component sử dụng nhiều trong App và tạo sẵn các Component đó, ví dụ như: Button, Panel, Avatar,...

## Props are Read-Only

> All React components must act like pure functions with respect to their props.
> 
Các bạn hiểu như nào là Pure Function
Pure function là các function không làm thay đổi giá trị đầu vào và luôn trả về 1 kiểu định dạng 

```
function sum(a, b) {
  return a + b;
}
```

Giống như function trên thì giá trị đầu vào sẽ ko bị thay đổi khi chạy function và sau khi function chạy xong sẽ cho ra 1 loại putput

```
function withdraw(account, amount) {
  account.total -= amount;
}
```

Còn function trên được gọi là "impure function"
Impure function là các function làm thay đổi giá trị đầu vào

Và React của chúng ta thì tuân theo một rule duy nhất đó "Pure Function"