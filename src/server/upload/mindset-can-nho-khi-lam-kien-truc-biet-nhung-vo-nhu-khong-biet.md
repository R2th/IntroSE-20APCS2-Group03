Một trong những khó khăn lớn nhất khi mình gặp các bạn lập trình Go (và các ngôn ngữ khác) khi tiếp cận với kiến trúc là decoupling (giảm lệ thuộc), không chỉ với các bạn mới, mà cả với những bạn làm lâu năm.

Một lý do rất rõ ràng vì đa số chúng ta là người viết cả phần define (định nghĩa) cho tới phần declare, impelement (khai báo, thi công) nên chuyện "biết quá rõ" là đương nhiên. Thói quen từ việc này, dẫn đến chúng ta cứ có rồi import và xài thôi và bỏ qua tư duy: cần xài cái gì, chắc chắn rằng ta không thể xài hết được. Từ có việc decouple trở thành cái mà ai cũng biết, nhưng thực tế lại không biết, vì nghĩ là mình không có nhu cầu.

Thói quen này để càng lâu lại càng không sửa được, hoặc có muốn sửa cũng rất khó vì nhiều lý do nhưng cơ bản là rất khó để thay đổi một thói quen. Và chưa kể là nếu muốn đổi, thì phải làm thế nào? Tôi đã apply Clean Code, Clean Architect nhưng project vẫn bấy nhầy, tại sao vậy?

Rất đơn giản: Clean Architect là một kiến trúc được đúc kết qua thời gian. Cái chúng ta thấy được là cái "đúng" nhưng lại chưa kịp hiểu cái "sai". Mà quan trọng hơn cái "sai" ấy chính là tâm pháp, là mindset cốt lõi. Đó chính là decoupling.

Để làm quen lại với decoupling, theo mình cần phải tập quen với "biết nhưng vờ như không biết". Nghe hơi mông lung, mình lấy một số ví dụ đơn giản hơn:
- **Chủ nợ và con nợ**: con nợ có thể mượn tiền chủ nợ, từ đó nó có 1 thuộc tính để biết chủ nợ là ai. Chắc chắn rằng con nợ không bao giờ xài được hết chủ nợ, mà chỉ là "mượn tiền" thôi. Từ đó ta chỉ cần để con nợ giữ 1 interface "có khả năng cho mượn tiền" là được. Không cần biết chủ nợ là ai nhưng vẫn mượn được tiền.
- **User và follower**: follower này không nhất thiết là full object user. Bản chất chỉ cần vài thông tin để phục vụ hiển thị, quan trọng cần có: Id, Display Name và Avatar. Từ đó ta chỉ cần lập một struct mới là Follower, hoặc một interface Follower để lấy ra được các thông tin trên.

Từ đó ở nơi cần mình cứ xem như không biết gì về nơi lấy, tự khắc ta đã decouple được thành công.

Từ mindset này để lên được Clean Architect đúng là còn 1 khoảng trời nữa, nhưng theo mình đây là nền tảng rất quan trọng. Thậm chí chỉ cần hiểu được và vận dụng đúng, việc xây dựng kiến trúc sẽ thú vị hơn, linh hoạt hơn mà không phải cứ xài các kiến trúc có sẵn một cách cứng nhắc.

Tất cả những thứ to lớn vĩ đại đều bắt đầu từ những thứ rất đơn gỉan. Tìm được những điều đơn giản này là "giác ngộ".

Link bài viết gốc tại [đây](https://www.facebook.com/photo.php?fbid=2703495049678597&set=gm.2776840529009649&type=3&theater&ifg=1)