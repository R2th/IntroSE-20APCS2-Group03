**CÁCH VIẾT MỘT COMPONENT REACT ĐÚNG CHUẨN AIRBNB**

**Declaration**

Không sử dụng displayName để đặt tên các thành phần. Thay vào đó, hãy đặt tên cho component bằng cách tham khảo.

```
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```

**Căn chỉnh**

Thực hiện  sắp xếp theo cú pháp JSX. eslint:react/jsx-closing-bracket-location react/jsx-closing-tag-location
```

// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```

**Lời trích dẫn**

Luôn luôn sử dụng dấu ngoặc kép ("") cho các thuộc tính JSX, và dấu nháy đơn (') cho tất cả các JS khác. Eslint: jsx-quotes

Tại sao? Các thuộc tính HTML thông thường thường sử dụng dấu ngoặc kép thay vì đơn, vì vậy thuộc tính JSX phản chiếu quy ước này.
```
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

**Khoảng cách**

Luôn luôn tạo một không gian duy nhất trong thẻ đóng của bạn. eslint: no-multi-spaces, react/jsx-tag-spacing

```
/// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

Không dùng ngoặc nhọn JSX bằng dấu cách. eslint: react/jsx-curly-spacing

```
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
Props
Always use camelCase for prop names.

// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

Bỏ giá trị của prop khi nó là sự thật rõ ràng. eslint: react/jsx-boolean-value

```
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>
```

Luôn luôn bao gồm một thẻ alt trên thẻ <img>. Nếu hình ảnh là hiện đại, alt có thể là một chuỗi rỗng hoặc <img> phải có role= "presentation". eslint: jsx-a11y / alt-text

```
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
```

Không sử dụng các từ như "image", "photo", hoặc "picture" trong <img>  alt. eslint: jsx-a11y/img-redundant-alt
Tại sao? Trình làm màn hình đã thông báo các yếu tố img dưới dạng hình ảnh, vì vậy không cần bao gồm thông tin này trong văn bản alt.
```
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />

// good
<img src="hello.jpg" alt="Me waving hello" />
```

Chỉ sử dụng các ARIA roles không trừu tượng. eslint: jsx-a11y/aria-role
```
// bad - not an ARIA role
<div role="datepicker" />

// bad - abstract ARIA role
<div role="range" />

// good
<div role="button" />
```

Không sử dụng accessKey trên các phần tử. eslint: jsx-a11y / no-access-key
Tại sao? Sự mâu thuẫn giữa các phím tắt và lệnh bàn phím  làm phức tạp thêm khả năng tiếp cận.
```
// bad
<div accessKey="h" />

// good
<div />
```

Tránh sử dụng một mảng như là Key, dùng một ID duy nhất. 
```
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

Luôn xác định defaultProps rõ ràng cho tất cả các props không cần thiết.
Tại sao? propTypes là một hình thức tài liệu, và cung cấp defaultProps có nghĩa là người đọc mã của bạn không phải giả định như nhiều. Ngoài ra, nó có thể có nghĩa là mã của bạn có thể bỏ qua kiểm tra kiểu nhất định.

```
// bad
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

// good
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};
SFC.defaultProps = {
  bar: '',
  children: null,
};
```