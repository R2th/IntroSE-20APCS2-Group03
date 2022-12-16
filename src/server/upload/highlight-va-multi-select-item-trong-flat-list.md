Trong React Native, khi nói về việc xử lí và hiển một mảng dữ liệu, người ta nghĩ ngay tới sử dụng  [FlatList](https://facebook.github.io/react-native/docs/flatlist).
Về cơ bản, FlatList giúp hiển thị một mảng dữ liệu, danh sách theo chiều dọc hoặc ngang và hiển thị tùy theo dữ liệu thay đổi.

![](https://images.viblo.asia/165dc7b8-69c6-4556-b04f-ffc5e8f3fa0b.png)

Trong bài viết này, mình sẽ giới thiệu về cách sử dụng FlatList và handle việc chọn nhiều item ( áp dụng nhiều trong việc chọn và quản lí giỏ hàng như trong ảnh).

# 1. Giới thiệu về FlatList
FlatList là một component đơn giản, được giới thiệu để loại bỏ các điều limit của ListView.

Các props bắt buộc phải có để handle FlatList đó chính là data và renderItem.
Nói một cách đơn giản, nó cần có data truyền vào và hiển thị item đó như thế nào thông qua renderItem.
```
<FlatList   
  data={this.state.dataSource}
  renderItem={({item}) => <Text>{item.key}</Text>
 />
```

# 2. Cách sử dụng FlatList
Dưới đây, mình sẽ giới thiệu từng bước sử dụng: 
1. import 
```
import { FlatList } from 'react-native'
```

2. Khai báo 
```
<FlatList 
  extraData={this.state}
  data={this.state.dataSource}
  ItemSeparatorComponent={this.FlatListItemSeparator}
  renderItem={item => this.renderItem(item)} 
  keyExtractor={item => item.id.toString()}
  ListEmptyComponent={this.renderEmpty()}
/>
```
Ở đây : 
+ data và renderItem : như đã nói ở trên.
+ ItemSeparatorComponent: giúp phân tách các mục item trong list
+ keyExtractor : nếu bạn không khai báo, bạn sẽ thấy có dòng lỗi màu vàng cảnh báo. Ở đây, keyExtractor cung cấp khóa duy nhất để xử lí list item theo yêu cầu.
+ extraData : một props rất cần thiết trong ví dụ đầu bài. Đến phần xử lí sau, mình sẽ nói chi tiết hơn.
+ ListEmptyComponent : render khi FlatList null.

Full code để hiển thị list như đầu ví dụ: 
```
constructor(props) {
  super(props);
    this.state = {
     loading: false,
     dataSource: [],
    };
   }

componentDidMount() {this.fetchData();}

fetchData = () => {this.setState({loading: true});
                   
fetch("https://jsonplaceholder.typicode.com/photos")
.then(response => response.json())
.then(responseJson => {
 responseJson = responseJson.map(item => {
   item.isSelect = false;
   return item;
 });
 this.setState({
  loading: false,
  dataSource: responseJson
 });
 }).catch(error => {this.setState({loading: false});
 });
};

render(){
    return <FlatList 
      extraData={this.state}
      data={this.state.dataSource}
      ItemSeparatorComponent={this.FlatListItemSeparator}
      renderItem={item => this.renderItem(item)} 
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={this.renderEmpty()}
    />
}

renderItem = ({ item, index }) => { 
    const styleItem = item.isSelect ? styles.itemSelect : styles.itemUnselect

    return (
        <TouchableOpacity 
          style={styleItem}
          onPress={() => this.selectItem(item)}>
          <Image 
            source={{ uri: item.thumbnailUrl }}
            style={{ width: 40, height: 40, margin: 6 }}
          />
          <Text style={styles.lightText}>
          {item.title.charAt(0).toUpperCase() + item.title.slice(1)}   
          </Text>
        </TouchableOpacity>
    )
}
```
![](https://images.viblo.asia/f6441320-7608-4c30-85f3-591fe60f8d64.png)
# 3. Handle action với item
Như ở phần fetchData ở đoạn code trên, đã sử dụng 1 attribute là isSelect để check xem item đó đã được chọn hay chưa. 
Vậy ở action sẽ xử lí: 
```
selectItem = data => {
  item.isSelect = !item.isSelect;
 
const index = this.state.dataSource.findIndex(
   item => item.id === item.id
);
this.state.dataSource[index] = item;
 this.setState({
   dataSource: this.state.dataSource
 });
};
```
Đến lúc này, props `extraData ` mới phát huy tính quan trọng ^^.
Nếu ta không gọi hàm này, thì FlatList sẽ k render lại (không chạy vào hàm renderItem mặc dù có chạy lại hàm render ở trên) khiến item đã được chọn, không change style của selected.

Tương tự, với sự xuất hiện thêm ở giỏ hàn, hiển thị số item đã chọn, ta có thể dùng for để sum những item đã selected hoặc sử dụng hàm reduce ở array hay dùng  hàm filter.
Full code mình sẽ dính kèm trong link bài viết gốc cuối bài.

# 4. Một vài lưu ý với FlatList
Khi làm việc với FlatList, mình gặp một vài vấn đề với những list có data lớn cỡ vài trăm item.
Sau đó, mình rút ra được kinh nghiệm.

Hãy viết item ở một component con, và component cha sẽ gọi tới nó và check props và state khi nó change. Vì nếu k check, một lần vuốt list, là các item sẽ change => lượng item render trong list rất nhiều => dễ dẫn tới crash app.

# 5. Kết luận
Trên đây là những chia sẻ nhỏ về FlatList của mình.
Cảm ơn các bạn đã đọc và rất mong có nhiều ý kiến góp ý. ^^

Dưới đây là link bài viết tham khảo : 
https://medium.com/better-programming/how-to-highlight-and-multi-select-items-in-a-flatlist-component-react-native-1ca416dec4bc