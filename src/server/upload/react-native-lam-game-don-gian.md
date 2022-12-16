Trước đây mình thích làm game, từ nghiên cứu làm game trên unity, cũng một phần là do mình lười làm UI nên chọn unity làm ui nó đơn giản hơn.
Sau đó không biết đường đời đưa đẩy như nào mà lại thành web develop, nhưng mà vẫn thi thoảng theo dõi mấy group làm game như một sở thích cá nhân.
Mấy hôm trước nghe mấy ông đồn xài react-native code app mobile được, mà code lại bằng javascript nên nghĩ chắc dùng nó làm game được nên lại quay ra lọ mọ mày mò.
Đúng là viết được thật, mà khoai chả kém học mới, đủ thứ lỗi linh tinh.

## Cài đặt một số thứ cần thiết để bắt đầu với react-native
mình cài theo link này https://facebook.github.io/react-native/docs/getting-started.html
đến tên project mình cũng đặt theo luôn =))

## Ý tưởng về game
thì cứ đơn giản nhất mà làm thôi, và với mình thì cái game [freaking math](https://play.google.com/store/apps/details?id=com.bangdev.freakingmath&hl=vi) gì gì đó vẫn là cái game đơn giản nhất về logic đối với mình.

## Bắt đầu bắt tay vào làm các màn hình

### Flash screen
mà hình trước khi bắt đầu chơi game. mình làm đơn giản thôi, chỉ là một cát nút `Play` to đùng, tại cũng không có năng khiếu vẽ vời để làm cái logo app :D 

![](https://images.viblo.asia/264cb5af-d07b-4d86-99de-c878da1b25e0.png)

Phần này mình viết riêng 1 component cho nó:

```
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert, Dimensions, Modal, BackHandler } from 'react-native';

export default class FlashScreen extends Component {
  state = {
    modalVisible: true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      !this.state.modalVisible ? this.setModalVisible(true) : '';
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    !visible ? this.props.initMath() : '';
  }
  
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        style={{flex: 1}}
        onRequestClose={() => {
          ''
        }}>
        <View style={{flex: 1, marginTop: 200, marginLeft: 50, marginRight: 50, marginBottom: 200}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={{flexGrow: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
              <Text style={{fontSize: 50}}>Play</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

```

Các thành phần import vào gồm `View` và `Text` để tạo cái nút Play kia =))

Cả màn hình này mình thiết kế nó là một cái `Modal`

```
return (
  <Modal
    animationType="slide"
    transparent={false}
    visible={this.state.modalVisible}
    style={{flex: 1}}
    onRequestClose={() => {
      ''
    }}>
  </Modal>
)
```

Bên cạnh đó sử dụng `TouchableHighlight` để thay đổi màu của Button Play khi người dùng chạm vào nút đó.

```
<TouchableHighlight
  onPress={() => {
    this.setModalVisible(!this.state.modalVisible);
  }}
  style={{flexGrow: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
</TouchableHighlight>
```


`BackHandler` để sử lý event người dùng click vào nút `Back` trên điện thoại.

```
BackHandler.addEventListener('hardwareBackPress', () => {
  !this.state.modalVisible ? this.setModalVisible(true) : '';
});
``` 

Sẽ hiển thị lại Flash Screen nếu người dùng bấm Back từ trong giao diện chơi.


### Màn hình chính
![](https://images.viblo.asia/d3a3a327-6835-4b0e-acd6-ba68dfd0fc47.png)

Mình cũng chỉ là 1 beginner nên mình khá lười trong việc tách các nội dung bên trong file app.js, toàn bộ code còn lại mình nhét hết vào file app.js =))

Cái chính của app là phải tạo ra phép tính và tính toán đúng sai.

Để tạo, lưu, kiểm tra kết sự lựa chọn của người dùng mình gói gọn trong các biến state

```
this.state = {
  score: -1, # lưu điểm
  math: '', #phép toán sẽ hiển thị lên màn hình
  result: '', #kết quả chính xác của phép toán
  result_show: '', # kết quả mà show ra màn hình
  loop: [], # các vòng lặp để cho chạy đếm thời gian trên thanh ngang, cái này các bạn có thể dùng time counter pack để thay thế.
  timeCounter: Dimensions.get('window').width, # đếm thời gian còn lại để trả lời
  width_screen: Dimensions.get('window').width, # độ rộng của màn hình điện thoại
  modalVisible: true # chỉ là biến để ẩn hiện flash screen
}
```


