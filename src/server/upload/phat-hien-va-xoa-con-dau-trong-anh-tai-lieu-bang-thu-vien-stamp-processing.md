# Introduction
Trong thời gian gần đây, chúng ta thường nghe đến các  như khái niệm chuyển đổi số hay một bài toán con cuả nó  là số hóa tài liệu   được nhắc đến rất nhiều trên các phương tiện truyền thông đại chúng.  Số hóa tài liệu là quá trình chuyển đổi từ các dạng văn bản, tài liệu vật lý như chữ viết tay, giấy in.. thành những dữ liệu số mà máy tính có thể lưu trữ, đọc hiểu được.  Số hóa tài liệu mang lại rất nhiều lợi ích khác nhau cho một doanh nghiệp:
* Giảm không gian lưu trữ, thời gian truy xuất, tim kiếm tài liệu
*  Sao lưu bảo quản tài liệu, tránh bị mất mát
* Chia sẻ tài liệu một cách nhanh chóng, thuận tiện
* Tăng cường khả năng bảo mật thông tin 
* Nâng cao hiệu quả công việc do tập hợp các thông tin đưa đến một cách nhanh chóng và kịp thời. 
* Cắt giảm chi phí tối đa cho việc quản lý, vận hành
*  Chỉnh sửa và tái sử dụng tài liệu, linh hoạt trong việc chuyển đổi sang các định  dạng tài liệu số khác nhau (docx, xlsx, ...).

Trong một hệ thống số hóa tài liệu thì việc nhận diện và phân tích cấu trúc văn bản là sự tổng hợp của một số bài toán tương đối phức tạp. Cụ thể hơn, trong bài toán phân tích cấu trúc văn bản, ta lại có các bài toán con là  text detection và OCR. Để nhận diện và phần tích cấu trúc văn bản một cách chính xác nhất thì việc phát hiện và loại bỏ các đối tượng nhiễu (con dấu công ty, watermark, ... ) nhằm nâng cao chất lượng hình ảnh đầu vào cho các mô hình text detection và OCR.

![](https://images.viblo.asia/ec1f50fc-78bf-4c30-9d65-8d8a2ebd9468.jpg)

Trong bài viết này, mình sẽ giới thiệu cho các bạn một package do [ Sun* AI Research Team](https://sun-asterisk.ai/) phát triển để giải quyết bài toán này. Các bạn cũng có thể tham kháo một package khác cho bài toán tái cấu trúc bảng của team tại bài viết [này](https://viblo.asia/p/thu-vien-table-reconstruction-va-bai-toan-tai-cau-truc-bang-QpmleMGDlrd). 

# Package Stamp Processing. 
`stamp_processing` là một package mã nguồn mở sử dụng kỹ thuật deep learning để phát hiện và xóa con dấu khỏi ảnh văn bản. Package được xây dựng dựa trên mô hình [Yolov5](https://github.com/ultralytics/yolov5) để phát hiện con dấu và  Unet   trong thư viện [fastai](https://github.com/fastai/fastai)  cho mô hình xóa con dấu.

Để cài đặt thư viện, các bạn chỉ cần 1 câu lệnh

```python
 pip install stamp_processing
 ```
 # Feature
 Package stamp_processing cung cấp 2 chức năng chính
 * Stamp detection
 * Stamp removal: sử dụng kỹ thuật image-to-image translation  để xóa con dấu trong ảnh
 Cả 2 mô hình được train trên bộ dữ liệu nhân tạo và dữ liệu gán nhãn 
 ## Stamp detection
 Trong package này, mô hình sử dụng để phát hiện con dấu là Yolov5. Bộ dữ liệu được sử dụng là kết kết hợp giữa dữ liệu nhân tạo và dữ liệu tự gán nhãn. Kết quả phát hiện con dấu trên ảnh sử dụng mô hình yolov5:
 
 ![](https://images.viblo.asia/b968c617-0977-4dde-8d91-fa7e191b344e.png)

 ## Stamp removal
 Có 2 phương pháp có thể sử dụng để xóa con dấu trong ảnh. 
 1.  Cách 1: Nếu con dấu có màu thì có thể xử lý bằng opencv. Các bạn có thể tham khảo bài viết [này](https://viblo.asia/p/remove-watermark-seal-in-images-with-opencv-RQqKLbDNl7z)
 2.  Cách 2; Sử dụng deep learning hồi quy ra ảnh không có con dấu. Package sẽ sử dụng cách tiếp cận này.
 ### Mô hình Unet
 Các kiến trúc  được dùng trong các bài toán  image-to-image translation thường là các kiến trúc dạng encoder - decoder. Trong package này, mình sử dụng mô hình [Dynamic Unet](https://docs.fast.ai/vision.models.unet.html) được cung cấp trong mô thư viện [fastai](https://github.com/fastai/fastai). Về mô hình unet thì mô hình sẽ bao gồm 2 phần 
 * Phần encoder: chỉ bao gồm các lớp convolution có nhiệm vụ downsample ảnh đầu vào và trích xuất đặc trưng. Thông thường phần encoder sẽ là các kiến trúc như resnet hay vgg. 
* Phần decoder:  mục tiêu của phần giải mã là kết hợp đặc trưng của nhiều tầng khác nhau của mạng encoder để tăng cường thông tin biểu diễn đồng thời để tạo ra ảnh mới theo yêu cầu của bài toán.

 ![](https://images.viblo.asia/cd895ced-957c-47a8-ac73-9da8969c2ccb.png)
 
 ### Training 
 Quá trình training mô hình được lấy ý tưởng từ kỹ thuật NoGAN trong project [DeOldify](https://github.com/jantic/DeOldify). Chi tiết về kỹ thuật này, các bạn có thể tham khảo repo trên. Tóm tắt 1 số kỹ thuật:
 * Sử dụng lớp [self-attention](https://arxiv.org/abs/1805.08318)
 * Perceptual loss function https://arxiv.org/abs/1603.08155
 
 # Outro
 Xin cảm ơn mọi người đã đọc bài viết. Hiện này, package `stamp_processing` đã ra mắt phiên bản đầu tiên nên vẫn còn nhiều điểm chưa hoàn thiện. Team rất mong nhận được ý kiến của các bạn để có thể tiếp tục hoàn thiện package.  Các bạn có thể liên hệ tới chúng mình qua email  sun.converter.team@gmail.com. [ Sun* AI Research Team](https://sun-asterisk.ai/) rất hân hạnh khi được hợp tác cùng mọi người.  
 
 # References
 * https://github.com/jantic/DeOldify
 * https://github.com/fastai/fastai
 * https://github.com/ultralytics/yolov5
 * [ Perceptual Losses for Real-Time Style Transfer and Super-Resolution](https://arxiv.org/abs/1603.08155)