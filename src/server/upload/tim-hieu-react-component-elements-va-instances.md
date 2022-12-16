Sự khác nhau giữa component, những instances của nó và elements có thể gây ra nhưng rắc rối nhỏ và dễ gây nhầm lẫn đối với những người mới bắt đầu với React. Sau đây mình xin chia sẻ một bài viết để hiểu rõ được sự khác nhau đó và sử dụng một cách trôi chảy trong React.

# Quản lý instances
Nếu bạn là một người mới sử dụng React thì có lẽ bạn biết một chút về component classes và instances. Ví dụ như khi bạn tạo một component `Button` bằng cách tạo một class. Khi bạn run app lên thì bạn sẽ có một số instances của component `Button` trên màn hình, với mỗi instances đó sẽ tương ứng có properties và local state của riêng nó. Đó chính là cách lập trình UI hướng đối tượng truyền thống (object-oriented UI).

Trong mô hình UI truyền thống, nó bắt bạn phải quan tâm đế việc tạo và hủy component instances con. Nếu chúng ta có một component `Form` muốn render một component `Button` thì nó cần phải tạo instance và cập nhật nhưng thông tin mới một cách thủ công.
```javascript
class Form extends TraditionalObjectOrientedView {
  render() {
    // Read some data passed to the view
    const { isSubmitted, buttonText } = this.attrs;

    if (!isSubmitted && !this.button) {
      // Form is not yet submitted. Create the button!
      this.button = new Button({
        children: buttonText,
        color: 'blue'
      });
      this.el.appendChild(this.button.el);
    }

    if (this.button) {
      // The button is visible. Update its text!
      this.button.attrs.children = buttonText;
      this.button.render();
    }

    if (isSubmitted && this.button) {
      // Form was submitted. Destroy the button!
      this.el.removeChild(this.button.el);
      this.button.destroy();
    }

    if (isSubmitted && !this.message) {
      // Form was submitted. Show the success message!
      this.message = new Message({ text: 'Success!' });
      this.el.appendChild(this.message.el);
    }
  }
}
```

Mỗi component instance phải giữ 1 tham chiếu đến DOM node và instances của những component con, và tạo mới, cập nhật, phá hủy nó khi đúng thời điểm. Số dòng code sẽ tăng bằng bình phương của số states của component, và những component cha phải hướng truy cập đến những component instances con, làm nó rất khó khi bỏ liên kết với những instances con trong tương lai.

Vậy thì React sẽ có những khác biệt như thế nào! Chúng ta sẽ cùng tìm hiểu tiếp

# Elements Describe the Tree
Trong React, đây là nơi element giải thoát. **Một element là một plain object miêu tả một component instances hoặc DOM node và những properties mong muốn của nó**. Nó chỉ chứa những thông tin về component type (ví dụ như 1 `Button`), những thuộc tính của nó (ví dụ như `color`), and những component con ở trong nó.

Một element không phải là một instance thực sự. Nó là một cách để nói cho React rằng bạn muốn nhìn thấy cái gì trên screen. Bạn không thể gọi bất cứ method nào trên element. Nó chỉ là một môt tả không thay đổi của object với hai trường: `type: (string |  ReactClass)` và `props: Object`.

## DOM elements
Khi mà type của element là một string thì, nó thể hiện một DOM node với tag name là chuỗi string đó, và `props` tương ứng với những attribute của nó. Đó là những gì React sẽ render. Ví dụ:
```javascript
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```
Một element chỉ là một cách để thể hiển HTML như một plain object:
```javascript
<button class='button button-blue'>
  <b>
    OK!
  </b>
</button>
```
Chú ý là elements có thể được lồng vào.Theo quy ước, khi chúng ta muốn tạo một element tree, chúng ta chỉ định một hoặc nhiều element con như là `children` props của component chứa nó.

Điều quan trọng là kể cả element con và element cha đều chỉ miêu tả và không phải là instances thực sự. Element không tham chiếu đến bất cứ thứ gì trên màn hình khi bạn tạo nó. Bạn có thể tạo và bỏ nó sang một bên, và nó không phải là vấn đề quá nghiêm trọng.

## Component elements

Tuy nhiên,  `type` của một component cũng có thể là một function hoặc một class tương ứng với một React component:
```javascript
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```
Đây chính là ý tưởng cốt lõi của React.

**Một element mô tả một component cũng là một element, giống như một element mo tả một DOM node. Nó có thể được lồng và trộn với những element khác**

Chức năng này cho phép bạn định nghĩa một `DangerButton` component như một `Button` với một giá trị thuộc tính `color` riêng mà không lo lắng rằng liệu `Button` renders từ một DOM `<button>`, một `<div>`, hoặc một thứ gì đó khác:
```javascript
const DangerButton = ({ children }) => ({
  type: Button,
  props: {
    color: 'red',
    children: children
  }
});
```
Bạn có thể trộn và tích hợp DOM và component elements trong một element tree đơn độc:
```javascript
const DeleteAccount = () => ({
  type: 'div',
  props: {
    children: [{
      type: 'p',
      props: {
        children: 'Are you sure?'
      }
    }, {
      type: DangerButton,
      props: {
        children: 'Yep'
      }
    }, {
      type: Button,
      props: {
        color: 'blue',
        children: 'Cancel'
      }
   }]
});
```
Và nếu bạn thích JSX:
```javascript
const DeleteAccount = () => (
  <div>
    <p>Are you sure?</p>
    <DangerButton>Yep</DangerButton>
    <Button color='blue'>Cancel</Button>
  </div>
);
```
Việc trộn và tích hợp giúp những component tách rời khỏi những component khác, giống như nó có thể biểu thị cho cả quan hệ *is-a* và *has-a* một cách duy nhất thông qua sự hợp thành:
* `Button` là một DOM `<button>` với những thuộc tính riêng biệt.
* `DanderButton` là một `Button` với những thuộc tính riêng biệt.
* `DeleteAccount` chứa một `Button` và một `DangerButton` bên trong một `<div>`
## Components Encapsulate Element Trees
Khi React nhìn nhận một element dưới dạng một function hoặc class `type`, nó biết cách hỏi component rằng nó render element nào, có được tương ứng với `props`.

