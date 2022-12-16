## 1. Lời mở đầu
* State trong react mang tính chất là "local" hay "encapsulated" (đóng gói) bởi state không  được truy cập bởi bất kể component khác ngoại trừ component sở hữu và thiết lập nó.
* Một component chỉ có thể truyền state của nó tới các component con như là các props. Các component con không quan tâm props nhận được là props hay state của cha. Các component con chỉ việc sử dụng chúng.
* Dòng chảy dữ liệu như vậy gọi là "top-down data flow". Bất kì state nào cũng được sở hữu bởi một component cụ thể. Và bất kì dữ liệu nào liên quan đến state đó chỉ có thể ảnh hưởng đến các component "bên dưới" chúng. Hiểu đơn giản như là dòng chảy thác nước.
* Vấn đề đặt ra là làm thế nào để có thể chia sẻ state được được quản lý bởi một component để component anh em của nó có thể dùng được? Câu trả lời là ta phải dùng **Lifting-state-up** -  Chuyển local state từ component con sang cho component cha chung gần nhất.
## 2. Bắt đầu
* Tạo một ứng dụng react với Create React App
    ```
    npx create-react-app my-app
    cd my-app
    npm start
    ```
* Tạo một temperature calculates tính toán liệu nước có sôi với nhiệt độ nhập vào hay không. Đầu tiên tạo một component "BoilingVerdict" nhận vào nhiệu độ (Celsius) như là một prop.
    ```js
    function BoilingVerdict(props) {
      if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
      }
      return <p>The water would not boil.</p>;
    }
    ```
    
* Tạo một component "Calculator" render ra một input cho phép bạn nhập vào nhiệt độ. Value của input là **this.state.temperature**, bắt sự kiện **onchange** -  khi ô input thay đổi component sẽ set lại state là giá trị người dùng nhập vào.
    ```js
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
*  Ta đã có một ô input nhập vào độ C, bây giờ ta muốn có thêm một input độ F và chúng đồng bộ với nhau, nghĩa là khi người dùng nhập vào độ C thì ô input độ F có giá trị là giá trị nhiệt độ người dùng vừa nhập tính theo độ F, và ngược lại.
* Trước tiên, để xử lý vấn đề có 2 ô input, ta sẽ trích xuất ra từ  component Calculator một component là **TemperatureInput** render ra một ô input nhập độ C hay nhập độ F tương ứng với một prop **scale** truyền vào là "c" hay "f".
    ```js
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
    
    Component giờ sẽ thay đổi, render ra 2 input riêng biệt:
    
    ```js
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
*    Hiện tại ta đang có 2 component input nhưng mỗi component có một state temperature riêng (local state). Do vậy khi ta nhập nhiệt độ vào mỗi ô input, ô input kia sẽ không được update.
*    Đến lúc sử dụng **Lifting-state-up**. Như đã nói, chia sẻ state giữa các component anh em được thực hiện bằng cách di chuyển state lên component cha chung gần nhất của các component đó. Như vậy đối với ví dụ này ta sẽ bỏ local state của component TemperatureInput , thay bằng local state của component Calculator, và  component Calculator sẽ truyền state xuống các component TemperatureInput như là các prop. Và như vậy các prop của component TemperatureInput đều đến từ component cha Calculator, 2 ô input sẽ được đồng bộ. 
*  Như ta đã biết, props là "read-only". Không giống như trước đây, temperature là local state của component TemperatureInput, TemperatureInput có thể thay đổi state bằng cách gọi  **this.setState()**, bây giờ temperature là prop đến từ cha, component TemperatureInput sẽ không kiểm soát nó. Và chỉ component cha Calculator mới thay đổi được temperature bằng **this.setState()**. Vậy làm thế nào để khi người dùng nhập nhiệt độ vào một ô input thì state temperature của component cha Calculator sẽ được thay đổi.
*  React sẽ giải quyết vấn đề này bằng cách làm cho component được **controlled**. Cũng giống như component Input của DOM, nhận vào prop value và onchange, Chúng ta cũng sẽ tùy chỉnh component TemperatureInput nhận vào các prop là temperature và onTemperatureChange từ component cha Calculator. Cụ thể, ô input của component con sẽ bắt sự kiện onChange -  gọi đến  **this.props.onTemperatureChange**. Prop onTemperatureChange được cung cấp bởi component cha Calculator, nó là các hàm phụ trách việc set state của Calculator.
*  Tóm lại component TemperatureInput sẽ thay đổi như sau:
    ```js
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
*    Bây giờ sẽ thay đổi component Calculator:
   
        ```js
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
        Các hàm phục vụ chuyển đổi giữa độ C và độ F
        ```js
        function toCelsius(fahrenheit) {
          return (fahrenheit - 32) * 5 / 9;
        }

        function toFahrenheit(celsius) {
          return (celsius * 9 / 5) + 32;
        }

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
        
        [Thử trên codepen](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)
        
##       3. Tổng quan lại luồng
Khi edit một input của component TemperatureInput

* React bắt sự kiện onChange đối với <input> của DOM, gọi đến phương thức được chỉ định, đó là phương thức **handleChange** của component TemperatureInput.
* Phương thức handleChange của component TemperatureInput gọi **this.props.onTemperatureChange()** với tham số là giá trị mới nhập vào ô input. prop onTemperatureChange được cung cấp bởi component Calculator cha của nó.
* Ở component Calculator, chỉ định **onTemperatureChange** của TemperatureInput nhập độ C là phương thức **handleCelsiusChange**, **onTemperatureChange** của TemperatureInput nhập độ F là phương thức **handleFahrenheitChange**. Như vậy  phương thức nào được gọi sẽ được gọi tùy thuộc vào input nào mà chúng ta edit.
* Trong mỗi phương thức **handleCelsiusChange**, **handleFahrenheitChange**, component Calculator sẽ thiết lập lại State bằng cách gọi  **this.setState()** với value và scale của ô input mà ta vừa edit.
* Khi setState, component Calulator sẽ yêu cầu React render lại chính nó, React gọi phương thức **render**.  Value của 2 input sẽ được tính toán lại dựa trên state temperature
* React gọi phương thức render của các component TemperatureInput với các prop được chỉ định bởi Calculator
* React gọi phương thức render của component BoilingVerdict, truyền vào nhiệt độ theo độ C như là một prop
* Lặp lại quá trình edit một input
## 4. Tổng kết
* Qua bài viết này, ta đã tìm hiểu về kĩ thuật Lift-State-Up trong React. Thông thường, state được thêm vào một component cần nó để render. Tuy nhiên khi một component khác cũng cần nó, ta sẽ "nâng" state lên component cha chung gần nhất của các component đó. Thay vì cố gắng đồng bộ dữ liệu giữa các component khác nhau, ta sẽ dựa trên "top-down data flow".
* Nguồn tham khảo https://reactjs.org/docs/lifting-state-up.html. Mong bài viết sẽ có ích với các bạn.