# 1. Statistical Machine Learning
Đối với một bài toán Machine Learning tổng quát, việc giải quyết bài toán thường gồm 3 bước chính:
-	**Modeling**: Đi tìm mô hình có thể mô tả tốt nhất bài toán
-	**Learning**: Tối ưu tham số cho mô hình dựa vào dữ liệu có sẵn
-	**Inference**: Sử dụng mô hình đã tối ưu để dự đoán kết quả với đầu vào chưa biết

Trong Statistical Machine Learning (Học máy Thống kê), mô hình bài toán thường là sự kết hợp của các phân phối xác suất đơn giản (Bernoulli, Gaussian, …). Ở bước Learning, có hai phương pháp được sử dụng phổ biến để tối ưu bộ tham số, đó là Maximum Likelihood Estimation và Maximum A Posteriori Estimation.

Trong bài viết này, chúng ta cùng tìm hiểu phương pháp Maximum Likelihood Estimation thông qua ví dụ đơn giản. Phương pháp Maximum A Posteriori Estimation sẽ được giới thiệu trong phần tiếp theo.

# 2. Maximum Likelihood Estimation (MLE)

MLE là phương pháp dự đoán tham số của một mô hình thống kê dựa trên những “quan sát” có sẵn, bằng cách tìm bộ tham số sao cho có thể tối đa hoá khả năng mà mô hình với bộ tham số đó sinh ra các “quan sát” có sẵn.

Giả sử mô hình được mô tả bởi bộ tham số θ, các “quan sát” (hay điểm dữ liệu) là x<sub>1</sub>, x<sub>2</sub>, …, x<sub>N</sub>. Khi đó chúng ta cần tìm:

θ = argmax{ p(x<sub>1</sub>,x<sub>2</sub>,…,x<sub>N</sub>|θ) } (1)

, trong đó: p(x<sub>1</sub>,x<sub>2</sub>,…,x<sub>N</sub>|θ) là xác suất để các sự kiện x<sub>1</sub>, x<sub>2</sub>, …, x<sub>N</sub> xảy ra đồng thời, được gọi là likelihood. Chính vì vậy mà phương pháp này được gọi là Maximum Likelihood.

Tuy nhiên, việc giải trực tiếp bài toán (1) thường là khó khăn. Chúng ta có thể đơn giản hoá bài toán bằng việc giả sử các điểm dữ liệu xảy ra độc lập với nhau. Khi đó, (1) trở thành:

θ = argmax{ $\prod$ p(x<sub>n</sub>|θ) } (2)

Chúng ta có thể khiến việc tính toán dễ dàng hơn bằng cách biến đổi về bài toán Maximum Log-likelihood:

θ = argmax{ $\sum$ log(p(x<sub>n</sub>|θ)) } (3)

# 3. Ví dụ
Để hiểu rõ hơn về MLE, chúng ta cùng làm một ví dụ đơn giản.

Giả sử bài toán là có 5 học sinh làm bài kiểm tra được số điểm lần lượt là: *3, 6, 5, 9, 8*. Để mô hình hoá điểm của các học sinh này, ta giả thiết các điểm dữ liệu được phân bố theo phân phối Gaussian:

![](https://images.viblo.asia/4236abb4-26df-4f2b-a8c2-7a0ab030281a.png)

Để dự đoán bộ tham số của phân phối chuẩn, ta sử dụng phương pháp MLE:

![](https://images.viblo.asia/7f96c02d-87a2-47aa-814f-215ae9d2c27a.png)

![](https://images.viblo.asia/92a5f02e-57b7-4208-8398-fc6b97158f9d.png)

![](https://images.viblo.asia/fce90b0a-5be4-4447-b3e9-29f4a8731cb5.png)

Để tìm μ và σ sao cho biểu thức trong ngoặc vuông đạt giá trị cực đại, chúng ta đạo hàm biểu thức theo từng biến và giải phương trình khi giá trị đó bằng 0.

![](https://images.viblo.asia/36a2429a-601c-4f4c-b57c-6af30abbe9cc.png)

![](https://images.viblo.asia/6e4f2a87-9184-463c-b004-72e5ae18b8bd.png)
 
Từ đó ta có:
 ![](https://images.viblo.asia/f4dc8903-bcf9-4bcd-aff8-d92e672065a0.png)

Thay các điểm dữ liệu vào công thức trên, ta tìm được *μ = 6.2* và *σ = 2.14*.

# 4. Kết luận
Hy vọng qua bài viết này, các bạn đã hiểu rõ hơn về phương pháp Maximum Likelihood Estimation. Trong phần tiếp theo, chúng ta sẽ tìm hiểu về phương pháp tổng quát hơn là Maximum A Posteriori Estimation.

# 5. Tài liệu tham khảo và Nguồn hình ảnh
-	https://machinelearningcoban.com/2017/07/17/mlemap/
-	https://towardsdatascience.com/probability-concepts-explained-maximum-likelihood-estimation-c7b4342fdbb1