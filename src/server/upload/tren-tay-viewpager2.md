Google vừa mới phát hành bản alpha của ViewPager2, dấu hiệu cho việc kết thúc vòng đời của ViewPager 8 năm tuổi được phát hành tận năm 2011.

Từ đó, tôi nghĩ rằng hầu hết các nhà phát triển cần phải tạo một ViewPager. Mặc dù nó phát triển rất mạnh nhưng chắc chắn nó không phải là thứ có thể dễ dàng được thêm vào dự án. Tôi nghĩ tất cả chung ta ít nhất có một lần tự hỏi liệu rằng chúng ta nên sử dụng một `FragmentPagerAdapter` hay là một `FragmentStatePagerAdapter`. Hoặc tự hỏi chúng ta có thể sử dụng một ViewPager mà không cần đến Fragments?

Và gạt những điều gây bối rối đó sang một bên, chúng vẫn còn tồn tại ở đó lâu nữa. RTL support? Vertical orientation? Đã có nhiều thư viện open sources hỗ trợ việc đó, nhưng không có cái nào là chính thức từ thư viện support (hiện tại là AndroidX) ít nhất là cho đến hiện tại.

Hãy cùng tìm hiểu và dùng thử ViewPager2. Bạn sẽ cần cài đặt AndroidX vào trong project của bạn cũng như minSdkVersion là 14 hoặc cao hơn.

Việc đầu tiên cần làm là thêm thư viện vào dependencies của build.gradle

`
implementation 'androidx.viewpager2:viewpager2:1.0.0-alpha01'
`

Nếu bạn quen làm việc với `RecyclerView` thì việc setup ViewPager2 cũng tương tự. Chúng ta sẽ bắt đầu bằng việc tạo một adapter:

```
class CheesePagerAdapter(private val cheeseStrings: Array<String>) : RecyclerView.Adapter<CheeseViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CheeseViewHolder {
        return CheeseViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.cheese_list_item, parent, false))
    }

    override fun onBindViewHolder(holder: CheeseViewHolder, position: Int) {
        holder.cheeseName.text = cheeseStrings[position]
    }

    override fun getItemCount() = cheeseStrings.size
}
```

và ghép nó với một RecyclerView.ViewHolder.

```
class CheeseViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    val cheeseName: TextView = view.findViewById(R.id.cheese_name)
}
```

Cuối cùng, cũng giống như RecyclerView, chúng ta set adapter của ViewPAger2 là một instance của RecyclerView adapter. Tuy nhiên cần chú ý rằng không cần set LayoutManager.

```
viewPager.adapter = CheesePagerAdapter(Cheeses.CheeseStrings)
```

Vậy là chúng ta đã đang làm việc với ViewPager2.
![](https://images.viblo.asia/c74f98e0-0245-4ad1-be75-f93fb392e71f.gif)

Chúng ta có thể chỉ định hướng cuộn với 1 dòng

```
viewPager.orientation = ViewPager2.ORIENTATION_VERTICAL
```

![](https://images.viblo.asia/56f527d3-29e8-4bfa-99fd-1bd6d7f76684.gif)

Dựa trên release notes thì còn nhiều vấn đề cần fix trước khi ViewPager2 có thể được phát hành bản chính thức, nhưng đây sẽ là bản cập nhật được chờ đợi từ lâu cho một trong những thành phần lâu đời nhất của thư viện support.

Code sample bạn có thể xem[ tại đây ](https://github.com/MichaelEvans/ViewPager2Sample)
Xin cảm ơn Chris Banes’ [CheeseSquare](https://github.com/chrisbanes/cheesesquare) về data mẫu cho demo.

[Nguồn](http://michaelevans.org/blog/2019/02/07/hands-on-with-viewpager2/)