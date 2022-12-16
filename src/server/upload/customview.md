Làm việc với các khách hàng luôn là một thử thách khó khăn cho các lập trình viên. Nhiều khách hàng mong muốn một giao diện đẹp và phức tạp cho ứng dụng của họ, để ứng dụng của họ trở nên ấn tượng cũng như giữ chân được nhiều người dùng. Do đó, nhiều người muốn xây dựng ứng dụng của mình trông thực sự khác biệt, không giống bất kỳ ứng dụng nào khác, có giao diện độc đáo với các hiệu ứng chuyển động hay hình ảnh làm người dùng không muốn chuyển sang ứng dụng khác với cùng chức năng.

Vậy, câu trả lời cho vấn đề này là gì? Đó phải là custom view.

Nếu bạn chưa từng làm việc với custom view trong Android, bạn có thể tham khảo trước ở [bài viết này](https://viblo.asia/p/android-custom-view-924lJr6zlPM) để có thể làm quen với nó.
Trong bài viết này, ta sẽ tập trung vào một số kỹ thuật cho phép tạo hiệu ứng cho view, làm cho chúng phản hồi tốt hơn cũng như trông tự nhiên hơn.
# ValueAnimator
Trước khi vẽ ra bất kỳ thứ gì, chúng ta cần hiểu cách mà một custom view tạo ra hiệu ứng cho nó, đó là ValueAnimator.
![](https://images.viblo.asia/47b0de34-728f-4e23-bcd0-6d2abd7b35d3.gif)
Trong Android, class này cung cấp một timing engine đơn giản cho các hiệu ứng di chuyển. Timing engine này sẽ tính toán giá trị hiệu ứng và cài đặt chúng vào trong các object cần thiết.

Khi vẽ bất kỳ thứ gì trong Android, ta cần làm việc với rất nhiều con số. Vậy nên về cơ bản việc mà ValueAnimator làm là cung cấp cho ta những con số liên tục thay đổi, và việc sử dụng những con số này trong lúc vẽ custom view sẽ tạo nên hiệu ứng mượt mà hơn.
Thử một ví dụ cài đặt một hiệu ứng đơn giản , với giá trị từ 0 tới 100 như sau:
```
ValueAnimator animator = ValueAnimator.ofInt(0, 100);
animator.setDuration(2000);
animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	@Override
	public void onAnimationUpdate(ValueAnimator animation) {
		int value = (int) animation.getAnimatedValue();
	}
});
animator.start();
```
Trong ví dụ trên, ta set thời gian của hiệu ứng là 2 giây, có nghĩa là giá trị sẽ được tăng từ 0 lên 100 trong 2 giây.
![](https://images.viblo.asia/2d417534-5354-4d85-a1c0-7f9c9a1b0946.gif)
Bây giờ, ta sẽ tạo ra hiệu ứng. Giả sử ta tạo một hiệu ứng làm cho một hình vuông chuyển thành một hình tròn. Để làm điều này, ta sẽ sử dụng một hình hình vuông được bo góc, nhưng thay vì fix cứng giá trị cornor radius của nó thì ta sẽ cho giá trị này thay đổi từ 0 tới (độ dài cạnh/2). Vậy nên trong phương thức onDraw() ta sẽ viết như sau:
```
int radius; // at the beggining radius equals 0
@Override
protected void onDraw(Canvas canvas) {
   int viewWidth = getWidth() / 2;
   int viewHeight = getHeight() / 2;

   int leftTopX = viewWidth - 150;
   int leftTopY = viewHeight - 150;

   int rightBotX = viewWidth + 150;
   int rightBotY = viewHeight + 150;
   canvas.drawRoundRect(leftTopX, leftTopY, rightBotX, rightBotY, radius, radius, backgroundPaint);
}
```
Bước tiếp theo sẽ gần giống với việc ta làm ở trên với ValueAnimator, tất cả những gì ta cần làm là cập nhật giá trị conor radius. Tuy nhiên có một vấn đề: nếu ta muốn tạo hiệu ứng cho hình của ta, ta cần vẽ lại nó mỗi lần giá trị được cập nhật.

Đó là lý do ta cần gọi tới phương thức invalidate() để làm view được vẽ lại với giá trị mới.
Kết quả chúng ta thu được là
![](https://images.viblo.asia/27bbdeaa-9e0f-4b66-a8a2-e7d1077f0564.gif)
Đây là một hiệu ứng đơn giản làm cho hình vuông chuyển thành một hình tròn. Tuy nhiên, khi ta muốn vẽ những hình phức tạp hơn với nhiều hiệu ứng cùng lúc thì phải làm như thế nào?

Giả sử, ta cần thêm vào một hiệu ứng xoay, làm cho hình vuông vừa xoay vừa chuyển thành hình tròn, ta cần tạo hiệu ứng với hai giá trị cùng lúc, mà ValueAnimator lại không hỗ trợ như vậy.
Thay vào đó, ta có thể sử dụng PropertyValuesHolder như là giá trị truyền vào cho ValueAnimator, từ đó ta có thể tạo nhiều ứng với nhiều giá trị cùng lúc như ta mong muốn, như trong các hiệu ứng phức tạp.
```
PropertyValuesHolder propertyRadius = PropertyValuesHolder.ofInt(PROPERTY_RADIUS, 0, 150);
PropertyValuesHolder propertyRotate = PropertyValuesHolder.ofInt(PROPERTY_ROTATE, 0, 360);

animator = new ValueAnimator();
animator.setValues(propertyRadius, propertyRotate);
animator.setDuration(2000);
animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	@Override
	public void onAnimationUpdate(ValueAnimator animation) {
		radius = (int) animation.getAnimatedValue(PROPERTY_RADIUS);
		rotate = (int) animation.getAnimatedValue(PROPERTY_ROTATE);
		invalidate();
	}
});
animator.start();
```
Thêm vào phương thức canvas.rotate() trước khi bắt đầu vẽ hình vuông
```
canvas.rotate(rotate, viewWidth, viewHeight);
```
Ta thu được kết quả:
![](https://images.viblo.asia/094196cd-9cac-40fd-8ae0-0c3b4a85e656.gif)
# Interpolator
Time interpolator được sử dụng trong việc tính toán thời gian đã trôi qua của hiệu ứng. Interpolator sẽ quyết định khi nào một animation sẽ được chạy với hiệu ứng tuyến tính hay phí tuyến, như là tăng tốc độ hay giảm tốc của hiệu ứng.
Trong thiết kế material design, Google khuyến nghị chúng ta nên tránh những hiệu ứng dạng tuyến tính, thay vào đó ta nên sử dụng các đường cong tự nhiên khi tạo hiệu ứng. Việc tăng tốc và giảm tốc độ nên được thược hiện một cách mượt mà trong suốt hiệu ứng để đạt hiệu quả tốt nhất. Dưới đây là ví dụ so sánh giữa việc sử dụng hiệu ứng tuyến tính và phi tuyến:
![](https://images.viblo.asia/1c83181a-de17-41d1-9f62-f37454233f28.gif)
Bộ SDK do Google cung cấp đã cung cấp cho chúng ta hầu hết các interpolator cần thiết trong Android, và trong hầu hết trường hợp đều có thể đáp ứng đủ nhu cầu.
![](https://images.viblo.asia/3757606f-9587-4bb0-8a9a-8a2bd81681ef.png)
*Lưu ý: Giá trị mặc định của Interpolator là AccelerateDecelerateInterpolator*
# Đồ thị
Chúng ta cùng tiếp tục với một dạng view mà có thể thường được yêu cầu trong nhiều dự án: một đồ thị.
![](https://images.viblo.asia/7afa709b-ea14-4df5-a5b2-86eacede7daa.gif)
Khi mới nhìn vào hình ảnh trên, chắc hẳn bạn sẽ thấy có vẻ phức tap để có thể tạo ra một view như vậy. Nhưng thực sự nó không quá phức tạp.
Chúng ta sẽ phân tích cụ thể từng phần của view này, để có thể hiểu rõ ràng những thứ tạo nên view này cũng như những thứ mà ta cần tạo.
## Phân tích custom view
Khi ta tạo một custom view, điều quan trọng là cần phải chia tách view thành những phần đơn giản và tìm ra cách để vẽ chúng, vậy nên ta sẽ phân tích view ở trên thành cách phần nhỏ hơn
![](https://images.viblo.asia/27dcb6d5-6c16-4557-b011-c58eba244b37.png)
Như bạn có thể thấy, đồ thị ở trên được tạo nên bởi hai phần chính: background và một đường đồ thị nằm phía trên. Background được tạo mởi những đường kẻ và chữ số, vậy nên không có gì phức tạp với phần này.
Phần tiếp theo của nó, là một đường đồ thị với hiệu ứng.
![](https://images.viblo.asia/205cbe34-3eca-4970-bb26-ccf407253430.gif)

Khác biệt duy nhất ở đây so với những ví dụ ở trên là ta cần phải tạo ra nhiều đường kẻ khác nhau được xuất hiện theo thứ tự.
Đầu tiên, hãy nhìn vào một đường và xác định các giá trị để vẽ nó.

Trong Android, một đường thẳng được vẽ bằng cách xác định điểm bắt đầu (X;Y) và điểm kết thúc (X;Y). Trong ví dụ của chúng ta, ta sẽ chỉ xác định tọa độ kết thúc, còn tọa độ bắt đầu vẫn giữ lại. Thêm vào đó, tại mỗi điểm kết thúc (trừ điểm cuối) ta sẽ thêm một vòng tròn nhỏ ở cuối. Vòng tròn này sẽ hiện ra với hiệu ứng alpha.

Tóm tắt lại, để vẽ một đường thẳng với một vòng tròn nhỏ tại điểm kết thúc của nó, ta sẽ cần ba giá trị là: tọa độ (X;Y) của điểm kết thúc và color alpha của hiệu ứng alpha.
```
private ValueAnimator createAnimator() {
	PropertyValuesHolder propertyX = PropertyValuesHolder.ofInt(PROPERTY_X, 100, 300);
	PropertyValuesHolder propertyY = PropertyValuesHolder.ofInt(PROPERTY_Y, 100, 300);
	PropertyValuesHolder propertyAlpha = PropertyValuesHolder.ofInt(PROPERTY_ALPHA, 0, 255);

	ValueAnimator animator = new ValueAnimator();
	animator.setValues(propertyX, propertyY, propertyAlpha);
	animator.setDuration(2000);
	animator.setInterpolator(new AccelerateDecelerateInterpolator());

	animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
		@Override
		public void onAnimationUpdate(ValueAnimator valueAnimator) {
			//TODO invalidate view with new values
		}
	});

	return animator;
}
```
*Lưu ý: Các giá trị đang được hardcode để demo*

Tiếp theo, đồ thị mà ta cần vẽ có nhiều nét nối lại, do đó ta sẽ cần đến ValueAnimator như đã nhắc tới ở trên để có thể chỉ định những thuộc tính cho từng đường, từ đó ta có thể tạo ra một tập ValueAnimator để tạo nên đồ thị.

Sau đó, ta lại cần phải thực hiện một loạt các ValueAnimator theo đúng thứ tự, vậy nên ta sẽ dùng tới AnimatorSet.

Class này sẽ cho phép ta thực hiện một tập hợp các Animator object theo một thứ tự định trước. Animator có thể được thực hiện cùng nhau, hay theo thứ tự, hay theo một khoảng delay nhất định nào đó. Với AnimatorSet, ta có thể điều khiển những Animator và cho chúng thực hiện theo bất kỳ thứ tự nào ta mong muốn
```
AnimatorSet animatorSet = new AnimatorSet();
List<Animator> animatorList = ... //collection of ValueAnimator
animatorSet.playSequentially(animatorList);
animatorSet.start();
```
*Lưu ý: AnimatorSet sẽ thực hiện với thời gian bằng tổng thời gian của các Animator mà nó chứa.*

Thực hiện với AnimatorSet sẽ cho ta nhận được các đường kẻ theo đúng như ta mong muốn.
# Tổng kết
Qua những ví dụ trên, hi vọng bạn đã hiểu thêm về việc tạo ra một custom view trong Android, từ đó sẽ giúp cho ứng dụng của bạn trở nên độc đáo hơn, phù hợp với những yêu cầu đặc biệt. Bài viết không thể tránh được những thiếu sót, mong bạn có thể đóng góp ý kiến phía dưới để mình có thể bổ sung thêm.
Ngoài ra bạn có thể tham khảo project ChartView trên GitHub để có thể hiểu thêm về cách tạo một đồ thị hoàn chỉnh.

Tài liệu tham khảo:
https://proandroiddev.com/android-bring-life-to-your-custom-view-8604ab3967b3

Project về đồ thị:
https://github.com/romandanylyk/ChartView