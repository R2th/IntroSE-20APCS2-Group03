Xin chào mọi người, ở bài viết lần trước mình đã nói về chủ đề  kết nối và link giữa các container trong docker ([link](https://viblo.asia/p/connecting-and-linking-container-in-docker-RQqKLOm457z)). Như đã hứa mình sẽ viết chủ đề tiếp theo liên quan đến 1 công cụ hỗ trợ mà những ai tìm hiểu Docker đều có thể đã sử dụng qua, đó chính là Docker Compose. 

Tất nhiên bài viết không hoàn toàn do mình viết ra, mình có đọc quyển "Docker in Pratice" và dịch từ 1 chương trong quyển này kết hợp với kiến thức mà mình biết. Phần mình nhắc đến sẽ là **Part3 - Chapter 8 - 8.1 - Container communication—beyond manual linking** (tạm dịch là giao tiếp giữa các container, vượt qua nỗi khổ nhục liên kết bằng tay).

# 1. Mở bài
Ở bài trước chúng ta đã thấy được cách kết nối các container với linking container hay dùng mapping port với môi trường ngoài. Tuy nhiên link cũng có một vài nhược điểm. Đó là chúng ta phải sử dụng tay để xác định xem khi nào sẽ khởi động từng container một (vì container phải khởi động theo thứ tự để ta có thể link được) và hơn nữa là ko có cách nào để loại bỏ cái kết nối đó (linking) giữa các container (nếu 1 container chết, tất cả các *container phụ thuộc vào nó* đều phải khởi động lại để tạo lại *linking*. 

Do đó chúng ta cần 1 công cụ giải quyết vấn đề này, vâng chính là **Docker Compose**.

# 2. Giới thiệu Docker Compose.
Oke, muốn làm thì trước tiên cũng phải biết nó là gì đã. **Docker Compose** bắt đầu được biết đến với cái tên ***fig***, được tạo ra nhằm giảm thiểu và loại bỏ việc khởi động nhiều container với những tham số như linking, volumes hay ports. **Docker Inc.** đã rất thích ý tưởng này và họ đã tiếp nhận nó, tạo lại nó và release nó với một cái tên mới.

**Docker Compose** là 1 công cụ cho việc định nghĩa và khởi chạy các ứng dụng Docker phức tạp. Ý tưởng chủ đạo của công cụ này là thay vì liên kết các lệnh khởi động với những container phức tạp bằng các công cụ như **[Shell script](https://en.wikipedia.org/wiki/Shell_script)** hay **[Makefiles](https://en.wikipedia.org/wiki/Makefile)**, bạn có thể xác định các cài đặt ban đầu khi khởi động ứng dụng (hay container) và gói gọn chúng trong chỉ 1 command duy nhất. Vào thời điểm được viết ra thì **Docker Compose** không được khuyến khích sử dụng ở trên môi trường **production**. (không nên dùng trên sản phẩm thực tế nhé)

Về cách cài đặt Docker Compose các bạn hãy tham khảo trên trang chủ https://docs.docker.com/compose/install/. Có hướng dẫn khá chi tiết, hãy nhớ nên đọc kĩ nhé. Còn nữa về chạy docker không cần sudo, tất cả cũng ở trên trang chủ nuôn, anhem ko cần lo nhé https://docs.docker.com/install/linux/linux-postinstall/.

# 3. Ví dụ về cách sử dụng.
Chúng ta sẽ tạo ra 1 echo server và client (cái ví dụ này mình lấy y hệt trong sách ra nhá, vì họ viết cũng đơn giản khó hiểu). Client sẽ gửi 1 message mỗi 5s tới echo server và nhận message trả về ngược lại.

Đầu tiên chúng ta tạo ra thư mục server và trỏ vào nó cái đã:

```bash
$ mkdir server
$ cd server
```

Tiếp theo, tạo Dockerfile cho phía server với nội dung như sau:

```Dockerfile
FROM debian
RUN apt-get update && apt-get install -y nmap #Install the nmap package, which provides the ncat program used here.
CMD ncat -l 2000 -k --exec /bin/cat # Run the ncat program by default when starting the image.
```

Option `-l 2000` thông báo cho *ncat*  lắng nghe cổng 2000 và options `-k` nói với nó để cho phép nhiều kết nối từ client xảy ra đồng thời cũng như tiếp tục chạy sau khi client đóng kết nối. Option cuối cùng `--exec /bin/cat` sẽ làm cho ncat chạy lệnh /bin/cat cho  bất kỳ kết nối nào tới và chuyển tiếp bất kỳ data nào đều từ các ckeest nối ra ngoài chương trình.

Oke tiếp theo, ta sẽ build Dockerfile bằng lệnh

```bash
$ docker build -t server .
```

Giờ chúng ta có thể cài đặt các image clinet để gửi message đến server. Tạo thư mục client cùng cấp với server rồi tạo ra file **client. py**: 

```python
import socket, time, sys #Import the Python packages needed.
while True:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Create a socket object.
    s.connect(('talkto',2000)) # Use the socket to connect to the ‘talkto’ server on port 2000.
    s.send('Hello, world\n') # Send a string with a newline character to the socket.
    data = s.recv(1024) # Create a buffer of 1024 bytes to receive data, 
    #and place the data into the data variable when a message is received.
    print 'Received:', data # Print the received data to standard out.
    sys.stdout.flush() # Flush the standard out buffer so you can see messages as they come in.
    s.close() # Close the socket object.
    time.sleep(5) # Wait five seconds and repeat.
```
và Dockerfile
```Dockerfile
FROM debian
RUN apt-get update && apt-get install -y python
ADD client.py /client.py
CMD ["/usr/bin/python","/client.py"]
```
Sau đó tương tự ta cũng build client: 
```bash
$ docker build -t client .
```

Và để xác định khả năng chạy của nó thì ta sẽ chạy 2 câu lệnh: 
```
docker run --name echo-server -d server
docker run --rm --name client --link echo-server:talkto client
```

Khi bạn hoàn thành xong thì hãy out ra khỏi client và xóa container:
```bash
docker rm -f client echo-server
```

Vô vàn thứ có thể chạy sai ngay cả trong ví dụ trên: khởi động client trước sẽ khiến ứng dụng không thể khởi tạo, quên xóa container cũng có thể là vấn đề nếu bạn muốn restart, hay đặt tên container sai cũng dẫn đến lỗi. Những vấn đề này sẽ càng tăng lên nếu ứng dụng cũng như kiến trúc dự án càng phức tạp.

Compose giúp chúng ta bởi việc đóng gói sự liên kết giữa các container khi khởi tạo và caft đặt trong cùng 1 text file, quản lý đầu ra đầu vào của việc khởi tạo cũng như tắt container.

Compose sử dụng [YAML](https://yaml.org/) file để biết. Giả sử chúng ta có file **docker-compose.yml** sau cùng cấp với các thư mục server và client:

```yaml
echo-server: # The reference names of the running services are their identifiers: echo-server and client, in this case.
    image: server #Each section must define the image used: the client and server images, in this case.
    expose: #Expose the echo-server’s port 2000 to other services.
    - "2000"
    
client:
    image: client
    links: 
    # Define a link to the echo-server. 
    # References to talkto within the client will be sent to the echo server. 
    # The mapping is done by setting up the /etc/hosts file dynamically in the running container.
    - echo-server:talkto
```

> Nó tè 1: Yaml file là 1 file text để khai báo thông tin theo cấp. Nó gần tương tự cấu trúc kiểu object -> child object -> child object ...-> attribute. Thông ass chi tiết nó thì anhem xem ở đây: https://yaml.org/ :D Nếu các bạn đã quen với file dạng .json thì YAML là .yml cũng tương tự kiến trúc đó, chả qua là ta bỏ hết đi mấy dấu "{" hay "}" đi thuôi :v: 

Syntax của **docker-compose.yml** rất dễ để đọc, mỗi service được đặt tên và theo từng tầng dựa vào các dấu cách, mỗi item có dấu hai chấm sau tên và các attribute của mỗi item sẽ ở cùng 1 khoảng cách với đầu dòng. Và hơn nữa cách viết cũng tương tự như với commands, giả sử như với ***linking***.

CHúng ta cũng sử dụng `image:` để định nghĩa tên image sử dụng cho mỗi service, tuy nhiên bạn cũng có thể dùng docker-compose để build lại image bằng cách trỏ đến đường dẫn chứa Dockerfile, nó sẽ build image trước cho bạn rồi mới tiến hành start container. Khi đó ta sẽ sử dụng option là `build:` thay cho image. 

Oke sau khi chạy và in ra thì ta sẽ thấy ở màn hình: (nhìn màn hình chạy chạy cảm giác như hack cmn ker =)) cái này các ông đem đi lừa gái 100% bọn nó tin, à mà tất nhiên không phải gái IT nhé)

```bash
$ docker-compose up
Creating dockercompose_server_1...
Creating dockercompose_client_1...
Attaching to dockercompose_server_1, dockercompose_client_1
client_1 | Received: Hello, world
client_1 |
client_1 | Received: Hello, world
client_1 |
```

> Nó tè 2: Nếu bạn bị gặp lỗi kiểu: *“Couldn’t connect to Docker daemon at http+unix://var/run/docker.sock—is it running?”* thì rất có thể nó liên quan đến quyền **sudo** khi chạy docker. Mình có reference link ở trên rồi, kéo lên đọc lại nhé =))

Ok nếu xem đủ rồi thì bạn có thể Ctrl + C để thoát khỏi app. Bạn có thể khởi động lại nó dễ dàng bằng lệnh up như nãy mà không cần phải nghĩ đến việc remove hay gì cả. Nhớ rằng khi khởi tạo lại thì ở màn hình sẽ hiện là **Recreating** thay vì **Creating** như nãy.

# 4. Chốt tộ
Bài viết này chỉ ra cho bạn những vấn đề mà **Docker Compose** giải quyết giúp bạn trong thực tế mà khi bạn chạy tay (hay còn gọi là chạy chay) thì dễ xảy ra lỗi. **Docker Compose** hay nói cách khác giúp bạn đóng gói ứng dụng, service, hỗ trợ bạn luồng chạy mà bạn phải config tay hoặc phải define sẵn qua scripts (mặc dù nguyên lý làm cũng tương tự thôi, chả qua là có người làm cho bạn ăn sẵn thuôi). 

Điều mà mình thích ở thằng này đó là khả năng xây dựng nhanh (vì bạn chỉ cần define ra 1 file và bấm 1 lệnh duy nhất) khi stop hay recreate lại cũng cực kỳ nhanh), hỗ trợ rất nhiều trong việc đồng bộ môi trường làm việc giữa các dev, nhất trong giai đoạn dự án mới start. Hơn nữa config dễ hiểu cũng giúp cho người đọc dù là chưa biết gì cũng có thể mường tượng ra được.

Ở bài viết sau mình sẽ đề cập đến 1 vài ví dụ cụ thể hơn, chỉ ra điểm yếu mạnh của công cụ này, và có thể đưa chúng ta đến 1 công cụ mới, thứ mà giúp chúng ta tiếp cận gần hơn đến môi trường productions, đó là **k8s**. Cảm ơn anh em đã đọc, mọi thắc mắc chửi bới như thường lệ, hãy comments phía dưới để mình có thể cùng thảo luận.