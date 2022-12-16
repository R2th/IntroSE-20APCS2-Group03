Có lẽ bất kì một lập trình viên iOS nào cũng đều biết rằng các thiết bị iOS chỉ chạy các ứng dụng được các developer đáng tin cậy KÝ (và tất nhiên nó ngoại trừ các thiết bị đã jailbreak). Nếu bạn là một iOS developer thì việc ít nhất một lần phải đối mặt với việc KÝ đó. Lần đầu tiên mình nghĩ về nó là lần mình cực kì đau đầu, có lẽ phải dùng từ phát bực mới lột tả được cảm xúc lúc đó. Rồi có những lúc mình đã có thể sử dụng nó nhưng mà không hiểu gì về nó thì đó mới là (magic)


Vậy đó, mình đã không tránh khỏi nó, thay vào nó là phải đối mặt với nó. Cho dù ĐAU ĐỚN thế nào. Vậy nhé, giờ mình sẽ chia sẻ với các bạn về quá trình code signing với những lợi ích và hạn chế của nó.

### 1. Code Signing là gì?
- Code Signing trong ứng dụng iOS có lẽ luôn là một chủ đề HOT cho các lập trình viên iOS. Mặc dù các bạn có thể tìm kiếm rất nhiều tài liệu trên mạng hay ngay cả tài liệu của Apple ([documentation](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005929-CH1-SW1)) thì Code Signing vẫn là cái gì đó thật ảo diệu.
- Trong bài viết này mình sẽ cố gắng chia sẻ giúp các bạn có thể hiểu về code signing và những điều cần thiết để có thể KÝ thật vào ứng dụng của các bạn. Chúng ta thực hiện KÝ bằng giao diện hay bằng command line đều được 
- Chúng ta sẽ đi từ việc tạo Certificate (à quên Certificate là gì mình sẽ nói sau nhé) đến việc hiểu các Provisioning profile (mình cũng lại nói sau nhé :v) và cuối cùng là bạn sẽ hiểu cả một quy trình KÝ (Code Sigining)

Bên trên mình nói nhiều quá mà chưa giải thích Code Signing là gì? Vậy nó là gì nhỉ?
- Trước khi mình cắt nghĩa Code Signing là gì thì chúng ta bàn một chút về cuộc sống đi. Trong cuộc sống chắc hẳn các bạn hay mình cũng đều từng một lần ký hợp đồng. Hợp đồng lao động, hợp đồng mua bán... Hay đơn giản sắp tới trong team mình có cũng vài ông anh phải run tay ký giấy đăng ký kết hôn =)). Tại sao chúng ta cần ký hợp đồng, tại sao mấy ông anh này phải ký giấy kết hôn thế nhỉ? Tại sao không phải là cứ về ở với nhau mà là phải ký trước khi về ở với nhau. Hay mua bán cũng vậy, cứ tiền trao cháo múc, sao phải ký cót mệt người nhỉ. Vậy đó, vậy mà nó rất quan trọng. Việc ký này giúp chúng ta được bảo vệ một cách hợp pháp, hợp lệ và giúp chúng ta tin rằng bất cứ điều kiện, điều khoản nào trong hợp đồng đều không thể thay đổi trong khi hợp đồng điều kiện này được đưa ra. Và nó cũng chứng mình được rằng nó được đưa ra từ các cơ quan đáng tin cậy mà không phải từ đội ngũ lừa đảo nào.
- Vậy nó là an toàn, an toàn và an toàn.
- Code Signing là một quá trình ký điện tử (digitally signing) giúp xác nhận code do người nào viết và khi ký thì code đó không có vấn đề gì.
- Việc ký này sử dụng mã băm để xác minh tính xác thực và tính toàn vẹn của phần mềm. (Các bạn có thể tham khảo [Cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function)). Trên thực tế thì việc KÝ này giúp người dùng cảm thấy an toàn khi sử dụng phần mềm. Và Code Signing này sử dụng public key, private key, certificates... Và nó được thực hiện trên nhiều nền tảng khác nhau.

