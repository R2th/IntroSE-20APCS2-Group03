Hệ thống gợi ý là một hệ thống sử dụng các dữ liệu thu thập được từ người dùng nhằm dự đoán, gợi ý cho người dùng những sản phẩm, tính năng, dịch vụ mà người dùng có thể thích, từ đó nâng cao được chất lượng dịch vụ và thu lại lợi nhuận. Vậy cách để thực hành xây dựng một hệ thống gợi ý như thế nào? Bài viết này mình sẽ hướng dẫn các bạn xây dựng một hệ thống gợi ý đơn giản nhưng khá là hiệu quả trong thực tế, chỉ cần bạn là một người biết code cơ bản, chỉ cần bạn làm theo những gì mà mình hướng dẫn dưới đây, bạn sẽ xây dựng được một hệ thống gợi ý sản phẩm có thể áp dụng trực tiếp vào việc buôn bán thực tế của mình hay người thân. Nào, hãy thử làm xem sao!
# Ratings Matrix
Khi bạn đánh giá một trang fanpage trên facebook, hay đánh giá một sản phẩm ở một trang web mua sắm nào đó, chúng ta thường có các đánh giá dưới dạng ratings có điểm số từ 1 đến 5 hay 1 đến 7. Chúng ta sẽ dựa trên các đánh giá này của người dùng lên các sản phẩm để đưa ra gợi ý mua sắm cho người dùng. Một ví dụ của bảng ratings mà chúng ta nhận được như sau: 


| User/Item| 0        |     1    |   2      |    3     |    4     |     5    |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | 
| 0        | 7        |    6     |    7     |    4     |    5     |    4     |
| 1        | 6        |    7     |    ?     |    4     |    3     |    4     |
| 2        | ?        |    3     |    3     |    1     |    1     |    ?     |
| 3        | 1        |    2     |    2     |    3     |    3     |    4     |
| 4        | 1        |    ?     |    2     |    2     |    3     |    3     |

Dấu hỏi ở đây đại diện cho những rating mà người dùng chưa đánh giá cho sản phẩm, việc làm của chúng ta là cần phải dự đoán giá trị trong các dấu hỏi này. Nếu giá trị dự đoán được là cao, có khả năng cao rằng người dùng sẽ thích sản phẩm đó, và chúng ta đưa ra gợi ý cho người dùng.
# Ý tưởng của User-based Collaborative Filtering
Ý tưởng cơ bản của User-based Collaborative Filtering như sau: 
* Giả sử trong quá khứ của người dùng A, người này thích giày thể thao hiệu XYZ, mũ hiệu UVT, kính râm hiệu MNP. Cũng tương tự trong quá khứ của B, B cũng thích giày thể thao hiệu XYZ, mũ hiệu UVT. Ta nhận thấy rằng sở thích của hai người này khá là giống nhau, do A có thích thêm kính râm hiệu MNP, có khả năng cao rằng B cũng thích kính râm hiệu MNP này, ta sẽ gợi ý cho B mua sản phẩm này. <br>

## Phương pháp thực hiện 
Công việc mà chúng ta cần làm để dự đoán được sở thích của một người dùng $u$ lên một sản phầm $i$ gồm 2 bước như sau:
1. Đầu tiên, chúng ta phải tìm được nhóm người có chung sở thích với người dùng $u$ này thông qua bảng ratings mà chúng ta đã có.
2. Sau đó, dựa trên nhóm người mà chúng ta có chung sở thích với $u$ mà chúng ta tìm được và các đánh giá của nhóm người này lên sản phẩm $i$, chúng ta sẽ dự đoán đánh giá của người dùng $u$ lên sản phẩm $i$.

Quy trình khá là đơn giản phải không?

