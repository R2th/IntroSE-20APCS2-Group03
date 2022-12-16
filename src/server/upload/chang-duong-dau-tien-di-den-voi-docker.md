## 1. Lời mở đầu
Xin chào các bạn thời gian nghỉ tết năm nay dài quá đúng ko ? :laughing: Hưởng ứng lời kêu gọi của tổ quốc là "Hãy đứng im khi tổ quốc cần" các bạn ở nhà cũng đừng có suốt ngày vùi đầu vào game, rượu chè gì nhé... Hãy tìm cho mình một thứ gì mới, tìm hiểu và học nhé. 

Đến với lần chia sẻ lần này mình xin giới thiệu với các bạn mình đang tìm hiểu và học đó là docker. Nghe từ "docker" chắc đối với những bạn là lập trình viên thì có vẻ là nghe quen tai nhỉ. Một số bạn chưa dùng cũng có người lão làng trong khi sử dụng docker.

Tại sao chúng ta cũng là lập trình viên mà chưa sử dụng đến docker. Tại vì docker dùng trong dự án thì dùng để setup và deploy application lên một hoặc nhiều server vì công việc này rất vất vả từ việc phải cài đặt các công cụ, môi trường cần cho application đến việc chạy được ứng dụng chưa kể việc không đồng nhất giữa các môi trường trên nhiều server khác nhau, công việc đó là team leader của nhóm thường làm.

Nếu ở công ty chúng ta ko được thao tác với nó thì mình có thể build 1 project riêng để hiểu về nó chứ nhỉ ?
> *Không có việc gì khó chỉ sợ lòng không bền đào núi và lấp biển quyết chí ắt làm lên.*                 ----   (trích Bác Hồ)

Nào chúng ta cùng đi tìm hiểu nó có tác dụng gì và chạy như nào nhé. Các bạn hãy đến với phần dưới mình sẽ giới thiệu chức năng và cách cài đặt nhé.
## 2. Docker là gì ? Cách cài đặt
### 2.1 Tìm hiểu về docker
Có rất nhiều tài liệu nói về docker nên mình cũng giải thích về cơ bản docker như sau:

**Khái niệm**: Docker là một nền tảng cho developers và sysadmin để develop, deploy và run application với container. Nó cho phép tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng và môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức.

**Công dụng của docker**:
- Không như máy ảo Docker start và stop chỉ trong vài giây.
- Bạn có thể khởi chạy container trên mỗi hệ thống mà bạn muốn.
- Container có thể build và loại bỏ nhanh hơn máy ảo.
- Dễ dàng thiết lập môi trường làm việc. Chỉ cần config 1 lần duy nhất và không bao giờ phải cài đặt lại các dependencies. Nếu bạn thay đổi máy hoặc có người mới tham gia vào project thì bạn chỉ cần lấy config đó và đưa cho họ.
- Nó giữ cho word-space của bạn sạch sẽ hơn khi bạn xóa môi trường mà ảnh hưởng đến các phần khác.

### 2.2 Cài đặt docker
1. Bước đầu tiên chúng ta chạy update gói apt,  cho phép apt sử dụng kho lưu trữ qua HTTPS:
```
  $ sudo apt-get update
  $ sudo apt-get install apt-transport-https  ca-certificates curl gnupg-agent software-properties-common
```
2.  Thêm khóa GPG cho Docker's:
```
  $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
Kiểm tra cài đặt khóa GPG có thành công hay không. Nếu thành công sẽ có kết quả như dưới.
```
  $ sudo apt-key fingerprint 0EBFCD88

    pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
    uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
    sub   rsa4096 2017-02-22 [S]
```
3. Sử dụng lệnh sau để thiết lập **stable** repository
```
  $ sudo add-apt-repository  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
4. Xác minh rằng Docker Engine được cài đặt chính xác bằng cách chạy câu lệnh duới :
```
  $ sudo docker run hello-world
```

Chú ý : Đối với một số bạn sử dụng linux thì mỗi khi các bạn chạy lệnh docker nào thì các bạn phải sử dụng câu lệnh root user tức là trước câu lệnh các bạn thường thêm `sudo` vào đầu mỗi câu. Việc này mình cảm thấy rất là bất tiện chính vì vậy có câu lệnh dưới đây hỗ trợ các bạn trong việc config.

Đầu tiên bạn tạo ra 1 group docker: 
```
$ sudo groupadd docker
```
Thêm USER tức là tài khoản bạn đang dùng linux vào group docker.
```
$ sudo usermod -aG docker $USER
```
Đến đây thì các bạn log out tài khoản khỏi linux và login lại có thể thao tác các câu lệnh với docker mà ko cần thêm `sudo` ở đầu câu.

OK đến đây mình đã cài đặt thành công docker rùi. TÌm hiểu chi tiết, cách chạy tạo project thì đến với bài chia sẻ tiếp theo mình sẽ chia sẻ nhé. 
## 3. Kết luận
Thật dễ dàng phải không nào, chỉ với vài thao tác là chúng ta có thể cài đặt được docker trên máy. Mình khuyên các bạn nên tìm hiểu về docker nhé sẽ có rất nhiều điều thú vị đó. Hẹn gặp lại các bạn trong lần chia sẻ tiếp theo !:stuck_out_tongue_winking_eye:

Link tài liệu : Trang docker dưới sẽ hướng dẫn các bạn đầy đủ tutorial docker từ các cài đặt lẫn cách dùng nhé.
https://docs.docker.com/get-docker/