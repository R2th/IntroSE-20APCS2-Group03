## Vấn đề đặt ra
Có 2 loại thông tin mà ta cần quan tâm:
- Thông tin chung: thông tin của toàn bộ người mà ta đã thu thập thông tin.
- Thông tin cá nhân: thông tin riêng của một cá nhân.

Để hiểu hơn về 2 loại thông tin trên ta xét ví dụ sau. Ta làm nghiên cứu khảo sát ảnh hưởng của rượu đối với stress bằng các hỏi một số người "Rượu có làm bạn stress thêm hay không?". Từ tất cả thông tin thu thập được, ta kết luận rằng rượu làm tăng stress. Tuy nhiên đối với từng cá nhân, họ có thể trả lời có hoặc không.  
Dữ liệu nói chung và dữ liệu cá nhân đang trở thành “nguồn vốn” hay “tài sản” có tầm quan trọng hàng đầu của nền kinh tế số hay nền kinh tế vận hành trên cơ sở dữ liệu sử dụng công nghệ số. Đặc biệt là dữ liệu cá nhân. Ngày nay, ngày càng có các hệ thống với lượng dữ liệu người dùng khổng lồ và họ cần công khai những số liệu thống kê để có thể làm các nghiên cứu. Tuy nhiên việc công bố các dữ liệu ra ngoài hoàn toàn có thể làm rò rỉ một số thông tin riêng tư và danh tính của những cá nhân có trong dữ liệu bằng cách suy ngược lại.   
Ví dụ ta có trung bình cộng cân nặng của 3 sinh viên và trung bình cộng của 2 sinh viên thì ta có thể tính ra được cân nặng của sinh viên còn lại. Hoặc là có một số tổ chức muốn đưa dữ liệu của họ tham gia vào một số nghiên cứu nhưng lại không muốn thông tin cá nhân bị lộ ra thì Differential privacy là vô cùng cần thiết. 
## Bài toán
Bài toán đặt ra là làm sao để khi người khác có được dữ liệu đã phân tích, thống kê được lấy ra từ dữ liệu gốc nhưng họ không thể suy luận được thông tin cá nhân của những người làm khảo sát. Ngoài ra, giải pháp không làm thay đổi quá nhiều dữ liệu thống kê từ cộng đồng đã làm khảo sát. 
## Hướng tiếp cận
Hướng tiếp cận được đề ra trong bài báo Calibrating Noise to Sensitivity in Private Data Analysis - 2008  được đề ra là khi mà lấy thông tin của một người ra khỏi tập dataset D thì kết quả của bất kỳ một số liệu thống kê nào cũng sẽ không thay một cách đáng kể.  
Độ thay đổi của thống kê này được ký hiệu là ε hay còn gọi là độ mất tính riêng tư (privacy loss). 
Mục tiêu của differential privacy là giảm thiểu ε càng nhỏ càng tốt nhưng vẫn đảm bảo giữ được độ chính xác (Accuracy) nhất định (tức là không làm thay đổi kết quả hàm thống kê quá nhiều so với trước khi áp dụng differential privacy).   
Để làm  được điều này, ta sẽ cộng vào output của hàm thống kê một lượng nhiễu `L` (noise). Vì thế, kết quả của hàm thống kê sẽ trả về `Y + L` thay vì trả về Y. Và kết quả `Y + L` phải đảm bảo ε rất nhỏ dẫn đế  khi lấy thông tin 1 người ra khỏi tập dữ liệu thì thống kê `Y + L` thay đổi rất ít, suy ra ta có thể làm cho những người khai thác không thể tính được chính xác dữ liệu của từng cá nhân.
Có nhiều cách tính L, trong đó có một cách nổi bật là dùng phân bổ Laplace để tính. 
### Định nghĩa của ε-Differential Privacy

Gọi A là một thuật toán bất kì chọn dữ liệu trong tập S là input. Một hàm A được xem là thỏa ϵ-Differential Privacy nếu: với mọi tập con của S (ảnh của A) và với mọi tập database D1 , D2  chỉ khác nhau 1 đơn vị (1 record của 1 cá nhân), thỏa mãn:
![image.png](https://images.viblo.asia/8c1d6c1b-a9dc-47c4-91b5-d763b5932e2a.png)
Ý nghĩa của bất đẳng thức này là nếu lấy ra thông tin của một người thì xác suất là output của hàm A sẽ không thay đổi đáng kể. Giả sử rằng dữ liệu của một người X có ở  D1  mà không có ở D2 cho dù một người bên ngoài có biết được kết quả của cả 2 output của  D1 , D2 sau khi đưa vào F thì họ cũng không thể xác định được dữ liệu của người X ở thứ tự nào . ε biểu thị cho độ bảo mật, nếu  càng nhỏ thì độ thay đổi sẽ càng ít việc chọn ε là khá phức tạp và phụ thuộc vào nhiều điều kiện, yêu cầu khác. (ε càng nhỏ thì bất đẳng thức gần bằng nhau)
### Độ nhạy cảm
Độ nhạy cảm cho ∆f của một hàm f được định nghĩa như sau:
![image.png](https://images.viblo.asia/fdd28d89-864c-4458-b298-b042599e4018.png)
Trong đó, D1, D2 là 2 tập dữ liệu chỉ khác nhau ở 1 đơn vị dữ liệu.
Chỉ số này chỉ ra sự khác biệt lớn nhất khi thực thi hàm f trên 2 tập dữ liệu hàng xóm (neighboring datasets) bất kỳ. Rõ ràng ta nhìn thấy được chỉ số này chỉ phụ thuộc vào hàm f mà không phụ thuộc vào dataset (có một chỉ số khác gọi là Local Sensitivity thì phụ thuộc vào dataset mà ta đang xét).
Ví dụ hàm đếm có độ nhạy cảm là 1 vì nếu thay thêm hoặc xóa 1 record thì output chỉ khác nhau 1.
Chỉ số này rất quan trọng để thực hiện một số cơ chế của Differential Privacy.
### Cơ chế Laplace
Cơ chế này đơn giản là cộng một lượng noise phù hợp vào output của một hàm để thỏa Differential Privacy nhưng vẫn đưa ra một kết quả có ít cụ thể.
Cụ thể cơ chế Laplace thỏa  ϵ-Differential Privacy như sau.
Nếu hàm f bình thường trả về f(x) thì bây giờ sẽ trả về F(x) với:  
`F(X) = f(x) + Lap(=0, b = f)`  
Với Lap là phân bố Laplace có tâm bằng 0 và scale b.
## Source code
Source code sử dụng python xây dựng UI bằng cmd cho phép người dùng truy xuất dữ liệu thống kê trong tập dữ liệu. Sử dụng cơ chể laplace thêm số liệu nhiễu để tránh ảnh hưởng tính riêng tư của dữ liệu thông qua các độ nhạy cảm được tính bằng tay dự trên tập dữ liệu.

Toàn bộ source code [differential-privacy](https://github.com/nltd101/differential-privacy)  
Việc thêm dữ liệu nhiễu được đặt trong file [my_data_frame.py](https://github.com/nltd101/differential-privacy/blob/main/my_data_frame.py)   
Độ nhạy cảm cần thiết [sensitivities.py](https://github.com/nltd101/differential-privacy/blob/main/sensitivities.py)   
Tập dữ liệu [adult.csv](https://www.kaggle.com/wenruliu/adult-income-dataset)  
## Đóng góp
Đối với các yêu cầu thay đổi, xin hãy liên lạc và thảo luận với tôi về vấn đề này.