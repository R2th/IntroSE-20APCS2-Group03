Snippet là một đoạn code được định nghĩa sẵn và gắn vào một từ khoá nào đó, khi cần dùng thì ta sẽ gọi từ khoá đó để chèn nội dung mà ta đã định nghĩa. Với snippet, quá trình gõ code của bạn sẽ nhanh hơn vì bạn sẽ không phải gõ đi gõ lại nhiều đoạn code giống nhau. Bài viết này sẽ hướng dẫn bạn làm thế nào để tạo, snippet trong Visual Studio Code. Bài viết này tôi viết cho MacOS và ở window cũng tương tự nhé.

Đầu tiên chúng ta vào `Code > Preferences > User Snippets`

![Snippet 1](https://i.imgur.com/q6sJggk.png)

Tiếp theo là chọn tạo file snippet mới `New Global Snippets file...`

![Snippet 2](https://i.imgur.com/NqTfewl.png)

Đặt tên để hoàn tất việc tạo file snippet:

![Snippet 3](https://i.imgur.com/u6lEun8.png)

Cuối cùng là viết snippet cho riêng bạn, dưới đây là một ví dụ:

```json
{
  "Import trong javascript": {
    "scope": "javascript,typescript,vue",
    "prefix": "t-imp",
    "body": ["import $1 from '$2'", "$0"],
    "description": "Import nhanh trong javascript"
  }
}
```

Mỗi snippet được định nghĩa bởi tên của snippet đó bên trong nó bao gồm: _scope, prefix, body_ và _description_ và được ngăn cách nhau bởi dấy phẩy `,`.

**scope**: là ngôn ngữ cho phép sử dụng snippet, nếu như bị bỏ trống hoặc không có thì snippet này sẽ áp dụng cho tất cả các ngôn ngữ.
**prefix**: là từ khoá (trigger) của đoạn code.

**body**: là phần nội dung của snippet đó, bao gồm phần code được định nghĩa và một số biến:

- `$1, $2, ...`: để đánh dấu vị trí con trỏ chuột, $1 là vị trí đầu tiên mà con trỏ chuột sẽ ở đó, khi bạn tab con trỏ chuột sẽ tới vị trị của $2 và tương tự như vậy $3, $4,... hoặc bạn có thể thay $1, $2,... thành `${abcd}, $ {cdef}` thì thay vì vị trí con trỏ đó là rỗng sẽ được thay bằng đoạn text tương ứng.
- `$0` để đánh dấu vị trí con trỏ cuối cùng.

Đoạn snippet trên sẽ ra được như thế này:

![Snippet 4](https://i.imgur.com/AeFBqNa.png)

![Snippet 5](https://i.imgur.com/VyJk49R.png)

Hy vọng bài viết sẽ giúp ích cho bạn!!!