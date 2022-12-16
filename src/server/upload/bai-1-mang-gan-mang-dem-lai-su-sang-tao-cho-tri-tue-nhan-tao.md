<div align="center">
<img src="https://www.tec.com.pe/wp-content/uploads/2015/08/galeria_9fnt.jpg">
<em>Tạo ra thứ gì đó từ những thứ không có gì là điều thú vị nhất trong trí tuệ nhân tạo!</em>
</div>

# Giới thiệu
Có lẽ khi nghe đến **trí tuệ nhân tạo**, bạn sẽ liên tưởng đến các bộ phim siêu anh hùng, nơi khả năng kỳ diệu được tạo ra, hay những chú robot có khả năng nghe, nói và thể hiện cảm xúc. Tất cả những điều đó đem lại cho trí tuệ nhân tạo cụm từ mang tên **sự sáng tạo**. Vậy trong thực tế, với các kỹ thuật Deep Learning hiện nay, chúng có thể đem lại sự sáng tạo cho trí tuệ nhân tạo? Điều này đang có những bước tiến ban đầu. Và một trong những kỹ thuật giúp tạo ra sự sáng tạo cho AI đó là mạng **Generative Adversarial Networks** viết tắt là mạng GAN.

Mạng GAN được sử dụng trong việc tạo ra rất nhiều sản phẩm hay, ví dụ việc làm cho máy tính tự động vẽ một bức chân dung, hoặc thậm chí làm cho máy tính có thể tự động sáng tác ra một bản nhạc theo một phong cách nào đó - điều mà bạn nghĩ chỉ có con người mới có thể làm được. So với các cấu trúc của mạng nơ-ron khác, thì mạng GAN có thể làm được điều tưởng chừng như không thể mà các mạng nơ-ron khác không làm được.

Việc xác định một bức tranh có phải theo phong cách của một họa sĩ nào đó dễ dàng hơn nhiều so với việc tự vẽ ra bức tranh đó. Và GAN bước đầu đang đưa ta dần đến giấc mơ trí tuệ nhân tạo.

Và gần đây, có rất nhiều bài báo và sản phẩm được tạo ra từ mạng GAN, ví dụ như ứng dụng trong phát triển trò chơi. Công việc vẽ các nhân vật hoạt hình tốn rất nhiều chi phí của các nhà phát triển, do họ phải thuê họa sĩ vẽ các nhân vật hoạt hình này ở các tư thế khác nhau. Và công việc này là một công việc lặp đi lặp lại. Người ta đã sử dụng tư tưởng của mạng GAN để có thể làm cho máy tính tự động vẽ ra nhân vật hoạt hình một cách tương tự, điều đó làm cho nhà phát triển giảm được chi phí thuê nhân công. Do đó, chúng ta có thể tập trung vào các khía cạnh sáng tạo khác thay vì phải tập trung vào các công việc lặp đi lặp lại.

Là một phần trong series về mạng GAN, bài đầu tiên này sẽ trình bày về GAN là gì, cấu trúc và ý tưởng của mạng GAN, cũng như thuật toán bên trong của cấu trúc mạng kỳ diệu này. Hãy cùng bắt đầu!

# GAN làm gì trong thực tế?
Trọng tâm chính của mạng GAN thường được áp dụng với hình ảnh, tuy nhiên với các miền khác như âm nhạc cũng đã được triển khai trong thực tế. Và thậm chí phạm vi ứng dụng của GAN trong đời sống còn rộng hơn nhiều. Giống như trong ứng dụng dưới đây, mạng GAN có thể giúp bạn tự động tô màu một bản vẽ chẳng hạn:
<div align="center">
<img src="https://phillipi.github.io/pix2pix/images/edges2cats.jpg">
<em>Mạng Pix2Pix sử dụng ý tưởng của GAN giúp tự động tô màu cho một bản vẽ thô!</em>
</div>
<br>

**Vậy cấu trúc thực sự của mạng GAN bao gồm những gì?**

