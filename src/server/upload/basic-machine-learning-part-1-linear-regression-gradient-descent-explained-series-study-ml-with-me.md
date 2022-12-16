Chào mừng các bạn tới series tự học Machine Learning cùng mình. Mình tên là Khang và mình đang trong quá trình ôn tập kiến thức máy học. Mục đích của mình viết series này để chia sẻ kiến thức cơ bản về máy học (ML). Trong quá trình viết bài này, mình có thường sử dụng những từ ngữ chuyên ngành bằng tiếng anh, mình mong các bạn bỏ qua. Ngoài ra, sau khi các bạn đọc bài thì có thắc mắc hay phát hiện mình có sai sót gì thì có thể comment lại ở dưới giúp mình, mình sẽ cố gắng dành thời gian giải đáp.

Trong phần 1 (Part 1) này, mình sẽ giới thiệu sơ qua về kiến thức **Linear Regression** và cách mình optimize Cost function bằng cách dùng **Gradient Descent**. 
<h1>1. Machine Learning overview</h1>

Let's get started. Vậy thì machine learning là gì ? Machine learning [(Máy học)](https://www.ibm.com/cloud/learn/machine-learning) là một nhánh của AI (artificial intelligence) để tập trung vào việc sử dụng data và thuật toán của máy cho việc bắt chước con người trong việc học và cải thiện accuracy . Machine learning được dùng trong nhiều lĩnh vực như:


* Ngân hàng (Fraud Detection)
* Kinh Doanh (Stock prediction)

Phần trên này mình chỉ lược sơ qua lại kiến thức overview của Machine Learning. Còn bây giờ mình sẽ vô trọng tâm của bài hôm nay.

# 2. Linear Regression

## Tổng quát + Ví dụ
Linear Regression chỉ là 1 công thức `f(x) = ax + b ` bình thường trong toán học của mình với 1 giá trị của x sẽ đưa ra 1 giá trị của y. Thế nhưng, trong thực tế, có rất nhiều dữ liệu (x, y) khi ta cho x vào phương trình `f(x) = ax + b `, thì giá trị f(x) khác với giá trị y của dữ liệu. Đây là 1 bài toán của Supervised Learning.

Ví dụ thực tế:
Ta có phương trình ` f(x) = 1 + 3x` và 2 dữ liệu giá trị (x, y):  A(1, 4) và B(2, 5)
Lúc ta thế A vào phương trình, ta có `f(1) = 1 + 3 * 1 = 4 = y` => A là điểm nằm trên đường thẳng của f(x).

Thế nhưng, khi chúng ta thế B vào phương trình trên, ta có `f(2) = 1 + 3 * 2 = 7 != y (y = 5)`. Từ đây, ta thấy được là B không nằm trên đường thẳng của function $f(x)$, tương đương với việc function $f(x)$ có sai số trong việc predict giá trị của điểm B với giá trị $x_B$.

Tương tự như vậy, nếu ta có rất nhiễu dữ liệu giá trị (x, y) thì ta sẽ plot được 1 line graph dưới đây.

<div align="center]">
    
