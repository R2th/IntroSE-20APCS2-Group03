Trong phần 2 này, chúng ta sẽ cùng nhau tìm hiểu thêm về python package và module.

# 1. Python packages

Một cách đơn giản nhất, nếu **module** chỉ đơn thuần là **file** có đuôi là `.py`, thì **package** có thể xem là **directory** chứa các modules.

[Packages](https://docs.python.org/3/tutorial/modules.html#tut-packages) là phương pháp để quản lý python's module namspace bằng cách sử dụng "**dotted module names**". Ví dụ, khi gõ module name `A.B`, điều này có nghĩa là ta đang chỉ định tới **module B**  ở bên trong **package A**. 

Tương tự như việc sử dụng module để giúp người viết module không phải lo lắng là bị **trùng tên biến/hàm** ở các module của người khác viết, việc sử dụng **dotted module names** sẽ giúp người viết *multi-module packages* như là NumPy hay Pillow không phải lo lắng về việc bị **trùng tên module** với người khác.

# 2. `Import` statement

Giả sử như bạn muốn design một collection of modules ( a "package") để xử lý các sound files và sound data. Các sound file này sẽ có rất nhiều format khác nhau (thông thường được nhận biết thông qua extension của chúng, ví dụ: `.wav`, `.aiff`, `.au`), vì vậy bạn cần phải create và maintain a **growing** collection of modules để chuyển đổi giữa các formats khác nhau.

Tiếp theo, sẽ có rất nhiều tác vụ mà bạn muốn thực hiện trên sound data (ví dụ như mixing, thêm echo, áp dụng equalizer function, tạo ra các hiệu ứng âm thanh,..), như vậy, khả năng là chúng ta sẽ phải viết một loạt các module kéo dài vô tận để thực hiện các tác vụ này. Dưới đây là một cấu trúc của package mà chúng ta có thể sử dụng:

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

File `__init__.py` bắt buộc phải có để Python xem một directory là một package. 

Trong trường hợp đơn giản nhất, thì `__init.py__` có thể chỉ là một file rỗng, nhưng nó có thể được sử dụng để chạy các code khởi tạo, hoặc là để set giá trị cho biến `__all__` , sẽ được mô tả sau.

Người dùng của package có thể import riêng rẽ từng module, ví dụ:

```py
import sound.effects.echo
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

Một cách khác để import cái submodule:

```py
from sound.effects import echo
echo.echofilter(input, output, delay=0.7, atten=4)
```
Hoặc ta có thể tiến xa hơn nữa, import thẳng cái function vào symbol table luôn:

```py
from sound.effects.echo import echofilter
echofilter(input, output, delay=0.7, atten=4)
```

**So sánh `from package import item` và `import item.subitem.subsubitem`**


Với `from package import item`, cái **item** sẽ có thể hoặc là ✔ submodule, hoặc là ✔ subpackage, hoặc có thể là ✔ function, ✔ class hoặc ✔ variable.

Về thứ tự, thì import statement sẽ kiểm tra xem cái tên đó có phải là một định nghĩa trong cái package đó hay không (function, class, variable), nếu không có, thì nó sẽ ngầm hiểu đây là module và thử load module. 

Với `import item.subitem.subsubitem`, mỗi item trừ cái cuối cùng, bắt buộc phải là một package, cái cuối cùng sẽ có thể hoặc là một ✔ module hoặc là một ✔ package, nhưng nó không thể là ❌ function, ❌ class, ❌ variable.

# 3. Package Relative Imports
Khi mà package được cấu trúc thành các subpackages (như ví dụ cái `sound` package), thì bạn sẽ có thể sử dụng **absolute import** để refer tới các **submodules** bên trong **siblings packages**. 

Ví dụ, nếu module `sound.filters.vocoder` cần sử dụng `echo` module ở trong `sound.effects` package, ta có thể viết `from sound.effects import echo`.

Hoặc, ta có thể viết **releative import**, vẫn sử dụng dạng `from module import name` . Nhưng chúng ta sẽ sử dụng **leading dots** để chỉ ra **current** và **parent package** có tham gia vào quá trình import. Ví dụ, như ta đang đứng bên trong `surround` module, ta có thể import như sau:

```py
from . import echo
from .. import formats
from ..filters import equalizer
from .echo import echofilter
```

Note: với **absolute import** thì ta có thể sử dụng hoặc là `import <>` hoặc là `from <> import <>`. Nhưng `relative import` sẽ chỉ dùng dạng `from <> import <>`. Lý do là bởi vì, với:
```
import XXX.YYY.ZZZ
```
thì `XXX.YYY.ZZZ` là một usable expression, nhưng `.XXX` thì *không* phải là một *valid* expression.

# 4. `__all__` variable
Có một câu hỏi, là chuyện gì xảy ra khi người dùng viết `from sound.effects import *`?  

Trường hợp lý tưởng nhất, là bên trong file `__init__.py` của package, có cung cấp danh sách tên các modules sẽ được import, sử dụng `__all__` variable. Ví dụ
```py
__all__ = ["echo", "surround", "reverse"]
```
Khi đó,  interpreter sẽ chỉ import các module có name được cung cấp trong danh sách này.

Trường hợp biến `__all__` không được định nghĩa, câu lệnh `from sound.effects import *` sẽ KHÔNG import tất cả submodules của package sound.effects vào. Nó chỉ đảm bảo là package `sound.effects` được import, chạy tất cả code bên trong file `__init__.py`, và import tất cả các names được định nghĩa trong package. Những names này bao gồm tất cả function, class, variable được định nghĩa bên trong file `__init__.py` và các submodules được explicitly loaded. 

Tới đây, thì ta sẽ thấy hai cách dưới đây là tương đương nhau:
```py
import sound.effects.echo
import sound.effects.surround
import sound.effects.reverse

Hoặc

from sound.effects import *
```
Tuy cả 2 cách đều cho ra kết quả như nhau, `import *` vẫn được xem là **bad practice**. Và `from package import specific_submodule` là cách được recommended.