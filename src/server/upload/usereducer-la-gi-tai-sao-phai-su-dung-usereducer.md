# Mở đầu
Cộng đồng ReactJS bây giờ đã không còn ai viết class component nữa, người người nhà nhà đều xài hook vì code ngắn gọn, đẹp, tường minh lại dễ hiểu nữa chứ, nào là useState, useEffect, useMemo, useCallback,...đó là chưa tính còn cả [custom hook](https://viblo.asia/p/custom-hook-la-gi-gAm5yDo8ldb) vô cùng xịn xò nữa. Ngay cả đến thằng Tèo - bạn tui cũng từ fanboy chân cmn chính của class component chuyển thành fangirl của functional component sau khi dùng một thời gian. Tuy nhiên, có một hook rất dễ gây nhầm lẫn cho nhiều bạn mới bắt đầu và cũng ít được ý hơn những thằng phổ biến kia nhưng lại rất xịn xò đó chính là **useReducer**, do khó hiểu và hiện tại không dùng cũng chả thấy vấn đề gì nên Tèo bạn tui đã không thèm ngó ngàng tìm hiểu tại sao cái này được sinh ra cho đến một ngày...Tèo bị bắt fix bug liên quan đến nó
# Nội dung
## 1. useReducer là gì?
Đó giờ không quan tâm thằng useReducer hook nên giờ Tèo phải lên mạng tìm hiểu, sau một hồi tìm hiểu nhưng hổng hiểu nên Tèo thở phào:
<p>Tèo: Ê mày cái thằng useReducer này là sao dị, tao đọc hoài mà cũng không hiểu.</p>
<p>Tui: OK, mày hiểu hook useState rồi đúng không, thấy code phà phà mà, cái này cũng như useState vậy đó có điều cách sử dụng nó rườm rà hơn tí, flow của nó giống như redux thôi.</p>
<p>Tèo: Ủa ủa !?!?! Nó giống thằng useState hả vậy mà tao tưởng nó liên quan đến redux store chứ tại thấy nó có từ "reducer" kìa, tưởng reducer trong redux store chứ @@</p>

## 2. useReducer có liên quan gì tới Redux store hay không?
<p>Tui: Ờ hồi đầu tao cũng tưởng giống mày nhưng không phải nha, cái này nó không liên quan gì đến redux store đâu nha, nó chỉ là một cái hook quản lí state như useState nhưng cách dùng của nó sẽ giống như redux flow vậy đó, có action, reducer các kiểu, hiểu chưa?</p>
<p>Tèo: Hơi khó hiểu đó, có ví dụ nào dễ hiểu hơn không mày?</p>
<p>Tui: OK, viết cái component counter bằng useState đi cho dễ nói</p>

```javascript
function App() {
  const [count, setCount] = useState(0);

  const handleClickIncrease = () => {
    setCount(count + 1);
  };

  const handleClickDecrease = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className="App">
        <h1>Hello {count}</h1>
      </div>
      <div>
        <button onClick={handleClickIncrease}>+</button>
        <button onClick={handleClickDecrease}>-</button>
      </div>
    </>
  );
}
```

<p>Tui: OK, easy quá đúng không, giờ tao sẽ viết lại với useReducer nhé</p>

```javascript
const countReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREASE":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  const handleClickIncrease = () => {
    dispatch({ type: "INCREASE" });
  };

  const handleClickDecrease = () => {
    dispatch({ type: "DECREASE" });
  };

  return (
    <>
      <div className="App">
        <h1>Hello {state.count}</h1>
      </div>
      <div>
        <button onClick={handleClickIncrease}>+</button>
        <button onClick={handleClickDecrease}>-</button>
      </div>
    </>
  );
}
```

<p>Tèo: Ê y chang redux vậy, có action có reducer rồi action type nữa kìa, mà sao xử lí có chút xíu mà phải mệt vậy, giống cầm Đồ Long Đao gọt trái cây quá dị @@</p>
<p>Tui: Thì tao có nói những trường hợp này nên dùng useReducer đâu, tại đang ví dụ cho mày biết useReducer là gì, cách dùng nó như thế nào và đặc biệt không có liên quan đến redux store nha ba =)) Nhưng ngoài thấy nó dài hơn cách dùng useState ra thì mày còn thấy gì nữa</p>
<p>Tèo: uhmmmmm....Ờ được cái nhìn vô actionType INCREASE/DECREASE là biết nó làm gì liền, logic được gom lại 1 nơi trong reducer luôn nên cũng dễ maintain sau này</p>
<p>Tui: Ờ đúng đó, nhưng giờ theo mày hai cái này có khác nhau không? Và nên sử dụng cái nào hơn?</p>
<p>Tèo: Chắc tùy sở thích hả, ai thích xài cái gì thì xài, tao thì tao vẫn thấy useState vẫn ngon nghẻ chắc tao không cần xài cái hook này đâu</p>
<p>Tui: OK vậy giờ coi thêm ví dụ này đi</p>

