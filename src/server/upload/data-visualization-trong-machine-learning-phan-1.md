Chào mọi người! Trong phần mở đầu của series bài về **Data Visualization trong Machine Learning** mình sẽ giới thiệu các vấn đề bao gồm: Data Visualization là gì? Sử dụng Data Visualization trong machine learning và một số dạng biểu đồ thường gặp trong machine learning, hi vọng sau phần đầu tiên này mọi người sẽ có được cái nhìn cơ bản về Data Visualization nói chung và Data Visualization trong Machine Learning nói riêng.

## Data Visualization là gì?
- **Data Visualization** (hay mô hình hóa dữ liệu) là việc mô tả dữ liệu một cách đơn giản nhất dưới dạng các hình ảnh trực quan như bảng, biểu đồ, đồ thị...
## Tại sao cần Data Visualization?
- Các nghiên cứu khoa học chỉ ra rằng, con người phản ứng với hình ảnh tốt hơn rất nhiều so với các dạng trình bày khác như ký hiệu, chữ viết, con số...
- Một biểu đồ đơn giản cũng có thể biểu diễn thay thế cho rất nhiều dữ liệu.
- Biểu diễn dữ liệu bằng hình ảnh giúp người dùng dễ dàng nhận biết được xu hướng, sự phân bố, sự tương quan giữa các đặc tính của dữ liệu.
- Một biểu đồ tốt có thể giúp những người không cần có kiến thức về chuyên môn, kỹ thuật cũng có thể nắm bắt được những yếu tố cơ bản của dữ liệu.

![](https://images.viblo.asia/6ba29395-88df-4bc0-bfe0-73b3178d4e6c.png)

## Data visualization trong Machine learning
- **Data Visualization** là một bước quan trọng trong giai đoạn tiền xử lý dữ liệu để xây dựng một mô hình học máy hiệu quả.
- **Data Visualization** giúp hiểu rõ hơn về dữ liệu đầu vào bao gồm: sự phân bố dữ liệu, đặc tính và sự tương quan của các feature, trực quan các dữ liệu bị nhiễu, khuyết thiếu… Những sự hiểu biết này giúp ích rất lớn trong quá trình lựa chọn và traning mô hình.
- **Data Visualization** thể hiện trực quan nhất các kết quả mô hình, đặc biệt trong các trường hợp cần so sánh kết quả, đánh giá thuật toán hoặc xây dựng các tài liệu business.
## Data Visualization được sử dụng trong những giai đoạn nào của một bài toán machine learning?
- **Giai đoạn tiền xử lý dữ liệu:** Trong giai đoạn này, việc mô hình hóa dữ liệu cung cấp các hiểu biết cơ bản về dữ liệu đầu vào mà chúng ta đang có như sự phân bố, sự khuyết thiếu, độ nhiễu, các giá trị ngoại lai...
- **Giai đoạn trích chọn đặc trưng:** Mô hình hóa dữ liệu ở giai đoạn này thường kết hợp với các thuật toán ranking/selection feature để đưa ra các biểu đồ đánh giá, so sánh, các bảng score cho từng feature từ đó có thể tính toán được sự phù hợp của feature đối với thuật toán, số lượng feature tối ưu...
- **Giai đoạn đánh giá mô hình:** Đây là giai đoạn mà việc mô hình hóa dữ liệu được sử dụng nhiều nhất giúp thể hiện kết quả của mô hình học máy, so sánh kết quả giữa các mô hình học máy với nhau, kết quả của quá trình parameter tunning... Đặc biệt việc mô hình hóa dữ liệu trong giai đoạn này còn phục vụ cho quá trình xây dựng các tài liệu business, maketing cho sản phẩm. 
## Một số dạng biểu đồ thường gặp
### 1. Biểu đồ đường (Line Plot)
- Line plot thường được sử dụng để biểu diễn dữ liệu có tính liên tục.
- Trục x đại diện cho khoảng thời gian quan sát dữ liệu, trục y thể hiện giá trị của dữ liệu.

![](https://images.viblo.asia/e1375a50-18f8-48b0-b3bd-c34517dbcf90.png)

### 2. Biểu đồ thanh (Bar Chart)
- Bar chart thường sử dụng để biểu diễn số lượng tương đối cho các categories.
- Trục x đại diện cho các categories, trục y thể hiện giá trị của categories tương ứng.

![](https://images.viblo.asia/58537965-de88-43e7-9232-e99bd2ecbe4b.png)
### 3. Biểu đồ dạng Histogram Plot
- Histogram Plot thường được sử dụng để biểu diễn sự phân bố của một mẫu dữ liệu.
- Trục x thể hiện tuần suất hoặc giá trị của các cụm giá trị của mẫu dữ liệu, trục y thể hiện các cụm giá trị của mẫu dữ liệu.

![](https://images.viblo.asia/3d6100ab-4d4b-465c-8ac4-6833cded40d7.png)
### 4. Biểu đồ dạng hộp (Box Plot)
- Box Plot thường được sử dụng để biểu diễn tóm tắt sự phân bố của các mẫu dữ liệu.
- Trục x thể hiện mẫu dữ liệu có thể có nhiều mẫu dữ liệu đặt cạnh nhau, trục y thể hiện giá trị cho mẫu dữ liệu tương ứng, trong đó hình hộp là thể hiện cho khoảng 50% giá trị của mẫu, bắt đầu từ điểm 25% và kết thúc ở điểm 75%.

![](https://images.viblo.asia/00ef4f2b-6f9a-43df-928b-052a46b38df7.png)
### 5. Biểu đồ phân tán (Scatter Plot)
- Scatter Plot thường được sử dụng để biểu diễn tóm tắt sự phân bố của một hoặc nhiều cụm mẫu dữ liệu. Các điểm dữ liệu là sự kết hợp của 2 đặc trưng ở trục x - y.
- Trục x thể hiện giá trị của đặc trưng thứ nhất, trục y thể  hiện giá trị của đặc trưng còn lại.

![](https://images.viblo.asia/c0dfc21b-1f7f-4f75-82bb-9e072ad602bf.png)


Trong phần tiếp theo của series mình sẽ giới thiệu với mọi người một số dạng biểu đồ cụ thể và cách cơ bản nhất để mô hình hóa data đầu vào với Python và Jupyter Notebook.