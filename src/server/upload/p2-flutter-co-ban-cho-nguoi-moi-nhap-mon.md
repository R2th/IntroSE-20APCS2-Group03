Như bài trước mình cũng đã nói sơ về **StatelessWidget** và **StatefulWidget** thì hôm nay mình sẽ nói về vòng đời (**LifeCycle**) của **StatefulWidget** và **StatelessWidget** và không dài dòng như phần trước mình sẽ vào thẳng chủ đề chính.

**StatelessWidget**

- Như bài trước StatelessWidget là 1 Widget tĩnh không có trạng thái (State) vì thế nó sẽ không chấp nhận có sự thay đổi bên trong nên vòng đời nó khá ngắn gọn như sau:

![](https://images.viblo.asia/22101ded-3c59-40ab-b19d-65dab6060077.jpg)

**StatefulWidget**

- Với StatefulWidget là 1 Widget động có trạng thái (State) vì thế nó sẽ chấp nhận sự thay đổi bên trong và vòng đời nó như sau:

![image.png](https://images.viblo.asia/e551c784-3556-48fd-9b2a-9913c4a394f0.png)

**1. createState()**: Khi một StatefulWidget được tạo thì nó sẽ được gọi đầu tiên và cũng là bắt buộc. Vì sao mình lại nói bắt buộc?

![image.png](https://images.viblo.asia/12eb322e-2366-477c-8d88-e72c52f09ebe.png)

 - Bạn cũng có thể thấy để sử dụng được Class _MyAppState thì với StatefulWidget bạn bắc buộc phải khởi tạo createState() cho nó.

**2. mounted == true**: nói nom na là nó dùng để xác định và đảm bảo trạng thái (State) tồn tại trước khi gọi setState().

**3. initState()**: nó sẽ là phương thức đầu tiên được gọi và chỉ gọi đúng 1 lần khi Widget được tạo.

**4. didChangeDependencies()**: ngay sau initState() thì đây là phương thức tiếp theo được gọi. Nó cũng sẽ được gọi bất cứ khi nào một object mà widget này phụ thuộc vào dữ liệu từ nó được gọi. Ví dụ: nếu nó dựa vào một InheritedWidget, InheritedWidget sẽ được cập nhật.

**5. build()**: Phương thức này được gọi để render một Widget. Bắt buộc phải @override và trả về một Widget.

**6. didUpdateWidget()**: nom na theo cách hiểu của mình là nó nhận biết được sự thay đổi của Widget. VD mình dùng 1 class StatefulWidget lồng trong 1 Widget:


| Không dùng didUpdateWidget()|  Dùng didUpdateWidget() |
| -------- | -------- |
| ![not.gif](https://images.viblo.asia/50b38dc3-2652-4dde-a43d-5ae4a4552a2f.gif)   | ![yes.gif](https://images.viblo.asia/9bca36c0-4b8e-4443-90e5-61ac327f6c69.gif)     |

**Code mẫu:**

| Không dùng didUpdateWidget() |  Dùng didUpdateWidget()  | 
| -------- | -------- | -------- |
|    ![image.png](https://images.viblo.asia/1b67c244-77c8-4ebd-b7c2-7b44089b024c.png)|![image.png](https://images.viblo.asia/bc1f6982-c236-49c9-865f-c360158d191a.png)     |

**7. setState()**: cũng là nhận biết sự thay đổi của Widget nhưng **setState()**  chỉ sử dụng được khi bạn thực hiện thay đổi trong 1 class StatefulWidget không thể  sử dụng 1 class StatefulWidget lồng trong 1 Widget. 

**8. deactivate()**:  hầu như mình không sử dụng phương thức này nên mình chỉ hiểu sơ là khi bạn thực hiện phương thức này thì  **phần tử (Element)** sẽ tạm thời bị ẩn hoặc mất đi và bạn có thể gọi và sử dụng lại **element** đó

**9. dispose()** : khác với **deactivate()** thì khi sử dụng phương thức này thì **phần tử (Element)** sẽ bị xóa vĩnh viễn khỏi **Element tree**

**10. mount là false**: Đối tượng trạng thái **(State)** sẽ không  thể lặp lại và  lỗi sẽ được ném khi bạn gọi setState được gọi.

Đó là kiến thức cơ bản của mình. Cảm ơn các bạn đã xem.