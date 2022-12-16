![](https://images.viblo.asia/20a5a894-ca23-42e9-ba44-c28d5c399603.png)

JSX là thứ cho phép chúng ta viết HTML trong React. JSX khiến việc viết và thêm HTML vào React dễ dàng hơn. JSX rất dễ để hiểu và nếu bạn là người mới làm quen JSX, sau đây là một số điều mới bạn có thể cần biết.

# Biến

Bất cứ khi nào bạn muốn render một biến / biểu thức trong JSX, bạn cần bao nó với dấu ngoặc ngọn `{}`. Bạn có thể đặt bất cứ biểu thức JS nào vào trong dấu ngoặc nhọn, từ biến, function, các câu lệnh, biểu thức...


```js
const name = 'Harsha';
return (
<div>
  <h1>Welcome!</h1>
  <h2>{name}</h2>
  <p>Years of coding {2020 - 2010}</p>
  <p>Today : {new Date().toLocaleDateString()}</p>
</div>
);
```

# Không render gì cả
Sử dụng `return null;` nếu bạn không muốn React render nội dung gì lên màn hình cả. Khi bạn return `undefined`, `[]` (array rỗng) hoặc giá trị true false, React cũng sẽ không render ra bất kì nội dung gì, tuy nhiên `null` thì dễ sử dụng hơn vì nó tường minh và bất cứ ai đọc cũ có thể hiểu được.

```js
if(loading) return null;
return <div>Content loaded!</div>;
```

# Render theo điều kiện
Có một số cách sau để render nội dung theo điều kiện trong React.

### if / else

Đây là cú pháp thông dụng nhất được sử dụng trong tất cả các ngôn ngữ lập trình.
```js
const val = 7;
if(val > 5) {
  return <div>Above 5!</div>
} else {
  return <div>Below 5!</div>
}
```

### Toán tử 3 ngôi
Bạn cũng có thể sử dụng toán tử 3 ngôi truyền thống vào trong JSX để render nội dung theo điều kiện. Chúng ta cũng có thể dùng toán tử 3 ngôi trong JSX trong khi bao logic code trong cặp ngoặc nhọn `{}` như đã nói bên trên.
```js
return isValid() === true 
  ? <div>Yay!</div> 
  : <div>Error!</div>
  ```
  
  ### Toán tử logic
  
  Bạn có thể dùng logic `AND` và toán tử `&&` để render theo điều kiện. Khi dùng toán tử logic, chỉ khi điều kiện đầu tiên là true thì content mới được render.
  ```js
  return isValid && <div>Hello World!</div>
  ```
  
  # React Fragments
  Một trong những lỗi hay mắc phải nhất của người mới tiếp cận React là cố gắng return lại nhiều thẻ / component khi render, và điều này sẽ trả ra lỗi. Vì thế thường chúng ta sẽ có xu hướng thêm một thẻ `div` cha bao xung quanh đống thẻ / component return của chúng ta, và vấn đề sẽ được giải quyết. Nhưng chúng ta có thực sự cần một thẻ `div` hoặc bất cứ thẻ nào bao xung quanh không? Thật ra là không, có 2 cách để giải quyết vấn đề này.
  
  ### Return về array của JSX
  Thay vì return về JSX, bạn có thể return về một array của JSX. Nó sẽ render như bạn muốn và chả có lỗi nào xuất hiện cả.
  ```js
  return [<div>One</div>, <div>Two</div>]
  ```
  
  ### Sử dụng React Framents
  React cung cấp thứ gọi là React Fragments để giải quyết những trường hợp như thế này. Thay vì bao JSX lại với một thẻ `div`, bạn có thể bao chúng lại với `React.Fragment` hoặc đơn giản là một thẻ rỗng `<>`.
  ```js
  return (
  <React.Fragment>
    <div>One</div>
    <div>Two</div>
  </React.Fragment>
)
```

Hoặc cú pháp thẻ rỗng như sau:
```js
return (
  <>
    <div>One</div>
    <div>Two</div>
  </>
)
```


# Viết hoa chữ cái đầu Component
React khuyến nghị sử dụng chữ viết hoa để bắt đầu trong tên của component. Lý do là bởi vì React xác định một component bằng chữ cái đầu viết hoa, nếu nó không viết hoa, React sẽ xem nó như một thẻ HTML thông thường. Vì thế nhớ rằng khi viết React Component, nhớ viết hoa chữ đầu tên của nó.
```js
const App = () => <div>I am App Component<div>
```

# Chọn JSX tại runtime
Sẽ có vài trường hợp khi bạn muốn render JSX tùy theo props đầu vào. Khi đó JSX sẽ được render khác nhau tùy thuộc vào data prop bạn truyền vào. Cùng nhìn qua ví dụ dưới đây:
```js
const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

Nếu bạn sử dụng cách trên, React sẽ báo ra lỗi vì JSX không thể là một biểu thức. Để giải quyết vấn đề này, bạn có thể gán biểu thức JS đó cho một biến **được viết hoa chữ cái đầu** khác:

```js 
const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

# Tổng kết
Là một người mới tiếp cận React, trên đây là những điều mình đúc rút được trong quá trình tìm hiểu. Hy vọng bài viết này có thể giúp bạn hiểu về JSX và cách sử dụng của nó hơn một chút. Chúc bạn sớm thành công trên con đường trở thành coder có tâm và có tầm của mình.