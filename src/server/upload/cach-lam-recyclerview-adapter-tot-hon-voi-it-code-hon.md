![](https://images.viblo.asia/9fdcf0ee-a4b4-4d4d-877a-246226a38ce1.png)
Hằng ngày nhiều người trong chúng ta vẫn thường xử dụng `RecyclerView.Adapter` để custom hiển thị 1 list data trên RecyclerView, đó là một việc làm quen thuộc. RecyclerView có một vài ưu điểm hơn so với ListView và GridView trước đây, mặc dù vậy để làm cho RecyclerView trở lên tốt hơn bằng cách nào ? Bài viết này sẽ trả lời cho bạn câu hỏi này, tiếp tục nhé ^^

Tháng 2 vừa rồi Google released bản android support version 27.1.0, trong bản này cung cấp thêm [ListAdapter](https://developer.android.com/reference/android/support/v7/recyclerview/extensions/ListAdapter.html)  cho `RecyclerView` tích hợp sẵn **AsyncListDiffer** giúp cho developer custom adapter trở lên dễ dàng và tối giản hơn. Vậy thì ListAdapter làm được những gì và nó khác biệt như thế nào với cách làm thông thường ? Để trực quan hơn thì những dòng code phía dưới mình sẽ đi vào 1 ứng dụng demo (Tạo ghi chú) và full source mình đính kèm ở dưới cuối bài viết. (cracker)

### RecyclerView.Adapter (cách làm cũ)

*Đôi nét về ứng dụng: Tạo ghi chú*
Là một ứng dụng đơn giản cho phép : Thêm - Sửa - Xóa các note (mình demo code tạm với chức năng thêm trước nhé)

**Code bằng Java:**

`NoteAdapter.java`

```
public class NoteAdapter extends RecyclerView.Adapter<NoteAdapter.NoteVH> {

    private List<Note> mNoteList;

    public NoteAdapter(List<Note> noteList) {
        mNoteList = noteList;
    }

    @NonNull
    @Override
    public NoteVH onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new NoteVH(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_note, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull NoteVH holder, int position) {
        holder.bindData(mNoteList.get(position));
    }

    public void addNewNote(Note note) {
        if (!mNoteList.contains(note)) {
            mNoteList.add(note);
            notifyItemInserted(mNoteList.size());
        }
    }

    @Override
    public int getItemCount() {
        return mNoteList != null ? mNoteList.size() : 0;
    }

    class NoteVH extends RecyclerView.ViewHolder {

        private TextView title;

        public NoteVH(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.title);
        }

        public void bindData(Note note) {
            title.setText(note.getTitle());
        }
    }
}
```

Đây là cách mà chắc hẳn nhiều bạn đã và đang làm, tạm thời chúng ta chưa có comment gì vội nhé. Thử chuyển nó sang **Kotlin** xem có gì không nào ? :)

**Code bằng Kotlin**

`NoteAdapter.kt`

```
class NoteAdapter(
    var list: MutableList<Note>) : RecyclerView.Adapter<NoteAdapter.NoteOldViewHolder>() {
  override fun onBindViewHolder(holder: NoteOldViewHolder, position: Int) {
    holder.bindData(list?.get(position))
  }

  override fun getItemCount(): Int = list.size

  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoteOldViewHolder {
    val inflater = LayoutInflater.from(parent.context)
    return NoteOldViewHolder(inflater.inflate(R.layout.item_note, parent, false))
  }

  fun addNote(note: Note) {
    if (!list.contains(note)) {
      list.add(note)
      notifyItemRemoved()
      notifyItemInserted(list.size)
    }
  }

  class NoteOldViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val title: TextView = itemView.findViewById(R.id.title)

    fun bindData(note: Note) {
      title.text = note.title
    }
  }
}
```
"Ồ !có vẻ tốt hơn rồi đó chứ" Điều chúng ta thấy ngay đó là code ngắn hơn rất nhiều, count trên máy mình thấy từ 63 line code java - 39 line code giảm gần 1 nửa rồi. Với các trường hợp Sửa - Xóa 1 item bất kì chúng ta cũng làm tương tự, và khi chúng ta update 1 list mới chỉ có duy nhất 1 item thay đổi thì sao ? Điều này làm cho việc xử lý logic bắt đầu phức tạp, thông thường bạn sẽ dùng "cheat" : `notifyDataSetChanged()`
Vậy thì nó không được linh hoạt cho lắm!!

**Giải pháp khắc phục:** Sử dụng DiffUtils . Phương án này khá hay nhưng ai đã dùng rồi thì chúng ta sẽ phải `implement` khá nhiều phương thức trong đó.
Bây giờ chúng ta xem ListAdapter sẽ làm được gì nhé!

### ListAdapter ( cách làm mới )
Docs trên Android developer:

> ListAdapter for RecyclerView (along with AsyncListDiffer) make it easier to compute list diffs on a background thread. These can help your RecyclerView animate content changes automatically, with minimal work on the UI thread. They use DiffUtil under the hood.
> 

Trước tiên chúng ta tạo `NoteDiffCallBack`
`NoteDiffCallBack.kt`

```
class NoteDiffCallBack : DiffUtil.ItemCallback<Note>() {
  override fun areItemsTheSame(oldItem: Note?, newItem: Note?): Boolean {
    return oldItem?.id == newItem?.id
  }

  override fun areContentsTheSame(oldItem: Note?, newItem: Note?): Boolean {
    return oldItem == newItem
  }

}
```
Chúng ta chỉ cần implement 2 phương thức:
1. areItemsTheSame: Kiểm tra 2 object của cùng 1 item xem chúng có trùng nhau không
2. areContentsTheSame: Kiểm tra 2 item của cùng data 

Tích hợp DiffUtil vào trong adapter:

`NoteAdapter.kt`
```
class NoteAdapter(
    val clickListener: (Int) -> Unit) : ListAdapter<Note, NoteAdapter.NoteVH>(NoteDiffCallBack()) {
  override fun onBindViewHolder(holder: NoteVH, position: Int) {

    holder.bindData(getItem(position), clickListener)
  }

  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NoteVH {
    val inflater = LayoutInflater.from(parent.context)
    return NoteVH(inflater.inflate(R.layout.item_note, parent, false))
  }

  class NoteVH(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val title: TextView = itemView.findViewById(R.id.title)
    private val trash: ImageView = itemView.findViewById(R.id.btn_delete)

    fun bindData(note: Note, clickListener: (Int) -> Unit) {
      title.text = note.title
      trash.setOnClickListener { clickListener(adapterPosition) }
    }
  }
}
```

Chúng ta thấy đơn giản hơn rất nhiều rồi phải không nào ? Giờ đây mỗi khi bạn update, edit, delete ... không cần phải lo lắng tới bước kiểm tra nữa. Phần việc tốn nhiều calo này đã được DiffUtill làm ở background rồi. :D

### Video demo
{@youtube: https://www.youtube.com/watch?v=UCTQ0kWDObE}

### Tổng kết

Trên đây mình đã chia sẻ cách làm RecyclerView adapter sử dụng ListAdapter để việc xử dụng trở lên dễ dàng hơn mà tiết kiệm công sức coding, mong rằng các bạn sẽ tìm thấy sự hữu ích của bài viết. Nếu có gì thắc mắc các bạn để lại comment, mình sẽ giải đáp nhé!^^

Các bạn tải source code về để xem chi tiết và hiểu rõ hơn.

[GitHub Download](https://github.com/thanhviet-ucan/SmartListAdapter)