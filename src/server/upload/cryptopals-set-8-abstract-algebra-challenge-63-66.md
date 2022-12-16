<sup>Đây là một bài trong series [Cùng giải Cryptopals!](https://viblo.asia/s/cung-giai-cryptopals-68Z00nw9ZkG).<br>Các bạn nên tự làm hoặc vừa đọc vừa làm thay vì đọc lời giải trực tiếp.</sup>

Do bài Viblo bị giới hạn 70000 ký tự nên mình phải chia đôi part 8 thành 2 phần.
***
**<div align="center">Cẩn thận nhé, phần này rất rất dài, và khó hơn các phần trước rất nhiều.</div>**
***
    
# [Challenge 63: Key-Recovery Attacks on GCM with Repeated Nonces](https://toadstyle.org/cryptopals/63.txt)

Bài này sẽ rất khó. Để làm/hiểu được bài này cần rất nhiều kiến thức về number theory và abstract algebra.

Đầu tiên chúng ta viết code cho $\mathrm{GF}(2^{128})$. Vừa dễ sử dụng với polynomials, vừa có thể dùng các phép toán builtin. Trong đó, modulo được sử dụng `0x100000000000000000000000000000087` chính là $2^{128} + 2^7 + 2^2 + 2^1 + 2^0$, polynomial được sử dụng cho field extension.
```python
def _deg(x):
    assert x >= 0
    return x.bit_length() if x > 0 else -1

class GF2p128:
    def __init__(self, val=0, m=0x100000000000000000000000000000087):
        self.val = val
        self.m = m

    def __hash__(self):
        return hash((self.val, self.m))
    
    def __str__(self):
        return "GF2^128(" + str(self.val) + ')'
    
    def __repr__(self):
        return bin(self.val)[2:]

    def __add__(self, obj):
        assert self.m == obj.m, "Cannot add/sub numbers of different polynomial generators!"
        return GF2p128(self.val ^ obj.val, self.m)

    __sub__ = __add__

    def __mul__(self, obj):
        if type(obj) is int:
            return self if obj % 2 else GF2p128(0, self.m)
        assert self.m == obj.m, "Cannot multiply numbers of different polynomial generators!"
        a, b, m = self.val, obj.val, self.m
        p = 0

        while a:
            if a & 1:
                p ^= b
            
            a >>= 1
            b <<= 1

            if _deg(b) == _deg(m):
                b ^= m

        return GF2p128(p, m)

    def __pow__(self, power):
        if power < 0:
            return self.inv() ** -power

        a = self
        p = GF2p128(1, self.m)
        while power:
            if power & 1:
                p *= a
            a *= a
            power >>= 1
        return p

    def __truediv__(self, obj):
        return self * obj ** -1

    def __eq__(self, obj):
        if type(obj) is int:
            return self.val == obj
        if type(obj) is GF2p128:
            return self.m == obj.m and self.val == obj.val
        return False

    def __divmod__(self, obj):
        # in GF(2) only. GF(2^128) has no mod.
        assert self.m == obj.m, "Cannot divmod numbers of different polynomial generators!"
        q, r, b, m = 0, self.val, obj.val, self.m

        while _deg(r) >= _deg(b):
            d = _deg(r) - _deg(b)
            q = q ^ (1 << d)
            r = r ^ (b << d)

        return GF2p128(q, m), GF2p128(r, m)
    
    def inv(self):
        # Using EGCD
        m, n = self, GF2p128(self.m)
        m_coeff = (GF2p128(1), GF2p128(0))
        n_coeff = (GF2p128(0), GF2p128(1))

        while True:
            q, r = divmod(m, n)
            if r == 0:
                return n_coeff[0]
            m, n = n, r
            # q = m - n * r
            m_coeff, n_coeff = n_coeff, tuple(map(lambda x: x[0] - q * x[1], zip(m_coeff, n_coeff)))

    def inv_prime(self):
        '''
            Using Fermat's little theorem. Use the EGCD one because benchmarks.
                inv normal: 4.990437030792236
                inv prime : 95.93351244926453
        '''
        return pow(self, 2 ** 128 - 2)
```

Tiếp theo là hàm AEAD GCM. Hàm này sẽ nhận một tin nhắn và các data phụ, và trả về tin nhắn đã mã hoá + MAC cho mã hoá đó và data phụ.
```python
def gmac(key, msg, aad, nonce):
    '''
    Input:
        @key:   key to be encrypted/GMAC
        @msg:   message to be encrypted
        @aad:   additional associated data
        @nonce: 96-bit of nonce to XOR at the end
    '''
    authkey = AES_encrypt(key, b'\x00' * 16)
    authkey = GF2p128(int.from_bytes(authkey, 'big'))
    if msg is None:
        iv = encrypted = b''
    else:
        iv = generate_key(8)
        encrypted = iv + AES_encrypt(key, msg, 'ctr', iv)
    content = aad + b'\x00' * (-len(aad) % 16) + \
                encrypted + b'\x00' * (-len(encrypted) % 16) + \
                pack('>2Q', len(aad), len(encrypted))
    g = GF2p128(0)
    for i in range(0, len(content), 16):
        b = GF2p128(int.from_bytes(content[i : i + 16], 'big'))
        g += b
        g *= authkey
    s = AES_encrypt(key, nonce + b'\x00\x00\x00\x01')
    s = GF2p128(int.from_bytes(s, 'big'))
    g += s
    mac = int.to_bytes(g.val, 16, 'big')
    if msg is None:
        return mac
    else:
        return encrypted, mac
```

Để crack được authentication key, chúng ta cần một data structure để lưu polynomials. Sau là các hàm cơ bản, code không khó nhưng tốn thời gian debug. <sup>[1]</sup>
```python
class Polynomial:
    # coeffs are larger-order-first
    # order (p, e) is the p^e prime power order of the coeff field
    def __init__(self, coeff=None, num_class=None, order=None):
        if coeff is None:
            assert num_class is not None, "Cannot infer number type!"
            self.coeff = [num_class(0)]
        else:
            self.coeff = coeff[:]
        if num_class is None:
            self.num_class = type(coeff[0])
            assert len(self.coeff) > 0, "Cannot infer number type!"
        else:
            self.num_class = num_class
        
        if type(order) is int:
            self.order = (order, 1)
        elif order is None:
            if self.num_class is GF2p128:
                self.order = (2, 128)
            else:
                self.order = None
        else:
            self.order = order

        # inplace
        self._reduce()

    def __str__(self):
        return self.num_class.__name__ + ' polynomial: ' + (' + '.join(
            reversed([f'{v if (v.val != 1 or i == 0) else ""}{("x" + ("^" + str(i) if i > 1 else "")) if i > 0 else ""}' \
                for (i, v) in enumerate(reversed(self.coeff)) if v.val > 0])
        ) if self.deg() > 0 else str(self.coeff[0]))
    __repr__ = __str__

    def __eq__(self, obj):
        return len(self.coeff) == len(obj.coeff) and \
            all([x == y for (x, y) in zip(self.coeff, obj.coeff)])

    def copy(self, coeffs=None):
        return Polynomial(self.coeff if coeffs is None else coeffs,
                          self.num_class, self.order)

    def __hash__(self):
        return hash((tuple(self.coeff), self.num_class, self.order))

    def deg(self):
        return len(self.coeff) - 1
    
    def __call__(self, val):
        ret = self.num_class()
        for coeff in self.coeff:
            ret *= val
            ret += coeff
        return ret

    def _reduce(self):
        # remove leading zeros
        for i in range(len(self.coeff)):
            if self.coeff[i] != self.num_class(0):
                break
        del self.coeff[:i]
        return self

    def __add__(self, obj):
        assert type(self) == type(obj), "Can only add Polynomials with Polynomials!"
        longer, shorter = (self.copy(), obj) \
                          if self.deg() == max(self.deg(), obj.deg()) \
                          else (obj.copy(), self)
        diff = longer.deg() - shorter.deg()
        for i in range(shorter.deg() + 1):
            longer.coeff[diff + i] += shorter.coeff[i]
        return longer._reduce()

    def __sub__(self, obj):
        assert type(self) == type(obj), "Can only subtract Polynomials with Polynomials!"
        retval = self.copy()
        maxdeg = max(self.deg(), obj.deg())
        # pads result
        retval.coeff = [self.num_class(0)] * (maxdeg - self.deg()) + retval.coeff
        diff = maxdeg - obj.deg()
        for i in range(obj.deg() + 1):
            retval.coeff[diff + i] -= obj.coeff[i]
        return retval._reduce()

    def __mul__(self, obj):
        if type(obj) is self.num_class:
            return Polynomial([x * obj for x in self.coeff], order=self.order)
        assert type(self) is type(obj), "Can only multiply Polynomials with Polynomials!"
        total_deg = self.deg() + obj.deg()
        coeffs = [self.num_class()] * (total_deg + 1)
        for idx1, val1 in enumerate(self.coeff):
            for idx2, val2 in enumerate(obj.coeff):
                coeffs[idx1 + idx2] += val1 * val2
        return self.copy(coeffs)

    def __pow__(self, power, mod=None):
        ret = self.copy()
        ret.coeff = [ret.num_class(1)]
        acc = self.copy()
        while power > 0:
            if power & 1:
                ret *= acc
                if mod is not None:
                    ret %= mod
            power >>= 1
            acc *= acc
            if mod is not None:
                acc %= mod
        return ret

    def __truediv__(self, obj):
        if type(obj) is self.num_class:
            return self.copy([x / obj for x in self.coeff])
        quotient, remainder = divmod(self, obj)
        assert remainder == self.copy([self.num_class(0)]), 'Remainder not 0 in truediv!'
        return quotient

    def __floordiv__(self, obj):
        assert type(obj) is type(self)
        return divmod(self, obj)[0]

    def __mod__(self, obj):
        return divmod(self, obj)[1]

    def __divmod__(self, obj):
        assert type(self) is type(obj), "Can only divide Polynomials with Polynomials!"
        if self.deg() < obj.deg():
            return self.copy([self.num_class(0)]), self

        divider = self.copy()
        divided = obj << (divider.deg() - obj.deg())
        coeffs = []
        while divided.deg() >= obj.deg() and divided != self.copy([self.num_class(0)]):
            if divider.deg() < divided.deg():
                coeff = self.num_class(0)
            else:
                coeff = divider.coeff[0] / divided.coeff[0]
            divider -= divided * coeff
            divided >>= 1
            coeffs.append(coeff)
        return Polynomial(coeffs, self.num_class, self.order), divider

    def __lshift__(self, shift):
        retval = self.copy()
        retval.coeff += [self.num_class(0)] * shift
        return retval

    def __rshift__(self, shift):
        if shift > self.deg():
            return Polynomial(num_class=self.num_class, order=self.order)
        if shift == 0:
            return self
        return Polynomial(self.coeff[:-shift], self.num_class, self.order)
```

Chúng ta viết hàm chuyển polynomial về monic (khi coefficient ở leading term là 1):
```python
def monic(self):
    lead_coeff = self.coeff[0]
    return Polynomial([x / lead_coeff for x in self.coeff], self.num_class, self.order), lead_coeff
```

Hàm Extended Euclidean Algorithm để tìm GCD:
```python
def egcd(self, obj):
    # returns GCD, (coeff 1, coeff 2)
    m, n = self, obj
    zero = self.copy([self.num_class(0)])
    one = self.copy([self.num_class(1)])

    m_coeff = (one, zero)
    n_coeff = (zero, one)

    if m == zero:
        return n, n_coeff
    if n == zero:
        return m, m_coeff

    while True:
        q, r = divmod(m, n)
        assert r.deg() < n.deg() or r.deg() < 1
        assert q * n + r == m
        if r == Polynomial(num_class=self.num_class, order=self.order):
            n, coeff = n.monic()
            return n, (n_coeff[0] * coeff, n_coeff[1] * coeff)
        m, n = n, r
        # q = m - n * r
        m_coeff, n_coeff = n_coeff, tuple(map(lambda x: x[0] - q * x[1], zip(m_coeff, n_coeff)))
```

Hàm sinh ra đạo hàm, vì chúng ta sẽ cần lúc tính square-free factorization:
```python
def derivative(self):
    retval = self.copy()
    for i in range(self.deg()):
        retval.coeff[i] *= (self.deg() - i)
    return retval >> 1
```

Cả 3 hàm trong đề bài đều có thể tìm được ở [link Wikipedia này](https://en.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields). Đây là hàm square-free factorization: đầu vào là một polynomial, và đầu ra là các factor kèm multiplicity, sao cho mỗi factor không còn ước bình phương nào nữa. Ý tưởng khá là hay: nếu chúng ta có factorization $f = \Pi_i f_i^{e_i}$ với $f_i$ là các ước polynomial tối giản (nguyên tố), thì đạo hàm sẽ là $f'=\sum_je_jf_j^{e_j-1}\Pi_{i\ne j}f_i^{e_i}$, và tất cả các số hạng trong tổng trên (và tổng trên, và cả $f$) sẽ đều có một ước chung là $\Pi_i f_i^{e_i-1}$. Từ đó, chúng ta sẽ có $f/\gcd(f, f')=\Pi_i f_i$.

```python
def sqr_free_factor(self):
    one = self.copy([self.num_class(1)])
    c = self.egcd(self.derivative())[0]
    w = self / c
    i = 1
    r = dict()
    # get all factors in w
    while w != one:
        y = w.egcd(c)[0]
        fac = w / y
        if fac != one:
            if fac in r:
                r[fac] += i
            else:
                r[fac] = i
        w = y
        c = c / y
        i += 1
    # get the rest from f
    if c != one:
        c = c.characteristic_root() #definition beloww
        for k, v in c.sqr_free_factor().items():
            if k in r:
                r[k] += v * self.order[0]
            else:
                r[k] = v * self.order[0]
    return r
```

Để tính được $p$-th root của một polynomial, hãy đọc [câu trả lời này trên Math.SE](https://math.stackexchange.com/a/1579112/402767). Thực sự khá là thú vị.
```python
def characteristic_root(self):
    # https://math.stackexchange.com/a/1579112/402767
    p, e = self.order
    retval = self.copy()
    retval.coeff = []
    for i in range(self.deg() + 1):
        if i % p: assert self.coeff[i] == self.num_class(0)
        else:
            retval.coeff.append(self.coeff[i] ** (p ** (e - 1)))
    return retval
```

Hàm different-degree factorization: đầu vào là một polynomial $f$, và đầu ra là các cặp đôi ước nhỏ $g$ của $f$, và degree $d$ của các ước nhỏ tối giản của $g$. Để hiểu được cụ thể thì khá khó, bạn có thể đọc [link Wikipedia](https://en.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields#Distinct-degree_factorization) để tạm hiểu được ý tưởng.
```python
def diff_deg_factor(self):
    i = 1
    s = set()
    f = self
    one = self.copy([self.num_class(1)])
    p, e = self.order
    q = p ** e
    x = (one << 1)
    acc = pow(x, q, f)
    while f.deg() >= 2 * i:
        g = f.egcd(acc - x)[0]
        if g != one:
            s.add((g, i))
            f /= g
        i += 1

        # recalculate
        acc = pow(acc, q, f)

    if f != one:
        s.add((f, f.deg()))
    if len(s) == 0:
        return {(f, 1)}
    return s
```

Hàm Cantor-Zassenhaus, như đã được hướng dẫn. Để hiểu, bạn hãy đọc kỹ vài lần đoạn giải thích trong đề bài và [link Wikipedia trên](https://en.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields#Cantor%E2%80%93Zassenhaus_algorithm). Đầu vào của hàm này là cặp polynomial $f$ và degree của ước của nó $d$, và đầu ra sẽ là các ước $g$ có degree $d$ của $f$.
```python
def random_polynomial(self):
    retval = self.copy()
    if retval.num_class is GF2p128:
        mod = retval.coeff[0].m
        for i in range(retval.deg() + 1):
            retval.coeff[i] = GF2p128(randrange(0, 2 ** 128), mod)
    else:
        raise NotImplementedError
    retval._reduce()
    return retval

def eq_deg_factor(self, degree):
    # Cantor-Zassenhaus algorithm for equal-degree factorization.
    f, d = self, degree
    p, e = self.order
    r = f.deg() // d
    factors = {f}
    one = self.copy([self.num_class(1)])

    while len(factors) < r:
        h = f.random_polynomial()
        g = h.egcd(f)[0]

        if g == one:
            g = (pow(h, (p ** (e * d) - 1) // 3, f) - one) % f

        for u in factors:
            if u.deg() > d:
                gcd_gu = g.egcd(u)[0]
                if gcd_gu != one and gcd_gu != u:
                    factors = (factors - {u}) | {gcd_gu, u / gcd_gu}

    return factors
```

Và một hàm tổng hợp để tìm tất cả các factor kèm multiplicity:
```python
def get_factors(self):
    retval = dict()
    for poly1, mult in self.sqr_free_factor().items():
        subfactor = poly1.diff_deg_factor()
        for poly2, degree in subfactor:
            for poly3 in poly2.eq_deg_factor(degree):
                if poly3 in retval:
                    retval[poly3] += mult
                else:
                    retval[poly3] = mult
    return retval
```

Chúng ta viết code sinh ra GMAC: nội dung cần MAC để trong AAD, và không encrypt gì cả:
```python
key = b'choppaAim@UrFace'
nonce = urandom(12)
def gcm_mac(data):
    return gmac(key, None, data, nonce)

msg1 = b'katarenai'
gmac1 = gcm_mac(msg1)
msg2 = b'nemurenai'
gmac2 = gcm_mac(msg2)
msg3 = b'toroimerai'
gmac3 = gcm_mac(msg3)

authkey = int.from_bytes(AES_encrypt(key, b'\x00' * 16), 'big')

def get_private_candidates(msg1, gmac1, msg2, gmac2):
    # build the blocks
    msg1 += b'\x00' * (-len(msg1) % 16) + pack('>2Q', len(msg1), 0)
    msg2 += b'\x00' * (-len(msg2) % 16) + pack('>2Q', len(msg2), 0)
    blocks1 = [GF2p128(int.from_bytes(msg1[i : i + 16], 'big')) for i in range(0, len(msg1), 16)]
    blocks2 = [GF2p128(int.from_bytes(msg2[i : i + 16], 'big')) for i in range(0, len(msg2), 16)]
    blocks1.append(GF2p128(int.from_bytes(gmac1, 'big')))
    blocks2.append(GF2p128(int.from_bytes(gmac2, 'big')))
    p = Polynomial(blocks1) + Polynomial(blocks2)
    return set([(x.coeff[1] / x.coeff[0]).val for x in p.get_factors() if x.deg() == 1])
```

Có tất cả mọi thứ rồi thì chúng ta chạy thôi:
```python
print('Getting candidate 1...')
candidates1 = get_private_candidates(msg1, gmac1, msg2, gmac2)
print('Getting candidate 2...')
candidates2 = get_private_candidates(msg2, gmac2, msg3, gmac3)
print('Getting candidate 3...')
candidates3 = get_private_candidates(msg1, gmac1, msg3, gmac3)
candidates = candidates1 & candidates2 & candidates3
assert len(candidates) == 1
for recovered in candidates: break
assert recovered == authkey
print('OK!')
```

Ở ví dụ trên mình sử dụng tin nhắn trong 1 block; bạn có thể test với các tin nhắn dài hơn nhiều để xem nó hoạt động nhé.

## Food for thought
> Có authentication key rồi thì sao? Chúng ta có có private key xịn đâu? Nonce vẫn random mà.

Có thể chúng ta không có private key xịn, nhưng chúng ta có thể làm rất nhiều thứ với authentication key. Thứ nhất, với mỗi lần sử dụng GCM, authentication key không thay đổi (vì nó chỉ phụ thuộc vào secret key). Với authentication key đó, và data AAD/encrypted, chúng ta có thể lấy được nonce bằng cách cộng trừ dần dần. Từ đó, chúng ta có thể forge tin nhắn fake bằng bitflips, như hướng dẫn của 2 bài tiếp theo.

<sup>[1]</sup> Để debug, mình sẽ tặng bạn thêm một class $\mathrm{GF}(3)$ để có thể test xem các hàm đã đúng chưa. Hãy tạo các polynomial với các coefficients thuộc field này cho đơn giản dễ tính.

```python
class GF3:
    def __init__(self, val=0):
        self.val = val
    def __add__(self, obj):
        return GF3((self.val + obj.val) % 3)
    def __hash__(self):
        return hash(self.val)
    def __sub__(self, obj):
        return GF3((self.val - obj.val) % 3)
    def __mul__(self, obj):
        return GF3((self.val * (obj if type(obj) is int else obj.val)) % 3)
    def __truediv__(self, obj):
        return self * obj ** -1
    def __pow__(self, exp):
        if exp < 0:
            assert self.val > 0, "Cannot invert 0!"
        return GF3(pow(self.val, abs(exp), 3))
    def __str__(self):
        return str(self.val)
    __repr__ = __str__
    def __eq__(self, obj):
        return self.val == obj.val
```

# [Challenge 64: Key-Recovery Attacks on GCM with a Truncated MAC](https://toadstyle.org/cryptopals/64.txt)

Bài này thực sự vừa khó hiểu vừa khó code. Mình mất hơn 2 tuần chỉ tắc ở bài này vì code không chạy. Ngoài ra, trong code có sử dụng `trange` của package `tqdm` để hiện thanh quá trình, và `Parallel` của package `joblib` để tính toán song song.

Việc dễ nhất làm trước là các hàm cơ bản sẽ dùng. Nên chú ý ở đây mình chuyển từ số sang vector theo phong cách hơi ngược đời: đặt lower-order bits lên trước vector, nên code tạo khá nhiều bug :(

```python
def block2gf(block):
    assert len(block) == 16
    return GF2p128(int.from_bytes(block, 'big'))

def gf2vec(val: GF2p128):
    ret = np.empty((128,), dtype=np.int8)
    val = val.val
    for i in range(128):
        ret[i] = val & 1
        val >>= 1
    return ret

sqr_mat = np.empty((128, 128), dtype=np.int8)
for i in range(128):
    sqr_mat[:, i] = gf2vec(GF2p128(1 << i) ** 2)

def gf2mat(val: GF2p128):
    ret = np.empty((128, 128), dtype=np.int8)
    acc = GF2p128(1)
    for i in range(128):
        ret[:, i] = gf2vec(val * acc)
        acc.val <<= 1
    return ret

def vec2gf(vec: np.array):
    ret = 0
    for bit in reversed(vec):
        ret <<= 1
        ret |= int(bit)
    return GF2p128(ret)

def vec2block(vec: np.array):
    ret = 0
    for bit in reversed(vec):
        ret <<= 1
        ret |= int(bit)
    return int.to_bytes(ret, 16, 'big')
```

Tiếp theo là hàm lấy nullspace của một vector space sử dụng [Gaussian elimination](https://en.wikipedia.org/wiki/Gaussian_elimination#Finding_the_inverse_of_a_matrix) để lấy [row-reduced echelon form](https://en.wikipedia.org/wiki/Row_echelon_form#Reduced_row_echelon_form). Để giải thích khái niệm này nếu bạn không biết gì về đại số tuyến tính thì rất khó, nên mình sẽ chỉ nói vừa đủ thôi: row echelon form là khi ma trận có hình dạng là upper rectangular:

```
13 23  0 16  8
 0  0 12  7  0
 0  0  0  8  6
 0  0  0  0 10
```

Reduced là khi giá trị nonzero đầu tiên của các hàng trong ma trận là 1 (thay vì 13, 12, 8, 10 như ví dụ trên). Tuy nhiên, chúng ta đang làm việc với $\mathrm{GF}(2)$, nên các giá trị khác 0 chỉ có thể là 1, và chúng ta không phải reduce tay. Còn Gaussian elimination được sử dụng để tìm ma trận nghịch đảo trực chuẩn của một ma trận đầu vào; vậy làm thế nào chúng ta có thể lấy được nullspace? Bởi vì chúng trực chuẩn, và nếu ma trận đầu vào có rank $k$, thì "nghịch đảo" <sup>[2]</sup> của nó cũng chỉ có rank $k$ thôi, và các hàng còn lại là những vector không nằm trong row space nhưng vẫn độc lập và vuông góc (theo tính chất trực chuẩn). Do vuông góc nên khi nhân với các row vector sẽ cho giá trị 0, và sẽ tạo ra column nullspace theo định nghĩa.

Code của Gaussian elimination để lấy nullspace như sau:

```python
def gaussian_nullspace(mat):
    mat = mat.T
    target = np.eye(mat.shape[0], dtype=np.int8)
    idx = 0
    rank = 0
    for idx in trange(mat.shape[1], desc='Calculating the nullspace', leave=False):
        if rank == min(mat.shape):
            break
        row_idx = np.flatnonzero(mat[rank:, idx]) + rank
        if len(row_idx) == 0: continue
        if row_idx[0] != rank:
            # swap
            mat[[rank, row_idx[0]]] = mat[[row_idx[0], rank]]
            target[[rank, row_idx[0]]] = target[[row_idx[0], rank]]
        # now subtract from the rest
        for idx_ in row_idx[1:]:
            mat[idx_, :] = (mat[idx_, :] - mat[rank, :]) % 2
            target[idx_, :] = (target[idx_, :] - target[rank, :]) % 2
        rank += 1

    # transpose so column combination is easier
    target = target[rank:, :].T
    # remove zero vector if exists
    target = target[:, np.any(target, axis=0)]
    return target
```

Từ các vector bitflip chúng ta cần sinh ra ma trận $A_d$; trong đó mình viết thêm một hàm phụ sẽ lấy $A_d$ tương ứng với vector bitflip one-hot tại một điểm bất kỳ:

```python
def get_Ad(blocks):
    # higher order/beginning of blocks first, based on Horner's method
    # remember that this only deals with 2^i-th blocks.
    acc = np.zeros((128, 128), dtype=np.int8)
    if len(blocks.shape) == 1: blocks = np.reshape(blocks, (n, 128))
    for i in range(blocks.shape[0]):
        acc = ((gf2mat(vec2gf(blocks[i,:])) + acc) @ sqr_mat) % 2
    return acc

def get_Ad_loc(i):
    payload = np.zeros((n, 128), dtype=np.int8)
    payload[divmod(i, 128)] = 1
    return get_Ad(payload)
```

Và hàm để lấy dependency matrix: ma trận này cho biết rằng với mỗi một vị trí bitflip, thì ma trận $A_dX$ sẽ thay đổi thế nào; và $X$ là vector space có chứa authentication key chúng ta cần tìm (ban đầu là identity matrix).

```python
def get_dependency_matrix(no_of_zero_rows, X):
    # rows = bits in Ad*X, col = bits in blocks
    def get_col(bit_idx):
        return (get_Ad_loc(bit_idx)[:no_of_zero_rows, :] @ X).flatten() % 2
    return np.stack(Parallel(n_jobs=cpu_count)(delayed(get_col)(row_idx) for row_idx in trange(n * 128, desc='Fetching dependency matrix', leave=False)), axis=1)
```

Và một hàm để sửa ciphertext theo các bitflip có trên: đây là giản đồ với dòng trên là số mũ của từng coefficient tương ứng với từng block, và dòng dưới là index của block đó:

```
[...] [...] [...] [...] [...] size nonce
2^n+1  2^n   2^2    3    2^1
  0     1    ...  2^n-2 2^n-1
```

Từ đó chúng ta tính được công thức tính block index và bit index cần sửa với mỗi một bitflip:
```python
def patch_encrypted(cipher, corrections):
    # break dowwn the cipher
    blocks = [cipher[i:i+16] for i in range(0, len(cipher), 16)]
    corrections = np.reshape(corrections, (-1, 128))
    for i in range(corrections.shape[0]):
        idx = -2 * 2 ** i + 1
        blocks[idx] = vec2block(gf2vec(block2gf(blocks[idx])) ^ corrections[-i-1])
    return b''.join(blocks)
```

Hàm check xem GMAC có đúng không: trong code không nhận AAD do bài này không cần.
```python
def gmac_ok(key, cipher, signature, nonce):
        authkey = AES_encrypt(key, b'\x00' * 16)
        authkey = GF2p128(int.from_bytes(authkey, 'big'))
        content = cipher + b'\x00' * (-len(cipher) % 16) + pack('>2Q', 0, len(cipher))
        g = GF2p128(0)
        for i in range(0, len(content), 16):
            b = GF2p128(int.from_bytes(content[i : i + 16], 'big'))
            g += b
            g *= authkey
        s = AES_encrypt(key, nonce + b'\x00\x00\x00\x01')
        s = GF2p128(int.from_bytes(s, 'big'))
        g += s
        
        return int.to_bytes(g.val, 16, 'big')[-trunc_size // 8:] == signature
```

Và hàm xóc đĩa tìm một nullspace vector mà sẽ forge được một message fake theo MAC có sẵn. Chú ý, hàm `try_nullvec` cần phải để ở một file riêng để import vào mới có thể sử dụng `multiprocessing` để xóc nhiều đĩa một lúc, theo [một cái bug có từ lâu đời](https://stackoverflow.com/a/42383397/2327379).

```python
found = Value('b')
def set_value(val):
    with found.get_lock(): found.value = val

def try_nullvec(gmac_ok, basis, encrypted, signature):
    while True:
        if found.value: break
        nullvec = (basis @ np.random.randint(2, size=basis.shape[1])) % 2
        if not nullvec.any(): continue
        # remove get_Ad_nullvec
        if gmac_ok(key, patch_encrypted(encrypted, nullvec), signature, nonce):
        # if not ((get_Ad(nullvec)[:trunc_size] @ authkey) % 2).any():
            set_value(1)
            return nullvec
```

Để ý mình đã comment dòng này ra:

```python
if not ((get_Ad(nullvec)[:trunc_size] @ authkey) % 2).any():
```

Dòng này gần như tương tự với check GCM-MAC, tuy nhiên sử dụng luôn tính toán bằng vector nên sẽ nhanh hơn nhiều so với hàm trên. Tuy nhiên, do server thực tế đương nhiên sẽ không tính MAC bằng cách check xem các bitflips có tạo GMAC hợp lệ không (LOL), nên mình không dùng (mà chỉ để đó để test thôi).

Và sau đó thì chạy code và chờ nẫu ruột thôi!
```python
key = b'harem_enthusiast'
authkey = gf2vec(block2gf(AES_encrypt(key, b'\x00' * 16)))

# accumulator through the iterations
X = np.eye(128, dtype=np.int8)
pool = Pool(cpu_count)

while X.shape[1] > 1:
    print('[+]', X.shape[1], 'basis vectors left.')

    print('Generating new message...')
    msg = generate_key(2 ** n * 16 - 8)
    nonce = generate_key(12)
    encrypted, signature = gmac(key, msg, b'', nonce)
    # get the last 32 bit
    signature = signature[-trunc_size // 8:]
    assert len(encrypted) == 2 ** n * 16

    no_of_zero_rows = min(n * 128 // X.shape[1], trunc_size) - 1
    print('Zeroing out', no_of_zero_rows, 'rows.')
    dependency = get_dependency_matrix(no_of_zero_rows, X)
    nullspace = gaussian_nullspace(dependency)

    print('Rolling the dice until dawn...')
    set_value(0)
    tic = time()
    nullvec = pool.starmap(
        try_nullvec,
        [(nullspace, encrypted, key, signature, nonce)] * cpu_count
    )
    toc = time()
    # format_time formats number of seconds to readable format
    print('That took', format_time(toc - tic))
    for i in nullvec:
        if i is not None:
            nullvec = i
            break

    new_nullspace = (get_Ad(nullvec)[no_of_zero_rows:trunc_size] @ X) % 2
    new_domain = gaussian_nullspace(new_nullspace)
    X = (X @ new_domain) % 2

assert (authkey == X.T).all()
print('\n[!] Authentication key recovered successfully!\n')
```

Các bạn có thể thấy dòng này hơi khó giải thích:
```python
no_of_zero_rows = min(n * 128 // X.shape[1], trunc_size) - 1
```

Mình sẽ chia ra 2 phần giải thích riêng:
- Số rows bị về 0 phải bé hơn $\lfloor 128n/|V_d|\rfloor$: nếu không, ma trận `dependency` sẽ full rank khiến column nullspace sẽ là space rỗng, và chúng ta không thể forge tin nhắn giả mới.
- Số rows phải bé hơn số bit của MAC, vì nếu không chúng ta không thể rút gọn số basis vector của vector space chứa authentication key:
```python
new_nullspace = (get_Ad(nullvec)[no_of_zero_rows:trunc_size] @ X) % 2
```
Để ý rằng do chúng ta zero hết các bit MAC, nên không có tí thông tin mới nào cả (cắt $A_d$ đến rỗng luôn), và nullspace của ma trận rỗng sẽ là identity $I$, nên không giới hạn được gì về domain cả.

Mình thử thành công với chữ ký ngắn (16-bit MAC, $2^8$-block messages) trong tầm 18', chữ ký khá dài (24-bit MAC, $2^{16}$-block messages) trong vòng hơn 6 tiếng, và chữ ký dài (32-bit MAC, $2^{17}$-block messages) thì sau 33 tiếng vẫn còn chưa xong được loop đầu tiên (với 12 core chạy song song!)

![](https://images.viblo.asia/d0467ab5-3429-4567-afbf-c57318887b57.png)
<div align="center"><sup>Ai khóc nỗi đau này.</sup></div>

Xác suất để ra được một forgery là $2^{16}$, và thử tuần tự không tốt hơn xóc đĩa, vì đằng nào cũng có tận $2^{128} - 1$ lựa chọn cho bitflips. Kể cả cho rằng tận dụng được tối đa 12 core, với mỗi lần thử GMAC forgery mất 10s (vì tính MAC lúc nào cũng lâu để tránh bruteforce như thế này này), thì ước lượng mỗi lần thử của chúng ta mất $2^{16} \times 10 / 12 / 60 / 60 =$ tận hơn 15 tiếng — đó là chưa tính việc có core this core that (các core lẻ yếu hơn), và chạy song song không nhanh cấp số nhân do không hoàn hảo/còn code quản lý tiến trình song song, v.v... Nhân phẩm kém như mình thì còn chậm nữa: với tin nhắn $2^{16}$-bit và 24-bit MAC, mình mất tận 30' cho một lần xóc đĩa, thì ước lượng trong trường hợp này mình sẽ mất $0.5\times 2^8 =$ tận 128 tiếng (!) Nói chung là toang. <sup>[3]</sup>

Ngoài ra, có một số điều bạn có thể làm để tăng tốc code của bạn:
- Thực ra bạn không cần sinh ra tin nhắn mới mỗi lần chạy (và việc sinh lại ra tin nhắn mới khá lâu, tầm 1-2'). Vì vậy, bạn có thể dịch đoạn code đó ra ngoài `while` loop cho nhanh hơn; mình để đó để cho đúng tinh thần của đề bài thôi. Còn nếu bạn vẫn muốn tạo message mới mỗi lần, bạn có thể song song hoá code đó.
- Sau mỗi iteration, bạn sẽ giảm được số chiều của vector space chứa authentication key, và từ đó số diff bit của MAC bạn có thể đặt về 0 tăng lên, và tốc độ xóc đĩa của bạn tăng lên chóng mặt. Tuy nhiên, khi số bits đó tăng đến mức tối đa (bằng số bit của MAC trừ 1), thì khoảng thời gian sinh ra dependency matrix và nullspace chiếm đa số thời gian, đâu đó gấp ~10 lần khoảng thời gian xóc đĩa. Đồng thời, mỗi một loop iteration với lượng 0-bit tối đa đó chỉ giảm được một chiều trong authentication key vector space; trong khi nếu bạn chỉ zero ít hơn vậy và tăng thời gian xóc đĩa lên, thì số chiều giảm xuống lại tăng lên theo cấp số nhân (vì 1 quá ít). Vì vậy, bạn có thể tạm thống kê ra, đặt bao nhiêu diff bit của MAC về 0 sẽ cho bạn kết quả tối ưu về thời gian.
- Học viết code NVCC. Bruteforce bằng OpenCL hoặc NVCC code với GPU sẽ nhanh hơn rất rất nhiều. Nhất là khi máy mình có 2080Ti. Nhưng mình không biết viết NVCC.

<sup>[2]</sup> Thực tế thì một ma trận không full rank sẽ không có nghịch đảo, nhưng sẽ vẫn có [giả nghịch đảo](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse), nên mới sử dụng ngoặc kép như vậy.

<sup>[3]</sup> Sử dụng code check forgery bằng authkey và nhân ma trận thì với setup $2^{17}$-bit message + 32-bit GMAC mất 6 tiếng 45 phút để tìm ra forgery đầu tiên, và chỉ 11' cho forgery ở iteration 2.


# [Challenge 65: Truncated-MAC GCM Revisited: Improving the Key-Recovery Attack via Ciphertext Length Extension](https://toadstyle.org/cryptopals/65.txt)

Do bài trước mình đã quá buồn với vấn đề thời gian nên bài này mình sẽ giới hạn độ phức tạp một cách đáng kể: giới hạn mỗi tin nhắn chỉ có $2^4-1$ block (512 bits có thể nghịch), mỗi tin nhắn có block cuối không đủ, và GMAC chỉ lấy 1 byte cho dễ forge. Đồng thời, tin nhắn ban đầu cần ngắn hơn giới hạn chấp nhận của verification system, vì nếu bằng thì dùng code của bài trước là xong.

Đầu tiên, chúng ta sửa code Gaussian Eliminination chút để lấy được cả inverse matrix (để tính particular solution sau này):
```python
def gaussian_elimination(mat):
    target = np.eye(mat.shape[0], dtype=np.int8)
    idx = 0
    rank = 0
    for idx in range(mat.shape[1]):
        if rank == min(mat.shape):
            break
        row_idx = np.flatnonzero(mat[:, idx])
        if (row_idx < rank).all(): continue
        if rank not in row_idx:
            rank_idx = bisect(row_idx, rank)
            # swap
            mat[[rank, row_idx[rank_idx]]] = mat[[row_idx[rank_idx], rank]]
            target[[rank, row_idx[rank_idx]]] = target[[row_idx[rank_idx], rank]]
            row_idx[rank_idx] = rank
        # now subtract from the rest
        for idx_ in row_idx:
            if idx_ == rank: continue
            mat[idx_, :] = (mat[idx_, :] - mat[rank, :]) % 2
            target[idx_, :] = (target[idx_, :] - target[rank, :]) % 2
        rank += 1

    # get the nullspace
    nullspace = target[rank:, :].T    
    # inverse
    inverse = target[:rank, :].T
    
    return inverse, nullspace
```

Thay vì chỉ kéo dài block cuối như đề bài, chúng ta kéo dài đến độ dài tối đa cho phép của verification system cho nó ngầu:
```python
# n defined like chall64
block_count = 2 ** n - 1
```

Và code bê gần như nguyên từ challenge 64, có chút chỉnh sửa:
```python
# authkey space
X = np.eye(128, dtype=np.int8)

while X.shape[1] > 1:
    # capture a new packet
    msg = generate_key(randrange(block_count * 16 - 8))
    nonce = generate_key(12)
    encrypted, signature = gmac(key, msg, b'', nonce)
    signature = signature[-trunc_size // 8:]

    # pad the message to be full width
    lengthened = encrypted + bytes(-len(encrypted) % 16)
    lengthened = bytes(block_count * 16 - len(lengthened)) + lengthened

    t = (gf2mat(block2gf(pack('>2Q', 0, len(encrypted)))) - gf2mat(block2gf(pack('>2Q', 0, len(lengthened))))) % 2

    no_of_zero_rows = min(n * 128 // X.shape[1], trunc_size - 1)

    print(X.shape[1], 'basis vector left, forcing', no_of_zero_rows, 'rows.')
    
    dependency = get_dependency_matrix(no_of_zero_rows, X)

    inverse, nullspace = gaussian_elimination(dependency)
    bitflips = (inverse @ (t[:no_of_zero_rows] @ X).flatten()[:inverse.shape[1]] % 2) % 2
    if nullspace.size == 0:
        maxtry = 1
    else:
        maxtry = 1024
    found = False
    while maxtry:
        if gmac_ok(patch_encrypted(lengthened, bitflips), signature, nonce):
            found = True
            break
        coeff = np.random.randint(2, size=nullspace.shape[1])
        bitflips = (bitflips + nullspace @ coeff) % 2
        maxtry -= 1
    # if not success, try with a new packet
    if not found: continue
    
    new_nullspace = ((get_Ad(bitflips) + t)[no_of_zero_rows:trunc_size] @ X) % 2
    _, new_domain = gaussian_elimination(new_nullspace)
    X = (X @ new_domain) % 2
```

Chúng ta sẽ phân tích từng đoạn code khác challenge trước:
- Code mod cipher để có độ dài tối đa server cho phép:
```python
# pad the message to be full width
lengthened = encrypted + bytes(-len(encrypted) % 16)
lengthened = bytes(block_count * 16 - len(lengthened)) + lengthened
```

Cipher trong hàm GMAC bình thường đã được pad đuôi bằng `\x00` byte cho đủ block, nên chúng ta cũng làm vậy. Ngoài ra, chúng ta pad tất cả các block trước bằng 0: để ý khi tính MAC, chúng ta convert block ra số nguyên $c_i$ rồi nhân với authentication key $h$, và các block đến trước thì nhân với số mũ của $h$ cao. Vì vậy, nếu chúng ta pad trái $k$ empty block thì công thức của MAC sẽ thay đổi (không tính thay đổi trong block độ dài của content) là $\sum_{i=1}^k0\times h^{l+i}=0$.

- Code tính thay đổi coefficent của $h$ do thay đổi cipher length:
```python
t = (gf2mat(block2gf(pack('>2Q', 0, len(encrypted)))) - gf2mat(block2gf(pack('>2Q', 0, len(lengthened))))) % 2
```

Khá là tiện lợi khi đây là block bậc $2^0=1$, tác dụng của nó sẽ đến ở dưới.

- Số dòng chúng ta sẽ ép cho bằng $t$ ở trên:
```python
no_of_zero_rows = min(n * 128 // X.shape[1], trunc_size - 1)
```

Code phần này khác ở phần trước rằng term đầu tiên trong hàm `min` không còn phần trừ 1: trước chúng ta cần nullspace không rỗng để ra được vector bitflip hợp lệ (khác vector 0), tuy nhiên bây giờ do chúng ta phải tính cả particular solution (thay vì chỉ mỗi homogeneous solution) nên không có vector nullspace vẫn *có thể* thoả mãn. Tuy nhiên, hãy để ý rằng giả sử chúng ta đang ép 4 rows bằng $t$ nhưng signature có 8 bit, chúng ta sẽ phải cầu trời sao cho vận may cho chúng ta particular solution hợp lệ (forgery thành công) với xác suất $2^{-4}$. Với kích cỡ signature lớn hơn và độ dài tin nhắn ngắn hơn thì xác suất này càng ngày càng thấp, và bạn có thể xem xét việc cứ trừ 1 khỏi term này. Nếu làm vậy, chúng ta vẫn không chắc liệu có thể chắc chắn có được solution hợp lệ, nhưng có thêm degree of freedom thì có nhiều cơ hội xóc đĩa ăn được hơn.

Tìm particular solution cho forgery:
```python
inverse, nullspace = gaussian_elimination(dependency)
bitflips = (inverse @ (t[:no_of_zero_rows] @ X).flatten()[:inverse.shape[1]] % 2) % 2
```

Sử dụng Gaussian Elimination chúng ta sẽ có được (pseudo)inverse của ma trận `dependency`, và chỉ cần nhân nó với kết quả mong muốn sẽ có được particular solution. Tương tự như bài trên, thì $t$ ở đây là kết quả $A_d$ chúng ta mong muốn, và với bước đã thu hẹp vector space chứa $h$ là $X$, thì chúng ta phải map $t$ với $X$ như chúng ta đã map $A_d$ với $X$.

- Check kích cỡ nullspace để xem cần xóc không:
```python
if nullspace.size == 0:
    maxtry = 1
else:
    maxtry = 1024
```

Nếu nullspace rỗng thì chúng ta không thể làm gì ngoài việc cầu nguyện là particular solution tương ứng với một valid bitflips. Nếu nullspace không rỗng, chúng ta có thể sample vector trong nullspace như bài trước, rồi cộng với particular solution để ra một solution khác vẫn thoả mãn. Đây là cách lấy các solution khác nhau: general solution là một particular solution bất kỳ + 1 vector bất kỳ trong nullspace. `maxtry` ở đây là số lần server/verifier cho query với một ciphertext bất kỳ.

- Tương tự bài trước xóc đĩa tìm nghiệm:
```python
while maxtry:
    if gmac_ok(patch_encrypted(lengthened, bitflips), signature, nonce):
        found = True
        break
    coeff = np.random.randint(2, size=nullspace.shape[1])
    bitflips = (bitflips + nullspace @ coeff) % 2
    maxtry -= 1
# if not success, try with a new packet
if not found: continue
```

- Update domain của authentication key $h$:
```python
new_nullspace = ((get_Ad(bitflips) + t)[no_of_zero_rows:trunc_size] @ X) % 2
_, new_domain = gaussian_elimination(new_nullspace)
X = (X @ new_domain) % 2
```

Điểm duy nhất khác nhau của phần này với bài trước là chúng ta có cộng $t$ với $A_d$. Điều này là do bài trước chúng ta không sửa length block nên để MAC không đổi chỉ cần check các block chúng ta sửa thôi ($A_dX=0$). Tuy nhiên, lần này thay đổi length block gây thêm thay đổi là $t$ nữa, nên chúng ta phải cancel out.

Xong xuôi tất cả rồi thì check xem ăn được key chưa nào:
```python
assert (X.T == authkey).all()
print('OK')
```

# [Challenge 66: Exploiting Implementation Errors in Diffie-Hellman](https://toadstyle.org/cryptopals/66.txt)

Khi lập trình bài này, để lưu giá trị key, mình đã gặp đúng vấn đề được nói tới của bài này một cách oái oăm =)) Chẳng là, với finite field order 125-bit thì giá trị của private key cũng tầm đó, trong khi bình thường `int` type có mỗi 31-bit, và dài nhất là `unsigned long long` cũng chỉ có 64-bit. Thế nên lúc mình ban đầu code nó cứ đến 31-32 bit là lỗi làm mình vò đầu bứt tai :(

Bắt đầu code nào! Đầu tiên là các class liên quan:
```python
class SomeCarryError(BaseException): pass

class BrokenCurve(WeierstrassCurve):
    def __init__(self, fail_freq=2**64):
        super().__init__(
            a = -95051,
            b = 11279326,
            p = 233970423115425145524320034830162017933,
            g = (182, 85518893674295321206118380980485522083),
            q = 29246302889428143187362802287225875743,
            order = (29246302889428143187362802287225875743 << 3)
        )
        self.fail_freq = fail_freq

    def point(self, x, y):
        return BrokenPoint(self, x, y)
    
    def generate_keypair(self):
        while True:
            try:
                return super().generate_keypair()
            except SomeCarryError: ...


class BrokenPoint(WeierstrassPoint):
    def __add__(self, obj):
        # if the star aligns, fail
        if (self.x + obj.x) % self.curve.fail_freq == 0:
            raise SomeCarryError
        ret = super().__add__(obj)
        ret.__class__ = self.__class__
        return ret
    
    def __mul__(self, scalar):
        assert isinstance(self, self.__class__) and isinstance(scalar, int), \
                'Can only multiply Point with a scalar.'
        scalar %= self.curve.q
        if scalar == 0: return self.curve.id
        # ignore first bit
        scalar = bin(scalar)[3:]
        acc = self
        for bit in scalar:
            acc += acc
            if bit == '1':
                acc += self
        return acc
```

Ở bài này mình phải viết lại hàm nhân, vì ban đầu mình đọc bit scalar từ lowest tới newest, trong khi đề bài đọc ngược lại theo [Horner's method](https://en.wikipedia.org/wiki/Horner%27s_method). Mỗi một phương pháp tính hàm nhân khác nhau sẽ yêu cầu tấn công khác nhau đó.

Tạo curve và keypair:
```python
curve = BrokenCurve(fail_freq=2 ** 10)
print('Generating keypair...')
private, public = curve.generate_keypair()
```

Hàm handshake nhân điểm bất kỳ với private key, trả về có thành công không:
```python
def handshake(point):
    try:
        point * private
        return True
    except SomeCarryError:
        return False
```

Và phần đăng ký các biến để lưu key trong quá trình tính song song. Chúng ta lưu highest 64 bit vào biến `half1`, và 64 bit còn lại vào biến `half2`. Lúc đọc và lưu cần ghép/bẻ lại như cần thiết.
```python
half1 = Value('Q')
half2 = Value('Q')
half2.value = 1
```

Viết hàm đọc từng bit một:
```python
def brute(_=None):
    while True:
        with half1.get_lock():
            val = (half1.value << 64) | half2.value
        # check if we got it
        if val == 0: return
        if curve.g * val == public:
            assert val == private
            print('\nOK')
            with half1.get_lock():
                half1.value = 0
                half2.value = 0
            return val

        length = val.bit_length()
        add0 = val * 2
        add1 = add0 + 1

        while True:
            with half1.get_lock():
                val = (half1.value << 64) | half2.value
            if val == 0 or val.bit_length() > length:
                break
            found = False

            # try new points
            while True:
                point = curve.generate_point()
                try: point_ = point * (val * 2)
                except SomeCarryError: ...
                else: break

            # if the last bit is 0, there's no next doubling.
            if curve.g * (val * 2) == public:
                assert val * 2 == private
                print('\nOK')
                with half1.get_lock():
                    half1.value = 0
                    half2.value = 0
                return val * 2
                
            else:
                try: point_ + point_
                except SomeCarryError: succ0 = False
                else: succ0 = True
                try: point_ + point
                except SomeCarryError: succ1 = False
                else: succ1 = True
                if succ0 ^ succ1:
                    if succ1:
                        if handshake(point):
                            trueval = add1
                            found = True
                    if succ0:
                        if handshake(point):
                            trueval = add0
                            found = True
            
            if found:
                with half1.get_lock():
                    val = (half1.value << 64) | half2.value
                    if val == 0: return
                    if val.bit_length() == length:
                        half1.value = (trueval >> 64)
                        half2.value = (trueval & 0xFFFFFFFFFFFFFFFF)
                        print(trueval & 1, end='', flush=True)
```

Và giải thôi:
```python
print('Solving: 1', end='', flush=True)
pool = Pool(cpu_count())
pool.map(brute, iterable=[None] * cpu_count())
```

Một cái kết có hậu cho chuyến hành trình dài.

***
**<div align="center">Hết thật rồi đó.</div>**
***