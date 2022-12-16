Chào các bạn!

Cái tên **price range slider** như không còn xa lạ gì với các bạn nữa rồi nhỉ.  Gần như lúc nào price range slider cũng xuất hiện trong các site ecommerce giúp người dùng có thể thuận lợi tìm kiếm sản phẩm cho mình với mức giá phù hợp với túi tiền của họ. Trong bài viết này mình sẽ giới thiệu tới 20 demo khá đẹp về **price range slider**. 

## 1. Rubber Slider

{@embed: https://codepen.io/aaroniker/pen/VwZOOxz}

## 2. Draggable Price Scale

Price range slider này khá đặc biệt. Mỗi khoảng giá sẽ ứng với các dịch vụ khác nhau. Nó sẽ hiển thị ngay trên phần tooltip cho các bạn. Vô cùng hữu ích.

{@embed: https://codepen.io/dubrod/pen/osDmg}

## 3. Gear Slider

{@embed: https://codepen.io/MarioD/pen/WwXbgr}

## 4. CSS Range Slider

Slide này khá đơn giản, chỉ cần với đoạn script nhỏ là bạn có thể tạo đc price range slide này

```
var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
    });
  });
};

rangeSlider();
```

{@embed: https://codepen.io/seanstopnik/pen/CeLqA}

## 5. Budgetslider

Slide này mang phong cách 3D luôn.

{@embed: https://codepen.io/Hornebom/pen/ranmi}

## 6. Ui Range Slider

Khác với các price range slide bên trên, slide này vô cùng đơn giản, chỉ cần sử dụng thư viện jquery ui mà thôi. Và tất nhiên thì demo cũng chỉ đơn giản thôi.

{@embed: https://codepen.io/thehonestape/pen/yjlGi}

## 7. Science Slider

 Wow, slide kiểu ổng nghiệm hơi nước, vô cùng đẹp luôn. Rất thích hợp cho các site chuyên bán đồ dùng thí nghiệm.
 
{@embed: https://codepen.io/chrisgannon/pen/rvBMmM}

## 8. Range Slider Output

{@embed: https://codepen.io/wolthers/pen/LkOLQA}

## 9. Custom Accessible Vue Emoji Slider

Price Range Slide này khá thú vị với style của emoji. Lựa chọn giá càng cao thì mức độ yêu thích của emoji càng cao. Ngược lại sẽ là emoji tức giận luôn. Slide này khá thích hợp cho các website bán đồ chơi này.

{@embed: https://codepen.io/joshuajcollinsworth/pen/OYgGNK}

## 10. Two Point Range Slider

{@embed: https://codepen.io/jackiejohnston/pen/NNrpjQ}

## 11. Chromatic Slider

{@embed: https://codepen.io/nw/pen/ajpqXL}

## 12. Slider 1-5 Scaling

{@embed: https://codepen.io/dpdknl/pen/QggQRq}

## 13. Fluid Slider

{@embed: https://codepen.io/andreasstorm/pen/boQKMj}

## 14. Range

Slide có cái tên không thể ngắn gọn hơn. Cùng với đó là đoạn demo cũng cực kỳ đơn giản.

```
$("#range").slider
  range: "min"
  max: 100
  value: 50
  slide: (e, ui) ->
    $("#currentVal").html ui.value
    return
```

{@embed: https://codepen.io/andreasstorm/pen/FwAeD}

## 15. CSS Custom Range Slider

Demo khá đẹp với tooltip hình giọt nước sẽ to dần khi giá tăng dần.

{@embed: https://codepen.io/brandonmcconnell/pen/oJBVQW}

## 16. Slider Range Mars Weight Calculator

{@embed: https://codepen.io/mayuMPH/pen/ZjxGEY}

## 17. Range Slider

{@embed: https://codepen.io/jasesmith/pen/MyXwKM}

## 18. Multi-range Slider

Trong 1 loạt slide về price lại xuất hiện slide về time khá là hay và thú vị.

{@embed: https://codepen.io/kme211/pen/yXdxXy}

## 19. Budget Slider

{@embed: https://codepen.io/khadkamhn/pen/qbPQrv}

## 20. Range Slider Animation

{@embed: https://codepen.io/fstgerm/pen/XyWGZB}

Như vậy qua bài này các bạn có thể thấy có khá nhiều price range slide vô cùng đẹp và thú vị. Hi vọng các bạn có thể lựa chọn cho mình demo thích hợp nhất.  Chúc các bạn thành công!