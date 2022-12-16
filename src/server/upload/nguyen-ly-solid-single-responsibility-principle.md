Đây là phần đầu triên trong 5 phần của series về nguyên lý SOLID

SOLID là cách đơn giản để giúp chúng ta nhớ về năm nguyên lý thiết kế cơ bản của hướng đối tượng

* Single Responsibility Principle (bài viết này)
* Open-Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Depedency Inversion Principle

Trong các phần tiếp theo, tôi sẽ đi sâu vào từng nguyên lý, giải thích nó và cách nó áp dụng trong Android development. Ở cuối series, bạn sẽ có nắm vững cốt lỗi của các nguyên lý, tại sao nó lại quan trọng đối với một Android developer và cách bạn có thể áp dụng chúng trong công việc.

# The Single Responsibility Principle

Single Responsibility Principle (SPR) là khá dễ hiểu. Nó phát biểu như sau

> Một class chỉ nên có một lý do duy nhất để thay đổi
> 

Hãy lấy trường hợp của một RecyclerView và adapter của nó. Như bạn có thể đã biết, một RecyclerView là một view linh hoạt có khả năng hiển thị một data set trên màn hình. Để data này có thể được đưa lên màn hình, chúng ta cần một RecyclerView adapter.

Một adater lấy data từ data set và ghép vào nó vào một view.  Phần được sử dụng nhiều nhất cua adapter là phương thức onBindViewHolder (và đối khi là chính bản thân `onBindViewHolder`, nhwg chúng tả chỉ phân tích `onBindViewHolder` để cho nhắn gọn). Adapter của Recyclerview có một nhiệm vụ: mapping một đối tượng tới view tương ứng của nó mà sẽ được hiển thị trên màn hình.

Giả sử đối tượng và RecyclerView.Adapter như sau:

```Java
public class LineItem {
    private String description; 
    private int quantity; 
    private long price; 
    // ... getters/setters
}

public class Order {
    private int orderNumber; 
    private List<LineItem> lineItems = new ArrayList<LineItem>();  
    // ... getters/setters
}

public class OrderRecyclerAdapter extends RecyclerView.Adapter<OrderRecyclerAdapter.ViewHolder> {
 
    private List<Order> items;
    private int itemLayout;
 
    public OrderRecyclerAdapter(List<Order> items, int itemLayout) {
        this.items = items;
        this.itemLayout = itemLayout;
    }
 
    @Override public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(itemLayout, parent, false);
        return new ViewHolder(v);
    }
 
    @Override public void onBindViewHolder(ViewHolder holder, int position) {
        // TODO: bind the view here 
    }
 
    @Override public int getItemCount() {
        return items.size();
    }
 
    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView orderNumber;
        public TextView orderTotal;
 
        public ViewHolder(View itemView) {
            super(itemView);
            orderNumber = (TextView) itemView.findViewById(R.id.order_number);
            orderTotal = (ImageView) itemView.findViewById(R.id.order_total);
        }
    }
}
```

Ở đoạn code trên, `onBindViewHolder` trống rỗng. Một implementation tôi đã thấy nhiều lần có thể trông giống như sau:

```Java
@Override 
public void onBindViewHolder(ViewHolder holder, int position) {
    Order order = items.get(position);
    holder.orderNumber.setText(order.getOrderNumber().toString());
    long total = 0;
    for (LineItem item : order.getItems()) {
        total += item.getPrice();
    }
    NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.US);
    String totalValue = formatter.format(cents / 100.0); // Must divide by a double otherwise we'll lose precision
    holder.orderTotal.setText(totalValue)
    holder.itemView.setTag(order);
}
```


Đoạn code trên đã vi phạm Single Resposibility Principle

### Tại sao

Phương thức onBindViewHolder của Adapter không chỉ mapping  từ một đối tượng `Order` tới view, mà nó còn sử lý việc tính toán giá cả cũng như format nó. Điều này vi phạm Single Responsibility Principe. Adapter chỉ nên chịu trách nhiệm cho việc lắp ráp một đối tượng order tới view tương ứng của nó. `onBindViewHolder` đang thực hiện thêm hai nhiệm vụ mà nó không nên thực hiện.

### Tại sao điều này lại là một vấn đề?

