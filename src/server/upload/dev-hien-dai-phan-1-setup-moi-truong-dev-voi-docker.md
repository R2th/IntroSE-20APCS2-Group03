*Bài viết gốc được mình đăng tải trên [Kipalog](https://kipalog.com/posts/Dev-hien-dai-phan-1--Setup-moi-truong-dev-voi-docker)*

Đã qua rồi cái thời kỳ nông dân ấy, khi mà cứ mỗi khi cài lại máy, tôi lại mất cả ngày để setup LAMP stack. Đã qua rồi cái thời kỳ khốn khó ấy, khi mà bookmark của tôi luôn đầy tràn những bài viết hướng dẫn "Hướng dẫn cài đặt php 5.6 lên ubuntu 14.04". Dẫu biết đó là một thời hoài niệm, nhưng tôi sẽ phải tiến lên.

## First things first

Chào các bạn. Nhân lúc thiên hạ vừa kết thúc ngày làm việc cuối cùng của năm 2018 dương lịch, mình tranh thủ làm vài dòng về những thứ mà mình đã được trải nghiệm trong công việc của một lập trình viên. Đây sẽ là một chùm bài viết ***có liên quan tới nhau*** được mình dàn dựng để dẫn các bạn tiến sâu hơn vào cuộc sống và công việc hàng ngày của một developer. Mình cũng chỉ mới nghĩ ra một số nội dung sẽ nói trong những bài viết sau, thế nên rất hy vọng mình có thể kiên trì thực hiện hết được series này dựa trên sự ủng hộ của các bạn.

Mình là Monmen, một Backend developer, vì vậy chủ yếu các nội dung mình chia sẻ sẽ xoay quanh các công nghệ backend, kiến trúc, đóng gói và triển khai ứng dụng phía server. Nếu các bạn quan tâm thì đọc tiếp nha.

Trước mắt thì series sẽ có 2 phần mở đầu như sau: Tất cả những kiến thức và kinh nghiệm từ 2 bài viết này đều sẽ được áp dụng trong những series sau, khi mình bắt đầu nói về việc triển khai microservice hay quy trình CI/CD,...:
**- Phần 1: Setup persistent stack cho quá trình dev với docker**
**- Phần 2: Chạy ứng dụng trên... máy mình**

Mặc dù mình muốn bắt đầu từ những thứ thô sơ như là "How website work" hay đại loại thế, nhưng mà vì bản tính ham vui nên mình sẽ bắt đầu từ khúc giữa cho nó mới lạ =)).

## Yêu cầu của quá trình development

Ngày xưa khi còn làm việc với team kha khá người, điều mình ngại nhất đó chính là việc cứ mỗi khi có ai đó join vào dự án, là sẽ lại phải ngồi support người ta cài đủ thứ lên máy, config đủ thứ khỉ gió, rồi 1 lô xích xông những thứ mất thời gian mà chả hiểu tại sao không giống máy mình xảy ra. 

Một điều nữa đó là khi cài lại máy. Quả là ác mộng khi bạn phải ngồi setup lại hết các stack công nghệ trên máy, rồi lại vẫn y như rằng gặp những lỗi quái đản, khi thì thiếu config, khi thì permission,... khiến bạn phát điên.

Vì vậy mình rút ra mấy thứ cần phải giải quyết là:
*- Tạo môi trường đồng bộ giữa những người trong team*
*- Đẩy nhanh quá trình giả lập môi trường để bắt đầu code*

Mất rất lâu để mình nhận ra và bắt đầu sử dụng docker như 1 vị cứu tinh. Ấy nhưng mà nó cũng lại dẫn mình vào một loạt những dở khóc dở cười khác.

## Cần setup những gì

Sau rất nhiều lần làm theo tut trên mạng về việc setup môi trường dev laravel, nodejs,... mình cảm thấy đây đều là những hướng dẫn tiếp cận từ hướng làm cách nào để bạn "chạy" được project đó bằng docker (kiểu để nó chạy được ra chữ `Hello world` thành công chả hạn), hơn là để các bạn áp dụng vào quá trình phát triển sau này. Vì thế mình đã phân chia lại việc setup môi trường dev như sau:

