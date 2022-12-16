## Bị hack like page

Chào ae Viblo, trong khoảng 6 tháng gần đây, tài khoản Facebook của tôi đã gặp tình trạng tự động like page vô tội vạ mà gần đây tôi mới phát hiện. Hậu quả là tài khoản Facebook ngập tràn rác trong Stories khi toàn thấy mấy story của mấy thanh niên Ấn độ, Bangladesh, Hàn Quốc... Mặc dù tôi cũng chưa bao giờ xem vào biết tới các trang này hay có bất cứ thao tác nào. Khiến bây giờ tôi cũng thực sự không còn mấy thiện cảm sử dụng anh chàng Facebook nữa.

![image (1).png](https://images.viblo.asia/1aafeeff-114b-4162-b7ee-ee1801fca3fa.png)

<div align="center">

   *Hình ảnh chỉ mang tính chất minh họa vì không còn log nữa!*

</div>

Sau khi vào Settings > Acitivity Log để kiểm tra thì thấy tài khoản của tôi đã tự động like và follow các page lạ. Dù cũng có chút kiến thức về bảo mật nên cũng rất cảnh giác và đề phòng bằng cách luôn bật tất cả các chức năng bảo mật 2 lớp của FB, luôn dùng tool để auto-generate với độ mạnh cao, fishing thì cũng khó mà qua mặt được tôi... Nhưng tôi cũng méo thể hiểu được là tại sao tài khoản FB của tôi vẫn tự động đi like và follow các page ở tận đẩu đâu. Với tần suất mỗi ngày, tự động like ít nhất 3 pages. Có ngày 5-10 pages.

## Hướng xử lý

Tôi đã thực hiện rà soát lại một loạt các cấu hình bảo mật để hiểu và khắc phục. Một số giải pháp tôi đã thực hiện sẽ được chia sẻ lại dưới đây.

### 1. Đổi mật khẩu Facebook

Bị lộ mật khẩu cũng là một khả năng và với tôi có lẽ là hơi khó. Nhưng đó vẫn là điều đầu tiên tôi làm đó là thực hiện generate lại mật khẩu Facebook mới (chứa ký tự: in hoa, in thường, chữ số, ký tự đặc biệt, độ dài > 24 ký tự). Tôi có dùng Bitwarden để generate cũng như lưu giữ password cho tài khoản. 

Bằng cách:
- Truy cập trang [Cài đặt & quyền riêng tư > Cài đặt > Bảo mật và đăng nhập](https://www.facebook.com/settings?tab=security).
- Trong mục *Đăng nhập > Đổi mật khẩu > Nhấn nút Chỉnh sửa*

![image.png](https://images.viblo.asia/b4020be3-19bf-47c0-a228-762c9b368fe1.png)

### 2. Đăng xuất ra khỏi tất cả các thiết bị

Sau khi đổi mật khẩu, đăng xuất tài khoản ra khỏi toàn bộ các thiết bị sẽ là bước tiếp theo để bảo vệ tài khoản. Phòng khi vô tình đăng nhập vào thiết bị nào đó mà chưa đăng xuất rồi bị kẻ xấu lợi dụng.

- Truy cập trang [Cài đặt & quyền riêng tư > Cài đặt > Bảo mật và đăng nhập](https://www.facebook.com/settings?tab=security).
- Tìm mục *Nơi bạn đăng nhập* > nhấn *Đăng xuất tất cả*

![image.png](https://images.viblo.asia/54746635-890a-4c4d-b740-5c408518398d.png)

### 3. Kiểm tra Xác thực 2 bước

Nếu bạn rơi vào tình trạng như tôi, hãy kiểm tra thêm mục này để an toàn hơn khi mỗi lần đăng nhập sẽ cần thêm một mã xác thực ngắn hạn. Mã này có thể lấy qua công cụ 2FA mà tôi cài đặt là Google Authenticator.

- Truy cập trang [Cài đặt & quyền riêng tư > Cài đặt > Bảo mật và đăng nhập](https://www.facebook.com/settings?tab=security).
- Trong mục *Xác thực 2 yếu tố*, nhấn *Chỉnh sửa* để kiểm tra lại.

![image.png](https://images.viblo.asia/765102da-bc39-4e4b-9d12-429484d0d604.png)

### 4. Kiểm tra và gỡ các app

Sau khi sau nghĩ, tôi mò  thêm một mục đó là các app. Nếu một app vô tình được cấp quyền cũng có thể là app đó tự động like page bằng cách gọi qua Facebook API. Kiểm tra và gỡ hết các Apps đã approve là một bước cần được kiểm tra lại. Thực ra là sau khi kiểm tra thì tôi chả có approve cho cái app lạ nào không đáng tin để mà gỡ.

Có 3 trang gồm:
- Các ứng dụng web: https://www.facebook.com/settings?tab=applications&ref=settings
- Game: https://www.facebook.com/settings?tab=instant_games
- Tiện ích hỗ trợ doanh nghiệp: https://www.facebook.com/settings?tab=business_tools&ref=settings

### 5. Check Activity Log và Unlike tự động

Tôi truy cập trang Activity Log trước đó mà tôi kiểm tra. Nếu bạn gặp tình trạng tương tự, hãy kiểm tra Activity Log xem tài khoản của mình có đi tìm kiếm, like, follow hay đăng tải nội dung nào lạ không? Trường hợp của tôi, theo dự đoán là do bị tự động like page lạ, dẫn tới là facebook tự follow page và làm rối loạn Facebook của tôi.

Sau một loạt các bước rà soát lại phần bảo mật bên trên, việc cuối cùng tôi nghĩ đó là làm sao để hủy like các page. Tôi có phân tích nhanh mã nguồn HTML của trang Activity Log và viết một script nhỏ để tự động hủy like page.

```javascript
function random(min, max){
    return Math.random() * (max - min) + min
}

function randomDelay(min = 1000, max = 5000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, random(min, max))
    })
}

async function runOnce(name) {
    console.warn('processing...', name)

    const cardItem = document.querySelector('[role="main"] .l9j0dhe7.btwxx1t3.j83agx80')

    if (!cardItem) {
        console.error('End of list')
        return
    }

    const optionButton = cardItem.querySelector('[role="button"][tabindex="0"]')

    optionButton.click()
    await randomDelay(100, 500)

    const unlikeButton = document.querySelector('.__fb-light-mode [role="menuitem"][tabindex="0"]')
    if (!unlikeButton) {
        console.error('Unlike button not found')
        return
    }

    unlikeButton.click()
    await randomDelay(100, 500)

    cardItem.remove()

    console.info('processed')
}

async function unlike(ignore = 25) {
    console.info('========START=======')


    const cardItem = document.querySelector('[role="main"] .l9j0dhe7.btwxx1t3.j83agx80')
    if (ignore === false && cardItem) {
        console.info('skipped')
        cardItem.remove()
    }

    if (ignore === true) {
        runOnce(1)
    }

    if (typeof ignore === 'number') {
        for (let i = 0; i < ignore; i++) {
            await runOnce(i + 1)
            await randomDelay(100, 1000)
        }
    }

    console.info('========DONE========')
}
```

Cách sử dụng:
1. Truy cập `Cài đặt & quyền riêng tư > Nhật ký hoạt động > Quan hệ kết nối > Trang, lượt thích Trang và sở thích`
2. Vào devtool của browser: Nhấn Ctrl + Shift + I hoặc Chuột phải > chọn Inspect
3. Mở mục Console trong Devtool
4. Copy source code bên trên vào dán vào > Nhấn Enter
5. Gõ lệnh tương ứng phía dưới bắt đầu sử dụng:
    - **`unlike(false)`**: Bỏ qua mục đầu tiên trong danh sách (từ trên xuống). Các mục đã bỏ qua/xử lý sẽ không hiển thị trên browser.
    - **`unlike()`** hoặc **`unlike(25)`**: Hủy like cho 25 mục đầu tiên trong danh sách.
    - **`unlike(n)`**: Hủy like cho `n` mục đầu tiên trong danh sách. Với `n` là số nguyên dương.

![image.png](https://images.viblo.asia/c8bbd3d8-d5b0-4674-9ccb-4167e4f6d48c.png)

### 6. Theo dõi

Việc cuối cùng bây giờ là theo dõi xem liệu tài khoản có còn tiếp tục gặp tình trạng tự động like page vô nữa không. :) Thi thoảng xem Activity Log để kiểm tra tình trạng và phát hiện các bất thường.

## Tổng kết

Trên đây là một số tổng hợp các bước xử lý và khắc phục của tôi khi rơi vào tình trạng nick Facebook bị hack like tự động.

Hãy upvote và follow tôi để nhận thông báo khi có các bài viết mới nha! Cảm ơn các bạn đã theo dõi!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***