Để một class chịu nhiều trách nhiệm có thể là nguyên nhân của nhiều vấn đề. Đầu tiên, việc tính toán logic trong order bây giờ bị ghép vào adapter. Nếu bạn cần hiển thị total cảu một order ở một nơi khác (điều này rất dễ xảy ra) bạn sẽ phải làm lại đoạn logic đó. Một khi điều này xảy ra, ứng dụng của bạn sẽ phải đối mặt với vấn đề lặp logic mà chúng ta đã quen thuộc. Bạn update code ở một nơi và quên update nó ở chỗ khác v.v...

Vấn đề thứ hai giống với vấn đề đầu tiên - bạn ghép logic format vào adapter. Điều gì xảy ra nếu cần phải di chuyển hoặc update? Vào cuối ngày, chúng ta làm cho class này làm đươc nhiều thứ hơn nó cần thiết, và bây giờ ứng dụng dễ bị bug bởi vì có quán nhiều trách nhiệm trong một vị trí.

Rất may, ví dụ đơn giản này có thể được khắc phục dễ dàng bằng cách tính toán total bên trong đối tượng Order và chúng ta sẽ di chuyển logic format vào formater class thuộc loại đó. Formatter sau đó cũng có thể được sử dung bới Order.

Một updated của phương thức `onBindViewHolder` sẽ như sau:

```Java
Override 
public void onBindViewHolder(ViewHolder holder, int position) {
    Order order = items.get(position);
    holder.orderNumber.setText(order.getOrderNumber().toString());
    holder.orderTotal.setText(order.getOrderTotal()); // A String, the calculation and formatting moved elsewhere
    holder.itemView.setTag(order);
}
```

Tôi chắc chắn rằng bạn sẽ nghĩ rằng "Ok, cái này dễ". Liệu có phỉa nó luôn luôn dẽ dàng? Như hầu hết các câu trả lời trong phần mềm - "Nó sẽ phụ thuộc vào phạm vi"

Hãy đào sâu hơn một chút.

# "Responsibility có nghĩa là gì?"

Thật khó để định nghĩa nó tốt hơn Uncle Bob, do đó tôi sẽ trích dẫn ông ấy ở đây:

> Trong bối cảnh của Single Responsibility Principle (SRP) chúng ta định nghĩa một responsibility là một lý do để thay đổi. Nếu bạn có thể nghĩ ra nhiền hơn một cái cớ để thay đổi một class thì class này có nhiều hơn một responsibility.

Vấn đề là, điều này đôi khi thực sự khó nhận biết - Nhất là nếu bạn đã ở trong codebase một thời gian dài. Tại thời điểm đó, câu nói nổi tiếng này thường xuất hiện trong tâm trí:

> You can’t see the forest for the trees.

Trong bối cảnh của phần mềm, điều này nghĩa là bạn quá gần với code chi tiết của bạn để thấy bức tranh lớn hơn. Ví dụ - class bạn đang làm việc có thể trông rất tuyệt nhưng đó là vì bạn đã làm việc với nó rất lâu, thật khó để thấy rằng nó có nhiều responsibility.

Thử thách ở đây là phải biết rằng khi nào áp dụng SRP khi nào thì không. Lấy ví dụ vể adapter sample trên, nếu chúng ta nhìn lại code, chúng ta có thể thấy nhiều điều xảy ra mà có thể đòi hỏi cần thay đổi các khu vực khác với các lý do khác

```Java
public class OrderRecyclerAdapter extends RecyclerView.Adapter<OrderRecyclerAdapter.ViewHolder> {
 
    private List<Order> items;
    private int itemLayout;
 
    public OrderRecyclerAdapter(List<Order> items, int itemLayout) {
        this.items = items;
        this.itemLayout = itemLayout;
    }
 
    @Override public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(itemLayout, parent, false);
        return new ViewHolder(v);
    }
 
    @Override public void onBindViewHolder(ViewHolder holder, int position) {
        Order order = items.get(position);
        holder.orderNumber.setText(order.getOrderNumber().toString());
        holder.orderTotal.setText(order.getOrderTotal()); // Move the calculation and formatting elsewhere
        holder.itemView.setTag(order);
    }

 
    @Override public int getItemCount() {
        return items.size();
    }
 
    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView orderNumber;
        public TextView orderTotal;
 
        public ViewHolder(View itemView) {
            super(itemView);
            orderNumber = (TextView) itemView.findViewById(R.id.order_number);
            orderTotal = (ImageView) itemView.findViewById(R.id.order_total);
        }
    }
}
```


