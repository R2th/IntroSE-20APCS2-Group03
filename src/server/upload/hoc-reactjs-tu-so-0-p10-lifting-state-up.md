#  Lifting State Up
Với các ứng dụng React thì việc phản ánh được sự thay đổi của data là một điều cần thiết, và để làm điều đó thì có một thuật ngữ đó là "Lifting State Up" hướng tới việc đưa state về các component cha để sử dụng chung.
Vậy chúng ta cùng xem chúng hoạt động như thế nào.

Ở đây chúng ta sẽ cùng xem xét một ví dụ là tạo ra một component để đo đạc nhiệt độ nước như sau:

> Bài toán đề ra cho chúng ta là sẽ kiểm tra xem nhiệt độ được input vào lớn hơn hoặc bằng 100 độ thì sẽ thông báo nước sôi và ngược lại thì thông báo nước chưa sôi.
> 

Với yêu cầu đầu tiên của bài toán chúng ta sẽ có một component để đưa ra thông báo khi được cung cấp thông tin về nhiệt độ.

```Javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

Tiếp theo chúng ta sẽ thiết kế một Component có nhiệm vụ là render input control cho phép người dùng nhập vào nhiệt độ. Và thông tin nhiệt độ sẽ được lưu trữ và state.

```Javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

[Ví dụ theo ReactJS.org](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

Theo như yêu cầu ban đầu thì chúng ta đã hoàn thành ứng dụng rồi đúng ko ạ.

Nhưng bây giờ chúng ta có thêm một yêu cầu mới như sau:

> Bài toán đề ra cho chúng ta là sẽ kiểm tra xem nhiệt độ được input vào lớn hơn hoặc bằng 100 độ thì sẽ thông báo nước sôi và ngược lại thì thông báo nước chưa sôi. Ngoài ra cho phép người dùng nhập 2 loại là độ Celsius (C) và độ Fahrenheit (F), cả 2 phải đồng bộ với nhau.

Và công việc tiếp theo của chúng ta như sau:
 - Tách Input ra khỏi Calculator Compornent
 - Add thêm một object để phần biệt "C" hoặc là "F"

Đầu tiên chúng ta tạo ra một component cho input
```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Và Caculator Component sẽ được cập nhật lại như sau:

```Javascript
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

Bây giờ chúng ta đã đáp ứng được yêu cầu số 1, ứng dụng của chúng ta đã có 2 input nhưng có một vấn đề ở đây đó chính là chúng ta không thể đồng bộ giữa 2 input component.

Và tất nhiên chúng ta cũng sẽ không thể hiện thị được thông báo như yêu cầu ban đầu do bây giờ mỗi input sẽ có một local state riêng rẽ và không còn đồng bộ với Calculator nữa.

Chúng ta bắt đầu đi xử lý tiếp yêu cầu thôi

### Writing Conversion Functions
Trước tiên chúng ta sẽ viết function để chuyển đổi nhiệt độ qua lại giữa 2 loại là "C" và "F".

```Javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Đây là 2 function convert nhiệt độ với tham số đầu vào là một number. Chúng ta cần một function khác để chuyển đổi từ string sang number để đảm bảo rằng tham số cho 2 function trên là đúng, và nó sẽ trả về chuỗi rỗng nếu giá trị không phù hợp.

```Javascript
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

### Lifting State Up
Bây giờ chúng ta sẽ bắt tay vào việc đồng bộ giữa 2 input và hoàn thành nốt chức năng hiển thị thông báo nước đã sôi hay chưa.

Hiện tại thì 2 input của chúng ta đang giữ giá trị trong local state 

```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''}; // Local state
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});// Handle state change
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale; //Get from local state
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Và cái chúng ta mong muốn đó chính là sự đồng bộ giữa 2 input, khi chúng ta update input độ "C" thì input độ "F" sẽ thay đổi theo sự thay đổi trên.

Trong React thì việc sử dụng chung state khá là đơn giản bằng cách di chuyển state ra Component cha và các component con sẽ sử dụng và đồng bộ data cho state đó. 

Và việc chúng ta cần làm bây giờ là gì:
 - Chúng ta sẽ xoá local state của TemperatureInput.
 - Di chuyển state của TemperatureInput ra phía ngoài chính là Calculator Component

Sau khi hoàn thành thì ứng dụng của chúng ta sẽ hoạt động như sau
 - State bây giờ mà TemperatureInput được lấy từ Calculator, đây chính là "source of truth", đảm bảo cho các input đều sử dụng chung từ một nguồn, phản ánh được sự thay đổi của data.
 - Khi một trong hai TemperatureInput thay đổi giá trị thì sẽ update trực tiếp lên state của Calculator.
 - Khi state của Calculator thay đổi thì đồng nghĩa với việc TemperatureInput còn lại cũng sẽ được update theo.

Chúng ta cùng thực hiện việc update Component như sau:

Đầu tiên chúng ta sẽ xoá bỏ `this.state.temperature`  TemperatureInput và thay vào đó sử dụng `this.props.temperature`. Chúng ta giả định rằng `this.props.temperature` đã tồn tại, mặc dù chúng chưa được truyền từ Calculator Component và sẽ được truyền ở các bước sau.

```Javascript
class TemperatureInput extends React.Component {
        ....
        ....
        ....
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Chúng ta biết rằng `props are read-only`, và làm cách nào để TemperatureInput có thể update state của Calculator Component thông qua props. Chúng ta có thể làm điều này bằng cách define thêm một key vào props của TemperatureInput, và chúng ta sẽ gửi function update state Calculator Component thông qua key này.

Chúng ta sẽ gọi nó là `onTemperatureChange`

```Javascript
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Trở lại với Calculator Component.

Chúng ta hiện tại đã update local bao gồm các thông tin `temperature` và `scale` và trở thành "source of truth" của 2 input, và làm cách nào để chúng ta phân biệt được 2 loại data trên.

Ví dụ như sau

Khi chúng ta nhập vào độ "C" input là 37 thì state của Calculator sẽ là

```Javascript
{
  temperature: '37',
  scale: 'c'
}
```

Và Khi chúng ta nhập vào độ "F" input là 212 thì state của Calculator sẽ là

```Javascript
{
  temperature: '212',
  scale: 'f'
}
```

Để thực hiện điều này chúng ta có thể làm như sau:

```Javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
```

[Xem ví dụ từ ReactJs.org](https://codepen.io/gaearon/pen/WZpxpz?editors=0010).

Bài toán của chúng ta đã xử lý xong, Bạn thay đổi thông tin của input nào không còn là vấn đề nữa, khi `this.state.temperature` và `this.state.scale` được cập nhật thì input user đang nhập sẽ được giữ đúng value mà user vừa nhập, còn input còn lại sẽ được tính toán value dựa trên state vừa được cập nhật.

### Tổng kết lại như sau
 - React sẽ gọi function được chỉ định giống như là DOM gọi onChange. Trong case của chúng ta thì function `handChange` của TemperatureInput.
 - Function `handChange` trong TemperatureInput sẽ gọi `this.props.onTemperatureChange()` khi có sự thay đổi giá trị. `onTemperatureChange()` được cung cấp từ Calculator thông qua props.
 - 2 function `handleCelsiusChange` và `handleFahrenheitChange` sẽ được gọi khi input tương ứng thay đổi giá trị, và 2 function này sẽ đảm  bảo cho việc update state được chính xác như chúng ta mong muốn.
 - Khi  2 function `handleCelsiusChange` và `handleFahrenheitChange` được gọi và update state `this.setState()` thì React sẽ raise sự kiện reRender và render lại 2 input theo giá trị được cập nhật.
 - Khi React render lại Calculator thì dựa vào giá trị của state mà 2 input sẽ có giá trị tương ứng.
    -  Khi nhận được props thì  TemperatureInput sẽ render theo giá trị vừa mới được cập nhật.
    -  Tương tự như TemperatureInput thì BoilingVerdict cũng sẽ render theo giá trị mới được cập nhật và sẽ cho ra thông báo phù hợp.