Khi nó nhìn nhận element này:
```javascript
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```
React sẽ hỏi `Button` nó sẽ renders cái gì. `Button` sẽ trả về element như dưới:
```javascript
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```
React sẽ lặp đi lặp lại tiến trình này cho tới khi nó biết được DOM tag elements cho mỗi component trên trang đó.

React như một đứa trẻ hỏi bạn rằng "Y là gì" với mỗi câu trả lời của bạn "X là Y" nó sẽ lại hỏi tiếp cho đến khi nó tìm thấy được một vài điều gì đó trên thế giới này.

Nếu bạn nhớ đến cái ví dụ về `Form` ở phần đầu thì nó sẽ được viết bằng React như bên dưới:
```javascript
const Form = ({ isSubmitted, buttonText }) => {
  if (isSubmitted) {
    // Form submitted! Return a message element.
    return {
      type: Message,
      props: {
        text: 'Success!'
      }
    };
  }

  // Form is still visible! Return a button element.
  return {
    type: Button,
    props: {
      children: buttonText,
      color: 'blue'
    }
  };
};
```
Chính nó! Đối với React component, props là đầu vào và một element là đầu ra.

**Một element được trả về có thể chứa element mô tả DOM node, và element mô tả những component khác. Nó cho phép bạn biên soạn những phần không phụ thuộc của UI mà không cần dựa vào cấu trúc DOM bên trong**

Chúng ta để cho React tạo, cập nhật, hủy instances. Chúng ta mô tả chúng với những element chúng ta trả về từ những component. Và React sẽ để ý đến việc quản lý instances.

## Components Can Be Classes or Functions
Trong đoạn code ở trên, `Form`, `Message`, `Button` là những React components. Chúng có thể được viết như một function hoặc như một class từ `React.Component`. Có ba cách để khai báo một component gần giống nhau:
```javascript
// 1) As a function of props
const Button = ({ children, color }) => ({
  type: 'button',
  props: {
    className: 'button button-' + color,
    children: {
      type: 'b',
      props: {
        children: children
      }
    }
  }
});

// 2) Using the React.createClass() factory
const Button = React.createClass({
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
});

// 3) As an ES6 class descending from React.Component
class Button extends React.Component {
  render() {
    const { children, color } = this.props;
    return {
      type: 'button',
      props: {
        className: 'button button-' + color,
        children: {
          type: 'b',
          props: {
            children: children
          }
        }
      }
    };
  }
}
```
Khi một component được khai báo như một class, nó sẽ có một chút mạnh mẽ hơn so với môt functional component. Nó có thể chứa một ít local state và thực thi logic khi DOM node tương úng được tạo hoặc khi bị hủy.

Một functional component thì sẽ yếu hơn class component vì nó đơn giản và chỉ thực thi giống với class component ở `render()`. Nếu bạn không cần những chức năng chỉ có sẵn ở class, thì chúng ta nên sử dụng functional component thay cho class component.

**Tuy nhiên, dù là functional component hay class component thì về cơ bản chúng là all components to React. Chúng nhận props như đầu vào để xử lý và trả về element như đầu ra**
# Summary
Tổng hợp lại thì chúng ta đã tìm hiểu được những nội dung như sau:

* Chúng ta biết được element là một plain object mô tả những gì chúng ta muốn hiển thị trên màn hình. Element có thể chưa những element khác trong prop của nó. Khi một element được tạo thì nó sẽ không bao giờ bị thay đổi.
* Một component có thê được khỏi tạo bằng nhiều cách. Nó có thể là một class với một `render()` method. Nó cũng có thể là một function. Nhưng nó đều làm một việc duy nhất là nhận các prop input và trả về một element tree như output.
* Một instance là cái mà bạn tham chiếu đến `this` trong component class. Nó rất có ích trong việc quản lý local state và sử dụng lifecycle event.
* Functional component thì không có instances. Class component thì lại có instances, nhưng bạn không bao giở phải trực tiếp tạo component instances, React sẽ làm điều đó cho bạn và bạn chỉ việc sử dụng thôi.
* Cuối cùng, nếu bạn muốn tạo một element thì hãy sử dụng `React.createElement()`, `JSX` hoặc sử dụng element factory helper. Đừng viết element dưới đang plain object, bạn chỉ cần hiểu nó là một plain object là được.

Bài chia sẻ của mình đến đây là hết! Nếu bạn vẫn còn thăc mắt, chưa hiểu rõ thì hay đọc kỹ phần summary và mapping với từng phần ở trên nhé!
# Link tham khảo
* https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
* https://medium.com/@fay_jai/react-elements-vs-react-components-vs-component-backing-instances-14d42729f62