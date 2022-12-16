**Semaphores**: cung cấp cho chúng ta kiểm soát quyền truy cập vào nguồn tài
nguyên chia sẻ. Để bắt đầu các bạn hãy xem ví dụ sau:
# 1. Tình huống
Một người cha ngồi trong nhà cùng với 3 đứa con, người bố rút ra cái Ipad

Kid2: Bố ơi cho con mượn Ipad.

Kid1: Không!, bố ơi cho con mượn

Kid3: Ipad! Ipadi! bố ơi!

Father: OK, Kid2, vì con hỏi trước và không có ai sử dụng nên con sẽ được
dùng nó trước nhưng hãy nói cho bố biết khi nào con chơi xong.

Kid2: (10 phút sau) Bố ơi! Con chơi xong rồi.

Father: Kid1, Bây giờ Ipad đến lượt con dùng.

Kid1: (5 phút sau ) Con dùng chán rồi! Con trả bố.

Father: Kid 3, con có thể dùng Ipad đến khi nào chán thì hãy nói với bố.

Kid3: (5 phút sau) Con trả bố, Con không dùng nữa.

Trong tình huống trên, người bố chính là semaphore, Ipad chính là tài nguyên cần chia sẻ và những đứa trẻ chính là các threads.Người cha đảm bảo tại 1 thời điểm chỉ có 1 đứa trẻ được dùng Ipad. Nếu chúng ta so sánh nó trong lập trình thì chỉ có 1 thread được truy cập vào tài nguyên tại 1 thời điểm.Ngoài ra  thì đứa trẻ nào mượn Ipad trước sẽ được dùng Ipad trước (cơ chế FIFO ).

**Tip**:

- **Shared resource**:  sẻ có thể là biến, một công việc như tải ảnh từ url , đọc database …
Trong lập trình nếu có nhiều thread cùng truy cập vào cùng 1 tài nguyên thì sẽ gây ra sự cố  như sai logic...vvv
- **Thread safe**:  mã có thể được gọi an toàn từ nhiều luồng mà không gây ra bất kỳ vấn đề gì.
# 2. Lý thuyết
**Semaphore** bao gồm một **threads queue** và một **counter value** (type Int).

**Threads queue**: được dùng bởi semaphore để theo dõi các luồng theo cơ chế FIFO.

**Counter Value**: được dùng bởi semaphore để quyết định xem một thread có được truy cập vào shared resource hay không. Giá trị của **counter** được thay đổi khi gọi hàm **signal()** hoặc **wait()**.


**- Vậy Khi nào gọi hàm  wait() và hàm signal()?**
* Gọi **wait()** trước khi sử dụng shared resource. Chúng ta sẽ hỏi semaphore nếu shared resource được chia sẻ có sẵn hay không, nếu không chúng tôi sẽ đợi.
* Gọi **signal()** sau khi sử dụng share resource. Chúng ta báo hiệu cho semaphore rằng chúng tôi đả sử dụng xong shared resource.

**- Gọi wait() sẽ thực hiện những gì ?**
* Giảm counter của semaphore đi 1 đơn vị.
* Nếu counter < 0 , thread sẽ bị đóng băng.
* Nếu counter >= 0 , code sẽ được thực hiện mà không cần chờ đợi.

**- Gọi signal() sẽ thực hiện những gì ?**
* Tăng counter của semaphore 1 đơn vị.
* Nếu counter < 0 , thì task cũ nhất nằm trong hàng đợi sẽ thực hiện.
* Nếu counter > = 0, thì thread queue này đang trống và không có ai chờ đợi.

