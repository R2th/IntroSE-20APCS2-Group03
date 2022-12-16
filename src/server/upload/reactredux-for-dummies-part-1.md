Rất nhiều bạn khi tìm đến với ReactJS đã gặp khá nhiều vấn đề và không biết mình nên tiếp cận với ReactJS như thế nào. 

Đứng trên vai trò một người mới tiếp cận với ReactJS, mình viết tài liệu này với mong muốn tổng hợp lại các vấn đề mình cũng đã gặp phải khi bắt đầu tiếp xúc với ReactJS. 

Hi vọng tài liệu này sẽ giúp các bạn nắm được một phần tổng quan và cơ bản khi tìm hiểu về ReactJS.

## 1. Một vài khái niệm và kiến thức cơ bản

Trước khi tìm hiểu ReactJS là gì, có một số khái niệm và kiến thức cơ bản mà bạn nên tìm hiểu trước.

* Kiến thức cơ bản về **HTML** và **CSS**
* Kiến thức lập trình cơ bản về **JavaScript**
* Hiểu về thế nào là **DOM**
* Biết về các cấu trúc và cú pháp của **ES6**
* Biết và cài đặt sẵn **NodeJS** và **npm**

Nếu như bạn đã sẵn sàng thì chúng ta sẽ cùng tìm hiểu về  ReactJS

## 2. React 

Đầu tiên ReactJS là một thư viện JavaScript mã nguồn mở được tạo ra bởi **Facebook**, nó không phải là một framework và thường được sử dụng để xây dựng các giao diện front end. Trong kiến trúc ứng dụng MVC, React chính là lớp **view**. 

Điểm mạnh của React chính là việc bạn có thể tạo ra các **component** trên giao diện, trong đó bạn có thể thay đổi, tái sử dụng các phần tử HTML để nhanh chóng tạo nên giao diện một cách hiệu quả. Bên cạnh đó React cũng trợ giúp tronh việc lưu trữ và xử lý các luồng dữ liệu thông qua **state** và **props**.

Đến đây bạn có thể bắt đầu tự hỏi **component**, **state** và **props** là gì? Nói một cách vắn tắt thì mình sẽ đưa ra các khái niệm đó ngay sau đây.

### 1. Component 
Nếu có thể đưa ra một hình ảnh ẩn dụ cho **component** thì đó chính là các khối gạch dựng nên ứng dụng của bạn. Chính vì thế nó nên được dựng lên thành các module riêng biệt nhất có thể. Đó cũng là lí do chính mà React cực kì hay sử dụng "*this*" thay cho các phương thức jQuerry để lựa chọn các phần tử bằng class hoặc ID.

Ban đầu các bạn có thể tạo nên một trang HTML tĩnh **index.html** như sau

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>Hello React!</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      // React code will go here
    </script>
  </body>
</html>
```

Trong đó chúng ta có một *div* là *root* làm điểm bắt đầu và có một tag là *script* cho phần code React. Tiếp theo chúng ta sẽ dùng 
class của **ES6** để tạo ra một **component** tên là **ExampleContainer** 

```scala
      class ExampleContainer extends React.Component {
          // ...
      }
```

Bây giờ chúng ta có thể thêm phương thức *render()* vào trong **component**, đây là phương thức duy nhất buộc phải có trong một class **component**, được sử dụng để tạo ra các node DOM

```javascript
      class ExampleContainer extends React.Component {
          render() {
              return (
                  //...
              );
          }
        }
```

Trong phần *return* của phương thức *render()*, chúng ta có thể đưa vào các phần tử HTML cơ bản được gọi là **JSX** như ví dụ sau

```javascript
      class ExampleContainer extends React.Component {
        render() {
            return (
                return <h1>Hello world!</h1>
            );
        }
      }
```

Và cuối cung chúng ta sẽ dùng phương thức *render()* của ReactDOM dể tạo ra class **ExampleContainer** trong div root của trang HTML.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>Hello React!</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      class ExampleContainer extends React.Component {
        render() {
          return <h1>Hello world!</h1>;
        }
      }

      ReactDOM.render(<ExampleContainer />, document.getElementById("root"));
    </script>
  </body>
</html>

```

