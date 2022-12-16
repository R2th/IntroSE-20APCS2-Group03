![](https://images.viblo.asia/8b8cedae-45ce-4558-b562-7692bd5cd675.png)

React native là một công cụ giúp chúng ta lập trình đa nền tảng để tạo ra các ứng dụng trên môi trường native. Nó là một framework mã nguồn mở được phát triển bởi Facebook, cho phép bạn sử dụng Java script để phát triển phần mềm trên điện thoại di động Android và IOS. React native cũng giống như React vậy chúng sử dụng các native components thay vì các web components. Vì vậy để hiểu về cấu trúc của React native chúng ta cần phải có các kiến thức cơ bản với các khái niệm cơ bản của React như là JSX, components, props hay là state.

Trước khi đi vào các phần chính, chúng ta hãy thử điểm qua xem rằng React native có những điểm lợi và điểm yếu gì. Nó có đáng để chúng ta bỏ công sức ra để tìm hiểu hay không?
## Advantages and Disadvantages

![](https://images.viblo.asia/63416380-42fa-4467-94ba-c2421bd4275a.jpg)

Mình cũng chỉ mới tìm hiểu về React native nên cũng không thể liết kê hết những điểm tốt và chưa tốt của nó được. Nhưng một số ưu điểm mà có thể nhìn thấy ngay được khi mới bắt đầu tìm hiểu về nó như là:
* Khả năng tái sử dụng code và các components đã được phát triển sẵn.
* Có một cộng đồng developers hùng hậu.
* Sự tuyệt vời của Live and Hot reloading. (Bạn sẽ tiết kiệm được cả một đống thời gian nhìn xcode build và running app của bạn)
* Tiết kiệm effort khi có thể code 1 mà có thể run cho cả ios và android.

Bên cạnh đó cũng có một vài những nhược điểm cần phải kể đến:
* Vẫn đòi hỏi native code.
* Hiệu năng sẽ thấp hơn với app thuần native code.
* Bảo mật không cao do dựa trên JS.
* Quản lý bộ nhớ.
* Khả năng tùy biến cũng không thực sự tốt đối với một vài module.

Tuy có những mặt hạn chế nhưng những lợi ích mà nó đem lại thì lại không hề nhỏ, vì vậy hãy thử bắt tay vào tìm hiểu về nó nhé.

## Prepare and install
Vì mình đang sử dụng MacOS nên bài viết này mình cũng sẽ chỉ đề cập đến cách cài đặt trên mac thôi, thông tin thêm có thể tham khảo [tại đây](https://facebook.github.io/react-native/docs/getting-started) 
Đầu tiên thì chúng ta được recommend cài đặt [Homebrew](https://brew.sh/) dùng để cài đặt Node và Watchman.
Xong đó là cài đặt Node, Watchman (là công cụ giúp chúng ta theo dõi sự thay đổi để cập nhật chúng) và React native CLI.
```
brew install node
brew install watchman
```

![](https://images.viblo.asia/0a1593ab-af82-4bfa-8f2d-4a3ca1b46b9f.png)

Tiếp sau đó chúng ta cần có Xcode để có React native có thể sử dụng simulator của máy ảo.
Một trình biên dịch code ví dụ như Atom, Visual studio code, SublineText, ....

## React native concepts
### Components
Components là một khái niệm cơ bản của cả React và React native. Chính việc chia nhỏ ứng dụng thành các components nhỏ tạo nên tính tái sử dụng cao và khả năng mở rộng của chúng. Hãy thử phân tích một ví dụ đơn giản trước.

![](https://images.viblo.asia/fc03a067-ca8b-41cc-aa4d-714bdaaa63a0.png)

Đây là một list cơ bản về thông tin của album có tên albumn, tên ca sĩ thể hiện, ảnh thumbnail của ca sĩ và ảnh bìa của album cùng một nút bấm mua. Chúng ta có thể hình dung ra rằng List đó sẽ là một Scroll view và các item trong đó là biểu thị cho một album. Đây có thể là một cách chia các component cho ví dụ này.

![](https://images.viblo.asia/1f488982-3c8a-48b9-ad9a-2cb950096a25.png)

Ngoài những component chúng ta xây dựng và sử dụng lại đó, thì Reat native sẵn có đó là một tá các component mặc định rồi.

### Props
Props là viết tắt của Properties. Một điều mà bạn cần phải nhớ khi sử dụng props đó là không bao giờ nên thay đổi giá trị của nó, hay nói cách khác, đây là một dữ liệu immutable.

Các component nhận props từ component cha. Bạn không được thay đổi giá trị của props trong các component này mà chỉ được phép đọc giá trị ra thôi. Trong React thì dữ liệu sẽ đi theo một chiều, có nghĩa là từ component cha => các component con.

Đây là một ví dụ mình sử dụng props, cung cấp cho một component tên là Header.
```
export default class App extends Component<Props> {
  render() {
    return (
      <View style  = {{flex: 1}}>
        <Header title = 'This is header' ></Header>
        <AlbumList></AlbumList>
      </View>
    );
  }
}
```

Trong component Header mình sẽ sử dụng props `title` này để render ra tiêu đề của nó.
```
export default class Header extends Component {
    render () {
        return (
            <View style = { styles.headerView }>
                <Text style = { styles.headerTitle }> { this.props.title } </Text>
            </View>
        );
    }
}
```

### State
State thì hoạt động khác với Props.  State là dữ liệu nội bộ của một Component, trong khi props là dữ liệu được truyền cho Component. Chính vì vậy chúng ta hoàn toàn có thể thay đổi state, và coi nó là một kiểu dữ liệu mutable. Vì đặc điểm này nên chúng ta hay sử dụng State để thay đổi dữ liệu của view, binding data lại view khi có thay đổi.
Nhưng chúng ta không dùng `this.state` để gán lại giá trị thay đổi cho nó, mà chúng ta sẽ dùng `this.setState`. Function này sẽ trigger cho class rằng hãy render lại component và các component con của nó, còn `this.state` thì không.

Đây là một ví dụ về sự dụng `state` để thay đổi giá trị. Giống như việc bạn truyền datasource cho tableview vậy, ban đầu datasource chính là `state` này rỗng và sau đó được trả về dự liệu sau khi call api. Và từ đó thay đổi `state` sẽ làm cho component render lại dữ liệu (tương tự reloadData() thôi).

```
export default class AlbumList extends Component {
    state = { albums: [] }

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => {
                this.setState({ albums: response.data })
            });
    }

    renderAlbums() {
        console.log(this.state.albums);
        return this.state.albums.map( album => 
            <AlbumDetail key = {album.title} album = {album} />
        );
    }

    render () {
        return (
            <ScrollView> 
                { this.renderAlbums() }
            </ScrollView>
        );
    }
}
```

Còn đây là hình ảnh consoleLog ở trên debuger, chúng ta có thể thấy rõ ràng lúc đầu `state.albums` vẫn còn rỗng và sau đó khi call api, và có data trả về, nhờ vào việc `setState` lại view có thể render và hiển thị ra ngoài.

![](https://images.viblo.asia/158bae2f-c970-461e-8a8a-219decb424c5.png)

Trên đây là tổng quan một số khái niệm chúng ta cần tìm hiểu khi đọc về React native, rất mong bài viết có thể giúp đỡ các bạn ít nhiều.

## References:
https://facebook.github.io/react-native/docs/getting-started

https://techtalk.vn/tong-quan-ve-react-native.html