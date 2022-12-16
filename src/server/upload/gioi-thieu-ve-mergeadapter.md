# Giới thiệu
`MergeAdapter` là một class có sẵn trong [`recyclerview:1.2.0-alpha02`](https://developer.android.com/jetpack/androidx/releases/recyclerview) cho phép bạn kết hợp tuần tự nhiều adapter để hiển thị trong một `RecyclerView`. Điều này cho phép bạn đóng gói các adapter một cách tốt hơn thay vì phải kết hợp nhiều nguồn data vào trong một adapter (sử dụng nhiều kiểu `ViewHolder`), giữ chúng thống nhất và có khả năng sử dụng lại.

`MergeAdapter` cho phép hiển thị nội dung của  nhiều adapter trong một sequence. Ví dụ, ta có 3 adapter như sau:
```php
val firstAdapter: FirstAdapter = …
val secondAdapter: SecondAdapter = …
val thirdAdapter: ThirdAdapter = …

val mergeAdapter = MergeAdapter(firstAdapter, secondAdapter, 
     thirdAdapter)
recyclerView.adapter = mergeAdapter
```

`recyclerView ` sẽ hiển thị các item của mỗi adapter một cách tuần tự.

Sử dụng các adapter khác nhau cho phép ta phân tách tốt hơn các mối liên kết của từng phần liên tiếp trong một danh sách (`list`). Ví dụ, nếu ta muốn hiển thị một `title`, ta không cần phải viết logic để xử lý việc ẩn/hiện tiêu đề cho cùng một item trong một adapter. Thay vào đó ta có thể khai báo riêng một adapter chứa các item hiển thị `title`.

![RecyclerView và dữ liệu của các adapter](https://images.viblo.asia/f1e5d6c8-4cd6-46d3-b600-3b736e691671.png)


# Ví dụ
Ta tạo một màn hình hiển thị 1 danh sách cơ bản với các đối tượng `Fruit`, `Flower` và `Animal` với các thuộc tính đơn giản như sau:

```php
data class Fruit(
    var id: Int,
    var name: String
)
```

```php
data class Flower(
    var id: Int,
    var name: String
)
```

```php
data class Animal(
    var id: Int,
    var name: String
)
```

Tương ứng với mỗi đối tượng là một adapter. Ta sẽ triển khai 3 adapter như sau:

```php
class FruitAdapter(private val FruitList: List<Fruit>) : RecyclerView.Adapter<FruitViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FruitViewHolder {
        return FruitViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_fruit, parent, false)
        )
    }

    override fun getItemCount(): Int {
        return FruitList.size
    }

    override fun onBindViewHolder(holder: FruitViewHolder, position: Int) {
        holder.image.setImageResource(FruitList[position].id)
        holder.textViewName.setText(FruitList[position].name)
    }

}

class FruitViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    var image = itemView.findViewById<ImageView>(R.id.image)
    var textViewName = itemView.findViewById<TextView>(R.id.textViewName)

}
```

```php
class FlowerAdapter(private val FlowerList: List<Flower>) :
    RecyclerView.Adapter<FlowerViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FlowerViewHolder {
        return FlowerViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_flower, parent, false)
        )
    }

    override fun getItemCount(): Int {
        return FlowerList.size
    }

    override fun onBindViewHolder(holder: FlowerViewHolder, position: Int) {
        holder.image.setImageResource(FlowerList[position].id)
        holder.textViewName.setText(FlowerList[position].name)
    }

}

class FlowerViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    var image = itemView.findViewById<ImageView>(R.id.image)
    var textViewName = itemView.findViewById<TextView>(R.id.textViewName)

}
```

```php
class AnimalAdapter(private val animalList: List<Animal>) : RecyclerView.Adapter<AnimalViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AnimalViewHolder {
        return AnimalViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_animal, parent, false)
        )
    }

    override fun getItemCount(): Int {
        return animalList.size
    }

    override fun onBindViewHolder(holder: AnimalViewHolder, position: Int) {
        holder.image.setImageResource(animalList[position].id)
        holder.textViewName.setText(animalList[position].name)
    }

}

class AnimalViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    var image = itemView.findViewById<ImageView>(R.id.image)
    var textViewName = itemView.findViewById<TextView>(R.id.textViewName)

}
```

Sử dụng với `MergeAdapter` ta được kết quả như sau:

![](https://images.viblo.asia/36132336-234e-47a6-b75c-490ff03ff81a.jpg)