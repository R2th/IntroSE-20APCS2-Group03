Chào các bạn!

Đã lâu rồi, hôm nay mình mới quay trở lại với đề tài về bootstrap. Thật là một thiếu sót lớn khi mình giới thiệu về các component hữu dụng của  bootstrap 3 nhưng lại bỏ qua **collapse** và **accordion**. Vậy nên bài này mình xin phép được bổ sung về cách tạo **collapse** và **accordion** với bootstrap 3.

## 1. Collapse

Để tạo collapse, chúng ta chỉ cần đoạn code khá đơn giản như thế này

```
<div class="panel panel-default">
  <a class="btn btn-info" data-toggle="collapse" href="#collapse1">Link with href</a>

  <button class="btn btn-success pull-right" data-toggle="collapse" data-target="#collapse1">
    Button with data-target
  </button>

  <div id="collapse1" class="panel-collapse collapse">
    <div class="panel-body">Panel Body</div>
    <div class="panel-footer">Panel Footer</div>
  </div>
</div>
```

Trong đoạn code trên, các bạn dễ dàng thấy mình đã sử dụng 2 loại tag để hiển thị phần content bên dưới: **<a>** và **<button>**.
   
+ Đối với **<a>** tag: liên kết với element cần hiển thị thì chúng ta sử dụng **href**
+ Đối với **<button>**: chúng ta sẽ sử dụng **data-target**

Bên cạnh đó, còn 1 thuộc tính rất quan trọng và cũng là bắt buộc phải có dù bạn sử dụng tag nào đi nữa đó là **data-toggle="collapse"**.

Một vấn đề nữa, ngoài tag **a** và **button**, bạn cũng có thể dùng bất kỳ tag nào để thay thế. Tất nhiên, ngoại trừ **<a>** dùng **href** thì các tag khác phải sử dụng **data-target**.
    
Result:

![](https://images.viblo.asia/02b8e4d4-3a83-4493-a83b-84c426e002bd.gif)

## 2. Accordion

Accordion là gì? Hiểu một cách đơn giản thì accordion là tổ hợp các collapse. Chúng ta thường gặp accordion trong phần FAQ của website nào đó.

Hãy xem đoạn code dưới đây

```
<div class="faqs-page block col-md-6">
    <div class="category-faq">Category 1</div>
      <div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
          <a role="button" class="item-question" data-toggle="collapse" data-parent="#accordion2" href="#collapse1a" aria-expanded="true" aria-controls="collapse1a">
            <span>1</span> The screen will either appear blank or flash between the story?
          </a>
          <div id="collapse1a" class="panel-collapse collapse in" role="tabpanel">
            <div class="panel-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <a class="item-question collapsed" role="button" data-toggle="collapse" data-parent="#accordion2" href="#collapse2a" aria-expanded="false" aria-controls="collapse2a">
            <span>2</span> I purchased the event collection items from the item shop and I don't have it in my items?
          </a>
          <div id="collapse2a" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
            </div>
          </div>
        </div>
      </div>
  </div>
```

Trong đoạn code trên, cần chú ý nhất đó là thuộc tính **data-parent**.

Thuộc tính **data-parent** để cho biết khi bạn chọn group này thì group này được hiển thị và group khác sẽ đóng lại.

Ngoài ra, bạn hãy để ý thuộc tính **aria-expanded**. Thuộc tính này cho phép collapse nào có trạng thái mặc định là open khi set **aria-expanded="true"**.

Tất nhiên để set status=open đối với 1 collapse thì cái này chưa đủ, chúng ta cần phải thêm class **.in** vào trong div **panel-collapse**.

Để trang điểm hoa lá cành thêm chút cho phần code demo, mình có thêm  1 đoạn css như sau:

```
.faqs-page {
  .category-faq {
    background-color: #343434;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    padding: 0 20px;
    margin: 40px 0 30px;
    height: 50px;
    line-height: 50px;
  }

  .panel {
    border: 0;
    box-shadow: none;
  }

  .panel-group .panel+.panel {
    margin-top: 10px;
  }

  .item-question {
    border: 1px solid #ececec;
    display: block;
    line-height: 24px;
    padding: 9px 50px 13px 70px;
    font-weight: bold;
    font-size: 15px;
    position: relative;
    color: #111;

    &:after {
      content: "\f068";
      font-family: FontAwesome;
      font-weight: normal;
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: #c30323;
    }
    &.collapsed {
      &:after {
        color: #111;
        content: "\f067";
      }
    }

    span {
      width: 35px;
      height: 35px;
      line-height: 32px;
      text-align: center;
      border-radius: 100%;
      background-color: #ececec;
      display: inline-block;
      position: absolute;
      left: 17px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .panel-body {
    padding: 20px 20px 20px 70px;
    font-size: 15px;
    line-height: 26px;
  }
}
```

Bây giờ, chúng ta cùng đi coi kết quả nào:

![](https://images.viblo.asia/d62eaf81-075a-4875-84fc-690bcaac3d0f.gif)

## 3. Multi collapse 
Trường hợp trên là chúng ta chỉ open được 1 collapse. Khi open collapse khác thì collapse hiện tại sẽ phải đóng lại. 

Nếu muốn mở nhiều collapse cùng lúc thì phải làm thế nào? Câu trả lời là vấn đề nằm ở **data-parent**.

Như ở phần trên mình vừa giới thiệu. Thuộc tính **data-parent** để cho biết khi bạn chọn group này thì group này được hiển thị và group khác sẽ đóng lại. Vậy nên, nếu muốn mở nhiều collapse cùng 1 lúc thì bạn chỉ cần bỏ đi thuộc tính **data-parent** này là ok.

```
<div class="faqs-page block col-md-6">
    <div class="category-faq">Category 1</div>
      <div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
          <a role="button" class="item-question collapsed" data-toggle="collapse" href="#collapse1a" aria-expanded="false" aria-controls="collapse1a">
            <span>1</span> The screen will either appear blank or flash between the story?
          </a>
          <div id="collapse1a" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <a class="item-question collapsed" role="button" data-toggle="collapse" href="#collapse2a" aria-expanded="false" aria-controls="collapse2a">
            <span>2</span> I purchased the event collection items from the item shop and I don't have it in my items?
          </a>
          <div id="collapse2a" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
            </div>
          </div>
        </div>
      </div>
  </div>
```

Trong đoạn code trên, mình đã bỏ đi thuộc tính **data-parent** này và để cho 2 collapse cùng ở trạng thái đóng. Và bây giờ cùng coi kết quả xem sao nhé.

![](https://images.viblo.asia/ccc2a1e6-71e1-4473-aec3-95f5cbfb6b04.gif)

Như vậy, qua bài này, chúng ta đã biết thêm 1 component khá hay của bootstrap. Nó rất dễ sử dụng. Chúc các bạn thành công!