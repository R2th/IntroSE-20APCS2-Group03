[`MergeAdapter`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter) là một class mới xuất hiện ở [`recyclerview:1.2.0-alpha02`](https://developer.android.com/jetpack/androidx/releases/recyclerview), cho phép chúng ta có thể kết hợp tuần tự nhiều [`adapter`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.Adapter) để hiển thị trong một `RecyclerView` duy nhất. Điều này cho phép ta có thể đóng gói các adapter tốt hơn, thay vì kết hợp nhiều kiểu dữ liệu trong cùng một adapter, giúp các adapter có thể tập trung hơn vào nhiệm vụ cụ thể chúng cần xử lý cũng như tăng tính tái sử dụng.

Một use case có thể sử dụng làm ví dụ, là khi chúng ta cần hiển thị một danh sách, với trạng thái loading ở header hay footer: khi danh sách đang lấy dữ liệu từ network, ta sẽ hiển thị một ProgressBar; trong trường hợp lỗi, ta sẽ hiển thị dialog và button retry.
![](https://images.viblo.asia/0989a6ad-b7d6-438d-ad81-bc6e1331f202.png)
# Giới thiệu về `MergeAdapter`
`MergeAdapter` cho phép chúng ta hiển thị nội dung của nhiều adapter, theo cách nối tiếp nhau. Ví dụ, giả sử chúng ta có 3 adapter như sau:
```
val firstAdapter: FirstAdapter = …
val secondAdapter: SecondAdapter = …
val thirdAdapter: ThirdAdapter = …
val mergeAdapter = MergeAdapter(firstAdapter, secondAdapter, 
     thirdAdapter)
recyclerView.adapter = mergeAdapter
```
`recyclerView` sẽ hiển thị các item từ 3 adapter trên một cách tuần tự.
Việc có nhiều adapter khác nhau cho phép chung ta có thể phân tách rõ ràng từng phần của danh sách. Ví dụ, nếu ta muốn hiển thị một header, ta không cần đưa logic liên quan tới việc hiển thị header vào cùng adapter hiển thị danh sách ở body mà thay vào đó, ta sẽ đưa nó ra một adapter riêng.
![](https://images.viblo.asia/325f2f49-ada8-4c9e-b28e-fc095149fd44.png)
# Hiển thị trạng thái load ở header hoặc footer
Header hoặc footer của chúng ta sẽ hiện thị trạng thái load hoặc thông báo lỗi. Khi danh sách hoàn thành việc load dữ liệu, header hoặc footer sẽ không hiển thị bất cứ thứ gì. Do đó, chúng sẽ hiển thị một danh sách với 0 hoặc 1 item, với adapter:
```
val mergeAdapter = MergeAdapter(headerAdapter, listAdapter, 
    footerAdapter)
recyclerView.adapter = mergeAdapter
```
Nếu cả header và footer sử dụng cùng một layout, `ViewHolder` và UI logic (như là khi nào và các hiển thị ProgressBar), ta có thể cài đặt chỉ một class `Adapter` và tạo 2 instance của nó: 1 cho header và 1 cho footer.
Bạn có thể tham khảo [pull request](https://github.com/googlecodelabs/android-paging/pull/46/files) sau với cài đặt hoàn chỉnh, bao gồm:
* Một [`LoadState`](https://github.com/googlecodelabs/android-paging/blob/step1_mergeadapter/app/src/main/java/com/example/android/codelabs/paging/ui/LoadState.kt), expose bởi [`ViewModel`](https://github.com/googlecodelabs/android-paging/blob/step1_mergeadapter/app/src/main/java/com/example/android/codelabs/paging/ui/SearchRepositoriesViewModel.kt).
* Một layout của trạng thái loading cho footer và header.
* Một [`ViewHolder`](https://github.com/googlecodelabs/android-paging/blob/step1_mergeadapter/app/src/main/java/com/example/android/codelabs/paging/ui/ReposLoadStateViewHolder.kt) cho header và footer.
* Một [`ListAdapter`](https://github.com/googlecodelabs/android-paging/blob/step1_mergeadapter/app/src/main/java/com/example/android/codelabs/paging/ui/ReposLoadStateAdapter.kt) hiện thị 0 hoặc 1 iteam dự trên `LoadState`. Mỗi khi `LoadState` thay đổi, chúng ta sẽ thông báo rằng item đó cần thay đổi, tức là được chèn vào hoặc xoá đi.
# Tìm hiểu thêm về MergeAdapter
## ViewHolders
Theo mặc định, mỗi adapter duy trì một số `ViewHolder` của chúng, mà không được tái sử dụng giữa adapter. Nếu nhiều adapter hiển thị cùng `ViewHolder`, chúng ta có thể sẽ muốn tái sử dụng các instance giữa chúng. Chúng ta có thể làm được điều này bằng cách khởi tạo `MergeAdapter` với đối tượng [`MergeAdapter.Config`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter.Config), với thuộc tính `isolateViewTypes = false`. Bằng cách này, tất cả các adapter được kết hợp sẽ sử dụng chung một tập hợp ViewHolder. Trong trường hợp hiện thị trạng thái load ở header hay footer ở ví dụ này, cả 2 ViewHolder thực tế sẽ hiển thị cùng một nội dung nên ta có thể tái sử dụng chúng.

Để hỗ trợ nhiều kiểu `ViewHodler`, ta cần cài đặt [`Adapter.getItemViewType`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.Adapter#getItemViewType(int)). Khi chúng ta tái sử dụng `ViewHoder`, hãy chắc chắn rằng cùng một view type sẽ không trỏ tới các `ViewHolder` khác nhau. Một trong những cách tốt nhất để thực hiện việc này là trả về layout ID cho view type.
```
class HeaderAdapter() : RecyclerView.Adapter<LoadingStateViewHolderHeaderViewHolder>() { 

override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return LoadingStateViewHolder(parent)
}

    override fun getItemViewType(position: Int): Int {
                 return R.layout.list_loading
    }
}

class FooterAdapter() : RecyclerView.Adapter<LoadingStateViewHolderFooterViewHolder>() { 

override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return LoadingStateViewHolder(parent)
}

    override fun getItemViewType(position: Int): Int {
            	  return R.layout.list_loading
    }
}
```
## Sử dụng stable ids
Thay vì sử dụng stable ids với [`notifyDataSetChange`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.Adapter#notifyDataSetChanged()), chúng ta nên sử dụng các event chỉ định cụ thể của adapter cung cấp nhiều thông tin hơn về việc dữ liệu được thay đổi cho `RecyclerView`, từ đó giúp việc cập nhật UI trở nên hiệu quả hơn. Nếu ta đang sử dụng [`ListAdapter`](https://developer.android.com/reference/kotlin/android/widget/ListAdapter), việc thông báo sự kiện đã được xử lý với sự trợ giúp của callback [`DiffUtil`](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil). Nhưng nếu ta cần sử dụng stable ids, `MergeAdapter.Config` cung cấp 3 cài đặt cho stable ids, bao gồm: [`NO_STABLE_IDS`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter.Config.StableIdMode#NO_STABLE_IDS), [`ISOLATED_STABLE_IDS`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter.Config.StableIdMode#ISOLATED_STABLE_IDS), và [`SHARED_STABLE_IDS`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter.Config.StableIdMode#SHARED_STABLE_IDS). 2 cài đặc sau yêu cầu chúng ta phải xử lý stable ids trong adapter. Bạn có thể xem thêm tài liệu về [`StableIdMode`](https://developer.android.com/reference/androidx/recyclerview/widget/MergeAdapter.Config.StableIdMode) để biết thêm chi tiết và cách chúng hoạt động.
## Data changes notification
Khi một adapter trong `MergeAdapter` gọi tới một trong những notify function của nó, `MergeAdapter` sẽ tính toán các vị trí mới của item trước khi update `RecyclerView`.

Nếu một adapter gọi tới [`Adapter.notifyDataSetChanged`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.Adapter#notifyDataSetChanged()), `MergeAdapter` sẽ gọi tới `Adapter.notifyDataSetChanged`, thay vì [`Adapter.notifyItemRangeChanged`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.Adapter#notifyItemRangeChanged(int,%20int)). Thông thường, `RecyclerView` sẽ tránh vọi tới phương thức `Adapter.notifyItemRangeChanged`, mà sẽ ưu tiên cập nhật chi tiết hơn hoặc sử dụng một `Adapter` thực hiện việc cập nhật tự động, như là [`ListAdapter`](https://developer.android.com/reference/kotlin/androidx/recyclerview/widget/ListAdapter) hoặc [`SortedList`](https://developer.android.com/reference/androidx/recyclerview/widget/SortedList).
## Finding ViewHolder position
Có thể bạn đã từng sử dụng [`ViewHolder.getAdapterPosition`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.ViewHolder#getAdapterPosition()) trước đây để get vị trí của một `ViewHolder` trong adapter. Hiện tại, bởi ta đã kết hợp nhiều adapter với nhau,ta sẽ sử dụng [`ViewHolder.getBindingAdapterPosition`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.ViewHolder#getBindingAdapterPosition()). Nếu ta muốn get adapter cuối cùng bind tới một `ViewHoder`, trong trường hợp ta chia sẻ các `ViewHolder`, thì sẽ sử dụng [`ViewHolder.getBindingAdapter`](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.ViewHolder#getBindingAdapter()).
# Tổng kết
Trên đây là một số chia sẻ của mình về MergeAdapter. Nếu bạn muốn hiển thị tuần tự nhiều kiểu dữ liệu trên một danh sách và tách biệt thành nhiều adapter, hãy thử sử dụng `MergeAdapter`. Để có thể kiểm soát nhiều hơn về `ViewHolder` hay stable ids, hãy sử dụng `MergeAdapter.Config`.

Cảm ơn bạn đã dành thời gian đọc bài viết.

Tài liệu tham khảo: [Merge adapters sequentially with MergeAdapter](https://medium.com/androiddevelopers/merge-adapters-sequentially-with-mergeadapter-294d2942127a).