Tiếp tục với post Ssr react app với express.js và next.js đã viết ở post https://viblo.asia/p/ssr-react-app-voi-expressjs-va-nextjs-bWrZnyqYKxw

Lưu file ở index.js đã viết và chạy lệnh `npm run dev` . Nếu bạn truy cập trình duyệt, hãy nhìn vào dòng text "Hello Next.js, this is your friend Brian from logrocket" được in trên màn hình.

Bạn không cần phải mount React vào thẻ div, không cần import React, không cần phải cài đặt routes. Trong ứng dụng React thông thường, chúng ta sẽ cần phải cài đặt các config khác ở trên server và hiển thị trên client. Nhưng hãy xem mã nguồn trang của bạn. Thật ngạc nhiên, chúng ta không cần thực hiện điều đó.

![](https://images.viblo.asia/bbefcf94-7247-4a8e-8b70-f172ca75d1c7.png)

Chú ý đoạn mã nguồn ở trên nó tham chiếu cụ thể đến [/_next/-/page/index.js](http://localhost:3000/_next/-/page/index.js)? 

Quá trình tách code đã được thực hiện chính xác. Ngoài ra, hãy lưu ý rằng thẻ div có văn bản của bạn đã được thực hiện đầy đủ, đó là kết xuất từ phía máy chủ đang diễn ra.

## **Next và Express**

Tôi cá với bạn rằng đó là tất cả những điều kì diệu mà Next có ở trong store. Tiếp theo chúng ta hãy làm cho nó hiển thị bên phía server side bằng cách sử dụng Express cho các trường hợp khó hơn.

Đầu tiên hãy thêm Express vào ứng dụng của bạn:

```
npm install --save express
```


Sau đó tạo file ssr-server.js trong app và thêm vào như sau:

```
const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

Điều gì sẽ xảy ra trong đoạn mã trên ? Chúng ta cần require cả 2 thư viện Express và next. Chúng ta tạo phiên bản của thư viện Next thong qua biến Boolean dựa vào môi trường chạy xem Next.js có khởi chạy ở môi trường dev hay không.

Chúng ta gọi hàm getRequestHandler(), và sau đó chuẩn bị ứng dụng. Function chuẩn bị trả về 1 promise, vì vậy chúng ta có thể dùng hàm then. Trong lúc gọi hàm then, chúng ta khởi tạo Express, và sử dụng các tuyến kí tự đại diện để bắt tất cả các route và trả nó về 1 hàm xử lí.

Bây giờ hãy cập nhật lệnh npm dev của bạn thành:

`{ "scripts": { "dev": "node ssr-server.js" } }`

Nếu bạn chạy `npm run dev`, trang của bạn sẽ quay trở lại giống với trang ban đầu. Nhưng chúng khác nhau ở điểm gì ?

Mặc dù những gì chúng ta đã làm ở trên không tạo ra quá nhiều khác biệt, nhưng sẽ có ý nghĩa hơn vì nó tạo ra các clean URL. 

Nhìn vào route này ở bên dưới, nó đã tạo ra các URL sạch sẽ hơn:

```
server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
})
```

Theo mặc định, thật dễ dàng để sử dụng các query string ở trong Next, nhưng như thường lệ, nếu bạn muốn giữ cho URL sạch sẽ, vì vậy bạn sẽ chọn /p/2 thay vì p?id=2

Troong đoạn mã trên, chúng ra sử dụng express routing để định nghĩa các route như vậy, sau đó đặt id dưới dạng tham số truy vần. Ở đây lệnh gọi `/p?id=2` đã được dấu đi không cho chúng ta biết và người dùng sẽ nhìn thấy url dưới dạng /p/2/.

## **Cung cấp và trích xuất ứng dụng của bạn** 

Khi bạn xây dựng xong ứng dụng React app, câu hỏi sẽ đặt ra là: 'Làm thế nào để serve ứng dụng ở trong môi trường production ?'

Rất dễ

Đầu tiên chúng ta cần build app. Sau đó chúng ta có thể sử dụng nó. May mắn thay, Next cung cấp cho chúng ta con đường ra dễ dàng. Bạn có nhớ phần script ở trong package.json không ? Chúng ta đã thiết lập tất cả ở đó.

Tất cả những gì chúng ta cần làm là:

```
#build the app
npm run build
#serve the app
npm run serve
```

Nếu bạn muốn kết xuất ứng dụng dưới dạng HTML tĩnh thì sao ? Trước tiên, hãy tạo ra 1 tệp next.config.js ở trong thư mục gốc và thêm nội dung như sau:

```
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
```

Điều gì sẽ xảy ra nêu chúng ta thêm nhiều trang hơn ? Đó là 1 câu hỏi rất hay 

Bạn có thể thêm 1 key và value mới trong đối tượng trả về của pathMap như '/about': { page: '/about'' }.

Sau đó, thêm phần sau vào script package.json của bạn:

`"export": "next export"`

Cuối cùng hãy build và export app:

```
#build app
npm run build
#export app
npm run export
```

## **Giám sát giao diện người dùng trong React app**

Debug các ứng dụng React có thể rất khó khăn, đặc biệt là khi có các state phức tạp. Nếu bạn quan tâm đến việc giám sát và theo dõi state Redux cho tất user ở trên production, hãy sử dụng LogRocket

![](https://images.viblo.asia/4becc4a2-68ee-43ba-b3e4-66677b300fcc.png)


## **Tổng kết**

Ở trong bài viết này, chúng ta đã thấy việc xây dựng server side rendering đối với Next dễ dàng như thế nào. Nếu bạn đã trải qua quá trình để đạt được kết quả tương tự, bạn sẽ đồng ý với tôi về việc này.

Bài viết được dịch tại https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/