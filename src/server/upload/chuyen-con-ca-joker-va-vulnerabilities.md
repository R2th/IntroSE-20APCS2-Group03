Nếu bạn sử dụng container một thời gian, chắc chẳn sẽ đến một giai đoạn bạn sử dụng đến container scanner =)). Phải thôi, thời đại 4.0 ai mà không lo vulnerabilities và security. Một ngày đẹp trời nọ, mình cũng dùng scanner (Trivy) cho docker image của công ty mình. Nói chung nhìn cũng hơi sợ :clown_face: 

![](https://images.viblo.asia/ee2d0d10-7810-4730-ab80-c7045d43730c.PNG)

## Container - Sysadmin? Containeradmin?

Sau khi xem xét mọi thứ, mình gộp lại khoảng ~ 100 vulnerabilities, làm thành report dạng json rồi gửi qua vào channel của mấy bạn đã viết image ( Kiểu con mày hư nè, dạy nó đi :dancers: ). Nhưng, đây là container.

Đúng, đây là container. Bạn không thể uninstall package, hay manage the whole system được. Vậy bạn sẽ làm gì? Bạn sẽ bực. Bạn sẽ bỏ không dùng container. Bạn sẽ nghĩ bạn chỉ muốn một nơi để chạy con app nodejs của mình thôi mà lằng nhằng quá. :angry:. Bạn sẽ lẩm nhẩm sao công nghệ thay đổi thanh thế. Bạn sẽ nghĩ sau thằng kia dở hơi thế. Tạo report làm gì. Mình là bố nó hay sao mà nó báo cáo với mình. Mình có phải sysadmin đâu. Đọc report làm gì. 

Sau đó bạn sẽ bình tĩnh, bạn sẽ uống cà phê (hoặc trà). Rồi bạn bắt đầu suy nghĩ: Mình có nên đọc cái report này không? Liệu có phải mình install cái gì mới, rồi mình cũng inherit cái vấn đề này không?

Bạn nghĩ ừ thì đọc. Và bạn nhận ra đa phần  vulnerabilities đến từ base layer.
## Upstream - Downstream

Thực ra nếu ai nhờ mình miêu tả Dockerfile và cách nó hoạt động. Mình sẽ nói nó là Makefile ngủ với git tạo ra đứa con (~~ô hợp~~) này. =)). Layer này trên layer kia, reference layer từ trên xuống dưới. Thông thường, application của công ty bạn được viết vào dockerfile như sau:

```
Base layer
Some package layer
Your code & code dependences
expose
CMD - ENTRYPOINT
```

Vậy nên nói đến upstream, tức mình đang nói tới cái base layer kia. Giả dụ như vulneriabilities đến từ base layer, bạn có sửa được không? Khả năng là có. Bạn có thể tìm tới source code, sửa, làm pull request gửi tới maintainer của image đó. 

Nhưng, bạn có nên không? Nghe thì hơi xấu tính, ích kỉ, nhưng  thực sự vấn đề đó không phải "vấn đề của bạn". 

Khi vulnerabilites tới từ đó, mình khuyến khích các bạn không nên cố tìm hiểu và sửa. Vì các bạn không phải là **mantainer** :confused:. 

Các công ty lớn bỏ rất nhiều tiền để thuê developer viết application, tạo image chuyên nghiệp. Việc bạn cố fix bug cho họ là hơi ... lãng phí thời gian theo quan điểm của mình. Như Joker trong The Dark Knight nói:

> If you good at something, never do that for free

Mình biết việc sửa như vậy mang lại lợi ích cho cộng đồng. Nhưng trước khi nghĩ tới cộng đồng thì phải lo được cho bản thân đã. Công ty sẽ không trả tiền cho bạn sửa bug cho công ty khác. Joker là một kẻ điên và ích kỉ. Việc hắn nhiều lần khiến Batman đau đầu là vì hắn chẳng quan tâm ai. Hắn chỉ tập trung làm "agent of chaos" của riêng hắn. Chính vì thế, hắn làm tốt việc xấu của hẳn. 

## Then 

Việc mình nghĩ các bạn nên làm là chọn base image sao cho "ổn định". Mình thường sẽ chọn slim. slim image nhẹ hơn image thường, và không dở hơi như alpine ( muscl vs glibc - Ác mộng :cry: ). Đặc biệt slim sẽ chứa ít vuln hơn so với image thường. Tất nhiên chọn slim thì bạn phải tự manage build dependencies của mình. Để cho kết hợp hài hòa, bạn có thể dùng multi-stage build. Và còn một cách nữa đó chính là **rebuild often**.

Theo Keynote của [dockercon2021](https://docker.events.cube365.net/dockercon-live/2021):

> - 44% of docker image vulnerabilities fix with newer base image, 20% by rebuild

Nghe hơi .. vô lý vì theo Albert Einstein nói: 

> The definition of insanity is doing the same thing over and over again and expecting a different result 

nhưng thực ra khi bạn rebuild thì docker cũng install/ugrade package. Nên có-khả-năng vulnerabilities của bạn cũng biến mất. 

Vậy thôi. Đầu tuần và cuối tháng vui vẻ nhé. À mà vì sao mình lại đặc tiêu đề nghe ngớ ngẩn như vậy hả? Đơn giản mình nghĩ tới một câu tục ngữ:

> Nước trong quá không có cá, người tốt quá ...

Và nói vậy thôi. Bugs sẽ không bao giờ hết. Zero vulnerabilities in a container is almost impossible. =))

Somewhere, xx-xx-20xx

Rice