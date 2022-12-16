Chào các bạn đến với bài đầu tiên trong series tìm hiểu về Docker của mình :)

Ở bài đầu tiên trong series này chúng ta sẽ cùng trải qua 10-15 phút quảng cáo để biết Docker là gì, những gì nó mang lại, tại sao nên dùng và những ai đang dùng nó nhé.

Dù những bài sau sẽ là optional, các bạn có thể đọc bài mà các bạn muốn xem, nhưng đặc biệt mình "xin" và yêu cầu là **bắt buộc** các bạn đọc hết bài này :joy:, nếu không có thể các bạn sẽ nhận ra dùng Docker xong mà không thấy nó hơn bình thường tí nào :-D

> Xem thêm phần cuối để thấy Docker và kiến thức về container nói chung giúp ích cho mình như thế nào trong công việc nhé

# Docker - Hello beauty
## Chuyện là...

Có một anh tên là Đầu To mới join vào 1 công ty, khi mới vào team, chân ướt chân ráo nhưng đã được leader đưa cho project và bảo cài đặt, chạy thử và xem tổng quan project như thế nào. Rồi thì cài. Nào là PHP, rồi Laravel, MySQL, ok chạy thử và :boom: BUILD FAILED :boom:. Rồi anh chạy đi hỏi Leader, leader bảo a cần cài thêm Redis. Rồi thì cài Redis. Lại loay hoay cả buổi và cài cài đặt đặt, anh nhận ra cài Redis trên Windows khó hơn lên trời, trong khi ở Ubuntu hay Mac thì dễ như xỉa răng :-D. Vậy là tối hôm đó a về cài Ubuntu vào máy. Rồi lại build và lại :boom: BUILD FAILED :boom:, anh lại nhắn hỏi Leader và lại biết là mình chưa chạy `composer dump:autoload` để load các thư viện của PHP, và anh cũng không biết là phải chạy `php artisan storage:link`. Chạy xong những cái trên ok rồi mở web lên thì lại không thấy chức năng realtime chạy, lại đi hỏi leader và lại biết là do anh chưa chạy `laravel echo server`. Anh thấy buồn và ức chế :-D

Rồi lại có anh tên Mắt Nhỏ khi phải maintain 3-4 project, mỗi project lại cần đủ thứ như PHP, NodeJS, MySQL, MongoDB, rồi có ngày anh cài cài đặt đặt và bùm, MySQL lăn ra chết, a chẳng biết cách nào để xóa "trắng" đi và cài lại, lỗi vẫn in ra như thế, đỏ lòm :rage:, các project liên quan thì ngỏm củ tỏi vì đều cần DB để chạy. Anh buồn, và từ đó trở đi mỗi khi cài bất kì cái gì vào server tay anh lại run như ngày đầu đến trình diện nhà bố vợ. :-D

Qua 2 câu chuyện trên ta thấy có những nỗi sợ như sau:
- ở câu chuyện đầu tiên: mỗi project cần phải cài nhiều thứ, nhiều thư viện để chạy, trong khi document lại không rõ ràng, và đôi khi có document nhưng ta lại không thể cài và chạy thành công do sự khác nhau giữa những môi trường chạy. Local thì dùng Win trong khi ở server thì 96,69% là Linux
- Ở câu chuyện thứ 2, việc dùng chung các tài nguyên giữa các project, đồng thời sự lằng nhằng khi số project tăng lên làm cho mỗi quyết định cài thêm hay xóa đi một tài nguyên nào đó đều thực sự đau đầu. Mà sẽ rất có thể xảy ra trường hợp " em xóa đi xong nhưng không cài lại được nữa" :-D

Ai thấy mình đã rơi vào trường hợp như ở trên dơ tay. :raised_hand:. Ok bỏ tay xuống mình bắt đầu phần tiếp nhé :-D

## Docker là gì
Từ những thực trang như ở trên và hàng tá những lí do khác, mà Docker được ra đời.

![Docker](https://www.docker.com/sites/default/files/social/docker_facebook_share.png)

Định nghĩa về Docker theo 1 cách "máy móc":
> Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa. Docker cung cấp một lớp trừu tượng và tự động ảo hóa dựa trên LinuxDocker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa. Docker cung cấp một lớp trừu tượng và tự động ảo hóa dựa trên Linux

Định nghĩa được đơn giản hóa theo cá nhân mình:
> Docker là công cụ giúp ta có thể chạy project ở một môi trường cụ thể, được định sẵn rõ ràng, độc lập với môi trường gốc. Các ứng dụng chạy trong Docker được gọi là các Container ("Cờn tên nơ")

Mình biết là các bạn đọc xong định nghĩa chắc cũng vẫn còn nhiều thắc mắc. Cứ từ từ rồi thời gian sẽ trả lời dần dần nhé ;). Cùng xem Docker có gì hay nhé