# Coding
Trước tiên chúng ta định nghĩa ma trận ratings ở trên:
```python
import numpy as 

nan = np.nan # not a number đại diện cho các sản phẩm chưa được đánh giá
ratings_matrix = np.array([[7, 6, 7, 4, 5, 4], 
                           [6, 7, nan, 4, 3, 4],
                           [nan, 3, 3, 1, 1, nan],
                           [1, 2, 2, 3, 3, 4],
                           [1, nan, 1, 2, 3, 3]])
```
Ma trận rating của chúng ta có kích thước là $m \times n$, ký hiệu là $R = [r_{uj}]$, trong đó, $m$ là số lượng người dùng (user) và $n$ là số lượng sản phẩm (items); $r_{uj}$ là điểm đánh giá của user $u$ lên item $j$. Ví dụ ở trong bảng trên ta có $r_{10} = 6$ là điểm đánh giá của user $ 1 $ cho item $ 0 $. Chúng ta ký hiệu $I_u$ là tập hợp các sản phẩm mà đã được đánh giá bởi user $u$, khi đó dựa theo bảng trên ta có $I_2 = {1, 2, 3, 4}$ . Tập hợp các sản phẩm được đánh giá bởi cả hai người dùng $u$ và $v$ được ký hiệu là $I_u \cap I_v$ <br>
```python
# indices for vector
def specified_rating_indices(u):
    return list(map(tuple, np.where(np.isfinite(u))))
```
Có một lưu ý nhỏ ở đây khi nói về đặc điểm cá nhân của người dùng: có những người dùng dễ tính thông thường sẽ đánh giá điểm cho các sản phẩm cao hơn so với những người dùng khó tính. Vì vậy, để khách quan hơn, chúng ta sẽ trừ điểm đánh giá của mỗi người dùng một lượng bằng trung bình điểm đánh giá của người dùng đó. Điểm trung bình của người dùng đó được tính như sau:<br><br>

$$
\mu_u = \dfrac{\Sigma_{k \in I_u} r_{uk}}{|I_u|}
$$

```python
def mean(u):
    # may use specified_rating_indices but use more time
    specified_ratings = u[specified_rating_indices(u)]#u[np.isfinite(u)]
    m = sum(specified_ratings)/np.shape(specified_ratings)[0]
    return m
```
```python
def all_user_mean_ratings(ratings_matrix):
    return np.array([mean(ratings_matrix[u, :]) for u in range(ratings_matrix.shape[0])])
```
```python
def get_mean_centered_ratings_matrix(ratings_matrix):
    users_mean_rating = all_user_mean_ratings(ratings_matrix)
    mean_centered_ratings_matrix = ratings_matrix - np.reshape(users_mean_rating, [-1, 1])
    return mean_centered_ratings_matrix
```

Ta có được ma trận sau khi đã trừ đi trung bình ratings như sau:
```python
mean_centered_ratings_matrix = get_mean_centered_ratings_matrix(ratings_matrix)
# array([[ 1.5,  0.5,  1.5, -1.5, -0.5, -1.5],
         [ 1.2,  2.2,  nan, -0.8, -1.8, -0.8],
         [ nan,  1. ,  1. , -1. , -1. ,  nan],
         [-1.5, -0.5, -0.5,  0.5,  0.5,  1.5],
         [-1. ,  nan, -1. ,  0. ,  1. ,  1. ]])
```

Để tính được sự giống nhau giữa các người dùng, chúng ta sẽ sử dụng điểm đánh giá của người dùng đó lên tất cả các sản phẩm làm vector đại diện cho người dùng, rồi so sánh các vector với nhau để tìm sự giống nhau. Có nhiều hàm toán học để tính toán độ giống nhau giữa các vector như Pearson, Cosine, ... Ở đây chúng ta sử dụng Pearson (code của hàm này khác phức tạp, bạn có thể bỏ qua hàm này), hàm này được xây dựng như sau:
$$
Sim(u, v) = Pearson(u, v) = \dfrac{\Sigma_{k \in I_u \cap I_v}(r_{uk} - \mu_u)(r_{vk} - \mu_v)}{\sqrt{\Sigma_{k \in I_u \cap I_v}(r_{uk} - \mu_u)^2}\sqrt{\Sigma_{k \in I_u \cap I_v}(r_{vk} - \mu_v)^2}}
$$
Ví dụ:
$$
pearson(user_0, user_2) = \dfrac{(6 - 5.5) * (3 - 2) + (7 - 5.5) * (3 - 2) + (4 - 5.5) * (1 - 2) + (5 - 5.5) * (1 - 2)}{\sqrt{1.5^2 + 1.5^2 + (-1.5)^2 + (-0.5)^2}.\sqrt{1^2 + 1^2 + (-1)^2 + (-1)^2}} = 0.894
$$
```python
def pearson(u, v):
    mean_u = mean(u)
    mean_v = mean(v)
    
    specified_rating_indices_u = set(specified_rating_indices(u)[0])
    specified_rating_indices_v = set(specified_rating_indices(v)[0])
    
    mutually_specified_ratings_indices = specified_rating_indices_u.intersection(specified_rating_indices_v)
    mutually_specified_ratings_indices = list(mutually_specified_ratings_indices)
    
    u_mutually = u[mutually_specified_ratings_indices]
    v_mutually = v[mutually_specified_ratings_indices]
      
    centralized_mutually_u = u_mutually - mean_u
    centralized_mutually_v = v_mutually - mean_v

    result = np.sum(np.multiply(centralized_mutually_u, centralized_mutually_v)) 
    result = result / (np.sqrt(np.sum(np.square(centralized_mutually_u))) * np.sqrt(np.sum(np.square(centralized_mutually_v))))

    return result
```