Cấu trúc của mạng GAN bao gồm hai phần:

* **Generator (trình tạo)**
* **Discriminator (trình so sánh)**

Mạng GAN bao gồm hai mạng sâu đó là trình tạo và trình so sánh. Trước tiên, chúng ta sẽ tìm hiểu cấu trúc thứ nhất của mạng GAN: **trình tạo**.
## Trình tạo (Generator)
Bước đầu tiên trong mạng GAN đó là việc chúng ta sẽ thực hiện tạo một hình ảnh giả (một hình ảnh không có thực trong thực tế) hay còn có một tên gọi khác là một hình ảnh nhiễu. Nếu trực quan hóa hình ảnh này ra, thì chúng ta có thể thấy nó không mang ý nghĩa gì đối với con người:
<div align="center">
<img src="http://www.grahamcrackersports.com/wp-content/uploads/2016/04/gray.jpg">
<em>Minh họa cho hnh ảnh được tạo ban đầu của mạng GAN, tuy nhiên trong thực tế thì hình ảnh được tạo ban đầu không hẳn có dạng như hình ảnh minh họa này!</em>
</div>
<br>

Để tạo được hình ảnh ban đầu này, chúng ta sẽ thực hiện theo cách sau: chúng ta tạo ra một vector đặc trưng `z` bằng cách sử dụng phân phối chuẩn hoặc phân phối đồng đều, ... .Với việc đầu vào là một vector đặc trưng `z`, chúng ta sẽ thực hiện sử dụng trình tạo `G` để tạo ra hình ảnh đầu ra `x` giống như hình trên. 
<div align="center">
<img src="https://miro.medium.com/max/1456/1*3vK0FfloSUAHPWPpH3jjOA.jpeg">
<em>Tạo hình ảnh ban đầu cho mạng GAN!</em>
</div>
<br>

Nghe có vẻ hơi khó hiểu?

Chúng ta sẽ đi sâu vào quá trình này, và phân tích từng bước một.

Về mặt khái niệm, vector đặc trưng `z` đại diện cho các đặc trưng ẩn của hình ảnh, ví dụ như: màu sắc, hay hình dạng hình ảnh đầu ra. Nếu bạn nào đã tiếp cận về Computer Vision thì chắc các bạn sẽ biết về vector đặc trưng ẩn. Còn đối với bạn nào chưa tiếp cận về Computer Vision, thì các bạn có thể hiểu đây là quá trình từ các đặc điểm đặc trưng, chúng ta sẽ tái tạo lại hình ảnh gốc chứa các đặc trưng đó. Một lợi ích  lớn của Deep Learning trong thị giác máy tính đó là thay vì việc phải xử lý thủ công để trích xuất các đặc trưng của hình ảnh, thì với DL chúng ta  không cần phải kiểm soát và phân tích thủ công các đặc trưng này. Điều đơn giản là để máy tự động phân tích và học các đặc trưng đó. Do đó, tương tự trong GAN, chúng ta sẽ không kiểm soát bất kỳ giá trị nào của vector đặc trưng. Mà chúng ta sẽ cho máy tự học các đặc trưng này. Và để khám phá các đặc trưng này mang ý nghĩa gì, thì đơn giản là bạn chỉ cần trực quan hóa hình ảnh được tạo từ các đặc trưng đó lên và đưa ra nhận xét.

**Vậy trình tạo G này có đặc điểm gì đặc biệt?**

Sau đây là DCGAN, là một kiến trúc phổ biến cho trình tạo G. Nó thực hiện nhiều lần kỹ thuật **transposed convolutions** để có thể tăng kích thước của vector đặc trưng `z (upsample z)` để tạo ra được hình ảnh `x`. Chúng ta có thể hiểu nó như là một quá trình khôi phục lại hình ảnh từ các vector đăc trưng.  Hay nói một cách khác theo kiểu học máy, đó là bạn cứ hình dung nó giống như là trình phân loại học tập sâu nhưng lại được sử dụng theo hướng ngược lại:
<div align="center">
<img src="https://miro.medium.com/max/2078/1*ULAGAYoGGr5eEB2377ArYA.png">
<em>Cấu trúc phổ biến của trình tạo!</em>
</div>
<br>

