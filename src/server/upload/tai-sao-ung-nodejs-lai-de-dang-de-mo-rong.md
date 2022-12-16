# Clusters and Child Processes
# Scaling Node.js Applications
Mặc dù single-threaded và non-block là khá tốt. Nhưng một process trong một CPU sẽ không đủ để xử lý khối lượng công việc ngày càng tăng của một ứng dụng. Cho dù server của bạn sử dụng có thể mạnh đến mức nào, những gì single-threaded có thể hỗ trợ sẽ bị hạn chế. Thực tế là node chạy trong single-threaded không có nghĩa là chúng ta không thể tận dụng nhiều process và tất nhiên, nhiều server cũng vậy. Sử dụng nhiều process là cách duy nhất để mở rộng một ứng dụng Nodejs. Nodejs được thiết kế để xây dựng các ứng dụng phân tán với nhiều node. Đây là lý do tại sao nó được đặt tên là Nodejs. 

Khả năng mở rộng được đưa vào nền tảng. Khối lượng công việc là lý do phổ biến nhất chúng ta mở rộng các ứng dụng của mình, nhưng đó không phải là lý do duy nhất. Chúng tôi cũng mở rộng các ứng dụng của mình để tăng tính khả dụng và khả năng chịu thất bại. Trước khi chúng ta nói về việc nhân rộng một node,  có ba điều chúng ta có thể làm để mở rộng một ứng dụng:

1. Cách dễ nhất để mở rộng một ứng dụng lớn là clone nó nhiều lần và để mỗi instance được nhân bản xử lý một phần khối lượng công việc. Điều này không tốn nhiều thời gian phát triển và nó có hiệu quả cao. 
2. Ngoài ra chúng ta cũng có thể mở rộng một ứng dụng bằng cách phân tách nó dựa trên các chức năng và dịch vụ. Điều này có nghĩa là có nhiều ứng dụng khác nhau với các code  khác nhau và đôi khi có cả database riêng. Chiến lược này thường được liên kết với thuật ngữ microservice, trong đó micro chỉ ra rằng các dịch vụ đó nên càng nhỏ càng tốt, nhưng trên thực tế, quy mô của dịch vụ không phải là điều quan trọng, mà là việc thực thi kết nối nối lỏng lẻo và sự gắn kết cao giữa các dịch vụ. Việc thực hiện chiến lược này thường không dễ dàng và có thể dẫn đến những vấn đề bất ngờ lâu dài, nhưng khi được thực hiện đúng thì những lợi thế là rất lớn.
3.  Chiến lược mở rộng thứ ba là chia ứng dụng thành nhiều trường hợp trong đó mỗi trường hợp chỉ chịu trách nhiệm cho một phần dữ liệu của ứng dụng. Phân vùng dữ liệu yêu cầu một bước tra cứu trước mỗi thao tác để xác định trường hợp nào của ứng dụng sẽ sử dụng. Ví dụ: có thể chúng tôi muốn phân vùng người dùng dựa trên quốc gia hoặc ngôn ngữ của họ. Chúng ta cần phải tra cứu thông tin đó trước. 
  
Mở rộng thành công một ứng dụng lớn cuối cùng sẽ thực hiện cả ba chiến lược và Node. js làm cho nó dễ dàng để làm như vậy. Tiếp theo, chúng ta sẽ nói về các công cụ tích hợp có sẵn trong Nodejs để thực hiện chiến lược clone.


## Child Processes Events and Standard IO
Chúng ta có thể dễ dàng sinh ra một tiến trình con bằng cách sử dụng các mô đun child_ process và các tiến trình con đó có thể dễ dàng giao tiếp với nhau bằng một messaging system. Mô đun child_ process cho phép chúng ta truy cập các chức năng của Hệ điều hành bằng cách chạy bất kỳ lệnh hệ thống nào bên trong một tiến trình con, kiểm soát input stream và lắng nghe outout stream của nó. Chúng ta có thể kiểm soát các đối số được truyền vào lệnh và chúng ta có thể làm bất cứ điều gì chúng ta muốn với output của nó. Ví dụ, chúng ta có thể chuyển input của một lệnh này sang một lệnh khác, vì tất cả các input và output của các lệnh này có thể được hiện ra cho chúng ta bằng cách sử dụng các stream. 

Có bốn cách khác nhau mà chúng ta có thể sử dụng để tạo một tiến trình con trong Node:  Spawn, fork, exec, and execFile. Mỗi chức năng sẽ có sự khác biệt mà mục đích sử dụng khác nhau:

###  execFile
```
child_process.execFile(file[, args][, options][, callback])
```
Thực thi một chức năng trên 1 process mới. Input là tên hoặc đường dẫn đến 1 file, có thể truyền vào các đối số và callback. Output là khi thực hiện xong, callback sẽ được gọi với data là buffer hoặc 1 error.

```
const execFile = require('child_process').execFile;
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});
```
### spawn
```
child_process.spawn(command[, args][, options])
```
Thực thi một chức năng trên 1 process mới. Input là 1 câu lệnh, có thể truyền vào các đối số. Output là 1 stream I/O,
```
const spawn = require('child_process').spawn;
const fs = require('fs');
function resize(req, resp) {
    const args = [
        "-", // use stdin
        "-resize", "640x", // resize width to 640
        "-resize", "x360<", // resize height if it's smaller than 360
        "-gravity", "center", // sets the offset to the center
        "-crop", "640x360+0+0", // crop
        "-" // output to stdout
    ];
    const streamIn = fs.createReadStream('./path/to/an/image');
    const proc = spawn('convert', args);
    streamIn.pipe(proc.stdin);
    proc.stdout.pipe(resp);
}
```
### exec
```
child_process.exec(command[, options][, callback])
```
Thực thi một chức năng trên 1 process mới. Input là 1 câu lệnh, có thể truyền vào các đối số và callback. Output là khi thực hiện xong, callback sẽ được gọi với data là buffer hoặc 1 error.
```

const exec = require('child_process').exec;
exec('for i in $( ls -LR ); do echo item: $i; done', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
});
```
### fork
```
child_process.fork(modulePath[, args][, options])
```
Phương thức child_ process.fork () là trường hợp đặc biệt của child_ process.spawn () được sử dụng đặc biệt để sinh ra các process Nodejs mới. Giống như child_ process.spawn (), một đối tượng ChildProcess được trả về. ChildProcess được trả lại sẽ có một kênh liên lạc bổ sung tích hợp cho phép các tin nhắn được truyền qua lại giữa process cha và process con.

```
//parent.js
const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);
n.on('message', (m) => {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });
//sub.js
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });
```

# Tham khảo
https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node