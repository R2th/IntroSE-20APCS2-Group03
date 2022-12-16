#### **Bài viết này sẽ hướng dẫn các bạn sử dụng Machine Learning để áp dụng các thuật toán classications lên tập dữ liệu mẫu Iris**

Các bạn có thể download dataset Iris này từ trang web của UCI https://archive.ics.uci.edu/ml/datasets/iris
Hoặc trong thư viện sklearn cũng có luôn bộ dữ liệu này rồi.
Trong bài viết này mình sẽ dùng cách download chay các bạn nhé.

**Lấy dữ liệu**

![](https://images.viblo.asia/e246ce29-3503-4410-8b20-a4dbc53540a2.png)

![](https://images.viblo.asia/dc4fd2c4-91d4-4380-9e95-ff44730473be.png)

![](https://images.viblo.asia/7939fb52-86f5-4dd4-9d33-1c17d5195e1f.png)

![](https://images.viblo.asia/99954d06-939f-474c-852d-9349caaee3e5.png)

![](https://images.viblo.asia/11852844-cf43-4f8d-a2f3-defd1f8f1a75.png)


**Summary của dataset** 

![](https://images.viblo.asia/b7bdec9a-550c-4ece-a4cb-2bf3f81be568.png)

![](https://images.viblo.asia/6d99a9ec-4aa5-485a-863e-cd97bc93f5fb.png)

![](https://images.viblo.asia/4946f873-ff26-4457-be50-50bd929094d9.png)

![](https://images.viblo.asia/2f27d64b-45cc-4ff3-b5af-3c0516d04b65.png)


**Áp dụng các Classication model khác nhau**

Import thư viện cần thiết

![](https://images.viblo.asia/6a0faec9-71e4-4e28-88bf-b7be7588d033.png)

Tách dữ liệu thành các biến độc lập và không độc lập

Sau đó tách bộ dữ liệu thành 2 phần Training set và Test set

![](https://images.viblo.asia/fe7b69ab-cb11-444d-89f0-871cc7bd798f.png)
Sử dụng Logistic Regression 


![](https://images.viblo.asia/cb1957fb-6b51-4f40-9248-697aea43a8ee.png)

Dùng thuật toán Naive Bayes, ta được độ chính xác 96,67%
![](https://images.viblo.asia/512b4355-d4a1-41ef-8276-7b17fbb831b7.png)

Dùng thuật toán SVC ta được độ chính xác 100%
![](https://images.viblo.asia/f06fa511-50b5-46a9-be06-604da2d7848e.png)

Dùng thuật toán K láng giềng gần nhất được độ chính xác 100%
![](https://images.viblo.asia/33eb4607-13de-4c68-9a2c-795e7fd6add9.png)

Dùng cây quyết định ta được độ chính xác 100%
![](https://images.viblo.asia/80ab4620-080f-4d9e-9b74-39f341c08a0d.png)


Trên đây ta đã dùng bộ dữ liệu Iris để thử nghiệm một số thuật toán phân loại dữ liệu, kiến thức chỉ ở mức cơ bản thôi, từ đây, các bạn áp dụng lên một số bộ dữ liệu phức tạp hơn thử xem nhé.




Nguồn tham khảo: https://www.kaggle.com/adityabhat24/iris-data-analysis-and-machine-learning-python?fbclid=IwAR0PhbY4AB1ycGRZ4cajjjOpSbHIxtmzuIT1cMeZHB9VqYNTDl0FiMM56Sw