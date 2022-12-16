### Render props là gì?
**Render props** (hay còn được gọi là **render callback**) là kỹ thuật để re-use code rất phổ biến trong React và được sử dụng nhiều trong các thư viện cũng như các dự án lớn. Tuy nhiên chắc hẳn còn nhiều bạn chưa biết đến nó, thế nên mình sẽ giới thiệu qua một chút nhé.

Kỹ thuật **render props** sử dụng 1 props là function trả về React Element, và component sẽ render giá trị trả về của hàm đó thay vì trực tiếp render React Element như thông thường

**Ví dụ:**

```
class SomeComponent extends React.Component {
  render() {
    return this.props.render() // Gọi hàm truyền vào thông qua props
  }
}

class App extends React.Component {
  render() {
    return (
      <SomeComponent render={
        () => (
          <div className="hello">
            Hello world
         </div>
        )
      }/>
    )
  }
}
```

Bạn có thể thấy  trong ví dụ, mình truyền vào **SomeComponent** 1 props là render và gán nó bằng 1 function trả về 1 React Element (div), ở trong **SomeComponent** mình gọi function ***this.props.render*** được truyền từ ngoài vào để render. Và bạn nên nhớ là truyền vào function và gọi nó để phục vụ việc render thì mới là **render props** và tên props bạn đặt là gì tuỳ thích, không phải là có cái props tên là render thì là kỹ thuật render props đâu =]]. Khi chạy đoạn code như trên, giao diện sẽ hiển thị cái div Hello World, đúng như các bạn dự đoán.


-----


Ví dụ trên rất dummy và không cho thấy được tác dụng của việc sử dụng **render props**, tất nhiên rồi vì nếu bạn gọi 1 function không có tham số thì khác bạn sử dụng hằng số đâu. Sau đây chúng ta sẽ đến với một ví dụ *"smart"* hơn 1 tẹo: Bạn có data trả về từ một nguồn nào đó, và bạn có thể subscribe sự thay đổi của khối data và cập nhật thay đổi giao diện dựa trên data này.

**Ví dụ:**
{@codepen: https://codepen.io/thetungctn/pen/VXvaKY}

Hãy nhìn qua ví dụ trên, đừng quan tâm đến code của cái **NameStore**, bạn chỉ cần biết đó là khối data mà mình đã nói đến, ở đây mình có data là 1 cái tên và cứ 0.5s lại được cập nhật, ta có thể lấy dữ liệu từ đó và subscribe sự thay đổi của nó. Và **NameComponent**, bạn cũng không cần đọc hết nó chỉ cần hiểu là nó sẽ subscribe sự thay đổi của cái **NameStore** trên và mỗi khi data thay đổi thi nó sẽ **setState** để thay đổi state **name** của nó. Cái bạn cần chú ý nhất là hàm render của **NameComponent**, nó sử dụng **render props** (như các bạn đã biết :P), và gọi function ***this.props.render*** với tham số là ***this.state.name***, vì thế mỗi khi state **name** được update thì component sẽ render lại và gọi lại function với 1 tham số khác, giao diện cũng được cập nhật tương ứng. Mình giải thích chỗ này hơi khó hiểu nhưng bạn cứ đối chiếu những gì mình nói với phần code tương ứng là hiểu ngay ấy mà, với cả **Codepen** hiển thị kết quả ngay bên cạnh nên chắc cũng dễ hình dung, nhỉ :)


-----


Rồi, vậy là chúng ta đã sử dụng **render props** với function có tham số, mà sao có cảm giác nó không *"make sense"* cho lắm nhỉ,  nếu như ví dụ trên thì render trực tiếp cho xong, truyền vào cái function kia làm quái gì? Thế nhưng hãy nhớ lại những gì mình đã nói ở đầu bài viết, **render props** là sử dụng để re-use (sử dụng lại) code, vì thế nếu code của bạn chỉ dùng cho 1 trường hợp nhất định thì chắc chắn là dùng render props không có tác dụng gì rồi. Bạn hãy nghĩ đến trường hợp phải sử dụng lại **NameComponent** ở những nơi khác nhau, đó chính là khi **render props** phát huy tác dụng của mình.

**Ví dụ**

{@codepen: https://codepen.io/thetungctn/pen/WzvwMK}


Vẫn cái **NameComponent** như trên, mình sử dụng cho 3 Component khác nhau, state **name** ở  mỗi **NameComponent** được sync (đồng bộ hoá) với data trong **NameStore** và được đưa vào tham số khi gọi function render được truyền từ các component cha. Kết quả, như các bạn thấy, cả 3 Component đều subscribe vào 1 nguồn dữ liệu chung, và nhận sự thay đổi sau mỗi 0.5s. Cool!

### Khi nào sử dụng render props
OK , như vậy bạn đã biết **render props** là gì và cách sử dụng **render props**, vậy thì khi nào thì sử dụng **render props**. Tình huống hay được áp dụng sử dụng **render props** nhất mà mình biết đó là: Sử dụng để lấy dữ liệu từ nguồn nào đó, listen và cập nhật sự thay đổi, nguồn này có thể là dữ liệu lấy từ DB và cập nhật qua socket, hoặc là những giá trị của DOM và cập nhật dựa trên DOM events, cũng có thể là 1 custom Object mà chúng ta tự tạo ra với mục đích nào đó, .... 
### Có thấy ai viết React kiểu này bao giờ đâu nhỉ?
Có thể bạn đã gặp nhưng không để ý, rất nhiều thư viện nổi tiếng sử dụng render props để implement và cung cấp API cho người sử dụng, ví dụ như: [React Router](https://github.com/ReactTraining/react-router), [React Motion](https://github.com/chenglou/react-motion), [Down Shift](https://github.com/paypal/downshift), [Unstated](https://github.com/jamiebuilds/unstated ),... Và, không biết bạn cập nhật thông tin chưa, **React Context API** mới, sẽ xuất hiện trong bản **16.3.0** tới đây, sẽ dùng render props trong việc lấy dữ liệu ở những component con, bạn có thể đọc tại [đây](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b) để hiểu rõ hơn cách sử dụng nhé.
### Kết luận
Bài viết tới đây là hết rồi, cám ơn các bạn đã theo dõi đến tận những dòng này, mong các bạn hiểu rõ và vận dụng **render props** một cách hiểu quả nha. Ye!