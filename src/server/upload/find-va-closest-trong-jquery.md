# Mở đầu
Như các bạn đã biết ( hoặc chưa biết cũng chẳng sao :D ) thì JQuery là một thư viện javascript chuyên dùng cho việc thao tác với DOM.

Nó cho phép ta truy xuất ra, xử lí, và có thể update lại DOM . Để tiện cho việc truy xuất, chúng ta thường gán thêm những định danh hay thuộc tính đặc biệt để tìm được nó, đại loại như thêm class, gán id, hay chèn thêm thuộc tính bất kì như key="caigicungduoc".

Tuy nhiên, trong nhiều trường hợp chúng ta sẽ không lường trước được việc sẽ phải đụng đến element nào cho tới khi vấn đề phát sinh. Và không lẽ lại dò lại phần view để thêm cái này cái kia vào rồi mới truy xuất được cái mình cần ? Đấy là còn chưa kể đến nếu sử dụng các Component tự render của thư viện hỗ trợ, tóm lại là không can thiệp được vào view luôn !

Cái này thì đồng chí JQuery tốt tính cũng cung cấp luôn giải pháp rồi, chẳng tội gì không dùng ! ( À nếu mà chày cối muốn code javascript thuần để lấy DOM thì sẽ rối rắm hơn tí, suy cho cùng thì cốt lõi của jquery cũng xử lí giống vậy thôi, tuy nhiên là nó ít bug hơn mấy bác tự code chay =)) )

# Thân bài
Vì vẫn phải sử dụng một element cụ thể làm mốc xuất phát điểm nên việc truy xuất trong trường hợp tôi vừa nêu sẽ được chia theo 2 nhánh. 

Một là đi xuôi theo những node con của nó để tìm thứ mình cần ( dùng hàm find() ) và hai là nhảy ngược lên những node cha, ông ... của nó ( dùng hàm closest() ).

Ở đây tôi sẽ sử dụng đoạn html sau làm ví dụ :

```
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
```

## find()
Có 2 loại tham số mà ta có thể truyền vào nó :
```
.find(selector)      // selector ở đây là string, có thể là class, id, tag name,....
```
```
.find(element)      // element ở đây thực sự nhận 1 element hoặc JQuery object
```

Hàm find() này có vẻ khá giống children(), đều truy xuất ra những phàn tử nhỏ hơn nằm trong cây DOM cơ sở đã chọn. Tuy nhiên là find() có khả năng lục lọi sâu hơn xuống dưới, còn children() chỉ dừng lại ở cấp con đầu tiên; thêm nữa là nó chỉ nhận đầu vào là selector thôi nhé !

Ví dụ ở đây viết:  $('.level-2').find('li') thì DOM truy xuất được sẽ bao gồm các <li> có className là item-a, item-b, item-c, item-1, item-2, item-3. Tất cả đều thuộc phân cấp của level-2.
    
Và tất nhiên là ta cũng có thể làm theo cách thứ 2 cho ra kết quả tương tự :  $('.level-2').find($('li')).
## closest()
 Hàm closest() chạy ngược lên phía trên cây DOM để tìm những phần tử phù hợp với tham số truyền vào như sau :

```
.closest( selector )
.closest( selector [, context ] )
.closest( selection )
.closest( element )
```
Nó khá tương đồng với parents(), tuy nhiên thì cũng có nhiều khác biệt. closest() sẽ bắt đầu tìm kiếm từ phần tử hiện tại và đi ngược lên với kết quả trả về là phần tử đầu tiên phù hợp tìm được. Ngược lại thì parents() sẽ bắt đầu tính những phần tử cha mà thôi chứ không bao gồm phần tử hiện tại, và nó sẽ trả về tất cả các parent tìm được mà không dừng lại như closest().
    
Ví dụ:
```
$( "li.item-a" )
  .closest( "ul" )
  .css( "background-color", "yellow" );
```
Điều này sẽ chuyển vàng thẻ <ul> có .level-2 . Vì nó là parent gần nhất.

*Tài liệu tham khảo: https://api.jquery.com*