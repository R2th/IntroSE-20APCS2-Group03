Bài viết được lược dịch từ [Sharing State in Rust Closures](https://medium.com/@buterajay/sharing-state-in-rust-closures-e8f36d519e6a). Bạn có thể vào bài viết gốc để xem chi tiết.

Khi bắt đầu sử dụng Rust, tôi đã phải đối mặt với một số vấn đề về sự thay đổi stage. Ví dụ, khi sử dụng streaming type, tôi cần result từ closures bên trong nó. Closures là một tính năng phổ biến trong nhiều ngôn ngữ, và dễ sử dụng nếu chương trình của bạn chỉ là 1 chuỗi các hàm kế tiếp nhau (thế thì đâu cần đến rust). Vấn đề là làm sau bạn có thể thay đổi một biến bên ngoài từ trong closures trong khi vẫn có thể sử dụng nó bên ngoài closures? Bài viết này giải thích một cách cơ bản giải pháp cho trường hợp này cả trong chương trình đơn luồng và đa luồng.

Bắt đầu từ ví dụ cơ bản, bạn muốn cả 2 lệnh print trong đoạn chương trình dưới đây in ra c=1, tức là bạn muốn lệnh tăng c bên trong closures ảnh hưởng đến cả biến c bên ngoài.
```rust
fn main() {
    let mut c = 0;
    let mut closure = || {
        c += 1;
        println!("in the closure, c={}", c);
    };
    closure();
    println!("out of the closure, c={}", c);
}
```
Nhưng rust compiler lại cho bạn 1 thông báo lỗi vô cùng hợp lý:
```
error[E0502]: cannot borrow `c` as immutable because it is also borrowed as mutable
  --> test.rs:23:19
   |
14 |     let mut closure = || {
   |                       -- mutable borrow occurs here
15 |         c += 1;
   |         - previous borrow occurs due to use of `c` in closure
...
23 |     println!("{}",c);
   |                   ^ immutable borrow occurs here
24 | }
   | - mutable borrow ends here
```
Lý do đơn giản là vì [1 biến mutable chỉ có thể có 1 và chỉ 1 reference](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html).
Để hiểu được vấn đề với closures, chúng ta phải hiểu được cách mà nó được impliment trong rust. Cơ bản thì closures trong rust là 1 trait có callable ([Đây là 1 bài khá hay về vấn đề này](https://stevedonovan.github.io/rustifications/2018/08/18/rust-closures-are-hard.html)). Theo đó đoạn code trên của chúng ta được rust dịch tương tự như đoạn sau:
```rust
struct ClosureType<'a> {
    c: &'a mut i32,
}
impl<'a> ClosureType<'a> {
    fn call(&mut self) {
        *self.c += 1;
        println!("in the closure, c={}",self.c);
    }
}
fn main() {
    let mut c = 0;
    let mut closure = ClosureType { c:&mut c };
    closure.call();
    println!("out of the closure, c={}", c);
}
```
Theo như đoạn code trên thì closure là 1 struct. Chính sác hơn là 1 struct với mỗi field là mỗi biến mà nó được truyền cho. Giờ thì lỗi trên đã dễ hiểu rồi. Là do closure đã "borrowed as mutable" c nên biến c không thể được dùng ở print thứ 2 nữa.

Vậy nếu đưa ownership cho closure luôn mà ko dể nó chỉ borrow nữa thì sao.
```rust
struct ClosureType {
    c: i32,
}
impl ClosureType {
    fn call(&mut self) {
        self.c += 1;
        println!("in the closure, c={}", self.c);
    }
}
fn main() {
    let mut c = 0;
    let mut closure = ClosureType { c:c };
    closure.call();
    println!("out of the closure, c={}", c);
}
```
Tất nhiên là chương trình giờ đã chạy được nhưng kết quả lại không như ta mong muôn:
```
in the closure, c=1
out of the closure, c=0
```
Do c được đưa cho closure chỉ là 1 bản copy nên lẽ dĩ nhiên các tác động đến c từ closure không ảnh hưởng đến bên ngoài. Vậy vấn đề giờ là đưa ownership cho closure mà không tạo ra copy.

Giờ là lúc cho giải pháp trong thực tế. Rust cung cấp 1 loại cấu trúc cho những trường hợp thế này. Đó là [RefCell](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html). 
```rust
fn main() {
    let c = RefCell::new(0);
    let mut closure = || {
        *c.borrow_mut() += 1;
        println!("in the closure, {}", c.borrow());
    };
    closure();
    println!("out of the closure, {}", c.borrow());
}
```
Trong rust RefCell là một loại [smart pointer](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html). Bạn nên đọc thêm về các loại smart pointer khác. Thường người học về rust sẽ không để ý đến phần này của cuốn sách. Biết thêm về nó sẽ giúp bạn tiết kiệm kha khá thời gian với StackOverflow.

Giờ thì đủ lý thuyết rồi đến với 1 ví dụ thực tế đi. Trước đây tôi đã thử viết 1 game server đơn giản với rust và [tokio](https://tokio.rs/). Server này sẽ handle client connection một cách bất đồng bộ và update một corresponding entity trong một shared entity database dùng chung cho tất cả client. 

Đoạn code dưới đây là 1 TCP server đơn giản, mà khi kết nối đến nó sẽ thêm 1 entity vào "game" state. Bạn sẽ thấy là entity ở đây được bao trong một Arc và một Mutex thay vì RefCell như chúng ta đã dùng phía trên. Mutex là phiên bản đa luồng của RefCell. Arc là cách an toàn để truy cập vào Mutex.
```rust
extern crate tokio;

use tokio::prelude::*;
use tokio::io::copy;
use tokio::net::TcpListener;
use std::sync::{Arc,Mutex};

struct Entity;

fn main() {
    let addr = "127.0.0.1:12345".parse().unwrap();
    let listener = TcpListener::bind(&addr).unwrap();

    // The shared state
    let state = Arc::new(Mutex::new(Vec::<Entity>::new()));

    let server = listener.incoming()
        .map_err(|e| println!("error: {}",e))
        .for_each(move |socket| {

            // --- The important part
            let state_ref = Arc::clone(&state);
            let mut s = state_ref.lock().unwrap();
            s.push(Entity{});
            // ---


            let (rx,tx) = socket.split();
            let bytes = copy(rx,tx);
            let handle = bytes.map(|a| {
                println!("wrote {:?} bytes", a)
            }).map_err(|e| {
                eprintln!("error: {:?}", e);
            });

            tokio::spawn(handle)
        });
    
    tokio::run(server);
}
```
Để test đoạn code trên bạn chỉ cần thêm dependency `tokio = "0.1"` vào `Cargo.toml`