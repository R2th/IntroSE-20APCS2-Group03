GCD là một API cung cấp bởi Apple cho phép bạn quản lý đồng thời các tác vụ một các mượt mà, để tránh tình trạng ứng dụng bị đơ.

# Khi sử dụng GCD có 3 loại hàng đợi
## 1, Main Queue:
Hàng đợi này có mức ưu tiên cao nhất trong tất cả và nó chạy trên luồng chính. Tất cả các cập nhật giao diện người dùng nên được thực hiện trên chuỗi này hoặc nếu không thì sẽ xảy ra hiện tượng chậm trễ và sự cố lạ trong ứng dụng của bạn.

Bạn sử dụng nó đơn giản như thế này:
![](https://images.viblo.asia/d7c01307-c3ea-4c08-b553-c8c1c886a6c4.png)

## 2, Global Queue:
Hàng đợi này được tách thành 4 loại chính và một loại mặc định theo QOS (Quality of Service), từ mức ưu tiên cao nhất đến thấp nhất:

1. userInteractive: Công việc gần như tức thời. Tương tự như chủ đề chính.
2. userInitiated: Công việc gần như tức thời, chẳng hạn như vài giây hoặc ít hơn.
3. default: không nên sử dụng nó thường xuyên, loại sẽ được sử dụng bởi hệ thống.
4. utility: Công việc mất vài giây đến vài phút.
5. background: Công việc cần nhiều thời gian, chẳng hạn như phút hoặc giờ.

Cả hai, utility và background nên được sử dụng cho các hoạt động nặng cần thời gian để không chặn luồng chính. Ví dụ như gọi API, download file nặng...

Bạn chỉ có thể gọi một như sau:
![](https://images.viblo.asia/0d45e123-8788-4e2d-a231-837e8cb6813d.png)

## 3, Custom Queues:
Custom queues là những tiến trình bạn có thể tạo ra và chọn bất cứ thuộc tính QOS gì mình muốn:
![](https://images.viblo.asia/47ac4b8b-b46f-416c-8c23-06f2d39c0d38.png)

## Ví dụ sử dụng các hàng đợi trong thực tế

### Background VS Main
Thông thường bạn thường cần sử dụng các hàng đợi đó cùng nhau. 
Giả sử bạn cần thực hiện một thao tác nặng như tải xuống hình ảnh và sau đó hiển thị hình ảnh này trong imageView. Bạn làm như sau:

![](https://images.viblo.asia/29ca329f-294d-477e-bf97-78ea91e00dd4.png)

Như bạn có thể nhận thấy việc thực hiện thao tác nặng có thể mất nhiều thời gian bên trong một background thread và sau đó hiển thị hình ảnh bên trong một imageView bằng cách sử dụng main thread.

### Async VS Sync
Như bạn đã thấy trong ví dụ trên, việc sử dụng async sau mỗi hàng đợi.
Với GCD, bạn có thể gửi một tác vụ đồng bộ hoặc không đồng bộ. 
- Đồng bộ có nghĩa là không có tác vụ nào khác sẽ bắt đầu cho đến khi hoạt động đồng bộ kết thúc, trong khi 
- Bất đồng bộ sẽ cho phép các tác vụ khác bắt đầu ngay cả khi nó chưa kết thúc. 

Ví dụ:

![](https://images.viblo.asia/1973447b-a25e-48c9-802b-f1b3033c6a1c.png)

![](https://images.viblo.asia/0887681a-73a7-4005-ace6-e12d2f6d8ad2.png)

Lưu ý: trong ví dụ trên cả hai tác vụ đều bất đồng bộ, chúng được thực thi cùng một lúc. 
Tuy nhiên, luồng **userInteractive** có mức độ ưu tiên thực thi cao hơn luồng nền là điều bình thường như đã thảo luận trước đây. 

Bây giờ chúng ta hãy xem nếu task đầu tiên được thực hiện đồng bộ những gì sẽ xảy ra:
![](https://images.viblo.asia/d407d246-ffa7-42b8-ae10-2bff18285611.png)

![](https://images.viblo.asia/1ebd7b8d-f62e-4f78-bc1d-c5ff4b2c26dc.png)

Như bạn có thể thấy mặc dù luồng userInteractive có mức độ ưu tiên cao hơn nhưng nó vẫn được thực thi cho đến khi hoàn thành tác vụ đồng bộ đầu tiên. 

Mặc dù ví dụ trên rất đơn giản, nhưng nó cho thấy rõ cách chương trình hoạt động với hàng đợi chạy đồng bộ và bất đồng bộ. 
Vì vậy bạn nên lưu ý sử dụng đồng bộ trừ khi cần và sử dụng bất đồng bộ trong hầu hết các trường hợp để tránh ứng dụng bị đơ trong quá trình sử dụng.

## Kết luận
Có rất nhiều điều cần biết về việc quản lý các luồng trong ứng dụng của bạn. 
Nhưng điều quan trọng là người mới bắt đầu phải biết rằng bạn không nên thực hiện các quy trình chậm hoặc tốn kém một cách đồng bộ, bạn nên luôn thực hiện chúng trên các luồng ưu tiên thấp (ví dụ: background) và luôn ghi nhớ để thực hiện bất kỳ cập nhật UI nào trên main thread.