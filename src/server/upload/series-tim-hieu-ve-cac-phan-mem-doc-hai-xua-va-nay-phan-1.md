Hưởng ứng sự kiện `MayFest2022` của `Viblo` thì mình cũng muốn làm một series dài dài về các phần mềm độc hại để mọi người có thể dễ follow và tìm đọc. 

Thử thách 6 ngày 6 đêm viết 2 bài `Viblo`, Gét Go!!.
# I. Giới thiệu
![](https://images.viblo.asia/b34e368d-1260-4f68-8a51-d892488efe57.jpg)


Trước năm 2005, hầu hết phần mềm độc hại được các hacker sử dung nhằm mục đích thể hiện trình độ với nhau hoặc chỉ để mua vui và lấy danh tiếng.  Các phần mềm độc hại đôi khi được thiết kế cho mục đích thử nghiệm và được sử dụng để chứng minh một số khả năng có thể xảy ra. Ví dụ như cách một phần mềm độc hại có thể lây lan nhanh như thế nào.

Kể từ năm 2005, phần mềm độc hại đã bị các hacker lợi dụng để xâm nhập vào các máy tính và mạng với mục đích thực hiện các hoạt động nhằm trục lợi tài chính và thậm chí cả chính trị. Ngoài ra các máy tính nạn nhân còn có thể trở thành vũ khí để các phần mềm độc phát tán rộng hơn gây thiệt hại vô cùng lớn. Theo sự phát triển của công nghệ, các phần mềm độc hại ngày càng có xu hướng phức tạp về mặt kỹ thuật, tính khó phát hiện, gỡ bỏ và sử dụng các công nghệ mới nhất để tối đa hóa khả năng phá hoại của chúng.

# II. Phân loại
Các loại phần mềm độc hại phổ biến ngày ngay đối với máy tính của bạn có thể kể đến như:

   - Backdoors

   - Logic bombs

   - Trojan horses

   - Viruses

   - Worms
   
   - Rootkit

   - Botnets
   
   - Keyloggers
   
   - Ransomware
   
   - Phần mềm gián điệp Spyware
   
   - Phần mềm quảng cáo hay phần mềm hỗ trợ quảng cáo
   
   - Browser Hijacker

Ta sẽ đi tìm hiểu lần lượt các loại phần mềm độc hại, cách phát hiện cũng như cánh xử lí khi máy bị dính một trong các phần mềm này.

## 1. Backdoors
![](https://images.viblo.asia/effe3f56-0d02-44db-9a59-79f90037a2df.jpg)

Giống như trong thực tế, Backdoor là những cánh cửa ẩn khác so với những cánh cửa chính, khi sử dụng backdoor người ta có thể ra vào một cách bí mật hơn. Trong một hệ thống máy tính, `Backdoor` là một phương pháp vượt qua thủ tục chứng thực người dùng thông thường từ phía backend, hoặc để giữ đường truy nhập từ xa tới một máy tính, trong khi cố gắng không bị phát hiện bởi việc giám sát thông thường. Backdoor có thể là một cổng được tạo ra chủ động từ người giám sát mà không được thông báo rộng rãi, cho phép người quản trị login vào hệ thống để tìm nguyên nhân gây lỗi hoặc bảo dưỡng. Trên thực tế, Backdoor được sử dụng nhiều hơn cho một số hoạt động bất hợp pháp, bao gồm: 
- Trộm cắp dữ liệu Hủy hoại website 
- Chiếm quyền điều khiển máy chủ (hijacking) 
- Việc phát động các cuộc tấn công DDoS 
- Các cuộc tấn công Advanced persistent threat (APT) 

Backdoor thường được cài đặt bằng cách tận dụng lỗ hổng bảo mật hoặc thành phần dễ bị tấn công trong ứng dụng web. Sau khi cài đặt, việc phát hiện rất khó khăn vì các file có xu hướng bị xáo trộn cao.
## 2. Logic bombs
![](https://images.viblo.asia/1f863de3-c5af-4928-b1cd-c90edbfeaba1.jpg)

Logic bombs là một đoạn mã độc được chèn vào hệ điều hành hoặc ứng dụng phần mềm để thực hiện một chức năng độc hại sau một thời hạn nhất định hoặc các điều kiện cụ thể được đáp ứng.
Dù bằng cách nào đi nữa, khi đạt được các điều kiện mong muốn, hệ thống logic của chương trình sẽ ra lệnh cho logic bomb phát nổ và gây ra thiệt hại.

Các đặc điểm của logic bomb là:

- Nó nằm im trong một khoảng thời gian cụ thể: Giống như một quả bom hẹn giờ, logic bomb sẽ không phát nổ ngay lập tức. Đó là lý do tại sao những người tấn công trong một hệ thống thường sử dụng logic bomb – để họ có thể che dấu vết của mình. Logic bomb rất tinh vi và có thể không bị phát hiện trong nhiều năm.
- Payload của logic bomb không được biết cho đến khi nó kích hoạt: Payload là thành phần của malware thực hiện hoạt động độc hại. Về cơ bản, nó là loại thiệt hại mà malware được mã hóa để gây ra. Payload có thể dẫn đến bất cứ điều gì từ việc phát tán email rác thông qua một hệ thống bị nhiễm hoặc đánh cắp dữ liệu có giá trị.
- Nó được kích hoạt bởi một điều kiện nhất định: Ngòi nổ của logic bomb là điều kiện cần phải đáp ứng. Chính tính năng này cho phép các logic code bomb không bị phát hiện trong thời gian dài. Nguyên nhân có thể là việc một nhân viên bị xóa tên khỏi bảng lương của công ty hoặc ngày diễn ra một sự kiện quan trọng. Logic bomb được kích hoạt theo ngày tháng hoặc thời gian cụ thể còn được gọi là bom hẹn giờ.

Logic bombs thường được sử dụng với virus, sâu và trojan để định thời gian cho chúng gây sát thương tối đa trước khi bị chú ý. Chúng thực hiện các hành động như làm hỏng hoặc thay đổi dữ liệu, định dạng lại ổ cứng và xóa các tệp quan trọng.

## 3. Virus
![](https://images.viblo.asia/87d07263-3835-49c6-b9b7-0c07c5714418.png)

 Virus lây nhiễm vào một chương trình bằng cách sửa đổi mã chương trình để khi một chương trình chạy, mã virus cũng chạy theo. Loại mã độc này vô cùng nguy hiểm vì có khả năng sinh sôi, lây lan ra khắp hệ thống phần mềm, gây thiệt hại phần cứng,… với tốc độ rất nhanh. Nếu không khắc phục kịp thời, mọi thông tin, dữ liệu, thậm chí là thiết bị đều sẽ mất kiểm soát.

Có 4 giai đoạn chính trong "vòng đời" của 1 virus malware:

- Giai đoạn đầu tiên là giai đoạn không hoạt động. Trong giai đoạn này,  virus đã lây nhiễm vào hệ thống máy chủ, nhưng vẫn không hoạt động.
- Giai đoạn thứ hai là giai đoạn lan truyền. Virus bắt đầu nhân lên và lây lan. Khả năng tự sao chép là yếu tố phân biệt virus với các loại phần mềm độc hại khác. Trong giai đoạn lây lan, virus sẽ tạo ra các bản sao của mã độc hại của chúng, chúng sẽ lưu trữ trên các phần khác của ổ đĩa máy tính bị nhiễm hoặc nó có thể tự gửi đến các máy chủ khác - ví dụ: bằng cách đính kèm email.
- Giai đoạn kích hoạt,  virus được kích hoạt để thực thi. Ví dụ người dùng nhấp vào tệp đính kèm email có chứa virus để kích hoạt.
- Giai đoạn cuối cùng là giai đoạn thực hiện. Trong giai đoạn này,  virus thực sự thực hiện công việc độc hại của nó. Ví dụ như xóa tất cả các tệp trên đĩa.

### Cấu trúc Virus
![](https://images.viblo.asia/3beec6af-09ad-43da-a866-c8303ab88016.png)

Virus lây nhiễm vào chương trình bằng cách sửa đổi mã chương trình. Để đạt được điều này, mã virus phải được chèn vật lý vào tệp chương trình. Khi một chương trình bị nhiễm chạy, mã virus sẽ chạy trước, sau đó virus sẽ kích hoạt chạy chương trình gốc để người dùng không nghi ngờ rằng chương trình đã bị nhiễm. Cuối cùng, virus chạy lại để thực hiện một số dọn dẹp nhằm tránh bị phát hiện. 

Phân tích chi tiết:
- Dòng đầu tiên của chương trình bị nhiễm phải đảm bảo rằng virus chạy ngay lập tức. Điều này có thể đạt được với một lệnh gọi main chức năng của virus. Mã virus cũng phải đặt một điểm đánh dấu trên chương trình bị nhiễm để cho biết rằng chương trình đã bị nhiễm. Nếu không có cờ này, một chương trình có thể bị nhiễm nhiều lần.

- Khi virus thực thi, đầu tiên nó sẽ tìm thấy các chương trình khác để lây nhiễm. Nó sẽ quét các ứng dụng khác trên hệ thống và lây nhiễm những ứng dụng không được gắn cờ. Ngoài việc lây nhiễm các chương trình khác, virus có thể thực hiện các hoạt động độc hại khác trên hệ thống.

- Virus sẽ chuyển quyền điều khiển sang chương trình gốc để có thể thực hiện công việc bình thường. Điều này giúp ngăn người dùng phát hiện ra sự lây nhiễm.

- Virus có thể thực hiện chạy lại để dọn dẹp nhằm tránh bị phát hiện. Ví dụ, khi một virus được chèn vào một tệp chương trình, kích thước của tệp đó sẽ tăng lên. Sự gia tăng này có thể là một dấu hiệu cho thấy một chương trình đã bị lây nhiễm. Do đó, mã virus có thể nén chương trình bị nhiễm để kích thước tệp không thay đổi.

### Các loại virus
- Parasitic virus (virus ký sinh) sẽ quét các chương trình không chạy trên hệ thống (ví dụ những chương trình nằm trên ổ cứng) và sau đó lây nhiễm các chương trình đó.

- Memory-resident virus (virus nằm trong bộ nhớ) thường là một phần của hệ điều hành. Khi hệ điều hành chạy, virus được tải vào bộ nhớ và có thể lây nhiễm bất kỳ chương trình nào đang chạy trên hệ thống.

- Macro Virus là một loại virus được nhúng trong tài liệu. virus chạy khi tài liệu được mở.

- Boot Sector Virus nằm trong khu vực khởi động của ổ cứng và thực thi bất cứ khi nào hệ thống được khởi động.

- A polymorphic virus (virus đa hình) có khả năng biến đổi với mỗi lần lây nhiễm. Điều này đạt được bằng cách mã hóa một phần mã virus bằng một khóa được tạo ngẫu nhiên trong mỗi lần lây nhiễm. Mục đích của việc sử dụng virus đa hình là để tránh bị phát hiện bởi các hệ thống chống virus dựa vào ký hiệu của virus . Bất kỳ loại virus nào trong số các loại virus liệt kê ở trên đều có thể thuộc loại đa hình.


#### Boot Sector Virus

Để hiểu được Boot Sector Virus, chúng ta cần hiểu cách thức hoạt động của boot sector:
![](https://images.viblo.asia/39be2791-a9b5-4ba6-8c84-16c80fcd1ad6.png)

Boot sector là một khu vực đặc biệt trên ổ cứng của hệ thống. Khi một hệ thống được khởi động, mã trong boot sector (được gọi là bộ tải bootstrap) luôn chạy đầu tiên. Bộ tải bootstrap thường chịu trách nhiệm tải hệ điều hành.

Khi Boot Sector Virus được kích hoạt lây nhiễm vào hệ thống, mã virus sẽ được chèn vào boot sector. Điều này đảm bảo rằng virus luôn được thực thi đầu tiên trong quá trình khởi động hệ thống.

Trong quá trình khởi động hệ thống, virus thực hiện các chức năng độc hại của nó, chẳng hạn như lây nhiễm sang các chương trình khác, lây lan sang các hệ thống khác hoặc phá hủy các tài liệu hữu ích.

Sau khi virus thực thi, nó chuyển quyền kiểm soát đến bộ tải bootstrap ban đầu để tạo ra vẻ ngoài rằng hệ thống đang hoạt động bình thường:
![](https://images.viblo.asia/b2112e7e-3ac7-40dc-9707-bd82cd173f42.png)


#### Virus macro
 Virus macro là một loại virus được viết bằng ngôn ngữ macro: ngôn ngữ lập trình được nhúng bên trong một ứng dụng phần mềm (ví dụ: bộ xử lý văn bản và ứng dụng bảng tính). Một số ứng dụng, chẳng hạn như Microsoft Office, Excel, PowerPoint cho phép các chương trình macro được nhúng vào tài liệu để macro được chạy tự động khi tài liệu được mở và điều này cung cấp một cơ chế riêng biệt, từ đó máy tính độc hại có thể lây lan. Đây là một lý do có thể nguy hiểm khi mở tệp đính kèm bất ngờ trong e-mail. Nhiều chương trình chống vi-rút có thể phát hiện virus macro; tuy nhiên, hành vi của virus macro vẫn có thể khó phát hiện.

Khi tệp có chứa virus macro được mở, virus có thể lây nhiễm vào hệ thống. Khi được kích hoạt, nó sẽ bắt đầu nhúng chính nó vào các tài liệu và mẫu khác. Nó có thể làm hỏng các phần khác của hệ thống, tùy thuộc vào tài nguyên nào mà macro trong ứng dụng này có thể truy cập. Khi các tài liệu bị nhiễm được chia sẻ với người dùng và hệ thống khác, virus sẽ lây lan. Virus macro đã được sử dụng như một phương pháp cài đặt phần mềm trên hệ thống mà không có sự đồng ý của người dùng, vì chúng có thể được sử dụng để tải xuống và cài đặt phần mềm từ internet thông qua việc sử dụng phím bấm tự động. Tuy nhiên, điều này không phổ biến vì nó thường không hiệu quả đối với bộ mã hóa virus vì phần mềm được cài đặt thường được người dùng chú ý và gỡ cài đặt.

## 4. Trojan Horses
![](https://images.viblo.asia/7fbe6dce-e352-4ab5-8b45-ef514bf7a5f8.png)

`Trojan Horses` lấy tên từ một câu chuyện Hy Lạp cổ đại: Chiến tranh thành Troy. Trong phiên bản kinh điển, sau cuộc vây hãm kéo dài 10 năm không có kết quả, người Hy Lạp đã chế tạo một con ngựa gỗ khổng lồ và giấu một lực lượng chiến binh vào bên trong nó. Người Hy Lạp đem tặng cho quân thành Troy như là 1 món quà thể hiện sự hòa bình và giả vờ rút quân, quân thành Troy sau đó đã kéo ngựa vào thành phố của họ như một chiến tích chiến thắng. Đêm đó, lực lượng Hy Lạp trong con ngựa chui ra và mở cổng cho quân Hy Lạp tiến vào phá hủy thành Troy.

Câu chuyện trên kia giúp ta hiểu được nguyên lí hoạt động của mã độc này. Trong bối cảnh của phần mềm độc hại, một `Trojan Horses` là một đoạn mã độc hại được nhúng trong một chương trình tiện ích mà người dùng hay sử dụng. Khi chương trình tiện ích chạy sẽ kích hoạt trojan. Trojan không tự tái tạo, không cấy vào một tập tin như virus, thay vào đó được cài đặt vào hệ thống bằng cách giả làm một phần mềm hợp lệ và vô hại sau đó cho phép hacker điều khiển máy tính từ xa. 

Ngày nay `Trojan Horses` thường được các hacker xây dựng như một chương trình phần mềm của chính chủ, hợp pháp và uy tín. Được quảng cáo và sở hữu chức năng bảo vệ, giúp máy tính tránh khỏi sự xâm nhập, tấn công của Virus. Thực chất Trojan giống như một cánh cổng mở ra và cho phép hàng triệu loại Virus khác nhau tiến công, gây hại cho máy tính. Sau đó, trojan sẽ biến máy tính thành một phần của botnet (botnet là một loạt các máy tính kết nối qua Internet bị lợi dụng để gửi thư rác hoặc tấn công từ chối dịch vụ làm sập các website). Mặc dù Trojan không có chức năng sao chép dữ liệu những lại có khả năng “hủy diệt” rất kinh khủng.

## 5. Worm
![](https://images.viblo.asia/81ded564-2fb2-45e1-b0cf-d7e6b97f2da0.jpg)

Worm hay sâu máy tính là một loại phần mềm độc hại có khả năng tự nhân bản trên chính nó mà không cần cấy vào một tập tin lưu trữ. Worm thường dựa vào các lỗi bảo mật và lỗ hổng trong các giao thức mạng để lan truyền giữa các máy tính. Nó sử dụng một máy làm máy chủ để quét và lây nhiễm cho các máy khác. Sau khi một con Worm máy tính bắt đầu xâm nhập vào một hệ thống máy tính, nó thường cố gắng tồn tại hoạt động trên hệ thống càng lâu càng tốt. Lúc này nó sẽ tự động sao chép và lây lan sang nhiều hệ thống nhất có thể. Worm lây lan chủ yếu là do các lỗ hổng bảo mật của hệ thống. Vì vậy, để phòng ngừa, bạn cần cài đặt các bản cập nhật an ninh mới nhất cho hệ điều hành của máy tính.

Worm, Virus và Trojan có khá là nhiều điểm tương đồng, và nhiều người dễ nhầm lẫn khi phân biệt 3 loại trên. Vậy nên mình đã làm 1 bảng tóm gọn lại khái niệm cũng như sự khác biệt giữa 3 loại trên để bạn đọc dễ hình dung:

![](https://images.viblo.asia/545e46ec-693e-4a27-878c-d7d9e44532c6.png)


# III. Tạm kết
Bài viết `tìm hiểu về các phần mềm độc hại xưa và nay phần 1` của mình kết thúc tại đây. Trong phần tới mình sẽ đi tìm hiểu về các phần mềm còn lại như `botnets`, `rootkit` hay `ransomware` (ransomware đang xuất hiện ngày một nhiều hơn trong những năm gần đây) cũng như một số cách để phát hiện máy bị nhiễm.