![image.png](https://images.viblo.asia/711127ff-230c-44f5-ae64-90692396cdb6.png)  [Click here to see image](https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2Fmax%2F1400%2F1*I-MxKoiWxJXLfExpvbT1eQ.png&imgrefurl=https%3A%2F%2Fvsahasrabudhe.medium.com%2Flinear-regression-with-gradient-descent-the-basic-machine-learning-algorithm-a994db2a3f97&tbnid=SvyXA3pbLNWKcM&vet=12ahUKEwjPhOqU8Nv4AhVHitgFHal7AlwQMygFegUIARCyAQ..i&docid=etILr2IxhvmUtM&w=1292&h=810&q=linear%20regression&hl=vi&client=safari&ved=2ahUKEwjPhOqU8Nv4AhVHitgFHal7AlwQMygFegUIARCyAQ)
</div>


Trong đó: 
* line (đường màu đỏ) là function f(x)
* Các chấm là dữ liệu của x và y

Qua đó, ta nhận biết được đường màu đỏ (f(x)) có thể được gọi là 1 machine learning model.

Ví dụ ở trên chỉ biểu diễn 1 function của f(x) với giá trị của y phụ thuộc vào 1 giá trị của x.
Trong trường hợp f(x) là 1 function có nhiều biến $x_1, x_2, x_3, .... , x_n$

Ví dụ: Trong bài toán House Prediction như hình ở dưới



<div align="center]">

   ![image.png](https://images.viblo.asia/1dfb8d52-4215-4896-b238-b33d27c5ea8b.png) [Click here to see image](https://linuxhint.com/house-price-prediction-linear-regression/)

</div>
Ta thấy rằng Price phụ thuộc vào rất nhiều yếu tố như: số phòng ngủ, số nhà tắm, diện tích, etc... 

Những yếu tố đó là  $x_1, x_2, x_3, .... , x_n$. 

Từ đó, ta có công thức tổng quát của Linear Regression trong Machine Learning là:


`h(x)` = $\Theta _0 + \Theta _1 * x_1 + \Theta _2 * x_2 + ... + \Theta _n * x_n$

Trong đó:
* $x_1 -> x_n$ : là các giá trị tương ứng với các cột trong data
* $\Theta _0 -> \Theta _n$: trọng số (weights) của những giá trị tương ứng với các cột (weight càng cao thì ảnh hưởng của cột đó càng lớn)

## Cách đo độ sai số của Linear Regression (Measure Performance)

Để đo lường độ sai số của function trong việc predict các giá trị y dựa trên nhiều biến x, ta có 1 function khác gọi là **Loss Function**
Loss Function: $L(y_{predicted}, y_{actual}) = 1/2 * (h(x) - y_{actual}) ^ 2$. Loss function này ta tính cho từng data point. 

Ví dụ:

Ta có predicted function: $h(x) = ax + b$ với a = 2 và b = 3 : $h(x) = 2x + 3$ và data point là $A(2, 5)$ với x = 2  và y = 5.

Khi thế giá trị x vào predicted function, ta có: $h(x) = 2 * 2  + 3 = 7$ khác với giá trị $y_{actual} = 5$

Từ đó, ta tính được Loss Function của function $h(x)$ tại điểm $A(2, 5)$ là:

$L(y_{predicted}, y_{actual}) = 1/2 * ( 7 - 5) ^ 2 =  1/2 * 4 = 2$

<br>

Thế nên, để tính Loss Function cho toàn bộ training set (toàn bộ data point có được), **Cost Function** sẽ được dùng để tính tổng quát performance cho $h(x)$.


**Cost Function** : $J(θ_0 -> θ_m) = (1/n) * \Sigma_{i=0}^{n} (h(x^{i}) - y_{actual}) ^ 2$

Trong đó:
* i: data thứ i (hàng thứ mấy)
* n: tổng data (tổng hàng row)
* $h(x^i)$ : giá trị dự đoán (predicted value)
* m: tổng các cột (features)

Để function $h(x^i)$ dự đoán được tốt nhất, chúng ta **phải tìm $\Theta$ (weight) của $h(x)$** sao cho **Cost Function** có giá trị là **minimum** .

## Gradient Descent

Có rất nhiều cách để minimize 1 function nói chung và Cost Function nói riêng. Nhưng trong bài này, mình chỉ đề cập tới Gradient Descent.



Hình bên dưới mình sẽ plot 1 graph function:

![image.png](https://images.viblo.asia/94089b78-d8da-4fa6-a0bb-986a9033ff1e.png) [Click here to see image](https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.analyticsvidhya.com%2Fwp-content%2Fuploads%2F2019%2F06%2Fgraph_20190531_101207.png&imgrefurl=https%3A%2F%2Fwww.analyticsvidhya.com%2Fblog%2F2019%2F08%2Fdetailed-guide-7-loss-functions-machine-learning-python-code%2F&tbnid=H0fOKUq61tpMDM&vet=12ahUKEwjf_Kiu_tv4AhXGyKACHSxWClEQMyhFegQIARBq..i&docid=K-dArYaKrHdAtM&w=850&h=525&q=Loss%20function&client=safari&ved=2ahUKEwjf_Kiu_tv4AhXGyKACHSxWClEQMyhFegQIARBq)

Tổng quát, thường thường thì 1 Cost Function sẽ được assume là convex function (hàm lõm) (có trường hợp không convex, nhưng mình không đề cập trong bài này). Để tìm được giá trị minimum của Cost Function, chúng ta cần phải tới (hay **hội tụ**)  tại điểm local minimum (trong trường hợp $h(x)$ có 1 local minimum, mình lấy ví dụ đơn giản cho mấy bạn dễ hiểu, còn nhiều trường hợp khác có multiple local minima, mình sẽ nói ở những bài sau) của convex function. 

![image.png](https://images.viblo.asia/cf25cd4e-c5f9-4b84-9a48-21d518b55d2c.png)[Click here to see the motion detail](https://camo.githubusercontent.com/a401a48f5503c52004369148a784e779aa7e3411/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a70775049472d475748796150564d564747354f6841512e676966) 

Gradient Descent tận dùng việc đạo hàm (derivatives) tại điểm bắt đầu để xác định được hướng cho bước tiếp theo (những dấu chấm đen di chuyển trên màu đỏ parabol - hình bên trái). Khi càng gần về local minimum, sự khác biệt của vị trí (giá trị) của Cost Function trước và sau khi thay đổi sẽ càng nhỏ. Khi tới được local minimum, thì đạo hàm tại đó sẽ bằng 0 đồng nghĩa với việc chúng ta đã thành công minimize được Loss Function. Nhìn hình bên phải, ta thấy đường line (function f(x)) di chuyển khi chấm đen (hình bên phải) di chuyển về phía local minimum. Từ đó ta thấy được có sự thay đổi của $\Theta$ ở f(x). Sau khi minimize được Loss Function, ta sẽ có giá trị của $\Theta$. Khi đó, ta gán giá trị của 
$\Theta$ vào phương trình f(x) ban đầu để thực hiện việc dự đoán (Prediction).

Ở đây, mình sẽ nói các bước dùng Gradient Descent để minimize cost:

* Bước 1: Ngẫu nhiên đặt giá trị của $\Theta. ( $\Theta_{0}$ - >  $\Theta_{m}$ với m là tổng số features trong dataset).
* Bước 2: Thay đổi  $\Theta_{j}$ ( 0 <= j <= m)
    *  $\Theta_{j} <- -  \Theta_{j (old)} - \alpha$ $\frac{\delta  J(\Theta_{0} -> \Theta_{m})}{\delta  \Theta_{j}}$ 
    *  Tiếp tục chạy bước 2 cho đến khi thoả mãn 2 điều kiện này:
        *  Thoả mãn điều kiện số iteration yêu cầu (được người dùng điền vào).
        *  Khi $\Theta_{j}$ và $\Theta_{j (old)}$ có sự khác biệt cực kì nhỏ.

Trong đó:
* $\Theta_{j (old)}$ : là giá trị cũ
* $\Theta_{j}$ : là giá trị mới được update
* $\alpha$: là learning rate
* $\frac{\delta  J(\Theta_{0} -> \Theta_{m})}{\delta  \Theta_{j}}$: đạo hàm của Cost Function

### Chú ý: Learning rate $\alpha$

Ta chú ý trong việc chọn $\alpha$ learning rate (nhìn hình bên dưới để dễ hình dung):
* Nếu $\alpha$ quá nhỏ, thì quá trình hội tụ tại điểm local minimum rất là lâu.
* Nếu $\alpha$ quá lớn, thì quá trình hội tụ tại điểm local minimum sẽ bị overshooting (nhảy qua lại, thậm chí có trường hợp không về lại được local minimum - phân kì).

![image.png](https://images.viblo.asia/410b7eff-20c4-4794-b219-04726145dcd8.png)[Click here to see image](https://www.jeremyjordan.me/nn-learning-rate/)


# 3. Tổng kết

Vậy là chúng ta mới làm quen với Linear Regression và cách dùng Gradient Descent để tăng performance của Linear Regression model. Trong bài này, chúng ta cần hiểu kĩ cách hoạt động của Linear Regression model hoạt động như thế nào và cách để tăng accuracy của model. Gradient descent đã tận dụng được đạo hàm trong toán học để giúp cho quá trình hội tụ nhanh hơn. Bên cạnh đó, việc lựa chọn Learning rate $\alpha$ cũng ảnh hưởng đến kết quả của việc tìm được local minimum trong Cost Function đơn giản.

Đây là bài viết đầu tiên của mình, nếu có còn sai sót thì mong các bạn bỏ qua và comment phía dưới giúp mình để mình có thể ra được những bài chất lượng hơn trong tương lai gần. Đương nhiên là mình sẽ tiếp tục Series Study ML with me để giúp các bạn cũng như bản thân mình củng cố kiến thức Machine Learning.  Mình cám ơn các bạn đã theo dõi mình tới tận đây.  Peace out !