### 2. Code Signing trong iOS
- Apple trước đây được cho là rất mạnh về vấn đề bảo mật =)) cơ mà bây giờ chắc đỡ hơn rồi. Cả một quy trình các bạn đẩy ứng dụng lên store và việc mà ứng dụng được tải về thiết bị của người dùng đều được "bảo mật" rất mạnh.
- Trong quá trình code iOS chắc các bạn cũng có lúc cảm thấy không happy vì mãi mà không build được ứng dụng lên thiết bị thật, hay không đẩy được ứng dụng lên store vì liên tục gặp lỗi. Và cũng có những lúc các bạn cảm thấy vui vì build được, đẩy được ứng dụng lên store mà không bị lỗi gì trong khi chả hiểu gì =)), cứ làm theo step - step thấy nó done :v
- Nhưng trong ngày gần đây bạn sẽ thấy Apple thêm chức năng Automatic Signing cho Xcode của bạn giúp các bạn không còn phải mất nhiều thời gian cho mấy cái việc "vớ vẩn" 

### 3. Lý do thôi thúc chúng ta cần phải học Code Signing
Hầu hết các thao tác phục vụ cho quá trình Code Signing đều được thực hiện trên Xcode, vậy tại sao chúng ta lại cần học nó?
- Giờ này có lẽ đã quá xa vời với những ngày tháng thực hiện các công việc Code Signing bằng tay rồi các bạn nhỉ. Có lẽ cũng nhiều công ty hay nhiều dự án đang thực hiện CI/CD nên các công việc đó đều được tự động hoá. Ngay bản thân trong dự án mình cũng đang được support việc build tự động. Giảm thiểu rất nhiều effort cho developer. 
- Trước đây có lẽ các bạn cũng đã từng mất rất nhiều thời gian cho các công việc này và việc xử lý vẫn không thành công.
- Một số công cụ bên thứ 3 như Fastlane giúp chúng ta xây dựng kịch bản dễ dàng hơn rất nhiều.

Vậy nhưng để có thể làm những công việc trên thì chúng ta cần phải học để hiểu thì mới có thể sử dụng đúng được. Nếu các bạn xác định đi đường dài với con đường làm lập trình viên iOS thì mình nghĩ sớm muộn gì các bạn cũng phải hiểu về nó. 

Từ việc các bạn hiểu về nó thì tiếp theo các bạn nên biết sử dụng một số công cụ, công nghệ hay các hệ sinh thái iOS. Nếu bạn không biết về nó thì bạn sẽ không bao giờ được coi là Tech Lead hay Tech Architect hay một số chức vụ tương tự như thế. Vì vậy, dù gì đi nữa, mọi thứ chạy bằng cơm vẫn không thể trường tồn mãi mãi được. Deadline tới mông rồi mà vẫn còn lụi hụi sửa bằng tay...

Có lẽ chỉ từng đây cũng đủ lý do thuyết phục các bạn nên học nó. Còn không, nếu các bạn không muốn học nó sẽ có 2 lựa chọn cho các bạn:

1. Đọc lại từ đầu bài viết này
2. Không code nữa :v

### 4. Điều kiện tiên quyết và những lợi ích từ Code Signing

Những điều bạn cần "chỉ" gồm:
- Hệ điều hành Mac
- Tài khoản Apple Developer Membership
- Xcode

Theo lý thuyết thì người dùng ứng dụng iOS chỉ cảm thấy an toàn khi họ tải xuống ứng dụng từ Apple Store và việc ký mã phải đảm bảo rằng:
- Mã do các developer "chân chính" viết mã và ký mã.
- Việc ký đảm bảo mã không bị thay đổi bởi một người nào đó. Việc ký cũng đảm bảo rằng kể từ khi mã của bạn đã được ký đồng nghĩa nó là bản gốc của bạn và không bị người nào đó "tiêm" cái gì đó vào :v 
- Người dùng tải ứng dụng mà họ cảm thấy tin tưởng, chứ không phải vừa tải vừa run run lo sợ bị hack.

### 5. Hạn chế của Code Signing

Bất cứ thứ gì cũng đều có mặt hạn chế của nó. Code Signing cũng vậy. Trên thực tế thì không có thứ gì có thể bảo mật mãi mãi. Mọi bảo mật đều có thể bị phá vỡ. Tức là sẽ có lúc nó không còn bảo mật nữa.
- Mã được viết và được ký bởi các lập trình viên "chân chính" và được gửi tới Apple không có nghĩa là mã họ viết ra không có lỗ hỏng.
- Việc ký mã không có nghĩa là các plugin hay extension được tải trong quá trình sử dụng là bảo mật.
- Việc bạn viết code và một thời gian sau người khác có đoạn code y hệt như bạn viết là chuyện thường tình. Việc ký không đảm bảo code bạn viết ra là chỉ của riêng mình bạn

**Tổng kết:** Trên đây mình chia sẻ một chút về Code Signing. Trong bài viết tiếp theo mình sẽ đi tiếp các vấn đề xoay quanh Certificate Signing Requests.