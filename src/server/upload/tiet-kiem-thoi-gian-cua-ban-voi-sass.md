Giả sử bạn đang muốn define 1 class HTML dạng ```margin-(number)```, với number là giá trị của thuộc tính margin(tính theo rem), đơn giản chúng ta chỉ cần viết:
```
.margin-1{
    margin: 1rem;
}
```
Rất đơn giản, phải không? 

**Nhưng giả sử chúng ta muốn define 100 method như vậy:**
```
.margin-1{
    margin: 1rem;
}
  
.margin-2{
    margin: 2rem;
}

.................

.margin-100{
    margin: 100rem;
}
```
thì đây chính là lúc SASS lên tiếng.

Với ```@for```:
```
$start:1;
$end:100;

@for $i form $start through $end{
    .margin-#{$i}{
        margin: #{$i}rem;
    }
}
```
Vậy là đoạn này của bạn đã tương đương với 300+ dòng CSS rồi. 

Và bạn có thể sử dụng tùy theo nhu cầu:
```
<div class="margin-10">
    <p> This class has 10rem margin</p>
</div>
```

**Nhưng nếu bạn lại muốn define các thuộc tính left, right, top, bottom thì sao?** 

Chúng ta có thể chỉnh sửa lại 1 chút:

```
$start:1;
$end:100;
$top:"top";
$bottom:"bottom";
$right:"right";
$left:"left";
$auto:"auto";

@for $i form $start through $end{
    .margin-#{$i}-#{top}{
        margin-#{top}: #{$i}rem;
    }
    .margin-#{$i}-#{bottom}{
        margin-#{bottom}: #{$i}rem;
    }
    .margin-#{$i}-#{right}{
        margin-#{right}: #{$i}rem;
    }
    .margin-#{$i}-#{left}{
        margin-#{left}: #{$i}rem;
    }
    .margin-#{auto}{
        margin: #{auto};
    }
    .margin-#{$i}{
        margin: #{$i}rem;
    }
}
```

Have fun!