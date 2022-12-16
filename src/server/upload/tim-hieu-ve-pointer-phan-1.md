**Giới Thiệu**<br>
Từ trước đến nay khi khai báo 1 biến, thông thường chúng ta sẽ quan tâm đến GIÁ TRỊ của biến đó.<br>
Ví Dụ 

   ![](https://images.viblo.asia/42575209-57f3-4362-890b-081214e91089.png)

Trong đoạn code trên, ta cần tính tổng của x và y. Như vậy cái mà ta quan tâm là GIÁ TRỊ của biến x, biến y và biến tổng.<br>
Ngoài ra ta không cần quan tâm cái gì khác. Thông thường khi học các ngôn ngữ lập trình ta đều nghĩ như vậy.<br>
Tuy nhiên trong ngôn ngữ C/C++, nó chuyên sâu hơn. Bạn nên nhớ 1 điều quan trọng:<br>
Một biến có 2 tính chất : <br>
        - Giá Trị.<br>
        - Địa chỉ của biến đó.<br>
Từ xưa đến nay ta 99.99% quan tâm tính chất đầu tiên mà bỏ sót tính chất thứ 2: ĐỊA CHỈ của biến.<br>
Bạn thử nhớ lại lệnh scanf xem.<br>

![](https://images.viblo.asia/5676b03c-cb06-4d60-8b88-105eaa229c9c.png)

Toán tử & có tác dụng lấy địa chỉ của biến. Vì vậy mà &x sẽ trả về địa chỉ của biến x.<br>
Lệnh scanf nhận vào ĐỊA CHỈ của biến x.<br>
Bây giờ ta xem thử địa chỉ của biến có giá trị là bao nhiêu ?<br>

![](https://images.viblo.asia/c8dcad5a-5f62-451a-a4ed-ae83afb00844.png)

Chạy thử chương trình:<br>

![](https://images.viblo.asia/da0e1841-ea5e-41b6-b55c-f3bfeb580ee2.png)

**Poniter (Con trỏ)**<br>

![](https://images.viblo.asia/fe7c69a5-5f08-4ac7-a4f3-696db88da627.png)

Chạy thử chương trình:<br>

![](https://images.viblo.asia/ee903888-c597-4e36-9a79-15f5bfd52343.png)

Bạn có thấy điều gì không ??? p là biến có kiểu dữ liệu int*.<br>
Ta gán p = &x, điều này có nghĩa là gì ?<br>
Ta đang có nhu cầu dùng biến p để LƯU ĐỊA CHỈ của biến x.<br>
Vì vậy nên: giá trị của p cũng chính là địa chỉ của biến x.<br>
Ta nói rằng: p là con trỏ. Đó là lý do con trỏ ra đời: con trỏ giúp lưu trữ địa chỉ của biến, mở<br>
rộng ra là nó lưu trữ địa chỉ trên bộ nhớ RAM.<br>
*Vậy con trỏ dùng để làm gì ???????*<br>

![](https://images.viblo.asia/27ef52db-9723-45fb-abe5-b7d2a5b43dae.png)

Chạy thử chương trình:<br>

![](https://images.viblo.asia/c22d668c-b7c6-4781-9680-8bba31622e17.png)

Rõ ràng ta đâu có câu lệnh gán x = 21 nào đâu, nhưng tại sao vẫn in ra x = 21 thế ?<br>
Câu lệnh *p = 21 hoàn toàn tương đương lệnh gán x = 21.<br>
Thông qua con trỏ p, bạn đã gián tiếp thay đổi giá trị của x.<br>
Có được con trỏ p, bạn có thể gián tiếp điều khiển biến x.<br>
Không cần biết chủ nhà là ai, chỉ cần biết địa chỉ của căn nhà là bạn tùy ý quyết định số
phận căn nhà, biết được địa chỉ nhà thì bạn có thể đập phá nó, xây thêm 1 tầng nữa, lấy
hết tất cả đồ đạc của căn nhà luôn cũng được.<br>
- Hack game<br>
+ Các chỉ số máu HP, năng lượng mana, sức mạnh, tiền của nhân vật đều được lưu
trữ bởi các biến trong bộ nhớ.<br>
+ Biết được địa chỉ của các biến đó  gián tiếp thay đổi giá trị thông qua con trỏ có thể hack được game.<br>

Hi vọng thông qua ví dụ nhỏ này sẽ giúp bạn trong công việc cũng như học tập.Chúc may mắn.