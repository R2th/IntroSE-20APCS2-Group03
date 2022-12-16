Bài viết được dịch từ nguồn: https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032

Trong phần 1 (https://viblo.asia/p/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-path-1-GrLZDvjg5k0) mình đã trình bày phần backend, phần này mình sẽ trình bày phần register database và frontend

# Path 2

## Step 5

Bạn tạo tài khoản Heroku tại đây https://signup.heroku.com/ và tài khoản Mlab tại đây https://mlab.com/signup/

## Step 6

1. Sau khi tạo mLab account, click vào Create New button và chọn Single node sandbox. Set name cho database của bạn. Vì trong app đang sử dụng database là signatures, tôi sử dụng cùng name đó cho mLab database của tôi.
2. Bây giờ database của bạn đã được tạo ra, bạn có thể bắt đầu
3. Bạn cần tạo user hoặc user có thể access vào database của bạn. Nếu bỏ qua bước này, add bạn như là user access, authentication sẽ fail khi bạn deploye nó.

Bây giờ database của bạn đang chạy ở mLab. Khi bạn click vào database, bạn sẽ nhìn thấy thêm thông tin ở phía trên, nội dung là notice cách để tích hợp connection. Nó có dạng:

```
mongodb://<dbuser>:<dbpassword>@ds79234.mlab.com:9234/signatures
```

Url thực tế sẽ có username và password thay thế cho username và password của bạn.

Ta có database chạy trên local:

```
const url = 'mongodb://localhost:27017/signatures';
```

Để thay đổi, ta connect đến mLab, update url với thông tin trên mLab. Nó có dạng:

```
const url = 'mongodb://username:password@ds79234.mlab.com:9234/signatures';
```

Tuy nhiên, bạn thường để code trên github, hoặc public repo khác. Bạn không muốn username và passwork trên mLab của bạn bị người khác biết, bạn nên dùng environment variable. Trên command line, ta dùng lệnh:

```
export MONGOLAB_URI="mongodb://username:password@ds79234.mlab.com:9234/signatures';
```

Tất nhiên là thay đổi username và password mà bạn dùng. Bây giờ url của bạn sẽ thành

```
const url = process.env.MONGOLAB_URI;
```

Ta cũng có thể thay đổi app.listent đển port mới, nó sẽ có dạng:

```
app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');
```

Theo cách này, khi chạy trên mongolab, nhưng không thể connect được vì app được nghe tại cổng 3000. mLab thì cho phép bạn chạy app tại local trong trường hợp bạn muốn test thay đổi tại local.

Bước cuối cùng là deploy code lên Heroku app của bạn. Để làm điều đó, bạ có thể dùng đoạn lệnh sau trên command line:

```
heroku config:set MONGOLAB_URI=mongodb://username:password@ds79234.mlab.com:9234/signatures
```

App của bạn đã được deploy lên Heroku, bạn có thể open nó tại browser của mình. Nếu có lỗi xảy ra, hãy chắc rằng nó chạy tốt trên local, nếu vậy có thể lỗi xảy ra vì lỗi connection.

## Step 7

Dùng `create-react-app` tại command line để tạo mới react app.

## Step 8

Bây giờ ta tạo form cho phép user input. Đây là cách tao tạo form.

1. Tạo component GuestBook

```
class GuestBook extends Component
```

2. Sử dụng contructot super method để truyền props

```
constructor(props) {
    super(props);
    ...
}
```

3. Sử dụng keyword để handle thay đổi name và message của người sử dụng, và bind nó đến `this`

```
this.handleSignatureOfGuest = this.handleSignatureOfGuest.bind(this);
this.handleMessageofGuest = this.handleMessageofGuest.bind(this);
```

4. Set state của component khi mới khởi tạo

```
this.state = {
  SignatureOfGuest: "",
  MessageofGuest: "",
};
```

5. Bắt sự kiện thay đổi state của name và message

```
handleSignatureOfGuest(event) {
  this.setState({ SignatureOfGuest: event.target.value });
}
handleMessageofGuest(event) {
  this.setState({ MessageofGuest: event.target.value });
}
```

6. Tạo function cập nhật thay đổi name, message đển input target

```
addToGuestBook = event => {
    event.preventDefault();
    this.setState({
      SignatureOfGuest: event.target.value,
      MessageofGuest: event.target.value,
});
```

7. Dùng axios đê đẩy data vào database, đối với code deploy lên heroku

```
axios.post('<your-heroku-url here>', {
  SignatureOfGuest: this.state.SignatureOfGuest,
  MessageofGuest: this.state.MessageofGuest,
})
.then(response => {
  console.log(response, 'Signature added!');
})
.catch(err => {
  console.log(err, 'Signature not added, try again');
});
```

8. Sau đó lại set state name và message về gia trị rỗng

```
this.setState({
  SignatureOfGuest: "",
  MessageofGuest: "",
});
```

9. Cuối cùng, tạo render method với các input field. Trong các input field, ta gán onChange event, onChange sẽ set handlemessage hoặc handlename cho mỗi field. Value ở đây được lấy từ state, ta sẽ set this.state.message và this.state.name.

```
<input
  onChange={this.handleSignatureOfGuest}
  name="SignatureOfGuest"
  className="NameinputForm"
  value={this.state.SignatureOfGuest}
  placeholder="Enter your name"
/>
<textarea
  onChange={this.handleMessageofGuest}
  name="MessageofGuest"
  className="MessageinputForm"
  value={this.state.MessageofGuest}
  placeholder="Type a message"
/>
```

9. Thêm submit button

```
<button
  className="submitbuttonguestbook"
  type="submit"
  onClick={this.addToGuestBook}
>
  Submit to Guestbook<i className="GuestBookButton2" aria-hidden="true" />
</button>
```

## Step 9

Giờ ta sẽ tạo component khác để render data đã được lưu trong database. Sau đó put trong guestbook page.

Trong component ta sẽ làm những việc sau:

1. Tạo component

```
class GuestNames extends Component {...}
```

2. Dùng contructor và super method

```
constructor(props) {
  super(props);
  ...
}
```

3. Set state khi khởi tạo component

```
this.state = {
  messages: "",
};
```

4. Dùng componentDidMount

```
componentDidMount() {...}
```

5. Trong component, ta dùng fetch để lấy data trong database

```
fetch('<your-heroku-url-goes-here>')
.then(results => {
  return results.json();
}
```

6. Xử lý data get về

```
data.map((msg) => {
  return(
    <div key={msg.results}>
      <h3 className="h3msg">{msg.message}</h3>
      <h2 className="h2sig">-{msg.guestSignature}</h2>
    </div>
  )
}
```

7. Dùng setState đối với message

```
this.setState({messages: messages});
```

8. Tạo render method

```
render() {...}
```

9. Trong render method, ta tạo JSX element để render data. Ta dùng this.state.messages trong <h6> tag

```
return (

<div className="guestdataContainer">
  <h6>Guestbook Messages</h6>
  {this.state.messages}
</div>
```

10. Cuối cùng ta export component để có thể sử dụng được ở page khác.

```
export default GuestNames;
```

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.