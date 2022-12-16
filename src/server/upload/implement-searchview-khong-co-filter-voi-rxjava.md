# I, Lời mở đầu
* Xin chào, lại gặp lại mọi người với một kiến thức mới. Để tiếp tục seri các bài viết về việc implement SearchView trong Android, trong bài viết này mình sẽ hướng dẫn mọi người về cách **implement SearchView không có filter kết hợp với RxJava**.
* Nếu mọi người chưa xem [phần 1: Custom SearchView](https://viblo.asia/p/custom-searchview-giong-voi-google-search-QpmlepGmZrd) thì có thể tham khảo để tạo ra 1 custom SearchView theo mong muốn nhé.
* Nhiều bạn có thể đã đọc và tham khảo từ nhiều nguồn về cách implement nó rồi.
* Mình cũng đã làm theo nhưng trong nhiều trường hợp không thể áp dụng y nguyên như vậy.
* Let's go.

# II, Thực hiên
* Những kiến thức của RxJava:
    * [PublishSubject](http://reactivex.io/RxJava/javadoc/io/reactivex/subjects/PublishSubject.html):  Subject chỉ emit các item tại thời điểm được Observer subscribe. Tuỳ vào trường hợp sử dụng, PublishSubject có thể là Observable hoặc Observer.
    * [Filter](http://reactivex.io/documentation/operators/filter.html): operator dùng để loại bỏ những item với value không mong muốn.
    * [Debounce](http://reactivex.io/documentation/operators/debounce.html): oprator chỉ emit item nếu một khoảng thời gian đã trôi qua mà không có item nào khác được emit. Ví dụ: bạn quy định debound time là 500ms, khi user điền "a", "ab", "abc" quá nhanh chỉ trong vòng 500ms thì kết quả là Observable chỉ emit item "abc" mà không emit ra "a", "ab".
    * [DistinctUntilChanged](http://reactivex.io/documentation/operators/distinct.html): operator bỏ qua các item trùng lặp của Observable. 
    * [SwitchMap](http://reactivex.io/documentation/operators/map.html): operator dùng để chuyển đổi item thành item khác bằng việc thực hiện 1 function.
* Kiến thức của SearchView là[ SearchView#OnQueryTextListener](https://developer.android.com/reference/kotlin/androidx/appcompat/widget/SearchView.OnQueryTextListener): được gọi khi có sự thay đổi của text trong SearchView.
* Sau đây là đoạn code mình thực hiện bằng Kotlin.
* Đầu tiên chúng ta sẽ tạo ra 1 extension class là **SearchViewExt**. Nếu bạn chưa biết lợi ích của extension class thì có thể tìm hiểu nó .
![](https://images.viblo.asia/5535cbae-b50a-42ba-938f-5d296cf3a52c.png)
* Ở đây mình thêm 2 variable: **queryChangeAction** và **querySubmitAction** được thực hiện lần lượt khi query text thay đổi và query text được submit (sẽ có ích hơn khi search với nhiều filter). Điều này sẽ giúp chúng ta không phải implement lại **SearchView#OnQueryTextListener** khi bạn muốn 1 action khác.
* Nếu so sánh với [Mindorks](https://blog.mindorks.com/implement-search-using-rxjava-operators-c8882b64fe1d), bạn có thể thấy rằng mình không có sử dụng **subject.onComplete()** trong **onQueryTextSubmit()** bởi vì Subject trong trường hợp này cũng chính là Observable và sẽ bị terminate khi có **onComplete()** hoặc **onError()** được gọi.
* Với SearchView, **onQueryTextSubmit()** được gọi khi user sử dụng button search (góc dưới bên phải) trên keyboard. 
* Tiếp theo tạo function search():
![](https://images.viblo.asia/dddc4732-bdd8-4d72-a63e-3c1349a0188c.png)
* Như mình đã giải thích trước thì nếu **subject.onError()** được gọi thì nó sẽ bị terminate ngay do đó chúng ta phải thêm **onErrorReturn()**. Khi gặp phải **onError()** sẽ trả về 1 result trong onNext().
* Implement SearchViewExt và search() function:
![](https://images.viblo.asia/dc0ced42-cdfe-4181-928c-adba080c3ea6.png)
* Cuối cùng đừng quên clear searchObservable:
![](https://images.viblo.asia/4c269a40-9d3a-41da-88a4-970bdbdd25a6.png)
# III, Tổng kết
* Trên đây là bài viết áp dụng SearchView không có filter cùng với kinh nghiệm và một số giải thích của mình.
* Hi vọng sẽ giúp mọi người giải quyết một chút vấn đề khó khăn trong việc implement search.
* Tiếp theo: SearchView với nhiều filter.
* **Những thứ nhỏ nhất là những thứ quan trọng nhất**.