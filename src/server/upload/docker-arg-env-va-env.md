```
Error: Docker image build failed.
```

![](https://images.viblo.asia/a7078c8f-8082-4aa7-bfb0-cc469f26d8e1.png)

Xây dựng lại các images bằng Docker và cấu hình chúng, chắc không ít bạn gặp các vấn đề liên quan đến biến môi trường, argument... dùng cho các images đó. Bài chia sẻ này mình sẽ giúp các bạn phần nào hiểu thêm về ARG, ENV, env_file và .env, để có thể làm việc với Docker tự tin hơn. Bạn sẽ hiểu cách cấu hình image Docker và các ứng dụng docker một cách dễ dàng - với sức mạnh của biến build-time (tồn tại trong quá trình build image), biến môi trường và template docker-compose.

## Khái niệm

Hãy bắt đầu với một số khái niệm bạn có thể hiểu và sử dụng ngay bây giờ, mà không cần thiết phải đọc toàn bộ bài viết của mình!

Dưới đây là danh sách các khái niệm mà bạn có thể hiểu 1 cách dễ dàng:

* File **.env** : chỉ được sử dụng trong các bước xử lý trước khi làm việc với file `docker-compose.yml`. Các biến môi trường có ký hiệu $ như $HI được thay thế cho các giá trị có trong tệp tin .env trong cùng thư mục.
* **ARG** : chỉ khả dụng trong quá trình build docker image (như trong câu lệnh RUN), không khả dụng sau khi image được tạo ra và các container được khởi động từ nó (ENTRYPOINT, CMD). Bạn cũng có thể sử dụng giá trị ARG để set giá trị ENV để làm việc trong đó.
* **ENV** : là các giá trị ENV có sẵn trong container, nhưng cũng có các lệnh RUN được chạy trong quá trình Docker build, bắt đầu xuất hiện và khả dùng từ dòng lệnh mà chúng được khai báo.
* Nếu đặt biến môi trường trong các container trung gian bằng cách sử dụng bash (RUN export VARI = 5 &&,), thì nó sẽ không tồn tại trong các command tiếp theo, 
* **env_file** :  là một cách thuận tiện để truyền nhiều biến môi trường cho một lệnh trong một batch. Điều này không nên nhầm lẫn với một tập tin `.env` .
* Đặt giá trị **ARG** và **ENV**, nó sẽ ở lại trong Docker image. Với những key cần được bảo mật, bạn không nên sử dụng cách này.

## Tổng quan

Chúng ta sẽ cùng đi vào chi tiết của từng chủ đề như sau:

* File Dot-Env (.env)
* ARG và ENV
* Setting giá trị ARG
* Setting giá trị ENV
* Ghi đè giá trị ENV

###  File Dot-Env (.env)

Điều này khá đơn giản và chỉ gây nhầm lẫn vì các thí dụ xấu và các khái niệm tương tự sử dụng cùng định dạng, nhìn sẽ khá giống với nó. Điều quan trọng nhất là dấu chấm ở phía trước env - .env, không phải là một env_file.

Nếu có file tên là `.env` trong dự án của bạn, nó chỉ được sử dụng để đặt các giá trị vào file `docker-compose.yml` trong cùng thư mục. Chúng được sử dụng với Docker Compose và Docker Stack. Nó không liên quan gì đến ENV, ARG hoặc bất cứ điều gì cụ thể về Docker được giải thích ở phía trên. Mục đích duy nhất cho nó chỉ là `docker-compose.yml`.

Các giá trị trong file `.env `được viết cú pháp như sau:

```
VARIABLE_NAME=some value
OTHER_VARIABLE_NAME=some other value, like 5
```

Format chung sẽ là cặp key-values, được sử dụng để thay thế các biến được ký hiệu đô la trong tệp `docker-compose.yml`. Đây là một bước tiền xử lý và tệp tạm thời được sử dụng. Đây là một cách khá là hay để tránh việc hard-code giá trị của các biến môi trường. Bạn cũng có thể sử dụng điều này để đặt các giá trị cho các biến môi trường, bằng cách thay thế chuỗi, nhưng điều đó không được xảy ra một cách tự động.

Dưới đây là ví dụ về tệp `docker-compose.yml`, dựa trên các giá trị được cung cấp từ tệp `.env`

```
version: '3'

services:
  plex:
    image: linuxserver/plex
      environment:
        - env_var_name=${VARIABLE_NAME} # here it is
```

Gợi ý: Khi làm việc với tệp `.env`, bạn có thể tìm lỗi các tệp `docker-compose.yml` của mình khá dễ dàng. Chỉ cần gõ `docker-compose config `. Bằng cách này, bạn sẽ thấy nội dung tệp `docker-compose.yml` trông như thế nào sau khi bước thay thế được thực hiện mà không thấy sự thay đổi trên đó.

### ARG and ENV

Khi sử dụng Docker, chúng ta cần phân biệt sự khác nhau giữa hai loại biến - `ARG` và `ENV`.

**ARG** còn được gọi là biến build-time(chỉ hoạt động trong quá trình build images). Chúng chỉ khả dụng kể từ thời điểm chúng được 'công bố' trong Dockerfile trong câu lệnh `ARG` cho đến khi image được tạo. Khi chạy container, chúng ta không thể truy cập giá trị của các biến `ARG`. Điều này cũng được áp dụng cho các lệnh `CMD` và `ENTRYPOINT`, nói lên rằng container sẽ chạy theo mặc định. Nếu bạn thông báo trong Dockerfile các biến ARG với các giá trị mong đợi (mà không có giá trị mặc định) nhưng không được cung cấp khi chạy lệnh build, chúng ta sẽ nhận được thông báo lỗi ngay sau đó.

Tuy nhiên, các giá trị ARG có thể được kiểm tra dễ dàng bằng cách chạy `docker history` của image sau khi được tạo ra. Vì vậy, `ARG` không được lựa chọn sử dụng cho các dữ liệu nhạy cảm, mang tính bảo mật cao.

Các biến **ENV** cũng có sẵn trong quá trình xây dựng, ngay khi bạn khai báo chúng với một command của ENV. Tuy nhiên, không giống như ARG, khi build xong image, các container chạy image có thể truy cập giá trị ENV này. Các container chạy từ image có thể ghi đè giá trị của ENV.

![](https://images.viblo.asia/6700f42e-bcdb-4b21-8a0e-0cf6cddb9446.png)

### Setting giá trị ARG

Khi bạn có file Dockerfile, làm thế nào để bạn định nghĩa được ARG, ENV, thiết lập chúng ra sao và ở đâu ? Bạn cũng có thể để trống chúng trong Dockerfile hoặc đặt cho chúng các giá trị mặc định. Nếu bạn không cung cấp giá trị cho các biến ARG không có giá trị mặc định, bạn sẽ nhận được thông báo lỗi.

Dưới đây là 1 ví dụ Dockerfile, ví dụ bao gồm cả TH bạn khai báo giá trị mặc định cho ARG và không khai báo giá trị mặc định cho ARG:

```
ARG some_variable_name
# or with a hard-coded default:
#ARG some_variable_name=default_value

RUN echo "Oh dang look at that $some_variable_name"
# you could also use braces - ${some_variable_name}
```

Khi bạn build Docker image từ dòng lệnh như dưới đây, bạn có thể đặt các giá trị ARG bằng cách sử dụng `--build-arg`:

```
docker build --build-arg some_variable_name=a_value
```

Khi bạn chạy command này với Dockerfile ở trên, bạn sẽ nhận được output như sau:

```
Oh dang look at that a_value
```

Vì vậy, làm thế nào để sử dụng chúng các tập tin `docker-compose.yml`? Khi sử dụng `docker-compose`, bạn có thể chỉ định các giá trị được truyền cho **ARG**, trong  `args` :

(docker-compose.yml file)
```
version: '3'

services:
  somename:
    build:
      context: ./app
      dockerfile: Dockerfile
      args:
        some_variable_name: a_value
```

### Setting giá trị ENV

Vậy, làm thế nào để thiết lập giá trị ENV? Bạn có thể làm điều đó khi start các container (và chúng tôi sẽ xem xét điều này một chút bên dưới), nhưng bạn cũng có thể cung cấp các giá trị ENV mặc định trực tiếp trong Dockerfile của mình bằng fix cứng giá trị cho chúng. Ngoài ra, bạn có thể set động giá trị mặc định cho các biến môi trường!

Khi build image, điều duy nhất bạn có thể cung cấp là các giá trị ARG, như được mô tả ở phần trên. Bạn không thể cung cấp giá trị cho các biến ENV trực tiếp. Tuy nhiên, cả ARG và ENV đều có thể hoạt động cùng nhau. Bạn có thể sử dụng **ARG** để đặt các giá trị mặc định của các khai báo ENV. Hãy cùng xem Dockerfile sau đây, chúng ta sẽ sử dụng các giá trị mặc định bằng cách hard-code:

```
# no default value
ENV hey
# a default value
ENV foo /bar
# or ENV foo=/bar

# ENV values can be used during the build
ADD . $foo
# or ADD . ${foo}
# translates to: ADD . /bar
```

Sau đây là một phần của Dockerfile, sử dụng các giá trị env động khi build image:

```
# expect a build-time variable
ARG A_VARIABLE
# use the value to set the ENV var default
ENV an_env_var=$A_VARIABLE
# if not overridden, that value of an_env_var will be available to your containers!
```

Khi image được build, các bạn có thể khởi chạy các container và cung cấp các giá trị cho các biến **ENV** theo ba cách khác nhau , từ dòng lệnh hoặc sử dụng tệp `docker-compose.yml`. Tất cả những thứ đó sẽ ghi đè mọi giá trị **ENV** mặc định trong Dockerfile. Không giống như **ARG**, bạn có thể chuyển tất cả các loại biến môi trường vào container. Ngay cả những cái không được định nghĩa rõ ràng trong Dockerfile. Nó phụ thuộc vào ứng dụng của bạn cần bao nhiêu biến môi trường mà thôi.

1. Cung cấp từng giá trị một

Với cách này, bạn sẽ sử dụng flag *-e*:

```
$ docker run -e "env_var_name=another_value" alpine env
```

Từ file docker-compose.yml:

```
version: '3'

services:
  plex:
    image: linuxserver/plex
      environment:
        - env_var_name=another_value
```

2. Truyền giá trị biến môi trường từ máy chủ của bạn

Nó giống như phương pháp trên. Sự khác biệt duy nhất là, chúng ta sẽ không cung cấp một giá trị, mà chỉ cung cấp tên biến môi trường. Điều này sẽ giúp cho Docker truy cập giá trị hiện tại trong môi trường máy chủ và chuyển nó vào container.

```
$ docker run -e env_var_name alpine env
```

Đối với file `docker-compose.yml`

```
version: '3'

services:
  plex:
    image: linuxserver/plex
      environment:
        - env_var_name
```

3. Lấy từ một file biến môi trường (env_file)

Thay vì viết các biến ra hoặc hard-code giá trị cho biến môi trường, chúng ta có thể chỉ định một file chứa các biến môi trường để đọc các giá trị từ đó. Nội dung của một file đó như sau:

```
env_var_name=another_value
```

File ở trên được gọi là `env_file_name` (tên tùy ý các bạn đặt sao cho dễ hiểu nhé) và nó nằm trong thư mục bạn đang sử dụng. Bạn có thể tham chiếu tên file được phân tích cú pháp để trích xuất các biến môi trường cần lấy như sau:

```
$ docker run --env-file=env_file_name alpine env
```

Với `docker-compose.yml` , ta chỉ cần tham chiếu `env_file` và Docker sẽ tự động phân tích cú pháp của file đó và trích xuất các biến cần setting.

```
version: '3'

services:
  plex:
    image: linuxserver/plex
    env_file: env_file_name
```

Dưới đây là một bảng tóm tắt ngắn gọn, kết hợp tổng quan về tính khả dụng của ARG và ENV với các cách phổ biến để setting chúng từ các dòng lệnh

![](https://images.viblo.asia/775aea14-49e4-41c1-90a2-c34ff2efbf61.png)

Trước khi chúng ta tiếp tục, nếu bạn chưa quen với Docker và chưa từng nghĩ về image và container, nếu các bạn cố gắng setting giá trị của biến môi trường từ bên trong câu lệnh **RUN** như thế này `RUN export VARI=5 && ...,` bạn sẽ không có quyền truy cập với nó trong bất kỳ câu lệnh RUN tiếp theo nào. Lý do cho điều này, là vì mỗi câu lệnh RUN, một vùng chứa mới được khởi chạy từ một image trung gian. Image sẽ được lưu bởi câu lệnh cuối cùng trong Dockerfile, nhưng các biến môi trường sẽ không tồn tại ở thời điểm đó.

Nếu bạn tò mò về một image và muốn biết liệu nó có cung cấp các giá trị biến **ENV** mặc định trước khi container được khởi động, bạn có thể kiểm tra images và xem các mục ENV nào được setting giá trị mặc định:

```
# first, get the images on your system and their ids
$ docker images
# use one of those ids to take a closer look
$ docker inspect image-id

# look out for the "Env" entries
```

Nếu bạn có rất nhiều cách khác nhau để thiết lập các giá trị của các biến ENV, thì đâu sẽ là cách giúp chúng ta sẽ ghi đè giá trị lên các biến có sẵn?

### Ghi đè giá trị ENV 

Giả sử, bạn có một image được build từ Dockerfile, cung cấp các giá trị **ENV** mặc định. Các container start từ image đó, có quyền truy cập vào các biến **ENV** được xác định trong Dockerfile. Tuy nhiên, các giá trị đó có thể được **ghi đè** bằng cách cung cấp các biến môi trường đơn hoặc *env_files* , từ đó các biến môi trường được phân tích cú pháp và chuyển vào container.

Khi một tiến trình chạy bên trong container hoặc khi một lệnh được chỉ định, có thể thay đổi các giá trị biến môi trường. Những thứ như:

```
$ docker run myimage SOME_VAR=hi python app.py
```

sẽ ghi đè hoàn toàn bất kỳ SOME_VAR nào mà bạn có thể đã đặt giá trị khác cho scripts app.py, ngay cả khi có một số giá trị được khai báo với flag -e trước lệnh cuối cùng.

Thứ tự ưu tiên để đưa biến môi trường vào các bộ ứng dụng được đóng gói như sau: giá trị biến của biến môi trường được khai báo đơn lẻ > giá trị từ env_file (s) > mặc định Dockerfile.
 
## Tổng kết 

Trên đây mình đã giới thiệu với các bạn về tất cả các cách có thể đặt các biến ARG và ENV khi build Docker images và chạy các container. Đến bây giờ, bạn đã có một cái nhìn tổng quan về đối số build-time, các biến môi trường, env_files và docker-compose templating với các tệp .env.

Để thực sự nắm vững các khái niệm này, chỉ đọc về chúng thôi là chưa đủ. Bạn phải thấy và hiểu cách chúng hoạt động, bên cạnh đó phải áp dụng chúng vào công việc hằng ngày để thực sự biến chúng thành một phần kỹ năng mà bạn có. Cách tốt nhất để đảm bảo bạn sẽ có thể sử dụng những kỹ thuật này, là học bằng thực hiện - tiếp tục và thử một số kỹ thuật này trong các dự án hiện tại của bạn!

Nguồn tài liệu: https://vsupalov.com/docker-arg-env-variable-guide/