Nhưng một vấn đề đặt ra đó là trình tạo generator nếu chỉ đứng một mình thì nó sẽ có khả năng chỉ tạo ra được các vector đặc trưng nhiễu một cách ngẫu nhiên, và do đó các hình ảnh mà trình tạo này tạo ra sẽ chỉ là những hình ảnh đầu ra không có ý nghĩa. Cho nên, về mặt khái niệm, mạng GAN cần phải có thêm một cấu trúc nữa để cung cấp cho trình tạo có thể tạo ra các hình ảnh cần phải tạo.
<div align="center">
<img src="https://miro.medium.com/max/1600/1*8TTaFyyh_WyKWE--H-Pl0A.jpeg">
<em>Cần phải có cấu trúc khác trong mạng GAN để điều hướng trình tạo đến việc tạo ra các hình ảnh mục tiêu!</em>
</div>
<br>

Và cấu trúc này được gọi là **trình so sánh**. Vậy thì cấu trúc và cách làm của trình so sánh như thế nào? Chúng ta hãy cùng tìm hiểu tiếp về cấu trúc này.

## Trình so sánh (Discriminator)

Bằng cách đào tạo song song hình ảnh trong thực tế và hình ảnh được tạo, GAN xây dựng một trình so sánh để điều chỉnh cho trình tạo tạo ra các vector đặc trưng sao cho giống với hình ảnh trong thực tế nhất có thể. Sau đó, trình so sánh sẽ phản hồi về cho trình tạo biết hình ảnh mà trình tạo đã tạo ra đã đáp ứng được yêu cầu là <b>*hình ảnh được tạo đã giống với hình ảnh trong thực tế nhất có thể hay chưa?*</b>
<div align="center">
<img src="https://miro.medium.com/max/1600/1*9qW0I-2M6qKGBwifhnPKPQ.png">
<em>Trình so sánh phản hồi cho trình tạo biết được hình ảnh được tạo bởi trình tọa đã đạt yêu cầu hay chưa?</em>
</div>
<br>

Vậy để làm được điều này, thì trình so sánh được thực hiện như thế nào về mặt kỹ thuật?

Trình so sánh ban đầu sẽ nhìn vào hình ảnh trong thực tế và hình ảnh đầu ra được tạo bởi trình trình tạo. Nó có nhiệm vụ là so sánh hình ảnh thực và hình ảnh được tạo xem có tương đồng nhau hay không? Tức là nó phải phân biệt được xem hình ảnh đầu vào cho trình so sánh là hình ảnh trong thế giới thực hay là hình ảnh được tạo bởi trình tạo. Đẩu ra của trình so sánh là giá trị `D(X)` là xác suất thể hiện cho hình ảnh đầu vào X là hình ảnh thực trong thực tế, tức là `P(class of input = real image)`:
<div align="center">
<img src="https://miro.medium.com/max/1600/1*_uFUaxXIEjCDm_UTzbyleA.png">
<em>Đầu ra của ttrình so sánh đó là đưa ra xác suất D(X) thể hiện cho xác suất để hình ảnh đầu vào X là hình ảnh thực trong thực tế!</em>
</div>
<br>

Chúng ta sẽ đào tạo trình so sánh này như giống như một trình phân loại trong Deep Learning thông thường. Nếu đầu vào là một hình ảnh thực thì chúng ta mong muốn đào tạo sao cho đầu ra `D(X) = 1`. Còn trong trường hợp nó là hình ảnh được tạo ra thì chúng ta sẽ mong muốn đầu ra `D(X) = 0`. Thông qua quá trình đào tạo này, thì trình so sánh có thể xác định được sự đóng góp của các đặc trưng `z` được tạo ra trong hình ảnh X đầu vào có gần giống với hình ảnh trong thế giới thực hay chưa !.

