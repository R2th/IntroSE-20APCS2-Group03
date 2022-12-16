Trước khi phát hành React Hook, người dùng sử dụng functional components sẽ cảm giác bị giới hạn tương đối nhiều. Người dùng sẽ khó thao tác được với state, context API hoặc lifecycle method.

Tuy nhiên bắt đàu từ React 16.8, React hook được ra đời và chúng ta đã có công cụ rất linh hoạt để sử dụng lại những đoạn code đã có sẵn.

![](https://images.viblo.asia/eef4f131-ca64-4b99-b689-92a07a7bf92c.png)


Bài viết này mình sẽ giới thiệu một số React hook hữu dụng để có thể giải quyết được các bài toán gặp phải ngằng ngày.

# useFiler Hook

Mình rất thích sử dụng `useFiler` vè nó cho phép chúng ta tạo một hệ thống lưu trữ file ảo (virtual file system) ngay trên trình duyệt web. Về cơ bản thì nó dử dụng local storage để quản lý các file và nội dung của chúng.

Để sử dụng chúng ta cần cài đặt crooks package trong ứng dụng:

```
npm install crooks --save
```

Sau đó import useFiler hook từ crooks:

```js
import { useFiler } from 'crooks'
```

Bây giờ chúng ta đã cso thể khởi tạo hook và quản lý file dễ dàng, đây là ví dụ:

```javascript
const App = () => {
  const [files, {add, remove, update, clear}] = useFiler("localStorageItem")
  return (
    <div>My Project</div>
  )
}
```

Như bạn có thể thấy trong đoạn code trên, chúng ta có thể sử dụng các hàm `add()`, `remove()`, `update()`,` clear()`. Hãy cùng tìm hiểu xem cách sử dụng chúng thế nào nhé.

**Add file**

Hàm add() chấp nhận 1 tham số truyền vào, ở đây chúng ta cần truyền vào JSON-serializable:

```js
add("Save this JSON-serializable data in the file.")
```

*Chú ý: hàm này sẽ tự động sinh ra 1 ID mới cho file vừa tạo, tuy nhiên chúng ta có thể custom ID bằng các truyền vào một integer hoặc một string ở tham số thứ 2.*

**Update file**

Hàm update() yêu cầu 2 tham số, tham số đầu tiên là ID của file, tham số thứ 2 là là dữ liệu mới cần truyền vào:

```js
update("abc1234", "New content of file.")
```

**Remove file**

Truyền ID cùa file vào trong hàm remove() để xoá

```js
remove("abc1234")
```

**Clear all files**

Gọi hàm clear() để xoá toàn bộ files:

```js
clear()
```


-----

# useFetch Hook

useFetch có thể sử dụng để lấy dữ liệu từ API. Sau khi request được thực hiện xong, nó sẽ trả về response hoặc errors(nếu có).

Import vào trong project:

```javascript
import useFetch from "hooks/useFetch";
```

Tạo thử 1 request:

```javascript
const { response, errors } = useFetch("https://api.github.com/users/hct97/repos");
```

# useHover Hook

Về cơ bản, nó theo dõi con trỏ chuột trên màn hình để phát hiện xem nó có được đặt trên một phần tử cụ thể hay không. Nếu có, nó sẽ trigger the hovered event,

Import vào trong project:

```javascript
import useHover from "hooks/useHover";
```

Khởi tạo:

```javascript
const [hoverMe, isHovered] = useHover();
```

Tại đây, hoverMe chỉ đến HTML element cụ thể, trong khi đó isHovered là một giá trị boolean để check điều kiện

```javascript
<div ref={hoverMe}>{isHovered ? "Hovered!" : "Hover me!"}</div>
```


-----

# useSlug Hook

Slug là một thành phần rất quan trọng trong mọi web project, nó có thể tăng SEO của trang web.

Ví dụ, nó sẽ chuyển đổi `é` hoặc `è` thành `e`

Như thường lệ, chúng ta cần import:

```js
import useSlug from "hooks/useSlug";
```

Khi khởi tạo hook, truyền bất kì string(có thể là tên bài viết) vào làm tham số thứ nhất. Kết quả trả về sẽ là well-form slug.

```
useSlug("React Hooks! résoudre les problèmes quotidiens");
// react-hooks-resoudre-les-problemes-quotidiens
```


# useDrag and useDrop Hooks

Đây là 2 hook rất hữu dụng khi sử dụng chức năng kéo-thả của HTML5

Cài đặt:

```
npm install ahooks --save
```

import:

```js
import { useDrag, useDrop } from 'ahooks';
```

**Cách sử dụng**

Đầu tiên chúng ta cần khởi tạo `useDrag` và `useDrop`

`useDrag` sẽ trả về props được truyền tới DOM element. `useDrop` trả về props được truyền vào drop area, nó cũng thông báo cho chúng ta về việc phần tử kéo có ở trên cùng khu vực thả hay không bằng cách sử dụng thuộc tính boolean (`isHovering`)

Sau cùng, useDrop có 4 callback thực thi theo từng loại của item đã đc kéo-thả: `onText`, `onFiles`, `onUri`, `onDom`

```js
const getDragProps = useDrag();

const [props, { isHovering }] = useDrop({
  onText: (text, e) => {
    alert(`'text: ${text}' dropped`);
  },
  onFiles: (files, e) => {
    alert(`${files.length} file dropped`);
  },
  onUri: (uri, e) => {
    alert(`uri: ${uri} dropped`);
  },
  onDom: (content: string, e) => {
    alert(`custom: ${content} dropped`);
  }
});
```

```js
<div {...getDragProps(id)}>Draggable Element</div>
```

```js
<div {...props}>
  {isHovering ? 'Release Item Here' : 'Drop Anything Here'}
</div>
```

# useDarkMode Hook

`useDarkMode` hook xử lý việc chuyển đổi giữa light và dark mode của website. Sau khi chuyển đổi, nó sẽ lưu giá trị hiện tại vào trong một `localStorage`. Điều này có nghĩa là lựa chọn của người dùng sẽ được áp dụng ngay khi trang web được mở.

Cài đặt thư viện:

```
npm install react-recipes --save
```

Import:

```js
import { useDarkMode } from "react-recipes";
```

Cơ bản, `useDarkMode()` trả về 2 thư:

- `darkMode`: là giá trị boolean trả về true nếu darkmode được kích hoạt
- `setDarkMode`: xử lý lựa chọn giữa light và dark mode

```js
function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div className="header">
      <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
```

# Kết luận

Trên đây chúng ta đã có được một vài ví dụ về những React hooks khá hữu dụng có thể áp dụng vào dự án của bạn. Trên thực tế, lợi ích chính của việc sử dụng React Hook là cho phép chúng ta có thể sử dụng lại code một cách dễ dàng nên chúng ta hoàn toàn có thể sử dụng những Hooks open-source như trên đây.

# Tư liệu tham khảo
- [https://medium.com/better-programming/7-awesome-react-hooks-38b81f3cbd0a](https://medium.com/better-programming/7-awesome-react-hooks-38b81f3cbd0a)

- [ https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)