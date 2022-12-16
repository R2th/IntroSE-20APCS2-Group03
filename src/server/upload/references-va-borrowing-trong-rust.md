![image.png](https://images.viblo.asia/d987072f-c562-46e3-b073-6440c5f41ca1.png)

Trước khi tìm hiểu references và borrowing thì chúng ta cần nắm được khái niệm **Ownership** là gì ? Nếu các bạn chưa tìm hiểu về **ownership** thì có thể ghé qua đọc bài viết [Tìm hiểu Ownership trong Rust](https://viblo.asia/p/tim-hieu-ownership-trong-rust-YWOZrALEKQ0) của mình :D

## Tham chiếu (References) và Borrowing 

Chúng ta có một ví dụ nhỏ dưới đây:

```rust
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

Mục đích của hàm `calculate_length` là tính được độ dài của chuỗi s truyền vào.  Tuy nhiên, hàm này lại đang phải trả về cả chuỗi **s** nữa thay vì chỉ cần trả về biến **length**, hơi cồng kềnh 1 xíu 😅 . Nguyên do là nếu không trả lại chuỗi s thì vùng nhớ trên **heap** của s1 sẽ được giải phóng khi kết thúc hàm `calculate_length` và chúng ta sẽ không thể tương tác tiếp với s1 ở hàm `main` sau khi gọi `calculate_length`.

Vậy có cách nào đỡ cồng kềnh hơn được không ? Tất nhiên là có, đây là lúc chúng ta sẽ sử dụng đến khái niệm tham chiếu (references).

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

Ở đây,  `&s1` sẽ khởi tạo một tham chiếu **s** đến **s1**. Thực chất tham chiếu ở đây chính là 1 con trỏ, nó trỏ đến **s1** và từ đó có thể truy cập vào dữ liệu trên **heap** mà **s1** đang trỏ đến. **&String** mang ý nghĩa là tham chiếu đến một biến **String**.

![](https://doc.rust-lang.org/book/img/trpl04-05.svg)

Khi đi hết phạm vi của hàm `calculate_length`, **s** sẽ được giải phóng và kết thúc nhiệm vụ của nó, phạm vi của biến **s1** vẫn là ở hàm `main` nên dữ liệu lưu trên **heap** sẽ chỉ được giải phóng khi kết thúc hàm `main`.

Chúng ta gọi một hành động tạo tham chiếu như trên là **borrowing** (tạm dịch là mượn). Trong cuộc sống, bạn có thể mượn tiền hay đồ của người khác. Khi xong việc, bạn sẽ phải trả lại và bạn không sở hữu nó (ownership :D). Như ví dụ trên ta có thể hiểu là **s** mượn dữ liệu của **s1** trên **heap** và sau đó trả lại.

Chúng ta thử sửa giá trị của chuỗi qua tham chiếu ở hàm qua ví dụ dưới đây:

```rust
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}
```

```
error[E0596]: cannot borrow `*some_string` as mutable, as it is behind a `&` reference
 --> src/main.rs:8:5
  |
7 | fn change(some_string: &String) {
  |                        ------- help: consider changing this to be a mutable reference: `&mut String`
8 |     some_string.push_str(", world");
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ `some_string` is a `&` reference, so the data it refers to cannot be borrowed as mutable
```

Chúng ta không có quyền thay đổi giá trị biến thông qua tham chiếu, nếu muốn thay đổi chúng ta phải dùng đến **Mutable References** cơ :D

### Mutable References

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

Muốn thay đổi giá trị của chuỗi, chúng ta phải truyền vào hàm 1 **mutable references** (tạm dịch là tham chiếu thay đổi) cũng như thêm từ khóa "mut" khi định nghĩa **s** vì Rust mặc định các biến sẽ không thể thay đổi khi đã khởi tạo giá trị ban đầu.

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
}
```

```
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> src/main.rs:5:14
  |
4 |     let r1 = &mut s;
  |              ------ first mutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ second mutable borrow occurs here
6 | 
7 |     println!("{}, {}", r1, r2);
  |                        -- first borrow later used here
```

Rust rất chặt chẽ khi không cho tồn tài 2 tham chiếu dạng **mut** trong cùng một thời điểm. Việc 2 tham chiếu mut tồn tại cùng một thời điểm có thể gây xung đột khi cả 2 đều có thể sửa đổi dữ liệu được lưu trong **heap** . Do đó, Rust sẽ ngăn chặn điều này xảy ra.

Chúng ta cùng xem thêm 1 số ví dụ về **mutable references** :

```rust
fn main() {
    let mut s = String::from("hello");

    {
        let r1 = &mut s;
    } // r1 hết phạm vị của mình, sẽ được giải phóng. Chúng ta có thể tạo ngay 1 tham chiếu mut ở dưới mà không sợ vi phạm quy tắc ở trên.

    let r2 = &mut s;
}
```

Chạy ngon 😁 vì r1 và r2 không tồn tại cùng 1 thời điểm.


```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    let r3 = &mut s; // BIG PROBLEM

    println!("{}, {}, and {}", r1, r2, r3);
}
```

```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:14
  |
4 |     let r1 = &s; // no problem
  |              -- immutable borrow occurs here
5 |     let r2 = &s; // no problem
6 |     let r3 = &mut s; // BIG PROBLEM
  |              ^^^^^^ mutable borrow occurs here
7 | 
8 |     println!("{}, {}, and {}", r1, r2, r3);
  |                                -- immutable borrow later used here
```

Ở đây, **r1, r2 và r3** đều tham chiếu đến **s**. Rust cho phép chúng ta tạo bao nhiêu tham chiếu bất biến kiểu như r1, r2 cho cùng một biến như s cũng được, vì chúng là tham chiếu bất biến nên chả ảnh hưởng gì đến dữ liệu lưu trên **heap** cả => từ đó vẫn đảm bảo tiêu chí an toàn bộ nhớ của Rust.

Tuy nhiên, khi đã tồn tại r1, r2. Chúng ta lại tạo ra 1 tham chiếu r3 có thể thay đổi dữ liệu của s, ảnh hưởng đến việc đọc dữ liệu từ các tham chiếu bất biến kia. 

Giả dụ ban đầu tham chiếu **r1 và r2** chứa giá trị "hello", khi r3 thay đổi giá trị trên **heap** thì "hello world" chẳng hạn thì giá trị khi in ra của **r1 và r2** phải là "hello world" mới đúng, điều này chả khác nào việc thay đổi giá trị của một tham chiếu bất biến => Lỗi.

Tuy nhiên, nếu các tham chiếu bất biến r1, r2 đã được sử dụng xong, chúng ta lại có thể khởi tạo tham chiếu r3 được một cách hợp lệ. Vì công việc của r1, r2 đã xong, sự có mặt của r3 sẽ không ảnh hưởng đến r1 và r2 :D

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2); // hello and hello
    // tham chiếu r1 và r2 sẽ không được sử dụng ở phần sau

    let r3 = &mut s; // no problem
    println!("{}", r3); // hello
}
```

## Con trỏ của Rust và C/C++

Con trỏ được định là một biến lưu trữ địa chỉ ô nhớ của biến khác.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {

string food = "Burger";

cout << &food << endl; // 0x7fff604b2890
cout << food << endl; // Burger

return 0;

}
```

```rust
fn main() {
    let food = "Burger";

    println!("{}", &food); // Burger
    println!("{}", food); // Burger
}
```

Cùng là con trỏ nhưng trên C++ thì in ra giá trị địa chỉ ô nhớ, còn trên Rust thì in ra giá trị của chuỗi luôn 🤔🤔🤔

Đơn giản ở đây, đối với các hàm in output ra được thiết lập mặc định sẽ in ra giá trị mà con trỏ tham chiếu đến, vì nó phổ biến và được dùng nhiều hơn là địa chỉ của ô nhớ mà nó trỏ đến. Nếu muốn in ra địa chỉ thì chúng ta có thể làm như thế này ?

```rust
    let food = "Burger";

    println!("{:p}", &food); // 0x7ffd54dd9d60
}
````

Ngoài ra, sự khác biệt giữa con trỏ trong Rust so với C/C++ là cách quản lý con trỏ chặt chẽ hơn đến từ trình biên dịch của Rust. Trong Rust không có phép các **con trỏ null** hay con trỏ lơ lửng (dangling pointer).






## Tài liệu tham khảo

[Rust Programing Language](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

https://stackoverflow.com/questions/64167637/is-the-concept-of-reference-different-in-c-and-rust