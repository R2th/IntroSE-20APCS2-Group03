Trong quá trình lập trình và xây dựng một ứng dụng, ắt hẳn sẽ có đôi lúc bạn cảm thấy ứng dụng của mình chạy không được mượt, load nội dung quá lâu hay bị giật lag. Đây chính là thời điểm mà bạn nên tiến hành cải thiện hiệu suất cho ứng dụng của mình. Trong bài viết này, mình sẽ đưa ra cho các bạn 1 số tip để cải thiện hiệu suất đối với ứng dụng đựoc xây dựng bằng React.
React bản thân nó đã thực hiện rất tốt công việc về mặt hiệu suất, tuy nhiên, nếu bạn có một ứng dụng phức tạp, bạn có thể bắt đầu thấy các vấn đề với một số thành phần nhất định. Bạn vẫn có thể cải thiện hiệu suất của ứng dụng bằng các cách sau nhằm làm hài lòng người dùng của mình với một ứng dụng có hiệu suất cao:

# 1. Đo thời gian Render
Chúng ta sẽ không thể cải thiện những thứ mà chúng ta không nắm rõ được, vì vậy điều đầu tiên chúng ta cần làm để cải thiện hiệu suất của ứng dụng React là đo thời gian cần thiết để render các thành phần chính. Để đo đựoc thời gian render cho một thành phần, bạn có thể sử dụng [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API), cách thức sử dụng thì bạn có thể tham khảo trong bài viết [này](https://www.telerik.com/blogs/profiling-react-components-with-the-user-timing-api)

# 2. Sử dụng bản build Production
Có hai lý do chính tại sao việc sử dụng các bản build production lại giúp cải thiện hiệu suất của ứng dụng.
Lý do đầu tiên là kích thước tệp cho các bản build production của Reac và Reac-dom nhỏ hơn nhiều. Điều đó có nghĩa là trình duyệt người dùng phải tải xuống, phân tích và thực thi ít nội dung hơn, để ứng dụng có thể tải nhanh hơn.
Ví dụ: đối với React 16.5.1, đây là các kích thước của các file:
* 652K react-dom.development.js
* 92K react-dom.production.min.js
* 85K react.development.js
* 9.5K react.production.min.js

Đó là một sự khác biệt đáng kể!
Lý do thứ hai là các bản build production chứa ít code hơn để chạy. Những thứ như warnings và thông tin hồ sơ được xóa khỏi các bản build này, vì vậy React sẽ nhanh hơn.
Đây là một ví dụ chạy React trong chế độ development, với một component được khởi tạo và cập nhật:

![](https://images.viblo.asia/656c0ce4-c7f5-4886-a8b1-dbc8ff31d6e9.png)
![](https://images.viblo.asia/9512c42c-97c2-4e47-adda-b6414148271e.png)

Còn đây là ứng dụng đó chạy trong chế độ production:
![](https://images.viblo.asia/369d909f-c259-4cc0-8922-b33a28dbe74a.png)
![](https://images.viblo.asia/5889af2c-370e-487d-ae22-0ed6dafe05c8.png)

Thời gian khởi tạo và cập nhật luôn thấp hơn trong chế độ production. Đó là lý do tại sao việc build bản production cho người dùng là rất quan trọng!

React đã có giải thích cách cấu hình dự án của bạn để sử dụng các bản build production (https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) , với các hướng dẫn chi tiết cho các công cụ khác nhau như Browserify, Brunch, Rollup, webpack và Create React App.

# 3. Ảo hóa những danh sách dài
Số lượng elements mà chúng ta đưa vào ứng dụng sẽ tỷ lệ thuận với thời gian trình duyệt mất để hiển thị nó tỷ lệ nghịch với trải nghiệm người dùng. Vậy chúng ta phải làm gì nếu chúng ta cần hiển thị một danh sách dài các items? Một giải pháp phổ biến là chỉ hiển thị các item phù hợp trên màn hình, dùng sự kiện cuộn để hiển thị các items trước đó và tiếp theo khi thích hợp. 
Bạn có thể sử dụng các thư viện như [react-window](https://react-window.now.sh/#/examples/list/fixed-size) hoặc [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List) để thực hiện các danh sách ảo hóa của riêng bạn. Nếu bạn đang sử dụng [Kendo UI’s Grid component](https://www.telerik.com/kendo-react-ui/components/grid/), thì bản thân nó đã được tích hợp sẵn, do đó, bạn không cần phải làm gì cả.
Đây là một [ví dụ nhỏ về việc sử dụng danh sách ảo](https://stackblitz.com/edit/react-virtualized-lists):
![](https://images.viblo.asia/bc9fe41b-4db4-4257-8230-18647f1c9d4a.png)

Lưu ý rằng DOM cho rằng chỉ có hiển thị 20 nút "tr" bên trong tbody đó, mặc dù bảng này chứa tới 50.000 phần tử. Hãy tưởng tượng bạn đang cố gắng hiển thị toàn bộ 50.000 phần tử trên một thiết bị cũ và dự đoán xem sẽ mất bao lâu để nó hiển thị hoàn toàn!



# 4. Tránh đồng nhất thay đổi với PureComponent
React xây dựng UI của ứng dụng của chúng ta dựa trên những gì chúng ta trả về trong mỗi phương thức render của component. Điều này thường được gọi là DOM ảo. Mỗi khi một props hoặc state thay đổi, React sẽ re-render lại thành phần đó và các thành phần con của nó, so sánh phiên bản mới của DOM ảo này với phiên bản cũ và cập nhật DOM thực khi chúng không bằng nhau. Điều này được gọi là đồng nhất thay đổi (reconciliation).

Chúng ta có thể thấy tần suất các thành phần của mình re-render bằng cách mở  React Dev Tools và chọn checkbox Highlight Updates:
![](https://images.viblo.asia/37a4df27-68af-4ce5-89ff-a1e71f4fc7e8.png)

Bây giờ, mỗi khi một thành phần được re-render, chúng ta sẽ thấy một đường viền màu xung quanh nó.
Render một thành phần và chạy đồng nhất thay đổi thường rất nhanh, nhưng không phải là không hao tốn gì đó. Nếu chúng ta muốn làm cho ứng dụng của mình hoạt động tốt, chúng ta sẽ cần tránh việc re-render và đồng nhất không cần thiết.
Một cách để tránh re-render không cần thiết trong một thành phần là cho nó kế thừa từ React.PureComponent thay vì React.Component. PureComponent thực hiện so sánh bề nổi về các props và state hiện tại và tiếp theo, và tránh re-render nếu tất cả đều giống nhau.

Trong [ví dụ sử dụng PureComponent](https://stackblitz.com/edit/react-purecomponent) này, chúng ta hãy thêm một console.log cho mỗi lần render của thành phần:
```
class App extends React.Component {
  render() {
    console.log('App rendered');
    return (
      <React.Fragment>
        <Buttons />
        <Count />
      </React.Fragment>
    );
  }
}

class Buttons extends React.PureComponent {
  render() {
    console.log('Buttons rendered');
    return /* ... */;
  }
}

class Count extends React.Component {
  render() {
    console.log('Count rendered');
    return /* ... */;
  }
}
```

Khi chúng ta tương tác với các nút, chúng ta có thể thấy App và Count được re-render, nhưng Buttons thì không, đó là vì nó kế thừa từ PureComponent và cả props cũng như state của nó đều không thay đổi:
![](https://images.viblo.asia/c69d810b-0e9b-4513-8bf8-f0ed7cb5d169.png)

Mặc dù vậy, có lẽ không khôn ngoan khi sử dụng PureComponent ở mọi nơi, bởi vì nó chỉ so sánh bề nổi cho các props và state trên mỗi lần re-render.
# 5. Tránh đồng nhất thay đổi với shouldComponentUpdate
Một lưu ý khi sử dụng PureComponent là nó sẽ không hoạt động như mong đợi nếu bạn đang thay đổi cấu trúc dữ liệu trong các props hoặc state của mình, bởi vì nó chỉ thực hiện một so sánh nông! Ví dụ: nếu chúng ta muốn thêm một phần tử mới vào một mảng, chúng ta phải đảm bảo rằng mảng ban đầu không bị sửa đổi, vì vậy chúng tôi đã phải tạo một bản sao của nó:

```
// Bad
const prevPuppies = this.props.puppies;
const newPuppies = prevPuppies;
newPuppies.push('🐶');
console.log(prevPuppies === newPuppies); // true - uh oh...

// Good
const prevPuppies = this.props.puppies;
const newPuppies = prevPuppies.concat('🐶');
console.log(prevPuppies === newPuppies); // false - nice!
```
Một lưu ý khác là, nếu thành phần của bạn kế thừa từ PureComponent nhận những thành phần con như là props, những thành phần con này sẽ là  đựoc coi là khác nhau mỗi khi thành phần cha re-render, ngay cả khi chúng ta không thay đổi bất cứ điều gì về chúng, vì vậy chúng ta sẽ phải re-render dù có muốn hay không.

Những gì PureComponent đang thực hiện trong chương trình này đang triển khai shouldComponentUpdate chỉ trả về true khi các props và state hiện tại và tiếp theo bằng nhau. Vì vậy, nếu chúng ta cần kiểm soát nhiều hơn đối với vòng đời component của mình, chúng ta có thể tự mình điểu chỉnh giá trị trả về này!

Trong [ví dụ sử dụng ShouldComponentUpdate này](https://stackblitz.com/edit/react-scu), chúng ta hãy làm cho các button không bao giờ re-render lại:
```
class Buttons extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
 
  render() {
    console.log('Buttons rendered');
    return /* ... */;
  }
}
```
Kết quả đạt được vẫn giống như trước đây, các nút sẽ không thể re-render một cách không cần thiết, nhưng chúng ta không phải chịu rủi ro gì khi thực hiện một so sánh bề nổi về props và state:
![](https://images.viblo.asia/c27f23de-302e-48b9-a4a1-1953141c6854.png)

Nhược điểm là việc triển khai ShouldComponentUpdate bằng tay là dễ bị lỗi và có thể gây ra các lỗi khó phát hiện trong ứng dụng của bạn, vì vậy hãy cẩn thận.

# Tổng kết
Mặc dù React sử dụng DOM ảo có nghĩa là DOM thực chỉ được cập nhật khi thực sự cần thiết, vẫn còn rất nhiều điều bạn có thể làm để giúp React thực hiện ít công việc hơn, để ứng dụng của bạn hoạt động nhanh hơn. Hy vọng rằng những lời khuyên này sẽ giúp bạn cải thiện thêm hiệu suất cho ứng dụng của mình!

source: https://www.telerik.com/blogs/top-5-performance-tips-for-react-developers