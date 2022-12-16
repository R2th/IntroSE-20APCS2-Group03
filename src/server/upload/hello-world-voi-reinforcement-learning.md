Xin chào các bạn. Tiếp nối series về **[Reinforcement Learning (RL)](https://viblo.asia/s/reinforcement-learning-yEZkg8kyZQ0)**, hôm nay mình xin giới thiệu một ví dụ đơn giản có thể coi như là *"Hello world"* của RL. 

# 1. Giới thiệu
Trong bài trước [Đôi điều cơ bản về học tăng cường ](https://viblo.asia/p/doi-dieu-co-ban-ve-hoc-tang-cuong-ORNZqAYrZ0n) mình đã giới thiệu một số khái niệm của RL. Trong đó môi trường và các trạng thái, phần thưởng là những yếu tố quan trọng. Để cho có thể học được những chiến lược tối ưu hoặc tìm được chuỗi hành động tối ưu, tác nhân phải thử nhiều lần và học từ các lần thử đó, và rất khó để cho tác nhân có thể học được trong thế giới thực. Do đó việc mô phỏng lại môi trường là rất quan trọng. Rất may [OpenAI](https://openai.com/) đã có một opensource mang tên [Gym](https://www.gymlibrary.ml/content/api/) để mô phỏng lại một số môi trường đơn giản. Trong bài này mình sẽ sử dụng **Q-Learning** để giải quyết game *mountain-car* trong thư viện *gym*.

Với mountain-car, mục tiêu của chúng ta là điều khiển xe ô tô đến lá cờ:
![image.png](https://images.viblo.asia/220fc837-636e-4f20-a467-2e3b027c67e2.png)
Ta xét các thuộc tính của game này:
1. Tập trạng thái $S = R^{2}$ bao gồm vị trí của xe trên trục ngang và vận tốc của xe, chiều dương từ trái sang phải. Cụ thể hơn:
$$
S = \left \{ (x ,v ) | x,v \in R; -1.2 \leq x \leq 0.6; -0.07 \leq v \leq 0.07 \right \}
$$
2. Tập hành động của xe:
$$
\mathcal{A} = \left \{0; 1; 2 \right \}
$$
Với $a \in \mathcal{A}$:
* a = 0: tăng tốc sang trái 
* a = 1: Không tăng tốc
* a = 2: Tăng tốc sang phải
3. Phần thưởng: Với mỗi hành động, nếu chưa tới đích $(x < 0.5)$ nhận được phần thưởng -1, nếu không thì nhận được 0 và kết thúc game
4. Trạng thái khởi tạo $x_0 \in [-0.6, -0.4]$ và $v_0=0$
5. Trạng thái kết thúc: Đến được cờ tại $x=0.5$ hoặc tổng phần thưởng đạt đến -200


Code import thư viện và khởi tạo môi trường:
```python
# import
import gym
import time
import numpy as np
import IPython.display
from tqdm.notebook import tqdm

# create environment
env = gym.make('MountainCar-v0')
```

Hãy cùng chạy thử 1 ví dụ:
```python
s = env.reset()    # reset to starting State
action_list = list(range(env.action_space.n))
while True:
    a = np.random.choice(action_list)   # random an action
    s, r, done, _ = env.step(a)         # perform action, get state, reward, is terminated
    if done:
        break
    env.render()
    time.sleep(0.05)
```

# 2. Code thôi
### 2.1 Xây dựng Q-function
Hãy cùng xét công thức cuối cùng của bài viết [trước](https://viblo.asia/p/doi-dieu-co-ban-ve-hoc-tang-cuong-ORNZqAYrZ0n):

$$
Q(s,a) = (1-\alpha) Q(s,a) + \alpha E_{s \sim P(s' | s , a)} \left (R(s, a) + \gamma\max _ {a \in \mathcal{A}}Q^*(s,a) \right )
$$

Trong trường hợp chúng ta đang xét, do thư viện *gym* mô phỏng lại hiện tượng vật lý từ thực tế nên tại mỗi trạng thái $s$, ta thực hiện hành động $a$ sẽ đưa ta đến trạng thái $s'$ xác định. Do đó hàm $Q$ trong trường hợp này được viết lại:

$$
\tag{1}
Q(s,a) = (1-\alpha) Q(s,a) + \alpha \left (R(s, a) + \gamma\max _ {a \in \mathcal{A}}Q^*(s,a) \right )
$$

Trong game này,không gian trạng thái có 2 chiều ($x$ và $v$), tập hành động chỉ có 3 hành động, do đó chúng ta có thể mô hình hàm $Q$ bằng một bảng  $Q-table$, với các cột tương ứng với  các giá trị khác nhau của vận tốc $v$, các cột tương ứng với  các giá trị khác nhau của tọa độ $x$. Tuy nhiên $x,v \in R$ mà số cột và hàng phải hữu hạn nên ta cần *lượng tử hóa trạng thái* của xe thành $N$ trạng thái rời rạc khác nhau, nghĩa là chia chia các giá trị của tọa độ và vận tốc thành $N$ đoạn bằng nhau, trạng thái của xe sẽ là chỉ số của các đoạn tương ứng. 

Code lượng tử hóa cho 1 chiều của trạng thái
```python
class NBinDiscretizer:
    def __init__(self, min_val, max_val, nbins):
        self.min_val = min_val
        self.max_val = max_val
        self.step = (max_val - min_val) / nbins
        self.nbins = int(nbins)
    def __call__(self, val):
        return int(round((val - self.min_val) / self.step)) % self.nbins
```

Code lượng tử hóa cho không gian trạng thái:
```python
class Dicretezation:
    def __init__(self, discretezers):
        self.discretezers = discretezers
    def __getitem__(self, index):
        assert len(index) == len(self.discretezers)
        return tuple([self.discretezers[i](index[i]) for i in range(len(index))])
```

Tạo các *quantizer*:
```python
n_quantization = 50
x_quantizer = NBinDiscretizer(env.observation_space.low[0], env.observation_space.high[0], n_quantization)
v_quantizer = NBinDiscretizer(env.observation_space.low[0], env.observation_space.high[0], n_quantization)
state_quantizer = Dicretezation([x_quantizer, v_quantizer])
```

### 2.2 Xây dựng quá trình học
Các bước của quá trình học như sau:
* Khởi tạo một giá xác xuất $\epsilon$ là xác suất thực hiện một bước đi ngẫu nhiên, còn lại $1 - \epsilon$ là xác suất thực hiện theo chiến lược $\pi ^ * = \argmax _{a \in \mathcal{A}} Q^{*} (s,a)$. $\epsilon$ sẽ giảm dần trong quá trình học bởi ban đầu khi mô hình chưa học được nhiều thì ta cần lấy các bước ngẫu nhiên để tạo thêm dữ liệu cho mô hình học, còn khi học được rồi thì sẽ học từ chính mô hình.
*  Tại mỗi epoch:
    1. Reset môi trường về trạng thái khởi tạo $s=s_0$ 
    2. Chọn một bước $a$ đi với xác suất $\epsilon$ ngẫu nhiên, và $1-\epsilion$ tuân theo chiến lược $\pi^*$.
    3. Thực hiện bước đi $a$, nhận về trạng thái tiếp theo $s'$, lợi tức tức thời $r$ và trạng thái kết thúc.
    4. Cập nhật $Q$ theo (1)

Code:
```python
# inititalize some variables
lr = 0.1
gamma = 0.9
epochs = 10000
epsilon = 0.9
epsilon_scale = epsilon / (epochs / 4)

# some metrics
max_reward = -1000
max_pos = -1000

# logging
# inititalize some variables
epochs = 10000
epsilon = 0.9
epsilon_scale = epsilon / (epochs / 4)

# some metrics
max_reward = -1000
max_pos = -1000

# logging
log = display('', display_id=True)
reach_log = display('', display_id=True)

for epoch in tqdm(range(epochs), desc="Epoch"):
    ep_max_pos = -1000
    ep_reward = 0
    
    # reset environment
    obs = env.reset()
    done = False

    while not done:
        
        # take an action
        if np.random.random_sample() > epsilon:
            a = np.argmax(Q[state_quantizer[obs]])
        else:
            a = np.random.randint(0, env.action_space.n)
        
        # perform action
        new_obs, r, done, info = env.step(a)
        ep_reward += r
        
        if new_obs[0] >= env.goal_position:
            reach_log.update(f"Reach goal at epoch {epoch} with reward: {ep_reward}")
        # update Q
        cur_q_value = Q[state_quantizer[obs]][a]        
        new_q_value = (1-lr) * cur_q_value + lr * (r + gamma * max(Q[state_quantizer[new_obs]]))
        Q[state_quantizer[obs]][a] = new_q_value
        obs = new_obs
        ep_max_pos = max(obs[0], ep_max_pos)
        
    max_reward = max(ep_reward, max_reward)
    max_pos = max(ep_max_pos, max_pos)
    epsilon = max(0, epsilon - epsilon_scale)
    
    log.update("epoch {}: ep_reward: {:9.6f}, max_reward: {:9.6f}, ep_max_pos: {:.6f}, max_pos: {:.6f}, epsilon: {:.6f}".format(epoch, ep_reward, max_reward, ep_max_pos, max_pos, epsilon))
```

# 3. Tổng kết
Hy vọng với một ví dụ nhỏ trong bài viết này sẽ giúp các bạn hiểu hơn về **Q-function** và **Q-learning**. Code đầy đủ trong bài viết này mình sẽ để ở [đây](https://github.com/nguyentuxuancong/reinforcementlearning). Nếu có gì góp ý thì đừng ngần ngại cho mình biết để hoàn thiện hơn. Còn nếu thấy hay thì cho mình xin 1 upvote 😄.