- Setup **1 persistent stack** riêng biệt trên máy và chạy chung cho các project. Điều này khá hợp lý vì nó mô phỏng chính quá trình các bạn cài đặt các service mongodb, mysql, redis,... lên máy bạn hồi xưa. Chỉ khác là nó nhanh hơn rất nhiều thôi.
- Với từng project thì sẽ tạo **môi trường runtime riêng**, và sẽ kết nối với cái persistent stack phía trên

Tưởng tượng bây giờ bạn setup toàn bộ những service cần thiết cho ứng dụng của bạn như database, cache, queue,... chỉ trong 1 nốt nhạc, điều mà trước đây bạn phải ngồi cả ngày mới thật tuyệt làm sao.  

## Yêu cầu kiến thức

Vì là bài mở đầu nên nói hơi dông dài, thôi giờ bắt tay vào việc luôn nhỉ. Đầu tiên là những thứ bạn cần có để đọc bài viết này:

- Biết ***docker*** và ***docker-compose*** là gì. (có rất nhiều bài viết rồi tự tìm nha)
- Máy tính đã cài ***linux*** (mình dùng ubuntu nên ko đảm bảo mọi thứ sẽ chạy trên win hay mac)
- Cài docker và docker-compose trong máy

Đầu ra: ***Setup thành công các loại database, cache,... nói chung là persistent stack*** để dùng chung cho việc phát triển nhiều dự án.

Tài nguyên: Mọi thứ mình nói trong bài viết này đã được mình tổng hợp lại vào 1 repository trên github, sẵn sàng cho việc sử dụng của các bạn với kiến trúc thư mục chuẩn và 1 số snippet cho các dịch vụ đi kèm.

## Tôi cần Mongodb cho dự án

### Nguyên mẫu đơn giản

Okay, giờ là lúc bạn nghĩ xem dự án của các bạn cần 1 stack công nghệ như thế nào. Hãy bắt đầu với 1 stack đơn giản: ***MongoDB - ExpressJS - NodeJS***. Vậy là các bạn đã nhìn thấy thành phần persistent chính là MongoDB rồi. Ta bắt đầu với một file `docker-compose.yml` đơn giản để chạy được mongodb

```yaml
version: '2'

services:
    mongo:
        container_name: mongo
        image: mongo:latest
        ports:
            - "27017:27017"
        restart: always
```

***Trong bài viết này mình chỉ sử dụng compose syntax version 2 nhé, chi tiết các bạn xem trong [docs](https://docs.docker.com/compose/compose-file/compose-file-v2/) của nó***

Giải thích ý nghĩa: Trong file trên mình định nghĩa 1 service có tên là `mongo`, với image `mongo:latest` chạy trong container có `container_name` là `mongo`. Cuối cùng là expose cổng `27027` từ container ra ngoài host để mình có thể dùng các loại tool như `Studio 3T` để truy cập và quản lý.

Rất đơn giản phải không nào, chỉ cần tạo file `docker-compose.yml` và chạy `docker-compose up` là bạn đã có ngay một bản cài đặt mongodb latest trên máy cá nhân ngay trong vài nốt nhạc.



### Dữ liệu ở đâu?

Oops, vấn đề xuất hiện, khi mình ngừng chạy docker-compose, có thể là với việc chạy `docker-compose down`, hay là tắt máy,... và bỗng nhiên dữ liệu của mình biến mất. Đây chính là lý do mongodb thuộc về persistent stack, tức là mình cần nó lưu lại được dữ liệu mỗi khi mình tắt nó cơ. 

Giải pháp xem ra cũng hết sức đơn giản, chỉ cần **mount** vùng dữ liệu của mongodb trên ra ngoài máy chủ của mình thôi. Vậy là mình tạo thêm 1 thư mục `./data/mongo` để chứa dữ liệu cho container này và viết thêm vào file `docker-compose.yml` như sau:

```yaml
version: '2'

services:
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes:
            - ./data/mongo:/data/db
        ports:
            - "27017:27017"
        restart: always
```

Trong đó `./data/mongo` là thư mục mới được tạo ra trong project này, còn `/data/db` là nơi mongodb chứa dữ liệu trong container. Thử lại với `docker-compose up` và vào xem trong thư mục `./data/mongo` nào. Bạn sẽ thấy 1 lô những file mới được thêm vào bởi mongo container:

![List file db](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/6ipb9ruc53_Screenshot%20from%202018-12-29%2012-32-03.png)

### Sao tôi lại không có quyền?

Nhưng mà lạ chưa, sao tất cả file sinh ra lại đều thuộc về 1 user 999 xa lạ thế kia? Lý do là chúng được tạo ra bởi thằng user 999 nào đó ***ở trong container***. Như các bạn đều biết là việc những file này mà thuộc về 1 user và group khác với account của bạn thì đơn giản là bạn không có quyền với chúng nó. Lỡ sau này có muốn copy chỗ dữ liệu này đi chỗ khác, hay xóa đi thì cũng không thể được:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/d1gfd4sdrb_Screenshot%20from%202018-12-29%2012-35-38.png)

