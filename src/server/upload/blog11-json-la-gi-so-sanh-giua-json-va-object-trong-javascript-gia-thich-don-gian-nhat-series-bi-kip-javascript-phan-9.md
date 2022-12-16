![image.png](https://images.viblo.asia/b66ed1dd-22b7-4a15-8f8c-adc9a9590c9c.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Nhiều ứng dụng phần mềm cần trao đổi dữ liệu giữa máy khách và máy chủ.

Trong một thời gian dài, XML là định dạng dữ liệu được ưa thích khi trao đổi thông tin giữa hai điểm. Sau đó vào đầu năm 2000, JSON được giới thiệu như một định dạng dữ liệu thay thế để trao đổi thông tin.

Trong bài viết này, bạn sẽ tìm hiểu tất cả về JSON. Bạn sẽ hiểu nó là gì, cách sử dụng nó và bạn sẽ làm rõ một vài quan niệm sai lầm.

OKAY GÉT GÔ! 🤣

JSON là gì?
-----------

**JSON** (**J**ava**S**cript **O**bject **N**otation) là một **định dạng text-based**  để trao đổi dữ liệu. Nó là một tập hợp các cặp **key-value** trong đó **key** phải là một loại string và **value** có thể thuộc bất kỳ loại nào sau đây:

*   Number
*   String
*   Boolean
*   Array
*   Object
*   null

Một số quy tắc quan trọng cần lưu ý:

*   Ở định dạng dữ liệu JSON, các key phải được đặt trong dấu ngoặc kép.
*   Key và value phải được phân tách bằng dấu hai chấm (:).
*   Có thể có nhiều cặp key-value. Hai cặp key-value phải được phân tách bằng dấu phẩy (,).
*   Không cho phép Comment (// hoặc / \* \*/) trong dữ liệu JSON. (Nhưng [nếu bạn muốn biết cách comment trong JSON thì mình có một bài viết về nó hãy tham khảo nhé](https://tuan200tokyo.blogspot.com/2022/10/blog12-cach-commnet-trong-file-json.html).)

Dưới đây là một dữ liệu JSON đơn giản:

```json
{
    "name": "Alex C",
    "age": 2,
    "city": "Houston"
}
```

Dữ liệu JSON hợp lệ có thể ở hai định dạng khác nhau:

*   Tập hợp các cặp key-value được bao bởi một cặp dấu ngoặc nhọn `{...}`. Đó là ví dụ ở trên.
*   Tập hợp danh sách có thứ tự các cặp key-value được phân tách bằng dấu phẩy (,) và được bao bởi một cặp dấu ngoặc vuông `[...]`. Xem ví dụ bên dưới:

```json
[
  {
    "name": "Alex C",
    "age": 2,
    "city": "Houston"
  },
  {
    "name": "John G",
    "age": 40,
    "city": "Washington"
  },
  {
    "name": "Bala T",
    "age": 22,
    "city": "Bangalore"
  }
]
```

Giả sử bạn là một JavaScript Developer. Trong trường hợp đó, bạn có thể cảm thấy như định dạng JSON và các đối tượng JavaScript (và array đối tượng) rất giống nhau. Nhưng chúng không phải vậy. Bạn sẽ thấy sự khác biệt một cách chi tiết ngay sau đây.

Cấu trúc của định dạng JSON được bắt nguồn từ cú pháp đối tượng JavaScript. Đó là mối quan hệ duy nhất giữa định dạng dữ liệu JSON và các đối tượng JavaScript.

JSON là một định dạng độc lập với ngôn ngữ lập trình. Bạn có thể sử dụng định dạng dữ liệu JSON trong Python, Java, PHP và nhiều ngôn ngữ lập trình khác.

Ví dụ về định dạng của dữ liệu JSON
-----------------------------------

Bạn có thể lưu dữ liệu JSON trong một tệp có phần mở rộng là `.json`. Hãy tạo một tệp  employee.json với các thuộc tính (được biểu thị bằng các key và value) của một nhân viên.

```json
{
  "name": "Aleix Melon",
  "id": "E00245",
  "role": ["Dev", "DBA"],
  "age": 23,
  "doj": "11-12-2019",
  "married": false,
  "address": {
    "street": "32, Laham St.",
    "city": "Innsbruck",
    "country": "Austria"
  },
  "referred-by": "E0012"
}
```

Dữ liệu JSON ở trên hiển thị các thuộc tính của một nhân viên. Các thuộc tính là:

*   `name`: tên của nhân viên. Value thuộc loại **String**. Vì vậy, nó được kèm theo dấu ngoặc kép.
*   `id`: một định danh duy nhất của một nhân viên. Nó lại là kiểu **String**.
*   `role`: vai trò của một nhân viên trong tổ chức. Có thể có nhiều vai trò của một nhân viên. Kiểu dữ liệu **Array** cũng thường được dùng cho các trường hợp tương tự.
*   `age`: tuổi hiện tại của nhân viên. Nó là một `Number`.
*   `doj`: ngày nhân viên gia nhập công ty. Vì nó là một ngày, nó phải được đặt trong dấu ngoặc kép và được xử lý như một `String`.
*   `married`: nhân viên đã có gia đình chưa? Vì vậy, **value** là của loại **Boolean**.
*   `address`: địa chỉ của nhân viên. Một địa chỉ có thể có nhiều phần như đường phố, thành phố, quốc gia, code zip và nhiều phần khác. Vì vậy, bạn có thể coi **value** địa chỉ như một `Object` (với các cặp key-value).
*   `referred-by`: id của một nhân viên đã giới thiệu nhân viên này trong tổ chức. Nếu nhân viên này tham gia bằng cách sử dụng giới thiệu, thuộc tính này sẽ có **value**. Nếu không, nó sẽ có **value** là **null**.

Bây giờ, hãy tạo một tập hợp các nhân viên dưới dạng dữ liệu JSON. Để làm điều đó, bạn cần giữ nhiều **record** nhân viên bên trong dấu ngoặc vuông \[...\].

```json
[
  {
    "name": "Aleix Melon",
    "id": "E00245",
    "role": ["Dev", "DBA"],
    "age": 23,
    "doj": "11-12-2019",
    "married": false,
    "address": {
      "street": "32, Laham St.",
      "city": "Innsbruck",
      "country": "Austria"
    },
    "referred-by": "E0012"
  },
  {
    "name": "Bob Washington",
    "id": "E01245",
    "role": ["HR"],
    "age": 43,
    "doj": "10-06-2010",
    "married": true,
    "address": {
      "street": "45, Abraham Lane.",
      "city": "Washington",
      "country": "USA"
    },
    "referred-by": null
  }
]
```

Bạn có nhận thấy value **referred-by** của nhân viên thứ hai, **Bob Washington** không? Đúng là nó là `null`. Nó có nghĩa là anh ta không được giới thiệu bởi bất kỳ nhân viên nào.

Cách sử dụng dữ liệu JSON làm String value
------------------------------------------

Bạn đã biết cách định dạng dữ liệu JSON bên trong tệp JSON. Ngoài ra, bạn có thể sử dụng dữ liệu JSON làm **string** **value** và gán nó cho một biến. Vì JSON là **text-based format**, nên nó có thể được xử lý như một **string** trong hầu hết các ngôn ngữ lập trình.

Hãy lấy một ví dụ để hiểu cách bạn có thể làm điều đó trong JavaScript. Bạn có thể bao toàn bộ dữ liệu JSON dưới dạng một **string** trong một dấu ngoặc kép `'...'`.

`const user = '{"name": "Alex C", "age": 2, "city": "Houston"}';`

Nếu bạn muốn giữ nguyên định dạng JSON, bạn có thể tạo dữ liệu JSON với sự trợ giúp của **template literals**.

```js
const user = `{
    "name": "Alex C",
    "age": 2,
    "city": "Houston"
}`;
```

Nó cũng hữu ích khi bạn muốn xây dựng dữ liệu JSON bằng cách sử dụng các value động.

```js
const age = 2;

const user = `{
      "name": "Alex C",
      "age": ${age},
      "city": "Houston"
  }`;

console.log(user);

// Output
{
    "name": "Alex C",
    "age": 2,
    "city": "Houston"
}
```

JavaScript Object và JSON... chúng KHÔNG giống nhau
---------------------------------------------------

Định dạng dữ liệu JSON có nguồn gốc từ cấu trúc đối tượng JavaScript. Nhưng sự giống nhau kết thúc ở đó.

Các đối tượng trong JavaScript:

*   Có thể có các method còn JSON không thể.
*   Các **key** có thể không có dấu ngoặc kép.
*   **Comment** được cho phép.
*   Là thực thể riêng của **JavaScript**.

Cách chuyển đổi JSON thành một đối tượng JavaScript và ngược lại
----------------------------------------------------------------

**JavaScript** có hai **method** tích hợp để chuyển đổi dữ liệu JSON thành một đối tượng JavaScript và ngược lại.

### Cách chuyển đổi dữ liệu JSON thành một đối tượng JavaScript

Để chuyển đổi dữ liệu JSON thành một đối tượng JavaScript, hãy sử dụng method **JSON.parse()** này. Nó **phân tích** một string JSON hợp lệ thành một đối tượng JavaScript.

```js
const userJSONData = `{
    "name": "Alex C",
    "age": 2,
    "city": "Houston"
}`;

const userObj = JSON.parse(userJSONData);
console.log(userObj);
```

Kết quả:

![Đầu tiên](https://www.freecodecamp.org/news/content/images/2021/12/first.png)

### Cách chuyển đổi một đối tượng JavaScript thành dữ liệu JSON

Để chuyển đổi một đối tượng JavaScript thành dữ liệu JSON, hãy sử dụng method **JSON.stringify()** này.

```js
const userObj = {
  name: 'Alex C',
  age: 2,
  city: 'Houston',
};

const userJSONData = JSON.stringify(userObj);
console.log(userJSONData);
```

Đầu ra:

![thứ hai](https://www.freecodecamp.org/news/content/images/2021/12/second.png)

  
Bạn có nhận thấy thuật ngữ **JSON** bạn sử dụng để gọi các `parse()` và `stringify()` method ở trên không? Đó là một đối tượng JavaScript tích hợp có tên `JSON`(cũng có thể được đặt tên là **JSONUtil**) nhưng nó không liên quan đến định dạng dữ liệu JSON mà bạn đã thảo luận. Vì vậy, xin đừng nhầm lẫn.

Cách xử lý các lỗi JSON như "Unexpected token u in JSON at position 1"?
-----------------------------------------------------------------------

Trong khi xử lý JSON, việc gặp lỗi như thế này là rất bình thường khi phân tích cú pháp dữ liệu JSON thành một đối tượng JavaScript:

![image.png](https://images.viblo.asia/05bcf3ef-4e6e-49bb-a9b9-e40fb0e0c70a.png)

Bất cứ khi nào bạn gặp lỗi này, vui lòng đặt câu hỏi về tính hợp lệ của định dạng dữ liệu JSON của bạn. Có thể bạn đã mắc một lỗi nhỏ trong việc format và điều đó đang gây ra lỗi này. Bạn có thể xác thực định dạng dữ liệu JSON của mình có đúng hay ko bằng cách sử dụng [JSON Linter](https://jsonlint.com/).

Trước khi kết thúc....
----------------------

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog11-json-la-gi-so-sanh-giua-json-va.html