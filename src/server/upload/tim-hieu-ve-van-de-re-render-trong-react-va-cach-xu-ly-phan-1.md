React là thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng .Và 2 framework sử dụng React đang được ưa chuộng chất đó là ReactJs và React Native . 
Đối với các lập trình viên React , đặc biệt là với những người mới sẽ gặp phải một vấn đề đó là việc các component được re-render quá nhiều lần dẫn đến việc gây hao tốn performance cho ứng dụng .
# 1 . Re-render trong React là gì ?
Chắc hẳn đối với những bạn đã làm việc với React đều biết là chúng ta đang làm việc với Virtual DOM (hay còn gọi là DOM ảo) còn React sẽ làm việc với DOM thật .

Nói qua một chút về  Virtual DOM , nó tạo ra 1 bộ nhớ đệm (cache) dữ liệu trong bộ nhớ (memory), tính toán các thay đổi sau đó cập nhật lên DOM thật một cách hiệu quả . Điều này giúp các developer có cảm giác code họ đang viết sẽ được Render liên tục sau mỗi lần thay đổi nhưng thực tế là nó chỉ render các components bị thay đổi chứ không phải toàn bộ màn hình .

Quay lại với vấn đề chính Re-render là gì ? .Khi một component được khởi tạo, mount vào DOM và trong quá trình nó được update các state hay props ,từ lần render đầu tiên component sẽ được re-render liên tục cho tới khi nó được unmount khỏi DOM .

Giữa những lần re-render (update) như vậy , React sẽ lấy những thứ bên trong hàm render (đối với class component ) hoặc bên trong lệnh Return (đối với function component) để so sánh với chính nó trước thời điểm update .Nếu có sự khác biệt , React sẽ cập nhật lại trên DOM thật và quá trình này được gọi là re-painting . Tuy nhiên,đây cũng chính là thứ ảnh hưởng rất lớn đến performance của ứng dụng nếu chúng bị lạm dụng quá mức 

Mình xin phép sử dụng React Native để giải thích vấn đề này 

<h4>Bài toán</h4>
 Implement một component Cha có state là number , trong component Cha sẽ chứa 2 components là Con và Cháu . Component Cháu sẽ nhận prop chính là state number từ component Cha . Component con sẽ nhận prop content là 1 đoạn raw text từ component Cha . Khi state number của component Cha thay đổi , prop của component Con không thay đổi sẽ không bị re-render và component Cháu sẽ được re-render để cập nhật lại prop number từ component Cha 
 
```
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default class Cha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
  }
  render() {
    console.log('Re - render Cha ne');
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
            onPress={() => this.setState({number: this.state.number + 1})}>
                <Text style={styles.text}> Increase Number </Text>
            </TouchableOpacity>
            <Con  content = {"hello lô con c** ! "} />
            <Chau number={this.state.number} />
        </View>
    );
  }
}

class Con extends Component {

    render() {
        console.log('Re - render Con ne');
        return (
        <View style={{backgroundColor:'gray'}} >
            <Text style={styles.text}> Tui là Con nè </Text>
            <Text style={styles.text}>{this.props.content}</Text>

        </View>
        );
    }
}

class Chau extends Component {
  render() {
    console.log('Re - render Chau ne');
    console.log('--------------------');

    return (
      <View style={{marginTop: 20 ,backgroundColor:'pink' }}>
        <Text style={styles.text}> Tui là Chau nè   </Text>
        <Text style={styles.text}>Number : {this.props.number} </Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
    text:{
        fontSize:20 ,
        padding:10
    }
})
```

Và kết quả là :
![](https://images.viblo.asia/35d9d6b9-678d-47db-9322-5a4e8b1b09ad.gif)

Mỗi khi chúng ta click “Increase Number” , state number của component Cha sẽ được tăng lên , biến này đồng thời được truyền và được truyền vào trong component Cháu giúp component này hiển thị số number . Tuy nhiên khi nhìn vào console log , chúng ta có thể thấy component Con cũng bị Re-render lại mỗi khi click “Increase Number”, đó là thứ chúng ta không hề muốn vì việc Re-render component Con là không cần thiết .

Đây cũng chính là đặc điểm của React vì khi component Cha bị re-render , các component nằm bên trong nó ( cháu , chắt ,chút ,chít )  cũng sẽ bị re-render theo và ở đây là 2 component Con và Cháu . Trong thực tế trong Component Cha sẽ có rất nhiều component khác nữa . Việc re-render component không cần thiết sẽ ảnh hưởng rất nhiều tới performance ,đặc biệt là các components “ nặng” như chứa Chart , Webview ,Animation …

# 2 . Vậy có giải pháp nào để ngăn chặn việc re-render các components không cần thiết ?
## shouldComponentUpdate
Trong các life cycle method của React có hỗ trợ một method : shouldComponentUpdate  để cho phép component re-render hay là không . Method này trả về giá trị là true ( giá trị default) thì component sẽ được re-render và nếu là false thì sẽ dừng việc re-render lại . Vì thế đó cũng là nguyên nhân mà trong ví dụ trên component Con bị re-render lại .

```
    
class Con extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.content !== nextProps.content) {
        return true;
        }
        return false;
    }
    render() {
        console.log('Re - render Con ne');
        return (
        <View style={{backgroundColor:'gray'}} >
            <Text style={styles.text}> Tui là Con nè </Text>
            <Text style={styles.text}>{this.props.content}</Text>

        </View>
        );
    }
}
```

Kết quả: là khi state component cha thay đổi , chỉ có component Cha và component Cháu bị re-render 

 ![](https://images.viblo.asia/8a0243c9-2e1b-4174-9415-8a2c669558dc.gif)

## PureComponent
Từ phiên bản React 15.6 , React đã cho ra đời  PureComponent tích hợp sẵn việc so sánh nông (shallow comparison) trong method shouldComponentUpdate để chắc chắn là khi props hoặc state có sự thay đổi , component mới được phép re-render .

```
class Con extends PureComponent {
  
    render() {
        console.log('Re - render Con ne');
        return (
        <View style={{backgroundColor:'gray'}} >
            <Text style={styles.text}> Tui là Con nè </Text>
            <Text style={styles.text}>{this.props.content}</Text>

        </View>
        );
    }
}
```

## React.Memo 
Function component không sử dụng được các life cycle method hay extends từ PureComponent vậy nó dùng gì để ngăn chặn việc re-render thừa thãi . Câu trả lời chính là React.memo 

Chúng ta sẽ sử dụng React.memo như một Higher-order-component sau:

```
const Con = React.memo((props) => {
  console.log('Re - render Con ne');
  return (
    <View style={{backgroundColor: 'gray'}}>
      <Text style={styles.text}> Tui là Con nè </Text>
      <Text style={styles.text}>{props.content}</Text>
    </View>
  );
});
```


<h4>Lưu ý :</h4>
PureComponent và React.memo chỉ thực hiện shallow comparison , do đó chúng không hoàn toàn giúp ngặn chặn việc re-render khi các giá trị thay đổi là reference typed varibales . Điều này mình sẽ giải thích trong bài viết tiếp theo .

# 3.Tổng kết 
Qua bài viết trên , mình hi vọng sẽ giúp các bạn tối ưu được performance khi làm việc với React thông qua việc tránh re-render các component không cần thiết và các công cụ sử dụng cho việc này