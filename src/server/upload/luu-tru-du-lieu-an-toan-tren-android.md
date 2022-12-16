Độ tin cậy của ứng dụng ngày nay phụ thuộc rất nhiều vào cách dữ liệu cá nhân của người dùng được quản lý như thế nào.
Android có nhiều API mạnh xung quanh kho lưu trữ quan trọng và trọng điểm, với các tính năng cụ thể chỉ có sẵn trong một số phiên bản nhất định.

Loạt bài ngắn này sẽ bắt đầu với cách tiếp cận đơn giản để bắt đầu và chạy, bằng cách nhìn vào hệ thống lưu trữ, và cách mã hóa và lưu trữ dữ liệu nhạy cảm thông qua mật mã do người dùng cung cấp. 
Trong hướng dẫn thứ hai, chúng ta sẽ xem xét các cách phức tạp hơn để bảo vệ các key và thông tin đăng nhập.

## Cơ bản

Câu hỏi đầu tiên cần suy nghĩ là bạn cần bao nhiêu dữ liệu. Cách tiếp cận tốt là để tránh lưu trữ dữ liệu cá nhân nếu bạn không thực sự phải làm.

Đối với dữ liệu bạn phải lưu trữ, kiến trúc Android đã sẵn sàng để trợ giúp. 
Từ 6.0 Marshmallow, mã hoá toàn bộ đĩa được bật theo mặc định, đối với các thiết bị có khả năng. 
Files and SharedPreferences được lưu bởi ứng dụng được tự động đặt với hằng số MODE_PRIVATE. Điều này có nghĩa là dữ liệu chỉ có thể được truy cập bởi ứng dụng của riêng bạn.

Đó là một ý tưởng tốt để sử dụng mặc định này. Bạn có thể thiết lập nó một cách rõ ràng khi lưu một shared preference.

```
SharedPreferences.Editor editor = getSharedPreferences("preferenceName", MODE_PRIVATE).edit();
editor.putString("key", "value");
editor.commit();
```

Hoặc khi lưu tệp.

```
FileOutputStream fos = openFileOutput(filenameString, Context.MODE_PRIVATE);
fos.write(data);
fos.close();
```

Tránh lưu trữ dữ liệu trên bộ nhớ ngoài, vì dữ liệu sau đó được hiển thị bởi các ứng dụng và người dùng khác. 
Thực tế, để làm cho người khác sao chép dữ liệu nhị phân và dữ liệu ứng dụng của bạn khó hơn, bạn có thể ngăn người dùng không thể cài đặt ứng dụng trên bộ nhớ ngoài. 
Thêm **android: installLocation** với giá trị **internalOnly** trong AndroidManifest sẽ thực hiện điều đó.

Bạn cũng có thể ngăn ứng dụng và dữ liệu của nó không được sao lưu. Điều này cũng ngăn cản việc tải xuống các nội dung trong thư mục dữ liệu cá nhân của ứng dụng, bằng cách sử dụng bản sao lưu adb. 
Để làm như vậy, hãy đặt thuộc tính **android: allowBackup** thành false trong AndroidManifest. Theo mặc định, thuộc tính này được đặt thành true.

Đây là những cách tốt nhất, nhưng chúng sẽ không hoạt động với thiết bị đã bị xâm nhập hoặc rooted và mã hóa đĩa chỉ hữu dụng khi thiết bị được bảo mật với màn hình khóa. 
Đây là nơi có mật khẩu ứng dụng bảo vệ dữ liệu của nó bằng mã hóa có lợi.

## Bảo mật dữ liệu người dùng bằng mật khẩu

