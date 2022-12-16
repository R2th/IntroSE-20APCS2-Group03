## Mục tiêu bài viết
Tiếp tục với [phần trước](https://viblo.asia/p/ban-da-biet-ve-containerpresentational-voi-react-EoW4o0mxJml), bài viết ở phần này nhằm đưa ra *giải pháp* và *tranh luận* về một trong những cách **tái sử dụng logic** trong react. Mục tiêu là trả lời một số câu hỏi sau đây: 
* Higher order components (HOC) là gì? Sử dụng như thế nào? 
* Một số lưu ý khi sử dụng là gì?
* Hook thì sao? Liệu **hook** có thể thay thế hoàn toàn **HOC** ?
## Nguyên lí
Higher Order Components là một component mà:
* Nó sẽ nhận vào một **component khác** dưới dạng tham số
* Nó áp dụng các logic vào bằng cách truyền dưới dạng các **props** cho component vừa được truyền vào bằng tham số.
* Cuối cùng nó sẽ trả về component mà đã được thêm các logic.
## Ví dụ minh họa
Bài toán ở đây là chúng ta muốn áp dụng một **kiểu dáng chung** cho một số các components trong ứng dụng. 
Thay vì tạo một `style` cục bộ ở bên trong mỗi component, chúng ta đơn giản có thể tạo một HOC và thêm `style` vào component sau đó trả về. 

![ảnh minh họa ví dụ](https://images.viblo.asia/c847e545-8013-4156-b71d-98467beb47b6.png)

Để thực hiện ví dụ trên, chúng ta tạo một `withStyles` HOC trong đó chúng ta tạo style là `color` và `font-size` rồi truyền chúng vào component nhận được dưới dạng `props` như dưới đây:
```javascript
export function withStyles(Component) {
  return (props) => {
    const style = {
      color: "red",
      fontSize: "1em",
      // Merge props
      ...props.style,
    };

    return <Component {...props} style={style} />;
  };
}
```
Chúng ta import `withStyles` HOC vào file component cần sử dụng và bọc bất kì component nào cần `style`.
```javascript
import { withStyles } from "./hoc/withStyles";

const Text = () => <p style={{ fontFamily: "Inter" }}>Hello world!</p>;
const StyledText = withStyles(Text);
```
Với cách này chúng ta đã tạo ra một components mới là `StyledText` với các logic kèm theo nhưng vẫn giữ **không ảnh hưởng** tới component `Text` được truyền vào.
Các logic của HOC `withStyles` được cô lập riêng và dễ dàng tái sử dụng. Đáp ứng các nguyên tắc: 
* [Don’t Repeat Yourself (DRY) ](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) : Giúp giữ các logic tránh lặp lại.
* [Do One Thing (DOT)](https://en.wikipedia.org/wiki/Unix_philosophy): Chỉ làm một việc và làm tốt việc đó.
* [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns): Phân tách và cô lập các logic khỏi *view* hay *các logic khác*.
* [The Principle of Least Knowledge (Law of Demeter)](https://en.wikipedia.org/wiki/Law_of_Demeter): Giảm thời gian cho các lập trình viên giúp giảm sự quan tâm không cần thiết đến các chi tiết trong HOC.
## Kết hợp (Composing)
Chúng ta còn có thể kết hợp nhiều HOC với nhau. 
Ví dụ, chúng ta có thể dễ dàng thay đổi styles của đoạn văn bản bằng cách là cho kích thước chữ lớn hơn và in đậm, ta có thể tạo hai HOCs:
* `withLargeFontSize` sẽ thêm trường `font-size: "90px"` vào thuộc tính `style` của component được truyền vào.
* `withBoldFontWeight` sẽ thêm trường `font-weight: "bold"` vào thuộc tính `style` của component được truyền vào.

Sử dụng hai HOC này có thể *linh hoạt* trong việc thêm mỗi HOC hay cả 2 như dưới đây: 
 `withLargeFontSize(withBoldFontWeight(TextComponent))`

![Ví dụ minh họa composing](https://images.viblo.asia/adb3d00c-baf2-43ea-8c56-6ad6e5ec5f30.gif)

Chú ý một số các vấn đề của HOC: 
* Đôi khi đổi các thứ tự của các HOC có thể phá vỡ mọi thứ.
* Truyền `props` là *phụ thuộc ngầm định* nên có thể sẽ khiến khó hiểu được các `props` đến từ đâu so với việc đưa trực tiếp các hành vi vào component.
* Sử dụng nhiều `props` có thể gây ra xung đột về tên khi nhiều HOC cạnh tranh để cung cấp một tên hỗ trợ cho các `component`.
## Hook 
Dưới đây là một ví dụ minh họa về sử dụng hook. Chúng ta có một hook `useHover` giúp kiểm tra khi nào người dùng hover qua danh sách các chú chó.
```javascript
function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}
```
Từ ví dụ trên chúng ta có thể thấy Hook có thể khắc phục một số các **điểm yếu** của HOC:
* Nó di chuyển các logic *phụ thuộc vào* mỗi component riêng biệt nên chúng ta có thể thấy chúng bên trong mỗi component và biết tất cả phụ thuộc đến từ đâu.
* Tránh các *xung đột tên* vì chúng ta có thể gán giá trị hook trả về bằng bất cứ biến nào ta muốn, và có thể xử lí xung đột tên nếu cần.
* "But in most cases, Hooks will be sufficient and can help reduce nesting in your tree." - [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components): Từ document của React trong hầu hết các trường hợp, Hook là đủ và nó giúp giảm bớt độ sâu của cây component. Dưới đây là trường hợp khi sử dụng nhiều HOC.
```html
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```
Việc thêm hook trực tiếp vào component giúp chúng ta không cần phải bao bọc component nữa. 

Nhưng sử dụng HOC giúp triển khai và khai báo rất đơn giản, nó linh hoạt trong việc giữ các component riêng biệt dễ dàng kết hợp các HOC với nhau. 
Trong khi hook sẽ cung cấp nhiều triển khai bắt buộc có thể thêm một lượng mã và độ phức tạp đáng kể trong các UI component. 
## Sự đánh đổi
1. Những trường hợp *sử dụng kém* cho HOC:
    * Các hành vi cần thêm nhiều props vào component khiến mọi thứ trở nên phức tạp.
    * Các hành vi chỉ sử dụng cho một component.
    * Các hành vi phải được tùy chỉnh cho mỗi component sử dụng nó.
2. Những trường hợp *sử dụng tốt* cho HOC:
    * Các hành vi không cấu hình đặc biệt cho một component mà áp dụng cho nhiều hoặc tất cả component trong ứng dụng.
    * Các hành vi không cần truyền nhiều `props` tới component.
    * Component có thể đứng một mình mà không cần tới HOC.
    * Không cần thêm các tùy chỉnh nào vào component được HOC bao bọc.

**Tóm lại, thay vì loại bỏ tất cả các HOCs, thì chúng ta nên xem xét vấn đề nào là tốt khi sử dụng HOCs và vấn đề nào thì không.**
 ## Nguồn tham khảo
 * https://medium.com/javascript-scene/do-react-hooks-replace-higher-order-components-hocs-7ae4a08b7b58
 * https://www.patterns.dev/posts/hoc-pattern/
 * https://javascriptpatterns.vercel.app/patterns/react-patterns/higher-order-component#tradeoffs
 * https://reactjs.org/docs/hooks-faq.html
 ## Đôi lời của tác giả
 Nếu mọi người thấy thú vị và giúp ích được thì giúp **up vote** để mình lấy động lực ra tiếp bài sau với chủ đề về **render props pattern**, còn nếu mọi người chê hay có đôi lời góp ý thì cứ thỏa mái thả comment xuống dưới nhá. Thanks mọi người 😘.