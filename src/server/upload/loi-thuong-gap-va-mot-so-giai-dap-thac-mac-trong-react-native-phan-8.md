# 1. React Fragments .
Trong một thời gian dài, bạn phải đóng gói mọi thứ trong câu lệnh return bằng một div duy nhất hoặc sử dụng một ký hiệu mảng để hiển thị chính xác vào DOM . Ví dụ:

```
const myComponent1 = () => {
  return 
   <div>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </div>
}

const myComponent2 = () => {
  return [
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
  ]
}
```

Với việc giới thiệu React Fragment, bạn có thể không cần sử dụng 2 phương pháp trên nữa, thay vào đó chúng ta sẽ làm như thế này:

```
const myComponent1 = () => {
  return 
   <Fragment>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </Fragment>
}
```

hoặc 

```
const myComponent1 = () => {
  return 
   <>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </>
}
```

Bạn có cảm thấy đơn giản và dễ dàng đúng không nào .

# 2. Sử dụng useCallback hợp lý.

Bất kỳ chức năng nào của bạn sử dụng để re-render  lại thành phần của bạn, điều này sẽ không gây ra kết xuất không cần thiết, bất cứ khi nào bạn không muốn, bất kỳ chức năng nào được sử dụng bên trong các phần tử jsx, hãy đưa nó ra như được hiển thị trong bước trước và áp dụng sử dụng useCallback .Để tìm hiểu về useCallback bạn có thể lên trang chủ nhưng tôi sẽ chỉ cho các bạn cách tôi có thể triển khai nó để cải thiện hiệu suất của react-native.

Ví dụ : 

```
export default ()=>{
	const [childState, setChildState] = useState(0);
	//using useCallback
	const awesomeChildListRenderItem = useCallback(
	    ({ item }) => (
		      <AwesomeChild {...item} onPress={(number)=>{setChildState(number)}} />
	    ),[]);
    const awesomeChildListKeyExtractor = useCallback( (item) => `awesome-child-key-${item.id}`,[]);
	return(
	    <FlatList
		    renderItem={awesomeChildListRenderItem}
		    keyExtractor={awesomeChildListKeyExtractor}
	    />
    )
}
```

Và bây giờ chúng ta đạt được một số tiến bộ bằng cách áp dụng móc useCallback. Điều này đảm bảo FlatList sẽ không hiển thị lại vì AwesomeChild đã được ghi nhớ và không có gì thay đổi giá trị của nó. bạn có thể quan sát từ đoạn mã trên, dấu ngoặc trống được sử dụng ngay sau khi gói hàm cũ của chúng ta với useCallback, đó là sự phụ thuộc, được yêu cầu trong trường hợp hàm đang sử dụng bất kỳ giá trị nào khác.

```

export default ()=>{
	//Sates is 0 initially
    const [pressCount, setPressCount] = useState(0);
    //Function to update last state by +1 
	const updateButtonPress = useCallback(() => { 
        setPressCount(pressCount + 1);
    }, []);
    //Empty dependancy
	return(
        <Button  onPress={updateButtonPress} title="Add 1" />
    )
}
```

Đoạn mã trên được viết để thêm 1 vào trạng thái cuối cùng của nó, nhưng nó luôn đặt 1, vì useCallback ghi nhớ các trạng thái pressCount là 0 ở lần hiển thị đầu tiên, bất cứ khi nào chúng ta sử dụng trạng thái bên trong useCallback, nó luôn là 0, vì vậy mỗi khi chúng ta nhấn , nó sẽ là 0 + 1 = 1. để nhận các giá trị mới nhất, chúng ta cần thêm các trạng thái vào mảng trống bên trong useCallback. tức là useCallback (() => {...}, [pressCount]) Vì vậy, hơi đau đầu khi tìm sự phụ thuộc và điền vào, tôi biết đúng không!?, vì vậy bạn chỉ cần định cấu hình eslint & eslint-react-hook, sau đó mã VS sẽ xử lý nó.

