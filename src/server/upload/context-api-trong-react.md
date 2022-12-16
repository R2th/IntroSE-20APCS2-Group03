> Context cung cấp cho bạn một cách để truyền dữ liệu xuống cây component mà không cần phải truyền props xuống ở tất cả các cấp component.
> 
Với một định nghĩa đơn giản như vậy ở ngay đầu doc của Context trong React cũng giúp chúng ta phần nào định hướng về cách hoạt động cũng như chức năng của nó trong các component của React.

# Tại sao lại là Context API
React Context tồn tại để bạn không cần truyền dữ liệu một cách thủ công bằng việc sử dụng props ở tất cả các cấp của component. Context chia sử dữ liệu cho nhiều các component khác nhau. Việc truyền dữ liệu từ component cha xuống component con thông qua props là tương đối dài dòng và khó kiểm sóat so với việc sử dụng Context API. Bằng việc sử dụng Context API, chúng ta không còn cần phải truyền các dữ liệu muốn chia sẻ với nhau thông qua việc dùng props.
## Dùng khi nào?
Những thứ thuộc về context là dữ liệu được coi là global như thông tin người dùng, hay thông tin giỏ hàng... Vậy các lý do khác nhau cho việc sử dụng context:
* Dữ liêụ là cần thiết ở nhiều nơi: dữ liệu cần được sử dụng bởi nhiều component như chủ đề, người dùng, giỏ hàng...
* Truyền dữ liệu qua nhiều component: sử dụng context trong trường hợp này là tốt hơn khi bạn muốn chuyển 1 giá trị props thông qua nhiều component.

## Khối xây dựng và API
Context API bao gồm một số khối xây dựng quan trọng:
* context: đối tượng context là một đối tượng lưu giữ giá trị context hiện tại và có thể được đăng ký.
* provider: là một componet của React cung cấp giá trị, nó lấy từ đối tượng context.
*  consumer: là một component có thể sử dụng giá trị của provider và có thể hiển thị giá trị.

Đây là một phần lý thuyểt và có vẻ nó vẫn đang rất khó hiểu. Chúng ta hãy thử đi vào 1 ví dụ sau để hiểu rõ về nó hơn.

# Ví dụ với Context API
Các bước thực hiện trong ví dụ này:
* Tạo đối tượng context: Chúng ta sử dụng React.createContext(). Nó trả về 1 đối tượng context để lộ ra Provider và Consumer component.
* Khai báo provider: Lấy tham chiếu Provider component có sẵn trong đối tượng context vừa tạo.
* Khai báo consumer: Đây là 1 component sống trên đối tượng context, và sử dụng nó để hiển thị giá trị cho người dùng.

## Tạo đối tượng context
Với 1 project React đã tạo sẵn, ta tạo file `theme.js`, nó sẽ lưu trữ đối tượng context của chúng ta.

Đơn giản là chúng ta sử dụng React.createComponent() để tạo một đối tượng context như sau:
```js
// theme.js
import React from 'react';
const ThemeContext = React.createContext('light');
export default ThemeContext;
```
Chúng ta gọi createContext() và truyền vào cho nó 1 tham số đầu vào đơn giản là giá trị mặc định của context. Chúng ta cũng export đối tượng để có thể sử dụng nó ở nhiều nơi khác.
## Khai báo Provider
Sau khi chúng ta có 1 một đối tượng context được định nghĩa ở trên dùng để lấy tham chiếu đến Provider. Đê thưc hiện điều này, ta tạo file `sample.js` có React component để trình bày cách hoạt động của đối tượng context. Tạo component như sau:
```js
// sample.js
import React from 'react';
import Theme from './theme';
const Sample = () => (
<Theme.Provider value='dark'>
// declare consumer
</Theme.Provider>
);
export default Sample;
```
Ở  trên, ta khai báo một functional component bình thường và cũng import đối tượng context `Theme`. Sau đó, ta lấy tham chiếu đến provider bằng cách gọi `Theme.Provider`. Đến đây thì thực sự cho có gì gọi là đang họạt động vì bạn có thể thấy rằng chúng ta đang thiếu một component gọi là Consumer để sử dụng giá trị và hiển thị ra cho người dùng. Ngoài ra thì ta cũng đặt `value` là `dark`.
## Khai báo Consumer
Ta khai báo component là Consumer và hiển thị giá trị cho người dùng. Tiếp tục với file `sample.js` như sau:
```js
// sample.js
import React from 'react';
import Theme from './theme';
const Sample = () => (
<Theme.Provider value='dark'>
    <Theme.Consumer>
        {theme => <div>Our theme is:  {theme}</div>}  
      </Theme.Consumer>
  </Theme.Provider>
);
export default Sample;
```
Ở trên, ta đã thêm consumer dưới dạng đối tượng `Theme.Consumer` và ta thấy rằng bên trong nó định nghĩa một hàm có tham số truyền vào là giá trị của `theme`. Ta hiển thị giá trị của `theme` vào trong thẻ `div`.

