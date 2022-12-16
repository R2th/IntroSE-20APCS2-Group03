## Giới thiệu
Xin chào các bạn, mình có đọc được một bài viết chia sẻ về FlexBox Cheat Sheets rất đầy đủ và dễ hiểu, mình chia sẻ lại ở bài viết này nhé.

## Kiến trúc FlexBox
FlexBox có thể chỉ định những items ở trong hiển thị theo trục chính (**Main Axis**) hoặc trục chéo (**Cross Axis**) vuông góc với trục chính.

![](https://images.viblo.asia/0b5956e8-8226-4d5a-9841-cb3bd25988c3.png)

## Các thuộc tính của FlexBox
![](https://images.viblo.asia/223dee75-2b0b-4661-9bd8-22f4a10b8866.png)

### flex-direction
Thuộc tính này dàn các items theo chiều ngang
![](https://images.viblo.asia/df10b89d-829c-4f51-9fd0-fd479f01dfdb.png)

hoặc theo chiều dọc
![](https://images.viblo.asia/2a0adbfb-e444-43b0-965b-3f09fbb667de.png)

### justify-content
Thuộc tính này sắp xếp các items theo trục **main axis**

![](https://images.viblo.asia/de647038-a380-44ae-af2d-89133826705e.png)

![](https://images.viblo.asia/1e723f8f-e475-42dd-a849-ed8e3ee70e5c.png)

### align-content
Thuộc tính này sử dụng để căn chỉnh khoảng cách các item bên trong container dọc theo trục **cross axis**, chiều ngang hoặc chiều dọc tùy thuộc vào flex-direction.

![](https://images.viblo.asia/65790bff-287b-49aa-bc49-9bdb7e8bfcc3.png)

![](https://images.viblo.asia/906be31f-cf99-4e49-9ffd-88f0de2a4494.png)

### align-items
Thuộc tính này sử dụng để điều chỉnh vị trí bắt đầu và căn chỉnh các item bên trong container dọc theo trục **cross axis**, chiều ngang hoặc chiều dọc tùy thuộc vào flex-direction.

![](https://images.viblo.asia/5ab44cd8-039e-4484-affc-e2c309013d58.png)

### align-self
Thuộc tính này có tác dụng tương tự như align-items của phần container nhưng sử dụng riêng cho từng item, bạn có thể dùng nó để đặt lại vị trí cho một số item mà align-items đã quy định.
![](https://images.viblo.asia/c38f5512-1768-41a9-8e71-cb4eb34e4e62.png)

### flex - grow | shrink | wrap
**flex-grow:** cho phép các phần tử giãn theo độ rộng của container.

**flex-shrink:** ngược lại với thuộc tính flex-grow ở trên, nó không giãn ra mà lại co lại khi chúng ta thay đổi độ rộng của container.

**flex-wrap:** điều chỉnh xuống dòng trong container.

![](https://images.viblo.asia/f1b54953-0fec-4245-8098-e9ed7097aff3.png)

![](https://images.viblo.asia/e13d3d4c-84e5-493d-8abe-f1750fcc85f1.png)

## Cách viết tắt
**flex:** Kết hợp flex-grow, flex-shrink và flex-basis.

![](https://images.viblo.asia/a89a2a2b-7082-4e2e-9d46-e6ce2e21a58c.png)


**flex-flow:** Kết hợp flex-direction và flex-wrap.

![](https://images.viblo.asia/cc2e7173-cf0e-45b1-a411-f3f4bbc45bbd.png)

## Kết luận
Hi vọng bài viết này sẽ giúp bạn làm hiểu và áp dụng FlexBox một cách trơn chu, cảm ơn :).