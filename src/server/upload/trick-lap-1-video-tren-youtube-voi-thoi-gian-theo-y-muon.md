Chả là dạo gần đây, tớ hay nghe bản nhạc "Một bước yêu vạn dặm đau" của bạn Chu Duyên. Xinh gái, hát hay, đàn lại giỏi.

Bạn có thể trải nghiệm ở link này: https://www.youtube.com/watch?v=plKgTyPXCAc

Nếu dùng loop mặc định của Youtube thì sẽ nghe đi nghe lại cả bài. Tuy nhiên, tớ chỉ thích nghe đoạn hát thôi, không thích nghe đoạn intro và outro ở đầu. Vì vậy tớ viết 1 đoạn script nho nhỏ, paste vào console để thực hiện thủ đoạn này, tiện share với mọi người luôn.

# TL; DR
```
function simpleLoop(startTime, endTime) {
    // TODO: Check valid endtime
    console.log('-- Run here')
    var ytplayer = document.getElementById("movie_player");
    var currentTime = ytplayer.getCurrentTime();    
    var isRunToStart = currentTime > startTime
    var suitableTimeout = endTime - startTime


    if (currentTime <= startTime || currentTime > endTime){
        ytplayer.seekTo(startTime)
    } else {
        suitableTimeout = endTime - currentTime
    }
    console.log('>> Start timeout after: ', suitableTimeout * 1000)
    setTimeout(function () {
        simpleLoop(startTime, endTime)
    }, suitableTimeout * 1000)
}

simpleLoop(11, 254)
```
Thay trong hàm simpleLoop là startTime và endTime mà bạn muốn.

# Giải thích
Đoạn code trên khá đơn giản, có thể hình dung theo sơ đồ sau:

![Flow](https://minhphong306.files.wordpress.com/2019/03/flow-simple-loop.png)

Nếu thời gian hiện tại của video nhỏ hơn hoặc bằng thời gian bắt đầu, hoặc lớn hơn thời gian kết thúc của đoạn mà bạn muốn lặp => đang ở đoạn mà bạn không muốn nghe => phi trâu ngay đến đoạn bắt đầu + đặt thời gian timeout là 1 chu kì (endTime – startTime)

Ngược lại, nếu thời gian hiện tại đang ở đoạn muốn nghe, thời gian timeout sẽ là từ thời điểm hiện tại cho tới thời điểm kết thúc.

Sau khi tính toán được thời gian timeout, thực hiện gọi đệ quy lại chính hàm check này.

# Lưu thành tool
Để cho tiện, tớ lưu lại thành tool vào thanh bookmark bar của chrome. Đoạn code dưới đây có thêm phần nhập vào start time và end time, để bạn có thể dễ dàng sử dụng
Các bước lưu như sau:
1. Lưu 1 bookmark bất kì
2. Thay thế phần URL bằng đoạn code dưới đây

```
javascript: !function () {
    var oldValue = localStorage.getItem("simple_loop_" + location.href);
    var input = prompt("Time range: start,end", oldValue || "");
    var times = input.split(",");
    localStorage.setItem("simple_loop_" + location.href, input);
    if (times.length !== 2) {
        alert('Invalid format. Please check your input');
        return;
    }

    var startTime = parseInt(times[0]);
    var endTime = parseInt(times[1]);

    function simpleLoop(startTime, endTime) {
        console.log('-- Run here');
        var ytplayer = document.getElementById("movie_player");
        var currentTime = ytplayer.getCurrentTime();
        var suitableTimeout = endTime - startTime;


        if (currentTime <= startTime || currentTime > endTime) {
            ytplayer.seekTo(startTime);
        } else {
            suitableTimeout = endTime - currentTime;
        }
        console.log('>> Start timeout after: ', suitableTimeout * 1000);
        setTimeout(function () {
            simpleLoop(startTime, endTime);
        }, suitableTimeout * 1000);
    }

    simpleLoop(startTime, endTime);
}();
```

Mỗi khi sử dụng, bạn chỉ cần click vào bookmark, nhập thời gian muốn loop.
Tớ có làm 1 video nhỏ để bạn xem trực quan hơn tại đây
[![Make bookmark tool](https://i.ytimg.com/vi/_-yR-naWeRI/hqdefault.jpg)](https://www.youtube.com/watch?v=_-yR-naWeRI)

Nếu bạn gặp lỗi trong quá trình sử dụng, hoặc thấy bài viết có gì sai sót, có điểm nào chưa tối ưu, hãy comment cho tớ biết nhé ^^

Cảm ơn bạn đã bỏ thời gian đọc bài ^^

Nguồn bài viết từ blog của tớ: https://minhphong306.wordpress.com/2019/03/29/trick-lap-1-video-tren-youtube-voi-thoi-gian-theo-y-muon/