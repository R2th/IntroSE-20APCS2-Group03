# Vấn đề
* Vấn đề chung đặt ra là chúng ta muốn đợi quá trình cập nhật trạng thái kết thúc và làm điều gì đó sau đó. Thật không may là chúng ta không thể viết mã tuần tự, bởi vì mọi trạng thái cập nhật là không đồng bộ.
* Trong react "cũ", để xử lý chúng ta có thể chỉ cần truyền một cuộc gọi lại. Như ví dụ sau, chúng ta sẽ thấy trong một **class component** có chứa các bộ lọc cho chế độ xem danh sách bài viết:
```
class FilterSidebar extends React.Component {
  constructor(){
    this.state ={
      filters: {},
      articles: []
    }
  }

  fetchArticles = async () => {
    const fetchedArticles = await API.getArticles(this.state.filters);
    this.setState({articles: fetchedArticles})
  }

  reset = () => {
    this.setState({filters: {}}, this.fetchArticles);
  }

  setColorFilter = (color) =>  {
    this.setState(state => ({filters: {...state.filters, color}));
  }

  // các hàm filter khác và hàm render...
}

```
* **fetchArticles**: lấy dữ liệu các bài viết từ API service dựa trên **filters** của state.
* **reset**: xóa tất cả **filters** và sau đó tìm nạp lại dữ liệu các bài viết, bằng cách truyền **fetchArticles** dưới dạng **callback** trong hàm **setState**. Điều này sẽ đảm bảo rằng trạng thái của **filters** được xóa trước khi gọi **fetchArticles**.
* **setColorFilter**: đặt **filter** cho các **articles** có một màu được chỉ định (truyền vào dưới dạng tham số).
* Sử dụng **functional components** sẽ hơi khác một chút:
```
const FiltersSidebar = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchArticles = async () => {
    const fetchedArticles = await API.getArticles(filters);
    setArticles(fetchedArticles)
  }

  const reset = () => {
    setFilters({});

    // fetchArticles sẽ sử dụng trạng thái cũ của "filters"
    fetchArticles();
  }

  const setColorFilter = (color) =>  {
   setFilters(currentFilters => ({...currentFilters, color}));
  }

  // các hàm filter khác và hàm return...
}
```
* Vấn đề ở đây là bộ **setter**, được trả về bởi **useState** (ở đây **setFilters**), không cho phép chúng ta truyền một hàm **callback** làm đối số thứ hai. Nhưng trong trường hợp này, chúng ta có thể sử dụng **useEffect** và **useRef** để xử lý vấn đề:
```
const FiltersSidebar = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const resettingRef = useRef(false);

  const fetchArticles = async () => {
    const fetchedArticles = await API.getArticles(filters);
    setArticles(fetchedArticles)
  }

  const reset = () => {
    resettingRef.current = true;
    setFilters({});
  }

  useEffect(() => {
    if(resettingRef.current){
      resettingRef.current = false;
      fetchArticles();
    }
  },[filters])

  // ...
}
```
* Sử dụng hai hàm này tuy trông hơi xấu nhưng ít nhất nó hoạt động ...
* Nhưng điều gì sẽ xảy ra nếu logic **filters** trở nên phức tạp hơn nhiều và chúng ta muốn trích xuất logic **filters** trong custom hook:
```
const useStringFilter = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  // có các logic phức tạp khác

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    setValue,
    reset
  }
}
```
* Sau đó, thành phần của chúng ta có thể trông như thế này:
```
const FiltersSidebar = () => {
  const [articles, setArticles] = useState([]);

  const colorFilter = useStringFilter();
  const nameFilter = useStringFilter();
  const releaseDateFilter = useDateFilter();

  const fetchArticles = async () => {
    const filters = {
      color: colorFilter.value,
      name: nameFilter.value,
      releaseDate: releaseDateFilter.value
    }
    const fetchedArticles = await API.getArticles(filters);
    setArticles(fetchedArticles)
  }

  const reset = () => {
    colorFilter.reset(); // sẽ chạy quá trình cập nhật trạng thái bên trong custom hook
    nameFilter.reset(); // sẽ chạy quá trình cập nhật trạng thái bên trong custom hook
    releaseDateFilter.reset(); // sẽ chạy quá trình cập nhật trạng thái bên trong custom hook

    // fetchArticles sẽ lấy các giá trị filters cũ
    fetchArticles();
  }
}
```
* **Làm gì bây giờ?**
* Không có cách nào đơn giản nữa, chúng ta không thể sử dụng **useEffect** và **useRef**, bởi vì chúng ta cần đợi nhiều bản cập nhật trạng thái được hoàn thành. Và đó chính xác là vấn đề thực tế!
# Giải pháp
* Với một custom hook, mà cụ thể ở đây là **useStateWithPromise**, vấn đề này có thể được giải quyết:
```
const useStateWithPromise = (initialState) => {
  const [state, setState] = useState(initialState);
  const resolverRef = useRef(null);

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state);
      resolverRef.current = null;
    }
    /**
     * Vì một trạng thái cập nhật có thể được kích hoạt lại chính xác cùng với một trạng thái
     * nên nó không đủ để chỉ định state là một phụ thuộc duy nhất của useEffect
     * đó là lý do tại sao resolverRef.current cũng là một phụ thuộc, bởi vì nó đảm bảo
     * hàm handleSetState đã được gọi trong lần render trước
     */
  }, [resolverRef.current, state]);

  const handleSetState = useCallback((stateAction) => {
    setState(stateAction);
    return new Promise(resolve => {
      resolverRef.current = resolve;
    });
  }, [setState])

  return [state, handleSetState];
};
```
* Nó không quan trọng để hiểu đầy đủ về hook này. Nhưng những gì bạn nên hiểu là những gì **useStateWithPromise** trả về, giống như **useState** trả về một **getter** và **setter** với một sự khác biệt nhỏ quan trọng:
**setter** trả về a **Promise**, mà chúng ta có thể await!
* Bây giờ, chúng ta có thể thay thế các câu lệnh **useState** trong custom hook bằng **useStateWithPromise**:
```
const useStringFilter = (initialValue = "") => {
  const [value, setValue] = useStateWithPromise(initialValue);

  const reset = () => {
    // sẽ trả về một promise bao gồm trạng thái được cập nhật
    return setValue(initialValue);
  }

  return {
    value,
    setValue,
    reset
  }
}
```
* Và sau đó, cuối cùng chúng ta có thể **await** các trạng thái cập nhật:
```
const FiltersSidebar = () => {
  // ...

  const reset =  async () => {
    // đợi cho các trạng thái được cập nhật hoàn toàn
    await Promise.all([
      colorFilter.reset(),
      nameFilter.reset(),
      releaseDateFilter.reset()
    ]);

    // fetchArticles sẽ vẫn sử dụng các filters cũ
    fetchArticles();
  }

  // ...
}
```
* Việc đọc mã **Javascript** thuần túy (không có **react**), reset chỉ là hàm đặt bên trong một hàm khác (**component**). Vì vậy, mỗi khi hàm được gọi là (trong **react**: các chức năng được **rerendered**), **reset** sẽ là một hàm mới với một tham chiếu mới. Sau khi chúng ta **await** trạng thái cập nhật với **Promise.all**, **reset** sẽ vẫn trỏ đến cùng tham chiếu **fetchArticles** cũ, nghĩa là vẫn trỏ đến các trạng thái cũ (**filters**). Nhưng trong các phiên bản gần đây, khi gọi **reset** thì **fetchArticles** sẽ trỏ đến trạng thái mới.
![](https://images.viblo.asia/5ba2fd8c-80ce-43ab-8772-f15b717c28c2.png)

* Với một bổ sung thuộc tính trạng thái , tại đây **resetted**, điều này có thể được khắc phục:
```
const FiltersSidebar = () => {
  // ...
  const [resetted, setResetted] = useState(false)

  useEffect(() => {
    if(resetted){
      fetchArticles();
      setResetted(false);
    }
  },[resetted]);

  const reset =  async () => {
    await Promise.all([
      colorFilter.reset(),
      nameFilter.reset(),
      releaseDateFilter.reset()
    ]);

    setResetted(true);
  }

  // ...
}
```
* Bây giờ **setResetted(true)** sẽ kích hoạt lại render component và nó đảm bảo rằng lệnh **fetchArticles** gọi bên trong hàm **useEffect** sẽ sử dụng trạng thái mới nhất cho lệnh gọi API.
# Bàn luận giải pháp
* Khi thực hiện, **useStateWithPromise** thực sự là giải pháp hoàn hảo và tại sao không có giải pháp được tích hợp sẵn nào cho điều này trong react? Nhưng chúng ta nên thực sự hiểu tại sao react không bao gồm chức năng như vậy:
* Nó chỉ đơn giản là không phù hợp với thiết kế chung của các thành phần chức năng!
    * Khi bạn sử dụng các **class component**, bạn làm việc rất nhiều với các tham chiếu có thể thay đổi (ví dụ: **this.state** tham chiếu liên tục được cập nhật bởi hàm **this.setState**). Nhưng đó là một mô hình chống đối với các **functional component**, bởi vì ở đây bạn luôn cố gắng làm việc với dữ liệu bất biến và có lý do cho điều đó:
* Các tham chiếu có thể thay đổi có thể gây ra các tác dụng phụ không mong muốn!
    * Nếu trạng thái của bạn có kiểu không phải nguyên thủy (ví dụ: một đối tượng hoặc mảng), bạn nên tạo các tham chiếu mới thay vì giữ nguyên cũ:
```
const MyComponent = () => {
  const [immutableData, setImmutableData] = useState({a: "a", b: "b"});
  let [mutableData, setMutableData] = useState({a: "a", b: "b"});


  const setNewData = () => {
    // tốt
    setImmutableData({a: "new a", b: "new b"})

    // xấu
    mutableData.a = "new a";
    mutableData.b = "new b";
    setMutableData(mutableData)
  }

  useEffect(() => { console.log("immutable data changed") }, [immutableData])

  // hàm console sẽ không bao giờ chạy vì mutableData luôn tham chiếu đến tham chiếu cũ
  useEffect(() => { console.log("mutable data changed") }, [mutableData])

  return (
    <>
      <ChildComponent data={immutableData} />
      {/**
        * thay đổi mutableData mà không sử dụng state setter (như mutableData.a = "new a")
        * có thể gây ảnh hưởng không mong muốn, bởi vì ChildComponent sẽ không được render lại
        */}
      <ChildComponent data={mutableData} />
    </>
  )
}
```
* Quay lại ví dụ trước thì:
    * mỗi lần cập nhật trạng thái (ví dụ **reset** hoặc **filter**) sẽ render lại
    * mỗi lần **render** lại sẽ tạo một tham chiếu mới cho **reset** và **fetchArticles**
    * mỗi tham chiếu **fetchArticles** sẽ trỏe đến một trạng thái bất biến khác
    * sau khi **await** trong **reset**, lời gọi **fetchArticles** sẽ sử dụng trạng thái cũ, bởi vì nó là phiên bản cũ của **fetchArticles**
* Vì vậy, vấn đề chung là chúng ta có nhiều phiên bản **fetchArticles** (sau mỗi lần kết xuất), tất cả đều trỏ đến các trạng thái khác nhau, bởi vì các trạng thái trong các **functional component** là/phải là bất biến.
# Kết luận
* Có một lý do tại sao react không triển khai tính năng này cho các thành phần chức năng.Trong ví dụ của bài viết này, vấn đề thực tế là chúng ta có nhiều trạng thái trong nhiều hook nhưng không thể đặt lại chúng dễ dàng cùng một lúc (chúng ta cần gọi **reset** cho mỗi **filter**). Nếu trạng thái của tất cả các **filters** ở cùng một nơi, việc đặt lại tất cả chúng cùng nhau sẽ dễ dàng hơn nhiều. Một cách tiếp cận khác sẽ là lưu trữ các giá trị khởi tạo trong một tham chiếu, do đó bạn thậm chí không cần phải đợi trạng thái được cập nhật.
* Nếu bạn có thời gian và khả năng xây dựng kiến trúc của ứng dụng của mình, bạn thực sự nên nghĩ đến việc sử dụng **useStateWithPromise**.
* Nguồn tham khảo: [https://ysfaran.github.io/blog/post/0002-use-state-with-promise/](https://ysfaran.github.io/blog/post/0002-use-state-with-promise/)