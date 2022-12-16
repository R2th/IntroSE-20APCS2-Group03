**Field Testing – ứng dụng di động**:

Thông thường trong khi thử nghiệm ứng dụng di động của chúng tôi, một câu hỏi đặt ra cho chúng tôi là ‘liệu thử nghiệm tự động hóa, hồi quy, tải, thử nghiệm dịch vụ web có đủ cho ứng dụng của chúng tôi hay chúng tôi nên thử nghiệm gì nữa không?

Trong hướng dẫn này, tôi sẽ cung cấp một cái nhìn sâu sắc về thử nghiệm thực địa, tầm quan trọng, chiến lược của nó và giải thích khi nào nên thực hiện.

Vâng, nó có thể là đủ hoặc có thể không phải vì tất cả các thử nghiệm này như tự động hóa, dịch vụ web, tải, v.v., đều thuộc danh mục thử nghiệm ‘In-House’. Nhưng nếu bạn muốn thực hiện vai trò người dùng cuối, vẫn còn một loại thử nghiệm nữa cần được thực hiện và đó không phải là gì ngoài ‘Field Testing’.

Như chính tên gọi của nó, nó liên quan đến việc đi ra khỏi vùng Wifi mạnh của bạn và sử dụng mạng 2G hoặc 3G hoặc 4G của bạn để kiểm tra khả năng sử dụng ứng dụng của bạn. 
Bạn có thể thử sử dụng ứng dụng trong khi lái xe hoặc đi dạo hoặc ngồi tại nhà tùy theo sự thoải mái của bạn.

*Để biết thông tin cơ bản về thử nghiệm ứng dụng Di động, bạn có thể tham khảo các hướng dẫn sau*.

    * Hướng dẫn cho người mới bắt đầu thử nghiệm ứng dụng di động
    * 5 thách thức và giải pháp thử nghiệm di động
    * Tại sao kiểm tra di động là khó khăn?
    
   **Phân loại thử nghiệm ứng dụng di động**
Nếu bạn đang kiểm tra một ứng dụng web trên điện thoại di động, các loại thử nghiệm vẫn giống như bạn làm cho máy tính xách tay hoặc máy tính của bạn như chức năng, giao diện người dùng, ranh giới, tải, v.v. được phân loại thành hai loại ở cấp độ ban đầu.

Họ đang:
In-House Testing
Field Testing
Cơ sở cho sự khác biệt giữa hai danh mục này là vai trò mà bạn đang mạo danh, tức là bạn đang thử nghiệm dưới dạng QA để xác minh ứng dụng theo yêu cầu hay bạn đang sử dụng ứng dụng làm người dùng cuối để đáp ứng nhu cầu của bạn?

**Tầm quan trọng của thử nghiệm lĩnh vực iOS và Android**

Như đã giải thích ở trên, Kiểm tra thực địa được thực hiện để xác minh hành vi hoặc khả năng sử dụng của ứng dụng của bạn với tư cách là người dùng cuối. Điều này về cơ bản được thực hiện trên mạng điện thoại di động của bạn bằng cách đi bộ trên đường phố hoặc chợ, bằng cách lái xe hoặc chỉ ở nhà bạn.
Trong thế giới ngày nay, chúng ta sử dụng các ứng dụng di động của mình ở mọi nơi, mọi lúc, ở nhà để mua sắm / đặt vé / kiểm tra email, v.v. hoặc đứng trong chợ tìm kiếm các địa điểm / nhà hàng / trung tâm gần đó hoặc lái xe đến một địa điểm bằng cách tìm kiếm bản đồ.