function init phép toán. Ở đây mình làm mức đơn giản là nó chỉ là ran dom phép toán cộng trừ trong 2 1 chữ số thôi. Nếu chỉ tiết hơn có thể để tăng độ khó khi người chơi đạt mức điểm bảng cách check state score và thay đổi cách init match tại mốc nào đó.

```
initMath() {
    this.stopLoop();
    const list_oparetors_easy = ['+', '-'];
    const one = Math.floor(Math.random() * 10);
    const two = Math.floor(Math.random() * 10);
    const operator = list_oparetors_easy[Math.floor(Math.random() * list_oparetors_easy.length)];
    const result = eval('one ' + operator + ' two');
    const result_show = eval('result '+ list_oparetors_easy[Math.floor(Math.random() * list_oparetors_easy.length)] + ' Math.floor(Math.random() * 2)');
    this.setState({
      math: '' + one + operator + two + '=' + result_show,
      result: result,
      result_show: result_show,
      score: this.state.score += 1
    });
    this.countDown();
}
```


Phương thức để đếm ngược thời gian còn lại


```
  countDown() {
    const loop = setInterval(() => {
      if(this.refs.timeCounter){
        this.refs.timeCounter.measure((ox, oy, width, height) => {
          this.setState({timeCounter: width - this.state.width_screen/10});
        });
        if(this.state.timeCounter <= 0){
          this.setState({timeCounter: Dimensions.get('window').width});
          this.onTimeover();
          this.stopLoop();
          this.setState({score: -1});
        };
      }
    }, 100);
    this.setState({loop: [...this.state.loop, loop]});
  }
```

Thanh đếm ngược trên UI, chứa cả score:

```
<View ref="timeCounter" style={{width: this.state.timeCounter,height: 35, marginTop: 50, backgroundColor: 'green'}}>
    <Text style={{fontSize:30, color: 'white'}}>{this.state.score}</Text>
</View>
```

View để show math, phép toán mà chúng ta tạo ra cùng với kết quả có thể đúng hoặc sai:

```
 <View style={{height: 100, marginVertical: 180, marginHorizontal: 10}}>
      <Text style={{fontSize:50, color: 'white', textAlign: 'center'}} ref="math">{this.state.math}</Text>
 </View>
```


2 nút bấm để chọn `true` hoặc `false` cho phép toán

```
<View style={{flex: 1, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
  <TouchableHighlight
    style={{flexGrow: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
    onPress={() => this.onPressTouchableHighlight(true)}>
    <Text style={{fontSize:24, color: 'white'}}>True</Text>
  </TouchableHighlight>
  <TouchableHighlight
    style={{flexGrow: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
    onPress={() => this.onPressTouchableHighlight(false)}>
    <Text style={{fontSize:24, color: 'white'}}>False</Text>
  </TouchableHighlight>
</View>
```

Xử lý logic khi người dùng chọn đáp án true false

```
  onPressTouchableHighlight(boolean) {
    this.setState({timeCounter: Dimensions.get('window').width});
    this.stopLoop();
    if((this.state.result == this.state.result_show) == boolean){
      this.initMath();
    } else {
      this.onTimeover();
      this.setState({score: 0});
    } 
  }
```

Và không thể quên việc alert ra cho người dùng biết khi họ đã chọn sai hoặc hết giờ :-?

```
  onTimeover() {
    this.state.loop.forEach(function(loop){
      clearInterval(loop);
    });
    Alert.alert('Opps',
      'Gem over, score: ' + this.state.score,
      [{text: 'Again'}]
    );
    this.initMath();
  }
```

![](https://images.viblo.asia/84bf4584-0942-4d3d-b510-1ff4b41f037c.png)

nguồn: https://github.com/memsenpai/react-native-freaking-match
Cảm ơn các bạn đã theo dõi bài viết, mình biết app còn nhiều thiếu sót và bug và còn cùi bắp nên nếu có góp ý xin mọi người hãy để lại comment phía dưới, đừng quên bấm upvote nếu nó làm bạn và mình đều cảm thấy vui và follow mình nếu bạn quan tâm đến mình =))