**Cũng giống như các bài toán Deep Learning khác, việc đầu tiên chúng ta cần làm là xử lý dữ liệu. Vậy với dữ liệu audio, các bước tiền xử lý sẽ như thế nào? Trong bài viết này, mình sẽ trình bày chi tiết về vấn đề này.**

## Sử dụng các thư viện âm thanh trong python để lấy đặc trưng 
###  Thư viện python hỗ trợ xử lý âm thanh 
Một số thư viện python hỗ trợ xử lý âm thanh như librosa, scipy, torchaudio. Tất cả đều cho phép bạn đọc các tệp âm thanh ở các định dạng khác nhau. 
* Bước đầu tiên là tải tệp lên:
![](https://images.viblo.asia/ff314773-fc49-4e68-8386-dfc3c059013f.png)
* Bạn có thể biểu diễn sóng âm thanh như sau:
![fffffff.png](https://images.viblo.asia/54e3aacd-fa4c-4ec2-9437-9e0a846ad8b4.png)
### Dữ liệu tín hiệu âm thanh (Audio Signal Data)
Khi âm thanh được lưu trong một tệp, nó sẽ ở định dạng nén. Khi tệp được tải, nó sẽ được giải nén và chuyển đổi thành một mảng Numpy.
![](https://images.viblo.asia/40573e40-d795-4601-ac93-220dfca1471c.png)<br>
Mỗi phần tử trong mảng này đại diện cho biên độ của sóng âm thanh ở 1/sample_rate khoảng thời gian của giây.<br>
* Ví dụ với file âm thanh ở trên dài 278.521s với sample rate là 16000hz thì số lượng samples của file sẽ là ***278.52 * 16000=4456336***<br>

* Biên độ của tần số ở giây thứ 1 là:
![](https://images.viblo.asia/11c8f679-e7c7-424d-8c98-ecbed26c4768.png)

* Bây giờ, chúng ta tiếp tục nhóm âm thanh lấy mẫu thành các đoạn dài 20 mili giây. 
![aaaaaaâ.png](https://images.viblo.asia/4b4e64bf-06af-46b6-a429-2958d93d606b.png)<br>
* Biểu diễn dưới dạng biểu đồ đường cho khoảng thời gian 20ms này:
![rrrrrrrrrr.png](https://images.viblo.asia/1428971d-c6c6-4a5c-951b-59783e5ca6f6.png)
Chúng ta có thể thấy đoạn ghi âm này chỉ dài 1/50 giây. Nhưng ngay cả đoạn ghi âm ngắn này cũng là một bản trộn lẫn phức tạp của các tần số âm thanh khác nhau. Có một số âm thanh trầm, một số âm thanh tầm trung và thậm chí một số âm thanh cường độ cao. Nhưng khi những tần số khác nhau này kết hợp với nhau lại tạo nên âm thanh phức tạp của giọng nói của con người.
* Để làm cho dữ liệu này dễ dàng hơn cho mạng nơ-ron xử lý, chúng ta sẽ tách sóng âm thanh phức tạp này thành các phần thành phần của nó. Vậy thì tách như thế nào ??? <br>
Thử hình dung theo ví dụ này, mọi người sẽ thấy dễ hiểu hơn. Trong âm nhạc, ta thường có các hợp âm. Giả sử bạn đánh hợp âm C Major trên đàn piano.  m thanh này là sự kết hợp của 3 nốt nhạc C, E và G. Chúng ta cần tách âm thanh phức tạp này thành các nốt riêng lẻ để biết rằng chúng là C, E và G. Đây chính là ý tưởng phân tích âm thanh thành các thành phần của nó.<br>
Chúng ta thực hiện việc phân tích này dựa vào **biến đổi Fourier**.

## Biến đổi Fourier
Theo wikipedia, tính chất của biến đổi Fourier:
![dddddđdddd.png](https://images.viblo.asia/3b2124d0-fcaf-482e-a53d-a49e2bd780cf.png)<br>
Với phép biến đổi Fourier, chúng ta chuyển đổi một tín hiệu từ ***miền thời gian sang miền tần số***. Biến đổi Fourier không chỉ cung cấp các tần số có trong tín hiệu mà còn cung cấp độ lớn của mỗi tần số có trong tín hiệu.
![aaaaaaaaaaa.png](https://images.viblo.asia/63fc8cdf-a0e6-4e07-a388-24b85ea98d89.png)<br>
![qqqqqqqq.gif](https://images.viblo.asia/6342bc32-1488-4645-9fd0-835ef4f755fc.gif)<br>
Tuy nhiên, hạn chế của biểu diễn miền tần số là không có thông tin về thời gian. 
## Spectrogram
Trong phần trước, chúng ta đã chia tín hiệu thành các giá trị tần số của nó, chúng sẽ đóng vai trò là features cho mạng nơ ron nhận dạng giọng nói. Nhưng khi áp dụng FFT cho tín hiệu của mình, nó chỉ cung cấp các giá trị tần số và chúng ta bị mất dấu thông tin thời gian. Do đó, chúng ta cần tìm một cách khác để tính toán các features sao cho các giá trị tần số và thời gian đều được quan sát. Spectrogram có thể giải quyết được vấn đề này.<br>
***Biểu diễn trực quan các tần số của một tín hiệu nhất định với thời gian được gọi là Spectrogram.*** <br>
Trong biểu đồ biểu diễn Spectrogram - một trục biểu thị thời gian, trục thứ hai biểu thị tần số và màu sắc biểu thị độ lớn (biên độ) của tần số quan sát tại một thời điểm cụ thể. Màu sắc tươi sáng thể hiện tần số mạnh. Các tần số nhỏ hơn từ (0–1kHz) là mạnh (sáng). (Các tần số mạnh chỉ nằm trong khoảng từ 0 đến 1kHz vì đoạn âm thanh này là lời nói của con người. )
![lllllllll.png](https://images.viblo.asia/d77e0949-41ce-42b9-a89f-24c9320fbd6f.png)
### Tạo Spectrogram
* Ý tưởng chính là chia tín hiệu âm thanh thành các khung nhỏ hơn (cửa sổ) và tính toán DFT (hoặc FFT) cho mỗi cửa sổ đó. Bằng cách này, chúng tôi sẽ nhận được tần số cho mỗi cửa sổ và số cửa sổ sẽ đại diện cho thời gian. Để không làm mất một vài tần số khi lấy các cửa sổ một cách liên tục, chúng ta thường giữ cho các cửa sổ này chồng lên nhau (overlap). Đối với tác vụ nhận dạng giọng nói thông thường, bạn nên sử dụng cửa sổ dài từ 20 đến 30 ms. Một con người không thể nói nhiều hơn một âm vị trong khoảng thời gian này. 
![o.png](https://images.viblo.asia/b64c9f64-ea61-4a22-a2f3-e9cb8cda788e.png)
* Đầu ra của thuật toán DFT (hoặc FFT) là 1 mảng các số đại diện cho các biên độ của các tần số khác nhau trong cửa sổ. Ma trận 2D thu được là biểu đồ Spectrogram.

* Thử biểu diễn Spectrograms bằng code:
![iiiiiii.png](https://images.viblo.asia/b531c307-f89c-4760-b234-7bec65750bc8.png)
Nhìn vào biểu đồ trên, chúng ta không thể thấy rõ được các thông tin về tần số, biên độ mà Spectrogram thể hiện. Điều này được giải thích là do khả năng nhận thức âm thanh của con người. Hầu hết những âm thanh mà chúng ta nghe được đều tập trung xung quanh một dải tần số và biên độ khá hẹp. Vì vậy, trong nhiều bài toán (đặc biệt là nhận dạng giọng nói), Spectrogram không phải là sự lựa chọn hoàn hảo. Vì vậy ta cần thêm vài bước tính nữa để thu được dạng MFCC hoặc Mel Spectrogram, tốt hơn, phổ biến hơn, hiệu quả hơn Spectrogram. 
## Mel Spectrogram
### Mel Scale
* Các nghiên cứu đã chỉ ra rằng con người không cảm nhận được tần số trên thang đo tuyến tính. Con người có thể dễ dàng phân biệt được âm thanh với tần số thấp hơn tần số cao. hầu hết con người có thể dễ dàng nhận ra sự khác biệt giữa âm thanh 100 Hz và 200 Hz nhưng lại khó nhận ra sự khác biệt giữa 2000 và 2100 Hz, mặc dù khoảng cách giữa hai bộ âm thanh là như nhau. Đây là cách con người cảm nhận các tần số. Đây là điều khiến Mel Scale trở thành nền tảng cơ bản trong các ứng dụng Máy học đối với âm thanh, vì nó bắt chước nhận thức của con người về âm thanh. 
* Sự chuyển đổi từ thang đo Hertz sang thang đo Mel như sau:
![sssssssssss.png](https://images.viblo.asia/22767c45-1e3c-4456-a340-ef226fa62bb4.png)
### Decibel Scale
* Trong thang đo này, 0 dB là hoàn toàn im lặng. Từ đó, các đơn vị đo lường tăng lên theo cấp số nhân. 10 dB lớn hơn 10 lần so với 0 dB, 20 dB lớn hơn 100 lần và 30 dB lớn hơn 1000 lần. Trên thang đo này, âm thanh trên 100 dB bắt đầu trở nên lớn đến mức không thể chịu nổi.

![mmmmmmmmm.png](https://images.viblo.asia/323da317-3424-45dd-bd2a-9a844aa16cff.png)
* Để xử lý âm thanh một cách chân thực, cách xử lý của Mel Spectrogram như sau:
1. Tần số (trục y) được thay thế bằng giá trị Logarithmic của nó, gọi là Mel Scale.
2. Biên độ được thay thế bằng giá trị Logarithmic của nó, gọi là Decibel Scale để chỉ ra màu sắc.
* Chúng ta thử vẽ lại Spectrogram ở trên, thay thế tần số bằng Mel Scale:
![p.png](https://images.viblo.asia/17c30bec-437b-42f9-980b-e9ce6c035009.png)
* Biểu đồ này biểu diễn tốt hơn Spectrograms, nhưng phần lớn vẫn còn tối và không mang đủ thông tin hữu ích. Thử sửa đổi nó để sử dụng Decibel Scale thay vì Biên độ.
![rrrrrrrrrrrr.png](https://images.viblo.asia/8b5e5614-f2b5-4e59-9002-28e506085cdd.png)<br>
Đến đây thì thông tin của Audio đã được thể hiện rất rõ ràng trên hình ảnh của Mel Spectrogram. 

Ngoài Mel Spectrogram, thì đặc trưng ***MFCC*** cũng thường được sử dụng để trích xuất đặc trưng âm thanh. Các bạn có thể tìm hiểu kĩ hơn ở [đây](https://jonathan-hui.medium.com/speech-recognition-feature-extraction-mfcc-plp-5455f5a69dd9).
## Kết luận
Ở bài này, mình đã trình bày về một số đặc trưng âm thanh thường được sử dụng trong bài toán Speech To Text. Bài tiếp theo mình sẽ trình bày về cách tiếp cận các mô hình trong bài toán này. Cảm ơn các bạn đã đón đọc và xem tiếp bài của mình nhé. 👋👋👋
## Tài liệu tham khảo
https://towardsdatascience.com/learning-from-audio-the-mel-scale-mel-spectrograms-and-mel-frequency-cepstral-coefficients-f5752b6324a8<br>
https://towardsdatascience.com/audio-deep-learning-made-simple-part-2-why-mel-spectrograms-perform-better-aad889a93505