Để tính độ giống nhau giữa hai người dùng **1** và **2**, ta sử dụng hàm $Pearson$ như sau:
```python
print(pearson(ratings_matrix[1, :], ratings_matrix[2, :]))
# Result: 0.9384742644069303
```

Để tính được độ giống nhau giữa user $ 2 $ với các user khác:
```python
for i in range(ratings_matrix.shape[0]):
    print(pearson(ratings_matrix[i, :], ratings_matrix[2, :]))

#Result: 
0.8944271909999159
0.9384742644069303
1.0
-1.0
-0.8164965809277259
```
Để dễ dàng hơn, chúng ta sẽ đưa vào hàm để tiện sử dụng sau này:
```python
def get_user_similarity_value_for(u_index, ratings_matrix):
    user_ratings = ratings_matrix[u_index, :]
    similarity_value = np.array([pearson(ratings_matrix[i, :], user_ratings) for i in range(ratings_matrix.shape[0])])
    return similarity_value
```

Và để lấy được ma trận tương quan (độ giống nhau giữa các user):
```python
def get_user_similarity_matrix(ratings_matrix):
    similarity_matrix = []
    for u_index in range(ratings_matrix.shape[0]):
        similarity_value = get_user_similarity_value_for(u_index, ratings_matrix)
        similarity_matrix.append(similarity_value)
    return np.array(similarity_matrix)

user_similarity_matrix = get_user_similarity_matrix(ratings_matrix)
print(user_similarity_matrix)

#Result:
[[ 1.          0.70066562  0.89442719 -0.8992288  -0.82199494]
 [ 0.70066562  1.          0.93847426 -0.71713717 -0.89866916]
 [ 0.89442719  0.93847426  1.         -1.         -0.81649658]
 [-0.8992288  -0.71713717 -1.          1.          0.87287156]
 [-0.82199494 -0.89866916 -0.81649658  0.87287156  1.        ]]

```

Dễ dàng nhận thấy rằng các phần tử trên đường chéo của ma trận bằng 1, có nghĩa là người dùng $u$ hoàn toàn giống với người dùng $u$. Các giá trị nhận được nằm trong khoảng $ -1 $ đến $ 1 $, giá trị càng cao thể hiện cho việc hai người dùng càng giống nhau. Ví dụ người dùng $ 0 $ giống với người dùng $ 1 $ và $ 2 $ hơn (với giá trị lần lượt là 0.70066562 và 0.89442719) so với người dùng $ 3 $ và người dùng $ 4 $ (với giá trị lần lượt là -0.8992288 và -0.82199494). Từ đây chúng ta có thể sử dụng các giá trị này để dự đoán những đánh giá chưa được hoàn thiện. <br>
Để dự đoán giá trị rating còn thiếu, ký hiệu $\hat{r_{uj}}$, ta sử dụng công thức sau:
$$
s_{uj} = r_{uj} - \mu_u
$$
$$
\hat{r_{uj}} = \mu_u + \dfrac{\Sigma_{v \in P_u(j)} Sim(u, v).s_{vj}}{\Sigma_{v \in P_u(j)} |Sim(u, v)|} = \mu_u + \dfrac{\Sigma_{v \in P_u(j)} Sim(u, v).(r_{vj} - \mu_v)}{\Sigma_{v \in P_u(j)} |Sim(u, v)|}
$$
trong đó $P_u(j)$ là tập hợp những người dùng giống với người dùng $u$ được chúng ta sử dụng để tính toán, mà đã đánh giá (rate) cho item $j$ <br>
Ví dụ, ta nhận thấy người dùng $ 2 $ chưa đánh giá cho item $ 0 $, ta sẽ dự đoán giá trị này như sau: Hai người dùng giống nhất với người dùng $ 2 $ là người dùng $ 0 $ và  người dùng $ 1 $ với giá trị lần lượt là $ 0.894 $ đã đánh giá 1.5 điểm và $ 0.938 $ đã đánh giá 1.2 điểm. Thay vào công thức trên ta được:
$$
\hat{r_{20}} = 2 + \dfrac{1.5 * 0.894 + 1.2 * 0.938}{0.894 + 0.938} \approx 3.35
$$

