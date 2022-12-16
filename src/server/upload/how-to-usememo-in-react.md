## Mở đầu
Xin chào các bạn, mình đã quay trở lại đây, bài trước mình có giới thiệu về `react-query`  sử dụng `useQuery` để tương tác với API nhanh gọn hơn.Các bạn có thể đọc lại bài của mình [ở đây](https://viblo.asia/p/react-query-phan-1-vyDZOqqk5wj) :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Lần này mình sẽ chia sẻ cho các bạn mộ hook hay được dùng trong Reactjs. Hy vọng sẽ giúp được cho các bạn hiểu thêm hơn về Reactjs.Ok, bây giờ chúng ta bắt đầu.

## Nội dung

`useMemo` giúp tối ưu hóa, optimize  việc render giống như  `shouldComponentUpdate` và chỉ khác là hook này nằm trong `function component`, và có sự khác là hook này cần phải truyền vào tham số để so sánh, quyết định khi nào render, khi bạn không truyền tham số thì n mặc định chạy luôn.
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
a.b là tham số truyền vào để so sánh.

`useMemo` trả về một giá trị được ghi nhớ.
`useMemo` sẽ chỉ tính toán lại giá trị đã ghi nhớ khi một trong các thành phần phụ thuộc thay đổi. Tối ưu hóa này giúp tránh các tính toán tốn kém trên mỗi lần hiển thị.
VD: Hiển thị danh sách người dùng và cho phép filter theo tên.
```javascript
import React, { useState } from 'react';
 
const users = [
  { id: 'a', name: 'test1' },
  { id: 'b', name: 'test2' },
];
 
const App = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
 
  const handleText = ({ target: { value } }) => {
    setText(value);
  };
 
  const handleSearch = () => {
    setSearch(text);
  };
 
  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });
 
  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
 
      <List list={filteredUsers} />
    </div>
  );
};
 
const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
 
const ListItem = ({ item }) => {
  return <li>{item.name}</li>;
};
 
export default App;
```

Khi người dùng nhập vào ô input và bấm vào button thì hàm `filteredUsers ` mới được thực thi và chạy đi chạy lại khi mỗi lần bấm vào nút button.

Tuy nhiên, khi chúng ta xử lý một bộ dữ liệu lớn trong mảng này và chạy hàm `filteredUsers` cho mỗi lần bấm button, có thể sẽ làm chậm ứng dụng của bạn. 

Do đó, chỗ này bạn có thể dùng `useMemo` để ghi nhớ các hàm trả về giá trị và chỉ chạy một lần khi biến `search` thay đổi. Hàm `filteredUsers` mình sẽ sửa lại như sau
```javascript
import React, { useMemo } from 'react';
  ...
 
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        console.log('Filter function is running ...');
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );
 
  ...
```

Bây giờ, hàm này chỉ chạy khi biến `search` thay đổi. Biến không thay đổi thì hàm sẽ không chạy
Đọc đến đây, các bạn có thấy hook này hay không, nó khá là tiện ích khi chúng ta muốn cho một hàm nào đó chạy khi biến thay đổi.

Tóm lại, `useMemo` Hook của React được sử dụng để ghi nhớ các giá trị. Và các bạn cân nhắc bài toán của mình khi sử dụng hook này nhé.

Mình dừng bài viết ở đây nhé. Cảm ơn các bạn đã đọc bài của mình và hẹn các bạn ở các bài viết tiếp theo :kissing_heart::kissing_heart: