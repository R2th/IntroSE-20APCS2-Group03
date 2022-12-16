![image.png](https://images.viblo.asia/7661cddb-cb7c-4f1e-96d2-e1feb0917d16.png)

## Stack & Heap

Nhiều ngôn ngữ lập trình không yêu cầu bạn phải hiểu về **stack** và **heap** quá rõ rãng. Tuy nhiên, với một ngôn ngữ lập trình hệ thống như **Rust**, một giá trị nằm trên **stack** hay **heap** sẽ ảnh hưởng đến cách nó hoạt động và tương tác với các thành phần khác trong chương trình. Để nắm rõ các khái niệm như **owership** hay **reference** yêu cầu bạn hiểu rõ về 2 phân vùng nhớ này.

Cả **stack** và **heap** đều là những vùng nhớ có sẵn giúp lưu trữ giá trị khi thực thi chương trình. 
- **Stack** hoạt động theo cơ chế **Last In, First Out (LIFO)**, các giá trị lưu trên **stack** đều có kích thước có định.
- **Heap** là vùng nhớ mà các giá trị được lưu trên đó không xác định kích thước (dùng để lưu những phần tử có kích thước thay đổi). Khi lưu giá trị trên **heap**, chúng ta yêu cầu một lượng bộ nhớ nhất định, một phần vị trí trống đủ lớn trong **heap** sẽ được cấp phát cùng với đó là trả về 1 con trỏ (pointer) lưu địa chỉ của vị trí vừa được cấp phát. Khi tương tác với dự liệu trong **heap**, chúng ta sẽ phải tương tác qua con trỏ được trả về trước đó. Con trỏ chứa địa chỉ ô nhớ với kích thước cố định, tất nhiên sẽ được lưu ở bộ nhớ **stack** :D

![image.png](https://images.viblo.asia/7d2aa4f0-dcad-4868-8b08-3e123993e1e4.png)

Lưu trữ dữ liệu trên **stack** nhanh hơn trên **heap** do trình cấp phát không bao giờ phải tìm kiếm nơi lưu trữ dữ liệu mới, vì nó luôn ở trên đỉnh của **stack**. Với **heap** sẽ đòi hỏi nhiều công việc hơn khi phải tìm một không gian bộ nhớ trống đủ lớn để chứa dữ liệu. Cùng với đó, việc lấy dữ liệu ra trên **stack** sẽ đơn giản hơn rất nhiều so với việc phải thông qua con trỏ để truy cập được tới giá trị được lưu trên **heap**.

Dữ liệu trên **stack** sẽ được giải phóng sau khi được lấy ra khỏi ngăn xếp. Nhưng với vùng nhớ **heap**, việc cấp phát và thu hồi sao cho những dữ liệu không còn được sử dụng sẽ được giải phóng, tránh gây lãng phí bộ nhớ là một điều rất quan trọng.

Theo dõi những đoạn mã nào đang sử dụng dữ liệu nào trên **heap**, giảm thiểu số lượng dữ liệu trùng lặp cũng như dọn dẹp dữ liệu không sử dụng trên **heap** để tối ưu không gian lưu trữ là những gì khái niệm **ownership** sẽ giải quyết. Khi hiểu được **ownership** là gì, chúng ta sẽ không cần phải suy nghĩ về **stack** và **heap** một cách thường xuyên.

## Ownership

**Ownership** là một khái niệm hoàn toàn mới được **Rust** giới thiệu, có chức năng đảm bảo tính an toàn, tối ưu cho bộ nhớ mà không cần đến trình dọn rác (garbage collector) như các ngôn ngữ khác. 

Các ngôn ngữ lập trình khác nhau thì có những cách tiếp cận khác nhau để quản lý bộ nhớ (memory). Một số ngôn ngữ như **Java, Golang ...**, thì sử dụng **garbage collection** sẽ tự động giải phóng các ô nhớ không còn được sử dụng, các ngôn ngữ khác thì yêu cầu người dùng phải tự giải phóng bộ nhớ bằng tay (điển hình là C/C++). Với **Rust**, đội ngũ phát triển đã đề xuất một cách tiếp cận mới cho vấn đề quản lý bộ nhớ, đó là **ownership**. **Ownership** được định nghĩa là một bộ các quy tắc chỉ định cách quản lý bộ nhớ trong **Rust**, nếu bất kỳ quy tắc nào bị vi phạm, chương trình sẽ không được biên dịch.

**Các quy tắc ownership**
- Mỗi giá trị trong Rust có một biến được gọi là chủ sở hữu (ownership) của nó.
- Chỉ có thể có một chủ sở hữu tại một thời điểm.
- Khi chủ sở hữu đi ra khỏi phạm vi, bộ nhớ lưu giá trị đó sẽ được giải phóng.

Khi chúng ta hiểu **ownership**, chúng ta sẽ có một nền tảng vững chắc để hiểu các tính năng làm cho Rust trở nên độc đáo. Chúng ta sẽ tìm hiểu **ownership** qua các ví dụ về cấu trúc dữ liệu **strings** dưới đây.

### Phạm vi của biến (Variable Scope)

```rust
#![allow(unused)]

fn main() {            // Biến s chưa hợp lệ, vì chưa được định nghĩa
    let s = "hello";     // s có giá trị từ thời điểm này
                                                
}                      // phạm vi này hiện đã kết thúc và s không còn hợp lệ
```

Tại thời điểm này, mối quan hệ giữa phạm vi và thời điểm các biến có giá trị tương tự như trong các ngôn ngữ lập trình khác. Tiếp theo đây là ví dụ với kiểu **String**.

### Kiểu String

Để minh họa cho các quy tắc **ownership**, chúng ta cần một kiểu dữ liệu phức tạp hơn các kiểu dữ liệu nguyên thủy. Các kiểu dữ liệu nguyên thủy đều có kích thước xác định, được lưu trữ trên **stack**, lấy ra khỏi **stack** khi phạm vi của chúng kết thúc và có thể được sao chép nhanh chóng để tạo một ra biến mới, trong một phạm vi khác. 

Với các dữ liệu được lưu trên **heap**, mà trong các ví dụ cụ thể dưới đây sẽ là kiểu **String** sẽ giúp chúng ta khám phá cách **Rust** biết khi nào cần dọn dẹp bộ nhớ.


```rust
#![allow(unused)]

fn main() {
    // Tạo mới biến s kiểu String có giá trị khởi tạo là "hello"
    let s = String::from("hello");
}
```

```rust
fn main() {
    let mut s = String::from("hello");

    s.push_str(", world!"); // push_str() sẽ thêm chuỗi ", world" vào s

    println!("{}", s); // Kết quả in ra: `hello, world!`
}
```

Với biến **s** kiểu **String** được cấp phát trên **heap**, ta có thể thay đổi nội dung, độ dài tùy ý. Nó rất phù hợp dùng để lưu trữ các chuỗi không xác định trước kích thước cụ thể chẳng hạn như thông tin đầu vào người dùng nhập chẳng hạn.

Với kiểu **&str** (string literal) như ở phần trên, giá trị chuỗi được lưu ở **stack** với kích thước cố định sẽ không thể thay đổi nội dung sau khi khởi tạo.

```rust
fn main() {
   let mut a = "conglt";
   println!("{}", a);
}
```


```
Compiling playground v0.0.1 (/playground)
warning: variable does not need to be mutable
 --> src/main.rs:2:8
  |
2 |    let mut a = "conglt";
  |        ----^
  |        |
  |        help: remove this `mut`
  |
```

### Bộ nhớ và Cấp phát (Memory and Allocation)

Như chúng ta đã biết, khi một biến kiểu **String** được khởi tạo thì biến đó sẽ được cấp phát bộ nhớ trên **heap**. Và khi thao tác xong,  bộ nhớ sẽ cần được giải phóng không gian lưu trữ giá trị.

Ở một số ngôn ngữ sử dụng garbage collector (GC), GC sẽ theo dõi và tự động dọn dẹp bộ nhớ không còn được sử dụng nữa,  do đó chúng ta không cần phải suy nghĩ quá nhiều. Trong hầu hết các ngôn ngữ không có GC, trách nhiệm của chúng ta là xác định khi nào bộ nhớ không còn được sử dụng nữa và gọi lệnh để trả lại bộ nhớ. Thực hiện điều này một cách chính xác việc giải phóng là một vấn đề không hề đơn giản chút nào 😅. Nếu chúng ta quên, sẽ gây lãng phí bộ nhớ. Nếu chúng ta làm giải phóng bộ nhớ quá sớm, chúng ta sẽ có một biến không hợp lệ. Nếu chúng ta làm điều đó hai lần, đó cũng là một lỗi. Trong môn lập trình C/C++ ở thời đại học, cô giáo đã từng than thở với tụi sinh viên chúng tôi rằng: dù cô luôn cực kỳ cẩn thận trong việc cấp phát và giải phóng bộ nhớ khi viết C/C++, nhưng chẳng khi nào hết được lỗi và tối ưu chương trình. Với các ứng dụng nhỏ thì cũng ko phải vấn đề qúa lớn nhưng với những phần mềm lớn, cần sự tối ưu bộ nhớ tốc độ đến từng mili, micro thì cũng là một vấn đề làm đau đầu nhiều thế hệ lập trình viên C/C++ xưa.

**Rust** đi theo một con đường khác: bộ nhớ sẽ tự động được giải phóng khi biến vượt ra khỏi phạm vi.

```rust
fn main() {
    {
        let s = String::from("hello"); // s có giá trị từ thời điểm này trở đi

        // làm việc với s
        
    } // phạm vi này hiện đã kết thúc, bộ nhớ của biến s được giải phóng 
    
    println!("{}", s);
}
```

```
   Compiling playground v0.0.1 (/playground)
error[E0425]: cannot find value `s` in this scope
  --> src/main.rs:10:20
   |
10 |     println!("{}", s);
   |                    ^ not found in this scope
```

Khi biến s ra khỏi phạm vị, **Rust** sẽ tự động gọi một hàm [drop](https://doc.rust-lang.org/std/ops/trait.Drop.html#tymethod.drop) để giải phóng bộ nhớ.

Trông mọi thứ cũng đang rất đơn giản phải không ? Như kiểu phạm vi biến bình thường thôi mà nhỉ 🤔 Chúng ta hãy cùng đến với các ví dụ phức tạp hơn nhé.

### Ways Variables and Data Interact: Move

```rust
fn main() {
    let x = 5;
    let y = x;
}
```

Ở ví dụ trên, biến x được gán bằng 5, sau đó copy giá trị của x và gán vào y. Chúng ta sẽ có 2 biến x, y đều có giá trị là 5. 

=> Khá là cơ bản phải không 😅 Vì x và y đều là kiểu dữ liệu nguyên thủy, được xác định kích thước và lưu trên **stack**. Nhưng nếu lặp lại thao tác trên với các biến kiểu **String** thì sẽ khác rất nhiều đấy 😉

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
}
```

Trước tiên, chúng ta hãy cùng xem các giá trị lưu trữ trên biến **s1**

![](https://doc.rust-lang.org/book/img/trpl04-01.svg)

Biến **s1** lưu trữ 3 thông tin, tất nhiên là phần dữ liệu được lưu trên **stack**:
- con trỏ **ptr** trỏ đến nội dung của chuỗi trên heap
- **len** lưu độ dài của chuỗi (tính bằng bytes)
- **capacity** lưu kích thước bộ nhớ đang được cấp phát cho chuỗi (tính bằng bytes)


Khi gán s2 bằng s1, thực chất là việc copy con trỏ, len và capacity trên **stack** chứ không phải copy giá trị chuỗi ở trên **heap**.

![](https://doc.rust-lang.org/book/img/trpl04-02.svg)



Nếu khi gán s2 = s1thì trình biên dịch sẽ tự hiểu là copy nông (shalllow copy) thay vì copy sâu (deep copy). Do đó, chỉ phần con trỏ, len và capacity được copy thay vì dữ liệu trên **heap** từ đó tiết kiệm được 1 lượng bộ nhớ trên **heap**.

![](https://doc.rust-lang.org/book/img/trpl04-03.svg)


```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);
}
```

```
 Compiling playground v0.0.1 (/playground)
warning: unused variable: `s2`
 --> src/main.rs:3:9
  |
3 |     let s2 = s1;
  |         ^^ help: if this is intentional, prefix it with an underscore: `_s2`
  |
  = note: `#[warn(unused_variables)]` on by default

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
warning: `playground` (bin "playground") generated 1 warning
error: could not compile `playground` due to previous error; 1 warning emitted
```

Hummm 🤔, sao lại lỗi nhỉ ? Biến s1 lẫn s2 vẫn đang trong phạm vi mà 🤨

Chúng ta hãy để ý rằng, khi copy biến s2 từ s1 thì 2 con trỏ đang trỏ đến 1 vùng nhớ **heap** lưu trữ giá trị của chuỗi.  Vậy sẽ có 1 vấn đề lớn ở đây là khi cả 2 biến s1, s2 đều ra khỏi phạm vi tồn tại cùng một chỗ, sẽ dẫn đến việc giải phóng bộ nhớ 2 lần => Lỗi  **double free error**

Ở đây, để đảm bảo an toàn cho bộ nhớ thì Rust sẽ xử lý vấn đề bằng cách vô hiệu hóa s1 khi biến s2 được gán bằng s1. Cho nên khi chúng ta in biến s1 ra sẽ bị thông báo lỗi.

```rust
#[warn(unused_variables)]
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    
    // Bây giờ chỉ có thể truy cập đến nội dung của chuỗi bằng s2
    println!("{}, world!", s2); // hello, world!
}
```

![](https://doc.rust-lang.org/book/img/trpl04-04.svg)

### Deep Copy

Chúng ta sẽ sẽ dụng hàm `clone` khi muốn copy sâu dữ liệu trên **heap**.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2); // s1 = hello, s2 = hello
}
```

### Ownership và Functions

Chúng ta cùng xem ví dụ dưới đây

```rust
fn main() {
    let s = String::from("hello");  // s được khởi tạo
    takes_ownership(s);            // giá trị của s được truyền vào hàm takes_ownership

    let x = 5;                     // khởi tạo biến x
    makes_copy(x);                // truyền x vào hàm makes_copy
    
    println!("s is {}", s);
    println!("x is {}", x);

} // Hết phạm vi của 2 biến s, x

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
```

Output kỳ vọng của chúng ta sẽ là:
```
hello
5
s is hello
x is 5
```

Nào, cùng thử chạy đoạn code này xem sao :D

```
error[E0382]: borrow of moved value: `s`
 --> src/main.rs:8:25
  |
2 |     let s = String::from("hello");  // s được khởi tạo
  |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait
3 |     takes_ownership(s);            // giá trị của s được truyền vào hàm takes_ownership
  |                     - value moved here
...
8 |     println!("s is {}", s);
  |                         ^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` (in Nightly builds, run with -Z macro-backtrace for more info)
```

Ồ lỗi kìa 😓, ở dòng thứ 8 `println!("s is {}", s);`. Tại sao nhỉ, biến s đang còn trong phạm vi mà, hay việc truyền s vào hàm `takes_ownership` đã làm thay đổi gì đó 🧐 Chúng ta thử comment dòng đó lại và chạy lại thử xem có bị lỗi dòng thứ 9 `println!("x is {}", x);` đó không ?

```
hello
5
x is 5
```

Chương trình hoàn toàn bình thường, chúng ta vẫn in x ra được bình thường.

Sự khác biệt ở đây giữa **s** và **x** là kiểu dữ liệu **String** và **i32**. Với các biến có kiểu dữ liệu nguyên thủy như x, khi truyền dưới dạng tham số vào hàm, nó sẽ copy giá trị sang 1 biến khác và sử dụng nó trong hàm (vì việc copy trên stack rất đơn giản). Với các kiểu dữ liệu như **String** thì khi truyền tham số vào hàm sẽ truyền chính con trỏ liên kết với dữ liệu trong **heap**, khi hàm xử lý xong (ở cuối scope) thì bộ nhớ trên heap sẽ được giải phóng luôn.

=> Do đó, sau khi gọi hàm `takes_ownership` thì biến s đã không còn hợp lệ nên không thể in ra màn hình. Trong khi đó, x chỉ truyền giá trị copy sang hàm nên đến hết `fn main` thì x mới không còn hợp 


### Return Values and Scope

```rust
fn main() {
    let s1 = gives_ownership();        
    let s2 = String::from("hello"); 
    let s3 = takes_and_gives_back(s2);         
}

fn gives_ownership() -> String {    
    let some_string = String::from("yours"); 

    some_string
}

fn takes_and_gives_back(a_string: String) -> String { 
    a_string 
}
```


Việc gán s1 bằng giá trị trả về của hàm `gives_ownership`. Theo logic mà chúng ta đang hiểu thì khả năng khi chạy chương trình sẽ bị lỗi khi biến `some_string` sẽ được giải phóng ở cuối hàm `gives_ownership` => biến s1 sẽ bị lỗi. Tương tự việc gán s3 bằng giá trị trả về của hàm `takes_and_gives_back` cũng là 1 dấu chấm hỏi. Tuy nhiên, khi chạy chương trình thì không hề có lỗi nào xuất hiện 😕

**Ownership** của một biến luôn tuân theo nguyên tắc: việc gán một giá trị cho một biến khác sẽ di chuyển nó (di chuyển sang phạm vi khác) và khi nào biến vượt khỏi phạm vi thì sẽ được giải phóng. Ở trên việc "gán" giá trị trả về của các hàm cho các biến khác sẽ di chuyển phạm vi các biến **String** kia => cho nên chúng ta vẫn có 1 đoạn code chạy bình thường như thế đó.

## Kết bài

**Ownership** là một khái niệm rất hay và quan trọng làm nên sự đặc trưng của ngôn ngữ Rust.Khi chúng ta tiếp cận các khái niệm quan trọng khác trong Rust như **Reference**, **Borrowing** thì việc cần hiểu về ownership là điều tiên quyết. 


## Tài liệu tham khảo

[The Rust Programming Language](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)