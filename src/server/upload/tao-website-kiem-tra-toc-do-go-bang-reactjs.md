## 1. Lời mở đầu
Xin chào các bạn lại là mình đây. Đến với buổi chia sẻ hôm nay thì mình sẽ hướng dẫn các bạn học reactjs qua một số ví dụ demo để các bạn có thể dễ dàng hiểu hơn về reactjs cũng như có hứng thú hơn đối với việc học reactjs.

Việc học một môn hay một ngôn ngữ đối với mọi người không chỉ học qua lý thuyết mà còn phải học cả thực hành, rèn luyện qua nhiều lần thì chúng ta mới hiểu. Chúng ta học lý thuyết để lấy cơ sở, kiến thức khi chúng ta đã có cơ sở thì chúng ta cần phải thực hành để áp dụng những kiến thức đó.

Mình cũng mới học reactjs sau những ví dụ đơn giản của trang tutorial mình đã làm quen được với những cấu trúc cơ bản của reactjs. Mình cũng không là người thông minh và hay sáng tạo lắm nên mình thường không nghĩ được nhiều ý tưởng hay để áp dụng vào những kiến thức mình đã học. Vì thế mình hay tìm hiểu lên các trang website thấy họ làm gì hay hay là mình sẽ base project làm theo những ví dụ của họ.

Gần đây mình đã hay lên website 10fastfingers.com để luyện gõ chữ. Trước kia mỗi khi thao tác với máy tính cần đánh văn bản mình thường đánh rất chậm và ngón tay gõ như mổ cò ý. Việc này gây rất nhiều bất lợi đối với việc học tập cũng như đi làm về sau. Đối với những bạn văn phòng cần thao tác nhiều với văn bản mà thời gian thì ít thì đó là cực hình. Vì thế mình đã xem những video youtobe giúp mình để vị trí ngón tay chính xác cũng như thứ tự gõ từng ký tự để tạo thành chữ. Khi mình quen với vị trí ngón tay đặt trên bàn phím thì mình cần một công cụ giúp mình luyện gõ chữ.

10fastfingers.com là một website rất thích hợp với những bạn cần luyện gõ bàn phím nhé. Website có rất nhiều ngôn ngữ bạn có thể chọn lựa ngôn ngữ mà quốc gia mình nói và sử dụng để test nhé. Ở đây nó cũng có các cuộc thi gõ chữ thời gian trong 1 phút, mình cũng hay tham gia và có rất nhiều bạn "tay dẻo" lắm gõ kỷ lục hơn 100 từ trên một phút. Mình thì chỉ gõ được khoảng 80 từ/ 1 phút thôi đó cũng là  một sự tiến bộ rất lớn của mình, lúc đầu mới vào test trên website mình chỉ gõ được tầm khoảng 40 từ thôi.

OK. Mình nói hơi nhiều rùi ở phần dưới mình sẽ hướng dẫn các bạn tạo một website bằng reactjs để kiểm tra tốc độ gõ bàn phím nhé.

## 2. Cùng nghĩ ra ý tưởng
Ở đây mình mới làm quen với reactjs nên mình chọn reactjs để tạo website kiểm tra gõ bàn phím nhé. Các bạn đang sử dụng ngôn ngữ nào thì cũng có thể làm một website tương tự như mình nhé.

