Chúng ta phải khẳng định rằng React là một sự lựa chọn tuyệt vời để xây dựng nên các ứng dụng web chất lượng cao. Tuy nhiên, mọi thứ sẽ trở nên phức tạp hơn, bạn cần tìm hiểu về client-side routing, page layout...Tại một số điểm bạn sẽ cần trang của mình load nhanh hơn, như thế mọi thứ sẽ trở nên phức tạp hơn.

Next.js và một framework Javascript phổ biến chạy cả trên browser client và ở trên cả server. Nó cung cấp cho các developer một cách dễ dàng để bắt đầu và nó sử dụng template React, nó cũng là một cách đơn giản để các developer React đạt được hiệu quả học next nhanh chóng.

Một trong những điểm mạnh của nó là xử lí việc kết xuất từ phía máy chủ rất xuất sắc, và nó tích hợp tốt với Express.

Server side rendering là gì ?

Server side rendering là phương pháp thông thường để đưa html của bạn lên màn hình. Điều này đề cập đến việc sử dụng server để đưa html của bạn lên trình duyệt

Vậy tại sao lại rắc rối nếu đó là phương pháp thông thường đã tồn tại từ rất lâu ?

Hãy nhớ sự ra đời của khái niệm MVC đã gây ra một số lo ngại. Về cơ bản, có một số bất đồng cuối cùng đã dẫn đến sự gia tăng của các framework Javascript cho việc render view.

Vậy điều này có liên quan gì ?

Chẳng bao lâu, một vấn đề đã xuất hiện: các framework javascript chỉ hiển thị một loại các div trong trình duyệt, xử dụng các thao tác DOM để thực hiện công việc của nó xung quoanh trình duyệt. Điều này có nghĩa là người dùng phải đợi lâu hơn để xem bất cứ điều gì đó. Nó cũng có thể ảnh hưởng đến SEO nếu trình thu thập thông tin không thể xem nhanh nội dung của trang.

Một giải pháp là hiển thị các tệp Javascript từ phía máy chủ trước khi trả chúng về output từ máy chủ.

Bắt đầu với Next 

Bắt đầu rất đơn giản. Tất cả những gì chúng ta cần làm là tạo thư mục mới, bắt đầu một node project mới, cài đặt Next và React DOM.

```
#make a directory
mkdir logrocket-next
#change to the new directory
cd logrocket-next
#init a new node project
npm init -y 
#install react, react-dom and next
npm install --save react react-dom next
```

Tiếp theo, hãy mở file `package.json` và thay thế bằng đoạn sau:

```
"scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    }
```

Chạy lệnh `npm run dev`, bạn sẽ nhận được một lỗi kiểu như :

```
next > Couldn't find a `pages` directory. Please create one under the project root
```

Điều này là do Next sử dụng thư mục pages và các tệp trong đó để lập nên các routes. Điều này có nghĩa là nếu chúng ta có một tệp là index.js trong thư mục trang chính của mình, Next sẽ cố gắng sử dụng các component trong đó giống như entry point. Hãy tạo pages folder và file index.js

```
#create pages directory
mkdir pages
#create file for base route
touch pages/index.js
```

Tiếp theo, thêm code vào `pages/index.js` :

```
const Index = () => (
  <div>
    <p>Hello Next.js, this is your friend Brian from logrocket</p>
  </div>
)
export default Index
```

continue...