# Giới thiệu Explainable AI
Sự thành công của Deep Neural Network (DNN - mạng nơ-ron sâu) đã mang đến những bước tiến lớn trong các ứng dụng, nghiên cứu A.I (trí tuệ nhân tạo). Mặc dù vô cùng thành công, nhưng DNN hoạt động giống như một chiếc hộp đen, ta không biết tại sao mạng nơ-ron lại đưa ra một quyết định cụ thể. Do đó, khi một hệ thống A.I dự đoán sai, ta không hề biết tại sao hệ thống đó lại dự đoán sai, để lại chúng ta ngơ ngác chấp nhận rằng với trường hợp này thì chúng dự đoán sai.  
Vì vậy, khả năng có thể diễn giải, hiểu một model A.I là cần thiết. Để có thể tạo ra một hệ thống A.I đáng tin tưởng, ta cần phải có một model có thể giải thích tại sao chúng lại đưa ra dự đoán như vậy. Nói rộng hơn, việc tạo ra một hệ thống A.I có thể tự diễn giải được chia làm 3 giai đoạn sử dụng.  
- Trước hết, khi khả năng của A.I yếu hơn con người rất nhiều và không sẵn sàng để deploy, việc có một model tự diễn giải lúc này sẽ giúp chúng ta xác định nguyên nhân của sự thất bại của chúng, để các A.I Engineer có thể cải tiến model theo một hướng rõ ràng.  
-  Thứ hai, nếu khả năng của A.I ngang cơ với con người, việc có thể tự diễn giải có thể tạo dựng sự tin tưởng cho model đó đối với người dùng.  
-   Thứ ba, nếu khả năng của A.I vượt con người, ta có thể dùng model đó hướng dẫn con người học tác vụ đó.   
# CAM - Class Activation Map
Trong phần này, mình sẽ nói về cách tạo ra Class Activation Map (**CAM**) sử dụng Global Average Pooling (**GAP**) trong CNN. Một Class Activation Map cho một class cụ thể sẽ biểu thị những vùng được cho là quan trọng ở trong ảnh dùng để nhận diện class đó (Hình 1).  
![image.png](https://images.viblo.asia/0edfeeca-e215-45d8-a2b2-caf3ca5432c2.png)  
## Ý tưởng
Để có thể tạo các Maps đó, nhóm tác giả của paper CAM đã tạo nên một mạng nơ-ron riêng lấy ý tưởng từ InceptionNet. Ngay trước layer softmax để đưa ra output của mạng, ta thực hiện GAP, rồi mới đưa feature đã được GAP vào lớp Fully-Connected (FC) cuối sử dụng softmax để phân loại. Sử dụng kiến trúc này, ta có thể xác định được vùng quan trọng trong bức ảnh bằng việc ánh xạ lại weight của output layer lên feature map từ lớp Convolution (Conv), kĩ thuật này được gọi là Class Activation Mapping (Hình 2).  
![image.png](https://images.viblo.asia/c542e81a-7df3-4e03-9b59-8e4e96de0e38.png)  
Nhìn vào Hình 2, GAP sẽ đưa ra trung bình về mặt vị trí của từng feature map trong lớp Conv cuối. Để có thể đưa ra dự đoán của một class, ta thực hiện một phép cộng sử dụng trọng số $w$ (weighted sum) lên toàn bộ các unit sau khi GAP. Tương tự, ta thực hiện weighted sum lên từng feature map trong lớp Conv cuối để thu được CAM.  
:exclamation: **Phía trên là toàn bộ ý tưởng để tạo ra CAM, tiếp theo mình sẽ đi rõ vào cách thực hiện gồm khá nhiều toán, các bạn có thể bỏ qua nếu muốn.**  
## Cách thực hiện
Với một ảnh đầu vào, gọi $f_k(x,y)$ là activation của feature map thứ $k$ (unit $k$) trong lớp Conv cuối tại vị trí $(x, y)$. Gọi kết quả của phép GAP là $F^k$, với unit $k$, kết quả khi áp dụng GAP là $F^k = \sum_{x, y}f_k(x,y)$. Với class $c$, input trước khi đưa vào softmax $S_c = \sum_k w_k^c F^k$ với $w_k^c$ là weight của unit $k$ ứng với class $c$. Cuối cùng, đầu ra softmax cho class $c$ là $P_c = \frac{exp(S_c)}{\sum_c exp(S_c)}$.  
Thay $F^k= \sum_{x, y}f_k(x,y)$ vào class score $S_c$, ta thu được:  
$$
S_c = \sum_k w_k^c \sum_{x, y} f_k(x,y)=\sum_{x, y} \sum_k w_k^c f_k(x,y)
$$
Gọi $M_c$ là CAM cho class $c$, mỗi điểm tọa độ $(x, y)$ trong CAM sẽ được tính theo công thức:  
$$
M_c(x,y) = \sum_k w_k^c f_k(x,y)
$$
Ta có thể thấy, $S_c = \sum_{x,y}M_c(x,y)$, do đó, $M_c(x,y)$ sẽ biểu thị độ quan trọng của vị trí $(x,y)$ ứng với class $c$.  
Nhưng kích thước của feature map từ lớp Conv cuối khá là nhỏ, vì vậy, để thu được CAM trên ảnh, ta sử dụng một phép upsampling đơn giản CAM cho bằng với kích thước của ảnh đầu vào là xong.  
![image.png](https://images.viblo.asia/0e757a96-5e8f-410f-aad5-5e4ab1464654.png)

# Grad-CAM: CAM nhưng sử dụng Gradient
Một điểm yếu của CAM là chỉ có thể sử dụng được lên feature maps trong lớp Conv ngay trước khi đưa vào lớp output, và chỉ phù hợp với các model mà sử dụng GAP trước khi đưa vào lớp output (feature maps -> GAP -> output prediction). Grad-CAM sử dụng tín hiệu của gradient để kết hợp các feature maps mà không cần phải thay đổi kiến trúc của mạng (thêm vào GAP) (Hình 4).  
![image.png](https://images.viblo.asia/999c3fac-c8c5-4b7d-875f-e6d5eecabf87.png)
## Ý tưởng
Grad-CAM là một trường hợp Generalized của CAM, có thể sử dụng với bất kì kiến trúc mạng nào. Ý tưởng của Grad-CAM cũng giống với CAM, ta tận dụng thông tin về không gian ở trong các lớp Conv để có thể hiểu vùng nào là quan trọng đối với một class cụ thể. Grad-CAM có thể sử dụng lên bất kì feature maps từ bất kì layer nào ở trong mạng, nhưng để chứng minh độ hiệu quả cũng như tính giải thích cao của mô hình, paper Grad-CAM sử dụng lớp Conv cuối, vì lớp Conv cuối thường là lớp chứa nhiều thông tin nhất (Hình 5).  
![image.png](https://images.viblo.asia/d582429a-0282-4486-885c-a9b5582eb309.png)  
Các feature maps được sinh ra từ lớp Conv cuối kí hiệu là $A^1, A^2, A^3$. Lúc này, ở CAM, ta sẽ phải thực hiện GAP và theo sau đó là một lớp FC. Tuy nhiên, trong Grad-CAM, sau đó có thể là gì cũng được, có thể là vài lớp FC, hay Conv, kí hiệu là "any neural network layers" ở trên Hình 5. Yêu cầu duy nhất là các layers chèn thêm phía sau layer sinh ra $A^1, A^2, A^3$ phải khả vi để có thể lấy được gradient.  
Sự khác biết giữa CAM và Grad-CAM lúc này là cách tính weight cho từng feature map $A^1, A^2, A^3$ để tạo nên heatmap. Ở CAM, các giá trị weight này được lấy từ weight của lớp GAP với lớp FC cuối của mạng, còn trong Grad-CAM, ta sử dụng giá trị "alpha" dựa trên gradient.  
:exclamation: **Phía trên là toàn bộ ý tưởng để tạo ra heatmap sử dụng Grad-CAM, tiếp theo mình sẽ đi rõ vào cách thực hiện gồm khá nhiều toán, các bạn có thể bỏ qua nếu muốn.**  
## Cách thực hiện
Grad-CAM sẽ gồm 3 bước:  
**Bước 1: Tính gradient**. Ta cần phải tính gradient của $y^c$ ứng với feature map activation $A^k$ sinh ra từ một lớp Conv: $\frac {\partial y^c}{\partial A^k}$ (Hình 6).   
![image.png](https://images.viblo.asia/71cdea3f-196f-456a-9fdc-c6c8969afcf2.png)  
**Bước 2: Tính "alpha"**. Ta sẽ tính giá trị "alpha" bằng trung bình gradients. Gradient thu được ở bước 1 là một tensor 3 chiều (channels, height, width). Ta thực hiện GAP lên Gradient đó, thu được tensor weight $\alpha$ có chiều (channels, 1, 1) (Hình 7).  
![image.png](https://images.viblo.asia/f9f74f6a-e945-4ab4-b58d-56e591f2ab98.png)  
**Bước 3: Tạo Class Activation Map**. Ta thực hiện weighted sum kết hợp với hàm ReLU để tạo ra heatmap (CAM).
$$
L^c_{grad-CAM} = ReLU(\sum_k a_k^c A^k)
$$
Nếu để ý công thức, các bạn có thể thấy nó hơi giống kĩ thuật Attention thường sử dụng ở trong Computer Vision.  
Kết quả của Grad-CAM, các bạn có thể tìm thấy ở hình dưới.  
![image.png](https://images.viblo.asia/3e6a06db-3289-49d5-a5bc-8af8d322e833.png)  
# Ablation-CAM: CAM nhưng không sử dụng Gradient, sử dụng loại bỏ thông tin
Ablation-CAM nêu ra một vài nhược điểm của Grad-CAM như sau:
- Grad-CAM dựa vào dòng chảy của gradient từ output layer đến Conv layer mong muốn để tạo ra Class Activation Map. Nhưng mỗi layer lại là một hàm phi tuyến tính của ảnh đầu vào cũng như là của những layer trước đó, vì vậy, Grad-CAM chịu ảnh hưởng của gradient saturation, dẫn đến việc gradient trong quá trình backprop nhỏ dần rồi biến mất, ảnh hưởng đến chất lượng Visualization
- Model chỉ cần thực hiện forward pass để dưa ra prediction, vậy tại sao lại giải thích prediction của model sử dụng backprop để lấy gradient? 

## Ý tưởng
Ý tưởng của Ablation-CAM đến từ việc Ablation (loại bỏ) đi thông tin của feature maps. Morcos và đồng bọn [1] đã thực hiện Ablation Analysis (thử nghiệm loại bỏ) để tìm ra độ quan trọng của từng unit trong layer đối với model. Họ kết luận rằng, với một model mà có tính generalized cao thì sẽ ít phụ thuộc vào một neuron hơn, và việc Ablation (đặt giá trị của neuron đó = 0) sẽ không làm ảnh hưởng đến hiệu suất của model. Tuy nhiên, Morcos và đồng bọn lại chưa phân tích đến ảnh hưởng của việc Ablation tới một class cụ thể. Sau đó, Zhou và đồng bọn [2] đã cho thấy việc bỏ đi một feature map từ output feature maps của một layer có ảnh hưởng nghiêm trọng đến đầu ra logit từ output layer của model (Hình 8).   
![image.png](https://images.viblo.asia/884d2b79-7be6-409d-ba50-b325c7c8a814.png)
Ablation-CAM cho rằng việc đó thể hiện được độ quan trọng của feature map bị bỏ đi đó lên class cần xác định. Vì vậy, thay vì sử dụng GAP lên ma trận gradient, Ablation-CAM thực hiện Ablation từng feature map trong feature maps đầu ra của một lớp Conv, và sử dụng chúng làm weight.  
:exclamation: **Phía trên là toàn bộ ý tưởng để tạo ra heatmap sử dụng Ablation-CAM, tiếp theo mình sẽ đi rõ vào cách thực hiện gồm khá nhiều toán, các bạn có thể bỏ qua nếu muốn.**  
## Cách thực hiện
Xét việc ta cần tạo ra Class Activation Map cho một ảnh đầu vào $I$. Thực hiện forward pass qua model, ta thu được đầu ra logit ứng với class $c$ là $y^c$. $y^c$ này là giá trị của một hàm phi tuyến tính của feature map $A^k$, tức là $y^c=f(A^k)$ với $A^k \neq 0$. Đặt toàn bộ giá trị của feature map $A^k = 0$, thực hiện forward pass ảnh $I$ lần nữa qua model, thu được $y_k^c$.  $y_k^c$ này **có thể** giảm so với $y^c$. Lúc này, $y_k^c = f(A^k)$ với $A^k = 0$.  
Ta có slope mô tả ảnh hưởng của việc ablation feature map $A^k$ như sau: 
$$
slope = \frac{y^c - y_k^c}{||A_k||}
$$
Nhưng trong Ablation-CAM, ta sẽ sử dụng một biến thể của slope trên để đo độ quan trọng của $A^k$ với class $c$ bởi vì mẫu số norm A ($||A_k||$) có giá trị cực kì lớn so với tử số $y^c - y_k^c$. Vì vậy, công thức biến đổi để tính weight là:  
$$
w_k^c = \frac{y^c - y_k^c}{y^c}
$$
$w_k^c$ có thể hiểu là fraction of drop trong logit output của class $c$ khi feature map $A^k = 0$.  
Ta thu được Class Activation Map bằng weighted sum và ReLU tương tự như Grad-CAM:
$$
L^c_{Ablation-CAM} = ReLU(\sum_k w_k^c A^k)
$$
# Reference
[1]. A. S. Morcos, D. G. Barrett, N. C. Rabinowitz, and M. Botvinick. On the importance of single directions for generalization. ICLR, 2018.  
[2]. B. Zhou, Y. Sun, D. Bau, and A. Torralba. Revisiting the importance of individual units in cnns via ablation. arXiv preprint arXiv:1806.02891, 2018.  
https://github.com/jacobgil/pytorch-grad-cam: Một thư viện chứa rất nhiều các phương pháp CAM  
Interpretable Machine Learning bản dịch tiếng Việt: https://github.com/giangnguyen2412/InterpretableMLBook-Vietnamese/blob/master/IML_bookv1.0.pdf