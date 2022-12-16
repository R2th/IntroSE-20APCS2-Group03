## 1. Switch of focus

Nếu chịu khó quan sát và thống kê, có lẽ không khó để nhận ra những lần bạn thốt lên
> Ủa, mình đang làm cái gì thế nhỉ?
> 
sau khi có một vấn đề gì đó bỗng nhiên chen ngang vào luồng suy nghĩ đang dở dang của bạn tỉ như một cuộc gọi bất ngờ...Thế là khi quay trở lại công việc ban đầu bạn phải cố gắng để nhớ lại hay thậm chí là làm lại các bước đã làm trước đó, bởi vì tồn tại một sự thật là bộ não chúng ta khá yếu trong việc lưu trữ thông tin. 

![https://www.pinterest.com/pin/346917977543518612](https://images.viblo.asia/a3d81d42-c29f-4e10-9251-51c0800f09be.png)

Nhưng mà yếu tố ngoại cảnh thì khó mà kiểm soát được, ai biết là bạn đang tập trung hay vào flow hay không, người ta có việc và người ta hỏi bạn thế thôi. Rồi bạn cũng phải trả lời chứ đâu làm thinh được, đúng không? 

Đúng, nhưng có thể cải thiện được bởi vì đôi lúc chưa kể đến tác động bên ngoài thì chúng ta đã tự hủy bằng nhiều cách khác nhau như liên tục chuyển tab, chuyển màn hình, nhảy thông báo....vân vân và mây mây.

![image.png](https://images.viblo.asia/1728fbf4-09b0-4c89-9d34-faa07ee3d52e.png)

Thế nên, để làm việc hiệu quả hơn thì việc giữ cho khả năng tập trung ít bị phân tán là khá quan trọng. Đơn cử như việc sau khi code xong thì chuyển qua trình duyệt để build `Jenkins` thì chúng ta có thể trigger build bằng một alias đơn giản với terminal tích hợp ngay trong IDE. Và đó cũng là mục tiêu của bài viết này mà mình muốn giới thiệu với các bạn.

## 2. Trigger build Jenkins job via curl

![image.png](https://images.viblo.asia/373dc825-635c-4146-8d7b-8d1146007691.png)

Câu chuyện ở đây là thay vì phải vào đây để build và thực hiện một công việc mang tính chất lặp đi lặp lại, thì chúng ta có thể đạt được một kết quả tương đương bằng cách trigger build `jenkins` thông qua [Remote API call](https://www.jenkins.io/doc/book/using/remote-access-api/) rồi sau đó tiến hành alias câu lệnh để đơn giản hóa lần build tiếp theo. Let's get started! 

API's URL dùng để trigger build job của Jenkins có syntax như sau:
```
http[s]://{JENKINS_URL}/job/{JOB_NAME}/buildWithParameters?param=param&...
```

Nhưng để gọi được API thì  phải dùng thêm [API token](https://www.jenkins.io/blog/2018/07/02/new-api-token-system/) của user mà bạn đang sử dụng nữa. 

![image.png](https://images.viblo.asia/50ad4235-b381-4d4a-89fe-41ce801265a7.png)

Đây là cú pháp gọi API đầy đủ thông qua `curl`:
```
curl -X POST --user {USER}:{API_TOKEN} \
    http[s]://{JENKINS_URL}/job/{JOB_NAME}/buildWithParameters?param=param&...
```

Ví dụ
```
curl -X POST --user "logbasex:1111df562fea178c10fef659484bddd4d1" "https://logbasex.com/job/backend-logbasex/buildWithParameters?text=test%3Atest"
```

Tiếp theo thì thêm đoạn code sau vào `.bashrc` nếu bạn đang dùng `bash shell`, các shell khác như `fish`, `zsh` bạn cũng có thể làm tương tự.
```
jenkins(){
  curl -X POST --user "logbasex:1111df562fea178c10fef659484bddd4d1" "https://logbasex.com/job/backend-$1/buildWithParameters?text=$2%3A$3"
}

alias jltt='jenkins logbasex test test'
```

Việc bây giờ của bạn là sau khi code xong thì nhấn tổ hợp phím `ALT + F12` mở termianl lên rồi gõ nhẹ vài kí tự và tận hưởng thành quả. Thật là nhẹ nhàng và thoải mái. 

![image.png](https://images.viblo.asia/ffd1d04e-b189-4840-ae21-d8df9a7fdb4b.png)

## 3. Reference
- https://www.baeldung.com/ops/jenkins-parameterized-builds
- https://stackoverflow.com/questions/23497819/trigger-parameterized-build-with-curl-and-crumb
- https://stackoverflow.com/questions/44711696/jenkins-403-no-valid-crumb-was-included-in-the-request