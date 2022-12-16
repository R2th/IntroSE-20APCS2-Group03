Có rất nhiều bài viết và ví dụ nói về cấu trúc MVP và có rất nhiều các cách để triển khai mô hình MVP khác nhau. Có một sự nỗ lực không ngừng bởi cộng đồng các dev để áp dụng mô hình này vào ứng dụng Android một cách tốt nhất có thể.

Nếu bạn quyết định áp dụng mô hình này, bạn phải hiểu rằng bạn đang lựa chọn một kiến trúc và phải hiểu rằng codebase, cách tiếp cận các tính năng mới của bạn sẽ thay đổi (để code tốt hơn). Bạn cũng phải biết rằng bạn sẽ phải đối mặt với một số vấn đề trong Android như vòng đời của Activity và bạn có thể tự hỏi bản thân các câu hỏi như sau:
* **Mình có nên save state của presenter?**
* **Mình có nên lưu trữ dữ liệu ở presenter?**
* **Presenter có nên có vòng đời không?**
   
Trong bài viết này, mình sẽ tổng hợp một số hướng dẫn và cách hay nhất để:

* **Giải quyết các vấn đề hay gặp nhất khi sử dụng mô hình này.**
* **Tối đa hoá các lợi ích khi sử dụng mô hình này.**

Đầu tiên, hãy xem qua mô hình này:

