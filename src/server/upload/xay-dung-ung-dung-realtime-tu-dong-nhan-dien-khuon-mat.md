### Introduction
    
   Xin chào mọi người, sau những bài viết trước có thiên hướng đi vào lý thuyết, bài viết này của mình sẽ có thiên hướng thực hành nhiều hơn, cụ thể sẽ là bài toán `Face Recognition`. Có lẽ những bài toán liên quan đến face như face detection, face alignment, face recognization không còn quá xa lạ trong giới AI, nhưng đến nay có thể nói nó vẫn còn khá nhiều vấn đề còn tồn tại chưa được giải quyết. Ở bài này mình sẽ xây dựng một cái pipeline và một demo cụ thể cho những ai cũng đang có nhu cầu hoặc hứng thú tìm hiểu bài toán này.
  
### General Pipeline

![](https://images.viblo.asia/286c8179-22fa-47b6-8d91-a422cdc936ee.jpg)
 
*Hình 1. Mô hình tổng quan bài toán Face Recognition*

   Trước khi đi vào chi tiết từng bước 1, mình sẽ nói sơ qua về mô hình tổng quan của bài toán `Face recognition`. Tuỳ theo cách tiếp cận khác nhau nhưng về cơ bản một bài toán face recognition sẽ gồm các bước sau: `Face Detection`, `Face Alignment`, `Face Respresentation`, `Face Recognization`. Đây cũng chính là các bài toán con mà chúng ta cần phải giải quyết, mỗi bài toán con sẽ có cách tiếp cận, cách giải và độ khó khác nhau, vì vậy độ chính xác ở các bài toán(bước) tiếp theo sẽ phụ thuộc rất nhiều vào độ chính xác của các bài toán(bước) trước đó. Hơn nữa, để có thể vừa đạt được độ chính xác cao cũng như vừa chạy được realtime là một điều không phải dễ dàng. Bây giờ, chúng ta sẽ đi vào từng bài toán một.
   
### Face Detection

![](https://images.viblo.asia/5b8641d3-29bd-4a2b-8ae5-b17d15a78372.jpg)

*Hình 2. Ví dụ về face detection*

Các cụ đã có câu: "*Đầu xuôi đuôi lọt*" quả không sai, đây là bước cực kỳ quan trọng để đảm bảo các bước sau của bạn có đạt được độ chính xác hay không. Ở bước này, chúng ta sẽ cần một mô hình có khả năng nhận biết ở đâu trong một bức ảnh có sự xuất hiện của mặt người, mô hình sẽ trả về cho chúng ta các toạ độ (x1, y1, x2, y2) hoặc (x, y, w, h) để hợp thành các ô vuông là các *boundingbox* (ô xanh trên hình là bounding box), các boundingbox này sẽ chứa mặt người bên trong từ đó giúp chúng ta thực hiện crop face, trích xuất ra đặc trưng là mặt của bức ảnh. Ngoài ra, mô hình cũng sẽ trả về cho chúng ta các tham số như: *confidence*(độ tự tin vị trí này có mặt người), và các toạ độ trên khuôn mặt như vị trí của mắt, mũi, cằm, lông mày, miệng,...

  Để giải quyết bài toán này, các bạn có thể dùng các thư viện có sẵn như **MTCNN**, **Dlib**, **Dnn** của **OpenCV**. Hoặc nếu không các bạn có thể tự build cho mình một mô hình CNN và train lại từ đầu, của mình thì mình dựa trên MobileNet SSD thu được kết quả tương đối tốt cả về độ chính xác và thời gian predict của mô hình.

### Face Alignment

   ![](https://images.viblo.asia/45567da1-a015-41c0-8ade-1b8240255619.jpg)

*Hình 3. Một ví dụ về face alignment sử dụng deep neural network*

   Đúng như tên gọi của nó alignment (sự căn chỉnh), sau bước detection các faces của chúng ta có thể ở các trạng thái khác nhau, các góc độ khác nhau, có những faces bị chéo và cũng có thể bị lệch do bước detect chưa chính xác trong việc lấy ra khung hình chuẩn của mặt. Thì việc áp dụng face alignment ở đây là cần thiết, nó có thể hiểu như một hình thức của data normalization, giúp tiêu chuẩn hoá lại dữ liệu trước khi đưa vào mô hình dự đoán identity.
   
   Chúng ta có thể áp dụng face alignments như:
   
   - Sử dụng một pre-defined 3D model, sau đó áp dụng phép đổi trên input image sao cho các điểm toạ độ trên khuôn mặt (mắt, mũi, miệng, mắt, cằm...) ở không gian 2D khớp với các điểm này ở không gian 3D của mô hình..etc.

### Face Representation

![](https://images.viblo.asia/82f580cd-47c5-468f-8699-b6ee3df9deb7.png)

*Hình 4. Mô hình phác hoạ việc biễu diễn face dưới dạng vector*

  Sau khi crop được face từ bước detect, căn chỉnh lại face từ bước alignment, việc tiếp theo chúng ta cần làm là biểu diễn các face này thành các vector đặc trưng trước khi đưa vào mô hình dự đoán indentity. Có thể hiểu đơn giản thế này, để việc recognize đạt được độ chính xác cao chúng ta cần xây dựng được một bộ dataset có tính decriminitive nghĩa là có tính phân biệt giữa các thành phần. Ví dụ: các thành phần biễu diễu Person A với các thành phần biễu diễn Person B nên có sự khác biệt và các thành phần biễu diễn của Person A nên có tính tương đồng với nhau. Để làm được điều này chúng ta cần có một mô hình trích xuất ra các thuộc tính đặc trưng nhất của ảnh, chúng ta có thể tự định nghĩa một model của riêng mình hoặc sử dụng sẵn các pretrained models như faceNet, ArcFace, VggFace,... để trích xuất ra các vector đặc trưng.
  
  Nếu các bạn sử dụng pretrained models, sau khi nhận được các vector đặc trưng, do số lượng chiều đầu ra của các vector đặc trưng từ các models là khác nhau nên nếu vector đặc trưng có số chiều quá lớn có thể ảnh hưởng đến thời gian response ở bước recognize, mình nghĩ ở đây với vector có số chiều quá lớn chúng ta có thể áp dụng các thuật toán Dimensionality Reduction (giảm chiều dữ liệu) để có được vector có số nhiều nhỏ hơn giúp ích cho quá trình recognize ở bước sau.

### Face Recognition

![](https://images.viblo.asia/473d7488-95a1-48e5-9499-e034e899311c.jpg)

*Hình 5. Một ví dụ về Face Recognition*

Đây là bước cuối cùng của bài toán, để recognition chúng ta sẽ có 2 cách tiếp cận bài toán, thứ nhất là chúng ta dùng dataset trích xuất ra từ phase trước đưa vào một mạng CNN training vs labels có sẵn để cho ra một models có khả năng predict, tuy nhiên điểm hạn chế của cách này đó là nếu như bạn muốn models của bạn có khả năng predict được những person mới thì bạn phải định kỳ training lại models của mình. Vì vậy chúng ta sẽ đi theo hướng khác, ở đây cách xử lý của mình là dùng một thuật toán search dựa trên độ similarity giữa các vector đặc trưng kết hợp với công thức tính khoảng cách để cho ra được kết quả. Có thể tưởng tượng như thế này, mỗi nhóm data sẽ biễu diễn một người ở các tư thế, góc mặt khác nhau nên khi ta search với một vector input đầu vào, nó sẽ tìm tương ứng đến các nhóm data đó, nếu người đó chưa tồn tại thì sẽ có một nhóm mới được tạo ra, cơ bản là vậy. (Mình sẽ không chia sẻ cụ thể hơn phần công nghệ này được vì đây là dự án mình làm với khách hàng).

### Integrate into Django 

   Bước này thì mình có làm một demo nhỏ, recognize nearly realtime trên Django, các bạn có thể xem sao nhé. 
   
   {@embed: https://www.youtube.com/watch?v=tvSkDa1lPaQ&feature=youtu.be}
   
  Ở đây mình áp dụng việc online training cho máy học trực tiếp dữ liệu từ mặt mình mà mình không cần phải training lại model, đầu tiên các bạn có thể thấy kết quả trả về là `unknown` và `0%` nhưng sau đó nó đã có khả năng dự đoán ra identity của mình.
  
### Summary

  Trên đây là những gì tổng quan bài toán Face recognition mình muốn chia sẻ, nếu đi chi tiết vào từng bài toán con thì lượng thông tin sẽ là rất lớn vì vậy mình xin phép chia sẻ ở những bài viết sau. Cảm ơn mọi người đã đọc bài, hi vọng một phần nào có ích cho những ai cũng đang tìm hiểu bài toán này, nếu thấy hay đừng tiếc một vote cho team mình. Cảm ơn các bạn.