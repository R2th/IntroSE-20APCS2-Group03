# Latent Space là gì ?
![](https://images.viblo.asia/a046c220-038e-4d81-bb04-f90aadde87df.png)

> Nếu để tóm gon lại Laten Space trong một định nghĩa đơn giản và duy nhất thì nó là đại diện của  dữ liệu nén, còn loại dữ liệu nào thì tuỳ thuộc vào bài toán.

Thử tưởng tượng bạn có một bộ dữ liệu lớn về chữ số viết tay ở đây(0-9) như hình ảnh ở trên. Câu hỏi đặt ra ở đây là làm sao chúng ta có thể tạo ra được một thuật toán để so sánh và tìm được tương đồng của các chữ số giống nhau trong tập dữ liệu đó? 

Trong Deep Learning chúng ta có thể dùng bộ dữ liệu với bài toán *classify*, thì cũng đồng nghĩa với việc bạn đã train để model học được *structural similarities* giữa các hình ảnh trong quá trình train rồi. Trên thực tế, đây là cách mô hình có thể phân loại các chữ số ngay từ đầu - bằng cách học  feartures của mỗi chữ số trong quá trình train với mạng neural network.

Vậy thì những điều trên liên quan gì đến latent space?

Trả lời: Khái niệm của latent space rất quan trong với deep learning -  *Bằng một cách nào đó máy tính sẽ học các features của dữ liệu và đơn giản hóa các biểu diễn dữ liệu cho mục đích tìm kiếm patternts.*

## Vậy ý nghĩa của Latent space là gì?
Trong ví dụ khá đơn giản này, giả sử tập dữ liệu ban đầu của chúng ta là hình ảnh có kích thước 5 x 5 x 1.  Ta sẽ đặt kích thước latent space là 3 x 1, có nghĩa là điểm dữ liệu nén là một vectơ có 3 chiều.
![](https://images.viblo.asia/b796596f-2209-4f1d-96d9-5fe4eca8a3be.gif)

![](https://images.viblo.asia/5a6131c1-3ea0-4fe4-99ae-24a3bfc0c600.gif)

**Bây giờ mỗi một điểm dữ liệu nén 5x5x1 chỉ được xác định duy nhất bởi 3 số**, Điều đó có nghĩa là chúng ta có thể vẽ biểu đồ dữ liệu này trên Mặt phẳng 3D (Một số là x, số kia là y, số kia là z).![](https://images.viblo.asia/731c7aa1-d5d3-4c43-bfc2-e0f7f0bd3162.png)

> Bất cứ khi nào chúng ta vẽ graph cho các điểm hoặc nghĩ về các điểm trong latent space, chúng ta có thể tưởng tượng chúng là các tọa độ trong không gian nơi mà  các điểm "similar" ở gần nhau hơn trên graph.

Nhưng bạn có thể tự hỏi, những hình ảnh "similar" là gì và tại sao việc giảm kích thước của dữ liệu lại làm cho những hình ảnh tương tự trở nên "gần nhau" hơn trong không gian ?

![](https://images.viblo.asia/59bc382f-ed2d-47c2-9cbe-09d5a424b709.png)

Nếu chúng ta nhìn vào ba hình ảnh ở trên, hai chiếc ghế khác màu và một cái bàn, chúng ta sẽ dễ dàng nói rằng hai hình ảnh chiếc ghế là giống nhau hơn trong khi chiếc bàn khác biệt nhất về hình dáng.

Nhưng điều gì làm cho hai chiếc ghế kia "giống nhau". Tất nhiên là chúng ta sẽ xét những đặc điểm liên quan như: góc cạnh, đặc điểm của hình dạng,... Như đã giải thích ở trên, mỗi một features như vậy sẽ được coi là một data point biểu diễn trong latent space. Trong latent space các *thông tin không liên quan* như màu của ghế sẽ bị bỏ qua khi biểu diễn trong latent space, hay nói cách khác ta sẽ *xoá bỏ* thông tin đó.

Kết quả là, khi ta giảm kích thước (Như mình nói ở trên, mỗi một hình ảnh đã được nén thành một data point trong latent space và vì thế nó đã được giảm số chiều xuống tới mức cần thiết để biểu diễn cho hình ảnh đó), hình ảnh của cả hai chiếc ghế trở nên ít khác biệt hơn và giống nhau hơn. Nếu chúng ta tưởng tượng chúng trong không gian, chúng sẽ 'gần nhau hơn'.

# Ứng dụng của Latent Space
## Autoencoder
Là một neural network với hoạt động như một bộ nhận dạng.
![](https://images.viblo.asia/f764840e-d644-406a-b161-b0379746ade1.png)

Khi ta biến model trở thành một "identity function", chúng ta đang bắt nó phải lưu trữ tất cả các features liên quan của dữ liệu đầu vào trong một biểu diễn nén có đầy đủ thông tin để có thể tái tạo nó một cách chính xác với input ban đầu. Tất nhiên, biểu diễn nén đó chính là latent space như bạn có thể thấy ở hình trên.
## Nội suy với latent space
![](https://images.viblo.asia/16e4bbe0-3e7f-4e84-906e-65511aa4cf06.gif)

Giả sử ta "nén" dữ liệu của hình ảnh 2 chiếc ghế và cái bàn ở trên thành ba vector hai chiều lần lượt là `[0.4, 0.5]` và `[0.45, 0.45]` `[0.6, 0.75]`. Nếu ta nội suy trên latent space, ta sẽ lấy các mẫu trong latent space giữa cụm "ghế" và cụm "bàn". Từ các cụm đã được lấy sẵn đấy ta sẽ feed nó vào trong decoder, và kết quả là ta sẽ có một hình ảnh mới lai giữa ghế và bàn về hình dáng. 


## GAN latent space
Mô hình này được áp dụng vào trong các bài toán GAN(Generative Adversarial Network) rất nhiều để tạo ra được một mẫu ra kết hợp từ các features của các input đầu vào. 

![](https://images.viblo.asia/16b58ee7-f718-4aa9-92ec-2ec09b697e8f.gif)

Như một ý tưởng rất mới và độc lạ là convert latent space ra một hình ảnh giống nó, với latent space ta sẽ ko biết cách nó hoạt động bên trong như nào vì nó "ẩn" quá trình đó, nhưng ta có thể can thiệp nó từ bên ngoài. 

Như hình ảnh ở trên ta sẽ bắt đầu training với một random vector - Noise để map tới một random face bất kỳ bằng cách cho qua style GAN bằng cách lặp đi lặp lại nhiều lần. Sau đó ta sẽ back-propagation để tính toán sự khác nhau giữa ảnh được sinh ra và ảnh gốc, mục đích chính của việc này là ta sẽ tạo được một vector latent space giống ảnh gốc nhất có thể. Vậy sinh ra ảnh vector latent space đại diện cho ảnh gốc để làm gì?

![](https://images.viblo.asia/709f9462-737e-408c-b360-21552b57c7f8.png)


Một ví dụ điển hình là bài toán Family GAN: Combine mặt của bố và mẹ để sinh ra mặt của con cái. Ta sẽ sử dụng phương pháp trên để tạo ra latent space của bố và mẹ, sau đó nội suy hai vector đó trong laltent space để tạo ra được mặt của người con.

Qua bài viết này mình đã làm rõ khái niệm về latent space và ứng dụng của nó, nếu bài viết có chỗ nào không hiều hoặc không đúng, mong các bạn góp ý, cảm ơn các bạn đã đọc bài :D

# Reference
1 - https://towardsdatascience.com/understanding-latent-space-in-machine-learning-de5a7c687d8d

2 - https://medium.com/swlh/familygan-generating-a-childs-face-using-his-parents-394d8face6a4