Thật may cho chúng ta là mặc dù volume permission vẫn là một vấn đề hết sức đau đầu khi làm việc với docker, nhưng với 1 số image được viết chuẩn và xịn xò như mongodb thì họ đã kiến trúc `Dockerfile` cho phép chúng ta chạy chương trình bên trong dưới danh nghĩa ***user và group ngoài host của chúng ta***. Tức là file trong volume được sinh ra sẽ thuộc về user và group thật của chúng ta luôn. Và ta sẽ có toàn quyền với nó. 

Giờ các bạn hãy xóa toàn bộ thư mục `./data/mongo` bằng lệnh `sudo rm -rf ./data/mongo` và tạo lại thư mục data để chúng ta bắt đầu lại từ đầu. Nhưng là với file `docker-compose.yml` đã được chỉnh sửa như sau:

```yaml
version: '2'

services:
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes:
            - ./data/mongo:/data/db
        user: "1000:1000"
        ports:
            - "27017:27017"
        restart: always
```

Và chúng ta thử xem lại file dữ liệu nhé:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/y59nimojfg_Screenshot%20from%202018-12-29%2013-51-12.png)

Thật bất ngờ, tất cả file mới sinh ra trong thư mục dữ liệu mình chọn làm volume đã xuất hiện với user và group của mình. Giờ mình đã có toàn quyền với các dữ liệu này mà không sợ việc thay đổi của mình ảnh hưởng tới permission của mongodb trong container.

Giải thích 1 chút: ở đây mình thêm dòng `user: "1000:1000"` trong file `docker-compose.yml` thực chất là đang bảo thằng docker: "Đây là `uid` và `gid` tài khoản `minh` của anh, chú vào container chạy mấy cái process trong container dưới `uid` và `gid` này nhé."

Các hệ thống linux chỉ quan tâm tới `uid` và `gid` của user, chứ không quan tâm tới `username` đâu nhé, nên mình chỉ cần pass cho docker cái `uid` và `gid` của mình là được. Còn tìm 2 con số này ở đâu thì đơn giản là bạn gõ lệnh sau vào terminal:

```bash
$ id
uid=1000(minh) gid=1000(minh) groups=............
```

### Dùng như thế nào?

Giờ sau khi hòm hòm được thằng mongodb, mình bắt đầu tới câu hỏi, vậy những thằng khác kết nối tới mongo của mình thế nào? Ở đây có 2 trường hợp:

- Nếu muốn connect tới mongodb từ host (tức là từ ngoài máy của bạn) như chạy Studio 3T, mongo shell,... thì có thể kết nối qua cổng 27017 của localhost mình vừa expose ở trên.
- Nếu muốn connect từ trong các container khác (ví dụ container chứa application của bạn) thì phải định nghĩa luôn cái app của bạn vào file `docker-compose.yml` này, rồi dùng `depend_on` hay là `link` bla bla như các tut hướng dẫn trên mạng. **Đây là cái mình không muốn**. Bởi vì mongodb được dùng chung cho nhiều dự án của mình, nên mình không thể định nghĩa hết các dự án của mình vào đây được. Do đó mình sẽ tạo 1 `docker network` để những application của mình dù định nghĩa ở đâu cũng có thể dùng được:

```yaml
version: '2'

services:
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes:
            - ./data/mongo:/data/db
        user: "1000:1000"
        ports:
            - "27017:27017"
        networks:
            - common
        restart: always

networks:
    common:
```

