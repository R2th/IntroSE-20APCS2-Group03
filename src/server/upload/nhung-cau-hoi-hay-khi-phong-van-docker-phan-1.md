# Lời mở đầu

Yay, đến hẹn lại lên và mình lại xuất hiện :full_moon_with_face:. Hôm nay, mình xin chia sẽ về một số câu hỏi hay khi phỏng vấn với docker. Dạo này anh em chuyển sang học DevOps nhiều quá nên mình cũng có ké theo học hỏi được vài thứ. Mà cái nhớ cái quên nên viết bài này để xào lại kiến thức. Có gì sai xót mong các bạn thông cảm nha.

# Câu hỏi 1

```
Hãy cho biết 
    $ docker system prune
thực hiện công việc gì
```

Topic: docker pruning

Difficulty: :star::star:

Một câu khá cơ bản cơ nhà nhiều bạn trả lời vẫn rất ngây thơ. Nó thực hiện xóa hết mọi thứ. Và đến khi mình hỏi mọi thứ là gì thì lại không thể nào liệt kê ra hết được. Trên thực tế muốn xóa hết mọi thứ với một command là bất khả thi (theo mình biết là vậy. Nếu có command như vậy là bạn biết, làm ơn hãy chỉ mình. Đôi khi cũng mệt mỏi vì thiếu dung lượng ổ cứng mà gõ nhiều thì mệt quá).

Và câu trả lời hết sức đơn giản. Chạy nó lên thôi, hiện ngay ở phần warning và nhớ nó thật kỹ nhé. 

```
$ docker system prune

WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all build cache
Are you sure you want to continue? [y/N] 
```

Và nếu có dùng câu này phỏng vấn thì các bạn cứ mạnh dạn hỏi thêm là nó tương đương với những command nào nữa nhé. Gì chứ mấy command dọn dẹp docker để giảm dung lượng bộ nhớ là note thật kĩ nha.


# Câu hỏi 2

```
Trong compose file, ta config option ports như sau
ports:
    - "5000:5000"
Hãy cho biết ý nghĩa của port bên trái và port bên phải. 
```

Topic: docker network

Difficulty: :star::star:

Yeah, một câu hỏi cực kì cực kì dễ ... gây lú lẫn luôn. Mới đầu tiếp xúc thì cứ nhầm hoài rồi từ đó mới nhớ được. 
Format của option ports là `HOST:CONTAINER` nhé. Bên trái là port của host (máy chủ hệ thống) còn bên phải là của container (sử dụng trong docker network)

Câu hỏi nhỏ là nếu thiết lập option ports chỉ với 1 port như bên dưới thì nó hiểu như thế nào
```
ports:
 - "3000"
```


# Câu hỏi 3

`so sánh 2 option ports và expose trong compose file`

Topic: docker network

Difficulty: :star::star::star:

Sẵn có câu ở trên thì mình nghĩ đến câu này ngay. Vì nó hay quá nên mình tách hẳn ra một câu riêng luôn. Đảm bảo luôn là thể nào cũng có người nhầm lẫn khi sử dụng option `expose` và `ports`. Để không nhầm lẫn thì mình tự đặt rule cho bản thân là sẽ chỉ dùng `expose` với Dockerfile và `ports` với compose file. Vơi việc dùng thế này mình hoàn toàn có thể nhớ được tụi nó khác nhau ở chỗ

- `expose` dùng để chỉ định port trong docker network, không thực hiện publish với host (chỉ dùng trong nội bộ docker, share giữa các container với nhau)
- `ports` dùng để chỉ định port cho cả docker network và cả host

Định nghĩa như vậy anh em nhớ rõ nhé


# Câu hỏi 4

```
docker compose dùng để thực thi nhiều docker file. 
Vậy muốn thực thi nhiều compose file một lúc thì dùng cách nào?
```

Topic: devOps

Difficulty: :star::star::star::star:

Câu này đem đi phỏng vấn 10 người hết 9 người bí nên mình đánh giá nó tận 4 sao. Thực sự đây là vấn đề khá đau đầu đối với bài toán triển khai microservices với docker. Mỗi services config riêng cho mình một compose file riêng biệt. Và muốn chạy hết chừng đấy service thì phải vào từng service mà thực thi docker compose up. Nghe cũng khá là khoai đấy nhỉ. Cách đầu tiên mà hầu như ai cũng nghĩ tới là dùng command như thế này

`docker-compose -f app1/docker-compose.yml -f app2/docker-compose.yml up -d`

trông có vẻ hay đấy nhưng khi dùng nó mới thực sự là ác mộng và thú thật cho tới bây giờ mình vẫn không thể làm cho nó chạy thành công được. Nào là chỉnh sửa file `override.yml`, nào là sử dụng option extends, vân vân và vũ vũ... Rồi nghĩ tới cứ thêm 1 service lại thêm cái path mới vào trong command trên thì tầm 20 service trông nó chẳng khác gì đống bùi nhùi. Thật. Và trong cái khó ló cái khôn, mình đã sử dụng 1 mánh lới. Đó là tạo một file bash với các command chuyển hướng đến từ service rồi compose up service đó, xong lại tiếp tục chuyển sang service khác. Nghe khá là hợp lý có đúng không. Thay vì phải docker compose up từng service một, à mà thực tế là y vậy mà, khác biệt là chỗ không cần phải gõ lại cái đống command docker compose up đấy thôi :smiley:  Quá đơn giản. Ai có cao kiến gì hơn thì cho mình biết nhé

#  Câu hỏi 5

`Phân biệt giữa docker stop và docker kill`

Topic: docker CLI

Difficulty: :star::star::star::star::star:


Đây là câu hỏi mà theo mình đánh giá nó có độ khó là 5 sao. Vâng tận 5 sao. Trông thì cực đơn giản nhưng chưa có ai trả lời đúng câu hỏi này. Ngay cả mình cũng vậy. Rất khó để phân biệt giữa `docker stop` và `docker kill`. Để giảm độ khó thông thường các interviewer sẽ hỏi về so sánh giữa `docker stop` và `docker rm`

Về cơ bản thì `docker stop` và` docker kill` đều được dùng để dừng một container đang chạy. Container đó sẽ không hiển thị khi thực thi `docker ps` nhưng sẽ xuất hiện khi thực thi `docker ps -a` (`docker rm` thì xóa hẳn và không hiển thị khi thực thi `docker ps -a`)

Vậy còn điểm khác nhau. Rõ ràng là có khác nhau chứ không nó phân ra 2 command để làm gì. Điểm khác nhau nằm ở quá trình dừng container, với `docker stop` thì nó sẽ có 1 khoảng timeout (mặc định là 10s) trước khi chấm dứt hoạt động container, còn `docker kill` thì không.

Để hình dung thì bạn cứ thử thực thi `docker even`t ngay sau khi thực thi `docker kill` và `docker stop`. Đây là cách dễ nhất để nhận thấy sự khác biệt đó.

# Lời kết

Bài viết tới đây là hết rồi. Mình cũng muốn viết nhiều hơn cơ mà phỏng vấn hỏi 5 câu đã là chết ứng viên rồi nên thôi, mình sẽ để dành cho phần tiếp theo, vẫn là 5 câu với những vấn đề dễ dây nhầm lẫn, khó phân biệt. Có thể là so sánh `docker run` và `docker start` hay một sô khái niệm khá khoai như là `dangling images`, `ephemeral host port`... Hẹn gặp các bạn trong những bài viết tiếp theo.