Đến đây bạn có thể thử xem file **idex.html** trên browser và bạn sẽ thấy React đơn giản chỉ là các thư viện JavaScript được đưa vào trong HTML để giúp chúng ta dựng nên các ứng dụng.

### 2. Props

Khi nói về **props** thì đây chính là các thành phần chất liệu để tạo nên các khối gạch cho ứng dụng của bạn. Đó có thể dữ liệu đc lưu trữ trong một mảng , các thuộc tính hay là bất kì loại dữ liệu nào được gán cho một phần tử. Mình sẽ nói rõ hơn về cách hoạt động của **props** ngay sau đây.

Khi bạn tạo nên một **component**, bạn sẽ phải định nghĩa dữ liệu sẽ được React sử dụng để làm **props** cho nó, cho dù bạn định nghĩa nó ở bắt cứ đâu trong file cũng không quan trọng. Và đây là một ví dụ về **props**

```javascript
      var dataArray = [
        { name: "John", age: "20" },
        { name: "Mary", age: "18" }
      ];

      ReactDOM.render(
        <ExampleContainer data={dataArray} />,
        document.getElementById("root")
      );
```

Quay lại với ví dụ về **ExampleContainer**, ở đây mình có **data**  là dạng của **prop** mình đã gán cho nó. Bạn có thể tùy chọn tên khác để gán cho props nhưng ở đây thì mình lựa chọn tên là **data**. Như vậy tất cả các phần tử trong mảng **dataArray** sẽ được đưa vào trong **component** như là một **prop** dưới dạng **data**

Trong component **ExampleContainer**, bây giờ mình có thể sử dụng function *map* (bản chất là một vòng lặp *for*) để tạo ra một danh sách các phần tử và thay cho lời chapf "Hello World", chúng ta sẽ tạo ra một bảng hiển thị danh sách tên và tuổi trong mảng **dataArray**.

```html
      class ExampleContainer extends React.Component {
        render() {
          return (
            <div className="ExampleContainer">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {dataArray.map(function(data, i) {
                    return <ChildContainer data={data} />;
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }
```

Ở đây bạn có thể thấy là mình sử dụng **ChildContainer** như là một component con nằm trong **ExampleContainer**. Điều này giúp chúng ta phân chia các component thành các module riêng biệt. Nếu như chúng ta cần có các **state** để thay đổi một phần tử nào đó thì nó nên được tạo thành một **component** riêng biệt để "*this*" sẽ luôn trỏ về một phần tử riêng biệt chứ không phải là container cha của nó.   

Trong **ChildContainer** mình sẽ xử lí các dữ liệu trong mảng như sau

```javascript
      class ChildContainer extends React.Component {
        render() {
          return (
            <tr>
              <td>{this.props.data.name}</td>
              <td>{this.props.data.age}</td>
            </tr>
          );
        }
      }
```

Như vậy là chúng ta đã tạo ra được một bảng thông tin với các dữ liệu từ mảng **dataArray** ban đầu.

### 3. State

**State** chính là các dấu mốc đánh dấu mỗi khi có sự thay đổi. Các thay đổi đó có thể là trạng thái ẩn/hiện của các thành phần trên giao diện hoặc cập nhật lại dữ liệu. Mỗi khi sử dụng **state**, chúng ta đều sẽ phải khai báo trạng thái ban đầu của state đó.

Ở phần trên mình đã đưa ra một ví dụ về lưu trữ thông tin trong một mảng và thể hiện thông tin thông qua việc truyền qua **props**, nhưng giả sử nếu như chúng ta cần xóa hoặc thêm một phần tử thì lúc này chúng ta sẽ phải sử dụng đến **state**  để cập nhật lại dữ liệu cho **component**

Thông qua ví dụ ở phần trước, chúng ta sẽ tiếp tục tạo ra một button "*Delete*" để xóa một dòng trên bảng dữ liệu.

Ban đầu chúng ta phải tạo một object *state* chứa toàn bộ thông tin của mảng **dataArray** ngay bên trong class **ExampleContainer**. 

```javascript
      class ExampleContainer extends React.Component {
        state = {
          dataArray: [
              { name: "John", age: "20" }, 
              { name: "Mary", age: "18" }
            ]
        };

        render() {
          //...
        }
      }
```

