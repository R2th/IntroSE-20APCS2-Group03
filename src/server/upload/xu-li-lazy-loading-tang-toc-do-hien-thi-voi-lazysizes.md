## Khái quát
Với những website cần hiển thị nhiều hình ảnh, việc thời gian loading ảnh quá lâu là một vấn đề về perfomance thường xuyên gặp phải.
Để giải quyết vấn đề này có một phương pháp khá đơn giản và thường xuyên được áp dụng, đó là **Lazy Loading**

## Lazy Loading là gì
Lazy Loading là phương pháp sẽ không tiến hành loading trước toàn bộ resource trong Website, mà thay vào đó sẽ chỉ loading lần lượt resource vào thời điểm cần thiết.
Nói cách khác, chỉ khi nào cần hiển thị tới ảnh nào đó, thì mới bắt đầu loading ảnh đó.

## Hiệu quả của Lazy Loading
Với việc loading thông thường, những ảnh nằm ngoài phạm vi hiển thị của browser cũng sẽ được loading trước.
Vì thế, sẽ tốn khá nhiều thời gian đến lúc loading được hết các ảnh.
![](https://images.viblo.asia/2c760fde-ff44-4e8a-ade5-3b123f389ae5.png)

Với Lazy Loading, những ảnh nằm ngoài phạm vi hiển thị của browser sẽ không loading, nhờ vậy giúp tăng tốc độ hiển thị màn hình.
![](https://images.viblo.asia/02681564-a8b2-4cf4-91f2-4f0ca6fae3ec.png)


## Các bước tiến hành
Chúng ta sẽ tiến hành theo các bước dưới đây sử dụng **lazysizes**

**1. Download lazysizes.min.js**

Pull source code [lazysizes](https://github.com/aFarkas/lazysizes) từ Github.
Ở thời điểm hiện tại 05/2021, version mới nhất đang là 5.3.1.

**2. Include lazysizes vào source code của webpage.**
```
 <script src="lazysizes.min.js" async=""></script>
```
 
**3. Thêm class lazyload vào các thẻ img của ảnh mong muốn**
```
<img class="lazyload" src="image.jpg">
```
Sau khi được thêm `class="lazyload"`, những ảnh này sẽ trở thành đối tượng xử lí của lazysizes.

**4. Thay đổi thuộc tính src thành data-src**
```
<img class="lazyload" data-src="image.jpg">
```

Chúng ta đã hoàn thành việc tiến hành lazy loading chỉ với vài bước trên.


## Thử nghiệm
### Phương pháp
Chúng ta sẽ chuẩn bị sẵn 2 page:
- (a) Không sử dụng Lazy Loading
- (b) Có sử dụng Lazy Loading

Nội dung mỗi page đều có khoảng 15 bức ảnh.
Ta sẽ tiến hành đo đạc, so sánh thời gian loading của mỗi page trong trường hợp không có cache.

### Nội dung
```
<body>
    <div>
        <img class="lazyload" data-src="img-001.jpg">
    </div>
    <div>
        <img class="lazyload" data-src="img-002.jpg">
    </div>
    <div>
        <img class="lazyload" data-src="img-003.jpg">
    </div>
    <!-- 省略 -->
    <div>
        <img class="lazyload" data-src="img-013.jpg">
    </div>
    <div>
        <img class="lazyload" data-src="img-014.jpg">
    </div>
    <div>
        <img class="lazyload" data-src="img-015.jpg">
    </div>
    <script src="lazysizes.min.js" async></script>
</body>
```

### Kết quả
##### (a) Page không sử dụng Lazy Loading
![](https://images.viblo.asia/22cfde66-47b7-4a91-834a-d5035dad8fcc.png)

Thời gian loading toàn bộ mất khoảng 1.47s.
Trong đó cần loading 15 bức ảnh, gửi 17 requests và lấy về 6.1MB resourses

![](https://images.viblo.asia/4434fb66-975d-46c0-9aa0-849eb371e8f4.png)

Khi tính score trên LightHouse cũng đã xuất hiện cảnh báo "Avoid enormous network payloads"

##### (b) Page có sử dụng Lazy Loading
![](https://images.viblo.asia/84958b68-55d4-4bf1-a2ec-5511abe3cc57.png)

Thời gian loading chỉ mất khoảng 0.584s.

Do chỉ cần loading 4 bức ảnh trong phạm vi hiển thị, nên cũng chỉ phải load khoảng 1.2MB resources

Khi scroll browser xuống tới vùng hiển thị của những ảnh khác, những ảnh này sẽ được loading tương ứng.

![](https://images.viblo.asia/268ee9b2-9cd5-47cb-8801-e3ba1d1fb01b.png)
Khi tính score trên LightHouse cũng thì không còn cảnh báo "Avoid enormous network payloads".
Có thể thấy được việc performance đã được cải thiện.

## Kết
Lazy Loading là một phương pháp tương đối dễ triển khai và thường xuyên được sử dụng để cải thiện hiệu suất trên các trang web sử dụng nhiều hình ảnh.

## References
- [【Lazy Loading】画面表示を速くする簡単な方法](https://qiita.com/RYO_nami/items/1fd75569f7d363b09308)

- [lazysites Github repo](https://github.com/aFarkas/lazysizes)