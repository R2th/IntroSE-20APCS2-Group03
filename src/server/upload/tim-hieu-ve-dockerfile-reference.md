Trong [bài viết trước](https://viblo.asia/p/Do754e1JKM6), mình đã tìm hiểu về Docker Hub với một image kinh điển và đơn giản là "Hello World". Vậy bạn có thắc mắc, làm thế nào để định nghĩa 1 image khác hay định nghĩa project của bạn thành 1 image. Hãy cùng mình tìm hiểu về Dockerfile để trả lời câu hỏi này nhé :)

### 1. Giới thiệu
Để có thể tự động build 1 image thì chúng ta phải có **Dockerfile**. **Dockerfile** là một file text bao gồm các dòng instructions - là các lệnh mà người dùng có thể call để build 1 image image. Sau đó, bạn có thể sử dụng lệnh `docker build` để build Dockerfile thành image.

Nói cách khác, **Dockerfile** chính là một bản định nghĩa các hướng dẫn để build 1 Docker Image.

Trước khi tìm hiểu về cách tạo 1 Dockerfile thì chúng ta sẽ tìm hiểu 1 số khái niệm nhé

**instructions**

Cấu trúc của 1 Dockerfile sẽ bao gồm các dòng **instructions**, có format kiểu như vậy
```
# Comment
INSTRUCTION arguments
```

Lưu ý:
>>- **INSTRUCTION** không phân biệt chữ hoa hay chữ thường, nhưng convention quy ước **viết hoa** để phân biệt với **arguments**
>>- Docker sẽ run các instructions theo thứ tự chúng được định nghĩa trong dockerfile
>>- Mỗi Dockerfile luôn bắt đầu bằng 1 FROM instruction. instruction này sẽ chỉ định image gốc cho image mà bạn muốn build.

<br>

**Docker Image và layer**

Image được định nghĩa trong Dockerfile thường là 1 image được build từ 1 base-image có sẵn. Image mới sẽ được tạo ra bằng cách thêm các layer mới trên một base-image đã tồn tại.

### 2. Environment replacement

Các biến môi trường được hỗ trợ của **Dockerfile** bao gồm:
- ADD
- COPY
- ENV
- EXPOSE
- FROM
- LABEL
- STOPSIGNAL
- USER
- VOLUME
- WORKDIR
- ONBUILD

**FROM**

Cú pháp:
```
FROM [--platform=<platform>] <image> [AS <name>]
```
hoặc
```
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```
hoặc
```
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```

FROM instruction khởi tạo một bản build mới và set Base Image cho image cần được xây dựng. 
>> Một Dockerfile luôn phải bắt đầu với 1 FROM instruction.
- ARG là instruction duy nhất có thể dứng trước FROM trong Dockerfile.
    - `ARG` đứng trước FROM để khai báo tham số cho FROM
        ```
        ARG  CODE_VERSION=latest
        FROM base:${CODE_VERSION}
        CMD  /code/run-app
        ```
    - Sau FROM, sẽ không thể sử dụng lại ARG đã khai báo. Nếu muốn sử dụng lại, bạn cần phải khai báo ARG lại 1 lần nữa bằng cách khai báo và không truyền giá trị
         ```
        ARG VERSION=latest
        FROM busybox:$VERSION
        ARG VERSION
        RUN echo $VERSION > image_version
         ```
- Trong 1 Dockerfile có thể có nhiều FROM để tạo nhiều images hoặc sử dụng như là một dependency. Các FROM trước cần note lại image ID output cho FROM phía sau vì mỗi FROM instruction sẽ clear mọt state của các instruction trước nó.
- Bạn có thể đặt tên cho mỗi build stage bằng cách sử dụng keyword `AS` trong lệnh FROM. Tên này có thể được sử dụng trong các FROM tiếp theo để tham chiếu đến các bản build trước đó.
- `tag` và `digest` đều là các tùy chọn. Nếu bạn bỏ qua một trong hai, trình khởi tạo mặc định sẽ tạo một tag mới nhất và trả về lỗi nếu nó không thể tìm thấy  tag.
- Bạn có thể thêm option `--platform` để chỉ định platform trong trường hợp base-image là multi-platform image.

**RUN**

RUN có 2 format

Một dùng cho shell form, lệnh sẽ được chạy như một shell, mặc định tại /bin/sh -c với Linux hoặc cmd /S /C với Windows
```
RUN <command> 
```
một dùng để thực thi trực tiếp lệnh
```
RUN ["executable", "param1", "param2"] 
```
RUN sẽ thực hiện bất kỳ lệnh nào được khai báo trong layer mới. Nếu RUN được khai báo dưới dạng 1 shell, thì các lệnh sẽ được thực hiện tương tự 1 shell, ngược lại các lệnh này sẽ được thực hiện độc lập với nhau.
Ví dụ:
Nếu bạn dùng shell form
```
ENV home 'my home'
RUN echo $home'
```
Kết quả bạn nhận được sẽ là
```
my home
```

Ngược lại nếu bạn dùng exec form
```
ENV home 'my home'
RUN [ "echo", "$home" ]
```
Kết quả sẽ chỉ có như vậy
```
$home
```

**CMD**

Có 3 kiểu khai báo CMD
The CMD instruction has three forms:

- CMD ["executable","param1","param2"] (exec form, this is the preferred form)
- CMD ["param1","param2"] (as default parameters to ENTRYPOINT)
- CMD command param1 param2 (shell form)

Mục đích của CMD là cung cấp các lệnh thực thi cho image contrainer. CMD cho phép ta set các lệnh mặc định, có nghĩa là các lệnh này sẽ chỉ được chạy nếu khi run container mà không chỉ định một lệnh cụ thể. Ngược lại, nếu docker run container với một lệnh thì lệnh default sẽ bị ignore.

>> Chỉ nên khai báo duy nhất 1 dòng CMD trong Dockerfile. Nếu bạn viết nhiều hơn, dòng CMD cuối cùng sẽ có hiệu lực.

>> Đừng nhầm lẫn RUN với CMD nhé :) RUN thực thi một lệnh và cam kết kết quả khi build image còn CMD không thực thi bất cứ lệnh nào tại thời điểm build image, nó chỉ định nghĩa các lệnh mặc định cho image container.

