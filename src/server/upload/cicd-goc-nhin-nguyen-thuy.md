Đã có nhiều bài viết về CI/CD nhưng hầu hết đều hướng tới việc hướng dẫn sử dụng 1 số tool CI cho những project cụ thể. Bài viết này mình sẽ cố gắng cung cấp cái nhìn "nguyên thủy" nhất về CI/CD, sau đó mới là việc áp dụng nó trong các trường hợp.


Note: Bài viết theo phong cách của một thiền sinh
![](https://images.viblo.asia/8ee38cbb-6201-4437-b584-dd7ceb4ad84d.jpg)

Giống như cú đánh của Master Ancient One với Hulk, phần linh hồn của CI/CD sẽ nhỏ gọn hơn nhiều bề ngoài của nó. 

Bài viết này hướng tới việc giúp người đọc hiểu nguyên nhân CI/CD tồn tại (**why**), nó là gì (**what**) rồi mới đến khi nào (**when**), ở đâu (**where**) và cuối cùng là như thế nào (**how**).

## Why

Giả sử bạn đã từng code (ai đọc bài viết mà chưa từng code cơ chứ), và bạn vừa code xong 1 module.

Dĩ nhiên, code của bạn sẽ không chỉ nằm im ở local. Nó cần được chuyển đến đâu đó để kiểm tra, chạy thử rồi chuyển sang môi trường production cho khách hàng... Thật dễ đoán, không chỉ bạn, những người khác cũng cần điều đó

> Code cần được **test, integrate, delivery, deploy ...**
> 
> Code cần được tác động theo cách nào đó và điều này lặp lại nhiều lần
> 
> Hãy viết **kịch bản** 1 lần và hãy kiếm **con bot** nào đó thực hiện kịch bản đó nhiều lần cho bạn

Cơ bản đó là CI/CD.

## What
Theo định nghĩa được đưa ra: 

- **CI (Continuous Integration)**:  Tích hợp liên tục

  Là việc trộn (merge) và biên dịch (build hoặc compile) tất cả các phiên bản (revision) mã nguồn làm việc của các lập trình viên trên một bản chính (mainline hoặc master) mỗi ngày. Grady Booch lần đầu tiên đặt tên và đề nghị về CI năm 1991, mặc dù ông không ủng hộ việc tích hợp nhiều lần một ngày. Nói một cách đơn giản, mã nguồn của dự án phần mềm cần được tích hợp lại vào một nhánh chính và chạy các lệnh build, kiểm thử,... ít nhất một lần mỗi ngày.

  (Nguồn: https://vi.wikipedia.org/wiki/T%C3%ADch_h%E1%BB%A3p_li%C3%AAn_t%E1%BB%A5c)

- **CD (Continuous Delivery - Continuous Deploy)**:  Phân phối liên tục

  là một cách tiếp cận của kỹ thuật phần mềm, trong đó các đội sẽ sản xuất phần mềm trong chu kỳ ngắn, đảm bảo rằng các phần mềm có thể được phát hành một cách tin cậy bất cứ lúc nào. Nó nhằm mục đích build, kiểm thử, và phát hành phần mềm nhanh hơn và thường xuyên hơn. Cách tiếp cận này giúp giảm chi phí, thời gian và nguy cơ khi thay đổi bằng cách gia tăng cập nhật các ứng dụng trong sản phảm. Một quá trình triển khai đơn giản và lặp lại là điều quan trọng cho Phân phối liên tục.

  (Nguồn: https://vi.wikipedia.org/wiki/Ph%C3%A2n_ph%E1%BB%91i_li%C3%AAn_t%E1%BB%A5c)
  
  
Bản thân quá trình này là việc thực hiện kịch bản. Trong kịch bản CI/CD gồm những gì? **Integration** ra sao? **Delivery** đi đâu? **Deploy** như thế nào? Tất cả hoàn toàn do bạn tự định nghĩa thông qua kịch bản. 
  
  > CI/CD gồm 2 phần là kịch bản và con bot thực hiện kịch bản (tạm gọi là diễn viên - actor). 

Một đạo diễn tài ba đến đâu cũng không thể thiếu được kịch bản và diễn viên! Và khi setup hệ thống CI/CD, bạn cần có 2 thứ này

### Kịch bản 

```
npm install
npm install -g gatsby-cli
npm build
```

Kịch bản là văn bản chứa các bước cần được thực hiện. Bên trên là 1 ví dụ về kịch bản.

Trong trường hợp sử dụng Gitlab CI, mọi kịch bản đều được ghi trong file **.gitlab-ci.yml**  tại thư mục root của dự án



### Diễn viên

Con bot này sẽ đọc kịch bản bạn đưa cho nó, thực hiện các bước và báo cáo về cho bạn kết quả công việc. Simply!

Trong trường hợp sử dụng Gitlab CI, con bot có tên là Gitlab Runner

Gitlab Runner có thể được cung cấp miễn phí bởi Gitlab với giới hạn thời gian sử dụng là 2000 phút, hoặc có thể triển khai trên hệ thống máy chủ của bạn rồi kết nối tới Gitlab.


> “*Kì thực trên kịch bản vốn làm gì có CI/CD, người ta chia như thế mãi nên mới thành thế thôi”*

  

  ### Kịch bản quốc dân (văn mẫu)

  Dưới đây là mẫu kịch bản quốc dân cho quá trình CI/CD này. Phần kịch bản mẫu này sẽ được trình bày chi tiết trong phần **How**.

![](https://images.viblo.asia/ad702b51-b274-4150-9360-60b0dc69caba.png)



## When

Khi nào thì quá trình CI/CD này được thực hiện, nên được thực hiện và tại sao?

Giả sử bạn là quyết định điều đó, hãy suy nghĩ 1 chút ... 

Dĩ nhiên là khi code được thay đổi... nhưng không phải mọi thay đổi realtime. 



Thật may là với git, chúng ta đã có 1 hành động đặc trưng cho sự thay đổi của code. Vâng, đó là hành động commit (cam kết). 

// Có lẽ bạn nên quen thuộc với git để hiểu phần này

Không chỉ là sự thay đổi về code, lập trình viên cam kết những thay đổi đó là "đầy đủ". 



Quá trình CI/CD sẽ được thực hiện khi git repository nhận được commit mới. 1 thời điểm phù hợp



**khái niệm pipeline**

Vậy điều gì sẽ xảy ra khi git reposity nhận được nhiều commit từ nhiều lập trình viên khác nhau trên 1 git branch hoặc trên nhiều git branch khác nhau?

Quá trình CI/CD sẽ không thể trộn lẫn chúng với nhau được, quá trình này cần diễn ra riêng cho từng commit và cần được phân biệt với nhau. Đó là khi khái niệm **pipeline** xuất hiện



> Pipeline (đường ống) là khái niệm chỉ quá trình thực hiện kịch bản trên 1 commit.



Vì điều kiện để có pipeline mới là có commit mới và có bot (diễn viên) thực hiện kịch bản đó. Nên các pipeline là **độc lập với nhau**, và thường được thực hiện song song (điều này phụ thuộc vào bot resourse). 

Khi nói đến 2 hay nhiều pipeline, ta hiểu chúng độc lập với nhau và được quản lý bằng các id unique

Ví dụ: 

- Lập trình viên A push 1 commit lên git branch1-> Tạo ra 1 pipeline
- Lập trình viên B push 1 commit lên git branch2 -> Tạo ra 1 pipeline
- Lập trình viên A push cùng lúc 2 commit lên git branch3-> Tạo ra 1 pipeline dựa trên commit mới nhất
- Cùng lúc, lập trình viên A push 1 commit lên git branch1, lập trình viên B cũng push 1 commit lên git branch1 -> Tạo ra 2 pipeline

 

## Who and Where

Quá trình CI/CD được thực hiện bởi con bot bạn đã đăng ký, nên nó sẽ được thực hiện tại nơi con bot đang hiện diện. 

Việc nó diễn ra ở đâu có quan trọng không? 

Có. Bởi:

- Tài nguyên máy chủ con bot có thể sử dụng ảnh hưởng đến tốc độ, chất lượng của các pipeline như bao nhiêu pipeline có thể chạy song song, pipeline có thể fail do thiếu tài nguyên không? ...
- Vấn đề bảo mật: để có thể thực hiện phần việc của nó, con bot phải có quyền truy cập vào git repository của bạn. Bạn cần cân nhắc điều đó nếu con bot được cung cấp bởi 1 bên thứ 3 không có độ trust cao, rất có thể bạn sẽ bị mất source code của cả project.



## How

Bạn có thể tự viết 1 con bot CI/CD, có nhiều công ty ở Việt Nam làm điều đó (ví dụ: Sun CI của Sun Asterisk) hoặc dùng công cụ của các bên khác cung cấp như Circle One, Gitlab CI, Jenkin ... 

Trước khi đi vào chi tiết, hãy nhớ rằng kiến thức ở phần chi tiết là phân nhánh, giống như bạn đi từ cành cây đến lá cây vậy. Còn cành cây là từ đây trở lên :D 

Ở phần chi tiết, mình sẽ hướng dẫn các bạn thực hiện CI/CD trên Gitlab CI.