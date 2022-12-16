Chào mọi người, hôm nay mình sẽ viết bài hướng dẫn cách viết một ứng dụng có thể gửi mail và đính kèm file csv. Hiện nay việc chia sẻ file hoặc thu thập dữ liệu ngày càng phổ biến trong việc phát triển ứng dụng di động nói chung. Tuy nhiên để thực hiện một cách nhanh chóng và chính xác thì mình đã mất một chút thời gian để tìm hiểu. Đó cũng chính là lý do để mình viết bài chia sẻ này, hi vọng sẽ tiết kiệm thời gian cho các bạn ^^.
Ngôn ngữ swift có hỗ trợ việc gửi mail thông qua một thư viện có sẵn đó là MessageUI. Tại đó, chúng ta có thể viết ra một function gửi Mail tới một địa chỉ nhập bằng tay, bằng cách gọi và show lên MFMailComposeController. Chúng ta cùng đi vào chi tiết nhé:

# 1. Tạo project 

Bước đơn giản đầu tiên, hãy tạo 1 ứng dụng có 1 button ở giữa màn hình. Khi bấm lên thì sẽ show lên màn hình gửi mail

![](https://images.viblo.asia/025a9344-2bae-4feb-afec-6ef3360b1c92.png)

Các bạn có thể tham khảo cách tạo project tại [đây](https://codecute.com/ios/huong-dan-su-dung-xcode-va-tao-project-xcode.html)

# 2. Import thư viện, khởi tạo data

Tại viewcontroller, chúng ta thêm thư viện MesageUI. Đồng thời khởi tạo 1 biến Data, sẽ làm file đính kém sau này. Và đừng quên thừa kế MFMailComposeViewControllerDelegate.

![](https://images.viblo.asia/9ee3f839-0f26-4237-bb67-7eda891e97c1.png)
# 3. Tạo fìle CSV

Đây chính là file đính kèm. Chúng ta tạo theo format CSV làm ví dụ. Với kích thước tối đa lên tới 15M. Tuy nhiên ở ví dụ này chúng ta sẽ tạo 1 file đơn giản nhất

![](https://images.viblo.asia/d8b03b53-1a2c-4126-bc6b-78f003d30b2b.png)

Bây giờ biến data mà chúng ta tạo ban đầu đã có giá trị. Tiếp theo là bước quan trọng nhất: Tạo màn gửi mail

# 4. Tạo MFMailComposeViewController

Mình sẽ tạo riêng hẳn 1 function để khởi tạo và setup. Lưu ý rằng file csv cũng sẽ phải được đính kèm luôn trong bước này. Bằng cách gọi:

```
//set attachment
            emailController.addAttachmentData(data!, mimeType: "text/csv", fileName: "Sample.csv")
```
Hàm chi tiết như sau:

![](https://images.viblo.asia/f9a155c4-3bb5-4693-bddc-7ee01b251564.png)

# 5. Handle Show MFMailComposeViewController

Bước này rất đơn giản. Tại hàm action của button tạo ban đầu chúng ta viết như sau:

![](https://images.viblo.asia/a8545e15-bfdd-4742-aed3-e4acc1e13679.png)

# 6. Kết quả

Chạy app lên máy thật chúng ta có:

![](https://images.viblo.asia/51174d50-229e-4c4f-bf59-13d85d49d228.PNG)

Click vào button Share, màn MFMailComposeViewController sẽ hiện ra

![](https://images.viblo.asia/663de189-e043-4be9-ba4e-08df9b5b5cdc.PNG)

Tới đây, chỉ cần nhập Mail và bấm gửi:

![](https://images.viblo.asia/416bc569-a22e-4e43-a803-56c2d4bec67f.PNG)

Và thành quả khi check mail:

![](https://images.viblo.asia/16cd9ec8-ca9c-4591-b8ba-50f9463f6e30.png)
![](https://images.viblo.asia/caf1642a-5608-421d-858b-38b6f66f7a44.png)

Bài viết tới đây là kết thúc. Hi vọng ít nhiều sẽ giúp được các bạn giải quyết vấn đề của mình. Cám ơn các bạn đã đọc bài viết ^^