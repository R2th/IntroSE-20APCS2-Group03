Thumbnail theo nghĩa tiếng anh được dịch ra là “ảnh thu nhỏ“, thuật ngữ này được sử dụng để chỉ việc xử lý ảnh ra một kích thước nào đó như là một ảnh đại diện cho một bài viết hay một video nào đó, để khi người dùng nhìn vào có thể hình dung ra được bài viết hay đoạn video đó nói về vấn đề gì.

Có nhiều cách để lấy ảnh thumbnail image và thông tin chi tiết (kích thước, duration) từ video, lấy từ backend hoặc frontend. 

Ở backend, giả sử ta sử dụng framework Rails, ta có thể thêm thư viện [streamio-ffmpeg](https://github.com/streamio/streamio-ffmpeg) và cần cài đặt tool ffmpeg cho server. 

Với frontend, ta sử dụng thư viện Javascript [ffmpeg](https://www.npmjs.com/package/ffmpeg) sẽ giúp trả về thông tin video, còn muốn lấy thumbnail image từ video, thì với frontend, chúng ta chỉ cần sử dụng thủ thuật là tạo video element, cho chạy rồi chụp lại element sẽ được 1 ảnh thumbnail video, sau đó xoá element đó đi. Tuy nhiên nếu muốn có các ảnh thumbnail ở các thời điểm khác nhau của video thì với cách này sẽ cần cho video chạy đến các thời điểm đấy để chụp, như vậy thì sẽ tốn nhiều thời gian. 

Với cả 2 phương pháp đều có ưu nhược điểm riêng:

Khi xử lý trên backend, chúng ta cần cài thêm tool ffmpeg cho server, tool này cũng hơi nặng, như vậy sẽ chiếm tài nguyên và thời gian xử lý video.

Khi xử lý ở frontend, cũng cần thời gian để code js hoạt động, như vậy sẽ ảnh hưởng đến các trải nghiệm người dùng.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu thêm 1 cách để lấy các thông tin video và ảnh Thumbnail bằng Google Cloud Function. Chúng ta sẽ vận dụng các dịch vụ Google để thực hiện tạo ảnh thumbnail, lưu ảnh vào google storage,  và gửi thông tin video về cho response.

### Cloud Function 

Cloud Function là nền tảng tính toán hướng sự kiện và không phụ thuộc vào server của Google Cloud. Bạn có thể chạy code trên cloud mà không cần phải sở hữu hay giám sát 1 server. Cloud Functions sẽ tự động mở rộng hoặc thu nhỏ, như vậy bạn chỉ cần phải trả theo số lượng tài nguyên tính toán bạn dùng. 

Đầu tiên, bạn cần tạo Google cloud Account, sau đó có thể sử dụng các dịch vụ của google bằng nhiều cách, trong bài viết này chúng ta sẽ sử dụng qua google cloud console, ta vào trang [Cloud Function](https://console.cloud.google.com/functions/list) và chọn button `Create Function`

Tại đây, ta nhập các thông tin cần thiết cho Cloud Function, như Name, Memory allocated, Trigger và Authentication. Và quan trọng nhất là source code mà chúng ta cần chạy. Cloud Function cho phép upload code qua file Zip từ local, hoặc từ Cloud Storage, hoặc code trực tiếp. 

![](https://images.viblo.asia/8fcf4b96-1ced-4301-b81e-4d6708bc093d.png)

Với code trực tiếp qua editor trên cloud, cloud function hỗ trợ 3 ngôn ngữ là Go, NodeJS và Python. Trong bài viết này tôi sẽ sử dụng NodeJS.

Đầu tiên là khai báo các thư viện cần dùng trong file `package.json`

```
{
  "name": "sample-http",
  "version": "0.0.1",
  "description": "test ffmepg",
  "author": "Your Name <your@email.com>",
  "engines": {
    "node": "^8"
  },
  "dependencies": {
    "@ffmpeg-installer/ffmpeg": "1.0.20",
    "fluent-ffmpeg": "2.1.2",
    "@google-cloud/storage": "^4.5.0",
    "request": "2.88.2"
  },
  "devDependencies": {}
}
```

Trong file `index.js`, chúng ta sẽ thêm các code cần thiết cho function của mình, gồm code lấy ảnh thumbnail, và thông tin của video, code upload ảnh thumbnail lên Cloud Storage 

```
# fetchMedia là tên của Cloud Function 
exports.fetchMedia = (req, res) => {
  # sử dụng thư viện fluent-ffmpeg để đọc video, truy xuất thông tin video và lấy ảnh thumbnail 
  let ffmpeg = require('fluent-ffmpeg');
  
    # Khai báo bucketName cho cloud storage 
   const bucketName = 'bucketName';
  
  let url = req.url;
  let tmpPath = '/tmp/screenshot.jpg';
  
  # Khai báo thư viện Storage để sử dụng cloud storage 
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();  
  
  ffmpeg(url)
    .seekInput('00:00.000')
    .output(tmpPath)
    .outputOptions(
        '-frames', '1'  // Chỉ lấy 1 ảnh của video 
    )
    .on('end', function() {
       # sau khi tạo được ảnh thumbnail, tiến hành upload ảnh đến Cloud Storage  
       storage.bucket(bucketName).upload(tmpPath, {
          gzip: true,
          metadata: {
             cacheControl: 'public, max-age=31536000',
          },
        });

      let thumbnailUrl = `https://storage.googleapis.com/${bucketName}/screenshot.jpg`;
      
      # Sử dụng method ffprobe để lấy thông tin video và gửi về client data video và thumbnailUrl 
      ffmpeg.ffprobe(url, (err, metadata) => {
         # Tạo request response về server 
	     if (!err) {
            res.status(200).json({metadata: metadata.format, thumbnailUrl: thumbnailUrl});
         } else {
            res.status(200).json({error: err});
         }
      });      
  })
    .run();
};
```

Sau đó, bấm vào button Create/Deploy để tạo function có name là fetchMedia, sau khi xử lý xong, chúng ta có thể click vào button testing để kiểm tra code chạy đã OK chưa.

Ở đây, chúng ta sẽ upload lên Cloud Storage cùng account google nên không cần thêm thông tin authenticate cho account khi sử dụng Cloud Storage. Nếu muốn sử dụng account google khác cho Storage, chúng ta cần khai báo thông tin authenticate cho account:

```
storageOptions = {
  projectId: 'your-project-id',
  credentials: {
        client_email: 'your-client-email',
        private_key: 'your-private-key'
  }
};
client = new Storage(storageOptions);
```

Trong detail của 1 cloud function, sẽ hiển thị link URL cho function mà ta sẽ dùng qua link đấy để gọi hàm. Khi đấy, trên server sau khi upload video lên storage xong, ta sẽ có link url của video và tạo hàm để kết nối đến cloud function với link video đấy để lấy các thông tin cần thiết.

### Cloud Storage

Cloud Storage là dịch vụ lưu trữ của google. Cloud Storage cung cấp lưu trữ đối tượng có độ bền cao trên toàn thế giới, có thể scale tới từng exabyte dữ liệu. Bạn có thể truy cập dữ liệu ngay lập tức từ bất cứ lớp storage nào, tích hợp dễ dàng storage vào các ứng dụng của bạn với bộ API thống nhất và tối ưu hoá chi phí và hiệu năng.

Trong đoạn code trên, chúng ta sử dụng Cloud Storage để lưu trữ ảnh thumbnail khi được tạo từ video bằng thư viện `google-cloud/storage` trong nodeJS, nhưng mới chỉ dừng lại ở việc tạo link function, cách này hơi thủ công khi cần phải thêm 1 request google cloud api sau khi upload video lên storage. 

Giờ bài toán tiếp theo là khi upload video lên Cloud Storage, ta sẽ tự động gọi cloud function luôn.
 
Để tự động gọi cloud function khi upload video lên Storage, ta sử dụng `Google Cloud Storage Triggers`.

Sự kiện Cloud Storage được sử dụng bởi Cloud Functions. Bao gồm các sự kiện:

```
google.storage.object.finalize
google.storage.object.delete
google.storage.object.archive
google.storage.object.metadataUpdate
```

Trong bài toán yêu cầu khi upload video thì gọi function, vì vậy chúng ta sẽ sử dụng sự kiện `google.storage.object.finalize`, sự kiện này sẽ được gọi khi một object mới được tạo trong bucket.

Khi đấy ta thay đổi code function 1 chút trong khai báo function 

```
# fetchMedia là tên của Cloud Function 
# param {object} data là payload của event 
# param {object} context là event metadata
exports.fetchMedia = (data, context) => {
  # sử dụng thư viện fluent-ffmpeg để đọc video, truy xuất thông tin video và lấy ảnh thumbnail 
  let ffmpeg = require('fluent-ffmpeg');
  
    # Khai báo bucketName cho cloud storage 
   const bucketName = data.bucket;
   const videoName = data.name;
  
  # url sẽ được lấy từ data event 
  let url = 'https://storage.googleapis.com/' + bucketName + '/' + videoName;
  ......
};
```

Tuy nhiên, ở trên ta cần lấy thông tin thumbnail url từ video , với trigger như này, sẽ không trả về thông tin metadata video trong json nữa 
`res.status(200).json({metadata: metadata.format, thumbnailUrl: thumbnailUrl});`

vậy nên, cần update lại metadata của video đấy trong cloud function này.

Ưu điểm của cách này cũng là về sau khi gọi đến metadata của video, sẽ chứa thêm cả các dữ liệu cần thiết mà ta có thể thêm được, vd như thumbnailUrl

Để update bucket, ta sử dụng hàm `setMetadata` của thư viện storage

```
    storage.bucket(bucketName)
      .file(videoName)
      .setMetadata({
        metadata: {
          thumbnailUrl: thumbnailUrl
        },
      });
```

khi đấy thông tin video metadata gửi về sẽ chứa link thumbnailUrl, ngoài ra ta có thể thêm các dữ liệu video khác nếu cần.

Để trigger cloud function cho event google.storage.object.finalize ta sử dụng cloud command line

```
gcloud functions deploy fetchMedia --runtime nodejs8 --trigger-resource YOUR_TRIGGER_BUCKET_NAME --trigger-event google.storage.object.finalize
```

Trên đây là hướng dẫn và ideal cho phương pháp xử lý video mới, đó là qua cloud function trên google cloud service, ngoài lấy thumbnail, ta có thể thêm các thao tác xử lý video khác. Với phương pháp này, ta sẽ chuyển phần xử lý cho cloud, giảm tải cho server hoặc browser, tuy nhiên, cần lưu ý tính toán chi phí cho phương pháp này. 

Chi phí cho Cloud function gồm tổng chi phí khi gọi hàm + thời gian tính toán + network + dung lượng đĩa local, chi tiết hơn cho các chi phí này được ghi cụ thể trên trang chủ https://cloud.google.com/functions/pricing