Chào các bạn!

Việc sử dụng accordion cũng không còn gì lạ lẫm với các bạn nữa. Accordion có thể được tích hợp với bootstrap hoặc sử dụng plugin riêng. Thực chất các bạn hoàn toàn có thể tự viết 1 đoạn js ngắn gọn. Tuy nhiên như vậy sẽ mất thêm thời gian style cho đẹp, cho mượt mà hơn. Trong khi đó, hiện tại khá nhiều plugin hỗ trợ, chúng ta chỉ việc lấy và sử dụng. Vì vậy, trong bài viết này, mình sẽ giới thiệu tới các bạn một số plugin Accordion đẹp và khá thú vị.

## 1. Easy Responsive Tabs to Accordion

Plugin này khá đặc biệt, cho phép tab lồng trong tab.

![](https://images.viblo.asia/ec2d7598-3669-4e53-8825-78e16733dd12.png)

Plugin này có khá nhiều option cho người dùng lựa chọn

```
$("#demoTab").easyResponsiveTabs({
    type: 'default', //Types: default, vertical, accordion           
    width: 'auto', //auto or any custom width
    fit: true,   // 100% fits in a container
    closed: false, // Close the panels on start, the options 'accordion' and 'tabs' keep them closed in there respective view types
    activate: function() {},  // Callback function, gets called if tab is switched
    tabidentify: 'tab_identifier_child', // The tab groups identifier *This should be a unique name for each tab group and should not be defined in any styling or css file.
    activetab_bg: '#B5AC5F', // background color for active tabs in this group
    inactive_bg: '#E0D78C', // background color for inactive tabs in this group
    active_border_color: '#9C905C', // border color for active tabs heads in this group
    active_content_border_color: '#9C905C' // border color for active tabs contect in this group so that it matches the tab head border
});
```

Link tham khảo:
https://github.com/samsono/Easy-Responsive-Tabs-to-Accordion
https://webthemez.com/demo/easy-responsive-tabs/Index.html#ChildVerticalTab_11|parentHorizontalTab1

## 2. jQuery Responsive Tabs

Bản chất của plugin là 1 dạng tab. Tuy nhiên vẫn có thể sử dụng nó như 1 accordion.

![](https://images.viblo.asia/2bf76ead-5357-40f3-bd06-d9d2fc5b535c.jpg)

Cách gọi khá đơn giản

```
$('#responsiveTabsDemo').responsiveTabs({
    startCollapsed: 'accordion'
});
```

Link tham khảo:

https://github.com/jellekralt/Responsive-Tabs
http://jellekralt.github.io/Responsive-Tabs/#tab-3

## 3. jQuery Accordion

Plugin này cho phép tạo group accordion, tức là accordion trong accordion

![](https://images.viblo.asia/5c44e441-fa92-46be-a73a-be2afacec9e1.jpg)

```
{
    transitionSpeed: 300,
    transitionEasing: 'ease',
    controlElement: '[data-control]',
    contentElement: '[data-content]',
    groupElement: '[data-accordion-group]',
    singleOpen: true
}
```

Link tham khảo:
https://vctrfrnndz.github.io/jquery-accordion/

## 4. liteAccordion

Đây là 1 accordion nằm ngang thay vì hoạt động vertical như thông thường. Bên cạnh đó, plugin này có layout responsive khi bạn set { responsive : true } trong phần option của plugin. Lúc này, accordion sẽ tự điều chỉnh chiều dài của nó sao cho phù hợp với kích thước của page. Plugin này dễ dàng sử dụng trên mobile hoặc là các thiết bị cầm tay khác khi định hướng của thiết bị thay đổi.

![](https://images.viblo.asia/f87f4b5f-f48e-4a2f-aee8-145fa9532135.jpg)

Link tham khảo:
https://github.com/nikki/liteAccordion

## 5. Akordeon

Accordion này được style theo phong cách menu trên website. Ý tưởng đằng sau Akordeon là cung cấp một giao diện nhẹ và có thể tùy chỉnh cho các collapsible panels có thể chứa bất kỳ loại dữ liệu nào trong một không gian hạn chế.

![](https://images.viblo.asia/012f4d17-f8ba-4dcc-a8c9-93d02bcfcb18.jpg)

Link demo: https://www.egrappler.com/akordeon/index.htm
Link tham khảo: https://www.egrappler.com/trendy-jquery-accordion-plugin-free-akordeon/

## 6. jQuery Easy Accordion Plugin

Đây cũng là 1 dạng horizontal slider vô cùng linh hoạt.

![](https://images.viblo.asia/3cb24724-15fb-46d7-a51e-5df351622a72.jpg)

Link tham khảo: https://www.madeincima.it/en/jquery-plugin-easy-accordion/

## 7. jQuery Common Accordion

Thêm 1 dạng horizontal accordion cho các bạn lựa chọn

![](https://images.viblo.asia/6e43a7c5-b6b9-479f-b854-acbbc64476e9.jpg)

Link tham khảo:  http://www.marghoobsuleman.com/jQuery-common-accordion

Như vậy, trogn bài viết này mình đã giới thiệu tới các bạn một số plugin accordions khá thú vị, cũng rất dễ sử dụng. Hi vọng các bạn có thể lựa chọn cho mình plugin thích hợp nhất.