Tương tự với giá trị đánh giá của user $ 2 $ cho item $ 5 $:
$$
\hat{r_{25}} = 2 + \dfrac{-1.5 * 0.894 - 0.8 * 0.938}{0.894 + 0.938} \approx 0.86
$$

Qua hai điểm đánh giá mà chúng ta dự đoán được, chúng ta nhận thấy rằng là nên gợi ý item $ 0 $ cho người dùng $ 2 $ hơn là item $ 5 $. <br>
Hàm được xây dựng từ công thức như sau:
```python
def predict(u_index, i_index, k):
# k là số lượng người dùng giống với người dùng cần dự đoán
# ta có thể tùy chọn giá trị k này
    users_mean_rating = all_user_mean_ratings(ratings_matrix)
    
    similarity_value = user_similarity_matrix[u_index]
    sorted_users_similar = np.argsort(similarity_value)
    sorted_users_similar = np.flip(sorted_users_similar, axis=0)
        
    users_rated_item = specified_rating_indices(ratings_matrix[:, i_index])[0]
    
    ranked_similar_user_rated_item = [u for u in sorted_users_similar if u in users_rated_item]
    
    if k < len(ranked_similar_user_rated_item):
        top_k_similar_user = ranked_similar_user_rated_item[0:k]   
    else:
        top_k_similar_user = np.array(ranked_similar_user_rated_item)
            
    ratings_in_item = mean_centered_ratings_matrix[:, i_index]
    top_k_ratings = ratings_in_item[top_k_similar_user]
    
    top_k_similarity_value = similarity_value[top_k_similar_user]
    
    r_hat = users_mean_rating[u_index] + np.sum(top_k_ratings * top_k_similarity_value)/np.sum(np.abs(top_k_similarity_value))
    return r_hat
```

Ví dụ ta muốn dự đoán giá trị đánh giá của người dùng $ 2 $ cho item $ 0 $ dựa trên hai người dùng gần nhất, chỉ cần gọi:
```python
print(predict(2, 0, 2))
# Result: 3.3463952993809016
```

Và để dự đoán top-k items nên gợi ý nhất cho người dùng, ta sử dụng hàm:
```python
def predict_top_k_items_of_user(u_index, k_items, k_users):
    items = []
    for i_index in range(ratings_matrix.shape[1]):
        if np.isnan(ratings_matrix[u_index][i_index]):
            rating = predict(u_index, i_index, k_users)
            items.append((i_index, rating))
    items = sorted(items, key=lambda tup: tup[1])
    return list(reversed(items))
```
Để đưa ra 2 gợi ý cho người dùng $ 2 $ dựa trên 2 người dùng gần nhất:
```python
print(predict_top_k_items_of_user(2, 2, 2))
# Result: [(0, 3.3463952993809016), (5, 0.8584109681112306)]
```
 Như vậy chúng ta đã đưa ra được những sản phẩm cần gợi ý cho người dùng dựa trên phương pháp User-based Collaborative Filtering. Ngoài ra, chúng ta cũng có thể đưa ra những người dùng nào thích hợp nhất với một sản phẩm nào đó, để có thể đánh giá được sản phẩm đó thích hợp với nhóm người dùng nào, và nâng cao được chất lượng bán hàng. <br>
 Qua bài viết này, mình hi vọng các bạn có thể hiểu được cách xây dựng một hệ thống gợi ý bằng cách thực hành coding. Trong những bài viết lần sau mình sẽ cố gắng thực hiện những phương pháp khác để xây dựng một hệ thống gợi ý để so sánh được ưu nhược điểm của các phương pháp. Nếu có bất kỳ câu hỏi nào, vui lòng để lại ở phần bình luận phía dưới. Cảm ơn các bạn đã đọc bài và tiếp tục ủng hộ Viblo.