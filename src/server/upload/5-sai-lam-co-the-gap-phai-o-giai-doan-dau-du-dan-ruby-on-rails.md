# Callbacks and model validations
Khi làm một task với nội dụng đại loại như sau:
> Sau khi đăng ký thành công, gửi email thông báo cho người dùng
Với bài toán này thì không ngần ngại chúng ta dùng ngay callback tại model User:
```
after_create :send_welcome_email
```

Có lẽ đó là cách dễ hiểu nhất trong hoàn cảnh này. Nhưng chờ chút, dự án của bạn sẽ ngày càng phát triển lớn hơn, các yêu cầu sẽ ngày một tăng, sẽ có thêm rất nhiều callback khác nhau được tạo ra, chức năng gửi mail sẽ ngày càng phức tạp.


Validatation cũng vậy, khi mà bạn thêm nhiều hàm validate khác nhau, nhưng trong hoàn cảnh nào đó yêu cầu thay đổi, bạn thậm chị thường phải dùng `validate: false` để bỏ qua chúng. 
Giải pháp:  Sử dụng services/command objects/form objects/actions object. Hãy chia nhỏ logic của bạn ra, để tránh tình trạng có bất cứ thay đổi nào thì callback và validation cũng đc gọi.

# DRY
DRY: Don't repeat yourself
Đây là thuật ngữ khá quen thuộc và rất hay tận dụng bởi các lập trình viên. Có nhiều người cố gắng viết code của mình thật tốt để có thể dùng lại ở những phần khác.  Có thể đó là lý do khiến logic code của bạn ngày càng phức tạp khi có các yêu cầu khác cũng dùng chung được nhưng chỉ thay đổi một chút về logic. Vậy bài toán đặt ra là bạn mất thời gian chỉnh sửa lại template sao có thể phù hợp với nhiều phần hay copy đoạn code đó rồi chỉnh sửa phù hợp với yêu cầu tại đó?

Giải pháp: DRY là tốt nhưng chúng ta nên biết tận dụng phù hợp, không nên quá lạm dụng khiến mất nhiều thời gian chỉnh sửa cho phù hợp.

# YAGNI
YAGNI: you ain’t gonna need it.

Đôi khi bạn thích thể hiện bản thân mình, bạn nghĩ rằng mình là nhà phát triển tuyệt vời và cái tôi cho rằng sẽ tạo ra một mã tốt nhất trên thế giới. Đôi khi bạn thậm chí còn thông minh đến mức sẽ dự đoán các thành phần sẽ được sử dụng như thế nào trong tương lai hoặc khách hàng muốn có gì. Và bạn thường lãng phí thời gian với một công việc như thế. Bạn phải cố gắng đáp ứng các yêu cầu nhiệm vụ để hoàn thiện được các dự định tương lai đó.

Hoặc với một bài toán nhỏ nhưng bạn sử dụng một công cụ mà bạn nghĩ rằng hữu ích trong tương lai. Chẳng hạn như sử dụng ElasticSearch engine chỉ để search những trường như username trong database vỏn vẹn 100 bản ghi. Hoặc là cài cắm docker các kiểu cho 1 dự án chỉ có 6 controller, 1 vài model với DB đơn giản. Bởi vì lý do kiểu gì dự án trong tương lai sẽ phải dùng nên dùng luôn cho tiện, project chắc là sẽ to lắm nên cứ làm trước cho chắc.

Giải pháp: Hãy cố gắng suy nghĩ kỹ khi áp dụng 1 công nghệ của tương lai. Thống nhất giữa các thành viên trong nhóm trước khi đưa ra một dự định thực hiện điều gì đó. Khi nào chắc chắn thì chúng ta hãy sử dụng, ko thì cứ đơn giản mà chơi thôi

# Cache sớm quá
Lý do bạn dùng cache chắc chắn là làm tăng performance của dự án. Tốc độ sẽ được cải thiện đáng kể, nhưng việc sử dụng cache sớm quá sẽ phát sinh vấn đề trong code, logic sẽ không tối ưu, khó để biết được những cách làm page load nhanh hơn.

Giải pháp: Dùng cache đúng thời điểm. Cố gắng tối ưu performace trước khi sử dụng cache

# Todo comments
Trong khi code, có những vấn đề phát sinh nhưng chúng ta chưa muốn làm ngay, đành phải thêm comment kiểu "TODO refactor", "TODO improve this",.... Và đến lúc nào đó bạn bị cuốn vào công việc, sinh ra rất nhiều chỗ TODO chưa được giải quyết. Lúc đó bạn sẽ không biết phải giải quyết từ đâu cả và có thể nó sẽ mãi là TODO mà thôi.


Giải pháp: Khi có vấn đề cần refactor => refactor luôn. Hoặc chưa muốn sửa ngay => tạo ticket, task mới với độ ưu tiên trung bình.


Tham khảo: https://codecoding.net/ruby/on/rails/2018/12/07/top-5-mistakes-in-early-rails-project.html