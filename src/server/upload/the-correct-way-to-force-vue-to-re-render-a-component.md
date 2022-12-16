Bài viết được dịch từ ngồn: https://hackernoon.com/the-correct-way-to-force-vue-to-re-render-a-component-bde2caae34ad

Trong một số trường hợp, những reactivity của Vue là chưa đủ, đôi khi chúng ta phải render lại những component hoặc phải xóa đi những component và init lại từ đầu.

Vậy làm cách nào để Vue render lại những component theo đúng cách.

Cách tốt nhất để Vue render lạ component là set :key trong component. Khi bạn muốn component được render lại, bạn chỉ việc thay đổi giá trị của key, Vue sẽ tự động render lại cả component.

Thật sự là một cách đơn giản và hữu hiệu phải không?

Bạn sẽ thấy có rất nhiều cách khác nhau để làm như vậy: 
- Cách hơi shock: reload toàn bộ page
- Cách hơi kém: sử dụng v-if
- Cách tốt hơn: sử dụng forceUpdate method
- Cách tốt nhất: thay đổi key của component

Nếu bạn muốn reload hoặc update, đây có thể là cách tốt hơn.

Nó giống như bạn không hiểu một trong những phần sau đây:
- Reactivity của Vue
- Computed props
- Watched props
- Không sử dụng attributes :key với v-for

Bây giờ có những cách đúng đắn để forcing update. Phần được giải quyết bằng việc thay đổi giá trị của key nằm ở cuối của bài viết

## Horrible way: reload the entire page (cách hơi shock: reload lại toàn bộ page)

Cách này tương tự như việc khởi động lại chiếc máy tính của bạn mỗi khi bạn muốn đóng một app nào đó.