Các ứng dụng di động giờ đã trở thành một phần trong cuộc sống hàng ngày của chúng ta.
Sau đây là một số ví dụ giải thích nhu cầu thử nghiệm ứng dụng di động của bạn in-field và không chỉ in-house: 
* Không nhất thiết là mỗi khi bạn sẽ có một Wifi hoặc điểm phát sóng mạnh xung quanh, đặc biệt là ở Ấn Độ. Do đó, bạn phải dựa vào mạng điện thoại di động của bạn.
* Có những nơi chúng tôi phải đối mặt với các vấn đề bảo hiểm và phạm vi điện thoại sẽ ở mức trung bình hoặc thấp. Điều này có thể là do các tháp di động ít hơn hoặc phủ dày đặc cây cối. Ở chỗ của tôi, tôi phải đối mặt với vấn đề này rất nhiều trong phòng vẽ và phòng ăn của tôi, thứ luôn làm tôi nản lòng.
* Có thể bạn đang lái xe và bạn cần truy cập email của mình hoặc tìm đường đến một nơi không xác định.
* Khi chúng tôi đi nghỉ, chúng tôi không có (mọi thông tin) về thành phố hoặc địa điểm. Khi tôi đi du lịch cùng gia đình vào kỳ nghỉ, chúng tôi luôn tự đi và sử dụng các ứng dụng để tìm hiểu về thành phố, có thể là nhà hàng, địa điểm tham quan, v.v.
* Ngày nay, chúng tôi thích chuyển khoản trực tuyến bằng cách sử dụng các ứng dụng như PayTm, PayZApp, v.v., thay vì sử dụng tiền mặt luôn.
* Sử dụng ứng dụng trò chuyện, YouTube, v.v., ở bất cứ đâu.

Đây là một số ví dụ thời gian thực xác định việc sử dụng các ứng dụng di động. Do đó, nó trở nên quan trọng để kiểm tra ứng dụng của bạn trong lĩnh vực này. Có thể khán giả mục tiêu của bạn đang ở một quốc gia phát triển tốt có các điểm nóng hoặc Wifi có sẵn ở mọi nơi.

*Tuy nhiên, bạn vẫn nên thực hiện ít nhất một thử nghiệm hiện trường cho ứng dụng của mình vì*:
1) Khi bạn kiểm tra ứng dụng của mình trong khi lái xe hoặc đi bộ hoặc ngồi ở một nơi có phạm vi ít hơn, bạn sẽ biết liệu ứng dụng của bạn có gặp sự cố nào trong khi gửi hoặc tìm nạp dữ liệu hay không.Chúng tôi đã tự đăng nhập ứng dụng bị lỗi trong lần phát hành đầu tiên của ứng dụng, chúng tôi đã thử nghiệm trên điện thoại có 3G. Tuy nhiên, đăng nhập đã hết thời gian và bị lỗi.

2) Người dùng ghét nó khi thấy biểu tượng tải xuất hiện trong hơn 5 phút. Điều rất quan trọng là xác minh thời gian phản hồi của máy chủ, dịch vụ web và ứng dụng của bạn để tải thông tin.
Đây là hai con trỏ quan trọng được xác minh trong một bài kiểm tra thực địa và điều này cũng giúp bạn yên tâm rằng ứng dụng của bạn thực sự ổn định.

**Kiểm tra thực địa bị ảnh hưởng như thế nào?**

Là thử nghiệm lĩnh vực của tôi bị ảnh hưởng bởi cách lai hoặc bản địa?

Trước khi trả lời câu hỏi này, trước tiên tôi xin cung cấp cho bạn một lời giải thích cơ bản về ứng dụng Lai và Bản địa.

Ứng dụng lai:
Về cơ bản, đây là các ứng dụng web được đóng gói trong trình bao bọc riêng và chủ yếu được sử dụng để phát triển các ứng dụng đa nền tảng (để giữ các cơ sở mã giống nhau cho Android và iOS). Chúng trông giống như các ứng dụng gốc nhưng trên thực tế, thông tin được tải khi người dùng điều hướng qua các trang.

Ứng dụng gốc:
Chúng được phát triển riêng cho HĐH sử dụng các tính năng của HĐH tốt nhất. Tất cả thông tin được tải trong một lần khi ứng dụng được khởi động.
Tôi đã làm việc trên cả thử nghiệm ứng dụng Hybrid và Native và với tư cách là QA, thử nghiệm cho cả hai đều quan trọng đối với ứng dụng của tôi. Có một sự khác biệt giữa ứng dụng Kết hợp và Ứng dụng gốc, không giống như các ứng dụng Bản địa, các ứng dụng Kết hợp không trực tiếp sử dụng các tính năng của điện thoại của bạn như GPS, Vị trí, v.v. Các ứng dụng lai sử dụng các tính năng của Điện thoại hoặc OS.

