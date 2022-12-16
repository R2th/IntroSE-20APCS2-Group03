# `Optimizing React Performance`
Gần đây, mình có được tham gia các dự án về framework JS, được tiếp xúc và làm việc với cả 2 framework đang trending hiện nay và React và Vue, không ít lần mình gặp phải những bài toán khá hóc búa, đặc biệt là khi mong muốn tối ưu hóa tốc độ của page. Và trải qua những tình huống đó, mình cũng đốc rút ra một số bài học. Nguyên nhân chủ yếu khiến các trang xuất hiện tình trạng giật lag là do số lượng render quá nhiều và nhiều lần render là không cần thiết. Vậy kết chung là muốn tối ưu tốc độ một trang web thì mình có thể nghiên cứu và tìm ra những thành phần đang tiêu tốn tài nguyên do xử lý render chưa hợp lý. Đó là solution đầu tiên mà ta có thế tiếp cận.
![](https://images.viblo.asia/89e43429-3373-44e4-858f-32d31abf417a.jpg)

## Pre-Optimization — Tối ưu với key trong vòng lặp
Mình có từng phỏng vấn một số ứng viên với câu hỏi, khi render một danh sách thì đánh key để làm gì. Gần như mình thấy các ứng viên chưa trả lời được câu hỏi này hoặc chỉ dừng lại ở việc thấy báo lỗi eslint yêu cầu key cho element đó. Mình thì không bàn sâu đằng sau cơ chế đánh key ở đây, nhưng ta có hiểu nôm na là key giúp ta phân biệt được các element với nhau, khi các data thay đổi tác động lên các element này, dựa vào key mà có thể đưa ra phương hướng cần render thằng nào, thằng nào thì không cần thay vì phải render lại cả list.
```js
<li key={id}>
  {...}
</li>
```
Một key thì cần phải đảm bảo những yếu tố như độc nhất, không bị trùng lặp, bất biến theo thời gian.
Một số trường hợp, key bị dùng sai cách khiến cho component bị render một cách không mong muốn
```js
updateKey() {
    this.setState({ key: new Key() })
}

render() {
   <div>
       <button onClick={this.updateKey}>Change key</button>
       <List key={this.state.key}/>
   </div>
}
```

## React PureComponent
Một trong những cơ chế giúp React quyết định xem một component cần re-render lại hay không là so sánh state đó có còn reference đến cùng một ô nhớ hay không. Một số tình huống không mong muốn, tuy reference đã thay đổi nhưng mà thật ra giá trị bên trong vẫn giữ nguyên, re-render trong tình huống này là không cần thiết.
Một build in class của React là PureComponent sẽ giúp ta quyết định rằng component có thực sự cần re-render không. PureComponent tránh được một số render không cần thiết mà từ đó cải thiện được hiệu năng của app.
```js
class DumpComponent extends React.PureComponent {
  render() {
      return (
        <div>
          ...
        </div>
      )
  }
}
```

Vậy điều gì giúp React thực hiện được điều này, đó là nhờ một life cycle hook `shouldComponentUpdate` sẽ check shalow copy để ra quyết định
```js
shouldComponentUpdate() {
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
  );
}
```
## Conclusion
Bên cạnh hai cách kể trên, còn rất nhiều solution có thể áp dụng vào một dự án như memorize, computed, reselect để tối ưu hóa performance của app. Trên đây là phần ngắn gọn điểm qua nhưng cách mà mình có thể thực hiện ngay được. Nếu bạn còn có những solution nào khác nữa thì cũng đừng ngại mà chia sẻ ở đây nhé.

## `References`
1. https://medium.com/vena-engineering/optimizing-react-rendering-61a10e741edb
2. https://reactjs.org/docs/optimizing-performance.html