Dạo gần đây mình có tìm hiểu về hệ gợi ý - recommendation system. Và hôm nay mình sẽ chia sẻ với các bạn một số nội dung mà mình tìm hiểu được xung quanh phương pháp Content-based Filtering, phương pháp gợi ý dựa trên nội dung.

## 1. Tổng quan về Hệ gợi ý

### 1.1. Khái niệm

>>>Hệ gợi ý (Recommender Systems - RS) là một dạng của hệ thống lọc thông tin (information filtering), nó được sử dụng để dự đoán sở thích (preferences) hay xếp hạng (rating) mà người dùng có thể dành cho một mục thông tin (item) nào đó mà họ chưa xem xét tới trong quá khứ (item có thể là bài hát, bộ phim, đoạn video clip, sách, bài báo,..).

Thực ra thì đây cũng không phải một bài toán quá xa lạ gì với chúng ta phải không? Như những gợi ý cho chúng ta trên Lazada, Youtube, Facebook,... hay rõ ràng nhất là trong hệ thống Viblo cũng có mục gợi ý cho bạn các bài viết mà có khả năng bạn sẽ quan tâm.


## 1.2. Các thành phần của một hệ gợi ý
Hệ gợi ý rất quen thuộc và gần gũi, vậy để xây dựng được một hệ gợi ý, chúng ta cần có:
1.   Dữ liệu:
Đầu tiên chúng ta cần có dữ liệu về users, items, feedback
>>> Trong đó,
>>>- users là danh sách người dùng
>>>
>>>- items là danh sách sản phẩm, đối tượng của hệ thống. Ví dụ như các bài viết trên trang viblo, các video trên youtube,... Và mỗi item có thể kèm theo thông tin mô tả.
>>>-  feedback là lịch sử tương tác của user với mỗi item, có thể là đánh giá của mỗi user với một item, số ratings, hoặc comment, việc user click, view hoặc mua sản phẩm,...
2.   Ma trận user-item: Utility matrix

