### 1. Mở đầu 

Việc thiết kế APIs đang thay đổi từng ngày. Trong khi phần lớn các APIs hiện nay đều thiết kế theo kiểu monolith, tức là kiểu thiết kế cung cấp tất cả các dịch vụ thông qua một ứng dụng to, cồng kềnh, thì những kiểu kiến trúc phát triển API gần đây đã dần dần chuyển hướng sang microservices. Không giống như các hệ thống monolith, Micoservices phân tán chức năng ra nhiều ứng dụng và processes, và cung cấp chức năng thông qua nhiều servers khi cần thiết. 

Microservice phát triển, đồng nghĩa với việc cần thêm những thiết kế kiến trúc đa dạng và có tính mở rộng cao hơn. Trong bài viết này chúng ta sẽ cùng tìm hiểu về một RPC framework là Apache Thrift để biết thêm về một trong những xu hướng thiết kế APIs mới hiện nay.

### 2. RPC là gì?

Trước khi đi vào tìm hiểu về Apache Thrift - một RPC framework, chúng ta hãy cùng tìm hiểu định nghĩa về RPC là gì, và thế nào là một RPC framework:

Theo định nghĩa của Wiki: Trong hệ thống phân phối tính toán (distributed computing), một RPC - viết tắt của remote procedure call là khi một chương trình máy tính tạo nên một procedure thực thi trên một dải địa chỉ riêng (thường là trên một máy tính khác trong cùng một mạng) như là gọi đến một normal (local) procedure, mà người lập trình viên không trực tiếp lập trình chi tiết cho giao tiếp từ xa đó - điều mà thông thường 
lập trình viên phải viết code để thực thi trên môi trường local hoặc remote.

RPC là một giao thức request-response. Một RPC được khởi tạo khi client gửi request message tới một remote server biết trước để thực thi một procedure với những parameters đã được cung cấp trước. Remote server gửi một response đến client, và chương trình tiếp tục process của nó. Khi server xử lý lời gọi, client bị block (nó sẽ đợi đến khi server hoàn thành trước khi chạy tiếp luồng của nó), trừ khi client gửi một request bất đồng bộ tới server (XMLHttpRequest). Có rất nhiều cách để implement giao thức này, dẫn đến việc có nhiều giao thức RPC đa dạng và không tương thích với nhau.

Một điểm khác biệt quan trọng giữa RPCs và local calls là remote call có thể xảy ra lỗi bởi các vấn đề về network không lường trước được. Cũng vì thế là callers phải xử lý được các trường hợp lỗi mà không biết được remote procedure có được thực thi hay không.

#### 2.1. Luồng RPC

![](https://www.ibm.com/support/knowledgecenter/ssw_aix_72/com.ibm.aix.progcomc/figures/A12C0bb01.jpg)

1. Client gọi đến client stub (là một đoạn code giúp convert parameters truyền giữa client và server trong một RPC). Lời gọi này là một local procedure call, với parameters được đẩy vào stack như bình thường.
2. Client stub đóng gói parameter vào một message và gọi một lời gọi hệ thống (system call) để gửi đi message.
3. OS của client gửi message từ client machine đến server machine.
4. OS của Server truyền gói tin đến server stub
5. Server stub tháo rỡ gói tin nhận được parameter. 
6. Cuối cùng server stub gọi đến Server procedure.

Quá trình gửi lại kết quả như quá trình thực hiện lời gọi đến server.

### 3. Apache Thrift

#### 3.1. Giới thiệu

Apache thrift là một stack software nhẹ, độc lập với ngôn ngữ lập trình với một cơ chế sinh code tự động có liên kết cho RPC. Thrift cung cấp một lớp trừu tượng cho việc truyền dữ liệu, serialize dữ liệu và cho việc thực thi mức ứng dụng. Thrift được phát triển bởi Facebook và được công bố dưới một project open source của Apache Software Foundation. 

Apache Thrift là một tập các công cụ sinh code tự động cho phép developer xây dựng RPC client và server bằng cách chỉ việc định nghĩa kiểu dữ liệu và service interface trong một file định nghĩa đơn giản. Đưa file đó là đầu vào, code sẽ được sinh tự động để xây dựng RPC client và server có thể giao tiếp một cách dễ dàng giữa tất cả các ngôn ngữ.

Thrift định nghĩa ra Thrift IDL (Interface Definition Language - ngôn ngữ định nghĩa giao tiếp) để cung cấp các service đa nền tảng. Source code của client và server được sinh ra từ chính IDL - là ngôn ngữ để viết file định nghĩa ta đã nói ở trên.

Thrift hỗ trợ rất nhiều ngôn ngữ lập trình: ActionScript, C, C++, C#, Cappuccino, Cocoa, Delphi, Erlang, Go, Haskell, Java, Node.js, Objective-C, OCaml, Perl, PHP, Python, Ruby và Smalltalk.

Thrift hỗ trợ rất nhiều kiểu chuyển tiếp (Socket, Unix Domain Sockets, Framed, File, Memory, ...) và giao thức (binary, compact, dense, JSON,..)

#### 3.2. Cài đặt Apache Thrift

Trước khi đi đến những khái niệm và lý thuyết nhàm chán hơn, trước hết hãy cùng thử cài đặt Apache Thrift.

##### 3.2.1. Apache Thrift requirements

Trước khi có thể cài đặt và configure cho Thrift, trước hết chúng ta cần cài đặt các tools và libraries cần thiết

```
sudo apt-get install libboost-dev libboost-test-dev libboost-program-options-dev libboost-filesystem-dev libboost-thread-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev
```

Để sử dụng với Java bạn cần phải install Apache Ant:

```
sudo apt-get install ant
```

Tất cả các tool cần thiết theo requirement có thể tìm thấy tại [đây](http://thrift.apache.org/docs/install/) 

##### 3.2.2. Apache Thrift Installation

1. Download Thrift tại: http://thrift.apache.org/download (trong bài viết này dùng bản 0.9.3)
2. Untar file

```
tar -xvf thrift-0.9.3.tar.gz
```

3. Hướng dẫn chi tiết về việc build Thrift cho từng hệ thống bạn có thể đọc chi tiết tại đây: http://thrift.apache.org/docs/BuildingFromSource. Với Ubuntu, bạn chạy như sau tại folder của Apache Thrift

```
cd thrift-0.9.3
./configure
sudo make
sudo make install
```

4. Kiểm tra version để biết việc cài đặt đã hoàn thành hay chưa 

```
thrift -version
```