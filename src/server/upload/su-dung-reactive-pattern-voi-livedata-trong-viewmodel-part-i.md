# I, Mở đầu
* **Reactive pattern** là 1 chủ đề quan trọng và được bàn luận nhiều ở Android trong những năm gần đây.
* Nó được sử dụng và đưa ra bàn bạc nhiều trong các hội thảo. Ví dụ điển hình của nó chính là **ReactiveX (Rx)**.
* **Reactive programming** là mô hình liên quan tới cách thức truyền dẫn và lan truyền dữ liệu, làm cho việc hiển thị dữ liệu và tương tác với các thành phần trở nên dễ dàng (cơ chế bất đồng bộ). 
*  Ngoài Rx, một công cụ khác cũng implement reactive pattern là **LiveData**.
*  **LiveData** được Android giới hiện trong bộ **architecture component**.
*  **LiveData** là một observable và nhận biết vòng đời của observer.
*  Kết hợp việc sử dụng **LiveData** và **ViewModel** giúp bạn dễ dàng thực hiện kiến trúc **MVVM** trong Android. 
*  Nhiều bạn sử dụng MVVM cùng với architecture component, nhưng không hiểu tác dụng của **LiveData**, **ViewModel** là gì và cách implement nó 1 cách chính xác.
*  Trong bài viết này, mình sẽ nêu ra các vấn đề và việc sử dụng **LiveData** cùng **ViewModel** sao cho hợp lý.

# II, Mục đích của LiveData
*  Trong Android, các View (Activity, Fragment) có thể bị destroy bất cứ thời điểm nào. Nếu bạn không hiểu lý do tại sao mình nói như thế thì hãy tham khảo về **process and application lifecycle**: https://developer.android.com/guide/components/activities/process-lifecycle
*  Do đó, nếu bạn giữ bất cứ 1 reference nào của View trong 1 class khác + nó đã bị destroy => sẽ gây ra **leak** hoặc **NullPointerException**.
*  **LiveData** được thiết kế để kết nối giữa View (Activity, Fragment) và ViewModel.
*  Sử dụng **LiveData**, kết nối này sẽ rất an toàn: 
    *  Chỉ khi View ở trạng thái active, data mới được update.
    *  **ViewModel** sẽ không dữ 1 reference nào của **View** mà sẽ được kết nối qua **LiveData** thông qua **onChange()** callback=> sẽ không sợ **leak** or **NullPointerException**.

![](https://images.viblo.asia/efc5a463-d8cd-41fa-90fa-0ba3ae2409f6.png)
*  Thông thường, bạn cũng không cần lo lắng về việc hủy kết nối giữa **View** và **ViewModel**.

# III, Sử dụng LiveData bên ngoài ViewModel
*   **LiveData** observable sử dụng rất tốt trong mối quan hệ giữa **View** và **ViewModel**.
*   Bạn có thể sử dụng nó để theo dõi các thành khác của app và tận dụng **lifecycle aware**:
    *   Observe thay đổi trong **SharedPreferences**.
    *   Observe document hoặc collection trong **Firestore**.
    *   Observe current user cùng với 1 Authentication SDK như **FirebaseAuth**.
    *   Observe 1 query trong **Room** (cái này quen thuộc rồi),
*  Ưu điểm của mô hình là tất cả các component của app được liên kết với nhau, UI được update 1 cách tự động khi data bị thay đổi.
*  **Hạn chế**: Do mục đích thiết kế ban đầu là đơn giản nên LiveData cũng có những điểm, nó không đi kèm các công cụ kết hợp luồng dữ liệu hoặc quản lý thread như **Rx**.
*  Nếu bạn chưa biết mô hình cơ bản của 1 app sử dụng LiveData (architecture component) mà Google suggest thì nó đây:

![](https://images.viblo.asia/3f7fcb5c-f56f-4109-8652-2e1c8094303a.png)
*  Để truyền dữ liệu giữa các component, chúng ta cần 1 cách để map và combine chúng.
*  **MediatorLiveData** (1 class custom của LiveData) được thiết kế để combine data cùng với class helper **Transformations** có 2 phương thức chính là: **Transformations.map** và **Transformations.switchMap**.
*  Hãy đi tìm hiểu cách thực hiện của của **Tranformations** và **MediatorLiveData**.

    **1. Transformation.map (One-to-one static)**
![](https://images.viblo.asia/900c6f4e-5e27-4604-8176-090e049cc67b.png)
*  Trong ví dụ trên, **ViewModel** chỉ chuyển dữ liệu từ **repository** về **View**, chuyển dữ liệu vào trong UI. Bất cứ khi nào repository có dữ liệu mới, ViewModel sẽ sử dụng **Tranformations.map**:

![](https://images.viblo.asia/dc834173-35c8-4809-97f3-1a141f0042e9.png)
*  Method **repository.getDataForUser()** return 1 **LiveData** theo dõi data của **User**. 
*  Thông qua **Transformations.map** nó sẽ biến đổi thành **viewModelResult** LiveData theo yêu cầu hiển thị data cho UI.

    **2. Transformations.switchMap - One-to-one dynamic**
![](https://images.viblo.asia/042f0d33-cb4f-4fab-bb03-66d4a2df0ebb.png)
*  **Ví dụ**: Bạn đang theo dõi 1 **UserManager** và bạn cần có **User** trước khi bạn bắt đầu theo dõi **repository**. Bạn không thể khỏi tạo 

![](https://images.viblo.asia/9b154486-8e22-4416-a91a-3ebd9984fe79.png)
*  Trong **UserManager** có 1 **LiveData** variable là **user**. Trong **Repository**, method **getDataForUser(User)** return 1 LiveData theo dõi data của User.
    
    **3. MediatorLiveData - One-to-one dependency**
*  MediatorLiveData cho phêp bạn kết hợp nhiều LiveData nguồn lại thành 1 LiveData đích duy nhất.
*  Nó sẽ thay đổi value khi bất kì 1 LiveData nguồn thay đổi value.

![](https://images.viblo.asia/a4d14100-1035-4bc9-a0fb-5bdd67c7d061.png)
*  Trong ví dụ trên, **liveData1** và **liveData2** là 2 LiveData nguồn, **result** là LiveData đích. 
*  Mỗi lần **value** của **liveData1** hay **liveData2** thì sẽ được set **value** cho **result**.

# IV, Tổng kết
*  Bài viết mình dựa trên tham khảo trên medium và hiểu biết của mình. 
*  Vì bài viết khá dài nên mình sẽ chia làm 2 phần.
*  Link tham khảo: https://medium.com/androiddevelopers/livedata-beyond-the-viewmodel-reactive-patterns-using-transformations-and-mediatorlivedata-fda520ba00b7
*  **Happy coding**.