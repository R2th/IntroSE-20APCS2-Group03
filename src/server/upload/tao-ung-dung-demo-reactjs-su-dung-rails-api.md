###  Giới thiệu.
Xin chào tất cả các bạn, hôm nay quay trở lại mình chia sẻ với các bạn về hướng lập trình web mà mọi lập trình viên đều hướng đến đó là làm full-stack. Để lập lên một ứng dụng web đối với mọi công ty đều cần phải có những lập trình viên biết về Server, Database, Backend, UI, UX... Đối với lập trình viên đều chuyên về một mảng nào đó ví dụ mình trước kia là làm Backend ngôn ngữ lập trình Ruby nhưng sau khi join vào dự án mới mình có thể tham gia lập trình Reactjs(xây dựng giao diện người dùng - UI), các bạn cũng thế đúng không nào? Nhưng tại sao khi chúng ta chuyên về một mảng mà không tìm hiểu về những phần khác, nếu bạn là lập trình viên Fontend Developer thì bạn cũng  có thể nghiên cứu thêm về Backend và ngược lại. Sau đó nghiên cứu về cơ sở hạ tầng, UI/ UX. Các bạn càng biết nhiều càng có lợi và có thể hiểu tổng thể hệ thống hơn.

Hôm nay mình sẽ hướng dẫn các bạn tạo một ứng dụng web cơ bản sử dụng Rails API và sử dụng Reactjs.

###   1. Cài đặt ruby on rails 
 - Các bạn chạy lệnh sau để tạo một app demo nhé:
```
rails new demo-react-rails --api -d mysql
```
 Trong đó --api: để ứng dụng rails viết API, -d mysql : để ứng dụng rails chạy database sử dụng mysql.
 
 Sau đó chúng ta cần phải tạo một model Product(product_name: string, quantity: integer, price: integer).
 
  Các bạn chạy lệnh khởi tạo datatbase trong mysql:
  ```
  rails db:create
  rails g scaffold Product product_name:string quantity:integer price:integer
  rails db:migrate
  ```
  Khởi tạo dữ liệu ban đầu để test. Trong file seed rails :
  ```
  10.times do |n|
  product_name = "Product #{n + 1}"
  quantity = 100
  price = 1000 + n
  Product.create!(product_name: product_name, quantity: quantity, price: price)
end
```
Sau đó các bạn chạy lệnh 
```
rails db:seed
```
  Sau khi chạy 3 lệnh trên chúng ta có một model Product, cùng với controller Product với những API đc render từ lệnh rails g scaffold
  ![](https://images.viblo.asia/79f2615f-c0a7-4be2-b94e-cca037aff688.png)
  Chúng ta vào routes chỉnh sửa một chút:
 ```
 scope 'api' do
    resources :products
  end
 ```
  Chúng ta thử vào linh API xem đã đc chưa nhé(http://localhost:3000/api/products)
  
  ![](https://images.viblo.asia/4bbb349d-bde6-4abc-8b46-bc4212f49eef.png)
  
 Ok thế là chúng ta đã tạo được các API của products rùi. 
###  2 Cài đặt reactjs.
Trong ứng dụng rails chúng ta cài đặt reactjs vào 1 thư mục có tên client các bạn chạy lệnh sau nhé:
```
npm create-react-app client
```
Các bạn đợi việc cài đặt này sẽ mất một lúc để reactjs cài đặt các package nhé.

Sau khi cài đặt chúng ta chỉnh sửa trong file package.json thêm dòng 
```
 "proxy": "http://localhost:3001",
```
Để đảm bảo lấy API cổng 3001, còn reactjs chạy cổng 3000 nhé.

 Chúng ta thử chạy reactjs cùng rails song song xem đc chưa nhé ở 2 cửa sổ terminal và mỗi cửa sổ bạn chạy một lệnh:
```
rails s -p 3001
npm start --prefix client
```
![](https://images.viblo.asia/e35fc521-3491-4595-b28c-3c249d484bb8.png)
![](https://images.viblo.asia/2b028307-0260-4c41-9725-8d50e13918df.png)

Ok thành công rùi, bây giờ mình thử chỉnh sửa file App.js reactjs tạo 1 bảng bằng bootstrap đổ dữ liệu từ API ra nhé.
- Các bạn muốn sử dụng bootstrap trong reactjs thì có 2 cách: tải boostrap về và dẫn linh đến file đó. Như mình làm demo thì mình link trực tiếp đến file css, js boostrap trực tuyến cho nhanh nhé.
- Các bạn copy 4 dòng dưới đây vào file  index.js trong client(client/public/index)
```
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```
Bây giờ là lúc chúng ta code trong file App.js:

Chúng ta tạo 1 constructor để khởi tạo 1 state products:
 ```
  constructor(props) {
    super(props);
    this.state= {
      products: []
    }
  }
  ```
  Tạo một componentWillMount để lấy dữ liệu từ API:
  ```
  componentWillMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => this.setState({products: json}))
      .catch(err => console.log(err))
  }
  ```
  Tiếp theo chúng ta tạo một hàm render ra các dòng trong bảng:
  ```
  renderProduct = () => {
    let products = this.state.products;
    let elmProduct = products.map((product, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{product.product_name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
        </tr>
      )
    });
    return elmProduct;
  }
  ```
  Và cuối cùng trong  phần render file App.js chúng ta tạo một thẻ div trong đó có bảng để đổ dữ liệu vào nhé:
  ```
  <div className="container">
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Index </th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {this.renderProduct()}
      </tbody>
    </table>
  </div>
  ```
Đây là kết quả sau khi chúng ta show list products:
![](https://images.viblo.asia/6b8a6d95-8de7-447a-b9be-007f54174411.png)
### Kết luận
Rất dễ phải không nào, chỉ với 15 phút là chúng ta có thể dễ dàng tạo ra môt ứng dụng reactjs sử dụng API Ruby on Rails. Cám ơn tất cả mọi người đã quan tâm bài viết !