## Flow chart: 
![](https://images.viblo.asia/6975607f-f2bd-426e-94a1-7836d1df5e9f.png)

OK lý thuyết  thế là đủ. Mình sẽ giới thiệu các bạn vài ví dụ để hiểu rõ hơn về semaphore.
### Ví dụ 1:
- Đầu tiên chúng ta sẽ khởi tạo 1 semaphore:
```
let semaphore = DispatchSemaphore(value: 1)  // Hàm này sẽ khởi tạo
semaphore và giới hạn chỉ có 1 luồng cho phép truy cập vào shared resource tại 1 thời điểm.

```
- Tiếp theo chúng ta tạo 3 global queue , mỗi queue đại diện cho 1 đứa trẻ, Mỗi đứa trẻ sẽ thực hiện theo fllowing sau: wait() -> chơi Ipad -> signal()
```

DispatchQueue.global().async {
  print("Kid 1 - wait")
  semaphore.wait()
  print("Kid 1 - wait finished")
  sleep(1) // Kid 1 playing with iPad
  semaphore.signal()
  print("Kid 1 - done with iPad")
}
DispatchQueue.global().async {
  print("Kid 2 - wait")
  semaphore.wait()
  print("Kid 2 - wait finished")
  sleep(1) // Kid 2 playing with iPad
  semaphore.signal()
  print("Kid 2 - done with iPad")
}
DispatchQueue.global().async {
  print("Kid 3 - wait")
  semaphore.wait()
  print("Kid 3 - wait finished")
  sleep(1) // Kid 3 playing with iPad
  semaphore.signal()
  print("Kid 3 - done with iPad")
}

```
**Output**:

![](https://images.viblo.asia/99f6e8ce-ed57-471d-ab98-b1edc79a9af2.gif)
Từ Output các bạn có thể thấy cả 3 đứa trẻ: Kid 1, Kid 2, Kid 3 đều phải đợi, khi Kid 3 chơi xong thì mới đến kid 1  chơi, cuối cùng là kid 2 chơi. (Thứ tự đứa trẻ chơi không phải nhất thiết phải theo thứ tự là 3,1,2 mà đứa trẻ nào tranh được chơi Ipad trước thì đứa trẻ khác phải đợi đứa trẻ trước đó chơi xong rồi mới đến lượt của mình).

Hãy cùng theo dõi counter của semaphore để hiểu rõ hơn( Các bạn chú ý nhìn theo flow chart nhé):
* 1 (lúc khởi tạo semaphore)
* 0 (kid 3 đang đợi, last value >= 0, kid 3 có thể chơi Ipad)
* -1(kid 1 đang đợi, last value < 0, kid 1 đi vào hàng đợi)
* -2 (kid 2 đang đợi, last value < 0, kid 2 đi vào hàng đợi)
* -1 (kid 3 chơi xong, since value < 0,kid 1 ra khỏi hàng đợi và chơi Ipad)
* 0 (kid 1 chơi xong, since value < 0, kid 2 ra khỏi hàng dợi và chơi Ipad)
* 1 (kid 2 chơi xong, since value > =0, không còn đứa trẻ nào ở trong hàng đợi nữa).

Thông qua ví dụ này chắc các bạn đã hiểu rõ hơn về semaphores, các bạn có đang tự hỏi vậy trong lập trình ứng dụng IOS các bạn thì ứng dụng của nó như thế nào.Mình sẽ giới thiệu cho bạn thêm 1 ví dụ nữa để hiểu cách ứng dụng nó trong thực tế.
Giả sử tải 15 bài hát từ một url. Bài toán đặt ra là  bạn chỉ muốn tải về 3 bài hát cùng 1 lúc thì phải làm như thế nào?

**Lời giải**: Đầu tiên, bạn tạo một concurrence queue để thực hiện tải đồng thời các bài hát.
Tiếp theo bạn khởi tạo một semaphore có counter value = 3 -> để tải 3 bài hát cùng 1 lúc,
Sau đó chúng ta lặp lại 15 lần bằng vòng for chúng ta thực hiện như sau: wait() -> tải bài hát -> signal()

```
let queue = DispatchQueue(label: "com.gcd.myQueue", attributes: .concurrent)
let semaphore = DispatchSemaphore(value: 3)
for i in 0 ..> 15 {
  queue.async {
     let songNumber = i + 1
     semaphore.wait()
     print("Downloading song", songNumber)
     sleep(2) // Download take ~2 sec each
     print("Downloaded song", songNumber)
     semaphore.signal()
  }
}

```
**Output**:

![](https://images.viblo.asia/ebe7acfa-3a52-4715-b641-ec074b4130f3.gif)

Hãy cùng theo dõi counter của semaphore để hiểu rõ hơn:

* 3 (lúc khởi tạo semaphore)
* 2 (song 4 đợi, last value >= 0 , start song download)
* 1 (song 1 đợi, last value >= 0 , start song download)
* 0 (song 3 đợi, last value >= 0 , start song download)
* -1 (song 2 đợi, last value < 0, thêm song 2 vào hàng đợi)
* -2 (song 5 đợi, last value < 0, thêm song 5 vào hàng đợi)
* -3 (song 6 đợi, last value < 0, thêm song 6 vào hàng đợi)


Lặp tất cả bài hát cho đến khi counter = -12
* -12(song15 đợi, last value < 0, thêm song 15 vào hàng đợi)
* -11(song 4 tải xong phát tín hiệu signal, since value < 0, lấy song 2 ra khỏi hàng đợi và start download)
* -10(song 1 tải xong phát tín hiệu signal, since last value < 0, lấy song 5 ra khỏi hàng đợi và start downloadi)
* -9 (song 3 tải xong phát tín hiệu signal, since last value < 0, lấy song 6 ra khỏi hàng đợi và start download)

Cứ tiếp tục như vậy các bạn từ làm để hiểu nhé.


**Note:** 
* Không bao giờ chạy semaphore trên main thread vì nó sẽ đóng băng ứng dụng của bạn.
* Số lần gọi wait() phải bằng với số lần gọi signal(), nếu không sẽ gây ra lỗi EXC_BAD_INSTRUCTION

**Tài liệu tham khảo**: https://medium.com/@roykronenfeld/semaphores-in-swift-e296ea80f860