**LABEL**
```
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```
LABEL thêm các metadata cho image, dưới dạng các cặp key-value. Bạn có thể viết các cặp key-value trên cùng 1 dòng và ngăn cách chúng bởi khoảng trắng, dấu gạch chéo hoặc khai báo chúng trên nhiều dòng khác nhau. 
```
LABEL multi.label1="value1" multi.label2="value2" other="value3"
```
```
LABEL multi.label1="value1" \
      multi.label2="value2" \
      other="value3"
```
```
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

**MAINTAINER**

instruction này được sử dụng để khai báo tác giả cho image.
```
MAINTAINER <name>
```

Bạn cũng có thể sử dụng LABEL như 1 cách để khai báo maintainer
```
LABEL maintainer="SvenDowideit@home.org.au"
```

**EXPOSE**

EXPOSE khai báo cổng mạng được chỉ định trong thời gian chạy của container. 
```
EXPOSE <port> [<port>/<protocol>...]
```
Ví dụ, bạn có thể chỉ định cổng TCP hay UDP và đặt mặc định là TCP nếu giao thức không được chỉ định.
```
EXPOSE 80/tcp
EXPOSE 80/udp
```

**ENV**

ENV cho phép bạn khai báo các biến môi trường với fomat dạng
```
ENV <key>=<value> ...
```
Tương tự LABEL, ENV cho phép bạn khai báo dạng key-value thành nhiều dòng hoặc trên cùng 1 dòng và sử dụng khoảng trắng hoặc gạch chéo để ngăn cách các biến
```
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```
hoặc
```
ENV MY_NAME="John Doe" MY_DOG=Rex\ The\ Dog \
    MY_CAT=fluffy
```

**ADD**

ADD hỗ trợ 2 kiểu khai báo
```
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

Kiểu thứ 2 là bắt buộc nếu các đường dẫn của bạn chứa khoảng trắng.


ADD instruction sẽ copy các files hoặc thư mục được chỉ định tại `<src>` và move chúng tới `<dest>` của image. Bạn có thể đồng thời chỉ định nhiều `<src>` khác nhau. Mỗi `<src>` có thể chứa kí tự đặc biệt and matching theo [Go’s filepath rules](https://golang.org/pkg/path/filepath/#Match).

Ví dụ, nếu bạn muốn tạo 1 bản sao của toàn bộ các thư mục có tên bắt đầu bằng `hom`
```
ADD hom* /mydir/
```
Option `--chown` nhận giá trị là username, groupname hoặc UID/GID, cho phép bạn định nghĩa permision cho thư mục/tệp được add.
```
ADD --chown=55:mygroup files* /somedir/
ADD --chown=bin files* /somedir/
ADD --chown=1 files* /somedir/
ADD --chown=10:11 files* /somedir/
```

**COPY**

COPY cũng có 2 mẫu
```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```
COPY instruction sẽ copy các files hoặc directories từ `<src>` and thêm chúng tới `<dest>` thuộc filesystem of the container.

Tương tự ADD, `<src>` của COPY có thể chứa kí tự đặc biệt and matching theo [Go’s filepath rules](https://golang.org/pkg/path/filepath/#Match).

**ENDPOINT**
ENTRYPOINT cũng có 2 kiểu

là exec form
```
ENTRYPOINT ["executable", "param1", "param2"]
```
và shell form:
```
ENTRYPOINT command param1 param2
```
Một ENTRYPOINT sẽ cho phép bạn config container như một executable.

Khi bạn chạy lệnh `docker run <image>`, các đối số sẽ được nối sau khi các ENTRYPOINT được thực thi và sẽ ghi đè tất cả các phần tử được chỉ định bằng CMD. Bạn có thể hiểu ENTRYPOINT tương tự CMD, nhưng nó không bị ghi đè như CMD. Bạn có thể ghi đè lệnh ENTRYPOINT bằng cách sử dụng `--entrypoint`.

Ví dụ
```
FROM ubuntu
ENTRYPOINT ["top", "-b"]
CMD ["-c"]
```

Khi bạn run docker image với `top` là `-H`
```
$ docker run -it --rm --name test  top -H
```
thì kết quả sẽ là
```
$ docker exec -it test ps aux

USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  2.6  0.1  19752  2352 ?        Ss+  08:24   0:00 top -b -H
```
như bạn thấy, `-H` được nối sau `-b` và không bị ghi đè, ngược lại `-c` đã bị ignore.

<br>

Trên đây là một số tham số cần thiết và thường được sử dụng trong Dockerfile. Các đối số còn lại mình sẽ bổ sung sau nếu thấy nó thực sự cần thiết ;) Hi vọng bài viết này sẽ có ích với bạn. Nếu có gì sai sót, hãy comment cho mình biết nhé :)

Ở bài viết tiếp theo, chúng ta sẽ cùng tìm hiểu về Docker Composer. Cảm ơn và hẹn gặp lại các bạn ở bài viết tiếp theo.

Tài liệu tham khảo

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/)