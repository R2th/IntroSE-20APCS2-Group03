## What is Tokio?
Tokio là một asynchronous framework cho ngôn ngữ Rust. Thay vì bắt chương trình phài đợi các task mất nhiều thời gian để thực hiện (như đọc từ file hay đợi response của api) trước khi tiếp tục, Tokio cho phép chương trình chạy ngay cả trong khi các task mất thời gian đang chạy.

Chi tiêt hơn, Tokio là một event-driven, non-blocking I/O platform cho phép asynchronous trên Rust. Ngoài ra Tokio còn cung cấp nhiều tính năng khác như:
* Multithreaded, work-stealing based task scheduler.
* [Reactor](https://docs.rs/tokio/0.1.22/tokio/reactor/index.html) được hỗ trợ bởi operating system’s event queue (epoll, kqueue, IOCP, v.v…).
* Asynchronous [TCP and UDP](https://docs.rs/tokio/0.1.22/tokio/net/index.html) sockets.

Các thành phần này cung cấp các runtime component cần thiết để xây dựng một ứng dụng không đồng bộ.

# Fast
Tokio được xây dựng trên ngôn ngữ lập trình Rust, bản thân nó rất nhanh. Các ứng dụng được xây dựng với Tokio sẽ nhận được những lợi ích tương tự. Thiết kế Tokio cũng hướng đến việc cho phép các ứng dụng nhanh nhất có thể.

## Zero-cost abstractions
Tokio được xây dựng dựa trên [futures](https://tokio.rs/docs/getting-started/futures/), đây không phải một ý tưởng mới nhưng cách Tokio sử dụng nó rất đặc biệt ([tham khảo thêm](https://tokio.rs/docs/getting-started/futures/#poll-based-futures)). Không như futures trong các ngôn ngữ khác. Futures của Tokio được compile thành state machine. Vậy nên không có chi phí cho việc synchronization, allocation hay chi các chi phí thường thấy khi sử dụng future.

Lưu ý rằng việc cung cấp Zero-cost abstractions không có nghĩa là bản thân Tokio không có chi phí. Mà có nghĩa là sử dụng Tokio không phát sinh thêm chi phí mà chỉ bằng với code thuần không dùng framework.

## Concurrency
Ngoài ra, Tokio cung cấp multi-threaded, work-stealing, scheduler. Vì vậy, khi bạn bắt đầu chạy Tokio runtime, bạn đã sử dụng tất cả các lõi CPU máy tính của bạn.

Các máy tính hiện đại tăng hiệu suất của chúng bằng cách thêm các lõi, vì vậy việc có thể sử dụng nhiều lõi là rất quan trọng để viết các ứng dụng nhanh.

## Non-blocking I/O
Khi truy cập mạng, Tokio sẽ sử dụng hệ thống hiệu quả nhất có sẵn cho hệ điều hành. Trên Linux là epoll, bsd platforms là kqueue và Windows có các I/O completion ports.

Điều này cho phép ghép nhiều socket trên cùng 1 thread và nhận operating system notifications theo đợt, do đó giảm các system calls. Tất cả điều này dẫn đến ít chi phí cho ứng dụng.

# Reliable
Mặc dù Tokio không thể ngăn chặn tất cả các lỗi, nhưng nó được thiết kế để giảm thiểu chúng. Nó thực hiện điều này bằng cách cung cấp các API khó sử dụng sai.

## Ownership and type system
Rust’s ownership model và type system luôn là tính năng đáng tự hào của rust, giúp bạn xây dựng ứng dụng mà không phải lo về memory unsafe. Nó ngăn chặn các lỗi cổ điển như truy cập bộ nhớ chưa được khởi tạo hoặc sử dụng sau khi free. Nó làm điều này mà không cần thêm bất kỳ chi phí nào.

Hơn nữa, các API có thể tận dụng type system để cung cấp các API khó sử dụng. Ví dụ, Mutex không yêu cầu người dùng phải quan tâm đến lock và unlock.

## Backpressure
Trên push base system, khi producer liên tục enqueue nhanh hơn consumer có thể xử lý, data bị tràn. Những data chưa được sử lý sẽ được lưu vào bộ nhớ. Nếu điều này cứ tiếp tục hệ thống sẽ bị crash. Để tránh điều này xảy ra, người ta sử dụng backpressure, cho phép consumer thông báo cho producer chậm lại.

Tokio cũng là [poll](https://tokio.rs/docs/getting-started/futures/#poll-based-futures) base system, nhưng vấn đề cơ bản là biến mất. Producer mặc định là lazy. Chúng chả làm gì cho đến khi consumer yêu cầu.

## Cancellation
Vì Tokio là [poll](https://tokio.rs/docs/getting-started/futures/#poll-based-futures) base system, hệ thống chỉ làm việc khi được yêu cầu (poll). Các computation đều lock một future để trả về kết quả. Nếu kết quả này không còn được dùng tới, nó sẽ bị drop. Điều đó có nghĩa là computation không còn được dùng tới nữa.
Nhớ có Rust’s ownership model, future không còn được sử dụng sẽ dễ dàng được tìm ra và drop. Điều này khiến hệ thống clearup của rust hoạt động hiệu quả hơn nhiều.

# Lightweight
Tokio mở rộng quy mô tốt mà không cần thêm chi phí cho ứng dụng, cho phép ứng dụng phát triển mạnh trong môi trường bị hạn chế tài nguyên.

## No garbage collector
Vì Tokio được xây dựng trên rust, binary sau khi đã được dịch mang theo một run-time language tối thiểu. Cũng tương tự như thứ được tạo ra bởi C++. Vậy nên không garbage collector, không virtual machine, không JIT compilation, không stack manipulation. 

Có thể sử dụng Tokio mà không phải chịu bất kỳ runtime allocations nào, làm nó cực phù hợp cho những ứng dụng cần real-time.

## Modular
Mặc dù Tokio cung cấp rất nhiều thứ, nhưng tất cả đều được tổ chức theo module. Mỗi thành phần đều được chia vào các library. Vậy nên ứng dụng chỉ cần cái nào dùng cái đấy thay vì phải lây tất cả.

Tokio tận dụng [mio](https://github.com/tokio-rs/mio) cho system event queue và future dể define task. Tokio sử dụng [async](https://tokio.rs/blog/2018-08-async-await/) syntax cải thiện readability của future. [Rất nhiều](https://crates.io/crates/tokio/reverse_dependencies) thư viện sử dụng Tokio, bao gồm [hyper](https://hyper.rs/guides/) và [actix](https://actix.rs/book/actix/)

# Example
Dưới đây là 1 tcp server đơn giản sử dụng tokio:
```rust
extern crate tokio;

use tokio::prelude::*;
use tokio::io::copy;
use tokio::net::TcpListener;

fn main() {
    // Bind the server's socket.
    let addr = "127.0.0.1:12345".parse().unwrap();
    let listener = TcpListener::bind(&addr)
        .expect("unable to bind TCP listener");

    // Pull out a stream of sockets for incoming connections
    let server = listener.incoming()
        .map_err(|e| eprintln!("accept failed = {:?}", e))
        .for_each(|sock| {
            // Split up the reading and writing parts of the
            // socket.
            let (reader, writer) = sock.split();

            // A future that echos the data and returns how
            // many bytes were copied...
            let bytes_copied = copy(reader, writer);

            // ... after which we'll print what happened.
            let handle_conn = bytes_copied.map(|amt| {
                println!("wrote {:} bytes", amt.0)
            }).map_err(|err| {
                eprintln!("IO error {:?}", err)
            });

            // Spawn the future as a concurrent task.
            tokio::spawn(handle_conn)
        });

    // Start the Tokio runtime
    tokio::run(server);
}
```
Xem thêm các ví dụ tại [đây](https://github.com/tokio-rs/tokio/tree/v0.1.x/tokio/examples).