## Giới thiệu
Chúng ta thường muốn truyền dữ liệu khi điều hướng tới những màn hình, đích đến khác nhau. Trái ngược với việc sử dựng các đối tượng toàn cục, truyền tải dữ liệu cho phép đóng gói tốt hơn và chia sẻ an toàn hơn tới các fragments hoặc activities thực sự cần tới dữ liệu này. Công việc truyền tải này trước nay vẫn luôn được Bundles xử lý, và nó đã xử lý tương đổi ổn. Tuy nhiên Navigation lại có một thứ tốt hơn, tuyệt vời hơn, đó chính là **SafeArgs**.
> SafeArgs is a gradle plugin that allows you to enter information into the navigation graph about the arguments that you want to pass. It then generates code for you that handles the tedious bits of creating aBundle for those arguments and pulling those arguments out of the Bundle on the other side.

Bạn có thể sử dụng Bundles, tuy nhiên khuyến cáo được đưa ra sử dụng SafeArgs để thay thế. Không chỉ vì dễ dàng code, ít code hơn, dễ maintain hơn mà bởi vì nó cho phép sử dụng các type-safety cho các đối số.

Chúng ta sẽ tiếp hành quan sát thông qua ví dụ Donut Tracker app, bạn có thể tải source code [ở đây](https://github.com/android/architecture-components-samples/tree/main/MADSkillsNavigationSample).

## Về app Donut Tracker
![](https://images.viblo.asia/876c0ac1-e8ca-482a-8395-89d48b10cf42.png)

Donut Tracker hiển thị danh sách các loại bánh donut, mỗi loại có tên, mô tả và thông tin xếp hạng mà tôi đã thêm hoặc trong hộp thoại được truy cập bằng cách nhấp vào floating action button(FAB):
![](https://images.viblo.asia/5100d6ed-2b7f-46c7-8f1e-a7057acbcd05.png)

Nhấp vào FAB sẽ xuất hiện hộp thoại để nhập thông tin về bánh rán mới

Một cách tự nhiên để thực hiện việc này là nhấp vào một trong các mục trong danh sách, thao tác này sẽ đưa ta đến đích hộp thoại giống như trước đây, nơi chúng ta có thể cập nhật thông tin về mục đó. Nhưng làm thế nào để ứng dụng biết mục nào sẽ hiển thị trong hộp thoại? Cần chuyển thông tin về mục đã được nhấp vào. Cụ thể, nó cần chuyển id của mục từ phân đoạn danh sách sang phân đoạn hộp thoại, sau đó hộp thoại có thể truy xuất thông tin từ cơ sở dữ liệu cho donut với id đó và sau đó có thể điền biểu mẫu một cách thích hợp.
## Sử dụng SafeArgs 
Việc đầu tiên làm chính là thêm thư viện.
SafeArgs không phải là loại mô-đun thư viện giống như các phần khác của điều hướng; nó không phải là một API, mà là một plugin gradle sẽ tạo mã. Vì vậy, chúng ta cần kéo nó vào dưới `dependence gradle` và sau đó áp dụng `plugin` để chạy tại thời điểm xây dựng, để tạo mã cần thiết.

```
def nav_version = "2.3.0"
classpath “androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version”
```
Sau đó, ta thêm lệnh sau vào tệp build.gradle của ứng dụng.

```
apply plugin: "androidx.navigation.safeargs.kotlin"
```
Click "Sync Now"

Tiếp theo, chúng ta đi đến navigation graph, để tạo và chuyển dữ liệu cần thiết.
![](https://images.viblo.asia/fade8b0e-a7fb-466b-bac9-0b8b0d12ad0f.png)


Đích đến cần đối số là hộp thoại donutEntryDialogFragment, hộp thoại này cần thông tin về mục nào sẽ hiển thị. Nhấp vào điểm đến đó sẽ hiển thị các thuộc tính đích ở bên phải
![](https://images.viblo.asia/dd52a431-7c1a-4d63-aa8c-3d2bff7c8f1b.png)


Tiếp đến, nhấp vào dấu + trong `Arguments` để thêm đối số mới, hộp thoại này sẽ hiển thị bên dưới. Chúng ta muốn chuyển thông tin về món donut sẽ hiển thị, vì vậy chọn Long , tương ứng với loại id trong cơ sở dữ liệu.

![](https://images.viblo.asia/ffc5128f-5a32-4c04-8045-d0ea69273a00.png)

Lưu ý rằng mục Nullable đã chuyển sang màu xám khi chọn Long. Điều này là do các kiểu cơ sở được phép (Integer, Boolean, Float và Long) được hỗ trợ bởi các kiểu nguyên thủy (int, bool, float và long) ở lớp ngôn ngữ lập trình Java và các kiểu này không được rỗng. Vì vậy, mặc dù kiểu Long của Kotlin là nullable, nhưng kiểu dài nguyên thủy cơ bản thì không, vì vậy chúng ta bị hạn chế với các kiểu not-nullable khi sử dụng các kiểu cơ sở này.

Khi người dùng tạo một mặt hàng mới, mã sẽ chỉ ra rằng không có mặt hàng hiện có để hiển thị. Đó là lý do tại sao nhập -1 cho Giá trị mặc định trong hộp thoại, vì -1 không phải là chỉ mục hợp lệ. Khi mã điều hướng đến đích này mà không có đối số nào được cung cấp, giá trị mặc định là -1 sẽ được gửi và mã nhận sẽ sử dụng giá trị đó để quyết định rằng donut mới đang được tạo.

Trong DonutListDirections, bạn có thể thấy đối tượng đồng hành, là API sử dụng để điều hướng đến hộp thoại.
```
companion object {
    fun actionDonutListToDonutEntryDialogFragment(
        itemId: Long = -1L): NavDirections =
        ActionDonutListToDonutEntryDialogFragment(itemId)
}
```
Thay vì sử dụng một Action, cái mà lệnh gọi `navigate()` ban đầu được sử dụng, `navigate()` sử dụng đối tượng NavDirections, đóng gói cả Action (đưa chúng ta đến đích dialog) và đối số được tạo trước đó.

Trong tệp được tạo khác, `DonutEntryDialogFragmentArgs`, bạn có thể thấy mã fromBundle () được tạo có thể được sử dụng để truy xuất đối số ở phía bên kia, trong hộp thoại đích:
```
fun fromBundle(bundle: Bundle): DonutEntryDialogFragmentArgs {
    // ...
    return DonutEntryDialogFragmentArgs(__itemId)
}
```
Bây giờ ta có thể sử dụng các hàm được tạo này để chuyển và truy xuất dữ liệu thành công. Đầu tiên, chúng ta đã tạo mã trong lớp `DonutEntryDialogFragment` để lấy đối số `itemId` và quyết định xem người dùng đang thêm một donut mới hay chỉnh sửa một donut hiện có:
```
val args: DonutEntryDialogFragmentArgs by navArgs()
val editingState =
    if (args.itemId > 0) EditingState.EXISTING_DONUT
    else EditingState.NEW_DONUT
```
Nếu người dùng đang chỉnh sửa một donut hiện có, mã sẽ truy xuất thông tin của mặt hàng đó và điền vào giao diện người dùng với nó:
```
if (editingState == EditingState.EXISTING_DONUT) {
    donutEntryViewModel.get(args.itemId).observe(
        viewLifecycleOwner,
        Observer { donutItem ->
            binding.name.setText(donutItem.name)
            binding.description.setText(donutItem.description)
            binding.ratingBar.rating = donutItem.rating.toFloat()
            donut = donutItem
        }
    )
}
```
Khi người dùng nhấp vào nút Done trong dialog, đã đến lúc lưu thông tin họ đã nhập. Mã cập nhật cơ sở dữ liệu với dữ liệu trong giao diện người dùng của dialog và sau đó dismisses dialog:
```
binding.doneButton.setOnClickListener {
    donutEntryViewModel.addData(
        donut?.id ?: 0,
        binding.name.text.toString(),
        binding.description.text.toString(),
        binding.ratingBar.rating.toInt()
    )
    dismiss()
}
```
Đoạn mã chúng ta vừa xem qua xử lý đối số ở phía đích; bây giờ chúng ta hãy xem cách dữ liệu được gửi đến đích đó. Có hai nơi, trong `DonutList`, điều hướng đến Dialog. Xử lý tình huống khi người dùng nhấp vào FloatingActionButton (FAB):
```
binding.fab.setOnClickListener { fabView ->
    fabView.findNavController().navigate(DonutListDirections
        .actionDonutListToDonutEntryDialogFragment())
}
```
Cách khác để điều hướng đến hộp thoại xảy ra khi người dùng nhấp vào một trong các mục hiện có trong danh sách. Hành động này kết thúc trong lambda này, được chuyển vào quá trình tạo mã DonutListAdapter (dưới dạng tham số onEdit) và được gọi trong trình xử lý onClick cho mỗi item:
```
donut ->
    findNavController().navigate(DonutListDirections
        .actionDonutListToDonutEntryDialogFragment(donut.id))
```

## Tổng kết
Đó là điều dành cho SafeArgs. Chúng rất dễ sử dụng (đơn giản hơn nhiều so với chơi với Bundles!) Vì thư viện tạo mã để bạn đơn giản hóa việc chuyển dữ liệu theo cách an toàn và dễ dàng giữa các đích. Điều này cho phép bạn tận dụng lợi thế của việc đóng gói dữ liệu bằng cách chỉ chuyển dữ liệu bạn cần giữa các điểm đến thay vì hiển thị rộng hơn.