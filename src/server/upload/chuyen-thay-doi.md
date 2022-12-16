Thay đổi là một thứ gì đó luôn luôn đáng sợ. Cách đây vài tháng mình có duyên đi làm cho một banking solution tên là X. Công ty cũng sử dụng **docker container, artifact repository, docker swarm, ansible, etc**. Nhưng, mình không thực sự cảm nhận được **"DevOps culture"** trong công ty.

Đây là quá trình release một version mới của công ty.

- Developer làm một điều-kì-diệu gì đó.
- Tạo jar file - pdf (500+ chương) - step by step.
- Ném qua bên "DevOps" (IT Operation thì more accurate).
- Nội dung của file pdf thường là:

```
cp a.jar b.jar
systemctl service abc restart
```

Hồi đấy làm được một thời gian, mình quyết định automate hơn (*một chút*). Mình tạo một script nhỏ để đọc file pdf, filter out command và chạy exec command theo list.

Đồng nghiệp nhìn xong liền nói:**"No. It's too risky".** :/

Thực tâm lúc đó mình thấy không phục, vì công ty còn có **on-call duty**. Tức nửa đêm lọc cọc dậy deploy một cái gì đó. Mình thấy cái đó ricky hơn. Tại mắt nhắm mắt mở, biết đâu gõ sai command, xong lại lọc cọc reverse lại thì coi như một đêm mất ngủ.

Mình hồi đấy còn lập hẳn cái bảng kiểu này. (Số má cũng hơi hoang đường chút xíu :D )

| Description| Success rate |
|:-----|:--------:|
| Detach sever from cluster   | 99.6 |
| Stop server  |  99.6  | 
| copy file  | 99.6 |
| update configuration  | 99.5 |
| start server |    98.7 |
| Attach back cluster  | 99.6 |

Nhìn qua thấy cũng không sao, nhưng nếu tính overall success rate thì:
```
P(T) = P(1)+P(2)+..P(n)
P(T)  ~= 85%
```

Điều đó có nghĩa là, 4 giờ sáng, bạn tỉnh dậy, deploy cái của nợ đó. có 15% nó sẽ lỗi. Bạn ngồi nhìn màn hình. Màn hình nhìn bạn. Rồi bạn lại rollback old version. Thấy cuộc đời sao mà dở hơi quá.

Đã thật sự có trường hợp cái project đó đang ở version **x.x.x.x.x.x.15**, vì có bạn của nợ nào đó muốn **seperate cluster cho rabbitmq** mà mọi người phải lội ngược dòng về **x.x.x.x.x.x.11**. Mà cái project là microservice, cái version của của nợ này depends on version của của nợ kia. Thế là mấy nguyên **3 ngày** mới rollback được. Sếp chửi, đồng nghiệp mắng, mình buồn.

Vậy mới nói, quần áo không làm nên thầy tu. Bạn có tải **một đống tools** về nhưng không dùng, hoặc dùng không hiểu quả thì cũng như không. Chuyên hôm nay đến đây thôi, hôm nào mình sẽ kiểu tiếp.

Somewhere, xx-xx-2021

Rice

*P.s: Thật ra hồi đấy nhìn cái project mà version nó có tới*  **7 chữ số** *là mình đã thấy ớn, muốn té rồi. Giờ nghĩ vẫn sợ. :D*