TypeScript là một ngôn ngữ mã nguồn mở dựa trên JavaScript, một trong những ngôn ngữ phổ biến và được sử dụng nhiều nhất. Typescript mở rộng thêm Javascript bằng cách thêm vào một số static types.

Types cung cấp một phương thức tường minh hơn để mô tả các hình thái của object, mô tả documentation tốt hơn, thông qua đó TypeScript có thể xác định rằng code của chúng ta đang hoạt động chính xác hay không.

Chỉ định Types là không bắt buộc trong TypeScript. Trong bài viết này chúng ta sẽ cùng tìm hiểu về type aliases và interface và một số điểm khác biệt giữa chúng. Bắt đầu nào: 

![image.png](https://images.viblo.asia/0a29738c-5352-4b2f-a485-482347946579.png)

# Type aliases
Trong TypeScript, có rất nhiều types cơ bản như là number, string,... Ngoài ra, trong TypeScript chúng ta có các types nâng cao và các types nâng cao này được gọi là `type aliases`. Với type aliases, chúng ta có thể tạo tên mới cho một type nhưng chúng ta không define một type mới

Từ khóa `type` trong TypeScript là một cách cung cấp type aliases cho các variables, objects và functions của chúng ta. Các type aliases này mô tả dữ liệu của chúng ta trông như thế nào. Để mô tả loại dữ liệu của mình trông như thế nào chúng ta sử dụng các type cơ bản (string, number,...) hoặc bằng cách tạo tạo các type tùy chỉnh của chúng ta.

Khi được hỏi về sự khác biệt giữa types và interfaces thì chúng ta có thể hiểu rằng là sự khác biệt giữa `type aliases` và `interface`

```js
// type của Year là một number
type Year = number;
 
 // Biến currentYear là thuộc type Year và phải là number
let currentYear: Year = 2021;

// custom Person object type
type Person = {
    name: String;
    gender: String;
};
```
# Interfaces
Interface trong typescript cho phép bạn định nghĩ thuộc tính là gì và phương thức là gì mà đối tượng cần để được implement. Nếu đối tượng tuân thủ đúng khuôn mẫu interface thì đối tượng đã implement interface ấy sẽ được thực thi đúng. Nếu interface không được thực  thi đúng thì typescript sẽ phát sinh lỗi ngay lập tức.

```js
interface Person {
  name: string
  age: number
}

const viblo: Person = {
  name: "Viblo",
  age: 31
};
```

# Types vs Interfaces
Sau đây là một số điểm khác biệt giữa types và interfaces:
## Có thể merge interfaces, types thì không
Nhiều khai báo có cùng tên chỉ hợp lệ khi sử dụng `interface`. Làm như vậy sẽ không ghi đè trước đó mà tạo ra kết quả hợp nhất chứa từ tất cả các khai báo

```js
interface Person {
  name: string
}

interface Person {
    age: number
}

const viblo: Person = {
  name: "Viblo",
  age: 31
}
```
còn nếu chúng ta merge types kết quả sẽ biên dịch ra lỗi `Duplicate identifier`
```js
type Person = {
  name: string
}

type Person = {
    age: number
}

const viblo: Person = {
  name: "Viblo",
  age: 31
}
// error: Duplicate identifier 'Person'
```
## Type aliases có thể sử dụng computed properties
Từ khóa `in` có thể được sử dụng để iterate tất cả các item bên trong một tập hợp keys. Chúng ta có thể sử dụng tính năng này để 
tạo mapped types. 

Ví dụ sử dụng type aliases

```js
type keys = "firstname" | "lastname"

type Person = {
    [key in keys]: string
}

const viblo: Person = {
  firstname: "Viblo",
  lastname: "blog"
}
```

Với `interface` chúng ta sẽ không thể tận dụng các computed properties
```js
type keys = "firstname" | "lastname"

interface Person {
    [key in keys]: string
}
// error: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type
```
## Extend và implements
Trong TypeScript, chúng ta dễ dàng extends và implements interfaces. Nhưng không thể với `types`
Với `interface` để kế thừa chúng ta sử dụng `extends`:

```js
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
```

## Intersection
Intersection cho phép chúng ta kết hợp nhiều types thành một types duy nhất. Để tạo một intersection types chúng ta dùng `&`:
```js
type Name = {
  name: string
};

type Age = {
  age: number
};

type Person = Name & Age;
```

Chúng ta cũng có thể làm điều này với `interface`:
```js
interface Name {
  name: “string”
};

interface Age {
  age: number
};

type Person = Name & Age;
```

# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về types (type aliases) và interface và một số điểm khác biệt giữa chúng. Dựa theo các trường hợp chúng ta lựa chọn loại nào phù hợp với trường hợp của bạn. Cảm ơn các bạn đã theo dõi bài viết <3

Tài liệu tham khảo:
- https://www.typescriptlang.org/