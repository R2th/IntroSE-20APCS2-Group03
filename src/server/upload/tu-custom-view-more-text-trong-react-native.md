# 1. View more text 
Thông thường, khi mọi người xem một bài post dài trên facebook, zalo, ... hay có một cụm text 'See More' như này.
![](https://images.viblo.asia/8fa11f9c-e8c5-4493-83a7-0ac894bc813c.png)

Mình thấy view này cũng được sử dụng khác nhiều với các app có timeline hay chat, ở github mình cũng tìm thấy có lib support giải quyết view như vậy như [react-native-view-more-text](https://github.com/nlt2390/react-native-view-more-text). 

Tuy nhiên, chúng ta có thể dễ dàng viết được một component nhỏ giúp cho việc hiển thị view này chỉ với vài thuộc tính đơn giản. Hãy cùng xem nhé!.

# 2. Cách giải quyết
Đầu tiên, chúng ta chỉ cần xác định được các vấn đề: 
- Text cần hiển thị max là bao nhiêu dòng : maxLine 
- Dựa vào maxLine, chúng ta sẽ xác định được minHeight mà text đó được phép hiển thị là bao nhiêu? 

Từ đó, là chúng ta có thể giải quyết bài toán đơn giản rồi. 

Ở thẻ Text, có một thuộc tính là `lineHeight` có thể cho phép height của 1 line hiển thị là bao nhiêu, từ đó ta có thể dễ dàng tính ra được minHeight dựa vào: 
```
minHeight = maxLine * lineHeight
```
Còn việc tính được height thực tế của Text có thể tính dựa vào thuộc tính `onLayout` như sau:


```
onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height > MAX_HEIGHT) {
      this.setState({ showMore: true })
    }
  }
```

```
       <Text
          style={[styles.text, this.props.style]}
          numberOfLines={showMore ? maxLine : 0}
          ellipsizeMode="tail"
          onLayout={(event) => this.onLayout(event)}
        >
          {content}
        </Text>
```

Và thế là từ biến `showMore` sẽ biết được có cần hiển thị text 'See More' nữa hay không? 

Thật dễ phải không nào? 

# 3. Tổng kết
Theo mình nghĩ, đôi khi việc tự custom một view có thể khiến app của bạn sẽ bớt nặng vì tiết kiệm việc add các lib vào, mà việc tự custom, refactor sau có thể dễ dàng hơn nữa.
Vậy tại sao, với những yêu cầu nhỏ này, mình không tự thử :D, sẽ rất hay đó. 
Cơ mà lib cũng là lựa chọn hay khi bạn không kịp chạy deadline (lol).

Và đây là code full của mình, mời mọi người cho xem và cho xin ý kiến ạ.

```
import React from 'react'
import {
  StyleSheet,
  Text,
  View, TouchableOpacity,
} from 'react-native'

export default class ShowMoreText extends React.PureComponent {

  static defaultProps = {
    maxLine: 4,
    lineHeight: 14,
    style: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      showMore: false,
      maxLine: props.maxLine,
    }
  }

  onPressShowMore = () => {
    const { showMore } = this.state
    this.setState({
      showMore: !showMore,
      maxLine: !showMore ? this.props.maxLine : 0
    })
  }

  onLayout = (event) => {
    const { height } = event.nativeEvent.layout
    const { lineHeight } = this.props
    const { maxLine } = this.state
    const maxHeight = maxLine * lineHeight

    if (maxLine > 0 && height > maxHeight) {
      this.setState({ showMore: true })
    }
  }

  render() {
    const { content, maxLine } = this.props
    const { showMore, } = this.state

    return (
      <View style={this.props.style}>
        <Text
          style={[styles.text, this.props.styleText]}
          numberOfLines={showMore ? maxLine : 0}
          ellipsizeMode="tail"
          onLayout={(event) => this.onLayout(event)}
        >
          {content}
        </Text>
        {
          <TouchableOpacity
            onPress={this.onPressShowMore}>
            <Text
              style={styles.textShowMore}
              onPress={this.onPressShowMore}>
              {showMore ? 'Show More' : 'Show Less'}
            </Text>
          </TouchableOpacity>
        }
      </View >
    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
  textShowMore: {
    color: 'blue',
    marginTop: 4,
    fontSize: 12,
  },
});
```