Adapter đang inflate một view, nó bind một order vào một view, nó xây dựng view holder, v.v... Class này có nhiều responsibility

### Có cần phá bỏ những resposibility này.

Điều này cuối cùng phụ thuộc vào cách ứng dụng thay đổi theo thời gian. Nếu ứng dung thay đổi theo cách mà  các view lắp ghép với nhau và các connecting functons của nó (logic của view) khi có một view thay đổi thì sẽ cần sự thay đổi của view khác. Sự thay đổi của cấu trúc view cũng cần một sử thay đổi của bản thân adapter, do đó design này trở thành cứng. Tuy niên, nó cũng có thể lập luaaj rằng nếu ứng dụng không thay đổi theo những cách đòi hỏi các chứng năng khau nhau để thay đổi vào những thời điểm khác nhau, thì không cần phải tách chúng ra. Trong trường hợp này, tách chúng sẽ thêm phức tạp không cần thiết.

Vậy phải làm sao?

# Một ví dụ để minh họa

Hãy tưởng tượng rằng có một requiment mới thằng khi tổng tiền phải thanh toán của một order là 0, view sẽ hiển thị ảnh màu bằng có chữ "FREE" trên màn hỉnh thay vì text để hiển thị tổng tiền. Logic sẽ đặt ở đâu? Trong code, bạn cần một TextView, và trong trường hợp khác bạn cần một ImageView. Có 2 địa điểm mà code cần thay đổi:

1. Trong view
2. Trong presentation logic.

Nhưn với phần lớn các ứng dụng tôi đã thấy, điều này được thực hiện trong adapter. Thật không may, điều này khiên Adapter phải thay đổi khi view của bạn thay đổi. Nếu logic cho việc này ở trong adapter, điều này làm cho logic của apdater bị thay đổi, cũng như code cho view. Điều này làm thêm một trách nhiệm cho adapter.

Đây chính xác là một cái gì đó giống như Model-View-Presenter pattern cung cấp sự tách biệt cần thiết để các lớp không trở nên quá cứng nhăc, nhưng vẫn cung cấp tính linh hoạt cho extension, composability và testing. Ví dụ, view sẽ implement một interface mà định nghĩa cách nó sẽ tương tác, và presenter sẽ xử lý các logic cần thiee. Presenter trong Model-View-Presenter pattern chỉ chiu trách nhiệm xử lý logic hiển thị, không có gì hơn.

Di chuyển những logic này từ apdater vào trong presenter sẽ giúp adapter tuân thủ nhiều hơn với single responsible principle.

Những điều đó là không đủ...

Nếu bạn nhìn sâu vào bất ký RecyclerView adapter nào, bạn hầu như chú ý rằng adapter làm nhiều điều, Những điều adapter vẫn làm

* Inflate view
* Khởi tạo ViewHolder
* Tái sử dụng View Holder
* Cung cấp item count
* ect

Vì SRP là về single responsibility, bạn có thể tự hỏi liệu một số hành vi này có nên được đưa ra ngoài để tuân thủ SPR hay không?

Trong khi Adapter vẫn xử lý nhiều hành động khác nhau, nhưng thực tế, đó là những gì nó được thiết kế để thực hiện. Xét cho cùng adapter của RecyclerView chỉ đơn giản là một triển khai của Adapter pattern.  Trong trường hợp này, việc giữ cơ chế inflation và view holder ở trong adapter cũng có ý nghĩa, đó là những gì mà class này chịu trách nhiệm và đó là những gì mà nó làm tốt nhất. Tuy nhiên, việc thêm các hàng vi khác (như logic) phát vỡ SPR và có thể tránh được bằng cách sử dụng Mode-View-Presenter hoặc các cách refactor khác.

# Kết luận
Cảm ơn các bạn đã theo dõi. Cảm ơn các bạn


# Tham khảo

https://academy.realm.io/posts/donn-felker-solid-part-1/