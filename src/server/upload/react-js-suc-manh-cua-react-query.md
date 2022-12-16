## React-query
Chuyện xảy ra ở 1 công ty M vào 1 ngày đẹp trời, anh leader H gọi thằng cu B ra bảo:

"Trang danh sách này anh thấy đã lấy dữ liệu rồi, lúc vào trang chi tiết xong quay lại sao anh thấy nó lại phải loading lại, chú tìm cách cache dữ liệu lại cho anh để khi anh back lại trang danh sách nếu đã có rồi thì nó không loading nữa nhé !"

Thằng cu B cay lắm, đã thứ 6 rồi mà lại bị dí thêm việc :(.

Thế là không phải nghĩ nhiều, thấy dự án đang có sẵn redux rồi, nó ném luôn đống data vào đó sau khi call api xong,  thêm cái effect check xem dữ liệu trên redux đã có chưa, nếu có rồi thì mang ra dùng còn nếu chưa thì call api lấy data, xong lại đẩy lên redux
Nghe có vẻ hợp lý, nhưng đó đã phải cách cache data tối ưu nhất chưa, mình nghĩ là chưa, có 1 cách đối với mình là tối ưu hơn - React-query.

React-query sẽ xử lý cách phần data cần cache, các trạng thái loading, tự động call lại api, làm mới dữ liệu,...v.v...

> Fetch, cache and update data in your React and React Native applications all without touching any "global state".

## Các ứng dụng của React-query
### Cache data
Khi tạo 1 query cần truyền vào 1 key, các query được phân biệt với nhau dự vào key, tiêp theo thì truyền queryFuntion, cuối cùng là option. [Docs](https://react-query.tanstack.com/guides/queries) :)

```javascript
const getListQuery = useQuery("list-query", callDataApi, {
        cacheTime: Infinity, //Thời gian cache data, ví dụ: 5000, sau 5s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
        refetchOnWindowFocus: false,
    });

const { data } = getListQuery;
```

Ở đây có 2 option cần lưu ý:
- cacheTime: Thời gian data được lưu cache tồn tại. Nếu hết thời gian, giá trị của query tương ứng với key này sẽ là undefined.
- staleTime: Thời gian data trong cache được tính là mới, tức là nếu data query này trong cache được tính là mới thì khi gọi query sẽ không call queryFuntion để lấy dữ liệu cập nhật vào cache nữa. "Còn mới thì gọi api làm gì :)". Mặc định staleTime là 0, tức là cứ dùng query sẽ gọi đến queryFunction.

Thành quả là dù có vào trang chi tiết, khi quay lại trang danh sách vẫn có cache data cũ, đồng thời query vẫn gọi api để cập nhật dữ liệu mới nhất nếu có.

![](https://images.viblo.asia/d976db3a-8f7b-4ae6-a42a-8c3f96d18b62.gif)

### Xử lý các trạng thái loading, fetching
Vẫn là câu chuyện thằng cu B, hôm nay B được anh leader H bảo cache ngon rồi nhưng giờ cần thêm skeleton khi gọi api lần đầu nhìn cho giống facebook với cả youtube, web mình là web "nhớn" mà :).

Thế là B nhanh nhảu làm 1 cái state isLoading, mỗi khi call api B set là true, call xong B set là false, màn nào loading B cũng làm thế.

Nếu sử dụng react-query trường hợp trên sẽ đơn giản hơn rất nhiều.

Query có 2 thuộc tính là isLoading, isFetching. Có thể hiểu đơn giản là isLoading sẽ true khi api được gọi  khi cache không có data, isFetching sẽ là  true khi cache có data nhưng đang gọi queryFunction để cập nhật dữ liệu mới nhất.

```javascript
const getListQuery = useQuery("list-query", callDataApi, {
        cacheTime: Infinity, //Thời gian cache data, ví dụ: 5000, sau 5s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
        refetchOnWindowFocus: false,
        staleTime: 10000,
    });

    const { data, isLoading, isFetching } = getListQuery;
```

![](https://images.viblo.asia/f5c0d469-126d-48ce-ac72-f9c4fbb3243e.gif)

### Giảm thiểu call api, lấy dữ liệu từ cache
Web  đang dùng ngon, 1 ngày a leader H muốn vọc vạch xem bên frontend đang call api thế nào, anh H f12 lên rồi a lại gọi thằng cu B: "Sao anh thấy trang ABC đã gọi api lấy cái metadata này rồi, sao lúc direct qua trang XYZ vẫn gọi lại, dữ liệu này không thay đổi mà dùng rất nhiều, chú xem tối ưu ở các  trang sử dụng đi."

Thằng cu B lại vắt óc suy nghĩ, xong đối với nó global state vẫn là chân ái, nó lại lưu data đó vào reudx, xong lại đi vào từng trang sử dụng làm 1 đoạn code tầm chục dòng check xem redux có chưa, nếu chưa có thì lại call api rồi lưu lên redux.

Để tối ưu xử lý này với react-query, mình tạo 1 hook, xử lý tạo query và trả về query.
```javascript
function useGetList() {

    //....

    const getListQuery = useQuery("list-query", callDataApi, {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        refetchInterval: 
    });

    return getListQuery;
}

export default useGetList;
```

Ở các trang sử dụng chỉ cần dùng hook:
```javascript
const getListQuery = useGetList();

const { data, isLoading, isFetching, refetch } = getListQuery;
```

Khi sử dụng hook này tức là các trang đang query cùng 1 key lấy data từ cache nên nếu data đã có sẽ không bị gọi lại, cách viết cũng ngắn gọn. Ngoài ra có thể làm mới data bằng cách chủ động bằng refetch hoặc [refetchInterval](https://react-query.tanstack.com/reference/useQuery#_top) nếu cần thiết.

Trên đây là những chia sẻ của mình về  react-query.
![](https://images.viblo.asia/2ed2e6e2-1c3b-45e8-a901-bc2176800523.png)