> Bản thân React không khó, nhưng với hệ sinh thái của nó thì quá khổng lồ, nó khiến nhiều người trở nên bối rối khi cố gắng làm quen. Bài viết sau đây là một cái mini map đơn giản để giúp mọi người không bị lạc lối trong quá trình tìm hiểu cách mà React quản lý state.
> 

### Class-based component và `this.state`
Với mỗi component thì nó có thể chứa dữ liệu của nó ở trong `this.state`, nó có thể là mọi kiểu dữ liệu bạn muốn, như là một array, một object, hay đơn giản chỉ là một string.
```
class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = "sad";  // cài state luôn lúc component đc khởi tạo
    }
    
    render() {
        // đổi state mới cho thêm yêu đời
        // cơ mà ở đây sử dụng hàm có sắn là `setState`
        // chứ ko nhét thẳng là `this.state = ...` nhá
        this.setState("happy");  
        
        // cái này sẽ render ra thành <p>happy</p> ở trong DOM
        return <p>{this.state}</p>;
    }
}
```

### Props
Vậy là mỗi component có thể quản lý được state của bản thân thông qua `this.state`, còn với dữ liệu người khác cho (cụ thể là component cha), thì ta phải thông qua `props`.
```
class YoungBuffalo extends React.Component {
    constructor(props) { // vẫn là cái constructor này
   
        // vẫn là cái gọi super này
        super(props);
 
        // hấp thụ tinh hoa nhân cách của già trâu
        this.tinh_net = props.tinh_net;  
    }
    
    render() {
        <div>
            <p>Tính cha t khá {props.tinh_cach}</p>
            <p>nên tính t rất là {this.state.tinh_cach}</p>
        </div>
    }  // cha nào con nấy
}

class OldBuffalo extends React.Component {
    constructor(props) {
        super(props);  // viết nhiều phiền vãi!!!
        this.state = {tinh_cach: "trâu nên rất trẩu"};
    }
    render() {
        <YoungBuffalo
           {/** truyền thụ tính cách cho trẻ trâu (đây là comment trong JSX)*/}
            tinh_cach={this.state.tinh_cach}
        >    
        </YoungBuffalo>
    }
}
```

### Hook
Ngày trước, thường thì những component nào méo care đến state của nó, thì người ta hay viết nó thành `Functional component` (không có gì cao siêu, chỉ là thay vì viết component bằng class, thì ta dùng function mà thôi).
```
function YoungBuff(props) {
    return <p>cha t rất là {props.tinh_cach}</p>;
}
// Tạm biệt extends!
// Tạm biệt constructor!
// Tạm biệt this!
// Tạm biệt render!
```
Sẽ thật tuyệt với nếu ta có thể triệu hồi `state` ngay trong `Functional component`. Và hook sinh ra để hoành thành sứ mệnh đó.
```
import React, { useState } from "react"; // import thêm thằng `useState`

function YoungBuff(props) {

    // state là để đọc, setState là để ghi, tên tuổi ko quan trọng
    const [state, setState] = useState(props.tinh_cach);
    
    // foo mặc định là 0, dùng setFoo để đổi giá trị của foo
    const [foo, setFoo] = useState(0);                  
    
    return (
        <div>
            <p>Cha t khá {props.tinh_cach}</p>
            <p>nên t rất {state.tinh_cach}</p>
        </div>
    );
```
Tuyệt với!!! Nhưng thực ra nó chỉ tuyệt với khi bạn sử dụng React phiên bản `16.8` trở lên mà thôi. Các phiên bản cũ vẫn phải sử dụng class nhé!

### Context API, Redux, MobX
Vấn đề: bố sai thằng anh, anh sai thằng em, thằng em sai đệ của nó. Vô hình chung, chỉ cần bố sai thằng đệ của thằng em mà thôi.

Thực tế: truyền state từ component cha xuống component con thì ta gửi qua `props`, nhưng muốn gửi đến thằng con của thằng con thì lại truyền tiếp sức như trên, rất phiền hà.
Context API sinh ra để giải quyết vấn đề đó. Và Redux, MobX cũng vậy, nhưng khác nhau ở cái là theo độ dễ dùng thì ContextAPI > MobX > Redux, nhưng tính theo scale tốt hơn thì là ngược lại Redux > MobX > ContextAPI... (to be continue)