### 6. **Enum:**
Ví dụ: 1 switch case cho người mua vé xem phim
![1.png](https://images.viblo.asia/aacf2cf5-136b-47ee-b4a8-bc32367490de.png)

“Adult”, “Child”, “Senior” -> hard code. Các giá trị string cho mỗi trường hợp yêu cầu phải chính xác 100%, làm mất thời gian và khó tránh khỏi sai sót

![carbon.png](https://images.viblo.asia/9b4fab0f-5f8f-422a-a86c-febc5342b709.png)

Bạn sẽ không phải ngồi gõ lần lượt từng trường hợp nữa, mà các trường hợp sẽ lần lượt được highlight ra cho bạn sau dấu ".". Một thay đổi nhỏ nhưng giúp bạn tiết kiệm được rất nhiều thời gian.

### 7. **Nil Coalescing:**
Ví dụ: Viết hàm chọn color

![carbon (1).png](https://images.viblo.asia/7749a9ec-f194-4f5b-8639-eeaa2cd0eceb.png)

Quá dài, thay vào đó:

![carbon (2).png](https://images.viblo.asia/b5200180-ae7f-48dd-897c-624fbc83e5ae.png)

### 8. **Conditional Coalescing:**
Ví dụ: cộng biến số

![carbon (3).png](https://images.viblo.asia/1b4df36d-bdcc-445a-9b60-f2c39e2c5c08.png)

Quá dài, thay vào đó:

![carbon (4).png](https://images.viblo.asia/59d8bca9-56ce-42b6-abe0-4d94bf21e4cf.png)

### 9. **Functional Programming:**
Ví dụ: Tìm kiếm số chẵn trong array

![carbon (5).png](https://images.viblo.asia/1da29149-b600-421b-a45d-c8c0d3c365eb.png)

Thay vì sử dụng vòng lặp for với logic như trên thì chúng ta hoàn toàn có thể sử dụng filter: 

![carbon (7).png](https://images.viblo.asia/ff34006b-98cd-4bdb-a23c-e5f88ff1547e.png)

### 10. **Sử dụng Closure:**
Ví dụ: tính tổng 2 tham số

![carbon (8).png](https://images.viblo.asia/5bb7467e-d536-4844-9304-1c725b824df0.png)

Thay vì khai báo một function thì chúng ta có thể khai báo một biến và chứa trong đó một closure (block) thực thi logic trên

![carbon (9).png](https://images.viblo.asia/6e771fb9-0e3a-413c-92c1-0100b43b9b17.png)