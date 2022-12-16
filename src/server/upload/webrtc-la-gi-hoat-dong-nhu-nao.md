WebRTC được sử dụng cho việc kết nối ngang hàng trên web, điều đó có nghĩa là gì? Điều đó có nghĩa là trình duyệt của bạn, chẳng hạn, có thể kết nối với một trình duyệt khác và chia sẻ các loại dữ liệu khác nhau giữa chúng, như video, luồng âm thanh hoặc chỉ một số đoạn dữ liệu JSON…
Trong ví dụ hôm nay, chúng ta sẽ tìm hiểu xem cách hoạt động của WebRTC ra sao.
# Divide & Conquer

WebRTC có chứa nhiều class và object như: MediaStream, RTCPeerConnection, RTCDataChannel, v.v. cũng có một số từ khó như NATS, Stunt, Signaling Server…

# MediaStream

Trước khi bắt đầu truyền video từ trình duyệt này sang trình duyệt khác, điều đầu tiên chúng ta phải làm là sử dụng dữ liệu webcam bằng cách nào đó. Do, chúng tôi sẽ sử dụng **MediaStream API**
API MediaStream cung cấp khả năng bắt luồng micrô hoặc webcam trên thiết bị. Ngay cả khi dữ liệu không được gửi đi, chúng ta vẫn có thể hiển thị chế độ xem webcam bên trong trang web.
Tất cả những gì chúng ta phải làm là hỏi người dùng của mình xem có muốn cấp cho chúng ta loại quyền đó không, đây là cách chúng ta thực hiện điều đó bằng cách sử dụng javascript.

```

   //we call getUserMedia to get stream
   navigator.getUserMedia({ video: true, audio: false },function(stream) { 
       //Here we are atttaching our incoming stream
       //to the video element inside our web page  
       var video = dcument.querySelector('video'); 
		
      //inserting our stream to the video tag     
      video.src = window.URL.createObjectURL(stream); 
   }, function (err) {}); 
}
```

