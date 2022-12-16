## 1. Giới thiệu.
- Khi bạn mới bắt đầu làm quen với reactjs thì có lẽ khái niệm `Lifting state up` khá là quen. Nhưng thực sự nó hơi khó hiểu với những bạn mới. Vậy `Lifting state update` để làm gi? . Thông thường các component cần trao đổi các trạng với nhau nhằm mục đích logic, render view,... Vây chúng ta sẽ thử xem reactjs nó làm thế nào để thực hiện trao đổi trạng thái giữa các component. Thông qua vị dụ `Temperature calculator`.
## 2. Áp dụng.
Chúng ta sẽ bắt đầu với component `BoilingVerdict` với đầu vào là `celsius`(độ C) để hiển thị việc nhiệt độ sôi của nước.
```ruby
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```
Tiếp theo chúng ta sẽ tạo ra một component để tính toán nhiệt đội sôi của nước phục vụ cho việc hiển thị của component trên.
```ruby
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''};
  }

  handleChange = (e) => {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Nhập giá trị độ C:</legend>
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
[Đây là kêt quả của nó trên codepen](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

Khá hay đúng không a. Như trên chúng ta có thể thấy `state` của component cha là `Calculator` truyền xuống component dưới thông qua `props`  là `celsius`. Và tiếp theo chúng ta add thêm một input nữa để thực hiện cho `Fahrenheit`(độ F). Như vậy chúng ta thấy hiện có 2 input có chức năng khá là tương tự nhau nên chúng ta sẽ tạo một component `TemperatureInput` để gộp chúng lại.
```ruby
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''};
  }

  handleChange = (e) => {
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
Và khi đó component `Calculator` sẽ thay đổi một chút như sau:
```ruby
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
OK bây giờ chúng ta sẽ thực hiện việc đồng bộ giữa độ C và độ F và kết quả đầu ra là nhiệt độ sôi của tương ứng của cả hai.Để làm được điều đó ta sẽ thực hiện một số function sau:
```ruby
### Từ độ F sang đô C
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
### Từ độ C sang đô F
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

### Một function chung để xử lý đầu vào tương ứng là độ C hay độ F. vidu: tryConvert('abc', toCelsius) hoặc tryConvert('10.22', toFahrenheit)
```ruby
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
Và đây là cái mà bài viết mình muống chia sẻ hôm nay:
`Lifting State Up`
Như chúng ta thấy hiện tại cả hai components `TemperatureInput` được gọi trong `Calculator` đang giữ các trạng thái riêng biệt nhau:
```ruby
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''};
  }

  handleChange = (e) => {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```
Tuy nhiên cái chúng ta cần là hai trạng thái này đồng bộ qua nhau:
Để làm vậy chúng ta se remove đi state ở component `TemperatureInput`. Thay vào đó ta sẽ nhận về các props và xử lý chúng:
```ruby
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={value}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
Như vậy chúng ta sẽ phải thay đổi state của component cha và việc đó sẽ xử lý như sau:
```ruby
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', scale: 'c'};
  }

  handleCelsiusChange = (value) => {
    this.setState({scale: 'c', value});
  }

  handleFahrenheitChange = (value) => {
    this.setState({scale: 'f', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

    return (
      <div>
        <TemperatureInput
          scale="c"
          value={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```
Ok bây giờ bất kể đầu vào như thế nào thì thì state của component cha `Calculator` luôn được cập nhật. Và được tính toán theo giá trị đầu vào.
## 3. References.
https://chenglou.github.io/react/docs/lifting-state-up.html