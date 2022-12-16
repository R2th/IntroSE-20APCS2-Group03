### Giới thiệu
Xin chào các bạn, hôm nay mình sẽ giới thiệu cách để cache lại dữ liệu khi sử dụng API của bên thứ 3, cụ thể là **Youtube API V3** nhé.

Bài toán ở đây là mình cần một box hiển thị lên thống kê từ kênh Youtube của công ty **S**, gồm thông tin của **Channel**: Tên, lượt follow, avatar; và thông tin của **video** mới nhất: Ảnh thumbnail, tên video, lượt xem, ngày đăng, cụ thể như hình dưới đây:

![](https://images.viblo.asia/c0ce9111-fd34-4b4e-b224-13e81c60d069.png)

Bây giờ cùng mình tiến hành nhé.

###  Gọi API

#### Thông tin Channel
Để lấy thông tin của **Channel** thì cần gọi API này để có các thông tin như tên, lượt follow, avatar...

https://developers.google.com/youtube/v3/docs/channels

Ở đây mình tạm đang dùng jQuery vì module này mình build trên WordPress, nên dùng luôn cho tiện

```
$.get("https://www.googleapis.com/youtube/v3/channels",{
    part : 'snippet,statistics,brandingSettings', 
    id : 'Your channel ID', 
    key: 'Your Youtube API KEY'
}, function(data) {
    console.log('channelAvatar', data.items[0].snippet.thumbnails.default.url);
    console.log('channelUrl', 'https://www.youtube.com/channel/'+channelId);
    console.log('channelTitle', data.items[0].brandingSettings.channel.title);
    console.log('channelSubscriber', data.items[0].statistics.subscriberCount);
});
```

#### List video
Tiếp theo chúng ta cần lấy ra video mới nhất từ Channel này, sẽ dùng API sau:
https://developers.google.com/youtube/v3/docs/channels/list

Để lấy ra video mới nhất thì chúng ta lấy item đầu tiên của mảng dữ liệu trả về
```
$.get(
    "https://www.googleapis.com/youtube/v3/search",{
    part : 'snippet', 
    channelId : 'Your channel ID',
    type : 'video',
    order: 'date',
    key: 'Your Youtube API KEY'
}, function(data) {
    console.log('id video', data[0].id.videoId);
    console.log('title video', data[0].snippet.title);
    console.log('url video', 'https://www.youtube.com/watch?v='+data[0].id.videoId;
    console.log('id thumbnail', data[0].snippet.thumbnails.high.url);
});
```

Ở đây chỉ mới có thông tin Thumbnail, title, ngày đăng mà chưa có thông tin lượt view của video, vì vậy chúng ta cần gọi thêm 1 thông tin nữa

#### Lấy thông tin lượt view của video
Gọi API sau để lấy thông tin lượt view của video từ **videoId**:
https://developers.google.com/youtube/v3/docs/videos

```
$.get(
    "https://www.googleapis.com/youtube/v3/videos",{
    part : 'statistics', 
    id : 'videoId',
    key: 'Your Youtube API KEY'
}, function(videoData) {
    console.log('video views', videoData.items[0].statistics.viewCount);
});
```

### Hạn chế
Để lấy đủ thông tin cho chức năng này mình cần gọi tới 3API khác nhau, quả thật không tốt về hiệu năng cũng như kinh tế, bởi vì **Youtube API** chỉ cho miễn phí một số lượng request nhất định, cụ thể là **10,000 units** mỗi ngày (10,000 units chứ k phải 10,000 requests nha), mỗi request sẽ có số lượng unit khác nhau, cụ thể các bạn có thể xem tại [Youtube quote](https://developers.google.com/youtube/v3/getting-started#quota)

Vì thế sẽ rất không nên nếu với mỗi user truy cập website, chúng ta đều thực hiện call 3 APIs như trên để lấy đầy đủ thông tin như được yêu cầu.

### Giải pháp
Để giải quyết vấn đề này thì mình đã thực hiện giải pháp sau:
- Lưu toàn bộ thông tin của Channel + video mới nhất vào **Database** của website, sau đó truy xuất từ đây ra.
- Thực hiện cập nhật thông tin của Channel + video định kỳ (theo giờ/ngày hoặc tuỳ thời gian bạn cài đặt) bằng cách thực hiện **cronjob** theo thời gian cài đặt, gọi 3 APIs như ở trên rồi lưu ngược trở lại vào database.

Giải pháp này cũng có hạn chế là dữ liệu sẽ không được **realtime** như cách gọi APIs, bạn hãy cân nhắc giữa 2 giải pháp này xem bài toán của bạn nên thực hiện theo giải pháp nào nhé.

### Kết luận
Trên đây là cách mình đã sử dụng trong dự án thực tế, ngoài **Youtube** thì cũng có thể sử dụng với những dạng tương tự như **Instagram feed** hay **Facebook post**...

Mong rằng nó sẽ hữu ích với một số bạn, đặc biệt các bạn newber. Cảm ơn và hẹn gặp lại (bye bye)