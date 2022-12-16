## Khởi đầu
Như các bạn đã từng phát triển 1 ứng dụng cho backend sẽ thấy có rất nhiều task chúng ta làm nhưng ko thể kết thúc trong 1 vòng đời request-response được. Những task này có thể tốn nhiều thời gian ví dụ như: sending email, download file, parsing crawling data, process execute... Các bạn nghĩ rằng chúng ta có `async` có `Promises`, có thể xử lý đơn giản thôi tại sao cần phải tạo ra các work job chạy làm gì.
Thế này nhé Javascript là single-threaded, nên bạn không thể sử dụng Promises để chạy code async được, 1 khi code của promise được chạy thì những đoạn code khác sẽ không chạy được. Bạn muốn chạy được bạn lại phải viết code async bên trong promise. Với 1 request gửi lên thực hiện tác vụ nặng, thì không thể chờ mãi cho đến khi tác vụ hoàn thành được, app của bạn sẽ không đủ năng lực để xử lý.
Đó chính là lúc chúng ta phải tạo ra 1 worker job. Trong đó `Kue` là framework để xử lý các job queue mạnh mẽ sử dụng cho Node.js
## Tổng quan
Kue là 1 framework tạo ra các hàng đợi công việc ưu tiên (prority job queue) được hỗ trợ bởi Redis, xây dựng cho nền tảng Node.js.
Vậy job queue là gì, khái niệm của nó giống như là message queue, đơn giản là cách các thành phần rời rạc có thể gửi thông điệp và giao tiếp qua nhau 1 cách tin cậy. Cơ chế của nó là Publishing/Consuming.<br/>
![](https://images.viblo.asia/ac4ead2d-f378-4221-8327-f714961f5ea2.png)
## Tính năng
Vậy Kue cung cấp những tính năng gì. Ngoài việc tạo ra 1 hàng đợi các công việc cần thực thi, Kue còn có 1 số lượng lớn các tính năng như là:
* Thực hiện các tác vụ theo mức độ ưu tiên
* Thử lại với những task failed, có thể delay nếu muốn
* Set thời gian expired chờ phản hồi của job
* Log khi đang thực hiện job
* Cập nhật progress
* Có thể bắn các sự kiện thông qua cơ chế `Pub/Sub` của Redis
* Cơ chế queue events, có thể thêm sửa xoá các job queue
* Tạo delayed jobs
* Xử lý concurrency
* Pause/Resume job
* Shudown job, quản lý các job
* Kết nối với Redis
Vậy cũng khá nhiều tính năng rồi nhỉ, chúng ta sẽ đi vào thực hành 1 ví dụ đơn giản để xem Kue hoạt động như thế nào nhé
## Cài đặt
Bởi vì Kue sử dụng Redis để hoạt động nên bạn cần cài đặt Redis trước từ trang: https://redis.io/
Để nói thêm thì Redis là 1 loại database trên memory rất phổ biết thường dùng để làm cache, giúp lấy data nhanh nhất.
Sau đo install Kue vào project của bạn:
```
npm install kue --save
```
## Tạo worker job
Để đơn giản, mình sẽ tạo 1 job cơ bản thực hiện 1 nhiệm vụ download 1 file tương đối nặng về.
Bắt đầu bằng việc tạo queue:
```Javascript
const kue = require('kue')
, queue = kue.createQueue();
```
Queue này chính là 1 hàng đợi để chứa các job mà chúng ta sẽ tạo ra.
Từ queue này chúng ta sẽ tạo ra các job và lưu vào queue. Dưới đây là ví dụ:
```Javascript
var job = queue.create('startdownload', {url: url}).save(function(error) {
			if (!error) console.log(job.id);
			else console.log(error);
		});
```
Có thể thấy đây là 1 lời gọi function đơn giản, với tham số đầu vào là tên của job: `startdownload`, data kèm theo sẽ là 1 object chứ thuộc tính url là link để download về. Sau khi job được tạo ra, call `save()` để lưu vào queue. Khi 1 job được tạo ra chúng sẽ được cấp phát 1 id tương ứng.
Vậy job này thực thi ra sao, chúng ta cần viết process cho job, bằng câu lệnh:
```Javascript
queue.process( 'startdownload', 1, downloadImageJob);
```
Bạn có thể dễ dàng nhìn ra cấu trúc của câu lệnh trên, lưu ý tham số thứ 2 chính là thuộc tính lưu số job thuộc kiểu này có thể active cùng 1 thời điểm, ở đây để giới hạn tôi đặt là 1. Vậy còn tham số `downloadImageJob` là gì. Đây là 1 hàm gồm 2 tham số là job và call back : done, chúng ta sẽ thực thi tác vụ download file và gọi done khi kết thúc. Đây là ví dụ:
```Javascript
function downloadImageJob(job, done) {
	downloadImage(job.data.url).then(() => {
		console.log('download done');
		done();
	})
}
```
Hàm downloadImage đơn giản là 1 hàm raw để download file, ở đây sẽ sẽ sử dụng Axios để download, code cơ bản sẽ là:
```Javascript
const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const moment = require('moment');

async function downloadImage (url) {
  const path = Path.resolve(__dirname, '../downloads', moment().format('YYYYMMddmmssa'))

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
    onDownloadProgress: function (e) {
      console.log("This just in... ", e);
    }
  })

  console.log("call function download");
  // pipe the result stream into a file on disc
  response.data.pipe(Fs.createWriteStream(path))
  
  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log('download end');
      resolve()
    })

    response.data.on('error', () => {
      console.log('download error');
      reject()
    })
  })

}
```
Hàm download này sẽ download file từ url và save response trong folder `downloads` của project.
Vậy là chúng ta đã tạo xong 1 job, đơn giản quá  phải ko? :)
## Quản lý các jobs
Để thực hiện quản lý các job chúng ta cần tạo ra 1 trang web đơn giản, sẽ có chức năng call đến server để gọi lời download file kia. Để bắt đầu đơn giản, tôi sẽ khởi tạo Express, 1 thư viện hỗ trợ tạo server http đơn giản nhất. Cách nhanh nhất dùng Express generator. Bạn gõ vào terminal lệnh:
```
express --view=ejs myapp
```
Sau khi cái đặt bạn, có thể xây dựng 1 router tới trang home page của mình, hiển thị list những job đang được active:
```
var express = require('express');
var router = express.Router();
const queue = require('../workers/worker').queue;

/* GET home page. */
router.get('/', function(req, res, next) {
  var jobs = [];
  queue.active( function( err, ids ) {
    ids.forEach( function( id ) {
      console.log('id: ' + id);
      jobs.push({id: id});
    });
    res.render('index', { title: 'Kue' , jobs: jobs});
  });
});
```

