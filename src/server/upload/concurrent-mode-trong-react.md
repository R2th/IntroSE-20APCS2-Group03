## Mở đầu
Trong vòng ba năm qua, đội ngũ React core đã và đang cập nhật một tính năng lớn vô cùng mới mẻ, nó giúp tăng đáng kể trải nghiệm của người dùng và developer, đó chính là Concurrent Mode.
## "Concurrent mode" nghĩa là gì ?
Như bạn đã biết, Javascript là  "single threaded language" aka ngôn ngữ xử lý đơn luồng.
Mỗi task bạn chạy sẽ được thực thi xong hoàn toàn trước khi chuyển sang task tiếp theo trong stack.
Tuy nhiên, nó không có nghĩa là chúng ta không thể xử lý nhiều hơn 1 task trong cùng một thời điểm. 
Mình diễn đạt có dễ hiểu không ạ ? Hãy xem qua một ví dụ thực tế trong cuộc sống để rõ hơn nhé:

Ring ring ring, tắt chuông báo thức và bắt đầu buổi sáng của bạn.  Bạn cần chuẩn bị một bữa sáng bao gồm bánh và trà.
Bạn chỉ có thể thực hiện 1 công việc nào đó trong 1 thời điểm (tương tự single thread), vậy bạn chỉ có thể chuẩn bị bánh hoặc chuẩn bị trà.
Nếu vậy, bánh có thể nguội nếu bạn chuẩn bị trà sau bánh hoặc ngược lại. 

