Chào mọi người! Trong một tháng vừa qua sấp mặt với dự án mình cũng kịp góp nhặt được một điều thú vị để chia sẽ với các bạn đó  là HTML5 Web Workers (giống như queue job bên laravel vậy).
# HTML5 Web Workers.
Ở đây mình đưa ra một vấn đề như thế này, giả sử các bạn đang có một biến data có cấu trúc như sau như sau:
```
var data = [
    {
        user_name: 'A',
        friends: [
            {
                friend_name: 'B',
                post: ['Web Workers', ...]
            },
            ...
        ]
    },
    ...
]
```
Ở đây giả sử data  có lenght  là 10, mỗi user lại có 100 friend và mỗi friend có 1000  bài post. Bài toán đưa ra là list tất các các bài post trong biến data lên môt page html. Nếu như làm theo cách thông thường các bạn chạy foreach data trên một file js và import nào vào trong file html để hiện list trên page html. Đến đây có một vấn đề nảy sinh đó là chúng ta phải chạy 1 000 000 vòng lặp để lấy hết các bài post => khi chạy script này thì user interface sẽ bị đơ(không đáp ứng các thao tác của người dùng) cho đến khi script của chúng ta chạy xong. Nếu như vậy thì rất không tốt.

Web Workers sinh ra để giải quyết vấn đề đó. Nó sẽ chạy ở background, trong khi đang chạy 1 000 000 vòng lặp dưới background thì user vẫn có thể thao tác với các thành phần khác mà không bị đơ.
# Cách Dùng Web Workers.
Khi dùng Web Workers bạn phải biết được là page mình viết ra chạy trên trình duyệt nào, phiên bản bao nhiêu có được support Web Workers hay không. Các bạn có thể tham khảo ở [đây](https://www.w3schools.com/html/html5_webworkers.asp).
Để các hiểu rõ về cách dùng của Web Workers mình sẽ giải quyết bài toán trên bằng cách dung Web Workers.
Giờ mình sẽ tạo một file app.js (file này dùng để import vào file index.html) và một file worker.js (chú ý là các file này ngang hàng nhau nhé)
File app.js của mình sẽ có nội dung sau:
```
    if (window.Worker) {     // kiểm tra trình duyệt có hổ trợ web worker hay không
        var data = [
            {
                user_name: 'A',
                friends: [
                    {
                        friend_name: 'B',
                        post: ['Web Workers', ...]
                    },
                    ...
                ]
            },
            ...
        ]
        var myWorker = new Worker('worker.js'); //khởi tạo new worker.
        myWorker.postMessage(data); // truyền dữ liệu qua file worker.js để xử lý.
        
        myWorker.onmessage = function(e) { // nhận data từ file worker.js trả về và làm gì tiếp theo tùy bạn
          result = e.data; //data từ file worker truyền lên
          // xử lý để show list bài post lên cho user
        }
    } else  {
        alert('trình duyệt không hổ trợ web worker')
    }
```

File worker.js có nội dung như sau:
```
// quá trình chạy trong file này không làm đơ page.
onmessage = function (e) {  //nhận data từ file app.js gửi xuống.
    var result = []
    var data = e.data // Lấy data của file file app.js gửi xuống.
    data.forEach((item, index) => {
        item.friends.forEach((item1, index1) => {
            item1.post.forEach((item2, index2) => {
                  result.push(item2)
            })
        })
    }) 
    
    postMessage(result) //gửi trả lại kết quả xử lý cho file app.js.
}
```

Đến đây việc của file app.js là show các bài post cho user.
Vậy chúng ta đã giải quyết được vấn để gặp phải ở đầu bài. Hi vọng qua bài viết này cung cấp thêm cho bạn một kiến thức bổ ích, có thể áp dụng để giải quyết vấn đề dễ dàng khi các bạn gặp phải sau này. 
Nội dùng bài viết được tham khảo tại [https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
Chào thân ái! Quyết thắng.