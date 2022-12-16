Mình cũng chưa làm việc với Docker thực sự lâu và chủ yếu là ở môi trường development nhưng cũng đã gặp khá nhiều vấn đề cần giải quyết với thằng này. Nên hôm nay mình sẽ tổng hợp lại một số chú ý rút ra từ kinh nghiệm của bản thân cũng như sau khi tổng hợp được chia sẻ qua một số blog mà mình tìm thấy.

### Nên biết về Docker storage drivers
Có lẽ bạn đã và đang sử dụng docker nhưng chưa để ý hay tìm hiểu về việc các images, containers được lưu trữ như thế nào? Hay là việc images đã được container sử dụng như thế nào?
- Thì `storage drivers` cho phép mình create data trong một layer **có thể  ghi** của container. Các files sẽ không được lưu lại sau khi mà container stops, và cả đọc và ghi là thấp.

#### Images và layers
Mỗi Docker images được tạo thành từ một loạt các layers. Mỗi layers sẽ đại diện cho một chỉ thị trong dockerfile. Ví dụ một Dockerfile như dưới:
```
FROM ubuntu:15.04
COPY . /app
RUN make /app
CMD python /app/app.py
```
Docker file bên trên bao gồm 4 commands và mỗi command này sẽ tạo ra một *layer*. Mỗi một *layer* chỉ là một phần khác biệt so với *layer* phía trước nó. Mỗi layer sẽ được xếp lên trên layer trước nó, bạn tưởng tượng những viên gạch đặt chồng lên nhau vậy.
Điều quan trong ở đây bạn cần nhớ đó là khi mà bạn tạo một container mới thì bạn đã tạo ra một **writeable layer on top of the underlying layers** - một layer có thể ghi được đặt trên cùng so với những layer thuộc images mà container này được tạo ra. Hãy nhìn vào hình bên dưới để trực quan nhất

