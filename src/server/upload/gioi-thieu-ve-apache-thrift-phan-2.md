Như đã giới thiệu ở [phần trước](https://viblo.asia/p/gioi-thieu-ve-apache-thrift-4P85667R5Y3),  Thrift là một stack software nhẹ, độc lập với ngôn ngữ với một cơ chế tự sinh code cho RPC. Thrift cung cấp một lớp trừu tượng cho data transport, data serialization, và xử lý mức ứng dụng. Chúng ta cũng đã biết được xu hướng sử dụng microservice trong việc xây dựng kiến trúc cho những ứng dụng hiện đại, và thấy được sự phù hợp của Apache Thrift trong việc phát triển mô hình kiến trúc microservice. Chúng ta đã tìm hiểu xong về RPC, cách cài đặt Apache Thrift.

Ở phần tiếp theo này, chúng ta sẽ đi sau vào tìm hiểu kiến trúc của Apache Thrift, kiểu dữ liệu của Apache Thrift, cách viết một file `.thrift` để có thể từ đó generate ra client và server với nhiều ngôn ngữ khác nhau được hỗ trợ bởi Thrift.


### 1. Thrift protocol stack

Thrift bao gồm một stack hoàn chỉnh cho việc tạo server và client. Sơ đồ dưới đây miêu tả Thrift stack:

![](https://images.viblo.asia/61dd9e6c-0b1f-4865-ae16-f4d51ca18fb9.png)

Phần trên cùng của stack là code được sinh ra từ file định nghĩa Thrift. 

Thrift service bao gồm client và code xử lý (Processor Code) được sinh ra, nó chính là phần màu nâu trong sơ đồ trên. 

Các cấu trúc dữ liệu được gửi đi (khác với các kiểu built-in) cũng nằm trong code được Thrift generate ra, hiển thị ở phần màu đỏ của sơ đồ cấu trúc.

Phần giao thức (protocol) và giao vận (transport) là các phần trong runtime library của Thrift.

Vì vậy với Thrift, bạn có thể định nghĩa service, và tự do thay đổi giao thức và giao vận mà không phải sinh lại code.

Thrift cũng bao gồm hạ tầng server (server infrastructure) để kết nối giao thức và giao vận với nhau. Có các loại server blocking, non-blocking, single, multithreaded khả dụng để có thể lựa chọn.

Phần giao tiếp I/O cơ bản trong stack khác nhau dựa trên sự khác nhau giữa ngôn ngữ được sử dụng. Đối network I/O của Java và Python, các thư viện tích hợp (built-in libraries) được tận dụng bởi Thrift, trong khi đó với C++ thì sử dụng custom implementation.

Thrift cho phép bạn lựa chọn một cách độc lập giữa giao thức, giao vận và máy chủ. Thrift được phát triển ban đầu bởi C++, Thrift có sự đa dạng nhất khi implement với C++. 

#### Protocol Layer

Tầng giao thức cung cấp các cách serialize và deserialize dữ liêu. Thrift hỗ trợ cả giao thức văn bản (text) và nhị phân (binary). Giao thức nhị phân vượt trội hơn so với giao thức văn bản, nhưng cũng có những lúc giao thức văn bản có thể hữu ích hơn (như lúc debugging). Một vài giao thức mà Thrift hỗ trợ có thể kể đến:

* TBinaryProtocol - Một dạng encoding các giá trị số dưới dạng nhị phân mà không phải là convert nó thành dạng văn bản.
* TCompactProtocol - Rất hiệu quả, mã hóa dữ liệu dày đặc.
* TDenseProtocol - Giống với loại trên nhưng nó tháo bỏ phần thông tin meta khỏi phần dữ liệu được truyền đi, và thêm nó vào lại khi nhận lại dữ liệu trả về. TDenseProtocol vẫn đang trong quá trình thử nghiệm và chưa khả dụng khi implement với ngôn ngữ Java.
* TJSONProtocol - Sử dụng JSON format khi encoding dữ liệu.
* TSimpleJSONProtocol - Một giao thức write-only (chỉ ghi) sử dụng JSON. Thích hợp cho các ngôn ngữ scripting parsing dữ liệu.
* TDebugProtocol - Giao thức sử dụng văn bản hỗ trợ debugging.


#### Transport Layer

Trong khi tầng giao thức mô tả "cái gì" được truyền đi, thì tầng giao vận lại mô tả dữ liệu được truyền đi "như thế nào", có nghĩa là tầng giao vận chịu trách nhiệm đọc và ghi. Dưới đây là một số kiểu giao vận hỗ trợ bởi Thrift:

* TSocket - sử dụng blocking socket I/O để vận chuyển.
* TFramedTransport - truyền dữ liệu theo từng khung (frame), mỗi khung được đi trước bởi một độ dài. Kiểu vận chuyển này đòi hỏi kiểu server non-blocking.
* TFileTransport - kiểu vận chuyển này ghi dữ liệu ra file. Kiểu dữ liệu này chưa được implement với Java.
* TMemoryTransport - Sử dụng bộ nhớ để đọc ghi.
* TZlibTransport - nén dữ liệu sử dụng zlib. Sử dụng kết hợp với các kiểu transport khác. Không khả dụng với Java.

#### Processor

Bộ xử lý nhận vào các tham số là giao thức đầu vào và đầu ra. Đọc dữ liệu từ đầu vào, xử lý dữ liệu thông qua Handler định nghĩa bởi người dùng, sau đó khi dữ liệu trả về vào đầu ra.

#### Các loại Server được hỗ trợ

Một server sẽ lắng nghe các kết nối thông qua một cổng và sẽ truyền dữ liệu nó nhận được đến bộ xử lý (Processor).

* TSimpleServer - Single-threaded server sử dụng std blocking I/O. Sử dụng với mục đích testing.
* TThreadPoolServer- Multi-threaded server sử dụng std blocking I/O.
* TNonblockingServer - Multi-threaded server sử dụng non-blocking I/O. Tầng giao vận phải sử dụng TMemoryTransport với kiểu server này.

### 2. Hệ thống kiểu dữ liệu của Thrift

Kiểu dữ liệu của Thrift bao gồm những kiểu cơ bản như `bool`, `byte`, `double`, `string` và `integer` nhưng cũng có các kiểu đặc biệt như `binary` và Thrift cũng hỗ trợ `struct` (giống như các classes nhưng không có tính kế thừa) và có cả kiểu containers như `list`, `set`, `map` tương ứng với các interface thường có sẵn trong các ngôn ngữ lập trình.

Hệ thống kiểu dữ liệu của Thrift tập trung chủ yếu vào các kiểu phổ biến trong tất cả các ngôn ngữ lập trình và bỏ quá các kiểu dữ liệu đặc thù với một số loại ngôn ngữ.

Ngoài ra Thrift còn cho phép định nghĩa kiểu dữ liệu mới thông qua [Thrift interface description language (IDL)](http://thrift.apache.org/docs/idl).

#### Các kiểu dữ liệu cơ bản

* `bool`: giá trị logic (`true`, `false`)
* `byte`: một giá trị nguyên 8-bit có dấu.
* `i16`, `i32`, `i64`: tương ứng là một giá trị nguyên 16-bit, 32-bit, 64-bit có dấu.
* `double`: một giá trị số phẩy động 64-bit.
* `string`: Giá chị chuỗi văn bản sử dụng UTF-8 encoding.

#### Kiểu dữ liệu đặc biệt

* `binary`: một chuỗi các byte không được mã hóa.

#### Structs

Một `struct` có một tập các trường có kiểu cơ bản, mỗi trường được định danh bằng một tên duy nhất. `struct` rất giống với kiểu struct trong ngôn ngữ C.

Ví dụ:

```
struct Example {
  1:i32 number=10,
  2:i64 bigNumber,
  3:double decimals,
  4:string name="thrifty"
}
```

#### Containers

* `list` (interface này tương thích với C++ STL vector, Java ArrayList, ...)
* `set` (interface này tương thích với STL set, Java HashSet etc, ...)
    * PHP không hỗ trợ `set` - vì thế nó được coi như tương đương với một `List`.
* `map` (tương ứng với STL map, Java HashMap,...)

Tất cả những thiết lập trên đều là mặc định nhưng có thể tùy chỉnh tương ứng với từng kiểu khác nhau của bất kỳ ngôn ngữ nào. Vì lý do này mà những đoạn code chỉ thị đã được thêm vào. 


#### Exception

Nó được kế thừa từ các base class exception tương ứng với từng loại ngôn ngữ lập trình.

```
exception InvalidOperation {
    1: i32 what,
    2: string why
}
```

#### Service

Một service bao gồm một tập các hàm, mỗi hàm có một tập các tham số và một kiểu trả về. Việc định nghĩa một service cơ bản là việc định nghĩa một interface hoặc một virtual abstract class.

```
service <name> {
    <returntype> <name>(<arguments>)
    [throws (<exceptions>)]
...
}

An example:
service StringCache {
    void set(1:i32 key, 2:string value),
    string get(1:i32 key) throws (1:KeyNotFound knf),
    void delete(1:i32 key)
}
```

### 3. Định nghĩa file `.thrift`

Trong một file `.thrift` bạn có thể định nghĩa các service mà server của bạn sẽ implement và sẽ được gọi bởi bất kỳ client nào. Bộ biên dịch - Thrift compiler sẽ đọc file này và sinh source code để sử dụng cho server và client mà bạn sẽ code.

Một file `.thrift` đơn giản mà ta sẽ định nghĩa một service hỗ trợ tính nhân cho demo này được viết như sau: 

```
namespace java tutorial
namespace py tutorial

typedef i32 int
service MultiplicationService
{
        int multiply(1:int n1, 2:int n2),
}
```

trong file trên chúng ta chỉ định nghĩa một service để nhân hai số và trả về tích của chúng để tránh sự rườm rà trong việc hiểu được những thành phần Thrift. Nếu bạn đặt tên file trên là `multiplication.thrift` và bạn muốn sử dụng ngôn ngữ Java và Python việc của bạn cần là chạy.

```
$: thrift --gen java multiplication.thrift
$: thrift --gen py multiplication.thrift
```

Thrift sau đó sẽ sinh source code cho bạn và sẽ đặt chúng trong 2 directory là `gen-java` và `gen-py` tương ứng (hãy chắc rằng là bạn chạy câu lệnh trên với tài khoản có quyền trên folder này).

*Lưu ý:*

* Chúng ta có thể định nghĩa `namespace` như chúng ta đã viết ở trong file trên. Nó làm cho Thrift sẽ sinh ra một sub-directory có trên là `tutorial` bên trong `gen-java` và `gen-py` và lưu những file đầu ra vào đó. Chúng ta cũng có thể định nghĩa những namespace khác cho java và python. Chúng ta cũng có thể bỏ qua việc định nghĩa namespace, khi đó Thrift sẽ lưu trực tiếp các file code được sinh ra trực tiếp vào `gen-java` và `gen-py`.
* Chúng ta có thể định nghĩa kiểu (`typedef` với từ khóa) của Thrift bằng một cái tên dễ nhớ hơn (trong ví dụ trên là `i32` được định nghĩa với tên `int`)

Chúng ta có thể xem một ví dụ chi tiết việc định nghĩa `struct`, `exception` và các cấu trúc khác của ngôn ngữ thrift ở trong file `tutorial.thrift` ở trong phần cài đặt mặc định của Thrift.  Trong file này chứa các comment giải thích rất dễ hiểu. Dưới đây là một vài lưu ý của những thành phần quan trọng nhất.

#### Include nhiều file `.thrift`

Các object được include được truy cập sử dụng tên file `.thrift` làm tiền tố. Ví dụ: `shared.sharedObject`

```
include "shared.thrift"
```

#### Định nghĩa một C-style enumerations

Giá trị - value là optional và bắt đầu từ `1` nếu không được định nghĩa

```
enum Operation {
  ADD = 1,
  SUBTRACT = 2,
  MULTIPLY = 3,
  DIVIDE = 4
}
```


#### Định nghĩa `struct`

Các trường có thể định nghĩa là tùy chọn (optional) để đảm bảo chúng sẽ không được thêm vào trong dữ liệu output nếu chúng không được set - Điều này yêu cầu một vài thao tác manual với một vài ngôn ngữ. Bạn có nhận thấy các trường số trước kiểu dữ liệu của mỗi trường không? Định danh của trường là cách Thrift phân biệt các phiên bản (versioning). Ngôn ngữ định nghĩa Thrift hỗ trợ việc tự động gán định danh cho trường, nhưng good practice là khuyến khích việc tự gán định danh này. Trong Thrift white paper có nói rằng: *để tránh việc conflict giữa các định danh gán tay và định danh gán tự động, các trường mà thiếu định nghĩa định danh được gán cho các định danh giảm dần từ -1, và chỉ những ngon ngữ chỉ hỗ trợ gán tay định danh mới có các giá trị dương*

```
struct Work {
  1: i32 num1 = 0,
  2: i32 num2,
  3: Operation op,
  4: optional string comment,
}
```

#### Định nghĩa Exception

```
exception InvalidOperation {
  1: i32 what,
  2: string why
}
```

#### Định nghĩa Service

```
service Calculator extends shared.SharedService {

   void ping(),

   i32 add(1:i32 num1, 2:i32 num2),

   i32 calculate(1:i32 logid, 2:Work w) throws (1:InvalidOperation ouch),

   /**
    * This method has a oneway modifier. That means the client only makes
    * a request and does not listen for any response at all. Oneway methods
    * must be void.
    */
   oneway void zip()

}
```

### 4. Ví dụ demo

#### Tự động sinh code với Thrift

Sau khi tạo xong file `.thrift` như đã trình bày ở ví dụ trong phần 3, chúng ta đã sẵn sàng chạy Thrift để sinh ra source code với ngôn ngữ chỉ định. Cách sử dụng command như sau:

```
thrift [options] file-name
```

Ví dụ, khi muốn sinh source code Java ta chạy câu lệnh sau:

```
thrift -r --gen java filename.thrift
```

Câu lệnh trên sẽ sinh ra một directory là `gen-java` chứa tất cả source code của Thrift dưới ngôn ngữ Java.

Option `-r` là để chỉ định rằng chúng ta muốn sinh source code từ tất cả các file được include trong file `.thrift` của chúng ta. Sau khi sinh code tự động xong, chúng ta đã sẵn sàng để code client và server và sử dụng source code của Thrift phần việc khó nhất cho bạn, đó là serialize, deserialize, đọc, ghi dữ liệu, mà bạn sẽ nhìn thấy ở dưới đây.

*Lưu ý*

* Khi chạy server python có thể bạn sẽ gặp lỗi sau:

```
ImportError: No module named Thrift
```

* Lỗi này có thể fix bằng cách đi đến directory `lib/py` trong directory của Thrift và chạy câu lệnh sau để cài đặt thrift module cho thư viện của python:

```
sudo python setup.py install
```

#### Viết handler xử lý logic cho service

Trong bài viết này chúng ta sẽ chỉ demo một ví dụ đơn giản với một service hỗ trợ tính nhân.

File `.thrift` sử dụng trong ví dụ sẽ là chính là file được viết ở phần 3.

Chúng ta sẽ tạo một folder có tên là `thrift-files` sau đó lưu file vừa tạo vào trong service

```
mkdir thrift-files
cd thrift-files
```

File `.thrift`

```ruby
# multiply.thrift
namespace rb tutorial              
namespace py tutorial              
                                   
typedef i32 int                    

service MultiplicationService      
{                                  
  int multiply(1:int n1, 2:int n2),
}                                  
```

sau đó chạy câu sau để generate source code với 2 ngôn ngữ là Python và Ruby:

```
thrift --gen java multiply.thrift
thrift --gen py multiply.thrift
```

Sau khi chạy hai câu trên, Thrift sẽ sinh ra source nằm trong `gen-py` và `gen-rb` tương ứng hai ngôn ngữ chúng ta chọn là Python và Ruby. 

Bây giờ chúng ta đã có thể bắt đầu viết code xử lý logic. Trong ví dụ này chúng ta sẽ viết code cho server Python (ở đây chúng ta sẽ dùng Python 2 lí do là Thrift vẫn còn một số lỗi với Python 3, nếu muốn dùng Python 3 chúng ta sẽ phải sử dụng tool `2to3` của để convert chính source code của Thrift sinh ra), chúng ta sẽ dùng client code cũng với Python, thêm vào đó là client Ruby.

##### Multiplication Handler

Vào trong folder `gen-py/tutorial` chúng ta sẽ tạo một file chứa code handler cho service:

```
cd gen-py/tutorial
vim multiplication_handler.py
```

```python
from MultiplicationService import *                                                   
                                                                                      
class MultiplicationHandler(Iface):                                                   
    def multiply(self, n1, n2):                                                       
        print("Server has received a multiplication request: {} x {}.".format(n1, n2))
        return n1 * n2                                                                
```


#### Multiplication Server

Ở đây, tôi cũng lựa chọn Python làm ngôn ngữ viết cho server (vì chúng ta đã dùng nó để viết phần Handler bên trên). Chúng ta có thể có nhiều config cho server khác nhau, với protocol khác nhau, với các cách transport khác nhau mà chúng ta có thể tham khảo thêm tại [trang chủ của Thrift](https://thrift.apache.org/tutorial/). Tuy nhiên, với những project còn đang phát triển này của Apache, việc tìm được một documentation đầy đủ chi tiết là rất khó khăn, vì vậy nếu muốn đi sâu thêm nữa vào việc tìm hiểu cách thức hoạt động của Thrift, từng phần của Thrift's stack hoạt động ra sao, chúng ta chỉ có cách vọc vào source code và đọc.... comment. Sau đây là đoạn code server đơn giản mà tôi sử dụng:

```python
# server.py
from multiplication_handler import MultiplicationHandler                    
from thrift.transport import TSocket                                        
from thrift.transport import TTransport                                     
from thrift.protocol import TBinaryProtocol                                 
from thrift.server import TServer                                           
from MultiplicationService import *                                         
                                                                            
                                                                            
if __name__ == '__main__':                                                  
    handler = MultiplicationHandler()                                       
    processor =  Processor(handler)                                         
    transport = TSocket.TServerSocket(host='127.0.0.1', port=1702)          
    tfactory = TTransport.TBufferedTransportFactory()                       
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()                     
                                                                            
    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)
    print("Server has started\nListening...")                               
    server.serve()                                                          
```

Để xây dựng server chúng ta cần có:
* Service Handler: là phần sử lý logic của chúng ta đã code từ trước
* Processor: phần này chính là "linh hồn" của service của chúng ta, đọc dữ liệu từ đầu vào với transport chỉ định trước, xử lý dữ liệu với handler, ghi dữ liệu đầu ra, dữ liệu được processor serialize, deserialize sử dụng protocol.
* Transport: Định nghĩa kiểu đọc ghi.
* Protocol: Định nghĩa data gửi nhận.
* Socket: Định nghĩa host và port cho server.
* Server: Loại server, ở đây sử dụng TSimpleServer phục vụ mục đích demo, ngoài ra còn các loại server đã được trình bày ở phần 1.

#### Multiplication Client

```python
# client.py
from thrift import Thrift                                        
from thrift.transport import TSocket                             
from thrift.protocol import TBinaryProtocol                      
from thrift.transport import TTransport                          
from MultiplicationService import *                              
import random                                                    
                                                                 
if __name__ == '__main__':                                       
    trans = TSocket.TSocket('localhost', 1702)                   
    trans = TTransport.TBufferedTransport(trans)                 
    proto = TBinaryProtocol.TBinaryProtocol(trans)               
    client = Client(proto)                                       
                                                                 
    trans.open()                                                 
    for i in range(10000):                                       
        n1 = random.randint(1, 1000)                             
        n2 = random.randint(1, 1000)                             
        print("Send multiplycation request to server... ")       
        result = client.multiply(n1, n2)                         
        print("Server has response. Result is {}".format(result))
    trans.close()                                                
```

Về cơ bản, đinh nghĩa client cũng tương tự định nghĩa server, chỉ khác là không có handler, processor, vì logic xử lý chính nằm ở server. Nên chúng ta chỉ cần định nghĩa transport và protocol. Khởi tạo instance của `Client` sau đó thực hiện lời gọi đến server với phương thức `multiply` (tham khảo thêm phần code tự sinh của Thrift). Như vậy, sau khi nhìn source code chúng ta cũng có thể hình dung qua được mô hình hoạt động của RPC.

Ngoài ra, chúng ta cũng có thể trực tiếp viết luôn code cho client của Ruby mà không phải thêm bất cứ dòng code tùy chỉnh nào trên server, tất cả đã được Thrift xử lý trong phần code của Processor mà Thrift đã sinh ra cho chúng ta. Chúng ta không cần biết server làm gì, chúng ta đã có API để giao tiếp với Server rồi.

Chuyển sang thư mục `gen-rb` trong thư mục `thrift-files`

```ruby
# client.rb
$LOAD_PATH.unshift('.')                                                    
require_relative 'multiplication_service'                                  
                                                                           
trans = Thrift::BufferedTransport.new Thrift::Socket.new('localhost', 1702)
proto = Thrift::BinaryProtocol.new trans                                   
client = Tutorial::MultiplicationService::Client.new proto                 
                                                                           
trans.open                                                                 
                                                                           
10000.times do                                                             
   rand_range = (1..10000).to_a                                            
   n1 = rand_range.sample                                                  
   n2 = rand_range.sample                                                  
   puts "Send multiplycation request to server..."                         
   result = client.multiply n1, n2                                         
   puts "Server has response. Result is #{result}"                         
end                                                                        
```

Việc định nghĩa client cũng tương tự như định nghĩa ở client với Python.

Khởi chạy server:

```
python2 server.py
```

Khởi chạy client Python:

```
python2 client.py
```

Khởi chạy client Ruby:

```
ruby client.rb
```

Chúng ta sẽ thấy rằng client Ruby và server Python giao tiếp với nhau bình thường y hệt như server và client Python giao tiếp với nhau.

![](https://images.viblo.asia/3392a3cd-ea13-47e7-b266-7eb8cca1b70d.gif)

### Kết luận

Hiện nay có rất nhiều các product lớn sử dùng Thrift trong việc xây dựng các backend service điển hình như: 
* Evernote ([So API Together: Evernote and Thrift](https://evernote.com/blog/so-api-together-evernote-and-thrift/))
* Quora ([Quora’s Technology Examined](http://www.bigfastblog.com/quoras-technology-examined#thrift))
* Facebook ([Jeff Morrison's answer to How does Facebook use Apache Thrift?](https://www.quora.com/How-does-Facebook-use-Apache-Thrift/answer/Jeff-Morrison))
* Twitter ([Twitter's Thrift](https://github.com/twitter-forks/thrift))

Như vậy, thông qua demo của bài viết, chúng ta có thể thấy việc xây dựng các service độc lập với ngôn ngữ là rất dễ dàng, thuận tiện với Thrift và đây cũng là một hướng đi thích hợp cho tương lai phát triển sản phẩm mà chúng ta cần.

Mọi thông tin chi tiết có thể tham khảo thêm tại: https://thrift.apache.org/.

Tham khảo: https://thrift-tutorial.readthedocs.io/