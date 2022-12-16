## Mở đầu
Khi làm việc với **NuxtJS** chắc hẳn chúng ta đều sẽ nghe thấy đâu đó hai khái niệm này là **fetch** và **asyncData**. Vậy hai phương thức này nó giống nhau và khác nhau như nào? Khi nào nên sử dụng từng phương thức cho phù hợp.
Nên trong bài viết này mình sẽ tìm hiểu rõ ràng hơn về 2 phương thức này, để xem chúng hoạt động ra sao.

![](https://images.viblo.asia/342468e0-6514-4fe9-8f13-e3fd2278fdea.png)

## Nội dung
### Giống nhau giữa hai phương thức
Hai phương thức này giống nhau về cách sử dụng đó là cho phép xử lý dự kiện bất đồng bộ và nhận kết quả trả về và có một tham số đầu vào là context (trong context có lưu trữ các biến store, params, isDev,…)

Cả asyncData và fetch sẽ được kích hoạt ở phía server trong quá trình initial load, sau đó asyncData và fetch sẽ được kích hoạt khi mỗi lần các page tương ứng được gọi.

### fetch()
fetch được sử dụng để lấy dữ liệu thông qua API như asyncData nhưng nó sẽ không trả về dữ liệu mà nó sẽ lưu dữ liệu đó vào trong VueX Store. Sử dụng vuex store làm kho lưu trữ trung tâm.

```JS
export default {
  async fetch ({ store }) {
    await store.dispatch('someAction)
}
```

Có một số lưu ý như sau:
1. Khi gọi API hoặc gội actions trong fetch thì đều phải sử dụng `asynce/await`, nếu không thì sẽ xảy ra các vấn đề về bất đồng bộ không mong muốn.
2. fetch kết thúc đến tận sau mounted, nên dù mounted được hoàn thành thì chưa chắc data sẽ ổn định (data vẫn có thể bị fetch làm thay đổi)
3. fetch có thể sử dụng ở cả page component và các components
4. fetch là hook duy nhất có thể được gọi lại

```JS
methods: {
    onRefreshData() {
        this.$fetch()
    }
}
```
5. Có thể gọi được **this**
6. Cũng nhận **context** đầu vào
7. fetch gọi ở server-side một lần và mọi lúc ở client-side khi route thay đổi.

### asyncData()
Chúng ta có thể tìm thấy trong documentation đoạn sau:
> Sometimes you just want to fetch data and pre-render it on the server without using a store. asyncData is called every time before loading the page component. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method receives the context as the first argument, you can use it to fetch some data and Nuxt.js will merge it with the component data. 

AsyncData là một phương thức cho phép bạn xử lý các hoạt động không đồng bộ trước khi thiết lập dữ liệu page component khi bạn muốn fetch dữ liệu và hiển thị nó ở server-side. Nó được gọi mọi lúc trước khi page component được tải.

Đôi khi chúng ta không cần lưu trữ mà lại chỉ muốn đưa dữ liệu thẳng vào data object trong page component. asyncData() cũng gần như giống với fetch(), nhưng nó lại khác ở chỗ kết quả được return từ asyncData sẽ hợp nhất với data của page component.

Lưu ý là trong method này không thể gọi được **this** bởi vì nó được gọi trước khi khởi tạo page component. 

Có 2 cách để sử dụng asyncData:

**Returning a Promise**
```JS
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
  })
}
```

**Using async/await**
```JS
export default {
    asyncData ({ params }) {
      return axios.get(`https://my-api/posts/${params.id}`).then(res => {
          return { title: res.data.title }
      })
    }
}
```

Tóm lại có một số ý chính cần nên nhớ sau:

1. Gọi trước khi loading page component - Vì vậy điều đó có nghĩa là page sẽ không hiển thị cho đến khi code bên trong method này trả về một số dữ liệu. Tuy nhiên nó cũng sẽ chỉ thực thi trong các page - không thể sử dụng trong các components.
2. Được gọi ở server-side một lần, client-side khi được chuyển đến các trang bằng routes - Có nghĩa là nó sẽ được thực thi một lần khi người dùng truy cập trang của bạn lần đầu tiên và cũng như mỗi khi người dùng chuyển đến các route. Trong thời gian chờ đó thì sẽ hiển thị thành phần load trang.
3. Receives the context - Được hiểu như đối số object  đầu tiên của method, nó rất tiện ích khi là việc với Nuxt.
4. Dữ liệu trả về sẽ hợp nhất với dữ liệu component - Có nghĩa là các thành phần bạn xác định trong data() thì khi sử dụng asyncData sẽ có thể ghi đè các thành phần đó bằng cách return {thành phần}.
## Kết luận
### 1. Nên sử dụng nó ở đâu ?
- asyncData chỉ có thể được sử dụng trong các page component.
- fetch có thể được sử dụng trong bất kỳ component nào.

### 2. Nó được gọi khi nào?
- asyncData trước khi load page component, một lần ở phía server-side và mỗi lần trước khi router được thay đổi ở phía client-side. asyncData được gọi trước fetch.
- fetch trước khi load page component (phía server-side) và khi điều hướng (phía client-side). fetch được gọi sau asyncData - vì vậy nó có thể ghi đè dữ liệu do asyncData trả về. Bạn có thể tắt fetch ở phía máy chủ.

### 3. Quyền truy cập context và this của ứng dụng?
- asyncData lấy context làm đối số đầu tiên và không có quyền truy cập bằng this của component instance. Bạn có quyền truy cập vào Vuex Store.
- fetch có quyền truy cập vào this - instance của component và vào context của this.$nuxt.context. Bạn có quyền truy cập vào Vuex Store.

### 4. Làm cách nào để thiết lập dữ liệu data?
- asyncData trả về object được hợp nhất với data object của page component hiện tại.
- fetch sử dụng được this, vì vậy bạn nên xác định dữ liệu của mình trước đó và chỉ cần ghi đè nó.

### 5. Có sự khác biệt nào cho end-user không?
- asyncData - các trang của bạn sẽ không được hiển thị cho đến khi dữ liệu object được trả về (cả hai bên). Nuxt hiển thị loader component.
- fetch - Ở phía Server-side, trang của bạn sẽ không được hiển thị cho đến khi dữ liệu được trả về, Nuxt hiển thị loader component. Ở phía cilent-side sẽ hiển thị ngay lập tức khi điều hướng (ở phía client) - vì vậy bạn phải quan tâm đến trạng thái load state ở phía mình.

### 6. Khi nào sử dụng asyncData hoặc fetch ?
Mình nghĩ điều đó phụ thuộc vào những gì bạn muốn đạt được và nó cũng liên quan đến trải nghiệm người dùng. Vì khi bạn muốn sử dụng fetch, bạn biết rằng mỗi thay đổi route sẽ hiển thị một page mới ngay lập tức và sau khi fetch được gọi - vì vậy phải quan tâm đến loading state và hiển thị làm sao để tránh trang bị hiển thị trống - mặt khác, khi bạn sử dụng asyncData thì route sẽ không thay đổi cho đến khi dữ liệu được API trả về - vì vậy nếu API chậm, giao diện người dùng cũng sẽ hiển thị chậm.

Hãy nghĩ về 2 trường hợp sử dụng sau:

- Nội dung tùy thuộc vào loại user/device. Nếu phải thiết lập khả năng hiển thị trang dựa trên session/permission của người dùng, thì sẽ sử dụng asyncData vì khi đó sẽ có quyền truy cập dễ dàng vào context của ứng dụng. Và cũng có thể thiết lập chuyển hướng một cách dễ dàng trước khi trang được hiển thị.
- Nội dung lặp lại - Đó có thể là danh sách danh mục sản phẩm mà có phân trang và chúng ta phải tìm nạp dữ liệu mới khi người dùng chọn sang page tiếp theo, khi đó sẽ phải dùng fetch chứ không thể sử dụng asyncData được.

-----

Như vậy qua bài viết này mình cũng đã tìm hiểu được sự giống nhau cũng như khác nhau giữa hai phương thức **fetch** và **asyncData**. Khi nào nên sử dụng phương thức nào. Mong sẽ giúp ích được cho các bạn ít nhiều, cảm ơn các bạn đã đọc bài viết của mình!

Tài liệu tham khảo:
- https://medium.com/@nestsera/nuxtjs-lifecycle-8a822af2c5a8
- https://morioh.com/p/289c1f5b44ee
- https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/
- https://stackoverflow.com/questions/49251437/difference-between-asyncdata-vs-fetch#:~:text=The%20fetch%20method%20is%20used,(only%20for%20page%20components).