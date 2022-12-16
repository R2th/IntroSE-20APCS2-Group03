![](https://images.viblo.asia/f9af9cd7-fc01-44d1-879e-456fb0a3aa53.png)

Tất cả mọi hoạt động của chúng ta bao thực hiện trên Internet (chẳng hạn như đọc bài báo này, mua sắm online, chuyển tiền online...) bản chất của chúng thực chất là việc gửi các message (gói tin) lên server và ngươc lại, nhận các message từ server.

HTTP là HTTPS là 2 trong rất nhiều các giao thức quy định cách truyền tải các message này trong internet. 
**HTTP** = Hyper Text Transfer Protocol 
**HTTPS** = Hyper Text Transfer Protocol Secure, hiểu đơn giản là một phiên bản nâng cấp của HTTP về mặt bảo mật, đảm bảo các message được truyền tài một cách an toàn trong internet. 

Cơ chế nào của HTTPS lại giúp nó bảo mật hơn HTTP? Thì trong bài viết này, bằng cách sử dụng hình ảnh chú bồ câu đưa thư, mình sẽ giải thích cho các bạn một cách dễ hiểu nhất tại sao HTTPS lại làm được điều đó. 

## Giao thức sơ khai - HTTP

Nếu *Alice* muốn gửi cho *Bob* một message, cô ấy chỉ cần buộc message ấy vào chân bồ câu, bồ câu bay đến chỗ *Bob*, *Bob* nhận được message, đọc nó và xong, mission complete!

Nhưng cuộc sống vốn không đơn giản =)), luôn có những Hacker xấu ở đó, đứng giữa đường, bắt chú bồ câu lại, thay đổi nội dung message và gửi cho *Bob*. Lúc này *Bob* không thể nào biết được răng message của *Alice* đã bị tráo trong quá trình chú bồ câu vận chuyển.

Trên đây thực chất là cách mà HTTP hoạt động, chắc chắn bạn sẽ không muốn gửi thông tin tài khoản ngân hàng bằng giao thưc này đúng không? - thật sự là nó quá nguy hiểm.

## Mã hóa

*Alice* và *Bob* lúc này đã ranh mãnh hơn, 2 người quy định với nhau rằng họ sẽ sử dụng cách mã hóa bí mật nội dung của message, bằng cách dịch chuyển từng chữ cái sang chứ cái thứ 3 đằng sau nó trong bảng chữ cái. Ví dụ A -> D, M -> P, Q -> T.

Giả sử *Alice* muốn chuyển nội dung "em yeu anh", cô ấy trước tiên sẽ dịch chuyển các chữ cái trước, lúc này message sẽ thành: "hp bhx dqk". 

Nếu Hacker có bắt đươc message này đi chăng nữa, hắn cũng không hiểu nghĩa là gì, vì hắn không biết cách giải mã (cách giải mã ở đây là dịch chuyển ngược lại từng chữ cái về chữ cái thứ 3 đằng trước nó trong bảng). 

Nhưng *Bob* vì đã thống nhất cách mã hóa từ trước với *Alice* nên có thể dễ dàng suy ra "hp bhx dqk" có nghĩa là "em yeu anh".

Cách mã hóa sử dụng cách dịch chuyển kí tự này được gọi là Caesar cipher. Nó thuộc trong nhóm cách mã hóa có tên gọi: Mật mã key đối xứng. Có nghĩa là khi bạn biết cách mã hóa, thì bạn sẽ biết luôn cách giải mã.

## Làm thế nào để quy định mã Caesar cipher

Trường hợp đặt ra là *Alice* và *Bob* chưa từng gặp nhau trước đây để quy định họ sẽ dịch chuyển bao nhiêu kí tự (ở ví dụ này là 3).

Nếu *Alice* lại gửi cho *Bob* một message chứa nội dung số kí tự dịch chuyển này thì có nguy cơ Hacker lại chặn giữa đường và biết được con số này.