## Những điều Docker mang lại
Dưới đây là những thứ mình tổng hợp lại về những điều tốt đẹp của Docker:
1. Docker cho các bạn 1 môi trường mục tiêu cụ thể, ví dụ các bạn cần môi trường Ubuntu, có PHP 7.2 có NodeJS 8.0, có mysql 5.2. Docker sẽ giúp bạn có được điều đó.
2. Môi trường trong Docker độc lập so với môi trường gốc: Docker sẽ tạo ra cho các bạn môi trường "ảo" trong đó các bạn có thể chạy project của mình, bất kể hệ điều hành gốc của các bạn có là gì. Do đó, kể cả bạn ở Win hay Mac thì vẫn có thể chạy project dưới môi trường Ubuntu hay bất cứ môi trường nào (mà hiện tại Docker support) bạn cần.
3. Một môi trường Docker sau khi được định nghĩa nó sẽ là "bất biến". Bạn có thể setup ở bất kì đâu bất kì máy nào với môi trường giống hệt bạn đã định nghĩa.
4. Mỗi một project sẽ có một file cấu hình cụ thể, 10 năm sau bạn đọc lại project thì vẫn biết để chạy được project đó thì cần những gì và cần làm gì. Bạn chỉ cần đưa file cấu hình cho người khác là họ sẽ tự biết phải làm gì để chạy ;)
5. Vì mỗi project chúng ta có thể setup ở một môi trường riêng, nên các project sẽ không bị xung đột, chia sẻ tài nguyên lằng nhằng (nếu như ta không muốn). Từ đó giảm thiểu tối đa sự phụ thuộc lẫn nhau, cài đặt, thêm bớt sửa xóa các thư viện, cấu hình cũng sẽ không bị ảnh hưởng tới các project khác.
6. Docker có thể giúp tự động Heal (tự hồi phục, khởi động lại) nếu trong trường hợp có lỗi.

## Dừng! Trước đây đã có máy ảo rồi mà??
Nghe xong phần bên trên có thể các bạn nhận ra sự na ná mà trước đây những máy ảo như VMWare hay Virtual Box cũng có thể làm được như: tạo ra các môi trường ảo, độc lập với hệ điều hành gốc.

Nhưng 1 trong những trở ngại lớn nhất của máy ảo theo mình thấy đó là sự nặng nề, cài đặt rất phức tạp, và rất chậm. Dùng máy ảo ta phải cắt cứng 1 lượng tài nguyên cho nó, dẫn tới hệ điều hành gốc và máy ảo phải chia sẻ phần cứng và làm giảm hiệu năng của cả 2. Việc cài đặt môi trường ở máy ảo tổn nhiều thời gian, khi gặp lỗi phải cài lại thì các bạn sẽ thấm nỗi đau :-D.

Với Docker, Docker sẽ tạo ra "môi trường ảo" chứ không phải hẳn 1 máy ảo nữa, do đó sẽ chia sẻ phần cứng với môi trường gốc bên ngoài, RAM, CPU,.. tốc độ sẽ như nhau, chia sẻ file (nếu ta muốn) với môi trường gốc. Đồng thời việc tạo một môi trường "ảo" trong Docker cũng rất nhanh chóng và dễ dàng để làm với chỉ 1 hoặc 1 vài command.

Do đó các bạn cần rõ ràng về cái mà Docker mang lại và cái mà máy ảo mang lại: 1 thứ tạo ra cho ta môi trường ảo chia sẻ phẩn cứng với môi trường gốc, một thứ tạo ra cho chúng ta cả 1 chiếc máy ảo với mọi thứ từ phần cứng, đến file system,... tách biệt so với máy thật. (xồi, nghe xong đầu óc cứ thấy ảo ảo thật thật :-D :-D). Các bạn xem hình dưới để thấy so sánh vui, nhưng thực tế về việc dùng Docker so với dùng máy ảo nhé.