Đầu tiên muốn làm một website chúng ta cần phác thảo được những bước mà chúng ta cần làm trước, ở dưới mình sẽ nêu ra thứ tự các bước làm nhé :smile:
 - B1: Thiết kế giao diện vị trí của từng phần :
 
 ![](https://images.viblo.asia/340e94ce-74c7-4deb-b00e-34784fc80861.jpg)
 
 - B1: Chúng ta cần phải tạo một array các chữ để làm chữ mẫu khi chúng ta nhìn theo và gõ nhé.
 - B2: Tạo một bộ đếm giờ chạy ngược từ 60 giây về 0 giây.
 - B3: Khi chúng ta bắt đầu gõ ở ô input thì thời gian tự động đếm lùi từ 60s -> 0s nhé. Khi hết thời gian thì code chúng ta phải xử lý là cắt đoạn string trong ô input thành một mảng riêng, sau đó chúng ta so sánh với mảng code mình làm mẫu. Chúng ta so sánh phần tử ở cùng một vị trí ở 2 mảng nếu giống nhau thì chúng ta count + 1 một lần nhé.
 
 Trên là lý thuyết các bạn cần định hướng trước khi làm, phần dưới đây mình sẽ hướng dẫn code nhé:
## 3. Lập trình code
 Đầu tiên bạn phải tạo được một project reactjs nhé tên thì các bạn đặt tùy thích, nếu bạn nào chưa biết cách tạo thì hãy lên trang https://reactjs.org/docs/create-a-new-react-app.html để xem hướng dẫn nhé.

Trong thư mục "src" của project các bạn tạo một thư mục có tên là "components" và bên trong chúng ta cũng tạo luôn một file js với tên là "Form.js" thì chúng ta được như hình phía dưới:

![](https://images.viblo.asia/caff67cc-829d-4231-b2c6-9a17893967fa.png)

Ở trong thư mục App.js chúng ta sẽ gọi đến file Form:
```
import React from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;

```
Ok bây h mình sẽ code chủ yếu trong file Form.js nhé

Trong hàm constructor chúng ta quan chúng ta gán state như code dưới 
```
 constructor(props) {
    super(props);
    this.state = {
      array: [
        "công", "nghệ", "tay", "đơn", "viết", "lách", "lịch", "sử", "cảm", "ngoài", "hà", "hoàn", "toàn", "khỏe", "mạnh",
        "cảm", "ơn", "dũng", "xã", "hội", "thanh", "bánh", "kính", "dạ", "vâng", "da", "thanh", "niên", "tỉnh", "tháng",
        "hãy", "kính", "hạnh", "phúc", "ngữ", "văn", "khoa", "sinh", "hà", "nội", "màu", "ngành", "khó", "khăn", "trường",
        "học", "quảng", "nam", "thành", "đỏ", "hãy", "sư", "phạm", "làm", "giao", "thông", "thang", "chú", "gì", "kĩ",
        "thuật", "xin", "lỗi", "gió", "tuổi", "tin", "ngoài", "tri", "tháng", "phủ", "hoàn", "toàn", "phải", "chính",
        "khóc", "ngày", "phố", "quảng", "nam", "tự", "do", "minh", "khỏe", "mạnh", "ba", "bà", "đợi", "chi", "dũng",
        "nhà", "sợ", "lao", "xao", "hay", "tin", "năm", "tri", "hạnh", "phúc", "đàn", "sáo", "phối", "hợp", "năm",
        "xây", "dựng", "im", "giấy", "tờ", "trời", "chia", "sẻ", "nga", "nhung", "cười", "chú", "trong", "thi",
        "hành", "cổ", "tích", "in", "tự", "do", "phương", "vì", "xin", "bao", "quát", "xin", "lỗi", "lại", "đi"
      ],
      arrayTyping: [],
      currentWord: 0,
      time: 60,
      countWordCorrect: 0,
      countWordWrong: 0,
      timeCount: false
    }
  }
```

Trong đó:

- array: là mảng chữ mẫu để mình viết theo.
- arrayTyping: là mảng chúng ta gõ được
- currentWord: là vị trí chữ hiện tại chúng ta đang gõ, để khi chúng ta gõ đến đâu thì sẽ thêm css cho chữ mẫu vị trí đó để biết chúng ta gõ đến từ nào nhé.
- countWordCorrect: đếm số từ đúng
- countWordWrong: đếm số từ sai
- timeCount: để check thời gian khi chúng ta gõ ký tự đầu tiên bộ đếm thời gian sẽ chạy

Và đây là hàm onChange()
```
  onChange = (event) => {
    let txtText = event.target.value;
    let results = txtText.split(/\s+/).join(' ');
    let valueTimeCount = (txtText.length === 1) ? true : false;
    
    if (valueTimeCount === true) this.handleStartTyping();
    this.setState({ arrayTyping: results.split(" "), timeCount: valueTimeCount, 
      currentWord: results.split(" ").length - 1 })
  }
```
Trong hàm này có nhiệm vụ là txtText sẽ lấy giá trị ô input mỗi lần chúng ta nhập một ký tự vào. Khi txtText check có 1 ký tự đầu tiên được nhập vào thì sẽ bắt đầu cho đếm thời gian lùi. Và ở đây chúng ta setState, arrayTyping mảng chúng ta gõ được sẽ được được cắt từ chuỗi mà chúng ta nhập vào.

Hàm handleStartTyping() sẽ có chức năng chạy bộ đếm giờ lùi:
```
  handleStartTyping = () => {
    let timeWord = this.state.time;
    let count = 0;

    this.timer = setInterval(() => {
      count = count + 1;
      if (count <= 60) {
        this.setState({ time: timeWord - count });
        if (count == 60) {
          this.handleClearInterval();
          this.setState({ timeCount: false });
        }
      }
    }, 1000);
  }
```

Ở hàm này thờ gian sẽ được đếm giờ lùi từ 60s -> 0s, khi hết thời gian chúng ta gọi hàm handleClearInterval để dừng việc đếm ngược thời gian.
```
  handleClearInterval = () => {
    clearInterval(this.timer);
    this.handleCompare();
  }
```

Sau khi dừng việc đếm thời gian chúng ta gọi đến hàm handleCompare() để so sánh và đếm từ gõ đúng, gõ sai.
```
 handleCompare = () => {
    let array = this.state.array;
    let arrayTyping = this.state.arrayTyping;
    let countWordCorrect = this.state.countWordCorrect;
    let countWordWrong;

    for (var i = 0; i <= arrayTyping.length; i++) {
      if (arrayTyping[i] === array[i]) {
        countWordCorrect += 1;
      }
    }

    countWordWrong = arrayTyping.length - countWordCorrect;
    this.setState({ countWordCorrect: countWordCorrect, countWordWrong: countWordWrong });
  }
```

Hàm này chúng ta chạy vòng for so sánh phần tử ở mảng mẫu với phần từ ở mảng chúng ta vừa gõ được nếu đúng thì count + 1.

Ok và đây là phần render ra view màn hình chúng ta lấy những data ở state và hiển thị ra view:

```
  render() {
    var { array, countWordCorrect, countWordWrong, time, currentWord } = this.state;
    var element = array.map((element, index) =>
      <span key={index} className={index === currentWord ? index + " highlight" : index}>{element + " "}</span>
    );

    return (
      <div className="container">
        <div className="panel panel-primary panel-typing">
          <div className="panel-heading"><h3>Website kiểm tra tốc độ gõ bàn phím</h3></div>
          <div className="panel-body">
            <div className="item-character">
              {element}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Input</label><br />
                <input className="form-control"
                  placeholder="Please input typing"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2">
                <label>Time</label><br />
                <button className="btn btn-primary btn-lange" onClick={this.handleResetTime}>
                  <p id="show-time">
                    {time}
                  </p>
                </button>
              </div>
              <div className="col-md-2">
                <label>Word correct</label>
                <p>{countWordCorrect}</p>
              </div>
              <div className="col-md-2">
                <label>Word wrong</label>
                <p>{countWordWrong}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
```

Và các phần của trang website sẽ không thể thiếu CSS các bạn nhé:

```
.panel-typing {
  margin-top: 80px;
}

.panel-typing .col-md-6 {
  padding-left: 29px;
}

.panel-typing .col-md-6 input {
  height: 40px;
}

.panel-typing .item-character {
  border: 1px solid black;
  margin: 13px;
  padding: 10px;
  text-align: justify;
}

.panel-typing .item-character span {
  font-size: 29px;
  padding-left: 7px;
}

.panel-typing .correct {
  color: darkgreen;
}

.panel-typing .wrong {
  color: red;
}

.panel-typing .highlight {
  background: #dddddd;
  padding: 0px;
}

.panel-typing .col-md-2 .btn-lange {
  width: 100px;
  height: 38px;
}

.panel-typing .col-md-2 #show-time {
  font-size: 18px;
}

.panel-typing .col-md-2 p {
  font-size: 22px;
}
```

Và đây là trang website mình đã làm được nhé:
![](https://images.viblo.asia/8df35112-ce99-4694-ae50-1d6183895037.png)

Rất dễ phải không nào, nếu học một cái gì đó bạn hãy ứng dụng nó thông qua các ví dụ thì sẽ tăng hứng thú học cũng như học hiểu hơn về nó.
## 4. Kết luận
Ok. Mình đã chia sẻ về cách học một ngôn ngữ của mình ở phần bền trên rồi. Cám ơn các bạn đã theo dõi bài viết của mình :laughing:. Nếu bạn nào có ý tưởng nào hay muốn người tham gia cùng thì hãy comment dưới bài viết để chúng mình có cơ hội làm quen cũng như cùng trao đổi kiến thức nhé. Hẹn gặp lại các bạn vào tháng sau nhé!