Bất cứ khi nào chúng ta gọi function này. Trình duyệt sẽ bật lên một popup cảnh báo nói rằng ứng dụng đang cố gắng truy cập vào máy ảnh.
![](https://images.viblo.asia/b8a7bfa3-1186-42fe-bf29-828540f90fc6.png)

Và nếu người dùng chấp nhận, thì chúng ta lấy luồng của sử dụng session của camera và tích hợp vào trình web. Như vậy chúng ta có thể  xem được video ngay tức thì.

# RTCPeerConnection

Sau khi chúng ta đã có được session của camera công luồng, giờ đây chúng ta có thể gửi session đó đến bất kỳ trình duyệt nào khác, nhưng chúng ta làm điều đó như thế nào? Chúng ta sẽ sử dụng RTCPeerConnection cho việc đó
Trước khi giải thích cách hoạt động của RTCPeerConnection, trước tiên chúng ta cần biết 1 số ý sau dòng sau:

## Signaling Servers
Chúng ta không thể tránh một số máy chủ, ngay cả khi các trình duyệt đang giao tiếp với nhau.

Trước hết, trình duyệt cần tìm một trình duyệt khác bằng cách nào đó để bắt đầu nói chuyện với nhau, đó là nơi Máy chủ báo hiệu hoạt động.

Đây là một phiên bản đơn giản của việc bắt đầu giao tiếp với webRTC.

Giả sử chúng tôi muốn truyền video từ Trình duyệt “Darth Vader” sang trình duyệt “luke skywalker”, đây là cách cuộc trò chuyện sẽ bắt đầu
Darth Vader
hey Signaling Server, tôi muốn kết nối với người tôi biết, bạn có thể cung cấp Mã định danh duy nhất của tôi không? (chúng tôi gọi phương thức createOffer)

Signaling Server

này Darth Vader, chắc chắn tôi có thể cung cấp cho bạn một Số nhận dạng duy nhất, đây là một (phương pháp này sẽ trả về một số Số nhận dạng duy nhất)

Darth Vader

cảm ơn bạn Signaling Server Tôi đã đặt mã định danh duy nhất này cho “bộ mô tả cục bộ” của mình để Nó sẽ trở thành Mã định danh duy nhất của tôi (gọi phương thức setLocalDescription với phản hồi createOffer trả về)

Xin chào Luke skywalker, tôi đang cố gắng bắt đầu kết nối WebRTC với bạn, đây là Mã định danh duy nhất của tôi (hiện tại chúng tôi đang gửi Mã nhận dạng duy nhất này tới trình duyệt Luke skywalker, chúng tôi có thể gửi theo cách chúng tôi muốn, chúng tôi có thể gửi qua socket. vấn đề, phần quan trọng là Luke skywalker bằng cách nào đó lấy được dữ liệu này)

Luke skywalker

Xin chào bố (Darth Vader), con nghe nói bố muốn truyền một số dữ liệu với con. Con đã có Số nhận dạng duy nhất của bố, con sẽ đặt mã đó vào bộ mô tả từ xa của mình để bố biết mình đang nói chuyện với ai (gọi setRemoteDescription với mã nhận dạng duy nhất của Darth Vaders)

Xin chào Signaling Server, tôi muốn chấp nhận lời đề nghị từ bố tôi và tôi cũng muốn có một số Nhận dạng duy nhất để bố tôi có thể tìm thấy tôi (gọi phương thức "tạo câu trả lời")
Máy chủ báo hiệu

Xin chào, Luke skywalker, chắc chắn bạn có thể nhận được một số Nhận dạng duy nhất sau đây là…

Luke skywalker
cảm ơn, Signaling Server, tôi sẽ đặt nó vào bộ mô tả cục bộ của mình (gọi phương thức setLocalDescriptor với phản hồi “createAnswer”)

này, bố ơi, đó là số nhận dạng duy nhất của tôi (gửi số nhận dạng theo cách tương tự).

Darth Vader

con trai tuyệt vời, tôi đã lưu vào bộ nhớ cache, tôi sẽ đặt nó vào bộ mô tả từ xa của mình (gọi setRemoteDescriptor với Mã định danh duy nhất)

Bây giờ cuối cùng chúng ta cũng có thể chia sẻ luồng của mình

## Cùng thực hiện

Đây là cách chúng ta có thể implement việc giao tiếp với cách miêu tả bên trên như sau
```
//this function is used to send some data via socket. to web server
function send(message, dataToSend) {
  //sending logic HERE
}

//this function is used to listen to some messages from web server
//via socket again
function on(message, callback) {
 // recieve Logic here
}

//here we are configurating our RTCPeerConnection
//we have to set some Signaling Server for it
//on this case it's googles signaling server
var configuration = {
  iceServers: [{ urls: "stun:stun.1.google.com:19302" }]
};

// we create connection
var darthWaderPc = new webkitRTCPeerConnection(configuration);
console.log("RTCPeerConnection object was created");
console.log(darthWaderPc);

//first we get our webcam stream
//and set it to our rpcConnection
navigator.getUserMedia({ video: true, audio: false },
    function(stream) {
      //so you have 1 stream and can have multiple tracks
      //for example here we have only 1 track it's and video track
     // but we could also have audio track 
      stream.getTracks().forEach(t=>darthWaderPc.addTrack(t));
    },
    function(err) {
      alert("Not stream found");
    }
);

//now we have to  create offer
//create offer asks signaling server to get some unique identifier
darthWaderPc.createOffer().then(offer => {
  
  //We set our unique identifier to local descriptor
  darthWaderPc.setLocalDescription(offer);

  //now we have to send this unique identifier to another client
  //we send it to the web server first via socket and then web server will
  //send it to another client
  send("OFFER", offer);
});

//here we have the second client initiated
var lukeSkywalkerPc= new webkitRTCPeerConnection(configuration);


//so when we finally connect two clients
//this method will be called and will catch stream here
//so we can for example attach it to our video element inside our page
lukeSkywalkerPc.ontrack = (event)=>{
     let stream = event.streams[0];
  
}

//when the offer will arive to another client
//it will set unique identifier to remoteDescription
//and start to create answer and then send his unique identifier
//to the first client
on("OFFER", offer => {
  lukeSkywalkerPc.setRemoteDescription(offer);

  lukeSkywalkerPc.createAnswer().then(answer => {
    lukeSkywalkerPc.setLocalDescription(answer);

    send("ANSWER", answer);
  });
});


//finally when the first client gets answer everything is set up
//so they first client can share stream with another client
on("ANSWER", answer => {
  darthWaderPc.setLocalDescription(answer);
});
```


Vì vậy chúng ta có 2 phiên bản RTCPeerConnection và chúng chỉ đang chia sẻ số nhận dạng duy nhất của chúng với nhau.

# Tổng kết

WebRTC trông có vẻ đáng sợ, nhưng thực sự không có gì khác ngoài việc bắt đầu một cuộc trò chuyện với hai trình duyệt có một số nhận dạng duy nhất. Niềm vui mà bạn sẽ nhận được khi lần đầu tiên bạn chia sẻ một số luồng video giữa hai trình duyệt thực sự đáng để dành vài giờ hoặc vài ngày để tìm hiểu nó.

Bạn có thể đọc thêm cụ thể về webrtc qua khóa học này: https://www.tutorialspoint.com/webrtc/index.htm