# Lời nói đầu
Hiện tại đa số các design khi thiết kế sẽ sử dụng các bộ font icon như fontAwesome, Ionicons, simpleicon ... đối với các font icon này thay đổi màu sắc rất đơn giản tuy nhiên sẽ có nhiều icon không như ý họ sẽ phải tự vẽ ra để sử dụng hoặc download các icon trên flaticon về. Việc sử dụng icon để tối ưu nhất thì ta thường sử dụng định dạng svg, trong phần trước mình đã nói về [cách sử dụng định dạng svg trong html/css](https://viblo.asia/p/su-dung-svg-trong-html-css-the-nao-GrLZD892Zk0). Phần này chúng ta sẽ cùng tìm hiểu cách để thay đổi màu sắc file svg.
![](https://images.viblo.asia/c78178aa-4ce0-4608-8ac1-5d487446459b.png)
# Các cách để đổi màu file định dạng SVG
## Trường hợp dùng trực tiếp :
```html
<div class="circle">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" class="circle" stroke-width="4" fill="yellow" />
  </svg>
</div>
```
### Ta sử dụng CSS để thay đổi màu 
```css
.circle {
    fill: red;
}
```
## Trường hợp dùng qua thẻ IMG:
```html
<img class="circle" src="circle.svg" />
```
có 2 cách: 
###     Cách 1 dùng Jquery:
```js
    /*
 * Replace all SVG images with inline SVG
 */
jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});
```
sau đó thay đổi màu bằng css
```css
.circle path {
  fill: #000;
}
//hoặc
.circle path {
  background-color: #000;
}
```
### Cách 2 dùng filter css 
nhưng phải tinh chỉnh nhiều hơn mới được màu như ý

```css
    .circle {
    filter: invert(1);
    // filter: invert(1) sepia(1) saturate(5) hue-rotate(175deg);
```

## Trường hợp dùng Mask image
### Sử dụng background-color
```css
.icon-facebook {
    mask-image: url('circle.svg');
   display: block;
   width: 20px;
   height: 20px;
   background-color: blue;
  }

```
Nguồn : stackoverflow :
https://stackoverflow.com/questions/22252472/change-svg-color
https://stackoverflow.com/questions/24933430/img-src-svg-changing-the-fill-color
Trên đây là các cách mình tìm hiểu được để thay đổi màu file svg mong sẽ hữu ích cho ai đó, phần tới chúng ta sẽ cùng tìm hiểu về một số cách tạo hiệu ứng chuyển động với file svg.