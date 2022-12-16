Nếu như các bạn đã từng sử dụng `NodeJS` thì có lẽ đã từng nghe qua về `npm` rùi. Và có lẽ nhiều bạn có thể đã từng dùng `npx`. Thì hôm nay chúng ta hãy cùng đi tìm hiểu định nghĩa về hai khái niệm này cũng như tìm một số sự khác nhau nhé. Bắt đầu thôi!

# I. Khái niệm về `npm` và `npx`.
## 1. Khái niệm `npm`
`npm` (node package manager) là một công cụ quản lý các thư viện chúng ta có được khi cài đặt `nodejs` (npm được cài sẵn khi chúng ta cài `nodejs`). Nó cung cấp cho những lập trình viên cách để cài đặt những thư viện sử dụng ở toàn bộ các dự án của mình hoặc có thể gói gọn trong một dự án.

`npm` là nơi đăng ký thư viện lớn nhất thế giới. Những lập trình viên từ tất cả mọi nơi sẽ sử dụng. `npm` để chia sẻ và sử dụng những thư viện (nếu được chia sẻ).

`npm` bao gồm ba thành phần:

* Website - Hiển thị một cách chi tiết nhất những thư viện được chia sẻ.
* Command Line Interface (CLI) - Công cụ để quản lý để lấy những thư viện về.
* Registry - Lưu trữ những thư viện Javascript cũng như thông tin về những thư viện đó.

## 2. Khái niệm `npx`
`npx` (npm package executor) thì sao? Nhiều lúc chúng ta sẽ muốn xem xét mốt số thư viện và thực thi một số lệnh. Nhưng để làm được điều đó thì chúng ta phải cái nó vào trong nội bộ dự án của mình. Điều này khá bất tiện đúng không?

Đó là cách mà `npx` được sử dụng.

Vậy là chúng ta đã có những cái nhìn khái quát về `npm` và `npx` rồi. Tiếp theo hãy cùng tìm hiểu một số khác nhau giữa hai khái niệm này nhé!

# II. Sự khác nhau giữa `npm` và `npx`.
## 1. `npm`
Có hai điều quan trọng về `npm` như dưới;

* Đầu tiên và quan trọng nhất là `npm` nó là một kho lưu trữ những mã nguồn mở của những thư viện dùng cho những dự án `nodejs`.
* Hai là `npm` là một công cụ CLI (Command Line Interface) nhằm mục đích trợ giúp chúng ta cài đặt những thư viện, quản lý version của những thư viện đó.

Bản thân `npm` không có nghĩa là nó có thể thực thi bất cứ thư viện nào. Nếu chúng ta muốn thực thi  thư viện thì chúng ta cần tạo một file `package.json` và chỉ định những thư viện trong đó,

Khi mà những thực thi được cài đặt thông qua `npm`. `npm` sẽ tạo một liên kết đến những thực thi đó.

*  Nếu là nội bộ trong một dự án thì liên kết sẽ tại thư mục `./node_modules/.bin/`.
*  Nếu là trong tất cả các dự án thì liên kết sẽ tại thư mục `bin/` (`/usr/local/bin` trong OS Linux hoặc `%AppData%/npm` ở OS Window)

Để thực thi thư viện với npm trong nội bộ một dự án thì đường dẫn sẽ là

```
$ ./node_modules/.bin/my-package
```

Hoặc chúng ta cũng có thể chỉ định thư thi những thư viện trong nội bộ một dự án bằng cách thêm vài file `package.json` trong mục `scripts` như dưới:

```javascript
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "my-package": "my-package"
  }
}
```

Sau đó thưc thi lệnh `npm run`

```
npm run my-package
```

Chúng ta có thể thấy là để thực thi được một thư viện thì chúng ta cần phải làm một số  bước nữa trước khi có thể sử dụng. Thì `npx` sẽ giúp chúng ta làm việc này.

## 2. `npx`
Cho tới bản `npm` 5.2.0 thì `npx` được đóng gói sẵn với `npm`. Mang lại sự một sự lựa chọn nữa cho các lập trình viên.

`npx` cũng là một công cụ CLI với mục đích là làm cho việc cài đặt và quản lý những thư viện phụ thuộc được lưu trữ trên npm registry.

Bây giờ với `npx` chúng ta có thể dễ dàng thực thi bất cứ loại thực thi nào dựa trên `nodejs` mà bình thường chúng ta cài đặt nó thông qua `npm`.

Cùng đi qua một số trường hợp mà `npx` có thể giúp đỡ chúng ta.

### Thực thi những thư viện đã được cài đặt sẵn trong nội bộ một dự án.
```
$ npx my-package
```

`npx` sẽ kiểm tra xem liệu lệnh và thư viện có tồn tại trong `$PATH` hay không hoặc là trong nội bộ một dự án `./node_modules/.bin`. Nếu có thì nó sẽ được khởi chạy.

### Thực thi những thư viện mà chưa được cài đặt.
Một lợi thế chính nữa là khả năng thực thi thư viện mà chưa được cài đặt trước đó.

Nhiều lúc chúng ta sẽ chỉ muốn sử dụng một số công cụ CLI nhưng không muốn cài đặt nó mà đơn thuần là muốn test nó thôi. `npx` là một lựa chọn tuyệt vời lúc này.

### Thực thi những đoạn code trực tiếp từ github.
Đây là một tính năng khá thú vị. Nó cho phép chúng ta thực thi bất kỳ một Github gists và repositories.

### Kiểm tra những version khác của thư viện.
`npx` giúp việc kiểm tra những version khác của thư viện trở nên vô cùng dễ dàng.

Một ví dụ về thư viện `create-react-app`. Chắc một số người trong chúng ta có thể sẽ quen với lệnh tạo một app `ReactJS` mới với `create-react-app`

```
$ npx create-react-app my-app
```

Đầu tiên chúng ta cần cài đặt `create-react-app` và sau đó liệt kê ra những version của thư viện này.

```
$ npm -v create-react-app
```

Sau khi chạy lệnh trên chúng ta thấy được các `dist-tags`: `canary`, `lastest`, `next`.

Sau khi biết được các version khác thì sẽ dùng `npx` để kiểm tra thử những version đó. Ví dụ chúng ta sẽ tạo một app với version `next` của `create-react-app`.

```
$ npx create-react-app@next my-next-app
$ cd my-next-app
$ npm start
```

Thì chúng ta sẽ được ngay một `my-next-app` chạy với version `next` của `create-react-app`. Rất thú vị đúng không nào!

# 3. Kết luận.
Bên trên mình đã trình bày cho các bạn sự khác biệt giữa `npm` và `npx`. Mỗi cái sẽ có những điểm mạnh, điểm yếu riêng. Vì thế mà khi làm việc thì hãy cân nhắc và lựa chọn sử dụng nhé!

Bài chia sẻ của mình đến đây là hết rồi! Mong rằng nó sẽ mang đến lợi ích cho các bạn. Xin chào và hẹn gặp lại các bạn trong bài chia sẻ kế tiếp!