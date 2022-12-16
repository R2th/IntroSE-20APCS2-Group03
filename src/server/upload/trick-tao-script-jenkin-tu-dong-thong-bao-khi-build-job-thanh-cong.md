Dạo gần đây, tớ hay phải build 1 lúc nhiều job trên jenkin. Thi thoảng phải đảo qua xem job đó đã build xong chưa, khá là mất thời gian, thi thoảng lại còn quên nên QA ra vã :man_facepalming:

Tớ thử bật console capture request thì thấy jenkin update state của job thông qua ajax nên nảy ra ý tưởng capture lại request này, check state là done thì hiện thông báo job đã build xong. Google một lúc thì cũng làm được, tiện viết một bài chia sẻ lại.

# Test
Khi thử capture request của jenkin, tớ thấy có 3 endpoint chính: /ajax, /run và /describe. Soi thử response của từng thằng một thì tớ thấy describe chính là cái tớ muốn tìm.
![](https://images.viblo.asia/28768a58-3adf-4823-9e5d-3a50d8694ce5.jpg)


Nhìn thấy field status **IN_PROGRESS**, tớ đoán khi nào complete thì thanh niên này sẽ chuyển về **COMPLETE**, **SUCCESS** hoặc **DONE** gì đó.
Tớ liền build ngay 1 job thì nhận thấy đếch phải thế. Jenkin sẽ liên tục request, nhưng sẽ không nhận được request từ describe có status là **DONE**. Lí do (tớ đoán) là vì khi gặp các thanh niên `/ajax`, `/run` trả về trước đó có chứa thông tin là job done, jenkin sẽ cancel request tới `/describe` này (vì thừa).

Như vậy để chuẩn bài nhất thì tớ phải capture ở `/ajax` hoặc `/run` để tìm ra dấu hiệu khi nào build done. Tuy nhiên thì đang làm task khá là sml, lại ngồi tối ưu đống này thì không ổn lắm, nên tớ quyết định code “dâm” thôi, xài tạm được là được. Sau “rảnh thì refactor lại” =))

# Ý tưởng
Ý tưởng là tớ sẽ setTimeout 10s khi gặp request describe. Nếu chưa đến 10s mà gặp 1 cháu describe khác => clearTimeout này và set lại timeout 10s (vì quá trình build vẫn đang diễn ra). Ngược lại, nếu 10s trôi qua rồi mà không gặp thêm cháu describe nào nữa => thực hiện thông báo build thành công như bên dưới

![](https://images.viblo.asia/8c381737-585b-4e85-b3ec-38fb98d1c829.jpg)


# Code
Code khá đơn giản nên mình cũng không giải thích nhiều nữa.

```
var timeoutInstance
var lastTime

// Catch XHR request
(function () {
    requestPermiss()
    const send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            let URL = this.responseURL
            console.log('==== Header', URL)

            if (URL.includes('your cicd url') && URL.includes('describe')) {
                console.log('>>> Describe now: ', this.responseText)
                if (this.responseText == "" || (this.responseText[0] != '[' && this.responseText[0] != '{')){
                    return
                }

                var now = new Date()
                console.log('Lasttime: ', lastTime, ', now: ', now)
                lastTime = now

                let data = JSON.parse(this.responseText)
                console.log('Data got: ', data)
                if (data) {
                    if (data.status === 'SUCCESS') {
                        clearTimeout(timeoutInstance)
                        notifyMe()
                        return
                    }

                    console.log('Timeout instance now: ', timeoutInstance)
                    clearTimeout(timeoutInstance)
                    console.log('Timeout after clear: ', timeoutInstance)

                    timeoutInstance = setTimeout(function(){
                        notifyMe()
                    }, 10000)

                    console.log('Timeout after set: ', timeoutInstance)
                }
            }

        })
        return send.apply(this, arguments)
    }
})();

function notifyMe() {
    var notification = new Notification('Build done', {
        icon: 'https://graph.facebook.com/1828369360737257/picture',
        body: "Đại ca ơi, build xong rồi! Check ngay ko ăn vã bây giờ :facepalm:",
    });
}

function requestPermiss() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
}
```
Nhớ thay cicd url của bạn vào nhé.
Bạn xài có thể clear log đi nhé. Tớ để nguyên để debug cho dễ.

Cảm ơn bạn, vì đã đọc bài.
Nếu có gì chưa đúng hoặc có cách tối ưu hơn, hãy comment cho mình biết nhé ^^

Nguồn bài viết từ blog của mình: https://minhphong306.wordpress.com/2019/04/15/trick-tao-script-jenkin-tu-dong-thong-bao-build-khi-job-thanh-cong/