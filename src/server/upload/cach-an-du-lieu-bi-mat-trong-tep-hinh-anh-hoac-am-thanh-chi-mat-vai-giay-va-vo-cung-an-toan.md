## Mở đầu
- Steganography là một nghệ thuật che giấu thông tin trong mắt người bình thường. Ở đây, mình sẽ hướng dẫn chỉ cho bạn cách sử dụng Steghide - một công cụ terminal rất đơn giản được sử dụng để làm việc đó. Mình sẽ giải thích về khái niệm để bạn hiểu về những gì đang xảy ra ở trong tập tin. Đây là một công cụ đơn giản, có thể cấu hình và chỉ mât vài giây để ẩn thông tin trong nhiều loại tệp khác nhau.
## Khái niệm
- Không giống như mã hóa, để ẩn một tin nhắn, steganography nhúng dữ liệu trong một khung hình, trong một tệp hình ảnh. Đối với những người xem ảnh bình thường, họ sẽ k biết rằng bức ảnh đấy đang chứa dữ liệu được ẩn ở trong đó. Bức ảnh đó trông giống như những bức ảnh bình thường khác, rất khó có thể phát hiện ra có điều gì đang ẩn sau nó :D
- Thực chất Steganography đã được con người biết tới từ rất lâu rồi. Năm 440 trước công nguyên, người Herodotus (Người Hy Lạp xa xưa) đã cạo trọc đầu các nô lệ tin cậy rồi xăm lên đó các thông điệp và chờ tóc mọc lại. Mục đích của việc này là nhằm gửi tin đi trong cuộc chiến tranh giữa người Herodotus và Persians (Người Ba Tư).
- Trong các cuộc chiến tranh thế giới, Steganography cũng được sử dụng. Người Đức đã sử dụng mực không màu để viết các dấu chấm nhỏ lên phía trên và dưới các chữ cái bằng cách thay đổi chiều cao các chữ trong đoạn văn bản. Trong chiến tranh thế giới thứ nhất, các tù nhân cũng sử dụng mã Morse để gửi thư về nhà bằng cách viết các dấu chấm và gạch ngang lên các chữ cái i,j,t,f.
- Mục đích cuối cùng của Steganography là ẩn thông tin bí mật trong các dữ liệu vô hại để đối phương không biết đến sự hiện diện của chúng. 
## Steganography được thực hiện như thế nào
- Có một số kỹ thuật để ẩn dữ liệu trong các tệp bình thường. Một trong những phương pháp được sử dụng rộng rãi nhất và có lẽ dễ hiểu nhất là kỹ thuật LSB (Least Significant Bit) - kỹ thuật giấu tin vào bit có trọng số thấp nhất.
- Kỹ thuật này thay đổi các bit cuối cùng của một byte để mã hóa một thông điệp mình cần giấu vào tệp đó. Ví dụ trong một hình ảnh, hình ảnh thì được tạo nên bởi cái pixel có các giá trị đỏ, lục, lam biểu thị bằng 8 bit (1 byte) trong khoảng từ `0 - 255` theo số thập phân hoặc `00000000` đến `11111111` ở dạng nhị phân.
- Thay đổi hai bit cuối cùng của pixel màu đỏ hoàn toàn từ `11111111` thành `11111101` chỉ thay đổi giá trị màu đỏ từ `255` thành `253`, không tạo ra sự thay đổi đáng chú ý bằng mắt thường nhưng vẫn cho phép dữ liệu được mã hóa vào trong hình ảnh.!