![](https://images.viblo.asia/340c500e-271c-4877-b69e-e69ed291a5ca.png)


Đây là ma trận biểu diễn mức độ quan tâm (rating) của user với mỗi item. Ma trận này được xây dựng từ dữ liệu (1). Nhưng ma trận này có rất nhiều các giá trị miss. Nhiệm vụ  của Hệ gợi ý chính là dựa vào các ô đã có giá trị trong ma trận trên (dữ liệu thu được từ trong quá khứ), thông qua mô hình đã được xây dựng, dự đoán các ô còn trống (của user hiện hành), sau đó sắp xếp kết quả dự đoán (ví dụ, từ cao xuống thấp) và chọn ra Top-N items theo thứ tự rating giảm dần, từ đó gợi ý chúng cho người dùng.

3. Phương pháp gợi ý: Có 2 phương pháp gợi ý chính, thường được sử dụng để xây dựng hệ gợi ý, đó là:
    - Content-based Filtering:  Gợi ý các item dựa vào hồ sơ (profiles) của người dùng hoặc dựa vào nội dung/thuộc tính (attributes) của những item tương tự như item mà người dùng đã chọn trong quá khứ.
    ![](https://images.viblo.asia/9a08a0d2-38ff-439b-b5a7-6f9021156ab6.png)
    - Collaborative Filtering:  Gợi ý các items dựa trên sự tương quan (similarity) giữa các users và/hoặc items. Có thể hiểu rằng đây là cách gợi ý tới một user dựa trên những users có hành vi tương tự.
    ![](https://images.viblo.asia/7d626abe-ee85-4186-97c4-b72fd44216e2.png)
    
   Và trong bài viết này, chúng ta sẽ cùng tìm hiểu về phương pháp Content-based Filtering nhé ;)
## 2. Phương pháp gợi ý dựa theo nội dung (Content-based Filtering)

### 2.1 Ý tưởng 
Ý tưởng của thuật toán này là, từ thông tin mô tả của item, biểu diễn item dưới dạng vec-tơ thuộc tính. Sau đó dùng các vec-tơ này để học mô hình của mỗi user, là ma trận trọng số của user với mỗi item.

Như vậy, thuật toán content-based gồm 2 bước:
- Bước 1: Biểu diễn items dưới dạng vec-tơ thuộc tính - item profile
- Bước 2: Học mô hình của mỗi user 

### 2.2. Xây dựng Items Profile

Trong các hệ thống content-based, chúng ta cần xây dựng một bộ hồ sơ (profile) cho mỗi item. Profile này được biểu diễn dưới dạng toán học là một "feature vector" n chiều. Trong những trường hợp đơn giản (ví dụ như item là dữ liệu dạng văn bản), feature vector được trực tiếp trích xuất từ item. Từ đó chúng ta có thể xác định các item có nội dung tương tự bằng cách tính độ tương đồng giữa các feature vector của chúng.

Một số phương pháp thường được sử dụng để xây dựng feature vector là:

- Sử dụng TF-IDF
- Sử dụng biểu diễn nhị phân

1.  Sử dụng TF-IDF:
Giải thích một chút:
>>> TF(t, d) = ( số lần từ t xuất hiện trong văn bản d) / (tổng số từ trong văn bản d)
>>> 
>>> IDF(t, D) = log_e( Tổng số văn bản trong tập mẫu D/ Số văn bản có chứa từ t )

**Ví dụ**: Giả sử chúng ta tìm kiếm về "IoT and analytics" trên Internet và tìm được những bài báo dưới đây:

![](https://images.viblo.asia/65077aaa-89a1-47dd-8f32-1f40da516f86.png)
        Trong các bài báo, 5000 chứa analytics, 50.000 chứa data và số lượng tương tự dành cho các từ khác. Chúng ta hãy giả sử rằng tổng số tài liệu là 1 triệu (10 ^ 6).

- Tính TF: Ta sẽ tính TF cho mỗi từ trong mỗi bài báo

    Ví dụ, TF(analytics) = 1 + lg21 = 2.322

![](https://images.viblo.asia/45422dc3-504c-44c4-90e8-500e5704a041.png)

- Tính IDF: 

IDF được tính bằng cách lấy nghịch đảo logarit của tần số tài liệu trong toàn bộ kho tài liệu. Vì vậy, nếu có tổng số 1 triệu tài liệu được trả về bởi truy vấn tìm kiếm của chúng tôi và trong số các tài liệu đó, ví dụ: nếu  từ smart xuất hiện trong 0,5 triệu lần trong tài liệu, giá trị IDF của nó sẽ là: Log10 (10 ^ 6/5000000) = 0,30.

![](https://images.viblo.asia/6adecb17-40d0-4136-b951-1b03a3e0c87c.png)

- Tính trọng số TF-IDF:
Đầu tiên chúng ta sử dụng công thức sau để tính tf-df:

![](https://images.viblo.asia/298e7173-2707-49d2-9826-40791e77aa30.png)

Sau đó, chuẩn hóa feature vector bằng cách chia vector cho độ dài của chính nó.

![](https://images.viblo.asia/b48e8980-8deb-4e30-89aa-cca8ec6fa1ab.png)

Như vậy, ta có thể có được các vector đặc trưng cho từng bài báo. Sau đó chúng ta có thể sử dụng độ tương đồng cosin để tính khoảng cách giữa chúng.


2.  Sử dụng biểu diễn nhị phân:
Ví dụ:

![](https://images.viblo.asia/0a4de603-0af7-490a-8895-c3d8063cd9a7.png)

Trên đây là danh sách 6 bộ phim. Mỗi giá trị 0/1 thể hiện bộ phim đó không/có thuộc thể loại ở cột tương ứng.
Bên cạnh đó, một hồ sơ người dùng cũng được tạo ra, với 1 là quan tâm, -1 là không, và null là chưa đánh giá. Như trong ví dụ trên, User 1 có quan tâm bộ phim Star Wars IV, còn User 2 thì không.

### 2.3 Học mô hình biểu diễn của user

Trong bài viết này, mình sẽ xét ví dụ với mô hình tuyến tính.

Giả sử ta có:
- N users
- M items
- Y ma trận user-item. Trong đó, y(i,j) là mức độ quan tâm (ở đây là số sao đã rate) của user thứ i với sản phẩm thứ j mà hệ thống đã thu thập được. Ma trận Y bị khuyết rất nhiều thành phần tương ứng với các giá trị mà hệ thống cần dự đoán.
- R là ma trận rated or not thể hiện việc một user đã rated một item hay chưa. Cụ thể, rij = 1 nếu item thứ i đã được rated bởi user thứ j, ngược lại rij = 0 nếu item thứ i chưa được rated bởi user thứ j.

**Áp dụng mô hình tuyến tính:**

Giả sử rằng ta có thể tìm được một mô hình có thể tính được mức độ quan tâm của mỗi user với mỗi item bằng một hàm tuyến tính:

![](https://images.viblo.asia/bc76b1c7-9846-44d2-a74a-de9ffd2ef827.png)

trong đó, x(m) là vector đặc trưng của item m.

Mục tiêu của chúng ta sẽ là học ra mô hình của user, tức là tìm ra w(n) và b(n).

Xét một user thứ n bất kỳ, nếu ta coi training set là tập hợp các thành phần đã được điền của yn, ta có thể xây dựng hàm mất mát tương tự như sau:

![](https://images.viblo.asia/8ff54aca-aec1-47d4-8f7a-f2d79389a6a8.png)

Trong đó, thành phần thứ hai là regularization term và λ là một tham số dương. Chú ý rằng regularization thường không được áp dụng lên bn. Trong thực hành, trung bình cộng của lỗi thường được dùng, và mất mát nên Ln được viết lại thành:

![](https://images.viblo.asia/c63a45fb-3cb3-431b-b740-96b266c061c7.png)

Trong đó sn là số lượng các items mà user thứ n đã rated. Nói cách khác, sn là tổng các phần tử trên cột thứ n của ma trận rated or not R:

![](https://images.viblo.asia/f15b5d7b-849c-47ef-9f00-0d970189faa4.png)

Vì hàm mục tiêu chỉ phụ thuộc vào các items đã được rated, ta có thể rút gọn nó bằng cách đặt ^yn là sub vector của y được xây dựng bằng cách trích các thành phần khác dấu? ở cột thứ n, tức đã được rated bởi user thứ n trong ma trận Y. Đồng thời, đặt X^n là sub matrix của ma trận feature X, được tạo bằng cách trích các hàng tương ứng với các items đã được rated bởi user thứ n. Khi đó, biểu thức hàm mất mát của mô hình cho user thứ n được viết gọn thành công thức **(*)**:

![](https://images.viblo.asia/c303f6fd-febd-4180-9998-a1a088b3cda7.png)

trong đó, en là vector cột chứa sn phần tử 1.

Đây chính là bài toán Ridge Regression, đã có sẵn trong thư viện [sklearn.linear_model.Ridge](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Ridge.html) của klearn. Ở bài tiếp theo, chúng ta sẽ sử dụng thư viện này để tìm w(n) và b(n) cho mỗi user. Còn bây giờ chúng ta sẽ xét một ví dụ về cách xây dựng mô hình cho mỗi user.

**Ví dụ:**

Xét bài toán: Ta có 5 items, vector đặc trưng của mỗi item được biểu diễn bởi một hàng:

![](https://images.viblo.asia/b6d27edd-ed43-4527-bfcb-7e41f6cacc32.png)

Đồng thời, chúng ta có thông tin về user 5, đã đánh giá các item 1 và 4:

![](https://images.viblo.asia/1d9a3ac6-8bef-450a-96a5-5ee050060f3a.png)

Đầu tiên, tiền xử lý để thu được sub vector:

![](https://images.viblo.asia/377ae360-c28b-430b-9a95-7d6c3ea4658d.png)

Sau đó áp dụng công thức **(*)**, ta sẽ được hàm mất mát:

![](https://images.viblo.asia/cb6c4a4e-1691-4f42-b7b5-b612b6bc8ff7.png)

Cuối cùng, chúng ta có thể sử dụng Stochastic Gradient Descent (SGD), hoặc Mini-batch GD để tìm ra w(5) và b(5).

Ở phần tiếp theo, mình sẽ trình bày ví dụ cụ thể về cách xây dựng một mô hình gợi ý sử dụng content-based. Hẹn gặp lại các bạn ở bài tiếp theo.

Để tìm hiểu sâu hơn, bạn có thể tham khảo thêm các tài liệu và souce code trong các link sau:

[Content-based Recommendation Systems - Vũ Hữu Tiệp](https://machinelearningcoban.com/2017/05/17/contentbasedrecommendersys/)

[Beginners Guide to learn about Content Based Recommender Engines](https://www.analyticsvidhya.com/blog/2015/08/beginners-guide-learn-content-based-recommender-systems/)

[Source code - Demo Movielens - Vũ Hữu Tiệp](https://github.com/tiepvupsu/tiepvupsu.github.io/tree/master/assets/23_contentbasedrecommendersys)