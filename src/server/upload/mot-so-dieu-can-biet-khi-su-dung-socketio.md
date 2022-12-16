## Mục đích
**Chia sẻ một chút **
Đây là lần đầu mình viết blog để trên https://viblo.asia/. Có thể bài viết của mình sẽ có đôi chút lủng củng mặc dù vậy mong các bạn đọc đưa thêm phản hồi để bài viết được tốt hơn.
> Bài viết này không nhằm mục đích cho những bạn chưa biết gì về socket.io, nodejs, javascript.
Bài viết sẽ chủ yếu đưa ra các một số cách để thực hiên socket.io và turning performent ứng dụng một cách triệt để.
## Một số cách emit data
**1. Self emit**

![](https://images.viblo.asia/c8cf9cb6-0eb0-4242-8b38-b65c85510ea9.PNG)
```
io.on('connect', function(socket){
    socket.emit('B', somethingElse);
})
```
Hàm này chỉ emit data cho chính socket đó

**2. broadcast emit**

![](https://images.viblo.asia/268a0eff-bf90-457f-8627-bc842ee3d353.PNG)
```
io.on('connect', function(socket){
   socket.broadcast.emit('user connected');
})
```
**3. room emit**

![](https://images.viblo.asia/1c8531c1-cc69-45ff-9ea1-3b205909590b.PNG)

```
io.on('connect', function(socket){
   io.to('some room').emit('some event');
})
```

**4. socketId emit**

![](https://images.viblo.asia/eeed934c-84a1-4218-ac7a-e3a43f609e9e.PNG)


```
io.on('connect', function(socket){
  io.to(socketid).emit('message', 'for your eyes only');
})
```
bạn có thể thấy emit to room sẽ rất giống với emit socketId vì mỗi socket sẽ được tạo ra 1 socketId và roomId giống nhau (**socket đó tự động join cái room có Id === socketId**) 

Trên đây là một số cách gửi data đơn giản với socket.
Phần tiếp theo là một số function hay sử dụng nhất của socket
## Function 
1. Lấy tất cả socketId trong 1 name space
```
const io = require('socket.io')();
io.of('/chat').clients((error, clients) => {
  if (error) throw error;
  console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});
```
2. Lấy tất cả socketId trong 1 room
```
io.in(roomId).clients((err,clis)) => {
        console.log(clis);
});
```
3. Lấy tất cả room mà socket đó join
```
let roomIds = socket.rooms;
```
4. Lấy instance socket với socketId
```
let socket = io.connected[id];
```
5. Lấy instance Room từ roomId
```
let roomObj = io.nsps[namespace].adapter.rooms[room];
```
6. Join multiple room
```
socket.join(rooms[, callback]) // rooms is Array, not use for
```
7. Ack sending
```
socket.emit('question', 'do you think so?', (answer) => {}); // callback được gọi khi bên nhận đã lấy được data
```
8. gửi dữ liệu nén

```
socket.compress(true).emit('compressed', "this is compress");
```

9. Gửi message có thể bị hủy bỏ nếu client chưa sãn sàng nhận

```
socket.volatile.emit('maybe', 'do you really need it?');
```

10. Gửi đến client trong 1 node

```
io.local.emit('hi', 'Hello my clients in this node');
```
## Lời kết
Mong là bài viết này sẽ có ích cho mọi người, mình rất mong muốn nhận được sự nhận xét và cũng như chia sẻ kiến thức ngược lại từ các bạn. Mình sẽ cố gắng tiếp tục tìm hiểu về NodeJs và đưa ra những bài viết tiếp theo về NodeJs mong nhận được sự ủng hộ từ mọi người.

Minh xin chân thành cảm ơn!