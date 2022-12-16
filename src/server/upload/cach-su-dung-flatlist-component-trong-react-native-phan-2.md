Rất cảm ơn tất cả các bạn đã đọc và ủng hộ cho bài viết trước về FlatList Component trong React Native

[Cách sử dụng FlatList Component trong React Native (Phần 1)](https://viblo.asia/p/cach-su-dung-flatlist-component-trong-react-native-phan-1-yMnKMNLmZ7P)

Tiếp tục seri về FlatList Components, lần này mình xin tiếp tục giới thiệu chi tiết về các method được support trong nó.

## Separator
Ví dụ bạn không sử dụng separator trong ứng dụng của bạn, và giờ bạn muốn sử dụng nó nhưng bạn không biết làm sao để thêm vào top hoặc bottom của list. Bạn có thể thêm borderBottom trên mọi element ngoài trừ phần tử đầu tiền hoặc bạn có thể dùng thuộc tính *ItemSeparatorComponent* giúp xử lý tất cả các logic cho bạn.

Trong ví dụ này, điều đầu tiên bạn cần là remove tất cả các border trong app.
``` js
render() {
  return (
    <List 
+      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
    >
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
+            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item.email}
      />
    </List>
  );
}
```

Bạn muốn tạo separator component. Nó rất đơn giản nhưng thay vì toàn bộ chiều rộng của màn hình, nó sẽ bắt đầu (khoảng) nơi đoạn text được xuất hiện.

```js
class FlatListDemo extends Component {
  // ...

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  // ...
}
```

và sau đó bạn có thể tiếp tục và sử dụng nó bằng cách thêm *ItemSeparatorComponent={this.renderSeparator}* từ FlatList component.

```js
render() {
  return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        ...
        ItemSeparatorComponent={this.renderSeparator}
      />
    </List>
  );
}
```

Danh sách hiển thị sẽ hiển thị như bên dưới. Lưu ý rằng ở đầu và cuối list, separator không được hiển thị.

![](https://images.viblo.asia/798d2f35-8ade-4b0e-8108-d1a69460f213.gif)

## Header

Render một component ở đầu danh sách sẽ scroll với nội dung khi bạn scroll xuống danh sách dễ như thêm separator. Để thực hiện điều này, bạn sẽ sử dụng SearchBar component từ React Native.

Đầu tiên tạo một function mới render từ component của bạn muốn trong header.

```js
class FlatListDemo extends Component {
  ...

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  ...
}

```

Sau đó bạn muốn thực sự render header đó bằng cách sử dụng thuộc tính *ListHeaderComponent* trong FlatList.

```js
render() {
  return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        ...
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
      />
    </List>
  );
}
```

![](https://images.viblo.asia/f2988bc3-03e6-4c32-82cb-622916384b55.gif)

## Footer

Footer rất giống với Header, chỉ là nó ở cuối danh sách chứ không phải là đầu. Footer này sẽ phức tạp hơn một chút so với ví dụ trước  nhưng áp dụng các nguyên tắc tương tự. Đầu tiên tạo method gọi footer và trả về component.

```js
class FlatListDemo extends Component {
  ...

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  ...
}
```

Sau đó gọi funtion từ `ListFooterComponent`

```js
render() {
  return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        ...
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
      />
    </List>
  );
}
```

Danh sách hiển thị sẽ hiển thị như sau (Bạn có thể thấy *ActivityIndicator*).

![](https://images.viblo.asia/75ec32ec-b1cf-4c3c-bcb0-f30227487df3.gif)

## Kết
Vậy là chúng ta đã tìm hiểu được những khái niệm cơ bản của FlatList.

Thông qua bài này hi vọng mọi người hình dung được các thành phần trong 1 app sử dụng FlatList.

## Tài liệu tham khảo
https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6