![](https://images.viblo.asia/2ff1293f-0909-4fe4-b119-183894889fc7.jpg)

Nguồn: https://docs.docker.com/storage/storagedriver

#### Container và layers
Bạn có để ý là các layer bên dưới được nhóm lại với nhau và có chiếc khóa không?
Điểm khác biệt lớn giữa một container và image đó chính là **writeable layer** ở trên cùng này. Tất cả những thay đổi mà bạn thực bên trong container sẽ được lưu lại và layer có thể ghi này. Khi container bị xóa chúng cũng bị xóa theo và quay trở lại trạng thái *unchanged* (chính là bản mới sau khi vừa được build ra từ image).
Nhiều container có thể truy cập vào cùng một image nếu chúng được tạo ra từ image này và tất nhiên mỗi container sẽ có một layer để lưu trạng thái của riêng nó.

![](https://images.viblo.asia/5b3145b9-54bb-40a8-a589-79eebfa537a9.jpg)
    
Nguồn: https://docs.docker.com/storage/storagedriver/#container-and-layers


### Khi nào sử dụng copy/add và volumne
- Bạn có thể sử dụng `COPY` hoặc `ADD` trực tiếp vào *Dockerfile*. Việc này hữu ích khi mà bạn muốn di chuyển source code vào docker image, ví dụ khi mà bạn muốn send code tới một environment khác (production, CI, ...)
- Bạn nên sử dụng `volume` khi mà bạn thay đổi code và nhìn thấy sự thay đổi đó ngay lập tức. Hiểu đơn giản là source code bên ngoài máy *host* và trong *container* đã "thông" với nhau, bạn thay thay đổi bên ngoài nó sẽ thay đổi tương ứng trong container và tất nhiên kết quả bạn nhận được là những gì bạn đã thay đổi.
- Bạn sẽ thường sử dụng volume khi mà muốn share thư mục giữa các container hay việc ghi một số lượng lớn dữ liệu vào thư mục, ví dụ như database.
- Vài trường hợp mà bạn lại muốn dùng cả 2, đơn giản team của bạn cần maintain một project cũ, bạn share một image với các thành viên khác khi đó image bạn tạo ra có thể sử dụng `COPY` để gắn code cũ với iamge. Sau đó mỗi người khi build container thì sử dụng `volume` để nhận được sự thay đổi kết quả code trong suốt quá trình phát triển sản phẩm. Chú ý là `volume` này sẽ ghi đè nội dung thư mục tương ứng của image. (Phần này lưu trong wriable layer nha).

### Không (tránh) lưu trữ dữ liệu trong containers
- Bạn cần lưu ý rằng container của mình có thể bị xóa đi hoặc bị thay thế, khi đó những dữ liệu bạn đang tương tác bên trong container mà không có ở trạng thái khi mà container này unchanged thì cũng sẽ bị xóa. Đó chính là điều mà chúng ta vừa tìm hiểu về *container wriable layer*.
Thử nghĩ xem thao tác lưu trữ một lượng lớn dữ liệu trong database và rồi nó biến mất ngoài ý muốn sau khi bạn xóa container đi (rip) :vulcan_salute: :v
- Khắc phục:

  Nếu bạn cần lưu trữ dữ liệu, thì hãy lưu chúng ở trong volume và cần chú ý khi mà 2 container cùng đọc ghi trên dữ liệu này.
    ```
    # Ví dụ cần lưu trữ những thay đổi với dữ liệu với mysql
    # Ví dụ với docker-compose
    volumes:
      - my-datavolume:/var/lib/mysql
    # Ví dụ khi build container từ image thông qua lệnh docker run
    docker run ... -v my-datavolume:/var/lib/mysql
    ```

### Đừng tạo image từ running container
- Trong một số trường hợp có thể vì chữ "tiện" chúng ta tạo ra image để chia sẻ thông qua `docker commit`. Việc này có thể giúp bạn rút ngắn tương đối thời gian khi share image với các thành viên trong nhóm của bạn chẳng hạn tuy nhiên nó cũng có những điều bất lới mà chúng ta không đáng thực hiện.
    - Bạn sẽ gặp khó khăn trong việc thực hiện kiểm tra xem container này chứa những gì và đã config một số thứ như thế nào. Ví dụ việc sau image này có `postgresql` và rồi thằng share image này nó nắm **password**. Ôi dồi lại phải mò xem lấy pass hay đổi pass như thế nào.
    - Một ngày đẹp trời bạn publish image của mình lên docker-hub và để public. Thực sự thực sự rất nguy hiểm nếu trong đó chứa thông tin nội bộ về dự án của khách hàng mà mình đang thực hiện (mình đã gặp trường hợp này ngoài thực tế)
- Hãy viết Dockerfile hay S2I (source to image) ngay đi!

### Không lưu thông tin xác thực trong image thay vào đó sử dụng "enviroment variables"
- Như đã nói ở trên một image có `postgresql` đã được config account root.
- Tham khảo các cách set environment variable tại [đây](https://docs.docker.com/compose/environment-variables/#set-environment-variables-with-docker-compose-run)

### Hãy giữ docker image size nhỏ nhất có thể
- Một docker image có kích thước lớn gây khó khăn khi phân phối.
- Tránh việc cài đặt những package không cần thiết hoặc run updates vào image layer nếu như việc đó là không cần thiết.
["Keep it small: a closer look at Docker image sizing"](https://developers.redhat.com/blog/2016/03/09/more-about-docker-images-size/)
- Mở rộng ra thì bạn có thể nhìn vào [Laradock](http://laradock.io/) - "A PHP development environment", mình có thể nhận thấy ngay rằng nếu bạn là lập trình viên muốn xây dựng môi trường development từ docker thì laradock **cái gì cũng có** nhưng **không phải lúc nào cũng sẵn sàng**. Bạn cần config để cài đặt những service mà bạn cần sử dụng cho ứng dụng của mình, việc làm này khiến chúng ta sử dụng ít tài nguyên nhất có thể.

### Tránh sử dụng "lastest" tag
- Bạn nên sử dụng tag cho version image bạn tạo ra hay sử dụng.
- Bạn sẽ không muốn phải gặp trường hợp mà vài tháng sau khi bạn build lại image của mình mà ứng dụng lại không chạy như nó đã từng (wtf) hoặc "lastest" này có thể là phiên bản lỗi khi mà được lấy ra từ build cache.
Bạn có viết Dockerfile để build một image nhưng image này lại được build từ một image có sẵn ví dụ:
```
FROM tutum/apache-php:lastest
```
Và thế là image của chúng ta vô tình cũng được cập nhật.
- Nên tránh sử dụng "lastest" tag này trên môi trường production vì mình không thể kiểm tra ngay được image version nào đang được sử dụng.
### Đừng phụ thuộc vào IP addresses
- Mình thấy nhiều người sử dụng hay mình cũng đã từng được chỉ về việc sử dụng IP address của container.
    ```
    docker inspect container-id / container-name
    ```
    
    ![](https://images.viblo.asia/41af9097-f314-491b-992b-bc9914d8df00.png)

    Mỗi *container* đều có một *internal IP address* của riêng nó và nó có thể bị thay đổi mỗi khi mà bạn rebuild container. Khi mà ứng dụng của bạn cần kết nối giữa kết service với nhau hay sử dụng `host name`

### Đừng thực thi các lệnh với quyền root user
- Cái này mình tham khảo thấy và riêng vấn đề quyền hạn này mình cũng khá bối rối, ai biết có thể chia sẻ nha.
- "By default docker containers run as root". Để nâng cao tính bảo mật thì image của chúng ta nên sử dụng quyền *non-root* cho việc thực thi container.
Chúng ta có thể tìm hiểu kỹ hơn về vấn đề này tại [đây](http://www.projectatomic.io/docs/docker-image-author-guidance/)
- 
### Luôn expose những port quan trọng
- Việc expose port trong container giúp nó sẵn sàng kết nối với, giao tiếp với host system hay container khác. Mình có thể thực hiện thông qua `docker run` hay `EXPOSE` ngay trong Dockerfile.
- Những port đã được export sẽ được list ra cùng với container khi bạn thực thi câu lệnh `docker ps` hay `docker inspect`.

### Tài liệu tham khảo
- [10 things to avoid in docker containers - developers.redhat.com](https://developers.redhat.com/blog/2016/02/24/10-things-to-avoid-in-docker-containers/)
- https://docs.docker.com/storage/storagedriver/select-storage-driver/
- http://www.projectatomic.io/docs/docker-image-author-guidance/
### Kết luận
Trên đây là những kinh nghiệm cũng như kiến thức tham khảo mà mình có được khi làm việc với docker, có thể sẽ còn nhiều phần thiếu sót nữa rất mong nhận được sự góp ý của mọi người.