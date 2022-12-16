Demo: https://minhlong.github.io/Front-End-Auto-Refresh-Browser

Source: https://github.com/minhlong/Front-End-Auto-Refresh-Browser

## Tự Sự

Chuyện là hôm rồi mình có làm 1 trang frond-end cho boss. Trang này có gắn hình Ngọc Trinh da trắng nõn ... nhưng mình nghĩ thêm chút màu vàng saphia cho nó ấm thế sẽ tuyệt hơn. Thế là mình quyết định dùng CSS để làm cái ảnh png ấy trông ngà ngà hơn chút ...

... 1 ngày sau ... nhận được email của boss ...

> Sao cái ảnh Ngọc Trinh trắng nõn thế kia mà chú đã làm gì trông nó ngà ngà, nhìn nó sến thế? Cơ mà nếu đã thế thì chú chuyển cho anh sang màu "hồng phấn" nhé. Anh thích Trinh với nước da mịn màng hồng phấn cơ :D

... thế là dev tôi ... lại cọc cọc ... css chuyển sang màu hồng phấn ... rồi deploy lên server ... test lại lần cuối ... rồi lại mail báo boss ...

... 1 ngày sau ... nhận được email của boss ...

> "Quắc Thị Phụng" ? Sáng nay anh bật lên vẫn thấy màu vàng ngà ngà ...

## Vấn Đề

Với sự cố trên, đó là do trình duyệt web (Browser) đã tự động cache trang web để tối ưu hiệu năng. Đây là một thế mạnh của các framework frond-end (Angular, React, ... ) nhưng cũng là 1 sự bất tiện khi trang web đã được cập nhật sang version mới nhưng người dùng lại vẫn dùng version cũ.

> Ghi Chú: Nếu có framework hoặc tip nào khác đã hỗ trợ chuyện này rồi thì các bạn comment góp ý nhé. Cảm ơn các bạn

**Và các thử nghĩ xem ... có đời nào ... các bạn lại bắt người dùng lâu lâu phải refresh (Ctrl + F5) trình duyệt của mình 1 lần để bắt người dùng cập nhật lại xem có gì mới không? Mà nếu thế thì frond-end của mình cũng mất đi hiệu năng**

Vậy nếu mình muốn web của mình phải làm được như sau thì sao ?

1. Khi có update mới (version mới) thì trang web của mình sẽ tự động refresh để tải lại trang

2. Chỉ refresh lại khi cần thiết (có version mới), chứ không phải là cứ 30s 60s là refresh ... làm trang web bị giựt liên tục thì lướt web ức chế lắm.

## Giải Pháp

Mình sẽ dùng 1 process nhỏ để kiểm tra xem liệu trang web của mình đã là version mới nhất chưa

```
fond-end.site.com/index.html
    <!-- Trong đây mình sẽ chứa đoạn script sau (Viết mã giả thôi nhé) -->

    // Cứ 60s mình sẽ check version 1 lần
    setInterval(() => {

        const version = '1.0.001';
        var res = get('fond-end.site.com/version.json?t=194576348')
        // Biến t (time) giúp trình duyệt không cache lại file version.json

        if (version === res.version)
            return; // Không có gì thay đổi.

        // Đã có thay đổi, cần update/refresh-browser lại
        location.reload();

    }, 1000 * 60);
```

```
fond-end.site.com/version.json
    {
        "version": "1.0.101"
    }
```

![ScreenShot](https://github.com/minhlong/Front-End-Auto-Refresh-Browser/raw/master/screeenshot.png?raw=true)

## Kết

Thật ra vấn đề này hôm trước có 1 người bạn hỏi mình, mà mình cũng không để tâm lắm. Cho đến khi boss hỏi mình thì mình mới đi tìm hiểu... rồi lùng sục. Tip tuy đơn giản ... nhưng thực sự trước khi đọc được bài viết gốc ... mình cũng hơi đuối. Tuy nhiên, nếu bạn nào có giải pháp gì hay hơn thì góp ý cho mình với nhé.

**Lưu ý:** Trong source code bài viết này mình đã dùng Angular để viết chứ không phải html + javascript thuần nhé. 

## Tham Khảo

- Từ 1 bài viết (English) trên internet ... mà quên bà nó cái link gốc :(