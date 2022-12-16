Khi nói đến việc tạo ra cái gì đó không làm được trên file xml sử dụng các View mặc định , các developer sẽ đối mặt với thử thách thực sự. Khi drawables và styles là không đủ, sự lựa chọn cuối cùng của chúng ta là vẽ nó!

Canvas - sân chơi thực sự để các developer có thể tạo bất kỳ loại View hoặc Animation nào. Nhưng có một sự do dự trong việc lựa chọn nó bởi vì nó có vẻ hơi phức tạp nhưng thực ra không hẳn là vậy. Vì vậy, hãy tìm hiểu sâu vào thế giới của Canvas :)

![](https://cdn-images-1.medium.com/max/800/1*eubHJn3dMZKKrR56Mij77Q.gif)

Chính xác! Chúng ta sẽ tạo một đồng hồ chạy với kim chỉ giây và phút. Tại sao lại là đồng hồ? Tốt! bởi vì nó yêu cầu các thành phần và kỹ năng sau:
* Sử dụng đường thẳng, hình tròn, cung tròn và chữ (đủ để giải quyết cùng một lúc)
* Một mạch liên tục cho hoạt động của nó (không ảnh hướng tới luồng chính)
* Sử dụng hình học. (Nhớ lại cách tính sin, cos và tan)
* Nó đặt ra một thách thức giữ cho View khi tự vẽ sạch sẽ và đơn giản.
* Cuối cùng, nó phức tạp một chút! =))

Vậy trước hết, Canvas hoạt động như thế nào? Chúng ta hãy xem xét một số method quan trọng mà chúng ta thường dùng

```
@Override
protected void onDraw(Canvas canvas) {}
```

Đây là nơi mà tất cả các câu chuyện bắt đầu. Bất cứ điều gì chúng ta cần vẽ, sẽ chạy qua method này. Bởi vì nó dùng để vẽ, chúng ta liên tục vẽ lại nó. Vì vậy, chúng ta phải tránh tạo ra các đối tượng trong nó và cũng cố gắng để tính toán bên ngoài nó càng nhiều càng tốt. Do đó, bất cứ khi nào chúng ta thay đổi View hoặc cập nhật nó, chúng ta cần vẽ lại nó một lần nữa.

```
invalidate();
```

Khi muốn vẽ lại View, chúng ta gọi hàm `invalidate()`.

```
@Override
protected void onMeasure(int widthMeasureSpec,int heightMeasureSpec) { setMeasuredDimension(finalWidth, finalHeight); }
```

Cách chúng ta muốn thiết lập View của chúng ta trên màn hình tùy thuộc vào chiều rộng và chiều cao được cung cấp bởi View cha của nó, chúng ta có thể cài đặt nó trong `onMeasure()`. Chúng ta phải gọi `setMeasuredDimension()` ở cuối để cung cấp kích thước chúng ta muốn cho View.


Bây giờ, chúng ta sẽ xem chúng ta cần tạo ra đồng hồ như thế nào:

![](https://cdn-images-1.medium.com/max/800/1*9sISLFxBWX1SzEorF-OOdw.png)

ClockView của chúng ta có 6 thành phần chính: ClockCover, ClockCenter, Intervals, text, kim chỉ giây và phút. Chúng ta sẽ vẽ lại nó mỗi giây. Chúng ta sẽ cố gắng tính toán bên ngoài hàm `onDraw()` để khi vẽ lại sẽ tốn ít thời gian hơn.

![](https://cdn-images-1.medium.com/max/800/1*NiGg5QsL9jA_GFcLOB6MQA.jpeg)

Chúng ta cũng cần tính toán một chút hình học để duy trì các góc của kim chỉ giây và phút. Chúng ta đang nói đến tất cả các hằng số trong ClockConstants.java

![](https://cdn-images-1.medium.com/max/800/1*cy5IBr4cL_lyxGpQSDcEFw.png)

Chúng ta cũng đặt kích thước cho View là hình vuông và chiều rộng bằng 1/3 chiều rộng của View chứa nó.

```
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    finalWidth = getMeasuredWidth() / 3;
    finalHeight = getMeasuredWidth() / 3;
    mRadius = (finalWidth / 2);
    setMeasuredDimension(finalWidth, finalHeight );
}
```

Bây giờ đến là phần xung nhịp cho đồng hồ của chúng ta. Ở đây chúng ta đang sử dụng đa luồng để tránh ảnh hướng tới main thread. Chúng ta tạo một `TickerThread.java` để duy trì xung trong 1 giây và thông báo cho chúng ta qua `Handler` trên main thread. Cuối cùng, trong main thread, chúng ta tính toán góc quay tiếp theo cho cả kim chỉ giây và phút và gọi hàm `invalidate()` để cho kim đồng hồ di chuyển.

![](https://cdn-images-1.medium.com/max/800/1*xjQpSYSY2eOxgMExXg0snQ.jpeg)

Trong mỗi giây, đồng hồ sẽ tính góc quay của kim chỉ giây và cũng duy trì góc quay trước đó của nó. Và chúng ta sẽ dùng vòng lặp qua mỗi giá trị đã tính được để di chuyển kim chỉ giây và phút.

![](https://cdn-images-1.medium.com/max/800/1*QT5hEfsOoo7wqfg3Ztfr3w.jpeg)

Mỗi lần kim chỉ di chuyển một góc, chúng ta sẽ tính toán lại tọa độ của tất cả kim chỉ và vẽ lại chúng trên View. Chúng ta cũng phải khởi tạo điểm bắt đầu của tấ cả các thành phần ngay từ ban đầu. Đó là cách mà đồng hồ đếm giờ :D

Là vậy đó! Thật đơn giản phải không? :)

*Nguồn:* [AndroidPub](https://android.jlelse.eu/canvas-the-real-play-ground-android-c0faa4b79943)