Nay anh iOS mới vào đi hỏi mình về các sự khác nhau của `combineLatest` và `withLatestFrom`. Mình có hiểu nhưng nói chưa rõ và không nắm sâu về đề thành ra phải chạy lên medium check lại. Sẵn đây thì làm 1 bài dịch theo giọng văn của mình để cho các bạn khỏi lăn tăn khi mới bắt đầu tiềm hiểu về Rx programming. :D Mong là các bạn thích.

-----

`combineLatest` và `withLatestFrom`  là 2 operators của Rx na ná giống nhau về tên cũng như cách thực thi. Thế thì khác biệt của nó là gì nhỉ ???

## CombineLatest
`combineLatest`  đơn giản chỉ là sẽ gộp 2 hay nhiều nguồn dữ liệu lại và phát ra tính hiệu bất kể khi nào có giá trị mới được cập nhật từ các nguồn dữ liệu.

Đây là một ví dụ cơ bản nè: 

```
disposables += Observable.combineLatest(
        view.onNameChanged(), view.onEmailChanged(), ::AccountInfo)
        .subscribe { accountInfo ->   
            view.setNextStepButtonEnabled(accountInfo.isValid())
        }
```

Dưới đây là diagram để cho các bạn dễ hiểu hơn:
![](https://images.viblo.asia/fc92fe2c-c720-46d5-b3ae-0ffbd0f21a86.png)

Như đã thấy thì, bất kể khi nào có một sự kiện từ bất nguồn nào mà chúng ta nhận được giá trị mới nhất từ các nguồn được gộp (dựa theo các giá trị mà bạn muốn gộp ví dụ như ở trên của mình là username và email khi được thay đổi và gộp lại thành AccountInfo)

## WithLatestFrom

Tưởng tượng chúng ta muốn tạo ra 1 screen mà user có thể nhập tên của họ và chúng ta sẽ check xem tên này có valid hay không. Chúng ta có thể sử dụng withLatestFrom để thực hiện:

```
disposables += view.onNameFocusChanged()      // When focus changes
          .withLatestFrom(view.onNameChanged()) // Grab the name
          .subscribe { (focus, name) ->
            val hasLostFocus = !focus
            if (hasLostFocus && !isValidName(name)) {
              view.showInvalidName()
            } else {
              view.clearNameError()
            }
          }
```

Còn dưới đây là diagram cho các bạn dễ hiểu: 
![](https://images.viblo.asia/75af7b33-51fd-43b8-b2c6-9a2773018fdb.png)

Giải thích ý nghĩa diagram tí nhé: ( :v ở đây hiểu theo kiểu tác giả chắc các bác sẽ đau não nên mình xin phép nói theo kiểu của mình. :D bác nào đọc mà méo hiểu luôn thì thôi chạy vào link mình để cuối bài đọc của tác giả tạm nhé)

+ Đường ở trên chính là nút nào đó để bắt action check valid, đường ở dưới chính là tên của user
+ Chúng chỉ phát ra tín hiệu (emit) chỉ khi nút action được nhấn
+ Khi user chưa bao giờ nhập vào tên thì dù bạn có nhấn action thì nó cũng bắt sự kiện nhưng méo làm gì cã. (Vì nó làm đéo gì tên đâu :v  ở bước này thì chúng vẫn chưa phát ra tín hiệu do chưa đủ.
+ Khi mà user thay đổi tên bằng 1 cách nào đó thì chúng vẫn chưa phát ra tín hiểu bởi nút action chưa được nhấn.

## Thế zip operator thì như thế nào ?
Như hai operator trên, `zip` gộp cã 2 hay nhiều giá trị từ các streams khác nhau. Khác nhau duy nhất là nó sẽ đợi cho đến khi một giá trị mới từ từng stream phát ra. Xem diagram ở dưới sẽ rõ nhé:
![](https://images.viblo.asia/2ea74b4d-dde6-4472-b474-e33378d7e397.png)

Chúng ta có thể thấy trên diagram, `zip` có thể tương đương với `combineLatest`  trong 1 vài trường hợp cố định nào đó. Các bạn xem nhé:
![](https://images.viblo.asia/1ab54eeb-4144-4c13-8cc2-7275c09a1201.png)

Khi mà mỗi Observable trả về ít nhất 1 giá trị. zip và combineLatest gần như là hoạt động y chang nhau thôi :D.


-----
:D Bài dịch của mình tới đây là hết. Mong là qua bài viết các bạn có thể hiểu thêm về khác nhau và các dùng giữa các operator trong Rx.

Link bài dịch ở đây: [Rx: combineLatest vs withLatestFrom (and zip)](https://medium.com/@martinkonicek/rx-combinelatest-vs-withlatestfrom-ccd98cc1cd41)