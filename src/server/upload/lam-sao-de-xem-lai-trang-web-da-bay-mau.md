# Khó khăn gặp phải
*   Hôm nay mình mò lại book mark của mình về những trick hay mà mình lưu lại nhưng ôi thôi rồi web đã bay màu hết hạn domain. Và thế là mình bắt đầu mò cách để xem lại và mò ra được kha khá phương pháp khá hay
## 1.  Đổi file host
* Phương pháp này sử dụng khi domain đã hết hạn nhưng hosting vẫn còn hạn
> * Ví dụ của mình là trang appconus.com
> * kết quả vào trang web:
>  ![](https://images.viblo.asia/45fa9f7f-6a37-482a-84d1-1970fb16c48a.png)
> * vậy là xác định domain hết hạn rồi:
> * đầu tiên mình vào https://viewdns.info/iphistory/ để tìm list DNS ip đã sữ dụng
> * ví dụ mình dò ra
> ![](https://images.viblo.asia/31812382-e3b1-4bdb-9d2c-4823dd6dddcf.png)
> * xác định ip cần dò là 50.63.202.39
> * tiếp theo là vào file host của máy  (nhớ dùng quền administrator mới lưu được nhé)
> * Mac: /private/etc/hosts dùng sudo nano hosts nhé
> * Windows: C:\Windows\System32\drivers\etc\hosts nhớ đổi permission
> * thêm dòng "50.63.202.39 appconus.com"
> * kết quả: 
> ![](https://images.viblo.asia/57915136-f726-45a7-b03b-22f54099210b.png)
*  ôi thôi domain cũng bay màu. Thua keo này mình bày keo khác
## 2.  Dùng google cache
* Cách nè đơn giản hơn là sử dụng: " http://webcache.googleusercontent.com/search?q=cache%3Ahttp%3A%2F%2F < trang web của mình>
* sử dụng khi web mới hết hạn thôi chứ lâu rồi index nó mất rồi 
> ví dụ: http://webcache.googleusercontent.com/search?q=cache%3Ahttp%3A%2F%2Fhttps://appconus.com
* kết quả cũng không được thôi cách tiếp theo
## 3. Sử dụng Internet Archive
 * Giới thiệu: Internet Archive là một thư viện số phi lợi nhuận có trụ sở San Francisco với sứ mệnh lưu trữ nội dung Web trên Internet. Thư viện cho phép tất cả mọi người truy cập tự do nội dung tài liệu số, bao gồm các trang web, phần mềm ứng dụng/trò chơi, âm thanh/hình ảnh/video, và gần 3 triệu sách công cộng.
 * Cách dùng: vào http://web.archive.org/ gõ trang web mình cần xem và chọn ngày nó lưu trữ 
> * Ví dụ: mình vào và nhập appconus.com
> ![](https://images.viblo.asia/8d4ad5c6-eae6-42e6-a310-e926db2a283e.png)
> * mình thấy nó lưu trong năm 2018 khá nhiều
> * click thử
> ![](https://images.viblo.asia/e2a826b4-748a-4dbd-aef2-92730a60aeed.png)
> * Bùm Ngon lành
### Nếu bạn nào còn cách khác thì góp vào thêm vào nhé
* Mình dự định thêm khoản lưu trữ web lại để đọc offline bạn nào biết chỉ bảo với nhé