![](https://images.viblo.asia/36702e35-3cc1-4778-b243-51210889539c.jpg)

- Biểu đồ này hiển thị hai hình ảnh 4 pixel ở giá trị màu và ở dưới dạng nhị phân. Mỗi khối nhị phân đại diện cho giá trị của pixel tương ứng.
- Kỹ thuật LSB quan trọng nhất hoạt động tốt cho các media trong đó các giá trị bit thay đổi một chút cũng chỉ thay đổi 1 chút chất lượng, bình thường sẽ không phát hiện ra. Nhưng không tốt đối với các văn bản ASCII khi thay đổi bit sẽ làm thay đổi chữ hay dữ liệu sẽ chuyển thành hình vuông, dễ bị phát hiện.
## Sử dụng Steganography hiệu quả
- Ở đây mình sẽ giới thiệu đến một phần mềm sử dụng trên Linux có tên là `steghide`. Việc sử dụng nó rất dễ dàng. Để cài đặt nó chúng ta sử dụng lệnh
    ```base
    apt-get install steghide
    ```
### Nhúng tin
- Sau khi cài đặt, lệnh ghi để nhúng dữ liệu muốn ẩn vào 1 tệp tin:

    ```bash
    steghide embed -ef secretFile -cf coverFile -sf outputFile -z comprêssionLevel -e schema
    ```

- **ember**: Bật option ember
- **-ef**: chỉ định đường dẫn của tệp hay dữ liệu mà bạn muốn ẩn.
- **-cf**: là tệp chứa dữ liệu được nhúng. Giới hạn bởi các tệp BMP, JPEG, WAV và AU.
- **-sf**: là một đối số tùy chọn chỉ định tệp output. Nếu không được chỉ định, tệp được nhúng sẽ bị ghi đè bởi tệp đã được nhúng của bạn
- **-z**: chỉ định mức nén trong khoảng từ `1-9`. Nếu bạn không muốn nén tệp của mình, thay vào đó bạn hãy sử dụng **-Z**
- **-e**: chỉ ra loại mã hóa. Steghide hỗ trợ một loạt các hệ thống mã hóa. Nếu đối số này được bỏ qua theo mặc định thì `steghide` sẽ sử dụng `AES-128`. Nếu bạn không muốn sử dụng mã hóa, chỉ cần gõ **-e no**.

- Trong ví dụ của mình, mình ẩn thông tin bí mật trên hình ảnh của một con mèo. Mình không ghi đè vào ảnh gốc và không nén, và không sử dụng mã hóa.
    ```bash
    steghide embed -ef secret.txt -cf StegoCat.jpg -e none -Z
    ```
- Sau khi chạy lệnh Steghide, bạn được nhắc đặt mật khẩu để sử dụng trích xuất dữ liệu nhúng sau này. Nhập mật khẩu vào và bạn đã xong rồi đấy. Chỉ mất vài giây để ẩn dữ liệu của bạn ở trong tệp hình ảnh hoặc âm thanh với **Steghide**.

![](https://images.viblo.asia/c5f67b86-dc1a-49a2-81d3-7b445cfad9ab.jpg)

- Bên trái là bức ảnh chưa được nhúng tin, còn bên phải là ảnh đã được nhúng. Bạn có thấy sự khác nhau nào giữa 2 bức ảnh này không. Nếu thấy có chỗ nào bất thường thì nhắn cho mình biết nhé :D
### Trích xuất dữ liệu ẩn
- Trích xuất dữ liệu ẩn từ một hình ảnh Steganogaphic thậm chí còn dễ dàng hơn cả ẩn tin :D. Sử dụng cú pháp sau
    ```
    steghide extract -sf stegoCat.jpg -xf extractSecret.txt
    ```
- Khi bạn chạy lệnh này, bạn sẽ được nhắc nhập mật khẩu mà bạn đã tạo ở trên để trích xuất tập tin ẩn. Sử dụng lệnh `cat` hoặc bất cứ lệnh gì bạn biết để đọc nội dung file `extractSecret.txt`.

 ![](https://images.viblo.asia/2cc1fcd0-c4c5-4baa-8e71-a8e220baa6a9.png)
 
 ## Ẩn dữ liệu trong hình ảnh quá dễ dàng
 - Ưu điểm của Steganography là bạn có thể ẩn dữ liệu khá dễ dàng, không làm thay đổi nhiều chất lượng hình ảnh hoặc âm thanh. Sử dụng `steghide` cũng rất đơn giản và nhanh chóng. Cảm ơn bạn đã đọc và nếu có câu hỏi nào cho mình, hãy comment bên dưới nhé. :thankyou: