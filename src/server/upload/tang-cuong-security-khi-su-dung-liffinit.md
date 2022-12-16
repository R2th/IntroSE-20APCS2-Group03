# Dẫn nhập
Có rất nhiều bạn ở đây đang sử dụng LIFF để phát triển phần mềm trên LINE đúng không nào?
Khi chúng ta muốn lấy thông tin của user trên LINE thì chúng ta sẽ thực hiện chạy liff.init(). Từ trước tới nay thì URL sau khi direct là URL có bao gồm cả các thông tin mật như là access token,.. nhưng với update lần này thì, sau khi thực hiện liff.init(), thì các thông tin mật sẽ bị loại bỏ khỏi URL redirect lần 1


-----


# Về việc update LIFF v2.11.0

-----


### Sau khi thực hiện liff.init(), thì các thông tin mật sẽ bị loại bỏ khỏi URL redirect lần 1 

-----


> Dựa trên quan điểm security thì tại thời điểm liff.init() được resolve, url fragments chứa những thông tin mật sẽ bị loại khỏi redirect. 
> Vì vậy xử lý ở trong method then() của chuỗi các method sẽ xử lý URL redirect lần 1 không chứa thông tin mật giống như URL hiện tại

Tóm lại nghĩa là sao?
```
// ① Trong URL có chứa các thông tin mật
console.log(window.location.href);
// https://example.com/?liff.state=path#access_token=xxx&context_token=xxx&feature_token=xxx&id_token=xxx&client_id=xxx

liff.init({
    liffId: myLiffId
}).then(() => {
//  ② Trong URL đã được loại bỏ các thông tin mật
    console.log(window.location.href);
    // https://example.com/?liff.state=path
});
```


Ở ①, khi lấy được URL thì trong URL có bao gồm cả các thông tin mật (access token,...) tình trạng này này về mặt security là không tốt

Mặt khác ở ②, tại thời điểm liff.init() đã được resolve, hay nói cách khác kết quả của xử lý đồng bộ đã trả về thành công（resolve）thì trong xử lý của then() mà chuỗi method đã sử dụng thì nó sẽ update thành URL được loại bỏ thông tin mật đi rồi
### Về liff.init()

-----


Đây là method nhất định phải dùng khi tạo LIFF app.

Bằng việc chạy khởi tạo LIFF app thì chúng ta có thể sử dụng được các method khác của LIFF SDK.

Ngoài ra, nếu là LIFF browser thì khi thực hiện liff.init() xử lý login sẽ được tự động nhưng khi ở browser bên ngoài thì sẽ cần phải chạy liff.login() để thực hiện xử lý login trước.

**Ví dụ về redirect**
```
// Phương pháp sử dụng Promise object
liff.init({
    liffId: myLiffId
}).then(() => {
    // Từ đây trở đi có thể sử dụng được LIFF SDK
}).catch((err) => {
    // Xử lý error
});

// Phương pháp sử dụng callback
liff.init({ liffId: myLiffId }, Callback, errCallback);
```
 
### Flow xử lý khi thực hiện liff.init()

-----

![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f313435373634332f61386234306237642d353466362d666338332d626232662d6265666662303237313963312e706e6.png](https://images.viblo.asia/47c86a16-53fa-40d7-b155-b4a6fec4ccf2.png)

URL redirect lần 1 là URL mà LIFF sever redirect đầu tiên khi user access vào LIFF URL. Sau khi redirect đến đây thì liff.init() sẽ được thực hiện.

URL redirect lần 2 là URL mà user được redirect đến sau khi liff.init() đã được thực hiện. Khi user đến đây thì page LIFF app sẽ được hiển thị.

Đi đến bước này là LIFF app được khởi động.

# Tổng kết
Với sự update của v2.11.0, sau khi chạy liff.init() thì những thông tin mật đã được loại bỏ khỏi URL. Và như thế về mặt security user có thể sử dụng một cách an toàn hơn trước đây. Tuy nhiên nó yêu cần cần phải có xử lý bên trong chuỗi method sau khi thực hiện liff.init() nên các bạn cần chú ý nhé.

Bài viết được dịch từ link: https://qiita.com/ppt_msdg_maas/items/869531a67f1e5fcac22b