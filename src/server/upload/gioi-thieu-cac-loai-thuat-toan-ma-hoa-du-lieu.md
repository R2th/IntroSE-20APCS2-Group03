# Giới thiệu
Trong cuộc sống ngày nay, mạng internet có lẻ đã trở thành một thứ không thể thiếu đối với chúng ta. Mạng internet giúp chúng ta tra cứu thông tin, làm việc, học tập, kết nối với mọi người. Nếu thiếu nó thì có lẻ thế giới này sẽ trở lên lạc hậu hơn rất nhiều so với bây giờ.

Vậy có bao giờ bạn nghĩ đến thực chất internet là gì, mà tại sao nó lại quan trọng đến vậy? Về cơ bản, ta có thể coi internet như là một môi trường trung gian để trao đổi THÔNG TIN, mọi hoạt động trên internet đều HẦU NHƯ CHỈ xoay quanh việc tiếp nhận, trao đổi và truyền nhận THÔNG TIN. Qua đó ta có thể thấy được thông tin quan trọng như thế nào.

Thật sự thông tin còn quan trọng hơn những gì bạn tưởng. Một số thông tin có thể quan trọng hơn bất cứ thứ gì hữu hình trên thế giới này, nó có thể đáng giá hàng trăm tỷ, hàng tỷ tỷ đô la, hoặc có thể là vô giá.

Vì thông tin là quan trọng, nên chúng ta sẽ cần phải có những phương pháp để bảo vệ nó.

Lưu ý: bài viết dành cho những người mới bắt đầu, chưa biết hoặc chỉ mới biết sơ về mã hóa thông tin.

# Mã hóa là gì?
Hiểu nôm na Mã hóa là phương thức ngụy trang hoặc che giấu một tin nhắn bằng cách áp dụng một số bước lập trình máy tính thành các chuỗi ký tữ đặc biệt để ngăn những người không phận sự tiếp cận vào thông tin đó. Ví dụ: tin nhắn có nội dung như “tôi sẽ gặp anh vào ngày mai tại Hà Nội” được chuyển thành tin nhắn mã hóa như “p98hUls#yeb!”. Làm thế nào để mã hóa được như vậy thì chúng ta cần có thuật toán mã hóa.

# Thuật toán mã hóa
Thuật toán mã hóa là một thuật toán nhằm mã hóa thông tin của chúng ta, biến đổi thông tin từ dạng rõ sang dạng mờ, để ngăn cản việc đọc trộm nội dung của thông tin (Dù hacker có được thông tin đó cũng không hiểu nội dung chứa trong nó là gì).

Thông thường các thuật toán sử dụng một hoặc nhiều key (Một chuỗi chìa khóa để mã hóa và giải mã thông tin) để mã hóa và giải mã (Ngoại trừ những thuật toán cổ điển). Bạn có thể coi key này như một cái password để có thể đọc được nội dung mã hóa. Người gửi sẽ dùng key mã hóa để mã hóa thông tin sang dạng mờ, và người nhận sẽ sử dụng key giải mã để giải mã thông tin sang dạng rõ. Chỉ những người nào có key giải mã mới có thể đọc được nội dung.

Nhưng đôi khi "kẻ thứ ba" (hacker) không có key giải mã vẫn có thể đọc được thông tin, bằng cách phá vỡ thuật toán. Và có một nguyên tắc là bất kì thuật toán mã hóa nào cũng đều có thể bị phá vỡ. Do đó không có bất kì thuật toán mã hóa nào được coi là an toàn mãi mãi. Độ an toàn của thuật toán được dựa vào nguyên tắc:

> Nếu chi phí để giải mã một khối lượng thông tin lớn hơn giá trị của khối lượng thông tin đó thì thuật toán đó được tạm coi là an toàn. (Không ai lại đi bỏ ra 50 năm để giải mã một thông tin mà chỉ mang lại cho anh ta 1000 đô).

> Nếu thời gian để phá vỡ một thuật toán là quá lớn (giả sử lớn hơn 100 năm, 1000 năm) thì thuật toán được tạm coi là an toàn.