![](https://images.viblo.asia/2cfc4b91-35f6-4b61-b9a5-1612a1db5837.png)
   
## Model: 
Là một interface chịu trách nhiệm quản lý dữ liệu. Trách nhiệm của Model bao gồm sử dụng APIs, cache dữ liệu, quản lý databases và tương tự như vậy. Model cũng có thể là một interface để giao tiếp với các module khác cũng chịu trách nhiệm về quản lý dữ liệu. Ví dụ, nếu bạn đang sử dụng Repository Pattern thì model có thể là Repository. 
    
## Presenter:
Presenter là middle-man (lớp trung gian) giữa model và view. Tất cả  logic của bạn đều thuộc về nó. Presenter chịu trách nhiệm **truy vấn model và cập nhật view, phản ứng với tương tác của người dùng khi cập nhật model**.
    
## View:
Nó chỉ chịu trách nhiệm **biểu thị dữ liệu bằng một cách được quyết định bởi Presenter**. View có thể được thực hiện bởi Activities, Fragments và bất kỳ Android widget nào hoặc bất kỳ thành phần nào có thể thực hiện các hoạt động như hiển thị ProgressBar, cập nhật TextView và tương tự.

# 1. Làm cho View bị động:
Một trong những vấn đề lớn nhất của Android là các view (Activities, Fragments,...) là đều không dễ test vì sự phức tạp của Android framework. Để giải quyết vấn đề này, bạn nên thực thi mô hình View bị động. Việc triển khai mô hình này giảm thiểu tối đa các xử lý logic của view bằng cách sử dụng Presenter. Cách này làm tăng khả năng test một cách đáng kể.

VD, nếu bạn có form username / password và một nút “submit" thì bạn ko viết validation logic ở bên trong view mà nên viết ở Presenter. View của bạn chỉ nên lấy username và password của form và gửi chúng đến để xử lý ở Presenter.

# 2. Làm cho Presenter độc lập với framework:
Để cho nguyên tắc trước thực sự hiệu quả (tăng khả năng test), **hãy đảm bảo rằng Presenter không phụ thuộc vào các class của Android**. Chỉ viết Presenter với các Java dependencies bởi 2 lí do: đầu tiên bạn trừu tượng hoá Presenter lên từ chi tiết của việc triển khai (Android framework) và kết quả là bạn có thể viết test cho Presenter dễ hơn, chạy test nhanh hơn ở JVM local của bạn mà không cần một emulator.

> *Nếu mình cần tới một Context thì sao?*

Câu trả lời là gạt nó đi. Trong trường hợp này, bạn nên tự hỏi bản thân mình tại sao cần Context. Ví dụ, bạn có thể sử dụng Context để truy cập shared preferences hoặc resources. Nhưng bạn ko nên làm điều đó trong Presenter: bạn nên truy cập vào resources trong view và truy cập vào preferences trong Model. Đây chỉ là ví dụ đơn giản nhưng hầu hết trong các trường hợp thì nó chỉ là vấn đề của việc làm sai trách nhiệm trong MVP.

# 3. Viết một Contract để mô tả sự tương tác giữa View và Presenter:
Khi bạn bắt đầu viết một tính năng mới, sẽ là một thói quen tốt khi viết Contract đầu tiên. **Contract mô tả sự giao tiếp giữa view và Presenter**, nó giúp bạn thiết kế sự tương tác một cách sạch hơn. 

Ưu tiên sử dụng giải pháp được đề xuất bởi Google trong Android Architecture: nó bao gồm một interface với 2 inner interfaces, một cho View và một cho Presenter:

```Java
    public interface SearchRepositoriesContract {
          interface View {
                void addResults(List<Repository> repos);
                void clearResults();
                void showContentLoading();
                void hideContentLoading();
                void showListLoading();
                void hideListLoading();
                void showContentError();
                void hideContentError();
                void showListError();
                void showEmptyResultsView();
                void hideEmptyResultsView();
          }
          interface Presenter extends BasePresenter<View> {
                void load();
                void loadMore();
                void queryChanged(String query);
                void repositoryClick(Repository repo);
          }
}
```

Chỉ nêu tên các method mà bạn có thể hiểu use-case mà contract này đang mô tả.

Như trong VD trên, các View method đều rất đơn giản để nhận biết rằng chúng không có bất kỳ logic nào ngoại trừ UI.

### 	The View Contract
View được thực thi bởi một Activity (hoặc một Fragment). **Presenter phải phụ thuộc vào View interface và không trực tiếp trên Activity:** bằng cách này, bạn tách rời Presenter khỏi việc triển khai View.

Chúng ta có thể sửa đổi View mà không cần thay đổi code ở Presenter. Hơn thế nữa, chúng ta có thể dễ dàng thực hiện unit-test cho Presenter bằng cách tạo mock View.

### 	The Presenter Contract
> *Chờ đã. Chúng ta có thực sự cần Presenter interface không?*

Thực sự là Không, nhưng mình sẽ nói Có.

Có hai kiểu suy nghĩ khác nhau về chủ đề này.

Một số người nghĩ bạn nên viết Presenter interface bởi vì bạn đang tách phần view khỏi phần Presenter.

Tuy nhiên, một số dev nghĩ rằng bạn đang trừu tượng hoá cái gì đó mà đã là một sự trừu tượng (của View) và bạn không cần phải viết một interface. Hơn thế nữa, bạn sẽ không bao giờ viết một Presenter thay thế, vì thế nó sẽ tốn thời gian code.

Dù nghĩ theo hướng nào thì việc có một interface có thể giúp bạn viết một mock của Presenter, nhưng nếu bạn sử dụng các tools như Mockito thì bạn không cần bất kỳ interface nào.

Về cá nhân, **mình thích viết Presenter interface hơn** vì 2 lí do đơn giản (ngoài các lí do đã được liệt kê trước đó):

1. Mình không viết viết một interface cho Presenter. Mình viết Contract để mô tả sự tương tác giữa View và Presenter. 
2. Nó không tốn nhiều công sức để viết.
# 4. Định nghĩa một nguyên tắc đặt tên để tách riêng biệt các trách nhiệm:
Presenter có thể có 2 thể loại method:

* Các Action (như là method ```load()```): chúng mô tả presenter để làm gì.
* Các User event (như là method ```queryChanged(...)```): chúng mô tả các hành động được kích hoạt bởi user như “viết vào search view” hoặc “click vào một item".

Càng nhiều các action thì càng nhiều logic bên trong View. Thay vào đó các user event gợi ý rằng chúng mặc cho Presenter quyết định phải làm gì. Ví dụ cụ thể, một search chỉ có thể được triển khai khi có ít nhất một lượng ký tự có độ dài nhất định được nhập vào bởi user. Trong trường hợp này, View chỉ gọi method ```queryChanged(...)``` và Presenter sẽ quyết định khi nào triển khai search.

Thay vào đó, method ```loadMore()``` được gọi khi user cuộn đến cuối danh sách, sau đó Presenter load trang kết quả khác. Nghĩa là khi user cuộn đến cuối thì View sẽ biết rằng trang mới cần được tải thêm. Để “reverse" logic này, có thể đặt tên method là ```onScrolledToEnd()``` để phần Presenter quyết định phải làm gì.

Nghĩa là trong giai đoạn thiết kế “Contract", bạn phải quyết định mỗi user event và action tương ứng nó và logic nên thuộc về phần nào.

# 5. Đừng tạo các Activity-lifecycle-style callback trong interface Presenter:
Nghĩa là Presenter không nên có các method như ```onCreate(...)```, ```onStart()```, ```onResume()``` vì nhiều lí do:

* Bằng cách này, **Presenter sẽ được kết hợp đặc biệt với Activity lifecycle**. 
* **Present không nên có sự kết hợp với lifecycle quá phức tạp**. Thực tế là các component chính của Android được thiết kế theo cách này, không có nghĩa là bạn phải làm tương tự hành vi này ở khắp mọi nơi. Nếu bạn có cơ hội đơn giản hoá thì hãy làm như vậy.

Thay vì gọi một method cùng tên, **trong một Activity lifecycle callback, bạn có thể gọi action của Presenter.** Ví dụ, bạn gọi ```load()``` ở cuối method ```Activity.onCreate(...)```.

# 6. Presenter có mỗi quan hệ 1 - 1 với View:
Presenter không hợp lý khi ko có View. Có View thì sẽ có Presenter và ngược lại. Presenter sẽ kiểm soát một view trong một thời điểm.

Bạn có thể xử lý View dependency trong Presenter bằng nhiều cách. Một giải pháp đó là cung cấp một vài method như ```attach(View view)``` và ```detach()``` trong Presenter interface. Vấn đề của việc triển khai này là view có thể null (nullable), sau đó bạn phải thêm null-check mỗi lần Presenter cần nó. Điều này gây nhàm chán…

**Vì mối quan hệ giữa presenter và view là 1-1**. Chúng ta có thể tận dụng lợi thế này. Presenter có thể lấy instance của view giống như một constructor parameter. Bạn cũng có thể cần một method để đăng ký Presenter với một vài events. Vì thế, tôi đề nghị định nghĩa method ```start() ```(hoặc cái gì đó tương tự) để chạy công việc của Presenter.
	
> *Về ```detach()``` thì sao?*

Nếu bạn có method ```start()```, bạn có thể cần ít nhất một method để giải phóng các dependencies. Vì chúng ta đã gọi method để Presenter đăng ký một số event tại ```start()```, nên mình gọi cái này là ```stop()```.

```java
    public interface BasePresenter<V> {
            void attach(V view);
            
            void detach();
    }
```

# 7. Đừng save state bên trong Presenter:
Ý mình là sử dụng Bundle. Bạn không thể làm điều này nếu bạn muốn làm theo nguyên tắc thứ 2 ở trên. Bạn không thể serialize data vào trong một Bundle vì Presenter sẽ kết hợp với Android class.

Mình không nói rằng nên để stateless Presenter. Presenter ít nhất nên có page number / offset.

> *Vì thế, bạn phải giữ lại Presenter, đúng không?*

# 8. Không. Đừng giữ lại Presenter:
Mình không thích giải pháp này chủ yếu vì mình nghĩ rằng Presenter không phải là một cái gì đó mà chúng ta nên lưu trữ, rõ ràng là nó không phải là một data class.

Một số đề xuất cung cấp cách để giữ Presenter trong khi configuration changes bằng cách sử dụng các fragment được giữ hoặc Loader. Mình không nghĩ rằng đây là giải pháp tốt nhất. Với mẹo này, Presenter sẽ không có vấn đề gì khi orientation changes, nhưng khi Android kills process và huỷ Activity thì sau đó chúng được tạo lại cùng nhau với Presenter mới. Vì lí do này, giải pháp này chỉ giải quyết một nửa vấn đề.

> *Thế thì…?*

# 9. Cung cấp một cache cho Model để lưu trữ state của View:
Theo quan điểm của mình, để giải quyết vấn đề “restore state" sẽ đòi hỏi một chút thích nghi với app architecture. Một giải pháp tuyệt vời để giải quyết vấn đề này được đề xuất trong [bài viết này](https://medium.com/@theMikhail/presenters-are-not-for-persisting-f537a2cc7962#.ssl022wg7). Cơ bản thì tác giả gợi ý sử dụng **caching network results** bằng cách sử dụng một interface giống Repository hoặc bất kỳ cái gì hướng đến quản lý dữ liệu, phạm vi trong ứng dụng và không trong Activity (để nó có thể giữ được khi orientation changes).

Interface này chỉ là một **Model** thông minh hơn. Sau đó nên cung cấp ít nhất một chiến lược disk-cache và có khả năng là một in-memory cache. Vì thế, kể cả nếu process bị huỷ, Presenter có thể phục hồi view state bằng cách sử dụng disk cache.

View chỉ cần quan tâm đến bất kỳ các request parameter cần thiết để restore state. Ví dụ, chúng ta chỉ cần save query.
Bây giờ, bạn có 2 lựa chọn:

* **Bạn trừu tượng hoá hành vi này trong tầng model** để khi Presenter gọi ```repository.get(params)``` thì nếu trang đã ở trong cache thì nguồn dữ liệu chỉ cần trả về nó, nếu không thì các APIs sẽ được gọi.
* **Bạn quản lý điều này bên trong presenter** bằng việc thêm method khác trong contract để restore view state. ```restore(params)```, ```loadFromCache(params)``` hoặc ```reload(params)``` khác tên mà mô tả cùng một hành động do bạn chọn.

# Kết luận:
Đây là kiến thức của mình về Model-View-Presenter áp dụng cho Android.

Mình hi vọng bạn thích bài viết này.

Nếu bạn có feedback, hãy comment bên dưới bài viết: mình sẽ rất vui nếu có các gợi ý và giải pháp khác hay hơn.

*Nguồn*: https://nguyenanhtoan.com/mot-loi-khuyen-ve-mo-hinh-model-view-presenter-trong-android/