```javascript
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    setIsError(false);
    callingAPI()
      .then(res => {
        setIsLoading(false);
        setData(res);
      })
      .catch(error => {
        setIsError(error);
      });
  };

  return (
    <div className="App">
      {data.map(item => (
        <Item />
      ))}
      {isLoading && <Loading />}
      {isError && <Error />}
    </div>
  );
}
```

<p>Tui: Giờ mày thấy nó ổn không? Hiện tại data, isLoading, isError đang được tách ra thành 3 cái useState riêng biệt không liên quan gì đến nhau hết và mày phải tự xử lí update value cho từng cái ở từng thời điểm ( bắt đầu, thành công, thất bại), điều này hiện tại không có vấn đề về logic nhưng để ý sâu hơn thì mày sẽ thấy các biến này nó có ảnh hưởng đến nhau tùy theo các trường hợp xảy ra nên ở ví dụ này thử viết lại bằng useReducer coi sao nhé </p>

```javascript
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch({ type: "FETCH_INIT" });
    callingAPI()
      .then(res => {
        dispatch({ type: "FETCH_SUCCESS", payload: res });
      })
      .catch(error => {
        dispatch({ type: "FETCH_FAILURE" });
      });
  };

  return (
    <div className="App">
      {state.data.map(item => (
        <Item />
      ))}
      {state.isLoading && <Loading />}
      {state.isError && <Error />}
    </div>
  );
}
```

<p>Tui: Thấy giờ mọi thứ nó đã clear hơn tí nào chưa, logic được đặt trong từng code block của reducer và những state liên quan tới nhau sẽ được liên kết với action tương ứng, nhìn sẽ dễ hiểu hơn. Khi một dự án được scale up lên thì nếu các phần logic sử dụng useState được đặt ở nhiều nơi khác nhau sẽ khiến mọi thứ phức tạp hơn, và khó maintain hơn, ví dụ cho việc đó đó là debug code logic theo code block (reducer) dễ dàng hơn nhiều so với việc debug logic ở nhiều nơi. Theo như sếp robinwieruch thì...</p>

> It is not only a state object's complexity and the number of state transitions that are important, but how properties fit together within the context of an application's business logic also must be considered when managing state efficiently

## 3.Vậy thì khi nào sử dụng?
<p>Tèo: Ờ thấy cũng có lý, sau này nếu còn có filter, pageIndex, pageSize các kiểu thì đúng là useState sẽ ngày càng làm source code phình ra mà dễ gây lỗi cũng như debug hơn nhiều. Nhưng sao mình biết được lúc nào nên sử dụng useState, lúc nào nên sử dụng useReducer mạy?</p>
<p>Tui: Cái này thì tao không sure nhưng theo kinh nghiệm của sếp robinwieruch thì việc quyết định xài cái nào vào thời điểm nào là phụ thuộc mỗi người, nó không hoàn phân biệt rõ ràng lúc này nên dùng cái này hay lúc kia nên dùng cái kia mà có thể custom linh động để fit với nhu cầu của mình là cái gì, theo như sếp chia sẻ thì những case như thế này nên xài useState nè:</p>

><p>A) JavaScript primitives as state (state là các kiểu dữ liệu cấu trúc sơ khai(undefined, boolean, number, string, bigInt, Symbol)</p>
><p>B) simple state transitions (các cái thay đổi thay đơn giản)</p> 
><p>C) business logic within your component (code logic ở trong component luôn)</p>
><p>D) different properties that don't change in any correlated way and can be managed by multiple useState hooks (các state khác nhau không phụ thuộc lẫn nhau và có thể quản lí bằng nhiều useState riêng biệt)</p>
><p>E) state co-located to your component (các state dính kèm với component, cái này ví dụ như là hàm onChange của Input nè)</p>
><p>F) a small application (but the lines are blurry here)</p>

<p>Tui: Còn những case như thế này nên xài useReducer nè:</p>

><p>A) JavaScript objects or arrays as state (state là object hoặc array)</p>
><p>B) complex state transitions (các thay đổi state phức tạp hơn)</p> 
><p>C) complicated business logic more suitable for a reducer function (có business logic phức tạp thì nên bỏ logic vô reducer để tập trung lại một chỗ)</p>
><p>D) different properties tied together that should be managed in one state object (các state liên quan/ phụ thuộc lẫn nhau thì nên được quản lí bằng một state object)</p>
><p>E) the need to update state deep down in your component tree</p>
><p>F) a medium-sized application (NB: the lines are blurry here)</p>
><p>G) need for an easier time testing it</p>
><p>H) need for a more predictable and maintainable state architecture (cái này thì quá dễ thấy rồi)</p>

# Tóm lại
Qua vài ví dụ trên thì mình hi vọng các bạn có thể phân biệt useState và useReducer khác nhau như thế nào và khi nào thì nên sử dụng để source code ngày càng xịn hơn :v, cám ơn mọi người đã đọc bài của mình <3

Các nguồn tham khảo:
- https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext
- https://www.robinwieruch.de/react-usereducer-vs-usestate