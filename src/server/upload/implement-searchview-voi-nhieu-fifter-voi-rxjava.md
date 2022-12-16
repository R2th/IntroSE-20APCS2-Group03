# I, Lời mở đầu
* Xin chào mọi người, hôm nay mình sẽ giới thiệu với mọi người về cách **implement SearchView có nhiều filter bằng việc sử dụng RxJava** trong Android bằng kinh nghiệm của mình.
* Đây cũng là bài viết cuối trong seri **Tạo 1 Search app hoàn chỉnh với SearchView, RxJava và data binding** của mình.
* Nếu mọi người chưa tham khảo các bài viết trước của mình thì có thể tham khảo:
    * **Phần 1**: Custom SearchView giống với google search - [Link](https://viblo.asia/p/custom-searchview-giong-voi-google-search-QpmlepGmZrd).
    * **Phần 2**: Implement SearchView không có filter với RxJava - [Link](https://viblo.asia/p/implement-searchview-khong-co-filter-voi-rxjava-gDVK266rKLj).
* Tận dụng kết quả đã đạt được từ phần 1 và phần 2, chúng ta sẽ thực hiện làm phần 3 này.

# II, Bài toán và cách thực hiện
## 1, Bài toán
* Chúng ta có 2 nguồn dữ liệu trả về từ server (tương tự với database) để cùng hiển thị khi user search.
*  Tìm kiếm các **Tag** bằng **repo.getTags()** return **Observable<List<Tag>>** và tìm kiếm các **Post** bằng **repo.getPosts()** return **Observable<ListPost>>**.
*  Với mỗi một từ user điền vào SearchView sẽ cho ra các tag và các post tương ứng.
*  Điều kiện filter: bạn có thể Search bằng keyboard hoặc tag (kết quả search).
## 2, Cách thực hiện
*  Để giải quyết vấn đề này theo mình chúng ta cần 2 bước quan trọng nếu chỉ chọn sử dụng 1 Adapter:
    *  **Bước 1**: Tạo 1 wrap object - **SearchResult** để wrap 2 đối tượng **Tag** và **Post**. Mỗi một SearchResult có thể chứa 1 List các tag hoặc chỉ chứa 1 Post
    *  **Bước 2**: Dựa vào điều kiênDùng toán từ Zip thực hiện combine 2 nguồn lại dữ liệu để có 1 list SearchResult hiển thị cho user.
* Để hình dung rõ hơn mọi người có thể quan sát hình ảnh bên dưới:
![](https://images.viblo.asia/17548135-250b-4a13-bced-b4e7b9184022.jpg)

*  **Lưu ý**: Bạn cũng có thể sử dụng [MergeAdapter](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter) khi mà bạn có ý định sử dụng nhiều Adapter nhưng mình sẽ không đưa ra trong bài viết này.
*  Bước 1: Tạo ra combine object - SearchResult.
*  Tag object:
![](https://images.viblo.asia/cef53b67-9e7a-44f6-91a2-ab7e9019f152.png)
*  Post object:
![](https://images.viblo.asia/57ed8bd7-b142-4ac6-9d64-fcb39f2afa47.png)
*  SearchResult object:
![](https://images.viblo.asia/7b397455-ab53-4500-a61a-34c81adcd36a.png)
*  Bước 2: Zip 2 nguồn dữ liệu theo điều kiện filter:
![](https://images.viblo.asia/6728aa69-64fb-4013-9950-a50ebc89b26f.png)
*  **Chú ý**: Đừng quên rằng mỗi lần user search chúng ta cần nhận biết đó khi nào user search bằng keyboard và khi nào search bằng tag.
# III, Tổng kết
*  Trên đây là kinh nghiệm của mình khi thực hiện việc search bằng RxJava có nhiều filter.
*  Với Android, chúng ta cũng có 1 số công cụ và hướng khác để giải quyết được vấn đề này như MergerAdapter, coroutine...
*  Cũng khá lâu rồi chưa có kiến thưc mới với mọi người nên bài viết sau mình sẽ chia sẻ thật kĩ càng mọi ngóc ngách về power tool/design: **coroutine**.
*  Có thể có nhiều người đã đọc qua và biết vấn đề này rồi nhưng mình vẫn muốn đào sâu từng ngóc ngách của nó.
*  Happy coding!