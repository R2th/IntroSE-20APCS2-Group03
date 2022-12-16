# GAN là gì ?

**Note**: *Link toàn bộ series 4 bài về GAN của mình: [Giới thiệu series bài viết về GAN](https://viblo.asia/s/gan-series-0-gioi-thieu-series-bai-viet-ve-gan-DVK2jPErKLj)*

GAN là viết tắt  “generative adversarial network”, hướng tới việc sinh ra dữ liệu mới sau quá trình học. GAN có thể tự sinh ra một khuôn mặt mới, một con người, một đoạn văn, chữ viết, bản nhạc giao hưởng hay những thứ tương tự thế. Thế làm cách nào để GAN học và làm được điều đó, chúng ta cần phải điểm qua một vài khái niệm.

## Discriminative model
Trước đây, hầu hết các mạng đều thuộc dạng  **Discriminative model**, tức trải qua quá trình huấn luyện, model đạt được khả năng **định vị được vị trí** của một điểm dữ liệu trong phân bố dữ liệu (điển hình là bài toán phân loại). Ví dụ: một đứa trẻ được cho xem 1000 ảnh có mèo và 1000 ảnh không mèo (ảnh kèm nhãn có-không). Trải qua quá trình quan sát và học hỏi, đứa trẻ đó sẽ có khả năng phân biệt những ảnh mới xem ảnh nào có, ảnh nào không có mèo. Đó là điển hình cho một "discriminative model". Các bài toán classify, regression, image semantic segmentation, object detection ... bản chất đều liên quan tới "discriminative model".

![](https://images.viblo.asia/124035ab-5681-4e18-8ee6-5de2e3c71fbf.png)
 > nguồn ảnh: https://miro.medium.com


### Generative model
Cũng với ví dụ trên, trải qua sau quá trình học liệu đứa bé có thể tự hình dung ra hình ảnh một con mèo mới nào đó. Việc sinh ra ảnh mới đó là việc của "generative model".

### Kiến trúc GAN
*Note: Để  thống nhất và dễ hiểu, mình sẽ lấy kiểu dữ liệu là ảnh để mô tả thuật toán, các dạng dữ liệu khác như âm thanh, tín hiệu đều tương tự*.

![](https://images.viblo.asia/62b5d181-c206-4fbf-a808-36c7f10f83aa.png)

GAN được kết hợp từ 2 model: generator - G và discriminator - D. GAN giống như 1 trò chơi minimax, trò cảnh sát tội phạm: tội phạm G tạo ra tiền giả, cảnh sát D học cách phân biệt thật giả. Cảnh sát càng cố gắng phân biệt tiền thật-giả thì tội phạm lại dựa vào feedback của cảnh sát để cải thiện khả năng tạo tiền giả của mình, cố gắng khiến cảnh sát phân biệt nhầm.

Thuật toán như sau:
+ B1: Từ một nhiễu z bất kì, G sinh ra fake-image G(z) có kích thước như ảnh thật (ảnh thật là x). Tại lần sinh đầu tiên, G(z) hoàn toàn là ảnh nhiễu, không có bất kì nội dung gì đặc biệt
+ B2: x và G(z) cùng được đưa vào D kèm nhãn đúng sai. Train D để học khả năng phân biệt ảnh thật, ảnh giả. 
+ B3: Đưa G(z) vào D, dựa vào feedback của D trả về, G sẽ cải thiện khả năng fake của mình.
+ B4: Quá trình trên sẽ lặp đi lặp lại như vậy, D dần cải thiện khả năng phân biệt, G dần cải thiện khả năng fake. Đến khi nào D không thể phân biệt được ảnh nào là ảnh do G tạo ra, ảnh nào là x, khi đó quá trình dừng lại.

Input cho G là một nhiễu z, được sinh ngẫu nhiên từ một phân phối xác suất (phổ biến nhất là Gaussian). Kiến trúc GAN phổ biến là DCGAN - Deep Convolution GAN: cả G và D là các mạng Convolution nhiều lớp, sâu như hình dưới đây:
![](https://images.viblo.asia/27269c25-dc53-4f25-ba16-5c583747156e.png)


### Backpropagation
Để train được D, input gồm cả G(z) và x kèm nhãn. Như vậy, mục tiêu của D là maximinze:
![](https://images.viblo.asia/2abd515a-98fa-4db4-95f3-0f22ecb159e8.png)

Để train được G, ta dựa vào D(G(z)). Bước này nhằm mục đích update các weight của G sao cho G(z) có thể đánh lừa được D, khiến D đoán nhầm nhãn của G(z) là y = 1.  G cố gắng minimize:
![](https://images.viblo.asia/3d6484aa-7b7d-40dc-a691-6377caa168ff.png)

Tổng quát lại, D, G là kết quả của quá trình:
![](https://images.viblo.asia/3236d303-e3d3-40f7-aaae-0935d01507e3.png)

Dưới đây là pseudo code minh họa thuật toán. Trong 2 bài viết tiếp theo mình sẽ viết bài hướng dẫn code 2 ứng dụng GAN đơn giản: **sinh ảnh chữ viết tay** (dựa trên tập mnist) và **sinh ra khuôn mặt nhân vật Anime**:
![](https://images.viblo.asia/5f0843b6-5cbf-48f0-b180-ee973e1ad831.png)

### Generator diminished gradient
Trong quá trình train, ta dễ gặp phải vấn đề khi gradient cho G. Thường tại những bước đầu, D rất dễ dàng nhận dạng ảnh fake do G tạo ra. Điều đó khiến cho  V = -log(1 - D(G(z)))  có giá trị xấp xỉ 0. Điều này gây ra hiện tượng gradient vanishing khiến model khó train, khó hội tụ. Để cải thiện,  ta thay đổi công thức 1 chút:
![](https://images.viblo.asia/f42d99cb-3f73-428a-ac3b-1df7fbdba49d.jpeg)

Như vậy, qua bài này ta đã biết thêm những khái niệm về GAN, cách hoạt động và khả năng kì diệu của nó. Từ GAN, người ta đã phát triển hàng trăm thuật toán khác nhau trong nhiều lĩnh vực lí thú. Trước khi chạm tới những thứ cao siêu đó, bạn phải hiểu được GAN cơ bản đã :p . Trong như bài tới, mình sẽ chia sẻ 1 số kinh nghiệm, thủ thuật khi trên GAN, và kèm theo đó là những đoạn code đơn giản về GAN. Cảm ơn đã đọc bài viết :)

**Note**: *Các bài viết được viết trên trang https://viblo.asia , nếu trích dẫn hãy ghi nguồn trang cùng tên tác giả đầy đủ.*