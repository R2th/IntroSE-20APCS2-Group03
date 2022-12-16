Qua 1 kì học về môn cơ sở dữ liệu đa phương tiện, mình xin ngọa muội chia sẻ về bài tập lớn của mình đã làm. Đầu tiên là chia sẻ, sau đó cũng là nhận lời góp ý từ các bạn đã ghé qua đọc nhé!
# 1. Đầu tiên mình sẽ giới thiệu sơ qua về thuật toán HOG(histogram oriented gradient 
   - HOG là viết tắt của Histogram of Oriented Gradient - một loại “feature descriptor”. Mục đích của “feature descriptor” là trừu tượng hóa đối tượng bằng cách trích xuất ra những đặc trưng của đối tượng đó và bỏ đi những thông tin không hữu ích. Vì vậy, HOG được sử dụng chủ yếu để mô tả hình dạng và sự xuất hiện của một đối tượng trong ảnh. 
   - Bản chất của phương pháp HOG là sử dụng thông tin về sự phân bố của các cường độ gradient (intensity gradient) hoặc của hướng biên (edge directins) để mô tả các đối tượng cục bộ trong ảnh. Các toán tử HOG được cài đặt bằng cách chia nhỏ một bức ảnh thành các vùng con, được gọi là “tế bào” (cells) và với mỗi cell, ta sẽ tính toán một histogram về các hướng của gradients cho các điểm nằm trong cell. Ghép các histogram lại với nhau ta sẽ có một biểu diễn cho bức ảnh ban đầu. Để tăng cường hiệu năng nhận dạng, các histogram cục bộ có thể được chuẩn hóa về độ tương phản bằng cách tính một ngưỡng cường độ trong một vùng lớn hơn cell, gọi là các khối (blocks) và sử dụng giá trị ngưỡng đó để chuẩn hóa tất cả các cell trong khối. Kết quả sau bước chuẩn hóa sẽ là một vector đặc trưng có tính bất biến cao hơn đối với các thay đổi về điều kiện ánh sáng.
* Nếu các bạn muốn tìm hiểu kỹ hơn về thuật toán này thì tham khảo 2 link sau đây:
 [Link](https://viblo.asia/p/tim-hieu-ve-phuong-phap-mo-ta-dac-trung-hog-histogram-of-oriented-gradients-V3m5WAwxZO7)
 [Link](https://viblo.asia/p/tim-hieu-ve-hoghistogram-of-oriented-gradients-m68Z0wL6KkG)
# 2. Giải thích thuật toán mà mình đã thực hiện
##    - Tiền xử lý dữ liệu
      - Loại bỏ nhiều nhất nền trắng của ảnh, đưa hết các ảnh về cùng kích thước, trong bài của mình là kích thước 512x512
   ![](https://images.viblo.asia/0876f52b-606a-4c44-9b7f-08a210fe7f98.png)
##    - Chuyển đổi kiểu dữ liệu và tạo viền ảnh 1 pixel xung quanh
    ![](https://images.viblo.asia/3713b5e1-26e4-44ed-b809-2b4c38a4fc14.png)
##    - Tính Gradient
       - Cách tính gradient đơn giản là nhân chập ma trận ảnh với các ma trận tương ứng, giả dụ như Dx = [-1, 0, 1], Dy = [-1, 0, 1] 
       - Sau khi được 2 ma trận theo 2 trục Ix và Iy thì ma trận cường độ G=sqrt(Ix2 + Iy2 ), hướng theo từng trục arctan(dy /dx)
       ![](https://images.viblo.asia/7894e68a-28f6-404a-8f0c-87783a9ae388.png)
##    - Tính vector đặc trưng cho từng ô cell
       - Để tính toán vector đặc trưng cho từng cell
       - Giá trị bin được định lượng bởi tổng cường độ biến thiên của các pixels thuộc về bin đó. Sau khi tính toán đặc trưng ô, ta sẽ nối các vector đặc trưng ô để thu được vector đặc trưng khối
       - Tiếp theo, tiến hành tính toán đặc trưng HOG tại mỗi cell sử dụng không gian hướng 9 bin, trường hợp “unsigned-HOG”. Hướng gradient sẽ chạy trong khoảng 0 độ đến 180 độ, trung bình 20 độ mỗi bin.
       - Tại mỗi cell, xây dựng một biểu đồ cường độ gradient bằng cách vote các pixel vào biểu đồ. Trọng số vote của mỗi pixel phụ thuộc hướng và cường độ gradient (được tính toán từ bước 2) của pixel đó
       ![](https://images.viblo.asia/4934c370-8bf7-43c3-9a48-b5385743518e.png)
       ![](https://images.viblo.asia/87a966a9-ef52-4e67-97ba-9f5d08a13c15.png)
       ![](https://images.viblo.asia/27ac5604-a1a2-4475-8ba7-841089469b17.png)
##    - Kết hợp 4 cell thành 1 block(16x16)  
      ![](https://images.viblo.asia/7c4249e9-ed7a-4474-b08e-f93fdcb51604.png)
##    - Chuẩn hóa vector của block
        - Để tăng cường hiệu năng nhận dạng, các histogram cục bộ sẽ được chuẩn hóa về độ tương phản bằng cách tính một ngưỡng cường độ trong một khối và sử dụng giá trị đó để chuẩn hóa tất cả các ô trong khối (block). Kết quả sau bước chuẩn hóa sẽ là một vector đặc trưng có tính bất biến cao hơn đối với các thay đổi về điều kiện ánh sáng 
        ![](https://images.viblo.asia/5f904515-faaa-420d-ab15-a7d9c2504cb8.png)
##    -  Đưa ra vector đặc trưng HOG của ảnh bằng cách nối các vector của các Block lại với nhau
        - Ví dụ đối với ảnh 64 x 128 chia thành các block 16x16 chồng nhau, sẽ có 7 block ngang và 15 block dọc, nên sẽ có 7x15=105 blocks. Mỗi block gồm 4 cell. Khi áp dụng biểu đồ 9-bin cho mỗi cell, mỗi block sẽ được đại diện bởi một vector có kích thước 36x1. Vì vậy, khi nối tất cả các vector trong một block lại với nhau, ta sẽ thu được vector đặc trưng HOG của ảnh có kích thước 36x1x105 = 3780x1. 
        ![](https://images.viblo.asia/21f865ce-0d2b-46a8-8925-01c6dba14312.png)
   Source github: [Link](https://github.com/taduyhieu/csdl_da_phuong_tien)