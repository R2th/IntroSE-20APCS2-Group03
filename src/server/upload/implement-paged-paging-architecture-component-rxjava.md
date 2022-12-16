# 1, Lời mở đầu
* Xin chào mọi người hôm nay mình sẽ hướng dẫn mọi người cách làm việc với paging trong architecture component kết hợp với RxJava, LiveData, ViewModel.
* Giải thích từng dòng code thì khá là khó hiểu và không trực quan nên mình sẽ đưa ra code mình làm.
* Chú ý: Trong ví dụ mình sử dụng Kotlin và mô hình MVVM. 

# 2. Coding
* Bước 1: Import paging dependency vào trong project của bạn:

![](https://images.viblo.asia/b817008b-e5ec-40d8-b5b0-102a70b8564e.png)

* Chú ý: Do mình đang sử dụng kotlin và androidX, hãy tham khảo link sau để add dependency cho phù hợp: (https://developer.android.com/topic/libraries/architecture/adding-components#paging
* Bước 2: Tạo class dataSource extend PageKeyedDataSource:

![](https://images.viblo.asia/e520eacd-3c9f-44e6-9626-0486e0ee357b.png)
![](https://images.viblo.asia/63ef27ae-ad81-4208-a75e-a26eeb1bcdca.png)
![](https://images.viblo.asia/710fcbf2-d92b-4b8a-9357-d5c5768bc15f.png)
* Bước 3: Tạo Factory Class extend DataSource.Factory:

![](https://images.viblo.asia/975b35d1-0bff-4466-b231-7593b3e1ced9.png)
* Bước 4: Tạo Repository Class:

![](https://images.viblo.asia/af288d39-ddad-44f8-8726-1053ade1c926.png)
* Bước 5: Implement repository class trong ViewModel:

![](https://images.viblo.asia/f4af0fcd-0982-4d3a-a571-d35ad7e003aa.png)
* Bước 6: Xem kết quả nào:

![](https://images.viblo.asia/0a21ea05-9826-4714-98cc-4ba36fcddcc6.png)
# 3. Kết luận
* Android đang thay đổi khá nhiều về công nghệ nên mọi người chú ý update thường xuyên.
* Cảm ơn mọi người đã theo dõi bài viết của mình.
* Bài viết tới mình sẽ cố gắng đưa ra 1 công nghệ mới cho mọi người. Happy coding !