[Conceal](https://facebook.github.io/conceal/) là một sự lựa chọn tuyệt vời cho một thư viện mã hóa bởi vì nó sẽ giúp bạn và chạy rất nhanh chóng mà không phải lo lắng về các chi tiết cơ bản. 
Tuy nhiên, một khai thác nhắm mục tiêu cho một khuôn khổ phổ biến sẽ đồng thời ảnh hưởng đến tất cả các ứng dụng phụ thuộc vào nó.

Cũng cần phải hiểu rõ về cách thức các hệ thống mã hoá làm việc để có thể cho biết bạn đang sử dụng một khuôn khổ cụ thể một cách an toàn.

### AES và Mật khẩu dựa trên Derivation

Chúng tôi sẽ sử dụng tiêu chuẩn AES được khuyến cáo, mã hóa dữ liệu được cung cấp bởi một key. 
Khóa tương tự được sử dụng để mã hóa dữ liệu được sử dụng để giải mã dữ liệu, được gọi là mã hóa đối xứng. Có các kích thước khóa khác nhau, và AES256 (256 bit) là chiều dài ưa thích để sử dụng với dữ liệu nhạy cảm.

Mặc dù trải nghiệm người dùng của ứng dụng của bạn nên buộc người dùng sử dụng mật mã mạnh, có một cơ hội rằng cùng một mật mã cũng sẽ được chọn bởi người dùng khác. 
Đưa sự bảo mật của dữ liệu được mật mã của chúng ta vào tay người sử dụng không an toàn. 
Dữ liệu của chúng tôi cần phải được bảo mật thay vào đó bằng một khoá đủ ngẫu nhiên và đủ lớn (tức là có đủ entropy) để được coi là mạnh. 
Đây là lý do tại sao nó không bao giờ được đề nghị sử dụng mật khẩu trực tiếp để mã hóa dữ liệu-đó là nơi mà một chức năng được gọi là Password-Based Key Derivation Chức năng (PBKDF2) đi vào sử dụng.

```
SecureRandom random = new SecureRandom();
byte salt[] = new byte[256];
random.nextBytes(salt);
```

Lớp SecureRandom bảo đảm rằng sản lượng được sinh ra sẽ khó tiên đoán được - nó là một "máy phát số ngẫu nhiên mạnh mẽ mật mã". 
Bây giờ chúng ta có thể đặt salt và mật khẩu vào một đối tượng mã hóa dựa trên mật khẩu: PBEKeySpec. 
Nhà xây dựng của đối tượng cũng có một hình thức đếm lặp, làm cho chìa khóa mạnh mẽ hơn. 

Điều này là do việc tăng số lần lặp sẽ mở rộng thời gian để vận hành trên một tập hợp các phím trong suốt cuộc tấn công. 
Các PBEKeySpec sau đó được thông qua vào SecretKeyFactory, mà cuối cùng tạo ra các phím như là một mảng byte []. 
Chúng ta sẽ bọc mảng byte [] đó vào một đối tượng SecretKeySpec.

```
char[] passwordChar = passwordString.toCharArray(); //Turn password into char[] array
PBEKeySpec pbKeySpec = new PBEKeySpec(passwordChar, salt, 1324, 256); //1324 iterations
SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
byte[] keyBytes = secretKeyFactory.generateSecret(pbKeySpec).getEncoded();
SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
```

Lưu ý rằng mật khẩu được truyền như mảng char [], và lớp PBEKeySpec lưu trữ nó như một mảng char []. mảng char [] thường được sử dụng cho các hàm mã hóa vì trong khi lớp String là bất biến, một mảng char [] chứa thông tin nhạy cảm có thể bị ghi đè - do đó loại bỏ các dữ liệu nhạy cảm hoàn toàn khỏi bộ nhớ của thiết bị.

## Khởi tạo Vectors

Bây giờ chúng ta đã sẵn sàng để mã hóa dữ liệu, nhưng chúng ta còn một việc nữa để làm. 
Có các phương thức mã hóa khác nhau với AES, nhưng chúng tôi sẽ sử dụng một trong số các thuật toán được đề nghị: Ciphering Blocking Cipher (CBC). 
Điều này hoạt động trên dữ liệu của chúng tôi một khối tại một thời điểm. Điều tuyệt vời về chế độ này là mỗi khối dữ liệu không được mã hóa tiếp theo là XOR'd với khối được mã hóa trước đó để làm cho mã hóa mạnh mẽ hơn. 
Tuy nhiên, có nghĩa là khối đầu tiên không bao giờ là duy nhất như tất cả những người khác!

Nếu một tin nhắn được mã hóa bắt đầu giống như một tin nhắn khác sẽ được mã hóa, đầu ra mã hoá sẽ giống nhau, và điều này sẽ cho kẻ tấn công biết được thông điệp có thể là gì. Giải pháp là sử dụng một vector khởi tạo (IV).

Một IV chỉ là một khối các byte ngẫu nhiên sẽ được XOR'd với khối đầu tiên của dữ liệu người dùng. Vì mỗi khối phụ thuộc vào tất cả các khối được xử lý cho đến thời điểm đó, toàn bộ tin nhắn sẽ được mã hoá các tin nhắn duy nhất giống hệt nhau được mã hoá với cùng một khóa sẽ không cho kết quả giống hệt nhau.

```
SecureRandom ivRandom = new SecureRandom(); //not caching previous seeded instance of SecureRandom
byte[] iv = new byte[16];
ivRandom.nextBytes(iv);
IvParameterSpec ivSpec = new IvParameterSpec(iv);
```

Một lưu ý về SecureRandom. Trên các phiên bản 4.3 trở xuống, Kiến trúc mã hoá Java có một lỗ hổng do khởi tạo không đúng máy phát số giả ngẫu nhiên (PRNG). Nếu bạn đang nhắm mục tiêu phiên bản 4.3 trở xuống, hãy chú ý điều này.