![](https://res.cloudinary.com/practicaldev/image/fetch/s--HXqXbuuL--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v0w80b9y3ludvkwplds7.png)

# 1. Giới thiệu
Với Rust, **generics** là một khái niệm sinh ra nhằm tránh việc trùng lặp code khi xử lý một logic cho nhiều kiểu dữ liệu khác nhau. Nghe vẫn hơi mơ hồ nhỉ 🤨 Chúng ta sẽ tìm hiểu chi tiết hơn ngay nhé :D


Ví dụ bên dưới khá dễ hiểu, chúng ta sẽ đi tìm giá trị lớn nhất trong 1 mảng số nguyên.

```rust
fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {}", largest);
    assert_eq!(*largest, 100);
}
```

Ví dụ thứ 2, chúng ta tìm giá trị lớn nhất của 2 mảng và in ra chúng. Code vẫn chạy đúng nhưng logic vòng lặp tìm giá trị lớn nhất bị lặp lại, trông rất cồng kềnh.

```rust
fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {}", largest);

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {}", largest);
}
```


Ở ví dụ thứ 3,  chúng ta sẽ chuyển logic tìm giá trị lớn nhất thành một hàm riêng và gọi lại khi cần thiết.
```rust
fn largest(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);
    assert_eq!(*result, 100);

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let result = largest(&number_list);
    println!("The largest number is {}", result);
    assert_eq!(*result, 6000);
}
```

Qua 3 ví dụ trên, code đã dần dần được gọn và tối ưu hơn qua các bước sau:
1. Xác định phần code trùng lặp
2. Đưa các code trùng lặp thành 1 hàm riêng và chỉ định tham số đầu vào, giá trị trả về.
3. Thay phần logic trùng lặp bằng lời gọi hàm.

Nếu hàm largest chúng ta dùng không chỉ cho kiểu dữ liệu i32 mà các kiểu dữ liệu khác nữa như char, float, ... thì sao 🤔 Chúng ta sẽ viết thêm hàm với tham số đầu vào là các kiểu dữ liệu cần xử lý. Nhưng có vẻ như thế thì logic code lại bị trùng lặp nhiều rồi 😅 Đây là lúc chúng ta cần sử dụng đến **generic**

## 2. Các kiểu dữ liệu Generic (Generic Data Types)

### Generic với hàm

Ở ví dụ dưới đây, chúng ta muốn tìm thêm ký tự lớn nhất trong 1 mảng các ký tự. Tuy logic y hệt như cách tìm giá trị lớn nhất trong 1 mảng số nguyên, nhưng giá trị đầu vào ở hàm `largest_32` trước đó phải là kiểu `i32`. Ta đành phải tạo 1 hàm mới là `largest_char`. Đã đến lúc chúng ta dùng **generic** để tối ưu code hơn rồi !

```rust
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {}", result);
    assert_eq!(*result, 100);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {}", result);
    assert_eq!(*result, 'y');
}
// The largest number is 100
// The largest char is y
```

Cú pháp khi sử dụng **generic** để định nghĩa hàm `largest` sẽ như sau:
```rust
fn largest<T>(list: &[T]) -> &T {
   // ...
}
```

**T** là tham số định nghĩa chung cho kiểu dữ liệu mà hàm `largest` được truyền vào. **T** là viết tắt của **type**, chúng ta có thể dùng các ký tự khác như **U, A, B, C, Y, Z ...**, nhưng thường lựa chọn mặc định được quy ước là T.

Khi sử dụng tham số **T** ta, cần khai báo nó ngay sau tên hàm bằng cách đưa vào dấu **<>** để trình biên dịch hiểu rằng bạn đang sử dụng **generic** với tham số **T**.


Hàm `largest` sau khi sử dụng **generic** sẽ như sau:

```rust
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);
}
```

### Generic với struct

Chúng ta cũng có thể sử dụng **generic** với struct, cùng xem qua các ví dụ sau đây:

```rust
// Định kiểu <T> ngay sau tên của struct
// x và y đều có kiểu dữ liệu là T
struct Point<T> {
    x: T,
    y: T,
}


fn main() {
    let integer = Point { x: 5, y: 10 }; // x, y là số nguyên
    let float = Point { x: 1.0, y: 4.0 }; // x,y là số thập phân
}
```


```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    // x,y được định có cùng kiểu T. Ở đây x là số nguyên còn y là số thập phân => Lỗi
    let wont_work = Point { x: 5, y: 4.0 };
}

/*
|     let wont_work = Point { x: 5, y: 4.0 };
|                                      ^^^ expected integer, found floating-point number
*/
```


```rust
// Ở đây ta định nghĩa với trình biên dịch 2 kiểu là T và U.
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 }; // T và U có thể giống nhau
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 }; // T, U khác nhau
}
```

### Generic với enum

```rust
#![allow(unused)]
fn main() {
    enum Option<T> {
        Some(T),
        None,
    }
}
```

```rust
#![allow(unused)]
fn main() {
    enum Result<T, E> {
        Ok(T),
        Err(E),
    }
}
```

### Generic với methods

Chúng ta có thể sử dụng **generic** cho các implement methods của struc hay enum.

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    // trả về tham chiếu kiểu T
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
    // p.x = 5
}
```

Lưu ý rằng chúng ta phải khai báo **T** ngay sau **impl** để có thể sử dụng T trên kiểu Point **`<T>`** và không phải lúc nào kiểu tham số **generic** được định nghĩa ở struct cũng sẽ giông như ở method của struct.

    
```rust
// Định nghĩa struct Point với 2 kiểu dữ liệu X1, Y1
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> Point<X1, Y1> {
    // method mixup định nghĩa thêm X2, Y2. Vậy là ở đây chúng ta có 4 kiểu tham số **generic**
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x, // kiểu X1
            y: other.y, // kiểu Y2
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 }; // X1: i32, Y1: f64
    let p2 = Point { x: "Hello", y: 'c' }; // X2: str, Y2: char

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
    // p3.x = 5, p3.y = c
}
```
 
**Lưu ý thêm**:  Dùng **generic** không làm ảnh hướng đến hiệu suất chương trình so với khi dùng các kiểu dữ liệu cụ thể.
    
## Tài liệu tham khảo

[Rust Programing Language](https://doc.rust-lang.org/book/ch10-00-generics.html)