Tôi cảm thấy mạnh mẽ rằng đối với mọi bản phát hành chính cho ứng dụng Bản địa, nên thực hiện kiểm tra thực địa bởi vì nó sử dụng các tính năng của điện thoại và các ứng dụng OS.

Thực hiện kiểm tra Trường sẽ cho biết hiệu suất của ứng dụng của bạn tương tự. Nó sẽ cho biết điện thoại là loại cao cấp hay cấp thấp, hiệu năng, tính ổn định và khả năng sử dụng ứng dụng của bạn như thế nào.

Một lý do khác để thực hiện kiểm tra Field cho mỗi bản phát hành chính là các ứng dụng gốc cần được cập nhật với các phiên bản mới của HĐH. Do đó, so với các ứng dụng Hybrid, các phiên bản của Bản gốc nhiều hơn hoặc nếu một phiên bản HĐH mới được ra mắt, cần phải thực hiện kiểm tra thực địa ngay cả khi không có thay đổi nào được thực hiện trong các tính năng của ứng dụng.

**Chiến lược Field Test**
*Chiến lược của tôi cho Field Test là gì?*

Đối với thử nghiệm hiện trường, bước chính và quan trọng cần được hiểu là tác động của mạng hoặc dữ liệu đối với các chức năng chính của ứng dụng của bạn. Do đó có một cuộc thảo luận kỹ lưỡng với nhóm phát triển về các chức năng.

*Sau đây là các gợi ý để quyết định chiến lược thử nghiệm hiện trường*:

1) Bước cơ bản dưới dạng QA là gắn thẻ các trường hợp thử nghiệm của bạn với Test Field Test, và tạo một bộ cho cùng. Thảo luận với nhóm BA và QA của bạn về Suite và xem họ có gì để thêm vào không.

2) Tùy thuộc vào mục đích của ứng dụng của bạn và người dùng, hãy tạo một số trường hợp thử nghiệm riêng biệt về cách thức, thời gian và nơi ứng dụng của bạn có thể được sử dụng. Bạn có thể không cần phải thực hiện những điều này để thử nghiệm nội bộ.

3) Chỉ đi kiểm tra thực địa khi ứng dụng vượt qua bài kiểm tra hồi quy và khi không có vấn đề chức năng nào mở.
4) Đối với bản phát hành đầu tiên, hãy tạo một tài liệu (biểu đồ) với tất cả các chi tiết về các trường hợp thử nghiệm, người thực hiện, một khu vực nơi nó được thử nghiệm và các lỗi được báo cáo. Sau khi tạo, bạn có thể sử dụng điều này cho các bản phát hành trong tương lai.

5) Sử dụng Thiết bị cấp cao và Thiết bị cấp thấp để kiểm tra thực địa và cố gắng giữ cùng một hệ điều hành, điều này sẽ giúp phân tích các lỗi được tìm thấy. Đôi khi chúng tôi thấy các lỗi trong thử nghiệm thực địa nhưng không phải trong thử nghiệm nội bộ.

6) Tạo một nhóm 4-5 người và yêu cầu họ thực hiện bài kiểm tra thực địa ở các khu vực khác nhau và chắc chắn hãy thử sử dụng ứng dụng trong khi lái xe và một nơi có phạm vi dữ liệu thấp. Bạn cũng có thể có người quản lý, BA tham gia kiểm tra thực địa.

7) Gắn thẻ các lỗi được tìm thấy bằng một thẻ như ‘Field Testiêng, bạn sẽ dễ dàng tham khảo các bản phát hành trong tương lai.

8) Nếu ứng dụng của bạn đang gửi định vị địa lý, hãy kiểm tra kỹ chức năng và tôi sẽ đề nghị thực hiện tất cả các trường hợp kiểm tra liên quan đến cùng.

Không cần thiết là bạn sẽ tìm thấy lỗi hoặc lỗi và thử nghiệm có thể chạy trơn tru. Theo kinh nghiệm của tôi, hãy tập trung vào hiệu suất và thời gian cần thiết để phản hồi. Như đã đề cập trước đó, màn hình ‘Đang tải sẽ không khuyến khích mọi người sử dụng ứng dụng của bạn.

Nếu ứng dụng của bạn là một ứng dụng thương mại như Zomato, Jabong, BookMyShow v.v.

Refer: https://www.softwaretestinghelp.com/mobile-app-field-testing/