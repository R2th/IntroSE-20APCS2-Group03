Ngôn ngữa lập trình nào mà không có `Struct`.

`Struct` thì cũng na ná với `Tuple`, nhưng khác ở 1 chỗ: `Struct` truy cập vào dữ liệu bằng tên trường, còn `Tuple` thì bằng index.

Định nghĩa 1 `Struct` và khai báo 1 instance của `Struct` đó đơn giản như sau:
```Rust
#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");

    println!("{}", user1.email);
    println!("{:?}", user1);
    println!("{:#?}", user1);
}
```

Kết quả:
```bash
anotheremail@example.com
User { active: true, username: "someusername123", email: "anotheremail@example.com", sign_in_count: 1 }
User {
    active: true,
    username: "someusername123",
    email: "anotheremail@example.com",
    sign_in_count: 1,
}
```

Đọc code chắc cũng dễ hiểu ha, ở đây chỉ cần chú ý là một `Struct` muốn in ra màn hình được bằng `println!()` thì phải có `#[derive(Debug)]` ở trên đầu và in bằng cú pháp `println!("{:?}", user1)` hoặc `println!("{:#?}", user1)`

## Ownership với Struct

Oke, bây giờ mình sẽ test thử các tính chất của `Ownership` đối với `User`, nhìn vào thì `User` có 2 trường là `username` và `email` thuộc kiểu `String`, như bài trước mình đã nói, một `Struct` mà trong thành phần của nó có chứa kiểu `String` hoăc `Vector` thì giá trị sẽ được lưu trên `Heap`, mình không biết rõ là nó sẽ lưu theo kiểu `active` `sign_in_count` lưu trên `Stack`, `username` `email` lưu trên `Heap` hay là lưu toàn bộ `active` `sign_in_count` `username` `email`đều lưu trên `Heap`, nhưng mà thôi cũng không cần suy cặn kẽ làm gì, vì hành vi của `User` ở 2 trường hợp này đều giống nhau.

Xét ví dụ:
```Rust
#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = user1;

    println!("{:#?}", user1); // ERROR
} 
```

Do giá trị của `user1` được lưu trên `Heap`, nên khi gán `let user2 = user1` thì `ownership` của giá trị đó đã được chuyển từ `user1` sang `user2`  nên `println!("{:#?}", user1);` sẽ bị lỗi.

Gán không được thì ta dùng `clone`:
```
#[derive(Debug, Clone)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = user1.clone();

    println!("{:#?}", user1);
    println!("{:#?}", user2);
}
```

Kết quả
```bash
User {
    active: true,
    username: "someusername123",
    email: "someone@example.com",
    sign_in_count: 1,
}
User {
    active: true,
    username: "someusername123",
    email: "someone@example.com",
    sign_in_count: 1,
}
```

> Lưu ý:  một `Struct` muốn sử dụng được  `clone` thì phải khai báo `#[derive(Clone)]` cho `Struct` đó

Xét tiếp một ví dụ với struct đơn giản chỉ chứa các trường có kiểu dữ liệu biết trước kích thước:
```Rust
#[derive(Debug, Clone, Copy)]
struct Location {
    x: i32,
    y: i32,
}

fn main() {
    let a = Location { x: 1, y: 1 };

    let b = a;

    println!("{:#?}", a);
    println!("{:#?}", b);
}
```

Dễ hiểu ha, do `Location` chỉ chứa 2 trường giá trị được lưu trên `Stack` nên phép gán không làm ảnh hưởng đến `ownership`, chỉ có điều một `Struct` muốn thực hiện phép gán thì phải khai báo `#[derive(Clone, Copy)]`, chú ý có `Copy` là phải có `Clone`, có `Clone` không nhất thiết phải có `Copy`, nếu có `Copy` mà không có `Clone` thì khi compile sẽ hiển thị lỗi sau:
```Bash
383 | pub trait Copy: Clone {
    |                 ^^^^^ required by this bound in `Copy`
    = note: this error originates in the derive macro `Copy` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider annotating `Location` with `#[derive(Clone)]`
    |
10  | #[derive(Clone)]
    |

error: aborting due to previous error

For more information about this error, try `rustc --explain E0277`.
```

Vậy nếu muốn `Location` có hành vi như `User` thì làm như thế nào,  đơn giản bỏ `Copy` đi, lúc này phép gán sẽ chuyển `ownership`, muốn `clone()` được thì phải có `Clone`:
```Rust
#[derive(Debug, Clone)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    let rect2 = rect1.clone();

    let rect3 = rect2;

    println!("{:#?}", rect1);
    println!("{:#?}", rect2); // ERRO
    println!("{:#?}", rect3);
}
```

Vậy tại sao chúng ta lại không thêm `Copy` cho `User` struct ở trên để nó có thể gán mà không ảnh hưởng đến `ownership`, cấm nha, Rust nghiêm cấm add `Copy` cho struct nào có ít nhất 1 trường có kiểu dữ liệu có kích thước không biết trước - giá trị lưu trên `Heap`.

## Tạo một instance từ một instance khác

Dưới đây là các cách tạo, code cũng dễ hiêu:
```Rust
#[derive(Debug, Clone)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        active: user1.active,
        username: user1.username.clone(),
        email: user1.email.clone(),
        sign_in_count: user1.sign_in_count,
    };

    println!("{:#?}", user1);
    println!("{:#?}", user2);
}
```
<p></p>

```Rust
#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    // --snip--

    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("another@example.com"),
        username: String::from("anotheruser"),
        ..user1
    };

    println!("{:#?}", user1);
    println!("{:#?}", user2);
}
```

## Unit-like struct
Chúng ta có thể định nghĩa 1 struct mà không có trường nào:
```Rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

## Methods và Associated Functions

Định nghĩa `accociated functions` đơn giản như sau:
```Rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let sq = Rectangle::square(3);
}
```

Nhìn cũng dễ hiểu cách định nghĩa và cách sử dụng ha.

Định nghĩa methods thì như sau:
```Rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
     fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}
```

Cũng tách thành 2 `impl` như sau:
```Rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
    println!("{:#?}", rect1);
    println!("{:#?}", rect2);
    println!("{:#?}", rect3);
}
```

Nhìn cũng đơn giản dễ hiểu ha, chỉ cần chú ý là ở đây chúng ta đang không khai báo `Copy` cho `Rectangle` nên bắt buộc các function trong `impl Retangle` chúng ta phải dùng `reference &` để đảm bảo `ownership` cho các biến. 

Do `Rectangle` chỉ có 2 trường thuộc kiểu dữ liệu `i32` nên ta có thể khai báo `Copy` cho nó, lúc này các function trong `impl Retangle` không cần phải phải sử dụng `reference &` nữa mà vẫn bảo toàn `ownership` của các biến.
```
#[derive(Debug, Clone, Copy)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(self, other: Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(rect3));
    println!("{:#?}", rect1);
    println!("{:#?}", rect2);
    println!("{:#?}", rect3);
}
```