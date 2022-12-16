![](https://images.viblo.asia/8e38e760-e775-4f31-baa2-e6ccf9e7ee9a.jpg)
Container (thùng chứa) và Presentational (hiển thị) component là 2 thành phần chính xây dựng nên hệ thống cấp bậc các components trong các ứng dụng React.  React luôn luôn cần những những components với nhiệm vụ xử lý logic và những components với vai trò hiển thị dữ liệu. Presentational component không thực hiện quản lý state, container component sẽ thực hiện việc đó. Presentaional thường là các components con của container.

# Container components là gì?
* Container components chủ yếu liên quan đến cách mọi thứ hoạt động 
* Chúng hiếm khi có bất cứ thẻ HTML nào ngoài trừ thẻ `div`
* Thường là các stateful components
* Chịu trách nhiệm cung cấp data và hành vi cho các components con (thường là presentational components)


Để hình dung rõ hơn hãy cùng xem ví dụ dưới đây nhé: 
```
class Collage extends Component {
   constructor(props) {
      super(props);
      
      this.state = {
         images: []
      };
   }
   componentDidMount() {
      fetch('/api/current_user/image_list')
         .then(response => response.json())
         .then(images => this.setState({images}));
   }
   render() {
      return (
         <div className="image-list">
            {this.state.images.map(image => {
               <div className="image">
                  <img src={book.image_url} />
               </div>
            })}
         </div>
      )
   }
}
```
# Ngược lại, với presentational components thì sao?
* Presentational components chịu trách nhiệm liên quan đến việc mọi thứ được hiển thị như thế nào
* Chứa rất ít xử lý logic bên trong nó
* Chúng không biết data được load như thế nào hay data sau khi chúng render
* Chúng thường được viết dưới dạng stateless functional components


Ví dụ:
```
//defining the component as a React Component
class Image extends Component {
   render() {
      return <img src={this.props.image} />;
   }
}
export default Image
//defining the component as a constant
const Image = props => (
   <img src={props.image} />
)
export default Image
```

Với presentational components, bạn có các cách khác nhau để định nghĩa chúng như là react component thông thường hoặc constants. Định nghĩa theo kiểu constants có thể loại bỏ các dependecies và code cũng ngắn gọn hơn. 

Việc xây dựng các presentational và container component một cách hiệu quả giúp cho ứng dụng React của chúng ta có thể tái sử dụng dễ dàng maintain đó là những khía cạnh mạnh mẽ của ReactJS

Tài liệu tham khảo: [Container vs Presentational Components in React](https://medium.com/@yassimortensen/container-vs-presentational-components-in-react-8eea956e1cea)