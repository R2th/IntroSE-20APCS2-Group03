> Sau đây là một số câu hỏi thường gặp khi đi phỏng vấn vị trí lập trình viên React Native mà mình tổng hợp lại được. Đây là các câu hỏi mình thấy hay được các bạn quan tâm. Ngoài ra trong bài viết này, mình cũng nêu một số kiến thức cần “học tủ” khi đi phỏng vấn (theo quan điểm của mình :D), nhưng cũng không tốt lắm nếu chỉ đọc và học vẹt :v 

# I. Kiến thức cơ bản cần nắm được:
### 1. Javascript:
- Các syntax của Javascript
- Thao tác với các array và object (map, filter, reduce)
- Async / Await

### 2. Props và State:
- Nắm vững và hiểu bán chất của props và state trong React
- Component lifecycle

### 3. Component:
- Bố cục component rõ ràng (styles, các phương thức,...)
- Phân biệt được stateless component và stateful component
- Cho một hình ảnh ví dụ phải nói được bố cục và cách tạo ra chúng

### 4. RESTful API:
- Hiểu được các method cơ bản như GET, POST
- Header, body data, token

### 5. Bonus (recommend):
- Hiểu và nắm được mô hình redux là một lợi thế
- Biết dùng các thư viện như React Navigation, location, image pick, maps,...
- Biết sử dụng animation
- Biết Android hoặc iOS

# II. Các câu hỏi phỏng vấn:
*Sau đây là một số câu hỏi phỏng vấn lập trình viên React Native mình biết, tự tổng hợp và dịch từ các nguồn trên mạng*

### 1. Nêu thread chạy trong React Native?
- Main thread và JS thread
### 2. Thực hiện các request AJAX trong Lifecycle event nào và tại sao?
- Nên đặt trong componentDidMount() vì đây là thời điểm component được mount vào DOM -> nó tránh việc request khi component không được gắn kết vào DOM mà sau đó setState lại cho component đó
```javascript
import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

```
### 3. Refs là gì?
- Refs được dùng để lầy tham chiếu trực tiếp đến một component 
### 4. Khi nào componentWillRecieveProps được gọi?
- Khi component nhận được được props mới.
### 5. keyExtractor là gì và tại sao chúng quan trọng?
- Nó giúp React quan sát được sự thay đổi của các item trong một list, rất quan trọng vì nó dùng để phân biệt các item khác nhau
### 6. State là gi?
- State dùng để quản lý trạng thái ở mức độ component và state thì có thể thay đổi
### 7. Props là gì?
- Props dùng để truyền dữ liệu xuống các component con và props thì không thể thay đổi
### 8. Khi nào bạn sử dụng 1 class component thay vì 1 functional component?
- Nếu component của bạn có state hoặc các lifecycle method, sử dụng 1 class component, ngược lại, dùng 1 functional component
### 9. Sự khác nhau giữa việc sử dụng Constructor và getInitialState trong React Native?
- 2 phương pháp này không thể dùng thay cho nhau, nghĩa là không thể dùng phương pháp này thay cho phương pháp kia. Bạn nên khởi tạo state trong Constructor khi sử dụng các class ES6, bằng phương thức getInitialState khi dùng React.createClass
```javascript
class MyComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = { /* initial state */ };
   }
}

//tương tự với

var MyComponent = React.createClass({
   getInitialState() {
      return { /* initial state */ };
   },
});
```
### 10. Virtual DOM hoạt động như thế nào trong React Native?
- ReactNative tạo ra 1 bộ nhớ đệm (cache) dữ liệu trong bộ nhớ (memory), tính toán ra các kết quả khác nhau, sau đó cập nhật hiển thị DOM 1 cách hiệu quả. Điều này cho phép các developers viết code như thể toàn bộ trang được render trong mỗi lần thay đổi nhưng thực tế chỉ render các components bị thay đổi.
### 11. Liệt kê một số core components của React Native?
- Text
- Image
- View
- TextInput
- FlatList
- SectionList
- ...
### 12. XHR Module dùng để làm gì trong React Native?
- **XHR Module** thường được dùng để thực hiện các **XMLHttpRequest** để gửi dữ liệu về server.
### 13. StyleSheet.create dùng để làm gì?
- Phương thức StyleSheet.create đảm bảo rằng các giá trị không thể nhìn thấy và không thay đổi được. Chúng cũng chỉ được tạo 1 lần.
### 14. Liệt kê các bước tạo và chạy 1 ứng dụng React Native?
- npm install -g create-react-native-app // Installs create native app
- create-react-native-app AwesomeProject // Create a project named AwesomeProject
- cd AwesomeProject
- npm start
### 15. Bạn có biết những ứng dụng mobile nào đang sử dụng React Native không?
- AirBnb
- Facebook
- Instagram
- Tesla
- Skype
- ...
### 16. Các ứng dụng Hybrid là những ứng dụng mà thực tế chúng chạy chậm hơn so với ứng dụng Native, vậy React Native có giống như các ứng dụng Hybrid không?
- React native biên dịch ra 1 ứng dụng mobile thật sự và chúng được thiết kế cho hiệu suất cao, 1 ví dụ tốt về hiệu suất cao là ứng dụng Facebook trên iOS, nó sử dụng RN và iOS làm cho người dùng thấy được rằng ứng dụng Facebook hoạt động trơn tru như thế nào trên các thiết bị iOS
### 17. Có thể sử dụng cùng một code cho Android và iOS không?
- Có, chúng ta sử dụng cùng một code cho Android và iOS và React native sẽ giữ vai trò chuyển đổi giữa các native components. Ví dụ: một component của RN là ScrollView sử dụng UiScrollView trong iOS và ScrollView trong Android
### 18. Có thể sử dụng native code trong React Native không?
- Có thể, chúng ta có thể dùng native code bên cạnh javascript 
### 19. React native có phải là để tạo ra một ứng dụng mobile native không?
- Có.
### 20. Điểm khác biệt giữa ReactJS và React Native?
- ReactJs là một thư viện JavaScript được sử dụng để phát triển các ứng dụng trong HTML5 sử dụng JavaScript
- React Native được sử dụng để phát triển các ứng dụng di động sử dụng JavaScript

# III. Lời kết:
- Bài viết này do mình tự tổng hợp và tự trả lời một số câu hỏi, nếu có sai sót các bạn hãy để lại comment để mình sửa nhé :3
- Cám ơn các bạn đã đọc, mong bài viết của mình giúp được các bạn ít nhiều khi đi phỏng vấn React Native :))