Docker có thể build các images 1 cách tự động bằng các đọc các lệnh bên trong Dockerfile. Dockerfile là 1 file text chứa tất cả các command mà người dùng có thể sử dụng để xây dựng nên 1 image. Người dùng có thể sử dụng lệnh ```docker build``` để tự động thực hiện các command-line đã được viết trong Dockerfile.
Phần này sẽ mô tả các command mà bạn có thể sử dụng trong Dockerfile.

# Usage
**Docker build** command sử dụng để build 1 image từ Dockerfile và *context*. **Context** là tập hợp các file được chỉ định bởi **PATH** hoặc **URL**. **PATH** là thư mục ở local còn **URL** là vị trí của Git repository.
Context là 1 chương trình đệ quy. Vì thế nên **PATH** sẽ bao gồm tất cả các subfolders và **URL** bao gồm cả repo và các submodules của nó. VD dưới đây sẽ cho thấy việc thực hiện build command với việc sử dụng thư mục hiện tại làm context.

```
$ docker build .
Sending build context to Docker daemon  6.51 MB
...
```

Việc build được chạy bởi Docker daemon chứ không phải bằng CLI. Cho ai chưa rõ về 2 phần Docker daemon và Docker CLI thì mình sẽ giải thích 1 chút
![](https://images.viblo.asia/a51947fd-05d1-4ef1-8b23-93aa1e23dc3f.jpg)

Ta sẽ đi định nghĩa các layer từ dưới lên:
1. Docker daemon là 1 service chạy trên hệ điều hành của máy chủ. Nó thường chỉ chạy trên linux vì nó phụ thuộc vào số Linux kernel nhưng cũng có vài cách để có thể chạy Docker trên MacOS và Windows. Docker daemon lắng nghe các REST API request và thực hiện các quy trình kèm theo.
2. REST API là phương thức kết nối chính giữa Docker Client và Docker Daemon. Nhờ những API này mà các tools khác nhau có thể giao tiếp với daemon.
3. Tool được sử dụng rộng rãi nhất là Docker CLI. Nó là command line tool giúp bạn giao tiếp với Docker daemon. Khi bạn cài đặt Docker, bạn sẽ phải cài đặt cả Docker Daemon và Docker CLI.

Bạn có thể tưởng tượng Docker như 1 mô hình client <-> server. Daemon là server và CLI chỉ là 1 trong rất nhiều các clients. Có rất nhiều các third party clients khác bên cạnh đó. Bạn có thể tìm và sử dụng 1 cái phù hợp với yêu cầu của bạn hoặc tự tạo riêng cho mình 1 cái nếu bạn muốn (có thể :))))). Dù sao đi nữa thì bạn vẫn phải sử dụng REST API đã được định nghĩa sẵn. Bạn có thể sử dụng client để quản lý các components khác nhau của daemon như là images, containers, networks và data volumes.

Việc đầu tiên trong quá trình build 1 process đó là gửi toàn bộ context cho daemon. Trong hầu hết trường hợp, tốt nhất nên bắt đầu với 1 thư mục rỗng như là 1 context và để Dockerfile trong thư mục đó. Chỉ thêm các files cần thiết cho việc building Dockerfile.