Ở đây mình định nghĩa 1 network có tên là `common` và sử dụng nó cho service `mongo` ở trên. Thử chạy nào:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/oc1jt41y5q_Screenshot%20from%202018-12-29%2014-09-59.png)

Các bạn có để ý mấy dòng đầu tiên, khi docker-compose tạo ra network `dockerpersistentstack_common` mà không phải chỉ `network` như mình định nghĩa không? Lý do là vì docker-compose đã prefix phần `dockerpersistentstack_` vào tên network của mình. Đây được gọi là `Project name prefix` với giá trị mặc định lấy từ tên folder chứa (`docker-persistent-stack`). Giá trị này có thể thay đổi được, nhưng mình sẽ không nói ở đây cho đỡ rối nhé. Các bạn hãy nhớ cái tên dài loằng ngoằng này, vì tới phần 2 của series này sẽ dùng tới đó.

## Thêm redis và mysql xem thế nào

Đáng lý là bạn đã an tâm vì vừa có ngay 1 con mongodb sẵn sàng hoạt động ở trên rồi, nhưng không, dự án của bạn lớn quá, anh sếp yêu cầu dùng redis để cache dữ liệu nữa. Ô rồi bạn lại đang tay ngoài 1 dự án php chạy MySQL. Thêm vào như nào giờ?

Vẫn theo đúng các bước với mongo ở trên, mình cắm được con redis và mysql vào persistent-stack của mình như sau:

```yaml
version: '2'

services:
    mongo:
        container_name: mongo
        image: mongo:latest
        volumes:
            - ./data/mongo:/data/db
        user: "1000:1000"
        ports:
            - "27017:27017"
        networks:
            - common
        restart: always
    
    redis:
        container_name: redis
        image: redis:alpine
        command: ["redis-server", "--appendonly", "yes"]
        volumes:
            - ./data/redis:/data
        user: "${UID_GID}"
        ports:
            - "6379:6379"
        networks:
            - common
        restart: always

    mysql:
        container_name: mysql
        image: mysql:5.7
        volumes:
            - ./data/mysql:/var/lib/mysql
        user: "${UID_GID}"
        ports:
            - "3306:3306"
        environment:
            MYSQL_ROOT_PASSWORD: 'justapassword'
        networks:
            - common
        restart: always

networks:
    common:
```

Chiêu cũ dùng lại, mình áp dụng y như với thằng mongo (may mắn là bọn làm image redis và mysql cũng thông minh như mongo trong cách dùng `uid` và `gid` vậy). Và lại `docker-compose up`:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gicrfp78s3_Screenshot%20from%202018-12-29%2014-33-02.png)

Tada, thế là mình đã có luôn con redis và mysql sẵn sàng ở port `6379` và `3306` rồi, tất cả chỉ trong thời gian 1 tách trà. Tất cả đã sẵn sàng cho việc phát triển ứng dụng của mình.

## Tổng kết

Qua bài hướng dẫn này, mình đã tạo xong cho các bạn 1 stack persistent dùng cho mục đích phát triển trên localhost. Stack này hoàn toàn có thể cắm thêm, bỏ bớt các service khác như rabbitmq, postgresql, neo4j,... hay bất cứ thứ gì các bạn cần cho việc phát triển của mình. Phía dưới đây mình có dẫn link tới repository github chứa source của toàn bộ bài hướng dẫn, cũng như kiến trúc folder chuẩn, 1 số config phức tạp hơn và 1 số snippet các service khác để các bạn cắm thêm vào file `docker-composet.yml`.

Nếu bạn là người mới, chỉ cần clone repo này của mình, chọn snippet dịch vụ mà bạn cần rồi làm theo hướng dẫn là bạn đã có ngay 1 stack chuẩn phục vụ development.

Trong bài viết tiếp theo, mình sẽ hướng dẫn các bạn tạo môi trường cho việc chạy code của từng project và sử dụng các service từ persistent stack này.

Link github: [Docker persistent stack](https://github.com/minhpq331/docker-persistent-stack)

Mình viết hơi vội nên là phần readme cho repo trên sẽ delay 1 vài ngày nhé. Các snippet thì mới đang có **mysql**, **mongodb**, **redis**, **rabbitmq**, **postgresql** thôi. Các stack khác như **mongo-replicaset**,... thì sẽ thêm sau bài viết này nhé.