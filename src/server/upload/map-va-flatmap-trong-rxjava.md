![alt](https://images.viblo.asia/cd65313b-bbfe-44b0-8bbb-0077544e8390.jpg)

Như chúng ta đã biết thì RxJava là một trong những thư viện quan trọng và phổ biến nhất đối với các lập trình viên Android, đơn giản là bởi vì nó làm cho cuộc sống của chúng ta trở nên dễ dàng hơn trong lập trình. Chúng ta sử dụng RxJava để xử lý đa luồng, quản lý các tác vụ nền,  giảm thiểu tối đa việc tạo ra các callback để xử lý từng kết quả trả về. Với sự trợ giúp của RxJava thì hầu như mọi vấn đề, trường hợp xảy ra đều có thể giải quyết.

### Các thành phần của RxJava
![](https://images.viblo.asia/921e8611-ea70-465b-9e71-b8c669421f10.png)

 Ở trên chúng ta có thể hiểu đơn giản là Observable chính là thằng nói, thằng phát ra các item, Operator là thằng chuyển đổi các item phát ra đó, còn Observer là thằng lắng nghe, nhận các thông báó, các item mà được phát ra bởi thằng Observable.
 
RxJava có rất nhiều Operator. Để sử dụng chúng một cách chính xác thì chúng ta phải biết về chúng. Ở đây, chúng ta sẽ cùng thảo luận về 2 operator **Map** và **Flatmap**.
 
 ### Map 
 - Map sẽ chuyển đổi các item được phát ra bởi 1 Observable bằng cách áp dụng mỗi hàm cho mỗi item, dễ hiểu hơn thì nó dùng để chuyển đối 1 item thành 1 item khác.
 
 ![](https://images.viblo.asia/cd6a8a8c-8398-4588-bed1-80c62b17062f.png)
 
### FlatMap
- FlatMap sẽ chuyển đổi các item phát ra bởi một Observable thành các Observable khác

![](https://images.viblo.asia/90bec131-bccc-43fc-8baf-ffca0233698a.png)

Vậy nên điểm khác biệt chính giữa Map và FlatMap là FlatMap bản thân nó sẽ trả về một Observable. Nó được dùng để map trên các hoạt động bất đồng bộ.

***Very important: FlatMap is used to map over asynchronous operations.***

### Ví dụ

Hãy cùng xem đoạn code sau:


    getUserObservable()
        .map(new Function<ApiUser, User>() {
            @Override
            public User apply(ApiUser apiUser) throws Exception {
                User user = new User(apiUser);
                return user;
            }
        })
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(getObserver());
       
       
Ở đây Observable nó sẽ đưa cho chúng ta 1 đối tượng ApiUser và chúng ta sẽ convert đối tượng ApiUser thành đối tượng User bằng cách sử dụng toán tử Map. Đúng như lý thuyết ở trên thì Map sẽ nhận vào 1 item (ApiUser) và sẽ chuyển đổi thành 1 item khác (User).



    getUserObservable()
        .flatMap(new Function<ApiUser, ObservableSource<UserDetail>>() { 
            @Override
            public ObservableSource<UserDetail> apply(ApiUser apiUser) throws Exception {
                return getUserDetailObservable(apiUser);
            }
        })
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(getObserver());
        
 Ở đây chúng ta nhận vào 1 đối tương ApiUser và sau đó chúng ta sẽ tiến hành thực hiện một network call để nhận UserDetail cho từng ApiUser đó bằng việc sử dụng phương thức getUserDetailObservable(apiUser), kết quả của phương thức này sẽ trả về 1 observable. Như đã biết FlatMap bản thân nó sẽ trả về 1 Observable và getUserDetailObservable chính là 1 hoạt động bất đồng bộ (asynchronous operation).
 
 ### Khi nào sử dụng Map và FlatMap?
 
Map: chỉ phát ra 1 item, sử dụng khi muốn chuyển đối 1 item đã phát ra thành 1 item khác. Ví dụ convert 1 chuổi String -> Interger.

FlatMap: 
- Có thể phát ra 0 hoặc nhiều item. Ví dụ FlatMap sẽ nhận vào 1 list, array và nó sẽ  phát ra từng item cụ thể trong list, array đó. 
- Trường hợp khác khi người dùng đăng nhập, chúng ta đồng thời muốn request thêm thông tin của người dùng thông qua  id cụ thể của người dùng đó thì đơn giản trong FlatMap này chúng ta chỉ cần tạo thêm 1 Stream (Observable) khác để request dữ liệu thông qua id đó
- Ngoài ra FlatMap còn được dùng để handle các Exception thông qua các hàm như Observable.error bởi vì bản thân thằng Flatmap này nó đã trả về 1 Observable.

### Tổng kết
Trên đây là một số nội dung mình sơ lược về Map và FlatMap, nếu có gì sai xót mong các bạn góp ý.

Nguồn tham khảo: https://medium.com/mindorks/rxjava-operator-map-vs-flatmap-427c09678784