Với mục tiêu hoàn thành loạt bài về Recommendation trước khi hết năm, Matrix Factorization là thuật toán cuối cùng về Recommendation mà mình muốn chia sẻ với các bạn. Cùng mình tìm hiểu nhé :)

### 1. Khái niệm
**Matrix Factorization** là một hướng tiếp cận khác của Collaborative Filtering, còn gọi là Matrix Decomposition, nghĩa là gợi ý bằng "*kỹ thuật phân rã ma trận*".

**Kỹ thuật phân rã ma trận** là phương pháp chia một ma trận lớn _X_ thành hai ma trận có kích thước nhỏ hơn là _W_ và _H_, sao cho ta có thể xây dựng lại _X_ từ hai ma trận nhỏ hơn này càng chính xác càng tốt, nghĩa là *X ~ $WH^T$*

![](https://images.viblo.asia/e18f2977-7b7a-4df1-b215-135ae9f42db3.png)

Có thể hiểu rằng, ý tưởng chính của Matrix Factorization là đặt items và users vào trong cùng một không gian thuộc tính ẩn. Trong đó,  *W ∈ $R^{\lvert{U}\lvert{}*K}$* là một ma trận mà mỗi dòng _u_ là một vector bao gồm *K* nhân tố tiềm ẩn (latent factors) mô tả user _u_ và  *H ∈ $R^{\lvert{}I\lvert{}*K}$* là một ma trận mà mỗi dòng _i_ là một vector bao gồm _K_ nhân tố tiềm ẩn mô tả cho item _i_.

Áp dụng phương pháp này vào bài toán gợi ý, chúng ta có _x_ là một vector của item profile.

Mục tiêu của chúng ta là tìm một vector _w_ tương ứng với mỗi user sao cho ratings đã biết của user đó cho item (_y_) xấp xỉ với:

![](https://images.viblo.asia/94477e4e-3636-458e-8dd2-57ada0fa0960.png)

Mở rộng với *Y* là *utility matrix*, giả sử đã được điền hết giá trị, ta có:

![](https://images.viblo.asia/b4d755b4-a56b-4ca3-9f77-323d632e3c62.png)

với *M, N* lần lượt là số users và số items.


Lưu ý, do _X_ là được xây dựng dựa trên thông tin mô tả item và quá trình xây dựng này độc lập với quá trình đi tìm hệ số phù hợp cho mỗi user nên việc xây dựng item profile đóng vai trò quan trọng và có thể ảnh hưởng trực tiếp đến hiệu năng của mô hình. Thêm nữa, việc xây dựng mô hình riêng lẻ cho mỗi user dẫn đến kết quả chưa thực sự tốt vì không khai thác được đặc điểm giống nhau giữa các user.

Giả sử rằng ta không cần xây dựng trước các item profile mà ma trận này có thể huấn luyện đồng thời với ma trận trọng số, hay nói các khác bài toán này là bài toán tối ưu các ma trận X và W, trong đó X là ma trận của toàn bộ các item profiles, mỗi hàng tương ứng với 1 item. Còn W là ma trận của toàn bộ user models (các mô hình của users), mỗi cột tương ứng với một user. Chúng ta sẽ cố gắng xấp xỉ utility matrix *Y ∈ $R^{M*N}$* bằng tích của hai ma trận con là  *X ∈ $R^{M*K}$* và  *W ∈ $R^{K*N}$*.

Trong đó, K được chọn thường nhỏ hơn rất nhiều so với M và N, và cả hai ma trận X và W đều phải có bậc (rank) không được vượt quá K

![](https://images.viblo.asia/4ac4c4c4-72da-418b-90e1-b9e84098cef8.png)

### 2. Xây dựng và tối ưu hàm mất mát 
Cụ thể, quy trình xây dựng và tối ưu hàm mất mát như sau:

#### 2.1. Hàm mất mát 

Đầu tiên, chúng ta sẽ xét hàm mất mát không có cả bias và biến tối ưu cho X và W:
![](https://images.viblo.asia/971a2d77-c741-4904-b1d5-bffcab9da190.png)

Trong đó,  *$r_{mn}$= 1* nếu item thứ _m_ đã được đánh giá bởi user thứ _n_, ‖○‖ là căn bậc hai của tổng bình phương tất cả các phần tử của ma trận, _s_ là toàn bộ số ratings đã có. Thành phần thứ nhất chính là trung bình sai số của mô hình. Thành phần thứ hai trong hàm mất
mát phía, có tách dụng giúp tránh overfitting.

Lưu ý, tương tự như *NBCF*, các giá trị ratings được sử dụng là các giá trị đã chuẩn hóa, bằng cách trừ đi trung bình cộng các giá trị ratings đã biết trong cùng một hàng (với *iiCF*) và trong cùng một cột (với *uuCF*) – bài trước. Trong một số trường hợp, ta có thể không cần chuẩn hóa ma trận *utility matrix* nhưng những trường hợp đó sẽ phải dùng các kĩ thuật khác để giải quyết tính cá nhân trong các ratings.

Tiếp theo, chúng ta sẽ tối ưu _X_ và _W_ bằng cách cố định từng ma trận và tối ưu ma trận còn lại cho tới khi hội tụ.

#### 2.2. Tối ưu hàm mất mát

Khi cố định _X_, việc tối ưu _W_ chính là bài toán tối ưu của *Content-based Filtering*:

![](https://images.viblo.asia/9ace51d3-580a-4f5c-98b2-fec453c99ddc.png)

Ngược lại, khi cố định _W_, việc tối ưu _X_ được đưa về tối ưu hàm:

![](https://images.viblo.asia/54815480-d545-49d4-8776-b6fda8dde101.png)

Hai bài toán này sẽ được tối ưu bằng *Gradient Descent*.

Chúng ta có thể thấy rằng, bài toán tối ưu _W_ có thể được tách thành _N_ bài toán nhỏ (_N_ là số lượng users), mỗi bài toán tương ứng với việc đi tối ưu một cột của ma trận _W_.

![](https://images.viblo.asia/4cb74493-d8c6-4ae4-a0f2-0a9f7c80a02a.png)

Vì biểu thức $(y_{mn} - x_mw_n)^2$ chỉ phụ thuộc vào các items đã được user đang xét đánh giá, nên ta có thể đơn giản nó bằng cách sử dụng sub matrix, là matrix chỉ chứa các giá trị ratings đã biết. Khi đó, hàm mất mát có dạng:

![](https://images.viblo.asia/f80e3cf1-2d78-4d63-b93b-4d5b1e7cfeba.png)

Và đạo hàm của nó là:

![](https://images.viblo.asia/47637c9f-7461-4974-87f0-52b913758367.png)

Vậy công thức cập nhật cho các cột của _W_ là:

![](https://images.viblo.asia/2362bae1-1bbf-4b9a-914a-47de56210bcb.png)

Tương tự với _X_, mỗi hàng tương ứng với một item sẽ được tìm bằng cách tối ưu:

![](https://images.viblo.asia/28f8c5d7-4a7f-4b53-abd9-5ad55a825ca3.png)

Đặt *$W_m$* là ma trận được tạo bằng các cột của *W* tương ứng với các users đã đánh giá items đó và sử dụng *submatrix Y* tương ứng là $y_m$. Công thức trên sẽ trở thành:

![](https://images.viblo.asia/940b8ae6-e263-47be-9bc5-0542d1d9fab9.png)

Vậy công thức cập nhật cho mỗi hàng của X là:

![](https://images.viblo.asia/03b01168-3d5e-4564-b948-5f020560ca8a.png)

Sau khi cố định *X*, tính *W* và ngược lại, cố định *W* và tính *X* cho đến khi các ma trận này hội tụ, ta sẽ thu được ma trận _X_ và _W_ cần tìm. Từ đó, dự đoán các giá trị ratings chưa biết.

Ngoài phương pháp trên, để tăng độ chính xác của thuật toán này, ta sẽ xét hàm mất mát với `bias` và `hệ số tối ưu cho X và W`.

Như trong *NBCF*, chúng ta có bước chuẩn hóa ma trận để tránh sự thiên lệch do sự khó ttính hay dễ tính khác nhau giữa các users. Với *MF*, ta có thể chuẩn không chuẩn hóa mà sử dụng trực tiếp các giá trị ratings ban đầu, bằng cách tối ưu các biases cùng lúc với _X_ và _W_.

Trong trường hợp này, ratings của user _m_ cho item _n_ được xác định bởi công thức:

![](https://images.viblo.asia/3ff801fa-c62a-489e-83aa-82904634d313.png)

với  $b_m, d_n,\mu$  lần lượt là *bias* của item _m_, user _n_ và ratings là ratings trung bình của toàn bộ các ratings.

Và hàm mất mát trong trường hợp này có dạng:

![](https://images.viblo.asia/a003b705-ce2d-45ab-a6fe-15ef97c39584.png)

Tiến hành cố định *X, b* và tối ưu *W, d* và ngược lại, cố định *W, d* và tối ưu *X, b*, theo các công thức:

![](https://images.viblo.asia/c9a574f6-b564-4f8a-ab54-44cb0d64f7a8.png)

Cuối cùng, ta sẽ thu được các ma trận *X, b, W, d*, từ đó dự đoán các ratings chưa biết.

Trên đây là những lý thuyết căn bản về Matrix Factorization. Trong bài cuối của series này, mình sẽ viết demo cụ thể cho phương pháp này.
Hi vọng bài viết của mình có ịch với bạn. Hẹn gặp lại trong những bài viết tiếp theo.

Tài liệu tham khảo:

[Matrix Factorization Collaborative Filtering](https://machinelearningcoban.com/2017/05/31/matrixfactorization/)

[Matrix Factorization techniques for recommender systems](https://datajobs.com/data-science-repo/Recommender-Systems-[Netflix].pdf)