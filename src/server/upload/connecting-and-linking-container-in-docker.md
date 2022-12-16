Hello anh em, ở 2 phần trước của seri khám phá Docker mình đã giới thiệu những khái niệm cơ bản và sử dụng docker để xây dựng 1 ứng dụng nhỏ. Mình có đọc tiếp sách Docker in Practice và có đọc đến 2 kĩ thuật cơ bản mà rất hay bị các bạn bỏ qua đó là: sử dụng port để kết nối đến container và kết nối các container với nhau. Bài viết sẽ dịch technique 5 và 6 trong quyển sách này.

# 1. Using ports to connect to containers.
Docker container được thiết kế để chạy các service. Trong đa số các trường hợp, đó sẽ là HTTP service. Trong đó phần lớn sẽ là các web service được sử dụng bởi trình duyệt.

Nó dẫn đến một vấn đề: Nếu bạn có nhiều Docker container chạy trên cổng 80 bên trong môi trường của container, thì tất cả sẽ ko thể đều chạy trên cổng 80 ở ngoài môi trường thực. Kĩ thuật này sẽ chỉ cho bạn cách để quản lý vấn đề chung này bằng cách exposing (xuất ra) hoặc mapping (ánh xạ) ra cổng từ container.

* **Vấn đề**: 

Bạn muốn tạo ra nhiều container service trên 1 cổng từ máy host của bạn.

* **Giải pháp**: 

Sử dụng option `-p` để ánh xạ cổng của container đến máy host.

* **Thảo luận**:

Trong ví dụ này, chúng ta sẽ sử dụng image hitalos/laravel (phần này trong bài dịch tác giả sử dụng image tutum/wordpress của wordpress nhưng mình ko chuyên lắm về wordpress nên sẽ lấy cái gì đó thân thiện hơn là laravel). 