Như vậy dữ liệu trong mảng **dataArray** sẽ không phải truyền vào trong class **ExampleContainer** như một **props** nữa.
Sau đó chúng ta sẽ phải thêm hàm "*removeRow*" để cập nhật lại dữ liệu cho mảng **dataArray**

```javascript
        removeRow = index => {
          const { dataArray } = this.state;

          this.setState({
            dataArray: dataArray.filter((data, i) => {
              return i !== index;
            })
          });
        };
```

Ở đây chúng ta cần phải sử dụng hàm "*this.setState*" để cập nhật lại giá trị trong mảng thông qua hàm "*filter*". Hàm "*filter*" sẽ tạo ra một mảng mới với các phần tử có index khác với phần tử đang được trỏ tới và sẽ gán mảng tạo được vào **state** ban đầu.

Bước tiếp theo chúng ta sẽ cần phải tạo thêm button xóa cho từng hàng dữ liệu trên bảng 

```javascript
      class ChildContainer extends React.Component {
        render() {
          return (
            <tr>
              <td>{this.props.data.name}</td>
              <td>{this.props.data.age}</td>
              <td>
                <button
                  onClick={() => this.props.onRemoveClicked(this.props.index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      }
```

Và gán hàm "*removeRow*" cho các button đó thông qua **props** của **ChildContainer**.
Chúng ta cũng phải truyền "*index*" cho **ChildContainer** bằng **props** để đưa vào làm tham số cho hàm "*removeRow*".

```javascript
      class ExampleContainer extends React.Component {
        state = {
          dataArray: [
            { name: "John", age: "20" },
            { name: "Mary", age: "18" }
          ]
        };

        removeRow = index => {
          const { dataArray } = this.state;

          this.setState({
            dataArray: dataArray.filter((data, i) => {
              return i !== index;
            })
          });
        };

        render() {
          const { dataArray } = this.state;
          const onRemoveClicked = this.removeRow;

          return (
            <div className="ExampleContainer">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {dataArray.map(function(data, i) {
                    return (
                      <ChildContainer
                        index={i}
                        data={data}
                        onRemoveClicked={onRemoveClicked}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }
```
Như vậy chúng ta đã hoàn thành việc cập nhật dữ liệu thông qua **state**.


-----


Đây là toàn bộ trang **index.html** chúng ta đã tạo được

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>Hello React!</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      class ChildContainer extends React.Component {
        render() {
          return (
            <tr>
              <td>{this.props.data.name}</td>
              <td>{this.props.data.age}</td>
              <td>
                <button
                  onClick={() => this.props.onRemoveClicked(this.props.index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      }

      class ExampleContainer extends React.Component {
        state = {
          dataArray: [
            { name: "John", age: "20" },
            { name: "Mary", age: "18" }
          ]
        };

        removeRow = index => {
          const { dataArray } = this.state;

          this.setState({
            dataArray: dataArray.filter((data, i) => {
              return i !== index;
            })
          });
        };

        render() {
          const { dataArray } = this.state;
          const onRemoveClicked = this.removeRow;

          return (
            <div className="ExampleContainer">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {dataArray.map(function(data, i) {
                    return (
                      <ChildContainer
                        index={i}
                        data={data}
                        onRemoveClicked={onRemoveClicked}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      ReactDOM.render(<ExampleContainer />, document.getElementById("root"));
    </script>
  </body>
</html>

```

## 3. Kết luận
Thông qua các ví dụ ở trên, bạn đã có thể hiểu được các khái niệm cơ bản trong ReactJS là **component**, **props** và **state** cũng như cách thức hoạt động của chúng.

Hi vọng bài viết mở đầu cho series về **ReactJS for dummies** sẽ giúp ích cho bạn trong những bước khởi đầu tìm hiểu về ReactJS.

Mình xin hoan nghênh và xin cám ơn tất cả các ý kiến đóng góp cho bài viết thêm chính xác và sinh động hơn. 

Tài liệu tham khảo:
- [Overview of React by Tania Rascia.](https://www.taniarascia.com/getting-started-with-react/)
- [React for Dummies by Kelly Harrop](https://medium.com/@kellyharrop/react-for-dummies-c56a94063bfe)