Như chúng ta đã biết trong Enzyme, để test các component ta có 3 cách để render (nôm na là như vậy):
- Shallow rendering
- Full DOM rendering
- Static rendering

![](https://images.viblo.asia/a1b5e244-de50-471c-9692-fa9bc7d1f0d9.png)


### Shallow Rendering

```
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
```

Shallow Rendering là hữu ích để hạn chế bạn kiểm tra một component như một unit và để đảm bảo rằng test của bạn không gián tiếp xác nhận về bihavior của các child component.

Có thể hiểu nôm nam là shalow rendering không tác động đến child component.

Ví dụ:

```
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent><ChildComponent /></MyComponent>);
```

Thì bạn không thể find child component trong wrapper được, hơn thể nữa, cho dù `<ChildComponent />` có xảy ra lỗi thì wrapper vẫn được build mà không có thông báo nào cả.

#### Simple shallow

Chỉ gọi constructor và render (đối với component)

#### Shallow + setProps

Gọi:
* ComponentWillReceiveProps
* ShouldComponentUpdate
* ComponentWillUpdate
* Render 

#### Shallow + unmount

Gọi componentWillUnmount

### Full DOM Rendering

```
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
```

Full DOM rendering là lý tưởng cho các trường hợp sử dụng trong đó bạn có các component có thể tương tác với API DOM hoặc cần kiểm tra các component được bao bọc trong các component có thứ tự cao hơn.

Full DOM rendering yêu cầu phải có API DOM đầy đủ ở global scope. Điều này có nghĩa là nó phải được chạy trong một môi trường ít nhất là “trông giống” một môi trường trình duyệt. Nếu bạn không muốn chạy các test của mình bên trong trình duyệt, cách tiếp cận được khuyến nghị để sử dụng mount là phụ thuộc vào thư viện có tên jsdom về cơ bản là một headless browser được triển khai hoàn toàn bằng JS.

Lưu ý: không giống như shallow rendering hoặc static rendering, full frendering thực sự gắn kết thành phần trong DOM, có nghĩa là các test có thể ảnh hưởng lẫn nhau nếu tất cả chúng đều sử dụng cùng một DOM. Hãy ghi nhớ điều đó trong khi viết các test của bạn và nếu cần, hãy sử dụng .unmount () hoặc một cái gì đó tương tự như cleanup.

#### Simple mount

Gọi:
* Constructor
* Render
* ComponentDidMount

#### Mount + setProps

Gọi:
* ComponentWillReceiveProps
* ShouldComponentUpdate
* ComponentWillUpdate
* Render
* ComponentDidUpdate

#### Mount + unmount

Gọi componentWillUnmount.

### Static rendering

```
import { render } from 'enzyme';

const wrapper = render(<MyComponent />);
```

Sử dụng render của enzyme để tạo HTML từ React tree của bạn và phân tích cấu trúc HTML.

Kết xuất trả về một trình bao bọc rất giống với các cách render khác trong enzyme, mount và shallow, tuy nhiên, render sử dụng phân tích cú pháp HTML của bên thứ ba và thư viện Cheerio. Cheerio xử lý quá trình phân tích cú pháp và duyệt qua HTML cực kỳ tốt, và việc sao chép chức năng này bản thân sẽ là một điều không tốt.

Render chỉ gọi hàm render trong component, cùng với các child component.

Bài viết lấy từ nguồn
- https://enzymejs.github.io/enzyme/docs/api/
- https://gist.github.com/fokusferit