Trước khi dùng useCallback.
![](https://images.viblo.asia/3aa68c70-2740-4be8-8060-462ab25b6806.gif)

Lưu ý độ trễ của việc kích hoạt tab. 

Sau khi áp dụng sử dụng useCallback.
![](https://images.viblo.asia/618b3378-06ad-42fd-a709-e9382e1c6d2e.gif)


# 3. Ghi nhớ data trong component với memo.

sử dụng **export default React.memo(AwesomeChild)** để export gần như tất cả thành phần của bạn, điều này rất giống với PureComponent. Nó ngăn cản việc kết xuất các thành phần bằng cách so sánh các đạo cụ trước và tiếp theo, đôi khi nó sẽ cho phép kết xuất một số thay đổi không mong muốn đối với một số thay đổi không mong muốn, để nâng cấp các hạn chế, chúng ta có thể sử dụng hàm areEqual làm đối số thứ 2 của hàm React.memo,

```
const AwesomeChild =({text,style})=>{	
	return(
	  <Text style={style} >{text}</Text>
  )
}
export default React.memo(AwesomeChild)
    
```

Restricted memo
```
const AwesomeChild =({text,style})=>{	
	return(
	  <Text style={style} >{text}</Text>
  )
}
const areEqual=(prevProps,nextProps)=>{
  // return false prevProps.text & nextProps.text are not equal.
  return prevProps.text===nextProps.text
  // else all are equal, no re-render
  return true
}
export default React.memo(AwesomeChild,areEqual)
```

Trong điều này, component sẽ chỉ hiển thị lại nếu text prop thay đổi từ thành phần chính, không kết xuất lại nếu style prop thay đổi. (trong hầu hết các trường hợp, bản ghi nhớ bình thường sẽ hoạt động mà không gặp bất kỳ sự cố nào)

# 4. Suy nghĩ về Lifecycles

React đã trở nên phổ biến (trước khi có hook), nó đã có một API thành phần rõ ràng và đẹp mắt giúp chúng ta dễ dàng cho React biết khi nào nó nên thực hiện những việc nhất định:

```
class LifecycleComponent extends React.Component {
  constructor() {
    // initialize component instance
  }
  componentDidMount() {
    // run this code when the component is first added to the page
  }
  componentDidUpdate(prevProps, prevState) {
    // run this code when the component is updated on the page
  }
  componentWillUnmount() {
    // run this code when the component is removed from the page
  }
  render() {
    // call me anytime you need some react elements...
  }
}
```

Việc viết các thành phần như thế này vẫn hoạt động (và sẽ xảy ra trong tương lai gần) và nó hoạt động thực sự tốt trong nhiều năm. Hooks mang lại rất nhiều lợi ích, nhưng một trong những điều tôi yêu thích là nó làm cho các thành phần của bạn dễ khai báo hơn ở chỗ nó cho phép bạn ngừng suy nghĩ về "khi nào mọi thứ sẽ xảy ra trong vòng đời của thành phần" (điều đó không quan trọng tất cả nhiều) và nhiều hơn nữa về "thời điểm mọi thứ nên xảy ra liên quan đến sự thay đổi trạng thái" (vấn đề quan trọng hơn nhiều).

```
function HookComponent() {
  React.useEffect(() => {
    // This side effect code is here to synchronize the state of the world
    // with the state of this component.
    return function cleanup() {
      // And I need to cleanup the previous side-effect before running a new one
    }
    // So I need this side-effect and it's cleanup to be re-run...
  }, [when, any, ofThese, change])
  React.useEffect(() => {
    // this side effect will re-run on every single time this component is
    // re-rendered to make sure that what it does is never stale.
  })
  React.useEffect(() => {
    // this side effect can never get stale because
    // it legitimately has no dependencies
  }, [])
  return /* some beautiful react elements */
}
```

Lý do tôi yêu thích hook là vì nó tự nhiên giúp tôi tránh được lỗi. Vì vậy, tôi thường thấy rằng mình đã gặp lỗi trong mã của mình vì tôi quên xử lý cập nhật props hoặc state trong componentDidUpdate và khi tôi nhớ lại, tôi thường quên xóa sạch tác dụng phụ trước đó trước khi khởi động cái mới (đối với ví dụ, nếu bạn thực hiện một yêu cầu HTTP, nhưng một phương án thay đổi trước khi yêu cầu đó hoàn thành, bạn nên hủy yêu cầu trước đó).

Với React Hooks, bạn vẫn nghĩ về việc khi nào các tác dụng phụ sẽ chạy, nhưng bạn không nghĩ về Lifecycles thành phần, bạn đang nghĩ về việc đồng bộ hóa trạng thái của các tác dụng phụ với trạng thái của ứng dụng. Nắm bắt được điều đó đòi hỏi một chút mở rộng, nhưng đó là một ý tưởng mạnh mẽ đến nỗi một khi bạn quấn lấy nó, bạn sẽ tự nhiên gặp ít lỗi hơn trong các ứng dụng của mình nhờ vào thiết kế của API. Vì vậy, khi bạn đang nghĩ: "Này, danh sách phụ thuộc của tôi cần phải là []", đừng làm vậy vì bạn nghĩ rằng nó chỉ cần chạy trên mount, hãy làm điều đó vì bạn biết rằng những thứ mà nó đang làm sẽ không bao giờ cũ.

# 5. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .
Một số nguồn : 
 - dev.to