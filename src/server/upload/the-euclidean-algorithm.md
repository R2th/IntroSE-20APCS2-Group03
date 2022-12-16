# 1. Introduction
Đây là một giải thuật để tính ước chung lớn nhất (GCD - Greatest Common Divisor) của hai số nguyên, là số lớn nhất có thể chia được bởi hai số nguyên đó với số dư bằng không.

Thuật toán **Euclidean** cho hai số nguyên A và B được mô tả bằng các bước như sau:

1. Nếu **A = 0** thì **GCD (A, B) = B**, vì **GCD (0, B) = B**, và chúng ta có thể dừng lại.
2. Nếu **B = 0** thì **GCD (A, B) = A**, vì **GCD (A, 0) = A**, và chúng ta có thể dừng lại.
3. Biểu diễn A dưới dạng phần dư và thương số (**A = B⋅Q + R**)
4. Tìm **GCD(B,R)** sử dụng thuật toán Euclidean vì **GCD(A,B)** = **GCD(B,R)**


Ví dụ tìm ước chung lớn nhất của 38 và 16.

![visualize.png](https://images.viblo.asia/f005c772-86e3-4374-b5a4-3cd752d2b130.png)

![euclidean-algorithm-1.png](https://images.viblo.asia/54c0edfc-7649-4131-8aae-d091c2d218c7.png)

![euclidean-algorithm-2.png](https://images.viblo.asia/b8ef02d2-1863-47c0-ae3b-ec9c9bedfcb0.png)

![euclidean-algorithm-3.png](https://images.viblo.asia/e5f41f10-07a5-4650-b785-7114d49f3521.png)

![euclidean-algorithm-4.png](https://images.viblo.asia/90ea06ec-8ca4-4a25-a4d6-00244b998c38.png)

![euclidean-algorithm-5.png](https://images.viblo.asia/d1fdbfc4-1c9d-4100-8ae4-5a15c2e2013c.png)

# 2. Proof of correctness
Nếu khảo sát thuật toán này, chúng ta có thể thấy rằng, thuật toán **Euclidean** sử dụng những tính chất sau:
- GCD(A,0) = A
- GCD(0,B) = B
- Nếu **A = B⋅Q + R** và **B ≠ 0** thì **GCD(A,B) = GCD(B,R)** nếu Q là một số nguyên, R là một số nguyên $\in [0, B-1]$

Hai tính chất đầu tiên cho phép chúng ta tìm ước chung lớn nhất nếu một trong hai số bằng 0, **tính chất thứ ba cho phép chúng ta chuyển từ một vấn đề lớn hơn, khó giải quyết hơn thành một vấn đề nhỏ hơn, dễ giải quyết hơn**.
Thuật toán **Euclidean** sử dụng tính chất thứ 3 để nhanh chóng chuyển bài toán ban đầu về một bài toán đơn giản hơn cho đến khi nó có thể được giải quyết bằng cách sử dụng một trong hai tính chất đầu tiên.

Và để hiểu hơn thì chúng ta sẽ bắt tay vào việc chứng minh những tính chất nêu trên là đúng.

### GCD(A,0)=A
- Số nguyên lớn nhất A có thể chia hết chính là A
- 0 chia hết cho A
- 0 và A đều chia hết cho A nên $GCD(A,0) = A$

### GCD(0,B)=B
- Tương tự như trên nhưng thay A bằng B.

### GCD(A,B)=GCD(B,R)
Để chứng minh bổ đề trên, trước hết chúng ta cần chứng minh bổ đề sau đây là đúng: $GCD(A,B)=GCD(B,A-B).$

![image.png](https://images.viblo.asia/6b77a9bb-23ec-4579-bdb1-e3b1b6230349.png)

Giả sử chúng ta có ba số nguyên A, B và C sao cho $A-B = C$

Ta có:

$\begin{rcases}
   C=A-B\\
   A=X⋅GCD(A,B) \\
   B=Y⋅GCD(A,B)
\end{rcases}⇒C=(X - Y)⋅GCD(A,B)$

**=> C chia hết cho ước chung lớn nhất của A và B (1).**

![image.png](https://images.viblo.asia/6e6667e2-5199-4def-9c21-173bd13bb375.png)

$\begin{rcases}
   A=B+C\\
   B=M⋅GCD(B,C) \\
   C=N⋅GCD(B,C)
\end{rcases}⇒A=(M + N)⋅GCD(B,C)$

**=> A chia hết cho ước chung lớn nhất của B và C (2).**

![image.png](https://images.viblo.asia/1a94b618-e442-4dd4-acba-e710628859ca.png)

**GCD(B,C) là ước chung lớn nhất của B và C (3)**.

**GCD(A,B) là ước chung lớn nhất của A và B (4)**.

$\begin{rcases}
   GCD(A,B) \mid B, C&\    (1) \\
   GCD(B,C) \mid B, C&\    (3)\\
   GCD(B,C) \mid A,B&\     (2)\\
   GCD(A,B) \mid A,B&\     (4)
\end{rcases}⇒$

$\begin{rcases}
   (1)(3) &\   GCD(B,C) \geqslant GCD(A,B) \\
   (2)(4) &\ GCD(A,B) \geqslant GCD(B,C)
\end{rcases}⇒GCD(A,B) = GCD(B,C)⇒GCD(A,B) = GCD(B,A-B)$

![image.png](https://images.viblo.asia/4a25ea0a-405d-4a80-a9e7-2d88ab29ab8d.png)


$\begin{rcases}
   A = B⋅Q + R\\
   GCD(A,B) = GCD(B,A-B) = GCD(A-B, B)\\
\end{rcases}⇒$

$\begin{rcases}
   A = B⋅Q + R\\
   GCD(A,B) = GCD(A - B,B) = GCD(A - 2B,B)
\end{rcases}⇒$

$\begin{rcases}
   R = A - B⋅Q\\
   GCD(A,B) = GCD(A - B.Q,B) = GCD(R,B)
\end{rcases}⇒ GCD(A,B) = GCD(B,R)$

# 3. Reference
- https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
- https://www.youtube.com/watch?v=B5HKW99AvV0
- https://www.geogebra.org/m/vwwezney
- https://medium.com/i-math/why-does-the-euclidean-algorithm-work-aaf43bd3288e