![](https://images.viblo.asia/32ff3d49-4849-49ea-98e9-8a28ed417db6.jpeg)

Nghe có vẻ hem ổn lắm nhỉ ? Chúng ta muốn sau khi chuẩn bị xong thì trà vẫn còn nóng và bánh cũng vậy để có một bữa sáng ngon tuyệt.

Vậy để có chuẩn bị có hiệu quả và có trà và bánh đúng lúc mình muốn thì chúng ta nên chia nhỏ task chuẩn bị bánh và trà ra làm nhiều task nhỏ rồi sắp xếp chúng lại theo trình tự hợp lý.

![](https://images.viblo.asia/a32f39c8-6138-47f9-96e4-63d56ee52d2d.jpeg)

Như các bạn thấy giờ chúng ra đã có 1 chuỗi các công việc nối nhau đan xen giữa chuẩn bị bánh và chuẩn bị trà để hoàn thành mục tiêu có cả bánh và trà còn nóng hổi vào cùng 1 thời điểm.

**Vậy "Concurrent mode là gì ? Nó là cách để cấu trúc một chương trình bằng cách chia nhỏ nó thành các phần nhỏ hơn để có thể xử lý từng phần một cách độc lập. Điều này có nghĩa là chúng ta có thể phân nhỏ sự giới hạn của sử dụng "single thread", và tạo ra 1 chương trình có hiệu quả.**

Vậy là chúng ta đã hiểu cơ bản về "Concurrent" , giờ hãy xem áp dụng như thế nào với React nhé.

## Về sự trải nghiệm của người dùng.
Các giao diện trình duyệt chịu trách nhiệm áp dụng tất cả những gì thay đổi bởi CSS, thông tin người dùng nhập vào và thực thi Javascript để hiển thị lên màn hình của người dùng. Công nghệ ngày một tiến hóa, giờ đây để có thể cung cấp trải nghiệm tốt nhất cho user, chúng ta luôn mong đợi màn hình phản hồi ít nhất 60 khung hình mỗi giây. Để đạt được điều đó, với mỗi cho kỳ của code nên chạy không được lớn hơn 16.67 milliseconds, và trên thực tế thì nó còn có thể ít hơn đâu đó khoảng 10ms ( như ở trên đã đề cập thì browser UI cũng chịu trách nhiệm thực hiện các tasks khác nuwax).

React chính là Javascript và do đó giới hạn của Javascript cũng giới hạn React. Cho đến bây giờ, React bắt đầu đối chiếu số liệu về nó, nó sẽ không dừng lại cho đến khi nó chạy xong. Trình duyệt UI chính sẽ không thể thực thi các task khác như là nhận input từ người dùng. Ngay cả khi thuật toán của React đã cải thiện đáng kể -- khi web trở nên lớn và cây DOM (DOM tree) lớn lên, thì ta dễ dàng hiểu làm thế nào để giảm khung hình dẫn đến các ứng dụng bị xé layout hoặc thậm chí không phản hồi.

Các bạn có thể xem ví dụ dưới đây về render các điểm ảnh khi ấn phím bất kỳ (kích thước 100x100)

**demo**: https://codesandbox.io/s/4nd67

Nhìn có vẻ hơi kinh dị nhưng nó là 1 cách đơn giản để biểu diễn vấn đề trên khi render 10000 dom nodes.

Và khi hầu hết developers sẽ xử dụng kỹ thuật  như là bộ nhớ và hiệu ứng để giúp cho trải nghiệm người dùng tốt hơn. họ sẽ trì hoãn vấn đề chính đó là : việc render sẽ vẫn 1 chiếc xe tải chặn đường. - chặn đường thread ấy.

Nhưng để cải thiện trải nghiệm người dùng thì không phải tất cả là sửa lỗi về hiệu năng, nhưng nên xem xét nếu muốn có trải nghiệm người dùng tốt.

![](https://images.viblo.asia/143a83ea-c675-46b0-9267-6cb18c497fb6.jpeg)


Spin, skeleton, placeholder --- bạn không thể thoát khỏi kể cả bạn là 1 PC ngon hoặc 1 chiếc điện thoại cùi bắp. Mặc dù phương pháp này cải thiện được sự trải nghiệm khi cho user biết nên đợi khi có gì đó cần thời gian để xử lý xong, nhưng nó cũng làm giảm trải nghiệm khi có quá nhiều vòng xoay với một thứ gì đó mang tính tượng trưng hiển thị liên tục. 

## Giải thích, giải quyết vấn đề
Như đã nói thì việc chia thành nhiều task con cho phép chúng ta quẩy nhiều task cùng một lúc. Đó chính xác là điều mà React đang làm: việc render sẽ được chia ra thành nhiều task nhỏ hơn và lập kế hoạch cho chúng hoạt động với độ ưu tiên khác nhau dựa trên độ quan trọng của chúng (time-slicing).
Điều này cho phép React
* Không chặn các thread chính
* Thực thi nhiều task cùng một lúc và đổi task nếu chúng có độ ưu tiên hơn.
* Render từng phần mà không ảnh hưởng đến kết quả.

Tiến trình render sẽ không chặn luồng nữa, nó sẽ tiếp diễn và có thể đẩy gì đó vào nếu nó có độ ưu tiên cao hơn, ví dụ như là user ấn một nút gì đó trên bàn phím chẳng hạn.

Áp dụng lý thuyết trên vào thực tế sử dụng concurrent mode nhé:

```javascript
// Concurrent Mode
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
```

## useDeferredValue

Hãy nhớ lại trải nghiệm của ví dụ lúc nãy, các bạn có thể thấy UI bị khựng, dừng, kẹt mỗi khi ấn phím.
(https://4nd67.csb.app/)

Để sửa lỗi trải nghiệm người dùng này, chúng ta cần 1 cách để ưu tiên việc user nhập input (gõ phím) và sau đó còn phải để tâm đến vấn đề input trở nên lớn hơn. Thật may mắn là chúng ta có 1 cách đó là : **useDeferredValue**

**useDeferredValue** là 1 hook sẽ bọc các props / states value và nhận sự trì hoãn tối đa.
Nó sẽ giúp React biết nên render vào sau thay vì lúc này (user đang nhập input)

```javascript
import { useState, useDeferredValue } from 'react';
const [value, setValue] = useState('');
const deferredValue = useDeferredValue(value, {
  timeoutMs: 5000
});
```

Lưu ý rằng, ví dụ trên không chỉ ra sự render. React vẫn sẽ render ra nếu components sẵn sàng trước thời gian cho trước, nó sẽ xóa các thay đổi đến DOM.
Nếu ta sử dụng chức năng này có thể dẫn đến render không nhất quán, ở đây ta hướng đến render ưu tiền một phần nào đó so với phần còn lại.

Ví dụ: (Blocking VS Interruptible rendering): 
[https://codesandbox.io/s/8l52r]

## Suspense for Data Fetching
Một tính năng khá thú vị và kích thích. Nếu bạn đã quen thuộc với chức năng mới nhất của React thì bạn có thể đã biết về nó. Vâng mình đang đề cập đến chức năng React.lazy đã được ra mắt ở phiên bản 16.8 của React. Nó cho phép chúng ta set placeholder cho component trong khi đợi một phần nào đó như là data fetching.

Về cơ bản thì ý tưởng của nó tương tự với những cách chúng ta đã làm nhưng nó hoạt động trên mọi thứ có sử dụng Promise.

```javascript
import Spinner from './Spinner';
<Suspense fallback={<Spinner />}>
   <SomeComponent />
</Suspense>
```

Hãy cùng xem xét sức mạnh của nó nhé. Dưới dây là 1 ví dụ không sử dụng Suspense.

demo : [https://19591.csb.app/]

Ví dụ này ta sẽ hiển thị thông tin về các bộ phim với thông tin và một vài bình luận về bộ phim đó.

```javascript
const [tvData, setTvData] = useState(null);
useEffect(()=>{
   setTvData(null);
   tvDataApi(id).then(value =>{
     setTvData(value);
   })
}, [id]);
if (tvData === null) return <Spinner />;
return <div className="tvshow-details">
  <div className="flex">
   <div>
     <h2>{tvData.name}</h2>
     <div className="details">{tvData.description}</div>
    </div>
   <div>
     <img src={`${id}.jpg`} alt={tvData.name} />
   </div>
  </div>
  {/* comments section */
  <Comments id={id} />
</div>
```

Chúng ta có thể thấy 2 điều sau:
1. Không có sự nhất quán hiển thị khi data đang được load từ api hay load data ảnh từ server về. Nếu muốn thì phải tự làm if ... return ... mà thôi (không làm mà đòi ăn thì ... bạn biết rồi đấy). 
2. Ta gọi api theo mô hình thác nước do đó ta chỉ có thể render khi tất cả được chuẩn bị sẵn sàng. Ta có nhiều cách để xử lý vấn đề này nhưng hiếm có cách nào đơn giản và trực quan cả.

"Susppense" sẽ xử lý tất cả chúng một cách ez và dễ hiểu. Chúng ta sẽ có thể hiện thị ngay tức thì những gì đã được load xong như là load xong title thì hiển thị title luôn, còn ảnh thì kemeno, ảnh sẽ hiển thị khi nó load từ src về sau. Khi data lớn lên, ảnh 20mb thì title cũng sẽ hiện ra trước, rồi ảnh sẽ hiển thị sau khi nó được load thành công, như vậy sẽ không cần phải tải cả ảnh, cả title, cả comments rồi mới render như trước nữa.

```javascript
export const TvShowDetails = ({ id }) => {
  return (
   <div className="tvshow-details">
      <Suspense fallback={<Spinner />}>
          <Details id={id} />
          <Suspense fallback={<Spinner />}>
             <Comments id={id} />
          </Suspense>
      </Suspense>
   </div>
  );
};
```

Để sử dụng Suspense cho data fetching thì ta cần bọc nó trong 1 promises với function (xem function **wrapPromise** ở ví dụ bên dưới), thứ mà sẽ trả về các giá trị khác nhau thứ mà Suspense mong đợi ở mỗi bước của tiến trình. Đội ngũ React đang làm việc dựa trên **react-cache**, thứ cung cấp cho chúng ra chức năng đó, nhưng chưa phải cuối cùng.

demo: [https://qdquy.csb.app/]

Dù sao đi nữa, bằng cách sử dụng cú pháp đơn giản cho component, ta có thể bỏ **useEffect** và không còn lo lắng về việc data sẽ hiển thị như thế nào khi chưa sẵn sàng. Ta có thể coi như dữ liệu đã hiển thị ở đó và làm phần còn lại.

```javascript
const detailsData = detailsResource(id).read();
return <div>{detailsData.name} | {detailsData.score}</div>
```

Nhưng giờ nó lại đẻ ra 1 vấn đề khác. Sẽ ra sao nếu như API được gọi trong comments component xong trước ?
Nhìn sẽ khá dị khi méo có ảnh mà cũng chẳng có title nhưng lại có comments như là: 
* Someone: "toẹt cmn zời, nữ chính xinh vãi nồi các ông ạ :heart_eyes_cat:". 
* Me be like: Okay hay wtf, tui méo nhìn thấy gì hết á :expressionless:

Để giải quyết vấn đề đó ta có thể sắp xếp thứ tự hiển thị thế nào cho đúng ý nhờ SuspenseList. :sunglasses:

## SuspenseList

SuspenseList là component bọc các Suspense components
Nó nhận 2 props là : **revealOrder**  , **tail** (optional).
Nhờ đó nó sẽ cho React biết thứ tự hiển thị những Suspense con được bọc bởi nó.

* [Document nè](https://reactjs.org/docs/concurrent-mode-reference.html#suspenselist)

```javascript
const [id, setId] = useState(1);
<SuspenseList revealOrder="forwards">
  <Suspense fallback={<Spinner />}>
    <Details id={id} />
  </Suspense>
  <Suspense fallback={<Spinner />}>
    <Comments id={id} />
  </Suspense>
</SuspenseList>
```

Lưu ý, nó không sắp xếp cả thứ tự gọi Api đâu nhé, chỉ sắp xếp thứ tự hiển thị khi chúng được load xong thôi.

## useTransition

Trước đó ta có nói về vụ **spinners** và làm thế nào để tăng trải nghiệm người dùng tránh trường hợp tất cả chúng hiển thị cùng lúc, cho cả những user có đường truyền mạng tốt nữa.

Ta có thể thực hiện nó bằng việc sử dụng **useTransition**. 

**useTransition** sẽ giúp chúng ta đợi data được sẵn sàng  trước khi xóa DOM cũ. Nghĩa là thay vì bùm hiện lên luôn thì nó sẽ hiện ra mượt hơn. 
Nó cũng sẽ trả về 2 thứ:

* startTransition:  function giúp React biết khi nào thì ta muốn trì hoãn việc hiển thị
* isPending: Giá trị cho biết nó có đang là 1 transition hay không

```javascript
const [id, setId] = useState(1);
const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });
const onClick = id => {
  startTransition(() => {
    setId(id);
  });
};
```

Đương nhiên là chúng ta sẽ dùng hook này với Suspense bên trên rồi, hãy xem ví dụ dưới đây nhé.

demo: [https://xz6nc.csb.app/]

Như bạn thấy thì việc sử dụng concurrent mode đã giải quyết được kha khá nhưng trường hợp cơ bản gây nhức óc cho chúng ta trong việc tăng trải nghiệm người dùng mà lại khá dễ sử dụng đúng không ạ.

## Tham khảo
[source](https://medium.com/swlh/what-is-react-concurrent-mode-46989b5f15da)