Là một android developer. Chắc hẳn bạn không xa lạ vì với ConstraintLayout. Và mỗi khi bạn vào đọc doc của Google về 1 layout khác cũng sẽ nhìn thấy dòng
> Note: For better performance and tooling support, you should instead build your layout with ConstraintLayout.

Quả thật ConstraintLayout có thể làm được mọi layout phức tạp mà bạn muốn, tuy nhiên nó lại không phải lúc nào cũng cho hiệu năng tốt nhất. Bài viết này mình sẽ đưa ra một vài ví dụ về điều đó

Thiết bị test mà mình sử dụng là Galaxy S7. Chúng ta sẽ hiển thị ra thời gian của mỗi layout khi hiển thị ở đơn vị nanosecond

### Layout với 1 view ở giữa màn hình

![](https://images.viblo.asia/800f7fa6-a8c4-4061-9e10-f161bafadebb.jpg)

Và đây là kết quả :

```
CONSTRAINT:	 37576562
LINEAR:	 7119270
RELATIVE:	 7770053
```

Ồ. Có vẻ trong trường hợp này sử dụng Constraint không được max ping cho lắm nhỉ. Relaytive và Linear cho kết quả tương đối giống nhau. Chúng ta hãy thử trong trường hợp layout phức tạp hơn 1 chút xem sao.

### Layout với 2 view ở 2 đầu
Ở đây chúng ta chỉ so sánh Relaytive và Constraint.

![](https://images.viblo.asia/d24872cb-e52f-482d-be1f-d266072e1781.jpg)

Kết quả:

```
CONSTRAINT:	 36346302
RELATIVE:	 27595573
```

Constraint vẫn cho kết quả chậm hơn. Thêm 1 layout khá quen thuộc với mọi người xem sao

### Layout 1 item music trên zing mp3 (ở đây mình vẽ tương đối thôi nhé :v)

![](https://images.viblo.asia/e66995d1-7aa9-4fdb-992d-d069fcd555bf.jpg)

Kết quả đê:

CONSTRAINT:	 111099479
RELATIVE:	 30044635
Combo RELATIVE + LINEAR:	 101037656

Constranit cho kết quả tương đối khi mình dùng kết hợp Relaytive và Linear để căn đều view. Đến đây có vẻ khả quan hơn chút rồi nhỉ. Mình sẽ thử 1 layout cuối cùng,  phức tạp mà rất quen thuộc mỗi khi bạn bắt đầu học android


### Layout calculator

![](https://images.viblo.asia/e9d264ea-ce81-47d7-a468-b2b71662950e.jpg)

Kết quả đê:

```
CONSTRAINT:	 282061250
LINEAR:	 152019792
```

Linear vẫn nhanh hơn khơ khớ =))

Như vậy trên đây mình có so sánh hiệu năng của ConstraintLayout với các layout khác. Đương nhiên mình vẫn không phủ nhận sự tiện lợi của ConstraintLayout (mình cũng thích kéo thả :v). Nhưng thông qua bài viết này mình mong bạn có thể lựa chọn đúng layout phù hợp với ứng dụng của mình

TÀI LIỆU THAM KHẢO:
https://android.jlelse.eu/constraint-layout-performance-870e5f238100