Ở đoạn code trên chúng ta query từ queue ra những job đã được ative và trả về kết quả là list id của các job. Để hiển thị được cần cập nhật trong file view nữa, ở đây là `index.ejs`:
```Javascript
<body>
    <h1><%= title %></h1>
    <h2>Queue jobs</h2>
    <h3>Active jobs:</h3>
    <ul id="list">
      <% 
        jobs.forEach((job) => {
      %>
      <li><a href="#"><%= job.id %></a></li>
      <%
        });
      %>
    </ul>
    <button id="button_start">Start job</button>
    <span>

    </span>
  </body>
```

Màn hình này sẽ hiển thị list ids của các job, và 1 button `Start job` để chạy 1 job. Chúng ta cần implement chức năng cho button này. Tuy nhiên tôi lại muốn cập nhật trạng thái của các job 1 cách ngay lập tức, tôi sẽ sử dụng Socket.io để update status của các job. Các bạn cần cài đặt `socket.io` và `socket.io-client` trước, qua lệnh:
```
npm install socket.io socket.io-client
```

Sau đó khởi tạo socket kèm theo server của express bằng đoạn code sau:
```Javascript
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('start', function(data) {
        console.log(`url: ${data.url}`);
        if (data.type === 'download') {
            var job = worker.downloadImage(data.url);
            job.on('start', function() {
                io.emit('start', {id : job.id});
            });

            job.on('complete', function() {
                io.emit('complete', {id : job.id});
            });
        }
    })
});
```
Ở đây socket trên server sẽ lắng nghe lệnh `start` khi gặp và sẽ khởi tạo 1 worker job download file mà chúng ta đã thực hiện ở trên. Khi chạy xong thì ở sự kiện job thực hiên thành công : `complete`, chúng ta emit cho client biết kết quả, để update view  cho người dùng có thể thấy.<br/>
Tiếp đến là phần client ở phía view chúng ta sẽ khởi tạo socket như sau:
```Javascript
var socket = io();
      socket.on('start', function(data) {
        $("#list").append(`<li><a href="#">${data.id}</a>&nbsp;<span id="log_${data.id}" class="span_log">Running</span></li>`);
      });

      socket.on('complete', function(data) {
        $(`#log_${data.id}`).text('Completed');
      });

      $(document).ready(function() {
        $("#button_start").click(function() {
          socket.emit('start', {type: 'download', url: 'https://www.sample-videos.com/zip/10mb.zip'});
        });
      });
```

Từ đoạn code trên có thể phân tích như sau. Đầu tiên socket sẽ lắng nghe `start` là khi server start 1 job mới, chúng ta sẽ append vào list, trạng thái lúc này sẽ là `Running`. Khi job hoàn thành server sẽ bắn về trạng thái `complete` và chúng ta cũng update trạng thái cho job đấy là `Completed`<br/>
Còn lệnh cuối cùng chỉ là handle sự kiện click vào button `Start job` lúc nãy và bắn lên server kèm theo url của file cần download qua Socket.

## Kết quả
Chúng ta đã thực hiện kha khá các đoạn code rồi phải không h hãy chạy thử xem nào, Đầu tiên 1 giao diện đơn giản như sau:<br/>
![](https://images.viblo.asia/5dba37e4-e9cd-4bc3-850f-da7c5adec891.png)<br/>
Sau khi click `Start job`, chúng ta thấy ngay kết quả 1 job được tạo ra và đang running:<br/>
![](https://images.viblo.asia/a149db9a-8912-411b-b27e-da3c726f5c52.png)<br/>
Và 1 lúc sau nó sẽ complete:<br/>
![](https://images.viblo.asia/ec29dafb-56df-43b6-a23d-0b8368fef6e1.png)<br/>
Tất nhiên là bạn có thể start liên tục rất nhiều job cùng 1 lúc, tuy nhiên như lúc đầu chúng ta đã giới hạn chỉ có 1 job được active cùng 1 thời điểm, nên chúng sẽ chạy lần lượt chứ ko đồng thời đâu, nếu muốn bạn có thể thay đổi setting đó.
Sau khi hoàn thành bạn kiểm tra thư mục `downloads` sẽ thấy các file ở đó:<br/>
![](https://images.viblo.asia/ba465d66-f5a8-48da-9dbd-538570b9efd5.png)<br/>
## Kết luận:
Chúng ta đã trải qua 1 ví dụ khá là trực quan và đơn giản về việc chạy 1 job và update trạng thái của chúng bằng cách sử dụng framework : `Kue`. Kue thật sự mạnh mẽ với rất nhiều các tính năng mà chúng ta chưa trải nghiệm hết, hy vọng qua bài viết này các bạn sẽ dễ dàng hình dung hơn về cách tạo 1 worker job chạy trên server Node.js như thế nào.