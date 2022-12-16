Bài này là tiếp nối phần còn dang dở của [phần 2](https://viblo.asia/p/thuc-te-tang-cuong-duoc-hien-thi-nhu-the-nao-phan-2-yMnKMd1z57P) nên mình không giới thiệu thêm nữa mà đi vào vấn đề chính luôn :D

### 3. Focus

Mắt chúng ta và máy ảnh thực tế có một kích thước khẩu độ nhất định và do đó phải đối phó với những vấn đề hạn chế độ sâu trường ảnh: **Chỉ có một phạm vi nhất định của các đối tượng sẽ được tập trung, và tất cả mọi thứ bên ngoài phạm vi này sẽ bị mờ**. Tất nhiên, mắt của chúng ta có thể chứa (tập trung) ở các khoảng cách khác nhau

Xung đột giữa **accommodation** và **vergence** xảy ra trong VR cũng như trong AR, miễn là màn hình lập thể với một mặt phẳng tiêu cự cố định được sử dụng. Tuy nhiên, đối với AR nhìn xuyên qua quang học với kết xuất lập thể như vậy, có một vấn đề liên quan khác: Không chỉ xem các phần tăng ảo sẽ bị xung đột ở chỗ ở, mà người dùng sẽ xem thế giới thực với các dấu hiệu chính xác, trong khi đó để xem các chú thích ảo trong tiêu cự, người dùng sẽ cần điều chỉnh cho mặt phẳng hình ảnh hiển thị. Do đó, để đọc nhãn văn bản gần như được định vị trên mặt phẳng phía trước của mặt tiền tòa nhà, người dùng phải chuyển trọng tâm qua lại giữa mặt phẳng mặt tiền tòa nhà và mặt phẳng hình ảnh hiển thị. Nhìn vào mặt phẳng mặt tiền, người dùng có thể thấy các chi tiết kiến trúc được lấy nét, nhưng lời giải thích bằng văn bản sẽ bị mờ, và ngược lại. Bất kỳ đồng vị trí của các đối tượng ảo và thực sẽ bị ảnh hưởng từ vấn đề này, trừ độ sâu của các đối tượng sẽ xảy ra là tại mặt phẳng hình ảnh hiển thị. Mức độ nghiêm trọng của vấn đề này vẫn chưa được đánh giá một cách thấu đáo. Nó vẫn gây ra khó chịu khi sử dụng một thời gian dài sử dụng.

Một giải pháp cho vấn đề này có thể là màn hình có thể dịch chuyển mặt phẳng tiêu điểm trong thời gian thực. Với công nghệ như vậy, người ta sẽ cần theo dõi bằng mắt để xác định các đối tượng mà người dùng đang tập trung vào và sau đó điều chỉnh dịch chuyển mặt phẳng tiêu điểm theo sự chú ý của người dùng.

Multifocus displays [Schowengerdt và Seibel 2012](https://www.me.washington.edu/facultyfinder/eric-seibel) đưa ra một khả năng khác để tránh xung đột vergence.

### 4.Occlusion

Sự tách biệt giữa các đối tượng ảo và thực là một gợi ý quan trọng để truyền tải cấu trúc cảnh. Mặc dù sự kết hợp chính xác giữa các đối tượng thực được đưa ra một cách tự nhiên, và sự kết hợp chính xác giữa các đối tượng ảo có thể dễ dàng đạt được bằng bộ đệm z, để đạt được sự kết hợp chính xác của ảo trước thực hoặc ngược lại, cần phải xem xét đặc biệt. Bằng cách sử dụng bộ đệm z, một hệ thống xem qua video có thể xác định liệu đối tượng ảo hay thực ở phía trước, nếu có biểu diễn hình học của cảnh thực. Trong các hệ thống nhìn xuyên qua quang học, nơi các phần tăng thường xuất hiện dưới dạng các lớp phủ bán trong suốt, sẽ khó khăn hơn để làm cho các vật thể ảo xuất hiện như thể chúng thực sự ở phía trước các vật thể thật. Có ba lựa chọn thay thế:

 - Các đối tượng ảo có thể được hiển thị rất sáng so với cường độ mà các đối tượng thực được nhìn thấy, do đó các đối tượng ảo sẽ chiếm ưu thế. Tuy nhiên, điều này có thể ảnh hưởng xấu đến nhận thức về các phần còn lại của cảnh thực.
 - Trong một môi trường được kiểm soát, phần có liên quan của cảnh thực có thể được chiếu sáng bằng máy chiếu điều khiển bằng máy tính, trong khi phần còn lại của cảnh (cụ thể là các vật thật bị các vật ảo che khuất) vẫn ở trong bóng tối và do đó, không thể nhận ra. Trong các vùng tối này, các đối tượng ảo có thể được hiển thị và xuất hiện để che giấu những vật thật.

![](https://images.viblo.asia/f6a9357f-3696-4ffe-9484-cbc4162e5202.png)

- Một màn hình trong suốt quang học có thể được tăng cường với màn hình tinh thể lỏng, cho phép chọn lọc làm cho các pixel riêng lẻ trong suốt hoặc mờ

Dự án **ELMO HMD** đã đi tiên phong trong phương pháp này

![](https://images.viblo.asia/91cf9824-73f9-4441-9c6a-9ec7c51b956a.png)

### 5.Resolution and Refresh Rate

Độ phân giải của màn hình có tác động ngay lập tức đến độ trung thực của hình ảnh thu được. Nhìn chung, độ phân giải bị hạn chế bởi loại màn hình và hệ thống quang học. Nếu sử dụng giải pháp xem qua video, độ phân giải của thế giới thực bị hạn chế thêm bởi độ phân giải của máy ảnh. Thông thường, màn hình do máy tính tạo ra sẽ không thể khớp với độ phân giải tối đa mà con người cảm nhận trực tiếp thế giới thực. Tuy nhiên, độ phân giải đủ là mong muốn để triệt tiêu các tạo tác gây nhiễu của hình ảnh do máy tính tạo ra nổi bật so với nhận thức của người dùng về thế giới thực.

![](https://images.viblo.asia/029f7819-61f2-4657-9f38-00eaee0f9906.png)

### 6.Field of View

Field of View (**FOV**) thậm chí còn quan trọng hơn **raw resolution**. FOV và độ phân giải có liên quan với nhau, vì cần nhiều pixel hơn ở cùng mật độ để lấp đầy một FOV rộng hơn. FOV rộng hơn có nghĩa là nhiều thông tin hơn có thể được hiển thị cho người dùng trong một chế độ xem. Trong AR, được phân biệt giữa **overlay** FOV và **peripheral** FOV. Trong lớp phủ FOV, đồ họa do máy tính tạo ra được phủ lên hình ảnh của thế giới thực. Ngược lại, peripheral FOV bao gồm phần tự nhiên, không tăng cường của môi trường quan sát. Nếu ảnh tổng thể trong hình dưới đây có FOV 62 ° theo đường chéo, overlay FOV được đánh dấu là khoảng 30 ° theo đường chéo. Một FOV tương đối hẹp như vậy có nghĩa là người dùng thường sẽ phải đặt một khoảng cách giữa họ và các vật thể ảo hoặc thực để nhìn thấy chúng đầy đủ, hoặc di chuyển đầu của họ trong một chuyển động quét để xem toàn bộ cảnh theo thời gian. Các giới hạn FOV là phổ biến trong VR và đặc biệt là màn hình AR.

![](https://images.viblo.asia/99bc1856-d23e-4f9c-8223-22ac15f6828e.png)

Trong AR xem qua video, nó thực sự là FOV của máy ảnh chứ không phải là FOV của màn hình xác định lượng thông tin trong thế giới thực có thể được trình bày. Máy ảnh thường có FOV lớn hơn màn hình, do đó hình ảnh camera thực sự bị nén, tương tự như hiệu ứng mắt cá. Ví dụ, khi sử dụng điện thoại thông minh làm ống kính **ma thuật AR cầm tay** :v, máy ảnh ở mặt sau của điện thoại thông minh có thể có FOV lớn hơn góc phụ của màn hình.

### 7.Viewpoint Offset
Màn hình nhìn xuyên qua hợp nhất các đường dẫn quang của ảo và thực thành một, do đó, hình ảnh thu được được căn chỉnh theo thiết kế. Kết quả này là mong muốn, vì nó tương ứng với xem tự nhiên. Tuy nhiên, nó yêu cầu hiệu chuẩn của máy ảnh ảo, được sử dụng để tạo ra phần ảo của màn hình AR, đến mắt người dùng. Nếu việc hiệu chuẩn không được thực hiện cẩn thận, phần bù giữa các phần hình ảnh sẽ là kết quả. Với màn hình xem qua video, khung máy ảnh có thể được sử dụng để đăng ký dựa trên thị giác máy tính dẫn đến chú thích chính xác pixel.

![](https://images.viblo.asia/fd9e3ff2-7d55-46c5-94ce-c67597ef3ad2.png)

Các cấu hình xem qua video thường sẽ xuất hiện một độ lệch đáng kể giữa hướng xem của camera và hướng xem của màn hình mà hình ảnh camera được hiển thị. Phần bù này có thể phản ánh các hạn chế trong đó máy ảnh có thể được gắn (ví dụ: trên HMD) hoặc có thể được thiết kế trong thiết kế không gian làm việc AR. Ví dụ: bàn làm việc có thể hiển thị hình ảnh tăng cường từ camera trên cao hướng xuống trên bề mặt thẳng đứng trước mặt người dùng, để không gian nơi người dùng nhìn thấy bàn tay thật  và chế độ xem tăng cường

![](https://images.viblo.asia/c31afe17-6a4b-4797-b21c-141a8f955e94.png)

![](https://images.viblo.asia/97f43494-6529-4b27-93b2-6ce98a59cf0b.png)

### 8.Brightness and Contrast
Để đạt được đủ độ tương phản trong màn hình nhìn xuyên qua nói chung là khó khăn. Đặc biệt, trong các tình huống ngoài trời hoặc trong các tình huống có nhiều ánh sáng tự nhiên, hầu hết các màn hình máy tính không đủ sáng để đạt được độ tương phản. Một biện pháp lảng tránh phổ biến là giảm lượng ánh sáng vật lý ảnh hưởng đến tình huống xem, ví dụ, bằng cách sử dụng rèm cửa sổ để kiểm soát ảnh hưởng ánh sáng bên ngoài vào chiếu trong không gian hoặc bằng cách điều khiển một tấm che có thể điều chỉnh trên HMD.

![](https://images.viblo.asia/65552824-b311-4c9a-8666-803fbb510a44.png)

Trong **VST**, không cần quan sát trực tiếp môi trường, do đó lượng ánh sáng tự nhiên trong môi trường quan sát có thể được kiểm soát dễ dàng hơn. Thật không may, độ tương phản kém đạt được của các máy quay video thông thường trở nên rõ ràng hơn. Ngoài ra, VST HMD thường chỉ bao gồm một phần nhất định trong trường nhìn của người dùng và ánh sáng tự nhiên có thể đi vào từ ngoại vi. Ngoài ra, VST phụ thuộc rất nhiều vào các linh kiện điện tử hoạt động. Nếu máy ảnh hoặc màn hình không kết nối thành công, sẽ không có hình ảnh có ý nghĩa nào được hiển thị cả

![](https://images.viblo.asia/762bd49b-1f1d-4f94-b03e-98d31cfe2094.png)

### 9.Distortions and Aberrations
Mỗi màn hình cụ thể, có thể là OST hoặc VST, sẽ liên quan đến các yếu tố quang học, chẳng hạn như ống kính. Các yếu tố quang học này có thể đưa ra các biến dạng, chẳng hạn như hiệu ứng mắt cá - đặc biệt, nếu muốn có một trường nhìn rộng hơn.

### 10.Latency
Lỗi tạm thời có thể có tác động bất lợi tương tự như lỗi không gian. Giống như hiệu chuẩn không gian không đủ có thể dẫn đến độ lệch giữa ảo và thực trong ảnh, do đó, không đủ sự liên kết theo thời gian giữa ảo và thực có thể tạo ra các độ lệch không gian. Nếu các yếu tố ảo trong màn hình AR được hiển thị quá muộn, có lẽ do việc tạo đồ họa mất quá nhiều thời gian để kết thúc, người dùng có thể đã di chuyển trong thời gian đó. Do đó, các yếu tố ảo sẽ được hiển thị ở phần sai của hình ảnh.

Độ trễ ảnh hưởng đến cả OST và VST, vì các phần ảo có thể bị lỗi thời trong cả hai trường hợp. Một lợi thế tiềm năng của VST so với OST là tùy chọn trì hoãn video để nó phù hợp với các yếu tố ảo. Màn hình AR kết quả sẽ không bị sai lệch về không gian

Latency đã được chứng minh là góp phần vào sự khởi đầu của tình trạng không gian mạng trong các kịch bản xem VR và AR. Thật khó để đưa ra con số tuyệt đối, bởi vì dữ liệu từ các nghiên cứu khác nhau rất cụ thể, nhưng các ngưỡng đã được nghiên cứu sâu hơn nằm ở đâu đó trong khoảng từ 20 đến 300 ms.