![Docker](https://images.viblo.asia/0f195568-88a2-4a2d-af5d-36d8256ffdfc.png)

## Tại sai tôi cần Docker?
Dưới đây là một số suy nghĩ của mình vì sao các bạn nên yêu Docker <3:
- Khi project của chúng ta có nhiều người cùng làm, người dùng Win, người dùng Mac, người dùng Linux, nhưng cách để cài các phần mềm, thư viện để có thể chạy được project lại khác nhau ở mỗi nền tảng, đồng thời khi cài có thể làm thay đổi project. Dẫn tới việc project chạy không đúng, sai ở các nền tảng khác nhau.
- Sự sợ hãi nhất của mình ngày xưa đó là code Local ngon lắm rồi, nhưng lên server thì ngủm củ tỏi :-D.
- Mỗi project cần rất nhiều thứ đi kèm: MySQL, Redis, các extensions,... Và việc nhớ cài cho đúng từng cái đã rất mệt, nhớ cách cấu hình cho đúng lại càng mệt hơn. Và sự SỢ HÃI lớn nhất là khi cài mà bị lỗi, mà lỗi xong xóa đi cài lại lại không được như cũ.
- Khi chúng ta có nhiều project, dùng chung nhiều thứ, dẫn tới khi muốn thay đổi, sửa đổi 1 tài nguyên dùng chung nào đó sẽ làm các project liên quan ảnh hưởng.
- Và 1 trường hợp mình thấy đau khổ nhất. Đó là khi ta chuyển môi trường (chuyển server chẳng hạn), ta cần bê nguyên cục project cũ và chuyển sang môi trường mới. Lúc này NỖI SỢ :smiling_imp: mới thực sự hiện rõ. Làm sao để có thể chuyển toàn bộ data, cấu hình lại từ đầu với hàng tỉ bước, cài hàng tỉ thứ
- .... bla và blo

Tất cả những điều trên Docker sẽ giúp các bạn giải quyết một các rất chi là đơn giản, dễ dàng và cute (như người viết bài này vậy :-D)
## Ai đang dùng Docker
Dựa vào những gì mình được biết, những buổi seminar hay event mình đi thì Docker được sử dụng ở hầu hết những cty mình gặp. Từ Google, Facebook, Amazon, Tiki, đến công ty cũ của mình và rất rất nhiều mình không kể hết được ở đây

Rất có thể công ty của bạn cũng đang dùng Docker đấy, thử hỏi Leader xem ;).

Thời điểm hiện tại việc dùng Docker sẽ giúp ta sử dụng được rất nhiều tiện ích đi kèm:
- Kubernetes: Tool để quản lý các project chạy bằng Docker, tự động Heal khi có lỗi, tự động scale, tự động deploy, tự động và tự động :-D
- CI/CD: Phần này mình sẽ trình bày trong series này, áp dụng CI CD giúp ta chỉ cần code, và commit, còn lại các việc như test, check lỗi, và triển khai (deploy) ra môi trường thực tế đều được làm tự động, không cần phải cài các tool lằng nhằng để auto-deploy nữa.
- Sự hỗ trợ đến tận chân răng của các nền tảng quản lý source code như Github, Gitlab, Bitbucket,... cho các ứng dụng Docker lại càng làm tăng thêm giá trị cho Docker ;)

Với những điều tuyệt vời mà Docker mang lại thì mình nghĩ đó cũng là lí do vì sao Docker hiện tại cực kì phổ biến ứng dụng rộng để chạy project trong môi trường "ảo hóa" thay vì chạy theo kiểu truyển thống.
# Các khái niệm cần nắm
Vì khi nhảy vào Docker sẽ có rất nhiều thứ chúng ta cần biết, nhưng nếu nói ngay trong 1 bài này thì mọi người sẽ bị bội thực mất :-D. Do đó mình sẽ chỉ đề cập 1 vài khái niệm cơ bản mình thấy là cần thiết và ta hay dùng đến, những điều khác ta sẽ dần dần khám phá ở các bài sau nhé.
## Image
`Image` là 1 trong những đơn vị cơ bản nhất trong Docker. 1 Image sẽ định nghĩa cho 1 môi trường và những thứ có trong môi trường đó. Ứng dụng của ta muốn chạy được thì cần phải có `Image`

![Docker image](https://images.viblo.asia/6046e83c-0742-4538-993a-78e9802839b2.png)

Ví dụ trong Image ta có thể định nghĩa các thành phần như sau:
- Môi trường: Ubuntu 16.04
- PHP 7.2
- MySQL 5.2

Thì toàn bộ những thứ bên trên (Ubuntu, PHP, MySQL) ta có thể đóng gói lại thành 1 Image. Có thể giữ làm của hồi môn, hoặc đem public cho người khác có thể dùng được. ;)

