# 1. Mở đầu
Như ở phần trước mình đã nó tổng quan và các thành phần cơ bản để tạo nên chức năng search sử dung RXjava2 và Kotlin 
Ở bài viết này chúng ta sẽ đi vào thực hiện các vấn đề đã nói ở bài trước và thực hiện chức năng này hoàn chỉnh 

# 2.Tiếp tục nào

**1. Requset data**

   - Chúng ta sẽ truy vấn data trên thread IO
  
   - Các operator sử lí kết quả truy vấn sẽ được thực hiện trên mainThread : tại sao phải là mainThread mà không phải một thread khác ??

     ```
        flatMap { searchService.search(it).subscribeOn(Schedulers.io()) }
        .observeOn(AndroidSchedulers.mainThread())
     ```
     
   - Handler request error 
   
       Chúng ta sẽ thông báo cho người dùng khi xảy ra lỗi  trong doOnError và sử dụng retry  để observable lại textChanges 
       ```
        doOnError {
          Snackbar.make(main_coordinator, "Error while searching", Snackbar.LENGTH_SHORT).show()
            }
        .retry()
        ```
        
**2. Xử lí UI**
- Vậy trong quá trình request dữ liệu và handler chúng ta cần làm gì ??
       
     Đó là show progress cho người dùng thấy app vẫn đang chạy ngon :D khi handler , và ẩn nó đi khi đã xử lí xong

     chúng ta sẽ thực hiện nó tại 2 funcition  doOnNext , doOnEach
- Trước  flatMap : Show processbar

    ```
    .doOnNext {
      mainProgressbar.visibility = View.VISIBLE
      mainContent.visibility = View.GONE
     }
    ```

- Sau observeOn 

    ```
    .doOnEach {
      mainProgressbar.visibility = View.GONE
      mainContent.visibility = View.VISIBLE
     }
    ```
    
    


   **3.Một số vấn đề**
  
  * - Có vẻ mọi thứ đã ổn cho chức năng seach ?? *
    - Câu trả lời là chưa có một số vấn đề trong việc thực hiện chức năng search này như :

   **1.** Giả sử người dùng gõ “a”, “ab”, “abc”, trong một thời gian rất ngắn. Vì vậy, sẽ có 3 request lên server 
    Nhưng người lúc này chỉ quan tâm tời kết quả tìm kiếm “abc” ta phải sử lí ntn ? 

    **Solution** : ta sử dụng debounce operator (http://reactivex.io/documentation/operators/debounce.html).

  Debounce  đợi thời gian được cung cấp để thực hiện bất kỳ điều gì, nếu có bất kỳ truy vấn tìm kiếm nào khác xuất hiện trong khoảng thời gian đó

    ```
        .debounce(800, TimeUnit.MILLISECONDS)
    ```

     **2.** Nếu kết quả trả về  empty thì phải loại bỏ các kết quả này
    
     **Solution**: ta sử dụng filter operator để loại bỏ các kết quả không mong muốn này 
     **3.** Giả sử  query tìm kiếm cuối cùng là “abc” và người dùng đã xóa “c” và lại gõ “c”. Vì vậy, một lần nữa nó là "abc". Và điều này sẽ dẫn đến trùng lặp request thì chúng ta sử lí ntn ?
    
    ```
        .filter(Predicate { it: String ->
                    return@Predicate it.isNotEmpty()
                })
    ```
    
     **Solution**:  a sử sẽ sử dụng distinctUntilChanged operator .Operator này sẽ giúp chúng ta tráng các request trùng lặp. Nếu truy vấn tìm kiếm “abc” đã được request, nó sẽ không thực hiện lại request tìm kiếm “abc” nữa. 
     
         
     ```
        .distinctUntilChanged()
    ```


    **4.** Giả sử request tìm kiếm cuối cùng là “ab” và request này đang diễn ra thì người dùng đã nhập “abc”. Luc này không còn quan tâm đến kết quả của “ab” nữa. Bạn chỉ quan tâm đến kết quả của “abc” thì ta  phải sử lí ntn ?
    
       
     **Solution** : ta sử switchMap operator để tránh các request không cần thiết cho người dùng .
                   
     SwitchMap: chỉ cung cấp kết quả cho truy vấn tìm kiếm cuối cùng (gần đây nhất) và bỏ qua phần còn lại.
          
     
     ```
            
           .switchMap(Function<String, ObservableSource<Recipes>> { it ->
                    query = it
                    return@Function dataManager.searchRecipes(
                        Config.API_KEY,
                        it,
                        "1"
                    )
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                })
    ```
       
       
 # 3.Final code
  - Đây sẽ là kết quả code của chúng ta khi hoàn thành chức năng search        
  
 ```

     .searchSubscription = mainSearchText
                .textChanges()
                .skip(1)
                .map { it.toString() }
                .doOnNext {
                    mainProgressbar.visibility = View.VISIBLE
                    mainContent.visibility = View.GONE
                }
                .debounce(800, TimeUnit.MILLISECONDS)
                .distinctUntilChanged()
                .flatMap {
                    if (it.isNotBlank()) {
                        searchService.search(it).subscribeOn(Schedulers.io())
                    } else {
                        Observable.just(SearchResult.empty())
                    }
                }
                 .filter(Predicate { it: String ->
                    return@Predicate it.isNotEmpty()
                })
                
                .observeOn(AndroidSchedulers.mainThread())
                .doOnEach {
                    mainProgressbar.visibility = View.GONE
                    mainContent.visibility = View.VISIBLE
                }
                .doOnError {
                    Snackbar.make(main_coordinator, "Error while searching",Snackbar.LENGTH_SHORT).show()
                    }
                .retry()
                .subscribe({
                    mainContent.text = it.text
                    Log.d("MainActivity", it.text)
                }, {
                    Log.e("MainActivity", it.toString())
                })
   ```
   
# 4.Kết 

Sau 2 bài viết mình đã cùng các bạn tìm hiểu về các sử dụng  Rxjava2 và Kotlin để hoàn thiện chức năng search trong android .
Hi vọng sau bài viết này các bạn sẽ hiểm hơn , biết thêm một số operator và sử dụng linh hoắt rxjava2 

# 5.Reference

- http://reactivex.io/documentation/operators
- https://android.jlelse.eu/android-instant-search-using-kotlin-and-rxjava-d65c7fd90422
- https://blog.mindorks.com/implement-search-using-rxjava-operators-c8882b64fe1d