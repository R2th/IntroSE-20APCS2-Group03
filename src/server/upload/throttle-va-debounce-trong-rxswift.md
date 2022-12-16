Trong khoảng thời gian tìm hiểu về RxSwift mình gặp ít nhiều khó khăn từ nhỏ tới lớn và còn nghiệm ra nhiều thứ. Một trong số đó là việc handle button làm sao cho hiệu quả. Tình cờ đọc được bài viết của 1 anh người Việt về `Throttle, Debounce` và học hỏi nhiều từ nó. Nay mình xin dịch và share lại cho các bạn:
# 1. Khái niệm

Khi bắt đầu làm quen với reactivex.io, tôi đã gặp rất nhiều khó khăn và khuất mắt giữa khái niệm về **Throttle và Debounce** trong thế giới `Reactive Programming`. Thật sự thì tôi chỉ có kiến thức về Debounce mà thôi. Mà đợi đã, thế thì Throttle là cái vẹo gì vậy nhỉ?
## Debounce operator
Trong tài liệu tôi thấy họ định nghĩa như thế này về Debounce

![](https://images.viblo.asia/b2d5b4a3-73b0-40f0-a944-5329e64ced03.png)

Nôm na có thể hiểu là: Observable(*) chỉ phát ra tín hiệu sau khi đã qua 1 khoảng thời gian được xác định và trong khỏang thời gian đó nó không thể phát ra tín hiệu nào. (:v phần này mình không dịch sát nghĩa cho dễ hiểu, các bạn thông cảm)

## Throttle operator
Thực tế thì, 2 hàm Debounce và Throttle này thực thi chức năng gần như giống nhau nhưng có đôi chút khác biệt. Theo ý kiến của tôi thì khá là khác biệt luôn. (:v ông này vòng vo vãi). Trong RxSwift, cái định nghĩa ở trên thực ra là hàm Throttle đấy. (Phần này mình có kiểm chứng doc và khi bạn click vào mục operator Throttle thì nó nhảy sang cái trang Debounce các bạn ạ. Vãi doc =]]).

Nó chỉ phát ra giá trị cuối cùng trong khoảng thời gian xác định và rất hữu dụng nếu bạn muốn sàn lọc 1 chuỗi các sự kiện như việc nhấn nhiều lần vào 1 button đấy.
![](https://images.viblo.asia/8fb34a50-2886-490c-9153-9f0d2d0113c5.png)

# 2. Code thử nào!!!
Làm cái ví dụ đơn giản để các bạn nhận ra sự khác biệt giữa 2 hàm này. Mình sẽ nhấn liên tục vào button trên màn hình và các bạn hãy quan sát console in dòng "Tap" ra màn hình nhé.
### Đầu tiên là cho Throttle

```
myButton.rx.tap
           .asDriver()
           .throttle(2)
           //.debounce(2)
           .driver(onNext:{ (_) in
                print("Tap!")
}).dispose(by: rx.disposeBag)
```

Okie, nó thực thi y chang như mình đã nói ở trên 
![](https://images.viblo.asia/94db9c76-2a5b-4056-91c1-9c1a58af0db2.gif)

### Thứ 2 là cho Debounce
Bây giờ đổi sang cho hàm debounce nhé

```
myButton.rx.tap
           .asDriver()
           //.throttle(2)
           .debounce(2)
           .driver(onNext:{ (_) in
                print("Tap!")
}).dispose(by: rx.disposeBag)
```

Build lại lần nữa và kết quả là:

![](https://images.viblo.asia/41f4e8bf-f6e6-4861-af9a-4713874cd9a1.gif)
Với debounce, nó sẽ reset lại thời gian mà chúng ta xác định ngay khi button được nhấn. Sau 2s mà mình không nhấn nữa thì Tap đã được in ra

# 3. Kết luận:
Mình nghĩ là các bạn cũng đã mường tượng được khác nhau về 2 hàm này. 

Túm cái váy lại là :

`Throttle` : Hàm thực thi sẽ được gọi ít nhất 1 lần trong khoảng thời gian xác định (ở đây hiểu là ở event cuối cùng)

`Debounce` : Hàm thực thi sẽ được gọi sau khi khoảng thời gian xác định kết thúc lúc user ngừng thực thi event.

Vậy đó, mong các bạn sẽ thích chủ đề này và cám ơn các bạn đã đọc và chiêm nghiệm bài viết của mình.

-----
(*) Observable: đại diện cho khái niệm về một tập hợp các giá trị hoặc các sự kiện trong tương lai. Khi các giá trị hoặc sự kiện phát sinh trong tương lai, Observable sẽ điều phối nó đến Observer.


-----


Cám ơn các bạn đã xem bài dịch của mình. Thật sự thì có nhiều phần phải đọc bảng tiếng anh thì sẽ hiểu rõ hơn và quan trọng là bạn phải có 1 chút ít kiến thức cơ bản về Reactive Programming nữa nhé.


(Trong bài viết có 1 số chỗ mình đã dịch không sát và tự í tách phần chứ không đúng theo nguyên văn của tác giả. Mong tác giả và mọi người bỏ qua)

Nguồn bài viết mình đã tham khảo và dịch tại đây: 

https://medium.com/@dkhuong291/throttle-vs-debounce-in-rxswift-86f8b303d5d4