> **Warning**: Không dùng thư mục root, **/**, làm **PATH** vì nó sẽ khiến cho việc build sẽ chuyển toàn bộ nội dung của ổ đĩa đến Docker daemon.
Để có thể sử dụng file trong build context, Dockerfile cung cấp cho ta lệnh **COPY**. Để tăng tốc độ build thì ta có  thể loại trừ 1 số files hay directories bằng cách thêm file .dockerignore vào thư mục context.

Thường thường thì Dockerfile sẽ đặt tên đúng là Dockerfile và được đặt ở root của context. Bạn có thể sử dụng **-f** flag với docker build để chỉ đến Dockerfile ở bất kỳ đầu trong hệ thống.
```
$ docker build -f /path/to/a/Dockerfile .
```

Bạn có thể chỉ định 1 repository và tag để lưu image mới được tạo nếu build thành công:
```
$ docker build -t shykes/myapp .
```
Để tạo nhiều tag cho image ta có thể add nhiều **-t** flag khi chạy build command:
```
$ docker build -t shykes/myapp:1.0.2 -t shykes/myapp:latest .
```
Trước khi Docker daemon chạy theo lệnh trong Dockerfile, nó sẽ thực hiện 1 lần validate sơ bộ Dockerfile và trả ra lỗi nếu phát hiện bất kỳ lỗi syntax nào
```
$ docker build -t test/myapp .
Sending build context to Docker daemon 2.048 kB
Error response from daemon: Unknown instruction: RUNCMD
```

Docker daemon chạy các lệnh theo Dockerfile từng cái 1, commit kết quả lại theo từng phần đến image mới nếu có thể trước khi trả về ID của image mới được tạo. Docker daemon sẽ tự động clean up context đã gửi trước đó.
Lưu ý rằng mỗi lệnh được chạy độc lập với nhau cho nên nếu bạn có 1 đoạn lệnh **RUN cd /tmp** nó sẽ không có tác dụng đối với các lệnh sau.
Khi có thể, Docker sẽ tái sử dụng các image có sẵn (cache), để tăng tốc quá trình docker build. Điều này được chỉ ra bởi dòng **Using cache** trong console output.
```
$ docker build -t svendowideit/ambassador .
Sending build context to Docker daemon 15.36 kB
Step 1/4 : FROM alpine:3.2
 ---> 31f630c65071
Step 2/4 : MAINTAINER SvenDowideit@home.org.au
 ---> Using cache
 ---> 2a1c91448f5f
Step 3/4 : RUN apk update &&      apk add socat &&        rm -r /var/cache/
 ---> Using cache
 ---> 21ed6e7fbb73
Step 4/4 : CMD env | grep _TCP= | (sed 's/.*_PORT_\([0-9]*\)_TCP=tcp:\/\/\(.*\):\(.*\)/socat -t 100000000 TCP4-LISTEN:\1,fork,reuseaddr TCP4:\2:\3 \&/' && echo wait) | sh
 ---> Using cache
 ---> 7ea8aef582cc
Successfully built 7ea8aef582cc
```

Build cache chỉ được sử dụng từ các image mà có mắt xích kết nối với nhau. Điều này đồng nghĩa với việc những images được tạo bởi các bản build trước hoặc các images được load bởi **docker load**. Nếu bạn muốn build cache của 1 image xác định thì bạn cần phải chỉ định nó với option **--cache-from**.

# Format
Sau đây là format của Dockerfile:
```
# Comment
INSTRUCTION arguments
```

Các lệnh (instruction) không phân biệt chữ hoa chữ thường. Tuy nhiên ta nên viết hoa INSTRUCTION để phân biệt nó với arguments.
Docker chạy các lệnh trong Dockerfile theo thứ tự. Dockerfile **bắt buộc bắt đầu bằng FROM**. Lệnh **FROM** chỉ định Base Image bạn đang build là gì. Docker coi các dòng bắt đầu với **#** như 1 comment. Trừ khi dòng đó là 1 *parser directive*. **#** ở bất kì đâu trong dòng được coi như 1 đối số. Điều này cho phép statement dạng:
```
# Comment
RUN echo 'we are running some # of cool things'
```

Ký tự tiếp nối dòng không được hỗ trợ trong comments.
# Parser directives
Parser directive là không bắt buộc, và có thể ảnh hưởng đến cách dòng tiếp theo trong Dockerfile được xử lý. Parser directive không thêm layers cho lệnh build và sẽ không được coi như là 1 build step. Parse directives được viết như 1 dạng đặc biệt của comment theo form **# directive=value**. 1 directive chỉ có thể được sử dụng 1 lần.
1 khi đã comment, dòng trống hoặc các lệnh build đã được thực hiện,  Docker sẽ không quan tâm đến parser directives. Thay vào đó nó coi tất cả những thứ có dạng như parser directives là 1 comment và sẽ không đưa vào validate. Do đó, tất cả các parser directives phải được viết ở đầu Dockerfile.
Parser directives không phân biệt chữ hoa chữ thường. Tuy nhiên convention cho nó là chữ thường. Convention cũng bao gồm cả dòng trống theo sau bất kỳ parser directives nào. Ký tự tiếp nối dòng cũng không được hỗ trợ trong parser directives. Theo các quy tắc đó, các lệnh sau là sai:
1.  Sai ký tự tiếp nối dòng
```
# direc \
tive=value
```
2.  Lỗi sai do khai báo 2 lần
```
# directive=value1
# directive=value2

FROM ImageName
```
3.  Coi như 1 comment do xuất hiện bên dưới các lệnh build
```
FROM ImageName
# directive=value
```
4.  Coi như comment do xuất hiện sau 1 comment mà không phải parser directive
```
# About my dockerfile
# directive=value
FROM ImageName
```
5.  unknowndirective coi như 1 comment do docker không nhận ra được vì lỗi chính tả. Thêm vào đó, knowndirective cũng được coi như comment do xuất hiện sau 1 comment mà không phải parser directive
```
# unknowndirective=value
# knowndirective=value
```
6.  Khoảng trắng phía trước là hợp lệ nên tất cả các dòng sau đều được coi là 1 parser directive giống nhau.
```
#directive=value
# directive =value
#	directive= value
# directive = value
#	  dIrEcTiVe=value
```
7.  Những parser directive sau đây được hỗ trợ
```
syntax
escape
```

# Escape
```
# escape=\ (backslash)
```
hoặc
```
# escape=` (backtick)
```
Escape directive quy định character được sử dụng làm escape characters trong Dockerfile. Nếu không được chỉ định thì mặc định sẽ là **\ .**
Escape character cho phép các lệnh Dockerfile được chia làm nhiều dòng. Lưu ý rằng mặc dù escape parser directive được thêm vào Dockerfile tuy nhiên escape sẽ không được thực hiện trong RUN command trừ khi nó ở cuối dòng.
Cài đặt escape character thành **\`** rất hữu dụng trong Window khi mà \ được coi là ký tự phân cách thư mục. Cân nhắc ví dụ sau sẽ fail trong 1 vài trường hợp nào đó ở WIndows. Dấu \ ở dòng thứ 2 có thể được hiểu như 1 ký tự ngắt dòng mới thay vì hiểu rằng nó là 1 escape character cho ký tự \. Tương tự, ký tự \ ở cuối dòng 3 có  thể hiểu như ta sẽ viết dòng thứ 4 là nối tiếp của dòng thứ 3. Kết quả của dockerfile này sẽ là dòng thứ 2 và thứ 3 sẽ chỉ được coi như 1 lệnh đơn:
```
FROM microsoft/nanoserver
COPY testfile.txt c:\\
RUN dir c:\
```
Trả về:
```
PS C:\John> docker build -t cmd .
Sending build context to Docker daemon 3.072 kB
Step 1/2 : FROM microsoft/nanoserver
 ---> 22738ff49c6d
Step 2/2 : COPY testfile.txt c:\RUN dir c:
GetFileAttributesEx c:RUN: The system cannot find the file specified.
PS C:\John>
```
Bằng cách thêm escape parser directive là **\`**, Dockerfile sẽ thành công trên Windows mà không gặp các vấn đề về ký tự phân chia PATH:
```
# escape=`

FROM microsoft/nanoserver
COPY testfile.txt c:\
RUN dir c:\
```
Kết quả:
```
PS C:\John> docker build -t succeeds --no-cache=true .
Sending build context to Docker daemon 3.072 kB
Step 1/3 : FROM microsoft/nanoserver
 ---> 22738ff49c6d
Step 2/3 : COPY testfile.txt c:\
 ---> 96655de338de
Removing intermediate container 4db9acbb1682
Step 3/3 : RUN dir c:\
 ---> Running in a2c157f842f5
 Volume in drive C has no label.
 Volume Serial Number is 7E6D-E0F7

 Directory of c:\

10/05/2016  05:04 PM             1,894 License.txt
10/05/2016  02:22 PM    <DIR>          Program Files
10/05/2016  02:14 PM    <DIR>          Program Files (x86)
10/28/2016  11:18 AM                62 testfile.txt
10/28/2016  11:20 AM    <DIR>          Users
10/28/2016  11:20 AM    <DIR>          Windows
           2 File(s)          1,956 bytes
           4 Dir(s)  21,259,096,064 bytes free
 ---> 01c7f3bef04f
Removing intermediate container a2c157f842f5
Successfully built 01c7f3bef04f
PS C:\John>
```
# Environment replacement
Các biến môi trường (được định nghĩa bởi lệnh ENV) có thể được sử dụng trong các lệnh nhất định dưới dạng các biến được Dockerfile diễn giải. Escape cũng được xử lý để chứa đựng các cú pháp dạng biến thành 1 câu lệnh theo nghĩa đen.
Các biến môi trường được ký hiệu trong Dockerfile theo 2 cách: $variable_name hoặc ${variable_name}. Cú pháp ${variable_name} hỗ trợ 1 vài chuẩn sau:
* ${variable:-word} chỉ ra rằng nếu variable được thiết lập rồi thì kết quả sẽ theo là giá trị đó còn nếu không thì word sẽ thay thế nó.
* ${variable:+word} chỉ ra rằng nhếu variable được thiết lập rồi thì kết quả sẽ là theo word còn ngược lại kết quả sẽ là empty string.
VD:
```
FROM busybox
ENV foo /bar
WORKDIR ${foo}   # WORKDIR /bar
ADD . $foo       # ADD . /bar
COPY $foo /quux # COPY $foo /quux
```

Biến môi trường hỗ trợ 1 số lệnh sau trong Dockerfile:
* ADD
* COPY
* ENV
* EXPOSE
* FROM
* LABEL
* STOPSIGNAL
* USER
* VOLUME
* WORKDIR

# .dockerignore file
Trước khi docker CLI gửi context cho docker daemon, nó sẽ tìm kiếm file .dockerignore trong root directory của context. Nếu file này tồn tại thì CLI sẽ điều chỉnh để context loại các file/folder match với các patterns trong đó. Việc này sẽ giúp tránh việc gửi 1 lượng lớn dữ liệu không cần thiết hoặc các file chứa thông tin nhạy cảm :kissing_closed_eyes: Sau đó nếu muốn thêm 1 vài file cụ thể nào đó thì có thể dùng lệnh ADD hoặc COPY.
VD về file .dockerignore
```
# comment
*/temp*
*/*/temp*
temp?
```
Giải thích 1 chút:


| **Ký hiệu** | **Giải thích** |
| -------- | -------- |
| # comment     | Bỏ qua     | 
| \*/temp\*     | loại trừ các file và thư mục có tên bắt đầu bằng temp trong thư mục root  VD: /somedir/temp   | 
| \*\/\*\/temp\*     | Loại trừ các file và thư mục có tên bắt đầu bằng temp từ các subdirectory có lvl bằng 2 tính từ root VD /somedir/subdir/tempaa.txt     | 
|  temp?    | Ngoại trừ các file và thư mục ở thư mục root có có tên dạng mở rộng của temp như /tempa hay /tempb      |

Dòng bắt đầu bằng **!** có thể được sử dụng như 1 ngoại lệ của việc ignore. Dưới đây là 1 VD:
```
    *.md
    !README.md
```
Tất cả các file .md sẽ bị loại bỏ ngoại trừ file README.md