React native là 1 framework mạnh mẽ trong việc thiết kế cross-platform mobile app. Tuy nhiên dù nói thế nào đi chăng nữa thì nó sẽ không thể so sánh được với native app nên việc những thư viện, components của react native cung cấp gặp những vấn đề khi implement là điều không thể tránh khỏi.
Khi gặp những vấn đề nên trên công việc của chúng ta là tìm những tip trick để fix làm sao để cho nó hoạt động hoàn hảo nhất có thể, chứ không thể ngồi và đợ Facebook fix được
### Vấn đề


-----
Khi chúng ta sử dụng secureTextEntry trên android nó sẽ phát sinh vấn đề  là khi thay đổi secure mode cursor sẽ bị move về vị trí đầu tiên của TextInput. bạn có thể xem ở hình dưới đây:
![](https://images.viblo.asia/c4efb14d-88f2-4ae7-88e8-f961ad613655.gif)

Mình đã tìm kiếm cách giải quyết và được info rằng bug này đã được fix ở PR:

https://github.com/facebook/react-native/commit/09b43e479e97dfe31910503190b5d081c78e4ea2

tuy nhiên bug vẫn còn tồn tại và cũng rất nhiều dev khác gặp vấn đề tương tự. vì thế mình phải tự mày mò để fix bug này.
### Tip trick


-----

Đầu tiên bạn cần khai báo state để lưu trữ giá trị như sau
```
        this.state = {
            isSecureTextEntry: true,
            selection: {
                start: 0, end: 0
            },
            preSelection: null,
            value: ''
        };
```
tiếp theo là các biến static làm trạng thái đánh dấu
```
    changed = false;
    isLock = -1;
    isUpdated = false;
```
phương thức để lấy trạng thái selection hiện tại
```
    getSelection = (pre, selection) => {
        if (this.isUpdated) {
            this.isUpdated = false;
            return pre;
        } else {
            return selection;
        }
    }
```
TIếp theo lại 1 chút logic trong trạng thái componentDidUpdate
```
    componentDidUpdate() {
        if (this.isLock == 0) {
            setTimeout(() => {
                this.isLock = -1;
                this.isUpdated = true;
                this.changed = false;
                let {start, end} = this.state.selection;
                if (start > 0 && end > 0 && start < this.state.value.length && end < this.state.value.length) {
                    start++;
                    end++;
                }
                const selection = {start, end};
                this.setState({
                    value: this.state.value.toString().trim(),
                    preSelection: selection,
                    selection
                });
            }, 0)
        }
    }
```
**Cuối cùng là full code bạn có thể chạy thử**
```
import React, {Component} from 'react';

import {
    View,
    TextInput,
    Switch
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSecureTextEntry: true,
            selection: {
                start: 0, end: 0
            },
            preSelection: null,
            value: ''
        };
    }

    getSelection = (pre, selection) => {
        if (this.isUpdated) {
            this.isUpdated = false;
            return pre;
        } else {
            return selection;
        }
    }

    changed = false;
    isLock = -1;
    isUpdated = false;

    render() {
        let {value, selection, preSelection} = this.state;
        if (this.isLock !== -1 || value === '') {
            selection = {
                start: 0,
                end: 0
            };
            if (value === '') {
                this.isUpdated = false;
            }
        }
        return (
            <View>
                <Switch
                    onValueChange={(value) => {
                        this.changed = true;
                        this.setState({isSecureTextEntry: value});
                    }}
                    style={{marginLeft: 20, marginTop: 50}}
                    value={this.state.isSecureTextEntry}
                />
                <TextInput
                    style={{marginLeft: 20, marginTop: 50, backgroundColor: '#ccc'}}
                    secureTextEntry={this.state.isSecureTextEntry}
                    onChangeText={(text) => {
                        this.setState({
                            value: text
                        });
                    }}
                    onTouchStart={() => this.changed = false}
                    value={value}
                    selection={this.getSelection(preSelection, selection)}
                    onSelectionChange={({nativeEvent: {selection}}) => {
                        if (selection.start === 0 && this.changed) {
                            this.isLock = 0;
                            this.setState({
                                value: value + ' '
                            });
                            return;
                        }
                        this.setState({selection})
                    }}
                />
            </View>
        );
    }

    componentDidUpdate() {
        if (this.isLock == 0) {
            setTimeout(() => {
                this.isLock = -1;
                this.isUpdated = true;
                this.changed = false;
                let {start, end} = this.state.selection;
                if (start > 0 && end > 0 && start < this.state.value.length && end < this.state.value.length) {
                    start++;
                    end++;
                }
                const selection = {start, end};
                this.setState({
                    value: this.state.value.toString().trim(),
                    preSelection: selection,
                    selection
                });
            }, 0)
        }
    }
}
```
### Kết luận


-----
Trên đây là toàn bộ tip trick của mình để xử lý cho việc cursor hiển thị không đúng vị trí khi chuyển đổi trạng thái secureTextEntry hi vọng có thể giúp ích được trong project của các bạn