Mặt khác, mục đích chính của chúng ta đó là việc chúng ta mong muốn trình tạo tạo ra hình ảnh sao cho khi truyền hình ảnh được tạo này vào trình so sánh thì đầu ra phải là `D(X) = 1`, tức là chúng ta phải đánh lừa được trình so sánh nhận hình ảnh được tạo thành hình ảnh trong thế giới thực, như thế, chúng ta có thể thấy được trình tạo của chúng ta đã có khả năng tạo ra hình ảnh có sự tương đồng với hình ảnh trong thế giới thực là cao. <b>*Hình ảnh được tạo có khả năng gần giống với hình ảnh trong thế giới thực*</b>

Vì vậy, chúng ta sẽ phải đào tạo trình tạo bằng cách **backpropagation** các giá trị mục tiêu này quay trở lại trình tạo, tức là chúng ta huấn luyện trình trình tạo để tạo ra hình ảnh theo hướng mà trình so sánh nghĩ là hình ảnh được tạo là có khả năng có thật.
<div align="center">
<img src="https://miro.medium.com/max/1600/1*roO-E4KTolB-wttrs-u16g.jpeg">
<em>Đào tạo trình tạo theo hướng mà trình so sánh nghĩ là hình ảnh được tạo là có khả năng có thật!</em>
</div>
<br>

Chúng ta sẽ thực hiện đào tạo hai mạng sâu này (tức là trình tạo và trình so sánh) một cách lần lượt và xen kẽ, và đưa chúng vào một cuộc cạnh tranh "khốc liệt" để có thể cải thiện bản thân, để đến cuối cùng chúng ta sẽ đạt được sao cho trình so sánh sẽ xác định được sai khác nhỏ giữa hình ảnh thực trong thực tế và hình ảnh được tạo ra bởi trình tạo và trình tạo có khả năng tạo được hình ảnh gần với hình ảnh thực tế hơn mà trình so sánh cũng phải xác định nhầm. 

Và như vậy mô hình mạng GAN của chúng ta có thể tạo ra các hình ảnh trong có vẻ rất tự nhiên. 

<div align="center">
<img src="https://miro.medium.com/max/1850/1*Hpkkiry1SQ1VCf-f9FhgDA.png">
<em>Trình so sánh giúp cải thiện chất lượng cho trình tạo!</em>
</div>
<br>

## Backpropagation
Bây giờ chúng ta sẽ đi vào mặt kỹ thuật của thuật toán. Một số phương trình đơn giản sẽ được nêu ở đây.

Trình so sánh sẽ xuất ra giá trị xác suất `D(X)` cho biết X có phải là hình ảnh thật hay không. Mục tiêu của chúng ta là tối đa hóa cơ hội nhận ra hình ảnh thật là hình ảnh thật và được hình ảnh được tạo ra bởi trình tạo là hình ảnh giả. Để thực hiện trình tối ưu cho điều này, chúng tôi sử dụng **cross-entropy** như trong hầu hết các ứng dụng Deep Learning thông thường: **p×log(q)**. Đối với hình ảnh thực, p bằng 1. Đối với hình ảnh được tạo, chúng tôi đảo ngược nhãn (nghĩa là giá trị -1). Vì vậy,  hàm mục tiêu trở thành:
<div align="center">
<img src="https://miro.medium.com/max/1720/1*4xAHMaUGXeOQnNJhzjq-4Q.jpeg">
<em>Hàm mục tiêu!</em>
</div>
<br>

Về phía trình tạo, thì hàm mục tiêu của nó muốn mô hình tạo ra các hình ảnh có khả năng giống thật nhất, tức là giá trị `D(X)` đầu ra với đầu vào là hình ảnh được tạo `X` sẽ gần đến giá trị 1 nhất, điều này giúp đánh lừa được trình so sánh:
<div align="center">
<img src="https://miro.medium.com/max/1224/1*n235XEigXKL3ktL08d-CZA.jpeg">
<em>Hàm mục tiêu cho trình tạo!</em>
</div>
<br>

