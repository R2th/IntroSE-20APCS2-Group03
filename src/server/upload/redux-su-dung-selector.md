Khi học qua `Redux` có thể bạn đã từng nghe "giữ state đơn giản nhất, và sử dụng nó khi cần', một phần trong bài học đó bạn cũng có thể đã sử dụng đến `redux selector`.

Một `selector function` nhận vào `input` là `state` và trả về một giá trị mong muốn dựa trên `state` đó. ví dụ
```js
const selectEntities = state => state.entities;

function selectItemIds(state) {
    return state.items.map(item => item.id);
}

const selectSomeSpecificField = state => state.some.deeply.nested.field;

function selectItemsWhoseNamesStartWith(items, namePrefix) {
     const filteredItems = items.filter(item => item.name.startsWith(namePrefix));
     return filteredItems;
}
```
Bạn có thể sử dụng `selector` ở khắp mọi nơi miễn sao nó là một `component`, một `selector` thường bắt đầu với `prefix` **get[something]** hoặc **select[something]** hoặc có thể là một `suffix` **[something]Selector**.

Việc render:
- Khi một `action` được `dispatch`, `useSelector` sẽ thực hiện so sánh giữa kết quả trước đó và kết quả hiện tại, nếu khác, component bị force để `re-render`.
- `useSelector` sử dụng so sánh `===` chứ không dùng phương pháp `shallow compare`

- Lý do sử dụng `useSelector`:
     + Tái sử dụng, `selector` có thể được sử dụng ở nhiều nơi, nhiều `component` khác nhau mà không cần khai báo lại
    + Tinh gọn, chúng ta có một `state` `car` chứa `name`, `brand`, `year`, nếu muốn lấy `brand` thì chỉ cần selector `getBrandCar` là dễ hiểu
    + Cập nhật, khi `structure` của `redux store` thay đổi, chúng ta chỉ cần cập nhật lại `selector` là xong
    ```js
    // Previous
    ...
    store = {
        car: {id: 1, brand: "Vinfast", name: "Lux A", year: "2019"}
    }
    // selector
    export const getCarBrand = state => state.car.brand

    //==> After
    ...
    store = {
        car: {id: 2, company: "Vinfast", name: "Lux A", year: "2019"}
    }
    //selector
    export const getCarCompany = state => state.car.company
    ```

**Sử dụng:**
    
   Vì `selector` sử dụng phương thức so sánh "==="  nên nếu trả về `array`, `object` thông qua việc tính toán thì component sẽ bị `trigger re-render`. Trong lúc `re-render` cho dù `data` không thay đổi, thì hàm `selectFilteredSortedTransformedData` vẫn bị gọi lại:
```js
const selectFilteredSortedTransformedData = state => {
    const filteredData = expensiveFiltering(state.data);
    const sortedData = expensiveSorting(filteredData);
    const transformedData = expensiveTransformation(sortedData);
    return transformedData;
}
```
Cách giải quyết vấn đề, sử dụng [reselect](https://github.com/reduxjs/reselect):

```js
const selectSomeData = state => state.someData;

    const selectFilteredSortedTransformedData = createSelector(
        selectSomeData,
        (someData) => {
             const filteredData = expensiveFiltering(someData);
             const sortedData = expensiveSorting(filteredData);
             const transformedData = expensiveTransformation(sortedData);

             return transformedData;
        })
```

**Lưu ý:**
- Nếu `selector` có `input` là 1 `prop` của `component` hãy đưa `selector` ra ngoài `component`
    ```js
    ...
    const selectCar = (state, carId) => cars.find(car => car.id === carId);

    const selectCarById = createSelector(
      [selectCar],
      car => expensiveTransformation(car)
    );

    export const CarDetails = ({ carId }) => {
      const car = useSelector(state => selectCarById(state, carId));
      return <div>{car.name}</div>
    };

    ```
 - Nhiều `instance` của `component`: Khi một `selector` được sử dụng trong nhiều `instance` của một `component` và cũng phụ thuộc vào `prop`, VD:
    ```js
    <CarDetails carId={1}>
    <CarDetails carId={2}>
    ```
    Điều ta cần làm bây giờ là hãy chắc chắn mỗi `instance component` có một `instance selector` riêng biệt, như ví dụ ở trên thì không đúng vì 2 `instance` đều trỏ dùng chung  `instance selector`.

    Giải pháp, sử dụng `useMemo` 

    ```js
    ...
    const selectCar = (state, carId) => cars.find(car => car.id === carId);

    const selectCarById = createSelector(
      [selectCar],
      car => expensiveTransformation(car)
    );

    export const CarDetails = ({ carId }) => {
      const selectCarMemo = useMemo(selectCarById, [])
      const car = useSelector(state => selectCarMemo(state, carId));
      return <div>{car.name}</div>
    };
    ```

    Và bây giờ mỗi instance của `CarDetails` sẽ có một instance của `selector` khác nhau