# Phân loại các phương pháp mã hóa
Có rất nhiều loại phương pháp mã hóa khác nhau đã ra đời. Mỗi loại có những ưu và nhược điểm riêng. Ta có thể phân chia các phương pháp mã hóa thành 4 loại chính:

1. Mã hóa cổ điển
2. Mã hóa một chiều
3. Mã hóa đối xứng
4. Mã hóa bất đối xứng

# 1. Mã hóa cổ điển
Đây là phương pháp mã hóa đầu tiên, và cố xưa nhất, và hiện nay rất ít được dùng đến so với các phương pháp khác. Ý tưởng của phương pháp này rất đơn giản, bên A mã hóa thông tin bằng thuật toán mã hóa cổ điển, và bên B giải mã thông tin, dựa vào thuật toán của bên A, mà không dùng đến bất kì key nào. Do đó, độ an toàn của thuật toán sẽ chỉ dựa vào độ bí mật của thuật toán, vì chỉ cần ta biết được thuật toán mã hóa, ta sẽ có thể giải mã được thông tin.
![](https://images.viblo.asia/0d9be7dd-2cb3-4c62-9e97-000b92e76625.jpg)

# 2. Mã hóa một chiều
Đôi khi ta chỉ cần mã hóa thông tin chứ không cần giải mã thông tin, khi đó ta sẽ dùng đến phương pháp mã hóa một chiều (Chỉ có thể mã hóa chứ không thể giải mã). Thông thường phương pháp mã hóa một chiều sử dụng một hàm băm (hash function) để biến một chuỗi thông tin thành một chuỗi hash có độ dài nhất định. Ta không có bất kì cách nào để khôi phục (hay giải mã) chuỗi hash về lại chuỗi thông tin ban đầu.

> Hàm băm (Hash function) là một hàm mà nó nhận vào một chuỗi có độ dài bất kì, và sinh ra một chuỗi kết quả có độ dài cố định (Gọi là chuỗi hash), dù hai chuỗi dữ liệu đầu vào, được cho qua hàm băm thì cũng sinh ra hai chuỗi hash kết quả khác nhau rất nhiều. Ví dụ như đối với kiểu dữ liệu Hash-table, ta có thể coi đây là một dạng kiểu dữ liệu mảng đặc biệt mà index nó nhận vào là một chuỗi, nó được định nghĩa bằng cách bên trong nó chứa một mảng thông thường, mỗi khi truyền vào index là một chuỗi, thì chuỗi này sẽ đi qua hàm băm và ra một giá trị hash, giá trị này sẽ tương ứng với index thật của phần tử đó trong mảng bên dưới.

Đặc điểm của hash function là khi thực hiên băm hai chuỗi dữ liệu như nhau, dù trong hoàn cảnh nào thì nó cũng cùng cho ra một chuỗi hash duy nhất có độ dài nhất định và thường nhỏ hơn rất nhiều so với chuỗi gốc, và hai chuỗi thông tin bất kì dù khác nhau rất ít cũng sẽ cho ra chuỗi hash khác nhau rất nhiều. Do đó hash function thường được sử dụng để kiểm tra tính toàn vẹn của dữ liệu. 

Ngoài ra có một ứng dụng mà có thể bạn thường thấy, đó là để lưu giữ mật khẩu. Vì mật khẩu là một thứ cực kì quan trọng, do đó ta không nên lưu mật khẩu của người dùng dưới dạng rõ, vì như vậy nếu bị hacker tấn công, lấy được CSDL thì hacker có thể biết được mật khẩu của người dùng. Do đó, mật khẩu của người dùng nên được lưu dưới dạng chuỗi hash, và đối với server thì chuỗi hash đó chỉnh là “mật khẩu” đăng nhập (lúc đăng nhập thì mật khẩu mà người dùng nhập cũng được mã hóa thành chuỗi hash và so sánh với chuỗi hash trong CSDL của server). Dù hacker có lấy được CSDL thì cũng không tài nào có thể giải mã được chuỗi hash để tìm ra mật khẩu của người dùng.

Thuật toán mã hóa một chiều (hàm băm) mà ta thường gặp nhất là MD5 và SHA.
![](https://images.viblo.asia/b0f0ea48-4c3d-4d74-b078-c83020e9e742.png)

# 3. Mã hóa đối xứng
Mã hóa đối xứng (Hay còn gọi là mã hóa khóa bí mật) là phương pháp mã hóa mà key mã hóa và key giải mã là như nhau (Sử dụng cùng một secret key để mã hóa và giải mã). Đây là phương pháp thông dụng nhất hiện nay dùng để mã hóa dữ liệu truyền nhận giữa hai bên. Vì chỉ cần có secret key là có thể giải mã được, nên bên gửi và bên nhận cần làm một cách nào đó để cùng thống nhất về secret key.

Để thực hiện mã hóa thông tin giữa hai bên thì:

> Đầu tiên bên gửi và bên nhận bằng cách nào đó sẽ phải thóa thuận secret key (khóa bí mật) được dùng để mã hóa và giải mã. Vì chỉ cần biết được secret key này thì bên thứ ba có thể giải mã được thông tin, nên thông tin này cần được bí mật truyền đi (bảo vệ theo một cách nào đó).

> Sau đó bên gửi sẽ dùng một thuật toán mã hóa với secret key tương ứng để mã hóa dữ liệu sắp được truyền đi. Khi bên nhận nhận được sẽ dùng chính secret key đó để giải mã dữ liệu.
Vấn đề lớn nhất của phương pháp mã hóa đối xứng là làm sao để “thỏa thuận” secret key giữa bên gửi và bên nhận, vì nếu truyền secret key từ bên gửi sang bên nhận mà không dùng một phương pháp bảo vệ nào thì bên thứ ba cũng có thể dễ dàng lấy được secret key này.

Các thuật toán mã hóa đối xứng thường gặp: DES, AES…
![](https://images.viblo.asia/53960f76-4932-4add-b0d5-86f4c63968a1.png)

# 4. Mã hóa bất đối xứng
Mã hóa bất đối xứng (Hay còn gọi là mã hóa khóa công khai) là phương pháp mã hóa mà key mã hóa (lúc này gọi là public key – khóa công khai) và key giải mã (lúc này gọi là private key – khóa bí mật) khác nhau. Nghĩa là key ta sử dụng để mã hóa dữ liệu sẽ khác với key ta dùng để giải mã dữ liệu. Tất cả mọi người đều có thể biết được public key (kể cả hacker), và có thể dùng public key này để mã hóa thông tin. Nhưng chỉ có người nhận mới nắm giữ private key, nên chỉ có người nhận mới có thể giải mã được thông tin.

Để thực hiện mã hóa bất đối xứng thì:

* Bên nhận sẽ tạo ra một gặp khóa (public key và private key). Bên nhận sẽ dữ lại private key và truyền cho bên gửi public key. Vì public key này là công khai nên có thể truyền tự do mà không cần bảo mật.
* Bên gửi trước khi gửi dữ liệu sẽ mã hóa dữ liệu bằng thuật toán mã hóa bất đối xứng với key là public key từ bên nhận.
* Bên nhận sẽ giải mã dữ liệu nhận được bằng thuật toán được sử dụng ở bên gửi, với key giải mã là private key.

Điểm yếu lớn nhất của mã hóa bất đối xứng là tốc độ mã hóa và giải mã rất chậm so với mã hóa đối xứng, nếu dùng mã hóa bất đối xứng để mã hóa dữ liệu truyền – nhận giữa hai bên thì sẽ tốn rất nhiều chi phí.

Do đó, ứng dụng chỉnh của mã hóa bất đối xứng là dùng để bảo mật secret key cho mã hóa đối xứng: Ta sẽ dùng phương pháp mã hóa bất đối xứng để truyền secret key của bên gửi cho bên nhận. Và hai bên sẽ dùng secret key này để trao đổi thông tin bằng phương pháp mã hóa đối xứng.

Thuật toán mã hóa bất đối xứng thường thấy: RSA.
![](https://images.viblo.asia/4fbac312-eac2-41d1-b69f-edc86759df69.png)

# Lời kết
Tôi hy vọng bài viết cung cấp cho các bạn những thông tin hữu ích và tổng quan về các hệ mật mã - một ngành khoa học cực kỳ lý thú.

Nguồn: Tổng hợp từ Internet