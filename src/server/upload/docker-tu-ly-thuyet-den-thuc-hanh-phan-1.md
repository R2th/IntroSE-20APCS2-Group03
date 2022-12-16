![](https://images.viblo.asia/4225b502-1385-4b1e-9983-7a85588a1eb0.jpeg)

Chào các bạn, đã từ khá lâu kể từ ngày viết bài đầu tiên về [Docker](https://viblo.asia/p/docker-hay-hieu-theo-cach-cua-ban-Az45bnk65xY) đến nay mình mới có dịp viết tiếp về chủ đề này, phần vì kiến thức và kinh nghiệm làm việc với Docker còn chưa nhiều nên không dám `múa rìu qua mắt thợ`, trong khoảng thời gian làm việc với Docker mình thấy nó khá khó tiếp cận với những bạn mới và điều quan trọng vẫn là phải hiểu cơ bản và hình dung ra bức tranh làm việc của `Docker`. Trong bài viết này mình sẽ đi sâu hơn về khái niệm cũng như các lệnh cơ bản được sử dụng trong `Docker`, hy vọng sẽ không quá khó hiểu.
## 1. Vòng đời của Docker
![](https://images.viblo.asia/7462abe8-9146-48fc-b016-b5df81241437.png)

Docker khởi nguồn từ việc build dockerfile, một container bắt nguồn từ 1 image, mỗi lần chúng ta `run` một image chúng ta sẽ nhận được 1 container khác nhau. Image là một kiểu snapshot cố định, có sẵn mọi thứ để sẵn sàng sử dụng.

Bước tiếp theo trong vòng đời docker là một container đã dừng hay còn gọi là `stopped container`, mọi tiến trình đã chạy trước khi container bị dừng đều được giữ lại, tức là sau khi container đã dừng dữ liệu không bị mất, bạn hoàn toàn có thể tìm container và lấy lại bằng cách liệt kê các container bằng lệnh

>> docker ps -a

Trong trường hợp bạn chỉ muốn tìm container nào đã dừng gần đây nhất, chỉ cần chạy lệnh
>> docker ps -l
>> 
Tiếp theo khi trong quá trình sử dụng container, bạn đã tạo ra một số file mới, hoặc một số thay đổi, bạn có thể tạo ra một image mới từ container này bằng cách `commit`. Lệnh `commit` và `run` là 2 lệnh bổ trợ cho nhau, nhận đầu vào là một image và đầu ra là container và ngược lại.
>> docker commit d85756f57265 new_image_name
>> 

Cứ tiếp tục như vậy bạn sẽ có các lớp image chồng lên nhau được kế thừa từ base image.
## 2. Image
Docker image là file chứa đủ mọi thứ để tạo lên một hệ điều hành với đầu đủ các phần mềm phục vụ cho công việc nhất định.
Để liệt kê tất cả các image trong máy của bạn
>> docker images
>> 
![](https://images.viblo.asia/4ef61395-2342-41e9-aa57-c22194e5e96b.png)

Ở đây mình đang có 2 images là `ubuntu` và `hello-world`
> Trong đó:
>
> **Repository**: là nơi tạo ra image đó
> 
> **Tag**: là version của image, nó thường đi kèm với tên image ví dụ: ubuntu:latest
> 
>**Image Id**: là ID của image, nó hữu dụng trong một số trường hợp image của bạn không có tên.

## 3. Container
Chúng ta sẽ cùng tìm hiểu cách tạo ra một `container` từ `image` có sẵn trong máy, nếu không có sẵn `image` sẽ được download từ `docker hub`.
Để tạo ra một container chúng ta chạy lệnh

>> docker run -it ubuntu:latest bash

Trong đó :
> **-it**: là parameter được thêm vào khi bạn muốn chạy các câu lệnh trong image bằng cách nhập từ bàn phím
> 
> **ubuntu:latest** là tên image và tag tương ứng của nó là latest.
> 
> **bash** là command muốn chạy ngay trong terminar của container sau khi tạo ra.
> 
![](https://images.viblo.asia/6de5d936-8bf3-4c77-8c91-96504c9208e6.png)

Để thoát ra khỏi container chúng ta dùng lệnh:
>  exit
> 
Mọi thay đổi trong `container` này không ảnh hưởng đến `container` khác mặc dù chúng đang được tạo ra từ chung một `image`.

## 4. Cơ chế lưu trữ của docker
* Docker sử dụng cơ chế lưu trữ `Copy-on-write`. Tức là docker sẽ tạo ra một container từ một image gốc.

* Mỗi khi tạo ra sự thay đổi trên container thì thay đổi sẽ được ghi lại nhưng ở một vùng lưu trữ tách biệt. 

* Vùng lưu trữ của container và image là không giống nhau, container được lưu trữ ở một vùng nhớ riêng vì thế việc khởi động một container sẽ rất nhanh.

## 5. Chạy các tiến trình trong docker-container
### docker run
`Docker run` yêu cầu truyền vào tên một image và một tiến trình để chạy trong container, đó chính là tiến trình chính của container. Khi tiến trình này bị thoát thì container cũng dừng theo.

container có thể được đặt tên, nếu bạn không tự đặt tên cho container thì nó sẽ tự sinh ra tên ngẫu nhiên.

Để xóa container sau khi tiến trình đã kết thúc ta dùng param `--rm`, nếu không dùng param này thì sau khi chạy container, làm một số việc và thoát khỏi container sau đó bạn phải gõ lệnh `docker rm`. Param --rm giúp tiết kiệm thời gian hơn.

Vì sau khi tiến trình chính thoát container cũng bị dừng, nếu bạn muốn container chạy nền trong hệ thống chúng ta có param `-d`.

Ví dụ:

![](https://images.viblo.asia/99d1da98-1a07-43a7-9028-97932a8b69c8.png)

Đặt tên cho `container`

![](https://images.viblo.asia/212ba252-feae-45a3-a196-1a780d8f5ff1.png)

### docker attach
`docker attach` cho phép bạn truy cập vào một container đang chạy ngầm thông qua ID hoặc tên của container, để thực hiện thao tác thay đổi nào đó.

![](https://images.viblo.asia/6038564c-642f-4e2b-a59c-1fbe8a897d14.png)

### docker exec
Cho phép bạn chạy nhiều hơn một tiến trinh trong container
![](https://images.viblo.asia/8b571cfa-56a9-4572-848e-069aee128d68.png)

Trong ví dụ trên mình có 2 terminar trái và phải, trong terminar phải mình `exec` vào container và tạo ra một file test.txt, lúc này quay trở lại terminar trái và gõ `ls` chúng ta có thể thấy file test.txt cũng đồng thời xuất hiện trong container. Như vậy chứng tỏ cả 2 terminar đều trỏ đến cùng một `container`.

### docker create
Dùng trong trường hợp bạn muốn khởi tạo một container nhưng chưa muốn nó chạy ngay, để chạy container thì phải chạy thêm `docker start`. `docker create` khá giống với `docker run`

![](https://images.viblo.asia/3e4c8c17-84d8-4edf-b43f-9489c06cb5de.png)

Để chạy container ta làm như sau

![](https://images.viblo.asia/7ec38737-e65a-41f5-86b8-36b892cb60d4.png)

### docker inspect
Dùng để kiếm tra thiết lập của docker, từ thiết lập mạng đến cấu hình driver ...các thông tin liên quan sẽ được trả về dưới định dạng JSON.

Ví dụ:

> docker inspect f3ebd315a682
> 
Và kết quả json trả về một phần sẽ như sau:
```
[
    {
        "Id": "f3ebd315a682b9dec61b19d8cceda3811bb6db05e0df935472e512071210eb4e",
        "Created": "2018-11-13T23:07:20.842098144Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 13670,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2018-11-13T23:12:34.371756442Z",
            "FinishedAt": "2018-11-13T23:11:37.584997328Z"
        }, 
        ..............

```

## 6. Kết
Trên đây là một vài kiến thức cơ bản và câu lệch thường dùng khi sử dụng với docker, hy vọng sẽ giúp các bạn không bị bối rối trong quá trình làm việc. Trong phần sau mình sẽ chia sẻ tiếp về những vấn đề liên quan đến cách liên kết các container, khái niệm `volume` trong docker được sử dụng ra sao. Rất mong các bạn ủng hộ.

## 7. Tài liệu
https://www.docker.com/