# Giới thiệu
![](https://images.viblo.asia/af16ac12-f61a-4771-98c1-e7cf0fe04afa.png)

gRPC là một framework RPC (viết tắt của Remote Procedure Call) được phát triển bởi Google, nhằm tối ưu hoá và tăng tốc việc giao tiếp giữa các service với nhau trong kiến trúc microservice.

gRPC đã thu hút sự quan tâm của nhiều nhà phát triển microservice trong những năm gần đây vì những điễm nỗi bật sau:

1. Mã nguồn mở.
2. Protocal Buffer giảm kích thước request và response data.
3. RPC đơn giản hoá trong việc tạo ra các giao tiếp giữa các service với nhau.
4. Hỗ trợ HTTP/2 để tăng tốc gửi/nhận HTTP request
5. Khả năng tương thích đa nền tảng. 

Theo Google

> gRPC is a language-neutral, platform-neutral remote procedure call (RPC) framework and toolset developed at Google. It lets you define a service using Protocol Buffers, a particularly powerful binary serialization toolset and language. It then lets you generate idiomatic client and server stubs from your service definition in a variety of languages

Tóm lại, ứng dụng gRPC Server phân phối các service methods có thể được gọi trực tiếp bởi các gRPC Client trên các máy và nền tảng khác nhau với cùng tham số và kiểu trả về. 

gRPC sử dụng Protocol Buffer để định dạng message request và response giữa máy chủ và máy khách dưới dạng nhị phân. Nó nhỏ gọn hơn JSON và và sau đó chuyển đổi lại ngôn ngữ ban đầu bằng Protocol Buffer compiler. 

Trong bài viết này, chúng ta sẽ build một gRPC Server đơn giản với nodejs. gRPC Server sẽ cung cấp dịch vụ để tạo, đọc, sửa, xoá Note. Bên cạnh đó chúng ta sẽ build một gRPC Client để gọi các method đó từ gRPC Server. Tất cả mã nguồn của bài viết có sẳn tại [link git](https://github.com/alfianlosari/node-grpc-server-note-crud) của tác giả các bạn có thể tải xuống.

# Nội dung

1. Tạo một dự án Node.js sử dụng npm và install các thêm gói dependencies cho gRPC.
2. Tạo file proto - định nghĩa các messgage và service gRPC cho Note CRUD.
3. Tạo gRPC Server sử dụng node.js.
4. Tạo một method list cho service để lấy danh sách Note.
5. Tạo gRPC Client sử dụng node.js.
6. Tạo một method insert cho service để tạo mới Note.

# Tạo dự án Node.js và thêm các gói dependencies 

Vào thư mục dự  án chạy lệnh npm init để khởi tạo dự án node.js. Sau đó thêm 2 gói dependencies cho gRPC bên dưới:

1. gRPC - thư viện gRPC cho node.js
2. uuid - thư viện để tạo 1 UUID duy nhất dựa vào timestamp

```
npm install grpc
npm install uuid
```
# Định nghĩa file proto

Bên trong thư mục dự án tạo một file mới có tên là notes.proto. Trong file này chúng ta định nghĩa một messgae đại diện cho model Note. 

```
syntax = "proto3";
message Note {
    string id = 1;
    string title = 2;
    string content = 3;
}
```
# Triển khai gRPC Server
Bên trong thư mục dự án tạo một file mới có tên là index.js. Trong file này chúng ta sẽ import module grpc, sau đó sử dụng method load của grpc để thêm file notes.proto vào gRPC Server của chúng ta.
Tiếp đến chúng ta khởi tạo server vào bind nó vào địa chỉ localhost với port 500051. Cuối cùng chúng ta start server.
```
const grpc = require('grpc')
const notesProto = grpc.load('notes.proto')
const server = new grpc.Server()
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
```

Bây giờ chúng ta có thể chạy thử server bằng cách chạy lệnh node index.js. Kết quả trên console chúng ta sẽ thấy log 'Server running at http://127.0.0.1:50051' cho thấy server chúng ta đang chạy.

# Tạo List RPC method
Với lần đầu tiên, trước hết chúng ta cần định nghĩa một service có tên là NoteService. Trong service này chúng ta khai báo một method List lấy một message rổng và trả về dánh sách Note.

```
syntax = "proto3";
service NoteService {
    rpc List (Empty) returns (NoteList) {}
}
message Empty {}
message Note {
   string id = 1;
   string title = 2;
   string content = 3;
}
message NoteList {
   repeated Note notes = 1;
}
```

Sau khi tạo service chúng ta cần thêm service này vào gRPC Server - tức là file index.js. Chúng ta gọi method addService và truyền service NoteService từ gói notes.proto chúng ta đã load ở trên,  tham số thứ hai cho method addService là một object chứa key là tên của method đã khai báo trong service - tức là method List, và value là một function xử lý sẽ được gọi khi client gọi method List. Function này có 2 tham số:
1. call là request từ client.
2. callback là function chúng ta sẽ gọi để response về client.

```
const grpc = require('grpc')
const notesProto = grpc.load('notes.proto')
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]
const server = new grpc.Server()
server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, notes)
    },
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
```
# Triển khai gRPC Client
Để gọi gRPC Server của chúng ta và xem response chúng  ta cần tạo 1 gRPC Client. Cùng thư mục chúng ta thêm file client.js.
Tương tự trong file này chúng ta cũng cần import module gprc và gói notes.proto. Sau đó gọi service NoteService, Từ service chúng ta khởi tại đối tượng client kết nối với địa chỉ của gRPC Server.
```
const grpc = require('grpc')
const PROTO_PATH = './notes.proto'
const NoteService = grpc.load(PROTO_PATH).NoteService
const client = new NoteService('localhost:50051',
    grpc.credentials.createInsecure())
module.exports = client
```

Tiếp theo tạo file get_notes.js. Trong file này chúng ta import file client.js, sau đó gọi method list với 2 đối số cho 2 tham số của method List trong service NoteService.

```
const client = require('./client')
client.list({}, (error, notes) => {
    if (!error) {
        console.log('successfully fetch List notes')
        console.log(notes)
    } else {
        console.error(error)
    }
})
```

Bây giờ chúng ta có thể test gRPC Server bằng cách chạy lệnh node get_notes.js. Tại console chúng ta sẽ thấy log dánh sách Note.

# Tạo Create RPC method

Trở lại service NoteService chúng ta thêm một method Insert, method này lấy một Note để insert vào mảng Notes trên server và sau đó trả về Note đã được gán UUID.

```
syntax = "proto3";
service NoteService {
    rpc List (Empty) returns (NoteList) {}
    rpc Insert (Note) returns (Note) {}
}
....
```

Tức nhiên bây giờ chúng ta  định nghĩa function xử lý khi method này được gọi bởi gRPC client ở gRPC Server.

```
...
const uuidv1 = require('uuid/v1')
...
server.addService(notesProto.NoteService.service, {
    ...,
    insert: (call, callback) => {
        let note = call.request
        note.id = uuidv1()
        notes.push(note)
        callback(null, note)
    }
})
...
```

Tạo một file  insert_note.js tương tự file get_notes.js để test method Insert mà gRPC Server đã định nghĩa.
```
const client = require('./client')
let newNote = {
    title: "New Note",
    content: "New Note content"
}
client.insert(newNote, (error, note) => {
    if (!error) {
       console.log('New Note created successfully', note)
    } else {
       console.error(error)
    }
})
```

# Tham khảo
https://medium.com/@alfianlosari/building-grpc-service-server-note-crud-api-with-node-js-bcc5478d5bdb