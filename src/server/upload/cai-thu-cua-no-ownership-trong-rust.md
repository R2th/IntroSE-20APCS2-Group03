Tự nhiên dự án mới của Cty buộc mình phải học Rust, mà ngày trước khi mình tiếp xúc Rust lần đầu mình đã chửi thầm trong bụng rồi. Rồi cái đưa đẩy sao bây giờ bắt buộc mình phải học Rust, bực bội. Nhưng mà đọc đi đọc lại nhiều lần từ từ cũng hiểu cái tự nhiên thích ngang!

Mình thấy vấn đề nguồn cơn tạo nên mọi sự khó hiểu khác trong Rust là Ownership, data lưu trên stack hay lưu trên heap đồ đó.

# 1. Các kiểu dữ liệu trong Rust.
Trong Rust chia thành 2 nhóm kiểu dữ liệu, đoạn này phiên phiến thôi nha, đọc code chắc cũng hiểu, làm biếng viết quá.
## 1.1 Scalar

Các kiểu dữ liệu thuộc nhóm `Scalar` bao gồm:
- Các kiểu số nguyên (Integer Types)
![](https://images.viblo.asia/1ce7c2f8-03a7-4461-8237-68bb9c2cd617.png)

`arch` nghĩa là phụ thuộc vào architecture của máy tính chạy chương trình mà nó có kích thước là 32-bits hoặc 64-bits
- Các kiểu số thực (Floating-Point Types) gồm: `f32` và `f64`.
- Kiểu Boolean: `bool`
- Kiểu ký tự (Character type): `char`, kiểu này giá trị chỉ được gán 1 ký tự duy nhất
```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```
- Kiểu `&str`: mặc dù kiểu này không cố định kích thước nhưng kích thước của nó phải được xác định khi compile.
```Rust
fn main() {
   let mut s = "abc";
   s = "abcde";
}
```
Rõ ràng từ dòng 2 đến dòng 3 kích thước của `s` đã tăng lên nhưng Compiler vẫn xác định được kích thước ở mỗi giai đoạn trong khi compile.

## 1.2 Compound
Các kiểu dữ liệu thuộc nhóm `Compound` bao gồm:
- Tuple
```Rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

- Array
```Rust
fn main() {
    let a = [1, 2, 3, 4, 5];
    let b = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

    println!("{:?}", a);
    println!("{:?}", b);
}
```
Lưu ý là array trong rust sẽ không có bất cứ phương thức nào như pop hoặc push nhằm thay đổi độ dài của array, hoặc ngay cả khi triển khai code như sau:
```Rust
fn main() {
    let mut a = [1, 2, 3, 4, 5];
    let b = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
    a[5] = 6;

    println!("{:?}", a);
    println!("{:?}", b);
}
```
Mặc dù khi compile không hề phát hiện lỗi, nhưng khi chạy sẽ báo lỗi:
```bash
thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 5', ./file.rs:4:5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```
# 2. Stack và Heap
Trong Rust, memory được chia thành 2 phần là `Stack` và `Heap`

- `Stack` hoạt động theo kiểu: Last In First Out (push, pop), các dữ liệu được lưu trên `Stack` phải là những dữ liệu có kích thước được biết trước tại thời điểm compile và kích thước không thay đổi (known-fixed size) trong suốt thời gian chạy chương trình.
- `Heap` dành cho các dữ liệu không biết trước kích thước và kích thước có thể trong khi chạy chương trình (unknown size), rồi các con trỏ (pointer) trỏ đến các dữ liệu đó mới được lưu trên`Stack`. `Heap` hoạt động nhờ vào `Memory Allocator`, mỗi khi một dữ liệu nào đó muốn được lưu trên `Heap`, `Memory Allocator` sẽ tìm vùng còn vừa đủ trên `Heap` để lưu dữ liệu vào, rồi push pointer vào `Stack`.

Vậy các kiểu dữ liệu nào được lưu trực tiếp trên Stack? Gồm: các kiểu integer, các kiểu floating-point, char, &str, các kiểu compound mà thành phần của nó chỉ gồm integer, floating-point, char, &str, các kiểu này khi lưu vào và lấy ra chỉ đơn giản là push pop `Stack`.

Còn các kiểu dữ liệu như `String`, `Vector`, các kiểu compound mà thành phần của nó có chứa `String` hoặc `Vector`, các struct tự định nghĩa có thành phần có chứa`String` hoặc `Vector` sẽ được lưu trên `Heap`.

> Khúc này là thấy bắt đầu nhức nhức cái đầu, như mới vừa quất xong ly trà Phúc Long siêu đậm đặc rồi đó.

## Ba quy tắc của Ownership
- Mọi giá trị trong Rust đều có một `owner`, dù cho giá trị đó thuộc kiểu dữ liệu nào.
- Một giá trị không thể có nhiều hơn một `owner` tại một thời điểm.
- Khi `owner` đi ra khỏi scope của nó, giá trị mà nó đang mang cũng sẽ bị `drop`.

## Phạm vi của biến (Scope variable) là gì 
Ví dụ:
```Rust
fn main() {
    {                      // s is not valid here, it’s not yet declared
        let s = "hello";   // s is valid from this point forward

        // do stuff with s
    }                      // this scope is now over, and s is no longer valid
}
```

đọc code chắc cũng mường tượng được ha, scope của  biến `s` được xác định bằng cặp dấu ngoặc nhọn `{}` gần nhất bao phủ lên cái sự khai báo biến `s`, ở đây `s` là `owner` của giá trị `"hello"` và giá trị này như đã nói ở trên, nó được lưu trên `Stack`. 

# 3. Minh hoạ Ownership
Nhắc lại, trong Rust, `String` và `&str` là hai kiểu dữ liệu khác nhau hoàn toàn nha, mặc dù cùng để lưu trữ chuỗi ký tự, `&str` như là kiểu có sẵn của Rust còn `String` là người ta phải code để build nó dựa trên `Vector`, và có một bộ phương thức của riêng nó.

Tại sao lại phải cần đến `String` trong khi đã có `&str`, như đã nói ở trên rồi đó, `&str` mặc dù có thể thay đổi độ dài khi chạy chương trình nhưng Compiler luôn xác định được độ dài của nó tại mỗi thời điểm thông qua quá trình compile, còn `String` sẽ dành cho các giá trị mà được user nhập vào khi chương trình chạy, do đó Compile không thể biết trước được độ dài của giá trị đó nên bắt buộc phải dùng `String`. Ví dụ:
```Rust
use std::io;

fn main() {
    println!("Please input your text.");

    let mut text = String::new();

    io::stdin()
        .read_line(&mut text)
        .expect("Failed to read line");

    println!("You text: {text}");
}
```

Dữ liệu kiểu `String` sẽ có giá trị được lưu trên `Heap`.
```Rust
#![allow(unused)]
fn main() {
    let s1 = String::from("hello");
}
```
> Bình thường khi ta khai báo một biến nhưng sau đấy không làm gì biến đó cả thì khi Compiler  compile nó sẽ hiện ra một cái warning `= note: `#[warn(unused_variables)]` on by default`, chúng ta có thể fix bằng cách đổi tên biến thành `_s1` hoặc thêm cái `#![allow(unused)]` nếu dùng `std` hoặc `#[allow(unused)]` nếu không dùng `std`.
<p></p>

`s1` sẽ được lưu trữ như thế nào trong memory:

![](https://images.viblo.asia/117e0e9c-1f9c-4920-b7b4-97b5cac172ae.png)

`s1` là một bộ data được lưu trên `Stack` bao gồm `ptr`, `len`, `capacity`, `ptr` trỏ đến giá trị thật sự là `"hello"` đang được lưu trên `Heap`, bộ data này biểu thị viêc `s1` đang là owner của giá trị `"hello"` .

khác hoàn toàn với trường hợp sau:
```Rust
fn main() {
    let x = 5;
}
```

do `x` là kiểu `i32` nên, biết trước kích thước và không thay đổi kích thước nên giá trị của `x` sẽ được lưu hoàn toàn trên `Stack`, và `x` là owner của giá trị đó.

## Phép gán (Shallow copy)
Là cách copy dữ liệu trên `Stack`, xét ví dụ sau với `String`:
```Rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1); // ERROR
    println!("{}, world!", s2);
}
```
Khi ta gán giá trị của `s1` cho `s2` thực chất là đang move quyền sở hữu của giá trị `"hello"` trên `Heap` (`ownership`) từ `s1` sang `s2`, do đó kể từ dòng 3, `s1` đã không còn giá trị gì nên khi in nó ra màn hình chương trình sẽ gặp lỗi, Compiler sẽ phát hiện lỗi này ngay lúc compile, lỗi như sau:
```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:5:28
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 | 
5 |     println!("{}, world!", s1);
  |                            ^^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)

For more information about this error, try `rustc --explain E0382`.
error: could not compile `ownership` due to previous error
```
![](https://images.viblo.asia/a6333e84-d9cf-46da-90c6-680ef8ddc643.png)

Xét tiếp ví dụ sau với `i32`:
```Rust
fn main() {
    let x = 5;
    let y = x;
    
    println!("{}", x);
    println!("{}", y);
}
```
Đoạn code này hoàn toàn hợp lệ và chạy bình thường, do `i32` là kiểu dữ liệu có giá trị được lưu trên `Stack`.

> Phép gán hay còn gọi là `Shallow copy` sẽ chỉ copy dữ liệu trên `Stack`, sẽ thực hiện các hành vi khác nhau sau đây:
> - Đối với các kiểu dữ liệu đơn biết trước kích thước như các kiểu `interger`, `floating-point`, `&str`, có giá trị được lưu trên `Stack`, do đó khi thực hiện gán, giá trị sẽ được copy ra một bản khác cũng trên `Stack` mà không vi phạm bất cứ nguyên tác nào của `Ownership`, như ví dụ ở trên, `x` vẫn hợp sau khi `y` được gán bằng `x`.  
> - Đối với các kiểu dữ liệu không biết trước kích thước như `String` và `Vector`, giá trị thực sự được lưu trên `Heap` còn `pointer` `len` `capacity` được lưu trên `Stack`, nên khi thực hiện gán các data trên `stack` sẽ được copy là một bản khác trên `stack`, nhưng nhắc lại quy tắc thứ 2 của `Ownership` là "Một giá trị không thể có nhiều hơn một `owner` tại một thời điểm.", do đó đối vớ các kiểu dữ liệu này, khi thực hiện gán sẽ là hành động `move ownership` từ biến này sang biến khác. Do đó với ví dụ với `String` ở trên, khi gán `s2` bằng `s1`, `s1` sẽ không còn giá trị gì, lệnh `pritnln!("{}", s1)` sẽ gặp lỗi.

<p></p>

### Clone (Deep copy)
Phép `clone` là cách copy giá trị trên `Heap`, xét ví dụ sau:

```Rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);
}
```

![](https://images.viblo.asia/2c95dc7b-656a-44e0-9272-ebb39ac5f8fd.png)

Lúc này `s1`, `s2` là 2 `owner` của 2 giá trị hoàn toàn nằm riêng rẽ nhau trên `Heap`, cho nên `s1` vẫn hợp lệ sau khi thực hiện phép `let s2 = s1.clone()`

Xét tiếp ví dụ với `i32`:
```Rust
fn main() {
    let a = 5;
    let b = a.clone();

    println!("{}, {}", a,b);
}
```
Mặc dù, kiểu dữ liệu `i32` lưu giá trị trên `Stack` hoàn toàn không có gì trên `Heap`, thế nhưng phép `clone()` vẫn hoạt động được, do nó xác định được tầng `Stack` là tầng sâu nhất của kiểu `i32`, do đó phép `clone()` hoàn toàn giống phép gán trong trường hợp này.

> Oke, mới đá thêm tô phở 2 muỗng bột ngọt nè.

## Ownership với Function

Xét ví dụ sau với `String`:
```Rust
fn main() {
    let s = String::from("hello");  // s comes into scope

    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here
                                    
    println!("{}", s); // ERROR

}

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.
```

Ở dòng đầu, chúng ta khai `s` là một biến kiểu `String`, `s` lúc này đang là `owner` của giá trị `"hello"` đang được lưu trên `Heap`

Ở dòng tiếp theo chúng ta gọi hàm `takes_ownership(s)` với tham số truyền vào là `s`, nhìn khai báo của hàm là ```fn takes_ownership(some_string: String) String{...}```, chúng ta có thể hiểu nôm na là đầu tiên gán `some_string = s` lúc này `ownership` của giá trị `"hello"` đã được chuyển từ `s` sang cho `some_string`, sau đó chạy code của hàm với `some_string`, mặt khác nhắc lại kiến thức của `variable scope` thì `scope` của  `some_string` chỉ là nội bộ hàm `take_ownership`, kết thúc hàm này `some_string` sẽ bị `drop`, chính vì thế lệnh `pritnln!("{}", s)` sẽ bị lỗi do `s` đang không có giá trị nào. 

Xét tiếp ví dụ với `i32`:
```Rust
fn main() {
    let x = 5;                      // x comes into scope

    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it's okay to still
                                    // use x afterward
     println!("{}", x);

}

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.
```

Ở dòng đầu, vẫn là khai báo `x` đang là `owner` của giá trị `5` được lưu trên `Stack`. 

Ở dòng tiếp thep, chúng ta gọi hàm `makes_copy(x)`, với tham số truyền vào là `x`, hiểu nôm na là đầu tiên gán `some_integer = x`, nhắc lại kiến thức về phép gán với kiểu `i32` thì lúc này thực chất `x` và `some_integer` đang là 2 `owner` của 2 giá trị nằm riêng biệt trên `Stack`, tiếp theo chúng ta thực hiện code của hàm `makes_copy()` đối với `some_integer`, kết thúc hàm `some_integer` sẽ bị `drop`, tuy nhiên do `ownership` của `x` và `some_integer` hoàn toàn nằm riêng biệt nhau nên dù `some_integer` bị `drop` thì `x` vẫn còn giá trị. Do đó đoạn code trên hoàn toàn không có lỗi nào.

## Làm thế nào để bảo toàn ownership cho String khi gọi hàm?
Đơn giản là chúng ta cho hàm return một `ownership`:

```Rust
fn main() {
    let s1 = String::from("hello");     // s2 comes into scope

   let s1 = takes_and_gives_back(s1);
   
   println!("{}", s1);
}

// This function takes a String and returns one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
                                                      // scope
    println!("{}", a_string);
    a_string  // a_string is returned and moves out to the calling function
}
```

Đầu tiên sẽ lẽ gán `a_string = s1`, `ownership` của `"hello"` lúc này được `move` từ `s1` sang cho `a_string`, tuy nhiên ở giá trị trả về của hàm lúc này là `String`, cho nên khi ra khỏi hàm `ownership` lại được `move` ngay từ `a_string`  về lại `s1`.

Tại sao lại phải `let s1` tận 2 lần, do mặc định các biến trong Rust là `immutable`, nên data của `s1` không được phép gán lại nên đành phải chọn cách khai báo đè lại biến `s1`, để khắc phục điều này chúng ta có thể sửa code như sau:
```Rust
fn main() {
    let mut s1 = String::from("hello");     // s2 comes into scope

   s1 = takes_and_gives_back(s1);
   
   println!("{}", s1);
}

// This function takes a String and returns one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
                                                      // scope
    println!("{}", a_string);
    a_string  // a_string is returned and moves out to the calling function
}
```
Đơn giản là thêm `mut` vào khai báo `s1`.

>Tới đây là chỉ cần thêm ít đèn, ít nhạc là tao có thể đi cảnh được luôn đó. 
<p></p>
Nhưng sẽ thật rườm rà nếu cứ phải trả về `ownership` ở mỗi hàm kèm theo là giá trị tính toán mà ta muốn hàm trả về, như ví dụ sau:

```Rust
fn main() {
    let s1 = String::from("hello");

    let (s2, len) = calculate_length(s1);

    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() returns the length of a String

    (s, length)
}
```

Thật may là Rust đã hỗ trợ cho chúng ta `References and Borrowing`, phép này sẽ cho chúng ta được quyền truy cập vào giá trị của biến mà không ảnh hưởng gì đến `ownership` của biến đó. Tạm thời giới thiệu trước vậy thôi chứ đợi bữa nào hứng mới viết tiếp về cái này.

# 4. Tổng kết
Tổng kết có mấy ý như sau:
>- Các kiểu dữ liệu biết trước kích thước sẽ được lưu giá trị trên `Stack`
>- Các kiểu dữ liệu không biết trước sẽ được lưu giá trị trên `Heap`
>- Phép gán là `Shallow copy`, chỉ copy giá trị trên Stack. Thực hiện phép gán với kiểu dữ liệu có kích thước biết trước sẽ tạo ra một `ownership` mới riêng biệt với `ownership` cũ, thực hiện phép gán với kiểu dữ liệu có kích thước không biết trước sẽ `move ownership` từ biến cũ sang biến mới
>- Phép `clone()` là `Deep copy`, copy giá trị trên `Heap`, phép `clone()` có thể hoạt động với cả các kiểu dữ liệu biết trước và không biết trước kích thước. Ngộ nghĩnh nhỉ, lạ lùng nhỉ!
>- Khi một biến ra khỏi phạm vi của nó, nó sẽ bị `drop`
>- Muốn bảo toàn một `ownership` khi gọi một hàm thì hàm đó hoặc trả về một `ownership` khác hoặc tham số truyền vào hàm ở dạng `reference`.