Có vẻ như cách này không ổn, và cách duy nhất chúng ta có thể làm để tránh rủi ro này đó là nâng cấp toàn bộ cơ chế truyền tải message này. 


## Chim bồ câu mang theo hòm có khóa

Một giao thức mới thông minh hơn mà *Alice* và *Bob* đã nghĩ ra, giao thức này bao gồm các bước như sau:
* *Bob* gửi bồ câu cho *Alice* (bồ câu lúc này không mang theo gì cả)
* *Alice* gửi một cái hòm được mở sẵn sang cho *Bob*, *Alice* cầm chìa khóa của hòm
* *Bob* bỏ message cần gửi vào hòm, và khóa hòm lại
* *Alice* nhận hòm, dùng chìa khóa để mở hòm và đọc message

Với giao thức này, Hacker có bắt được bồ câu cũng không có chìa khóa để mở hòm. 

*Alice* và *Bob* đã sử dụng một phương thức mã hóa có tên gọi Mật mã hóa key không đối xứng có nghĩa là dù bạn có mã hóa message (khóa hòm lại) thì cũng không thể giải mã (mở hòm) - vì bạn không có chìa khóa.

Trong ngôn ngữ kĩ thuật, chiếc hòm ở đây tương ứng với public key, còn chìa khóa mở hòm tương ứng với private key.

## Làm sao để tin được cái hộp đó

Nếu bạn  để ý sẽ thấy vẫn còn một vấn đề ở đây. Đó là làm sao mà *Bob* biết được chắc chắn là cái hòm đó được gửi từ *Alice*. Liệu rằng Hacker có tráo chiếc hòm đó với một cái hòm khác mà Hacker có chìa khóa để mở.

*Alice* quyết định sẽ kí vào vào cái hộp, để khi *Bob* nhìn thấy chữ kí sẽ biết đây là hộp của *Alice*.

Cách này vẫn chưa ổn lắm, vì làm sao *Bob* biết được đây có phải là chữ kí của của *Alice* hay không nếu *Alice* chưa từng chỉ cho *Bob* biết.

Phương án ở đây là nhờ bác Ted kí và đóng dấu!

Bác Ted là ai? Bác Ted là một người đáng tin cậy và nổi tiếng. Bác Ted sẽ chỉ kí và đóng dấu vào hòm của *Alice* khi bác ấy chắc chắn cái hòm đó là của *Alice*. 

Khi *Bob* nhận được hộp của *Alice* với chữ kí và con dấu của Ted, *Bob* có thể yên tâm bỏ message của cậu ấy. Nếu chiếc hòm không có chữ kí vào con dấu thì *Bob* sẽ biết hòm này đã bị tráo và không dại dì bỏ message của cậu ấy vào.

## Nhưng cái hòm quá nặng với chú chim bồ câu

*Alice* và *Bob* hoàn toàn có thể yên tâm với cơ chế mới này, nhưng họ nhận ra một điều chiếc hòm quá nặng khiến chú bồ câu vận chuyển chậm hơn so với khi không phải chở hòm.

Vì thế họ quyết định chỉ dùng hòm khi gửi "số kí tự dịch chuyển" (các bạn còn nhớ cách mã hóa Caesar cipher chứ)

và các lần gửi tin sau *Alice* và *Bob* chỉ cần gửi message mà đã được xê xịch kí tự mà không cần phải bỏ nó vào hòm nữa.

Cách làm tận dụng được tối ưu cả 2 cách mật mã hóa key đối xứng và key không đối xứng phải không nào. Quá tuyệt vời phải không nào. 

Xong! Vậy là bạn đã có cái nhìn đơn giản nhất về cách thức hoạt động của giao thức HTTPS. Nếu bạn muốn tìm hiểu sâu về giao thức HTTPS này dưới ngôn ngữ kĩ thuật, bạn có thể search google các keyword sau nhé:  HTTPS, asymmetric cryptography