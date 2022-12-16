[Rust](https://www.rust-lang.org/) là ngôn ngữ cho phép build hệ thống hiệu quả và ổn định (theo trang chủ của rust). Được quảng bá là nhanh (tiệm cận C),  ngăn chặn được phần lớn mọi bug crash (segfaults), ngăn chặn được data race, rất memory safe mà lại không cần tới garbage collector!.
![](https://images.viblo.asia/418587fa-1edd-4ecb-9dc8-a2ff6839c87a.png)
# Bắt đầu với việc cài đặt
## Rustup: the Rust installer and version management tool
Cách chính để cài đặt Rust là thông qua một công cụ có tên Rustup, đây là công cụ quản lý phiên bản và trình cài đặt Rust.

Nếu như bạn đang chạy macOS, Linux hoặc một hệ điều hành Unix-like khác, để tải xuống Rustup và cài đặt Rust, hãy chạy command sau và làm theo các hướng dẫn trên màn hình.
```
curl https://sh.rustup.rs -sSf | sh
```

## Cargo: the Rust build tool and package manager
Khi bạn cài đặt Rustup, bạn cũng sẽ có được phiên bản ổn định mới nhất của công cụ xây dựng và quản lý gói Rust, còn được gọi là Cargo.
Để kiểm tra xem bạn đã cài đặt Rust và Cargo chưa, bạn có thể chạy command sau:
```
cargo --version
```
# Bắt đầu 1 project mới
Sử dụng cargo để tạo 1 dự án mới:
```
cargo new hello-rust
```
Thư mục hello-rust sẽ được tạo ra với cấu trúc như sau:
```
hello-rust
|- Cargo.toml
|- src
  |- main.rs
```
- **Cargo.toml** là manifest của rust. Nó là nơi lưu trữ metadata của dự án rust, tất nhiên là cả thông tin về dependencies.
- **src/main.rs** là file main của dự án, nơi bạn bắt đầu viết code.

Thử chạy nào.
```
cargo run
```
Bạn sẽ thấy trên terminal:
```
$ cargo run
   Compiling hello-rust v0.1.0 (/Users/ag_dubs/rust/hello-rust)
    Finished dev [unoptimized + debuginfo] target(s) in 1.34s
     Running `target/debug/hello-rust`
Hello, world!
```
# Adding dependencies
Hãy thêm 1 dependency vào dự án của chúng ta, các dependencies này có thể dễ dàng được tìm thấy ở [crates.io](https://crates.io/). Dependency trong rust thường được gọi là "crates", cũng như gem trong ruby... 
Trong project này, chúng ta sử dung crate  **ferris-says**, một crate thường được sử dụng làm ví dụ.

Trong file **Cargo.toml** thêm đoạn sau:
```
[dependencies]
ferris-says = "0.1"
```
Giờ thì gọi build để cargo download crate.
```
cargo build
```
Nào giờ dùng thử crate này nào. Xóa code hello world trong **main.rs** đi và thêm đoạn sau vào.
```rust
use ferris_says::say; // from the previous step
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let out = b"Hello fellow Rustaceans!";
    let width = 24;

    let mut writer = BufWriter::new(stdout.lock());
    say(out, width, &mut writer).unwrap();
}
```
Và chạy, ta sẽ thấy đoạn sau được in ra.
```
----------------------------
| Hello fellow Rustaceans! |
----------------------------
              \
               \
                 _~^~^~_
             \) /  o o  \ (/
               '_   -   _'
               / '-----' \
               
```

# Dùng Rust có thể làm được gì?
Đây là câu hỏi mà mình thấy nhiều người hỏi nhất.

Câu trả lời là: Mọi thứ!

Mặc dù là một ngôn ngữ lập trình hệ thống (system programming language), nhưng Rust nhắm tới việc cạnh tranh với C/C++ để tăng độ an toàn và cải thiện performance cho các phần mềm được viết ra, vì thế Rust có thể làm được mọi thứ mà C/C++ làm được, ví dụ:

* [Viết hệ điều hành](https://os.phil-opp.com/)
* [Lập trình web](https://github.com/rust-unofficial/awesome-rust#web-programming)
* [Phát triển mobile app](https://github.com/rust-unofficial/awesome-rust#mobile)
* [Viết Terminal Emulator](https://github.com/jwilm/alacritty)
* [Machine Learning](https://github.com/rust-unofficial/awesome-rust#machine-learning)
* [Viết Database](https://github.com/rust-unofficial/awesome-rust#database)
* [Viết DNS server](https://github.com/bluejekyll/trust-dns)
* [Viết browser engine](https://github.com/servo/servo)
* [Viết Giả lập Playstation/NES/Gameboy/...](https://github.com/rust-unofficial/awesome-rust#applications-written-in-rust)
* [Viết Game](https://github.com/rust-unofficial/awesome-rust#applications-written-in-rust)
* [Xử lý ảnh](https://github.com/rust-unofficial/awesome-rust#image-processing)
* [Lập trình mạng](https://github.com/rust-unofficial/awesome-rust#network-programming)
* ...