Bạn có nghĩ đến tại sao ta lại đặt giá trị mặc định trong component Theme? Giá trị mặc định trên sẽ không được sử dụng nếu ta khai báo Provider. Tuy nhiên, nếu ta thiếu một component Provider, thì nó sẽ sử dụng đến giá trị mặc định. Vì vậy, đoạn mã sau sẽ xuất ra `dark` dưới dạng giá trị, chính là giá trị mà ta đặt cho Provider.
```js
const Sample = () => (
      <Theme.Provider value='dark'>
            <Theme.Consumer>
                    {theme => <div>Theme value: {theme}</div>}
        </Theme.Consumer>
      </Theme.Provider>
)
```
Và với đoạn mã sau đây thì giá trị có nó sẽ là `light`:
```js
const Sample = () => (
      <Theme.Consumer>
            {theme => <div>Theme value: {theme}</div>}
      </Theme.Consumer>
);
```
## Sử dụng
Ta có thể đưa thành phần Consumer đưa vào component như sau:
```js
// ThemedButton.js
import Theme from 'theme.js';
const ThemedButton = (props) => (
      <Theme.Consumer>
            {theme => <button { …props }>button with them: {theme}</button>} 
      </Theme.Consumer>
);
export default ThemedButton
```
Ở `sample.js` có thể viết gọn như sau:
```js
// sample.js
import React from 'react';
import Theme from './theme';
import ThemedButton from './ThemedButton';
const Sample = () => (
    <Theme.Provider value='dark'>
          <ThemedButton />
    </Theme.Provider>
);
export default Sample;
```
Bạn thấy rằng giá trị từ provider đang được truyền qua các props và ta có thể truy cập vào thuộc tính `theme` thông qua Consumer.
## Dynamic Context
Nếu ta muốn thay đổi giá trị provider thì phải làm như nào? Có một cách là `dynamic context`. Ta đặt Provider vào bên trong một component và để giá trị của nó phụ thuộc vào state của component như sau:
```js
// DynamicContext.js
class DynamicContext extends React.Component {
    constructor(props) {
            super(props);
             this.state = {
                    theme: 'dark'
             };
     }
      render() {
            return (
                  <ThemeContext.Provider value={this.state.theme}>
                        <ThemedButton />
                  </ThemeContext.Provider>
            );
      }
}
```
Bây giờ, ta co thể dễ dàng thay đổi state và đồng nghĩa với việ thay đổi giá trị Provider đang cung cấp cho bất kỳ Consumer nào.
## Ví dụ về thay đổi state
Dưới đây là ví dụ về compoent bao gồm một danh sách với 2 giá trị khác nhau là `light` và `dark`. Khi chúng ta thay đổi giữa 2 giá trị đấy thì state bị thay đổi và vì lý do state được  kết nói với Provider nên giá trị Provider sẽ thay đổi dựa vào state.
```js
// AnyComponent.js
import React from 'react';
import Theme from './theme';
import ThemedButton from './ThemedButton';
class AnyComponent extends React.Component {
        constructor(props) {
            super(props);
             this.state = {
                   theme: 'dark',
                    themes: ['light', 'dark']
             };
     }
     
      handleSelect = (evt) => {
            console.log('Changing value to ' + evt.target.value);
    
            this.setState({
                  theme: evt.target.value
            });
      };
      
      render() {
            return (
                <React.Fragment>
                      <h2>Any component</h2>
                      <select value = {this.state.theme} 
                              onChange ={this.handleSelect} > 
                              { this.state.themes.map(t => 
                                      <option value = {t} >{t}</option>)
                              }
                      </select>
                      <div>
                              Selected theme: {this.state.theme} 
                      </div>
                      <Theme.Provider value = {this.state.theme} >
                            <ThemedButton theme={this.state.theme} />
                      </Theme.Provider>
                </React.Fragment>
           );
      }
}
export default AnyComponent;
```
Ở đoạn mã trên, khi sự kiện `onChange` được kích hoạt, ta gọi đến phương thức `handleSelect()` và dẫn đến state `theme` được cập nhật. Thuộc tính `theme` tương tự ở trong Theme.Provider được gán giá trị chính là giá trị state. Do đó, sự thay đổi trong danh sách dẫn đến component Provider được cung cấp 1 giá trị mới.
# Kết luận
Trong bài này, ta đã đề cập và giải thích đến Context API là gì, nên sử dụng nó khi nào. Cũng như một cách sơ lược về các bước mà bạn có thể khỏi tạo cũng như sử dụng context trong  React. Với 1 ví dụ tương đối đơn giản và tập trung vào phần context này mong rằng các bạn sẽ hiểu hơn dù chỉ một phần nhỏ trong kiến thức về Context API trong React. Với nhu cầu muốn dùng chung giá trị state cho nhiều các component thì các bạn cũng có thể đã biết đến Redux store. Context API chỉ là một cách để bạn có thể việc rút gọn quá trình truyền props giữa những vô vàn các lớp của component.
# Tham khảo
https://reactjs.org/docs/context.html#contextprovider