Do có nhiều nhu cầu sử dụng nên image này có sẵn trên dockerhub luôn, rất tiện cho việc clone về sử dụng (https://hub.docker.com/r/hitalos/laravel). Đầu tiên ta sẽ kéo image về: 

`$ docker pull hitalos/laravel`

Để chạy ứng dụng, trước hết ta phải có 1 source project laravel, ta sẽ cài qua composer:

`$ composer create-project --prefer-dist laravel/laravel docker_test`

Tiếp theo là trỏ vào thư mục chứa code và chạy image thành container và build trên cổng 80:

```bash
$ cd docker_test
$ docker run --name laravel -d -v $PWD:/var/www -p 80:80 hitalos/laravel
```

Tiếp theo tạo mới thêm 1 project nữa và đặt tên là docker_test2 và run trên cổng 81:
```bash
$ cd docker_test2
$ docker run --name laravel1 -d -v $PWD:/var/www -p 81:80 hitalos/laravel
```


Nếu bạn chạy `$ docker ps -a | grep laravel` bạn sẽ thấy 2 container được tạo ra:

```bash
$ docker ps | grep laravel
a582e43f9de2        hitalos/laravel        "docker-php-entrypoi…"   14 seconds ago      Up 13 seconds (health: starting)   0.0.0.0:80->80/tcp   laravel
4e5bbcb5eb1f        hitalos/laravel        "docker-php-entrypoi…"   13 minutes ago      Up 13 minutes (healthy)            0.0.0.0:81->80/tcp   laravel1
```
Bây giờ bạn có thể vào 2 trang web này qua trình duyệt bằng cách duyệt vào địa chỉ http://localhost và http://localhost:81.

> *Nó tè 1*: Bạn đang thắc mắc ở trên có 1 đoạn là -v là gì đúng không. Đó là mount volume, tức là lấy resource từ thực mục ở ngoài máy tính của bạn và sử dụng nó ở trong container, tất nhiên là thư mục càng nặng thì container sẽ càng nặng tương ứng :v 
> 
> À mà $PWD là biến tương ứng với vị trí thư mục mà bạn đang trỏ vào cái này bạn có thể echo ở trên terminal để biết (hoặc google), mình sẽ ko giải thích nhiều quá đoạn nầy.

> *Nó tè 2*: **Bạn nên nhớ thứ tự của các tham số sau option `-p`**: Chúng ta thường rất dễ quên cổng nào là cổng của máy host và cổng nào của container. Chúng ta có thể nghĩa rằng nó như đọc từ trái sang phải. Người dùng kết nối tới host và port được đưa đến container (host_port:container_port). 

Phần này thực ra rất đơn giản, nhưng lại rất quan trọng, chúng ta nên biết về nó để sử dụng hiệu quả hơn. Mình thấy nhiều bạn dùng docker rồi docker-compose nhưng những phần như thế này lại bỏ qua, ko hiểu bản chất, lúc build sẽ rất chật vật trong đoạn expose rồi dựng port như thế nào cho hợp lý.

# 2. Linking containers for port isolation
Kĩ thuật trước đó chỉ chúng ta cách để mở container đến máy host bằng cách xuất ra cổng. Nhưng không phải lúc nào đó cũng là điều chúng ta muốn, ta không muốn expose cổng public ra nhưng vẫn muốn các container có thể kết nối.

Kĩ thuật này sẽ sử dụng option link để giải quyết và đảm bảo rrawnfg bên ngoài ko thể truy cập vào các gói dịch vụ bên trong của bạn.

* **Vấn đề**

Bạn muốn cho phép kết nối các container trong phạm vi nội bộ.

* **Giải pháp**

Sử dụng chức năng link của Docker cho phép các container có thể kết nối nội bộ với nhau.

* **Thảo luận**

> *Nó tè 3*: **Tại sao lại phải sử dụng cách này?** Tại sao phải quan tâm đến link server nếu chúng ta có thể xuất ra cổng ở host và sử dụng. Link server cho phép chúng ta gói tọn và định nghĩa các quan hệ giữa các container, nó giúp ứng dụng của chúng ta bảo mật hơn (nhất về mặt dữ liệu). 

Ta sẽ vẫn sử dụng image ở trên và kèm theo đó là link đến mysql 5.6. Chúng ta sẽ chạy theo thứ tự sau đây:

```bash
$ docker run --name test_mysql -e MYSQL_ROOT_PASSWORD=yoursecretpassword -d mysql
$ cd docker_test3
$ docker run --name laravel2 -d -v  $PWD:/var/www  --link test_mysql:mysql -p 82:80 -d hitalos/laravel
```
Đầu tiên ta sẽ chạy container chứa mysql, đẳ tên là nó test_mysql. Bạn sẽ phải cài thêm 1 vài biến môi trường (được định nghĩa trong image đó) để có thể sử dụng được mysql (ở đây mình set luôn password cho user root cho tiện).

Tiếp theo, bạn sẽ lấy image laravel với tên là laravel2. Bạn cũng sẽ link nó tới container test_mysql qua lệnh: `--link test_mysql:mysql`.

> *Nó tè 4*: Nên cẩn thận rằng link service sẽ ko chờ đến khi service được link tới khởi động xong hoàn toàn, do đó, bạn phải đảm bảo rằng image mysql (image được link tới) phải hoàn toàn start xong trước khi link. 

Cấu trúc của lệnh link này sẽ là: 

`--link <tên hoặc id container>:alias`(alias là cách viết ngắn hơn có thể sử dụng trong container)

Để dùng nó thể chỉ cần thay đổi biến .env ở trong thư mục laravel của bạn là oke.

# Chốt tộ
Trông nguy hiểm vậy thôi chứ thực ra nó nguy hiểm thật. Rất nhiều bạn khi sử dụng docker-compose thậm chí bỏ qua những phần đơn giản này nên thường bối rối khi có lỗi hoặc phải build lại. Hy vọng hướng dẫn này sẽ giúp chúng ta hiểu được cách hoạt động của nó.

Phần này sẽ rất liên quan đến bài viết sau của mình về docker-compose, hy vọng được các bạn ủng hộ.

Đó là toàn bộ những gì mình muốn trình bày, có gì sai hay config không thành công, các bạn có thể comment phía dưới giúp mình, mình sẽ sẵn lòng giải đáp thắc mắc :D Cảm ơn đã theo dõi bài viết này của mình nhé :D

# Tài liệu tham khảo
- **Docker in Pratice - Ian Miell and Aidan Hobson Sayers.**