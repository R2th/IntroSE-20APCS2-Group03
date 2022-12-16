Khi làm việc với React Native, tất nhiên không bao giờ có thể thiếu handle action. Nhưng, việc handle action hợp lí và đúng thì thường lại rất đáng quan tâm.
Giả sử:
```
            <TouchableOpacity
                  onPress={() => this.onClick()}>
                  <Image
                    source={Images.on_Click}
                    style={{ height: 24, width: 24 }}
                  />
            </TouchableOpacity>
```
Hay 

```
            <TouchableOpacity
                  onPress={this.onClick.bind(this)}> // sai lại càng sai :(( 
                  <Image
                    source={Images.on_Click}
                    style={{ height: 24, width: 24 }}
                  />
            </TouchableOpacity>
```

Hoặc cứ tùy ý bind thật nhiều ở contructor, cứ ngỡ rằng nó sẽ chạy thật[ tối ưu](https://viblo.asia/p/optimize-performance-react-native-Qpmle2N95rd).
```
constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.validateParams = this.validateParams.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }
```
Vậy phải như thế nào mới đúng? 

À khoan, nếu bạn còn lăn tăn về this của mấy dòng bind kia, hãy đọc qua [tài liệu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) này trước.

Nếu đã hiểu, hãy cùng mình tìm hiểu tiếp nhé :) !
# 1. Tại sao phải bind function? 
- Mục đích: Để giữ lại được đúng ngữ cảnh(context) mong muốn khi function được gọi.

Thực sự đúng là như vậy! Khi làm việc, chúng ta hay gặp vài case là this.props (undefined) => đó chính là lúc this đó không thực sự là "this" mình cần :D , và mình phải bind. 

Nếu bạn đã đọc về con trỏ this, thì có vẻ điều này rất clear. Mình cũng đã có một bài chia sẻ nhỏ về vấn đề này, bạn có thể tham khảo [ở đây](https://viblo.asia/p/su-khac-biet-giua-arrow-function-va-function-trong-javascript-07LKXpw2KV4).

Và hãy nhớ điều này: 

> This depends how the function is called, not how/where it is created.

- Bạn nên sử dụng bind khi sử dụng với các vấn đề nội bộ, với các data như không động, không phụ thuộc vào cách gọi hàm, và được defined khi function mất đi.

# 2. Ví dụ về việc nên bind function
Một ví dụ với việc dùng action cho button.

Ở đây, Button không có data và behavior. Việc handle action của button chỉ xảy ra khi nhấn button.
Ví dụ: 
```
class ArticlesListScreen extends Component {
  constructor(props, context) {
    super(props, context);
    // Binding "this" creates new function with explicitly defined "this"
    // Now "openArticleDetailsScreen" has "ArticleListScreen" instance as "this"
    // no matter how the method/function is called.
    this.openArticleDetailsScreen = this.openArticleDetailsScreen.bind(this);
  }
  
  openArticleDetailsScreen() {
    const { article } = this.props;
    openArticleScreen(article.id);
  }
  
  renderArticle() {
    return (
      <View>
        <Text> An Article! </Text>
        <Button
          {/*Passing method to the component as handle.*/}
          onPress={this.openArticleDetailsScreen}
        >
          Open Details
        </Button>
      </View>
    );
  }
}

function Button({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
```
Kể cả với TH một button được viết trong component con, thì cũng handle bind bình thường: 
```
class ArticlesListScreen extends Component {
  getArticle(articleId) {
     const { articles } = this.props;    
     return articles.find(article => article.id === articleId);
  }
  
  renderArticle(articleId) {
    const { article } = this.props;
    
    return (
      <View>
        <Text> What a great article! </Text>
        {/*Calling method directly from "this", so no need for binding.*/}
        <Button article={this.getArticle(articleId)} />
      </View>
    );
  }
}

class ArticleDetailsButton extends Component {
  constructor(props, context) {
    super(props, context);
    // It is the same thing, only difference is Component where we do the binding.
    // Component is lower in the tree, and now button has the logic how to open the screen.
    this.openArticleDetails = this.openArticleDetails.bind(this);
  }
  
  openArticleDetails() {
    const { article } = this.props;
    openArticleDetails(article.id);
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.openArticleDetails}>
        <Text>Open Details</Text>
      </TouchableOpacity>
    );
  }
}
```

Một ví dụ khác cho trường hợp vòng lặp: 
```
class ArticleDetailsScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderTagComponent = this.renderTagComponent.bind(this);
  }
  
  renderTagComponent(tagId) {
    const { tags } = this.props;
    const tag = tags.find(tag => tag.id === tagId);
    return <Text key={tagId}>{tag.title}</Text>;
  }
  
  render() {
    const { article } = this.props;
    // Nice, isn't it? 
    // Without anonymous function monster as argument :)
    const articleTags = article.tags.map(this.renderTagComponent);
    return (
      <View>
        <Text>{article.content}</Text>
        {articleTags}
      </View>
    );
  }
}
```

Hay một ví dụ khác dùng bind cho render giúp loại bỏ các hàm bao không cần thiết cũng như chức năng ẩn danh.
```
class ArticleDetailsScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderTagComponent = this.renderTagComponent.bind(this);
  }
  renderTagComponent(tagId) {
    const { tags } = this.props;
    const tag = tags.find(tag => tag.id === tagId);
    return <Text key={tagId}>{tag.title}</Text>;
  }
  render() {
    const { article } = this.props;
    // Nice, isn't it? 
    // Without anonymous function monster as argument :)
    const articleTags = article.tags.map(this.renderTagComponent);
    return (
      <View>
        <Text>{article.content}</Text>
        {articleTags}
      </View>
    );
  }
}
```
Tóm gọn lại, bind giúp mình: 
- Lấy đúng context (ngữ cảnh) mà mình cần để dùng ở trong function đó.
-  Tránh việc sinh ra một method mới.

# 3. Arrow Function có giải quyết được vấn đề của function thông thường? 
Như bạn đã biết, arrow function là tính năng mới của ES6, nó viết khá hay và ngắn gọn.Vậy liệu nó có thể giải quyết được vấn đề cho function? 

Tuy nhiên thì, arrow function không nên viết đối với hàm render, bởi hàm render được gọi lại nhiều lần, do đó, hàm arrow sẽ tạo ra function mới thường xuyên và không cần thiết.

# 4. Khi nào nên dùng bind? 
Điều đó còn phụ thuộc vào hàm đó được gọi như thế nào, dùng như thế nào, có sử dụng this hay không?  Câu trả lời là đối với hàm được gọi tới this thì nên bind.

Ví dụ như hàm 
```
validateParam(params){
if(!params) return false
return true
}

// this.validateParam('hue')
```
Hàm này không cần tới this, vì vậy ta không cần bind.

Nhưng với hàm `openArticleDetails` hay `renderTagComponent` cần dùng this, nên ta cần bind để tránh bị lấy this bị `undefined`.

![](https://images.viblo.asia/311f084f-b7f2-4ad7-aff7-c6c4375c4015.png)

Tùy vào mục đích viết và gọi hàm mà sử dụng bind hay không bind sao cho hợp lí, tránh việc nhìn trên contructor có 1 tá dòng bind cũng khiến người ta phát hỏa rồi :D .

# Kết
Sau một vài bài bàn về function, this và arrow function, mình hứa bài viết tiếp theo của mình sẽ đưa ra chủ đề khác, hấp dẫn không kém nữa nhé. Cám ơn các bạn rất nhiều! 

Nguồn: https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a