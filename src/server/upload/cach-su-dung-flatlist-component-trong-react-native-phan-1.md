Đã có khá nhiều cách để tạo danh sách cuộn trong React Native, đáng chú ý nhất là chúng ScrollView và ListView. Mỗi cái đều có điểm mạnh và yếu. Từ v0.43 của React Native, chúng ta đã có quyền truy cập vào hai list mới: FlatList và SectionList. Hôm nay tôi sẽ xem cách dùng của FlatList component.

## FlatList là gì?

Nó là một cách dễ dàng để tạo một list data. Không chỉ hiệu quả mà còn có một API cực kỳ đơn giản để làm việc. Nếu bạn đã sử dụng hoặc quen thuộc với ListView component thì nó rất giống nhau, gần như tốt hơn về mọi mặt. Bạn không còn phải định dạng dữ liệu - bạn chỉ cần truyền cho nó một array data và hiển thị lên ngay lập tức.

## Cách sử dụng đơn giản

Có 2 thành phần chính bạn cần biết trong FlatList là *data* và *renderItem*. Đầu tiên là một mảng dữ liệu được sử dụng để tạo danh sách, điển hình là một mảng các object và thứ hai là function sẽ lấy một phần tử riêng lẻ của mảng dữ liệu và hiển thị thành phần đó.

Data sẽ  từ [Random User Genetor API](https://randomuser.me/) và[ React Native Elements](https://github.com/react-native-training/react-native-elements) sẽ dùng cho giao diện.

Trong phần tóm tắt của hướng dẫn này, ứng dụng sẽ đưa ra yêu cầu đối với Random User Generator API và lưu trữ response từ component state đó. Xem đoạn code dưới đây để hiểu rõ.

```js
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Coming soon...</Text>
      </View>
    );
  }
}

export default FlatListDemo;
```

Khi đã hoàn thành, bạn có thể tiếp tục và thực sẽ bắt đầu render data. Để làm như vậy, điều đầu tiên bạn muốn làm là *import { List, ListItem } from "react-native-elements";* Vì vậy, bạn có các component cần thiết để render data. Phần còn lại của công việc sẽ diễn ra trong phương thức render.
```js
render() {
  return (
    <List>
      <FlatList
        ...
      />
    </List>
  );
}
```
Bây giờ bạn cần truyền một mảng dữ liệu cho FlatList thông qua data prop. Điều đó có sẵn trên this.state.data.
```js
render() {
  return (
    <List>
      <FlatList
        data={this.state.data}
      />
    </List>
  );
}
```

Sau đó bạn muốn render nội dung với renderItem prop. Function được truyền vào một đối số duy nhất, là một đối tượng. Dữ liệu mà bạn cần quan tâm là item key để bạn có thể sử dụng truy cập dữ liệu đó từ bên trong function. Sau đó trả về một component dùng data đó.
```js
render() {
  return (
    <List>
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
          />
        )}
      />
    </List>
  );
}
```

Bây giờ chạy ứng dụng và sau khi chờ khoảng một khoảng thời gian để nhận response từ server, bạn sẽ thấy một cái gì đó như này.
![](https://images.viblo.asia/a5799035-4731-4d4e-a057-14e4efddfdc6.png)

Bạn có thấy lỗi ở bên dưới? Điều đó cảnh báo rằng các thành phần của list bị thiếu key. Các key duy nhất này là những gì cho phép VirtualizedList (những gì FlatList được xây dựng) để theo dõi các items và hỗ trợ hiệu quả của danh sách.

Để giảm bớt vấn đề này, bạn muốn chọn một field duy nhất nhất cho mỗi item. Trong trường hợp này, bạn có thể sử dụng địa chỉ email bởi vì nó sẽ là duy nhất cho mỗi item. Sau đó, bạn có thể sử dụng *keyExtractor* để chỉ định phần dữ liệu nào sẽ được sử dụng làm khóa
```js
render() {
  return (
    <List>
      <FlatList
        ...
        keyExtractor={item => item.email}
      />
    </List>
  );
}
```
Bây giờ cảnh báo không hiển thị ra nữa.
![](https://images.viblo.asia/94527e63-2e2b-42c9-aeb0-242812d098fa.png)

## Kết

Vậy là chúng ta đã tìm hiểu được những khái niệm cơ bản đầu tiên của FlatList.

Thông qua phần 1 này hi vọng mọi người hình dung được các thành phần trong 1 app sử dụng FlatList. Để hiểu kĩ hơn về cách sử dụng FlatList, xin mọi người ủng hộ mình ở phần sau. (yaoming)

[Cách sử dụng FlatList Component trong React Native (Phần 2)](https://viblo.asia/p/cach-su-dung-flatlist-component-trong-react-native-phan-2-OeVKB3NYZkW)

[Source code trên GitHub.](https://github.com/ReactNativeSchool/react-native-flatlist-demo)

## Tài liệu tham khảo

https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6