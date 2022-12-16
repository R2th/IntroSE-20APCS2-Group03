![](https://images.viblo.asia/5dac9171-4272-491d-bf4d-3958c148e9b6.jpeg)

**Thư viện React cung cấp 2 hook được build sẵn giúp chúng ta tối ưu hoá hiệu suất của app: ``useMemo`` và ``useCallback``. Ở lần load đầu tiên, thoạt nhìn có vẻ như cách hoạt động của chúng khá giống nhau, vì vậy dễ gây hiểu lầm mỗi khi bạn dùng chúng. Để giải quyết nhầm lẫn đó, hãy cùng mình tìm hiểu sự khác biệt giữa chúng và cách chính xác chúng hoạt động nhé !**

### Vấn đề của ``Function Component``
``Function component`` ra đời là món quà tuyệt vời cho các dev React phải không nào :kissing_heart: Sự kết hợp của chúng với các ``hook`` cho phép tái sử dụng code và linh hoạt hơn ``Class component``. Tuy nhiên nó có 1 vấn đề: Một ``function component`` giống như một hàm ``render()`` trong ``class component``, là chức năng sẽ render lại khi ``state/props`` thay đổi.

Điều đó có nghĩa:

*  Nếu một function được gọi bên trong một ``component``, nó sẽ được đánh giá lại, lặp đi lặp lại sau mỗi lần ``render``.
*  Nếu một function được tạo bên trong một component và được xem như một component con, thì nó sẽ được tạo lại, điều đó con trỏ sẽ thay đổi, khiến những thành phần con render lại hoặc gọi lại những function không cần thiết.

Để giải quyết những sự cố về hiệu suất của app xảy ra. React cung cấp cho chúng ta 2 hook: ``useMemo`` và ``useCallback``.

### useMemo
Hãy bắt đầu với vấn đề đầu tiên và xem cách nào để chặn đánh giá lại những function không cần thiết.

Trong demo sau, chúng ta có một component với 2 states: 1 state lưu trữ một number, 1 state lưu trữ một boolean.

Chúng ta cần làm một vài tính toán cho state., vì vậy cần gọi hàm ``plusFive``  và render ra kết quả.

```
const plusFive = (num) => {
  console.log("I was called!");
  return num + 5;
};
export default function App() {
  const [num, setNum] = useState(0);
  const [light, setLight] = useState(true);
  const numPlusFive = plusFive(num);
  return (
  ...
```

{@embed: https://codepen.io/mrhunq-phan/pen/rNeqRJj}

Nếu bạn mở console, bạn sẽ thấy function ``plusFive`` được gọi khi click vào ``Update Number``  (set một giá trị mới cho biến number) , hoặc ``Toggle the light`` để thay đổi boolean (chú ý: nó không liên quan gì đến update number)

Vậy làm thế nào để chặn điều này xảy ra?  Bằng cách ghi nhớ lại (memoizing)  ``plusFile``, cho đến khi có một giá trị number mới thì lúc đấy mới gọi ``plusFile``, ngay lập tức chúng ta sẽ nhận được kết quả

```
const numPlusFive = useMemo(() => plusFive(num), [num]);
```

``useMemo`` nhận vào 2 tham số: 1 là function trả về một lời gọi hàm (plusFive), 2 là một mảng phụ thuộc. Chỉ khi nào mảng phụ thuộc thay đổi, thì function mới được gọi. ``useMemo`` sẽ trả về kết quả của việc thực hiện gọi hàm và lưu vào bộ nhớ  để ngăn hàm gọi lại khi sử dụng cùng một mảng phụ thuộc (hay mảng phụ thuộc không thay đổi).

Quay lại Codepen và thay thế dòng lệnh trên, mở console để xem kết quả. hàm plusFive sẽ không goi lại khi toggle ``Toggle the light``

### useCallback

Bây giờ chúng ta đã biết cách ngăn các hàm gọi lại, hãy xem cách chúng ta có thể ngăn các hàm được tạo bên trong các component được tạo lại trên mỗi lần hiển thị (component con được sử dụng trong component cha)

Trong demo dưới đây, chúng ta có một component con ``SomeComp`` , một hàm mà chúng ta đã tạo bên trong component cha ``<App>``.  Lưu ý rằng function ``plusFive`` này đang được sử dụng bên trong hook useEffect và vì nó được liệt kê là phụ thuộc của useEffect nên nó sẽ được gọi lại. Đây sẽ cách chúng ta biết được hàm ``plusFive`` sẽ được gọi ngay cả khi chúng ta thay đổi props/states không liên quan đến đối số phụ thuộc ``num``.

{@embed: https://codepen.io/mrhunq-phan/pen/wvGYOEV?editors=1111}

Để ngăn hàm của chúng ta bị tạo lại và thay đổi con trỏ trên mỗi lần render, chúng ta có thể sử dụng useCallback. React hook này nhận hai tham số: Một hàm và một mảng phụ thuộc.

```
const plusFive = useCallback(() => {
  console.log("I was called!");
  return num + 5;
}, [num]);
```

Hook này cho phép chúng ta bảo toàn hàm và nó sẽ chỉ được gọi lại khi một trong những phần phụ thuộc của nó thay đổi.

{@embed: https://codepen.io/mrhunq-phan/pen/eYZPXaR?editors=1111}

### Chờ đã: Đừng lạm dụng những React hook này!

Trong khi 2 hook này cung cấp giải pháp giải quyết vấn đề của function component, chính vì vậy chúng dễ bị lạm dụng, thậm chí có thể gây hại nhiều hơn.

Ví dụ, chúng ta không ngăn hàm gọi lại cảu một tính toán (giống như demo trên). Chỉ dùng ``useMemo`` khi thất sự phải ngăn chặn gọi lại của một hàm tiêu tốn nhiều tài nguyên hoặc cần nhiều thời gian. Tại sao ? Bởi vì ``useMemo`` lưu trữ các kết quả của việc thực thi hàm vào bộ nhớ, điều này có thể sẽ lớn dần lên và không may nó lại làm giảm hiệu suất ứng dụng của bạn.

Đối với ``useCallback`` thì càng tồi tệ hơn: Khi không dùng ``useCallback`` thì version cũ của hàm sẽ được thu gom lại, nhưng nếu dùng ``useCallback`` nó sẽ được giữ lại ở trong bộ nhớ, trong trường hợp một trong các phần phụ thuộc sẽ hoạt động đúng trở lại để trả về version cũ của hàm đó.

Vậy khi nào nên dùng ``useCallback`` ?  Khi mà bạn cảm thâý thật sự không dùng nó thì hiệu suất của ứng dụng của bạn sẽ rất tồi tệ hoặc kết quả của việc thực thi một hàm không cần thiết. (ví dụ như gọi một API).

### Kết luận

* ``useMemo`` giữ cho một hàm không được thực thi lại nếu nó không nhận được một tập hợp các tham số đã được sử dụng trước đó. Nó sẽ trả về kết quả của một function. Sử dụng nó khi bạn muốn ngăn một số thao tác nặng hoặc tốn kém tài nguyên được gọi trên mỗi lần render.
* ``useCallback`` giữ cho một hàm không được tạo lại lần nữa, dựa trên mảng các phần phụ thuộc. Nó sẽ trả về chính function đó.  Sử dụng nó khi mà bạn muốn truyền fuction vào component con và chặn không cho một hàm nào đó tiêu thời gian, tài nguyên phải tạo lại.

###  Tài liệu tham khảo

Tài liệu có tham khảo: [Sự khác nhau giữa useMemo và useCallback](https://levelup.gitconnected.com/understanding-the-difference-between-usememo-and-usecallback-ec956adb2004)