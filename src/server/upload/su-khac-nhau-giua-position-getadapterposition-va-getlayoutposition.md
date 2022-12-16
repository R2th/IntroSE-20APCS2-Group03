RecyclerView thường được sử dụng ở hầu hết trong các ứng dụng Android để hiển thị list các dữ liệu tương đồng và xử lý action khi user click vào một item của nó. Để nhận biết được user đã click vào item nào chúng ta có 3 sự lựa chọn: param position trong onBindViewHolder(), method getAdapterPosition của ViewHolder, method getLayoutPosition của ViewHolder.

Xem xét ví dụ đơn giản sau nhé: Ta có 1 recyclerView bao gồm các chữ số, khi click vào 1 item thì sẽ Toast lên số tương ứng của item đó. Khi click vào button "Add First" sẽ thêm 1 số vào đầu danh sách với giá trị là size của list hiện tại.

![](https://images.viblo.asia/148da6e7-6df1-4d48-a744-524e3d7481f9.gif)

## 1. Sử dụng position trong onBindViewHolder()

Đoạn code trong adapter sẽ trông như thế này

```
class NumberAdapter(
    val list: MutableList<Int>,
    val onClick: (i: Int) -> Unit
): RecyclerView.Adapter<NumberViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NumberViewHolder {
        return NumberViewHolder(ItemBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: NumberViewHolder, position: Int) {
        holder.itemBinding.textNumber.text =list[position].toString()
        holder.itemBinding.textNumber.setOnClickListener {
            onClick.invoke(list[position])
        }
    }

    override fun getItemCount(): Int = list.size
}

class NumberViewHolder(
    val itemBinding: ItemBinding
) : RecyclerView.ViewHolder(itemBinding.root)
```

Với cách này thì data hiển thị vẫn ổn áp, mọi thứ đều ổn cho đến khi bạn click lại vào từng item xem số Toast lên đã đúng hay chưa.

![](https://images.viblo.asia/1743226b-5aab-4d65-b6ba-359af2065482.gif)

Nguyên nhân là khi bạn add/change/delete data cho recyclerView và sử dụng notifyItemInserted()/notifyItemChanged()/notifyItemDeleted() để thông báo cho recyclerView cập nhập dữ liệu, RecyclerView sẽ chỉ gọi onBindViewHolder() cho item được thêm. Trong ví dụ này position ban đầu cho các item là 01234, sau khi update position sẽ thành 001234 vì vậy mới gây ra việc hiển thị sai khi chúng ta click.

## 2. Sử dụng getAdapterPosition()

ViewHolder cung cấp cho chúng ta method getAdapterPosition() luôn có vị trí của adapter được cập nhật của ViewHolder. Điều đó nghĩa là gì ? Có nghĩa là bất cứ khi nào bạn nhấp vào một mục (mục ViewHolder), chúng tôi sẽ hỏi Adpter về vị trí của nó. vì vậy bạn sẽ nhận được vị trí mới nhất của mục này theo logic của Adapter.

Đoạn code sẽ được update lại thành như thế này
```
class NumberAdapter(
    val list: MutableList<Int>,
    val onClick: (i: Int) -> Unit
): RecyclerView.Adapter<NumberViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NumberViewHolder {
        return NumberViewHolder(ItemBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: NumberViewHolder, position: Int) {
        val number = list[holder.adapterPosition]
        holder.itemBinding.textNumber.text = number.toString()
        holder.itemBinding.textNumber.setOnClickListener {
            onClick.invoke(list[holder.adapterPosition])
        }
    }

    override fun getItemCount(): Int = list.size
}

class NumberViewHolder(
    val itemBinding: ItemBinding
) : RecyclerView.ViewHolder(itemBinding.root)
```

Kết quả
![](https://images.viblo.asia/6c0adf5b-f38a-400a-bf44-bff3e76f9a0e.gif)

Kết quả thì đã khắc phục được lỗi so với position của onBindViewHolder(). Đọc đến đây thì có vẻ đủ xài rồi đấy nhưng ViewHolder còn cung cấp thêm 1 method nữa là getLayoutPosition.

Bonus: Nếu bạn import recyclerview 1.2.0 thì hàm này đã deprecate và được thay thế bằng getBindingAdapterPosition(). Chi tiết bạn có thể xem tại [đây](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.ViewHolder?hl=en#getBindingAdapterPosition())

## 3. Sử dụng getLayoutPosition()

Về cơ bản sử dụng method này cũng giống getAdapterPosition(). 

RecyclerView tách biệt tập dữ liệu khỏi cách chúng ta hiển thị nó, đó là lý do tại sao cần sử dụng LayoutMangers để quản lý cách chúng ta hiển thị dữ liệu từ tập dữ liệu và RecyclerView cập nhật layout, có nghĩa là nó đợi các thay đổi được thực hiện và sau đó chuyển những thay đổi đó cho bố cục. Khoảng thời gian chờ này nhỏ hơn 16 mili giây nên trong hầu hết các trường hợp, bạn sẽ không tìm thấy bất kỳ sự khác biệt nào giữa getAdapterPosition và getLayoutPosition vì khoảng thời gian chờ này nhỏ nhưng vẫn có thể thấy rằng bạn cần có được vị trí về mặt cập nhật bố cục (bố cục được chuyển lần cuối mà người dùng nhìn thấy bây giờ) .

## TÀI LIỆU THAM KHẢO
https://proandroiddev.com/difference-between-position-getadapterposition-and-getlayoutposition-in-recyclerview-80279a2711d1