![](https://images.viblo.asia/ef42a8d0-1e6b-4cff-bcaf-77155edcbeac.gif)

Tôi đoán nó có thể được thực hiện, nhưng thực sự là một cách tệ nhất.

Và hơn thế nữa, không muốn nói là: Đừng làm như vậy.

Hãy xem thêm những cách tốt hơn.

## Terrible way: the v-if hack (cách hơi kém: sử dụng v-if)

V-if trong Vue là điều kiện để render component nếu có giá trị true, và không tồn tại trong trong DOM nếu có giá trị false

Trong template của bạn, v-if sẽ được thêm như sau:

![](https://images.viblo.asia/eb21efda-7d8b-4e90-8e7e-f4c74a8bde74.png)

Trong script cần thêm method sẽ được sử dụng nextTick:

![](https://images.viblo.asia/2753ed37-d72c-4b5d-a9a2-5552d40936a3.png)

Nó sẽ hoạt động như thế nào?

- Khi khởi tạo renderComponent được set là true, do vậy my-component được render
- Khi gọi forceRender, ngay lập tức renderComponent được set thành false
- Stop render my-component vì v-if có giá trị false
- Trong nextTick renderComponent được set lại giá trị true
- V-if lại có giá trik true, so my-component được render lại thêm 1 lần nữa

Có 2 phần quan trọng trong việc hiểu cách hoạt động.

Đầu tiên, ta phải đợi đến khi next tick hoặc không thấy có thay đổi gì cả.

Trong Vue, tick là một single DOM update vòng tròn. Vư sẽ collect tất cả update được tạo bởi chung 1 tick, và điểm cuối cùng của tick sẽ update những gì thay đổi vào DOM dựa trên những thay đổi vừa collect. Nếu chúng ta không đợi đến tick tiếp theo, chúng ta update renderComponent, nó sẽ cancel những update thay đổi kia và không có gì render ra.

Tiếp theo, Vư sẽ tạo một component mới khi chúng ta render lại lần thứ 2. Vue sẽ xóa cái đầu tiên và tạo một cái mới. Điều đó có nghĩa là my-component mới sẽ chạy trong tất cả lifecycles.

Bạn có thể sử dụng nextTick cùng với promises nếu cảm thấy muốn:

![](https://images.viblo.asia/d253962a-65f3-4d33-b130-ac2658b8ab81.png)

Tuy vậy, đó không phải là cách tốt. Tôi gọi nó là hack bởi vì chúng ta sẽ hack around những cái mà Vue muốn chúng ta làm

## Better way: You can use forceUpdate (cách tốt hơn: sử dụng forceUpdate)

Đây là một trong 2 cách tốt nhất để giải quyết vấn đề, cả hai đều được support chính thức bởi Vue.

Thông thường, Vue sẽ react to những thay đổi trong từng phần (component) bằng cách update lại view. Tuy nhiên, khi chúng ta gọi forceUpdate, bạn có thể force những update đó đối với từng phần nhỏ cho dù một trong chúng đã thật sự thay đổi (đã được render lại với những thay đổi).

Đây là chỗ phần lớn mọi người phạm phải sai lầm lớn khi sử dụng method này

Nếu như Vue tự động update đối với mọi thay đổi, tại sao chúng ta phải sử dụng force-update?

Lý do là trong vài trường hợp reactivity của Vue có thể bất thường, chúng ta nghĩ Vue sẽ react đối với những thay đổi của property hoặc variable, nhưng nó không thực sự như vậy. Trong một số trường hợp, Vue không react đối với tất cả thay đổi.

Có 2 cách khác nhau mà bạn có thể gọi forceUpdate, tự gọi trong component đó hoặc gọi giống như global.

![](https://images.viblo.asia/56330de1-6fa1-494d-b23c-361670d91897.png)

Chú ý: Nó sẽ không update những computed trong component. Gọi forceUpdate sẽ chỉ thay đổi trong view.

## The best way: key-changing (cách tốt nhất: thay đổi giá trị của key)

Trong nhiều trường hợp, chúng ta phải render lại component.

Giải quyết vấn để đó theo phương pháp proper, chúng ta co :key attributes và Vue dự vào đó để phân biệt các component khác nhau với những dữ liệu khác nhau. Nếu key giữ nguyên, nó sẽ không thay đổi component, nhưng khi giá trị của key thay đổi, Vue biết rằng component đã cũ và cần tạo mới component khác.

Chính xác là cái chúng ta cần!

Đầu tiên chúng ta cần biết tại sao cần key trong Vue

## Why do we need to use key in Vue?

Bạn cần biết điều này, đây là bước quan trọng để hiểu làm cách nào để render lại component theo cách proper.

Khi bạn render 1 list components:
- Nó có local state 
- Một vài component có init process khởi tạo, đại loại là created hoặc mounted
- Non-reactive DOM manipulation, qua jQuery hoặc APIs cơ bản nào đó

Nếu bạn list ra như vậy, hoặc update nó bằng cách khác, bạn sẽ không cần phải render lại một phần của list. Bạn muốn render lại 1 phần mà không phải toàn bộ list, chỉ những phần bị thay đổi.

Để giúp Vue giữ track của những phần thay đổi và những phần không thay đổi, chúng ta được support bằng key attributes. Sử dụng index của aray trong trường hợp này không giúp ích gì cả, chừng nào index không gắn liền với một phần của object trong list.

Đây là một ví dụ về list:

![](https://images.viblo.asia/1fb27a91-144d-45b6-a16c-235c9795ad16.png)

Nếu chúng ta render nó với giá trị của key là index:

![](https://images.viblo.asia/11fe4bb5-f13e-4780-b083-225a88f6abd9.png)

Nó sẽ render thành:

```
Evan - 0
Sarah - 1
James - 2
```

Khi bỏ đi Sarah, chúng ta có:

```
Evan - 0
James - 2
```

Index được gắn với James thay đổi mặc dù James vẫn thế :), James được render lại mặc dù chúng ta đâu cần vậy.

Vì vậy, chúng ta cần unique id:

![](https://images.viblo.asia/74c1c8d7-1e2c-46ea-bd04-d1438dd4409f.png)

![](https://images.viblo.asia/97960cac-ecb0-4680-a8f3-f580a11d7aea.png)

Trước kia khi sử dụng index làm giá trị của key, khi bỏ Sarah khỏi list, Vue xóa component Sarah và James, sau đó tạo lại component cho James. Bây giờ Vue biết cái nào cần giữ lại, cái nào vần xóa, do vậy nó chỉ xóa Sarah.

Nếu chúng ta thêm phần tử trong list cũng vậy. Đó thực sự rất hữu dụng, đặc biệt trong những component phức tạp.

## Key-changing to force re-renders of a component

Cuối cùng, đây là cách tốt nhất (theo tôi) để Vue render lại component.

Bạn gán gán value cho key của component bạn muốn render lại, mỗi khi muốn bạn chỉ việc thay đổi giá trị này.

Một cách rất đơn giản để làm điều đó:

![](https://images.viblo.asia/3a415448-3697-42b4-bc98-fea4ad753e27.png)

![](https://images.viblo.asia/5473de61-66f2-495c-89a4-48fb70408599.png)

Mỗi khi call forceRerender, trường componentKey sẽ thay đổi. Và khi đó, Vue sẽ nhận ra và xóa component cũ, tạo component mới.

Component mới sẽ re-initialize và reset nó trong state.

Một cách đơn giản để giải quyết vấn đề của chúng ta.

Cảm ơn và hi vọng bài biết có ích trong công việc của bạn.