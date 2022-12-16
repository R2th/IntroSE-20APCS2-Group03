# 1. Lời mở đầu
Hellooooooo và xin chào 500 anh em, mình là thành và đây là "bản" **viblo**. Không biết anh em có để ý không, nhưng mình đã tàng hình được tầm 1 tháng rồi. "Nếu các người thành tâm muốn biết thì chúng ta sẵn sàng trả lời . Để bảo vệ thế giới khỏi bị phá hoại , để bảo vệ nền hòa bình của trái đất . Chúng tôi đại diện cho những nhân vật phản diện , đầy khả ái và ngây ngất lòng người" ak thực ra thì chẳng có bảo vệ thế giới và cũng chẳng có vai phản diện nào cả :). Trong một tháng vừa rồi mình đóng cửa tu luyện một trong các ngón mà giang hồ dạo này rất ưa chuộng, các bạn có đoán được  đó là ngón tà đạo gì không. Các bạn đoán đúng rồi đấy đó là **react js** . Trong bài này mình sẽ chia sẻ với các bạn thức làm mình nhai đi nhai lại mấy bữa mà tới mấy bữa gần đây mới nuốt được. Nếu đọc document không thì khó mà xuôi được, nhưng các vẫn lên đọc qua nó trước,  link ở [đây nhé ](https://reactjs.org/docs/lifting-state-up.html). Vì dù nói thế nào thì đó vẫn là tài liệu chính thống nhất, con đây là quan điểm cá nhân mà mình rút ra được nếu có chỗ nào còn thiếu mong anh em chỉ giáo.
# 2. Định nghĩa
Theo như document thì Lifting State Up được định nghĩa như sau.
> 
> several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor
> 
Chúng ta có thể dịch đoạn trên thành như sau:
> khi một dữ liệu thay đổi nó sẽ ảnh hưởng tới nhiều component cùng lúc. State được khuyến khích chia sẻ ở component cha của chúng
> 
Đọc song đoạn trên chắc bạn cũng mường tượng ra nó hoạt động như thế nào rồi đúng không ạ. Đúng vậy, nó chỉ đơn giản khi chúng ta thay đổi, hoặc thêm mới dữ liệu chúng ta cần có một biến để lưu lại trạng thái - state thay đổi, song cập nhập lại giao diện với thay đổi đó.

Khá là easily đúng không ạ. Để mình làm nó xoắn não hơn một chút nhé, sẽ thế nào khi các bạn phải update state qua nhiều component. Nghe có vẻ hơi khó mường tượng nên mình xin phép sử dụng hình ảnh dưới đây để các bạn thấy vấn đề nhé


![](https://images.viblo.asia/f1be4df7-31a3-4d6f-959e-e7540bc81167.png)


Câu hỏi được đặt ra là làm thế nào chúng ta thay đổi đống mầu vàng kia mà cá
đống mầu xanh kia cũng được thay đổi theo. Umm!!! nếu như khi các bạn code trong một file, chắc các bạn sẽ bảo rằng trời chỉ cần lưu vào state là song, ok ghi nhận ít nhất các bạn đã biết đến state vậy là thành công được 50% rồi. Nhưng nếu các bạn có tầm một hai chục cái component thì mình đoán các bạn vẫn quản lý được, mặc dù tìm một đoạn code các bạn mất cả chục phút, ngồi đọc lại luồng chạy dự án của mình thì mất cũng cỡ cả tiếng đồng hồ. Nhưng để các bạn có thể đi làm, hay đơn giản là public code có người muốn đọc code của bạn, hoặc debug code dễ dàng hơn thì mình khuyên các bạn lên chia nhỏ code ra thành các module riêng biệt và sử dụng từ khóa **Lifting State Up**.  *Đoạn này hơi dài dòng để mình giải thích cho một số bạn đọc song document mà vẫn chưa thể hiểu tại sao nên sử dụng nó.*

OK tiếp theo chúng ta cùng tiếp tục nào, vậy từ khóa sẽ là **Lifting State up** dịch nôm na là *chuyển state lên trên*, nó họa động đúng như cái tên của nó vậy. Chúng ta sẽ update cái state đó lên thằng cha, rồi thằng cha của thằng cha của nó  :), tới khi nào tới thằng cha chung nhất thì thôi. 

![](https://images.viblo.asia/0527ebd9-4be8-47ec-b89b-c0e2fd108da1.png)

Mình biết mỗi người sẽ có cách chia giao diện thành các component của riêng mình, và thật khó để đánh giá được bạn chia có đúng hay không. Nhưng các bạn lên có một thằng cha chung nhất như mầu vàng bao ngoài tất cả như hình trên, thường mình sẽ sử dụng luôn thằng app.js.
# 3. Áp dụng vào ví dụ thực tế

Với quan điểm chỉ có thiên tài đọc song lý thuyết là có thể áp dụng vào thực tiễn và làm được luôn. Lên chúng ta cùng nhau vào phần 3 để có thể hiểu thật sự **Lifting State up** là gì nhé.
Một số lưu ý, mình sẽ không sử dụng ví dụ trên document vì thật sự mình thấy nó không dõ dàng và nó viết tất cả vào cùng một file, mà theo quan điểm của mình thì điều đó quá khó để theo dõi cũng như debug. Vì vậy mình sẽ tạo ra một bài toán nho nhỏ man tên ToDoApp. Mình sẽ cố gắng chia nhỏ nó để các bạn thấy được ý nghĩa của  **Lifting State up**. Mình biết có một số đoạn mình chia nhỏ đến mức hơi vô lý, nhưng các bạn hãy tạm chấp nhận nó. Vì thật sự nếu lấy một bài toán quá chi tiết thì nó sẽ khó mà tập chung vào mỗi  **Lifting State up** và khiến các bạn bị dối với những kiến thức mới. Ok không dài dòng nữa chúng ta cùng đi vào ví dụ nào·

Đầu tiên chúng ta cần có một form cha chứa tất cả thằng con

Trong app.js

```
import React from 'react';
import logo from './logo.svg';
import './App.css';

import Part from './Components/Part';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      newBook: {
        title: '',
        description: '123',
      }
    };
  }

  renderBooks = (books) => (
    books.map((book, index) => {
      console.log(book);
      return (
      <div key={index}>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <input 
          value={book.title}
          onChange={(e) => this.handleEditBook(e.target.value, index)}
        />
      </div>
    )})
  );

  handleEditBook = (value, editIndex) => {
    const { books } = this.state;
    const newBooks = books.map((book, index) => {
      if (index === editIndex) {
        book.title = value;
      }
      return book;
    })
    this.setState({ books: newBooks});
  }

  handleAdd = (e) => {
    const {newBook} = this.state;
    newBook.title = e.target.value;
    this.setState({ newBook: newBook });
  }

  handleSubmit = () => {
    const { newBook, books } = this.state;
    books.push({
      title: newBook.title,
      description: newBook.description,
    });
    console.log(books);
    this.setState({ books });
  }

  onChangeText = (description) => {
    const { newBook } = this.state;
    newBook.description = description;
    this.setState({ newBook });
  }

  render () {
    const { books, newBook } = this.state;

    return (
      <div className="App">
        Form:
        <br></br>
        <span>Title:</span>
        <input value={newBook.title} onChange={this.handleAdd} />
        <Part book={newBook} onChangeText={this.onChangeText} />
        <button onClick={this.handleSubmit}>Add</button>
        <hr />
        Hien thi:
        {newBook.description}
        {this.renderBooks(books)}
      </div>
    );
  }
}

export default App;
```

Và để có thể thêm description tại đoạn  `<Part book={newBook} onChangeText={this.onChangeText} />` ta cần import `import Part from './Components/Part';` và để nó hoạt động ta có đoạn code sau:
```
import React from 'react';

const Part = ({ book, onChangeText }) => {
    return (
        <div>
            Description:
            <input 
                value={book.description}
                onChange={(e) => onChangeText(e.target.value)}
            />
        </div>
    )
   
};

export default Part;
```

Ok, giời chúng ta cùng tìm hiểu luồng hoạt động của nó nào. Đầu tiên tại file app mình viết theo 2 kiểu để các bạn dễ hình dung, cách 1 mình viết thuần vào một file, cách 2 mình sẽ tách **input** ra một file khác. Mình sẽ có một form giao diện để các bạn nhập đầu vào như thế này, 

![](https://images.viblo.asia/7ad6c4cb-e8b3-479f-80be-33248f136a5b.png)

khi các bạn nhập giá trị mình sẽ lưu chúng vào state qua hàm **handleAdd** với title, và **onChangeText** với description, sau khi các bạn nhấp vào nút **add** mình sẽ thực hiện hàm **handleSubmit** để lưu tất cả giá trị trên vào trong mảng **books** được khai báo trên state. Vậy mảng **books** này được dùng để làm gì, xin thưa rằng mảng  **books** này chúng ta sẽ sử dụng để hiển thị dữ liệu tại hàm **renderBooks** mà chúng ta gọi dưới render() 
```
Hien thi:
{newBook.description}
{this.renderBooks(books)} 
```
trong hàm này nó sẽ duyệt qua tất cả phần tử trong mảng, và để nó chở lên thú vị hơn một chút mình sẽ trả nó nó thành một input,  khi mà bạn thay đổi giá trị tại ô input này, mình sẽ sẽ gọi hàm **handleEditBook**. Trong hàm này mình chỉ đơn giải là sẽ edit lại dữ liệu đúng với phần tử mà bạn thay đổi, `index === editIndex` và sau đó mình cập nhập lại giá trị mảng **books**. Và điều thần kì đã diễn ra khi bạn cập nhập giá trị thì **title** sẽ ngay lặp tức thay đổi theo,

![](https://images.viblo.asia/9b6fc962-cc86-4a93-8755-1b1677204879.png)

mình đoán bạn cũng đoán được tại sao rồi :). Nếu các bạn vẫn còn băn khoăn thì đây là nơi tạo ra chúng 
```
<h1>{book.title}</h1>
<p>{book.description}</p>
```


Ok, sáng tạo tới đây thôi không mình sợ lạc đề mất. Vậy các bạn có thấy lifting state up được áp dụng ở đâu không ạ. Đúng rồi đấy ạ, mình đã tạo một file Part để sử lý dữ liệu các bạn chuyền vào, tại đây mình chỉ khai báo hoặc nếu có mình cũng chỉ xử lý dữ liệu nếu cần, còn như các bạn đã thấy hàm **onChangeText** phải lằm bên app để mình tiến hành cập nhập thay đổi **state**, và mình sẽ chuyền `book={newBook}` qua lại hàm **Part** để cập nhập lại value `value={book.description}` lại cho nó, vì thế lên khi các bạn nhập giá trị nó mới có thể hiển thị trên thanh input bạn vừa nhập để bạn biết mình đã nhập những cái gì. 

# 4. Kết luận
Đọc tới đây chắc các bạn cũng đã hình dung được **lifting state up** là gì rồi đúng không ạ. Nếu các bạn để ý thì mình đoán các bạn sẽ có một số câu hỏi, vậy với cây componet mà đến vài chục nốt thì chẳng nhẽ chúng ta sẽ phải chuyền nó qua bằng thấy thằng sao. Câu trả lời này mình xin được giải thích ở bài sau :). Cảm ơn bạn đã đọc, nếu các bạn có thắc mắc, hay có phần nào chưa hiểu các bạn có thể bình luận dưới phần comment để chúng ta cùng tìm hiểu dõ hơn nhé. Và đặc biệt đừng quên cho mình một like và một share nhé !!!