## Container
Một `Container` là 1 thực thể của `Image`. Cách hiểu đơn giản nhất đó là: `Image` các bạn xem như 1 class, còn `Container` xem như 1 Object được khởi tạo từ class đó.

Từ một Image ta có thể khởi tạo cả chục, trăm container.Mỗi project có thể chứa 1 hoặc nhiều container được tạo ra từ 1 hoặc nhiều image. Ví dụ, ta có project PHP:
- Môi trường Ubuntu -> cần có image Ubuntu 16.04
- Có thêm php -> cần có image php7.2

Do đó khi chạy project trên ta sẽ cần tạo 2 container: 1 là container Ubuntu, 1 container PHP7.2
## Port (cổng)
Vì môi trường trong Docker độc lập hoàn toàn so với môi trường gốc. Nên để có thể sử dụng được ứng dụng chạy trong Docker thì ta cần mở port từ Docker để bên ngoài có thể gọi vào được.

Hay gọi đúng thì là ta "map port". Tức là ta sẽ mở 1 port ở hệ điều hành gốc, sau đó điều hướng tới port được ở trong Docker. Như thế ta mới có thể gọi đến ứng dụng chạy trong Docker được

![Docker map port](https://images.viblo.asia/a0e89f7d-7487-4503-a1c8-aef57e8b34b6.png)

Như ở ảnh trên ta có 1 server Tomcat chạy trong 1 container Docker, ở container ta mở port 8080 cho môi trường ngoài truy cập, từ môi trường ngoài ta mở cổng 8888 để user thật có thể truy vấn. Do đó user sẽ gọi đến cổng 8888 để giao tiếp với ứng dụng chạy trong Docker container. 
## Volume
Vì môi trường Docker độc lập nên hệ thống file của ứng dụng chạy trong Docker cũng độc lập, mà thực tế thì hầu như ta luôn cần lưu lại file: lưu trữ DB, lưu trữ log, ảnh,... Do đó để môi trường gốc truy cập được vào file system của ứng dụng chạy trong Docker thì ta cần tới `Volume`

Dùng `Volume` để môi trường gốc có thể nói cho Docker biết rằng: nếu anh có sinh ra file log mới thì anh nhớ lưu cho anh xong thì nhớ tạo 1 "hình chiếu" của file log cho tôi nhé, khi tôi sửa/xóa ở bên tôi (bên ngoài), hoặc anh sửa/xóa ở bên anh thì file log đó đều phải mất ở cả 2 môi trường (gọi đúng thuật ngữ thì là **mount** từ môi trường ngoài vào trong Docker)

# Khái niệm đã nắm, setup thôi
## Setup gitlab
Ở Series này mình khuyến khích các bạn dùng Gitlab để lưu trữ source code, vì gitlab cho free private repo đồng thời free CICD, và cũng free container registry (nơi để ta đẩy Image lên và lưu trữ sau này). Và Gitlab còn support rất nhiều thứ hay ho nữa cũng free luôn, mình hi vọng có thể chia sẻ được càng nhiều càng tốt cho các bạn :-D

Do đó các bạn tạo cho mình 1 tài khoản Gitlab nhé (yên tâm free không bắt nhập credit card đâu :-D :D). Truy cập địa chỉ gitlab.com để tạo tài khoản mới nhé các bạn
## Setup Docker và Docker-compose
### Docker
Tiêp theo các bạn cần cài đặt Docker (tất nhiên rồi :-D):
 - Cài đặt cho Windows ở [đây](https://docs.docker.com/docker-for-windows/install/). Nhớ đọc phần `System Requirements` và search google nếu có thắc mắc nhé
 - Cài đặt cho Ubuntu [ở đây](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
 - Cài đặt cho Mac [ở đây](https://docs.docker.com/v17.12/docker-for-mac/install/)

Cài xong nhớ check xem đã thành công hay chưa nhé. Chạy thử command để check:
```shell
docker --version
```
Mong các bạn đừng comment hỏi cách cài ra sao vì ở trên Google có nhiều kết quả tốt hơn nhiều ;)
### Docker-compose
Để chạy các project trong Docker thì ta có thể dùng command sau để chạy từng container cần thiết:
```python
docker run containerA
docker run containerB
....
```
NHƯNG khi chạy dự án thực tế thì hầu như ta sẽ sử dụng docker-compose để chạy project, vì thực tế hầu như ta luôn cần nhiều hơn 1 container cho 1 project. Do đó trong series này mình sẽ dùng `docker-compose` để chạy các project demo trong các bài. Yên tâm đi dùng docker-compose không cần thêm nhiều não đâu các bạn nhé, giống nhau cả thôi ;)

Docker-compose là tool để cấu hình và chạy nhiều docker container cùng lúc. Dùng docker-compose sẽ giúp ta dễ dàng hơn trong việc chạy cùng lúc 1 hoặc 1 số container cần thiết cho project, đồng thời giúp ta dễ dàng visualize (nhìn) tổng quan về project. 

Cài đặt:
- Với Win và Mac thì Docker-compose đã được tích hợp sẵn với Docker ở trên, các bạn không cần làm gì thêm
- Với Ubuntu, các bạn xem hướng dẫn [ở đây](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04) (nhớ đọc thật kĩ phần hướng dẫn, cài bản mới nhất và làm hết Step 1 là xong nhé)

Cài xong cũng check xem đã thành công hay chưa nhé. Chạy thử command để check:
```shell
docker-compose --version
```
# Update 2022
Sau một vài năm đi làm, mình mới thấy được lợi ích mà những kiến thức về Docker, Kubernetes (k8s),... nhiều như nào.

Mặc dù title là frontend engineer nhưng gần như mình làm mọi thứ: viết dockerfile, deploy lên k8s, openshift, tự exec vào pod debug, tự dockerize project của mình và của người khác (từ nodejs đến python java,..)

Làm việc với docker, deploy nhiều dạy cho mình hiểu thêm nhiều về network, không sâu như dân chuyên network, nhưng cũng khá là đầy đủ để mình hiểu được flow request đi từ phía user, rồi tới các layer trong hệ thống của mình (load balancer, ingress, gateway,...) từ đó khi có vấn đề gì mình có thể tự debug được là lỗi nằm ở phần nào.

Nói chúng là rất nhiều thứ mà khi học Docker mang lại cho mình, gần như mình rất ít khi phải chờ người khác dockerize rồi deploy app cho mình, rồi debug khi gặp lỗi nữa,...khả năng làm việc độc lập tăng cao hẳn.

Vậy nên học Docker thật chăm chỉ nhé các bạn, kiến thức về Docker là nền tảng cho các thứ sau này Kubernetes, Openshift và thế giới Container

> Nhớ có lần deploy production cùng 1 anh bên team SRE (chuyên làm deploy các kiểu), mình có dịp thể hiện phông bạt skill Docker các kiểu, ổng phải ngạc nhiên hỏi sao em học ở đây vậy, anh deploy suốt mà cũng ko rõ và ko biết mấy cái này. Tự thẩm du tinh thần thấy sướng 🤣🤣🤣🤣

# Kết bài
Qua bài này mình cũng đã giới thiệu sơ bộ với các bạn về Docker và những lợi ích mà Docker mang lại, cùng với đó là setup "đạn dược" cần thiết để chúng ta có thể bắt đầu vào các bài tiếp theo.

Ở các bài sau mỗi bài mình sẽ hướng dẫn các bạn cách `dockerize` các ứng dụng (chạy ứng dụng trong môi trường Docker) cụ thể (NodeJS, Laravel, Vue, Python,...). Từ giờ mình sẽ dùng từ `dockerize` để chỉ việc chúng ta chạy project bên trong Docker nhé (cho giống với bạn bè quốc tế ;))

Ở các bài tiếp theo mỗi bài sẽ là một ví dụ cụ thể, để các bạn vừa có thể làm và học đồng thời thấy được kết quả, mình sẽ tập trung nhiều vào thực hành vì với mình cách học nhanh nhất là thực hành. Như trang chủ của Laradock có nói: 
```sql
Use Docker First - Then Learn About It Later ( dùng Docker trước, học về nó sau, ý là các bạn sẽ dần hiểu ra nó là gì và cách vận dụng sao cho đúng)
```

Nếu có gì thắc mắc thì các bạn cứ để lại comment cho mình nhé. Hẹn gặp các bạn ở các bài sau ;) ([bài sau](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG) là bài thực hành đầu tiên có nhiều thứ quan trọng mình muốn chia sẻ nên các bạn nhớ đọc nhé ;))