Và đối với trình so sánh, thì nó sẽ làm sao cho giá trị `D(X)` càng nhỏ càng tốt với đầu vào cũng là hình ảnh được tạo `X`. Việc này giống như một trò chơi maximum, trong đó, tôi muốn giá trị D của trình tạo G càng lớn càng tốt, trong khi lại muốn tối thiểu giá trị tương ứng D của trình so sánh.
<div align="center">
<img src="https://miro.medium.com/max/1470/1*ihK3whUAZ_0UeK4SJicYFw.png">
<em>Hàm mục tiêu cho GAN!</em>
</div>
<br>

Khi xác định được hàm mục tiêu, mô hình sẽ học được cách giảm độ dốc xen kẽ. Chúng ta cập nhật các tham số của trình tạo và thực hiện một bước lặp duy nhất của gradient descent trên trình so sánh bằng cách sử dụng hình ảnh thực và hình ảnh được tạo. Sau đó, chúng ta lại quay về trình tạo. Cập nhật các tham số của trình so sánh và huấn luyện trình tạo cho một lần lặp khác. Chúng tôi đào tạo cả hai mạng theo các bước xen kẽ cho đến khi trình tạo tạo ra hình ảnh chất lượng tốt. Sau đây tóm tắt luồng dữ liệu và gradient được sử dụng cho quá trình backpropagation:
<div align="center">
<img src="https://miro.medium.com/max/1600/1*M_YipQF_oC6owsU1VVrfhg.jpeg">
<em>Quá trình backpropagation của GAN!</em>
</div>
<br>

**Vấn đề khi đào tạo mô hình**

Tuy nhiên, chúng ta sẽ gặp phải một vấn đề giảm độ dốc cho trình tạo. Trình so sánh thường sẽ thắng sớm trước hơn so với trình tạo. Luôn luôn dễ dàng hơn để phân biệt các hình ảnh được tạo ra với hình ảnh thực tế trong quá trình đào tạo. Điều đó làm cho V tiếp cận 0. tức là **- log (1 - D(G(z)) ) → 0**. Giá trị của gradient cho trình tạo sẽ trở lên rất lớn, điều này làm cho việc tối ưu hóa gradient descent rất chậm. Để cải thiện điều đó, GAN cung cấp một chức năng thay thế để tính gradient cho trình tạo:
<div align="center">
<img src="https://miro.medium.com/max/1517/1*6So6q3dWurG8qrmwk1y3jw.jpeg">
<em>Hàm mục tiêu thay thế cho hàm mục tiêu của trình tạo!</em>
</div>
<br>

## Kết luận
Bài viết này chỉ trình bày các khái niệm cơ bản, ý tưởng tổng quan của mô hình mạng GAN. Để thực sự đi vào sử dụng và đào tạo mạng GAN cần rất nhiều thứ. Bài đầu tiên này cũng trình bày qua về một vài ứng dụng của GAN trong thế giới thực. Trong bài tiếp theo, cùng liệt kê về các ứng dụng cụ thể của GAN trong thực tế như thế nào và cùng nhau làm một ứng dụng nhỏ cùng với GAN trong các bài đăng tiếp theo.

## Liên kết
Bài viết chủ yếu lấy nội dung của tác giả **Jonathan Hui** được đăng trên Medium, cảm ơn tác giả  **Jonathan Hui** đã cung cấp một mức hiểu biết trực quan về GAN. Bạn có thể đọc bản gốc bằng tiếng anh bằng link dưới đây: [GAN — What is Generative Adversary Networks GAN?](https://medium.com/@jonathan_hui/gan-whats-generative-adversarial-networks-and-its-application-f39ed278ef09)

Hẹn gặp lại bạn vào bài thứ hai của series về mô hình mạng GAN (mạng có khả năng đem lại sự sáng tạo cho trí tuệ nhân tạo!)