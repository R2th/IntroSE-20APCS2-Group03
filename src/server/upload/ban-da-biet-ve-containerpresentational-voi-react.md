Bài viết này tham khảo từ tác giả [Dan_abramov](https://golden.com/wiki/Dan_Abramov_(software_engineer)-99B8RJM) (tác giả của Redux).
Mục đích bài viết là mong sẽ đem lại một góc nhìn về một **design pattern** khá là hay khi xây dựng code base với react, vue,... 
Cũng như là mở ra một series bài viết về design pattern cho phía front-end.

## Nguyên lí
Container/Presentational là một design pattern nhằm thực thi tách các mối quan tâm (**[separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)**) bằng cách tách các phần **hiển thị** khỏi **logic** ứng dụng.

![separation of concerns](https://images.viblo.asia/2e841e8a-b0b5-44bb-8c8d-afe613c021b9.png)

Bài toán đơn giản là chúng ta cần tạo một ứng dụng tải 6 ảnh từ server và hiển thị các ảnh đó lên màn hình:

Ý tưởng khi áp dụng với react là chia làm 2 loại components:
1. **Presentational Components:** Là những components chịu trách nhiệm cho việc những gì xuất hiện trên màn hình mà người dùng có thể thấy được. Ví dụ ở đây là danh sách hình ảnh những chú chó.
2. **Container Components:** Là những components chịu trách nhiệm cho việc xử lí dữ liệu. Ví dụ ở đây là Xử lí tải về hình ảnh từ server.

 ![example of Presentational/Container](https://images.viblo.asia/5abb7cd0-96da-462a-a5d0-10bf68504051.gif)

 ## Presentational Component
Một số các **chức năng chính** của các presentational component là: 
*  Chịu trách nhiệm về mọi thứ sẽ **hiển thị** trông như thế nào (html, css).
*  Nhận các dữ liệu và callback thông qua **prop**.
*  Không chỉ định cách dữ liệu tải hoặc chỉnh sửa như thế nào.
*  Thường là **stateless component** (không có các state bên trong nó) trừ khi cần state với mục đích xử lí các phần giao diện.
*  Không chứa các phần **phụ thuộc** khác trong ứng dụng, ví dụ: redux

 Ở ví dụ dưới đây chúng ta có một presentational component là `DogList` nhận dữ liệu thông qua prop là `dogs` và hiển thị ra danh sách ảnh của những chú chó.

```javascript
const DogList = ({ dogs }) => {
  return dogs?.map((dog, i) => (
    <div style={{ width: "70%", margin: "auto" }} key={i}>
      <img src={dog} alt="dogs" width="100%" />
    </div>
  ));
};
export default DogList;
```
*Ví dụ 1*
## Container Component
Một số các **chức năng chính** của các container component là: 
* Chịu trách nhiệm về mọi thứ sẽ hoạt động như thế nào.
* Cung cấp *dữ liệu* và *hành vi* cho presentational hoặc các container components khác.
* Truyền các Flux/Redux actions hoặc các lệnh gọi api dưới dạng các **callback** cho presentational components.
* Thường là *stateful*, là nguồn chứa dữ liệu.

Tiếp nối với ví dụ 1, dưới đây chúng ta có `DogListContainer`  component với nhiệm vụ là gọi lấy dữ liệu từ API bên ngoài và truyền xuống `DogList` component thông qua `dogs` props.
```javascript
import { useEffect, useState } from "react";
import DogList from "./DogList";

const DogListContainer = () => {
  const [dogs, setDogs] = useState();
  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((value) => value.json())
      .then((value) => setDogs(value.message));
  }, []);
  return <DogList dogs={dogs} />;
};

export default DogListContainer;
```
*Ví dụ 2*

## Hook
Với sự ra đời của **Hooks** giúp dễ dàng cho các nhà phát triển *cô lập* và *tái sử dụng* các logic khiến cho tác dụng của container component ngày càng giảm đi.
Việc áp dụng hook giúp cải thiện **sự kết hợp** (composition) hơn vì sử dụng nhiều hooks trong cùng một component sẽ đơn giản hơn việc chuyển các prop từ nhiều container component tời cùng một components.

Từ ví dụ 2 chúng ta tách logic thành hook `useDogList` với nhiệm vụ gọi api lấy dữ liệu và trả dữ liệu về là `dogs`.
```rust
import { useEffect, useState } from "react";

const useDogList = () => {
  const [dogs, setDogs] = useState();
  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((value) => value.json())
      .then((value) => setDogs(value.message));
  }, []);
  return { dogs };
};
export default useDogList;
```
*DogListHook.js*

Chúng ta chuyển `DogListContainer.js` thành như sau:

```javascript
import DogList from "./DogList";
import useDogList from "./DogListHook";

const DogListContainer = () => {
  const { dogs } = useDogList();
  return <DogList dogs={dogs} />;
};

export default DogListContainer;
```
*DogListContainer.js*

Nếu chúng ta không cần tái sử dụng presentational component có thể sử dụng hook trực tiếp vào như dưới đây. 
Việc này vẫn đảm bảo cô lập logic khỏi view.

```javascript
import useDogList from "./DogListHook";

const DogList = () => {
  const { dogs } = useDogList();

  return dogs?.map((dog, i) => (
    <div style={{ width: "70%", margin: "auto" }} key={i}>
      <img src={dog} alt="dogs" width="100%" />
    </div>
  ));
};
export default DogList;
```
*DogList.js*

## Một số ưu điểm và nhược điểm

**1. Ưu điểm**
* Tách các phần giúp dễ dàng hiểu ứng dụng hay UI tốt hơn.
* Dễ dàng tái sử dụng. Có thể sử dụng các presentational component giống nhau bằng cách truyền các dữ liệu khác nhau qua props. 
* Dễ dàng sửa đổi các presentational component mà không cần chạm vào các logic của ứng dụng.

**2. Nhược điểm**
* Hook giúp chúng ta có được các kết quả tương tự như Container component nhưng vẫn chưa hoàn toàn thay thế được.
* Việc áp dụng pattern này trong các ứng dụng nhỏ đôi khi trở nên quá mức cần thiết.

## Tham khảo
Bài viết tham khảo từ các nguồn
* https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
* https://www.patterns.dev/posts/presentational-container-pattern/
* https://www.fullstory.com/blog/react-hooks-a-lightweight-alternative-to-container-components/

## Đôi lời của tác giả
Đây là bài viết đầu tay của mình nên nếu mọi người thấy thú vị thì giúp **up vote** để lấy động lực ra tiếp bài sau, còn nếu mọi người **chê** hay có đôi lời góp ý thì cứ thỏa mái thả comment xuống dưới nhá. Thanks 😘