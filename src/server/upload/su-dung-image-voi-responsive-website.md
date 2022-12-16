> - Trong quá trình responsive web thì việc xử lý căn chỉnh hiển thị image sao cho phù hợp đôi lúc tạo ra nhiều khó khăn, sau đây mình xin chia sẻ một số các để xử lý vấn đề này.

## Xử lý thẻ img với thuộc tính max-width
- Đây có thể xem là cách xử lý căn bản và hay sử dụng nhất:
html:
```
  <div class="container">
	<div class="image-parent" >
	   <img src="https://cdn.itviec.com/system/production/assets/images/12329/framgia-inc-headline-photo-crop.jpg" />
   </div>
</div>
```
css :
```
      img {
       max-width: 100%;
     }
```
Ở đây nếu bạn muốn ảnh full bao toàn div thì bạn có thể thêm thuộc tính width:
```
    img {
     max-width: 100%;
     width: 100%;
    }
```

Nhưng nên chú ý khi thêm width 100% cũng đồng nghĩa với chất lượng ảnh sẽ giảm xuống nếu kích thước ảnh < div , theo mình chỉ nên sử dụng thuộc tính khi xuống màn hình nhỏ.

## Xử lý thẻ img với position:
```
    .image-parent {
      position: relative;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
```

- Đối với trường hợp này ok nhất là khi muốn sử dụng thẻ img làm background, giá trị height của parent cần được fix cứng. Chất lượng ảnh sẽ bị giảm đáng kể nếu image < div.

## Xử lý thẻ img với object-fit:
- Sẽ thế nào nếu khi thẻ img tỉ lệ 3:4 nhưng lạ bị fix cứng giá trị tỉ lệ 1:2 => ảnh sẽ bị "MÉO" => sử dụng thuộc tính object-fit. 
- Đây là thuộc tính tác động trực tiếp lên thẻ img.

```
#html

  <div class="container">
    <div class="image-parent" >
       <img src="https://viecbonus-s3-website-ap-southeast-1-amazonaws.cdn.vccloud.vn/sA357V81HH_1471865277.536_12871490_1071264412909387_2526464886111624069_n.jpg" />
    </div>
</div>

#css

img {
  width: 390px;
  height: 100px;
  object-fit: cover;
}
```

No object-fit:
  ![](https://images.viblo.asia/6f62266b-6803-4b91-8138-f95731d01bc0.png)

object-fit: cover
![](https://images.viblo.asia/445a8c8e-a338-4ee0-8033-7fd7ccf02fc7.png)

- Nhược điểm: Thuộc tính này không được hỗ trọ trên IE và ảnh sẽ giống như bị crop center.

## Responsive với thẻ picture
 - Ngoài việc resposive với một imge cố định, ta có thể lựa chọn cách khác là hiển thị mỗi ảnh tương ứng với mỗi giá trị media.

```
    <picture>
      <source media="(max-width: 768px)" srcset="small.jpg">
      <source media="(min-width: 992)" srcset="medium.jpg">
      <img src="large.jpg">
    </picture>
```

## Xử lý ảnh ảnh background với background-size
```
#html

    <div class="container">
      <div class="image-parent" >

      </div>
    </div>

#css

.image-parent {
	background-image: url('https://cdn.itviec.com/system/production/assets/images/12329/framgia-inc-headline-photo-crop.jpg');
	background-size: cover;
}
```
## Tài liệu tham khảo:

- https://www.w3schools.com/css/css3_object-fit.asp
- https://css-tricks.com/responsive-images-css/