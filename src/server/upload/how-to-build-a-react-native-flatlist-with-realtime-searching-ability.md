Nếu bạn đang là 1 mobile dev, việc hiển thị 1 giao diện theo danh sách là khá quen thuộc. Trong react native, để hiển thị 1 danh sách như vậy, chúng ta có thể sử dụng Flatlist
Trong 2017, Facebook đã giới thiệu 1 component cải tiến của Listview, nhằm tăng performant và khả năng xử lý các vấn đề của listview
Việc sử dụng Flatlist là cực kỳ đơn giản như ví dụ dưới đây:
```
<FlatList 
  data={[{title: ‘Title Text’, key: ‘item1’}, …]} 
  renderItem={({item}) => <ListItem title={item.title} />} 
  ListHeaderComponent={this.renderHeader}
  ListFooterComponent={this.renderFooter}
/>
```
Để tìm hiểu thêm các thuộc tính của flatlist, bạn có thể tìm hiểu tại đây: 
https://facebook.github.io/react-native/docs/flatlist

Trong ví dụ dưới đây, chúng ta sẽ tạo 1 Flatlist và thực hiện search data trong list đó, giao diện chúng ta sẽ làm như sau:
![](https://images.viblo.asia/20fa6d87-8423-4ce8-bf0a-8ce14b74677c.png)

Đầu tiên, chúng ta sẽ tạo các state default cho flatlist:
```
this.state = {
  loading: false,      
  data: [],      
  error: null,    
  this.arrayholder : [];

};
```

Search function:

```
searchFilterFunction = text => {    
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.name.title.toUpperCase()}   
    ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });    
  this.setState({ data: newData });  
};
```

Sau đó, sẽ lấy data từ server về, và hiển thị nó lên list:

```
makeRemoteRequest = () => {    
  const url = `https://randomuser.me/api/?&results=20`;
  this.setState({ loading: true });
  fetch(url)      
    .then(res => res.json())      
    .then(res => {        
      this.setState({          
        data: res.results,          
        error: res.error || null,          
        loading: false,        
      });        
     this.arrayholder = res.results;      
   })      
   .catch(error => {        
     this.setState({ error, loading: false });      
   });  
};
```

Chúng ta sẽ phải tạo 1 searchbar để khi gõ vào đó sẽ thực hiện filter:

```
renderHeader = () => {    
  return (      
    <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round        
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}             
    />    
  );  
};
```
Các bạn có thể tham khảo code tại: https://github.com/vikrantnegi/react-native-searchable-flatlist
bài viết được tham khảo từ: https://medium.freecodecamp.org/how-to-build-a-react-native-flatlist-with-realtime-searching-ability-81ad100f6699