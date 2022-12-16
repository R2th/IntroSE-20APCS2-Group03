**Trong VIM có ba chế độ:**

NORMAL: Trong chế độ này bản có thể dùng các phím tắt các câu lệnh mà không làm ảnh hưởng tới phần văn bản đang gõ.

INSERT: Bạn có thể gõ code, văn bản này trong chế độ này. Đồng thời trong chế độ này bạn không thể dùng phím tắt hoặc lệnh.

VISUAL: Chế độ chọn. Bạn có thể dùng chế độ này để chọn nhanh phần văn bản để xử lý.


**Di chuyển:**

h: di chuyển con trỏ chuột sang trái

j: di chuyển con trỏ chuột xuống dưới

k: di chuyển con trỏ chuột lên trên

l: di chuyển con trỏ chuột sang phải

$: di chuyển con trỏ chuột xuống cuối dòng

0: di chuyển con trỏ chuột về đầu dòng

gg: di chuyển con trỏ chuột về đầu văn bản

G: di chuyển con trỏ chuột xuống cuối văn bản

Ctrl-y: cuộn lên văn bản một dòng

Ctrl-e: cuộn xuống văn bản một dòng

Ctrl-u: cuộn lên văn bản nửa màn hình

Ctrl-d: cuộn xuống văn bản nửa màn hình


**Thay đổi chế độ:**

i: Chuyển sang chế độ INSERT

v: Chuyển sang chế độ VISUAL

V: Chuyển sang chế độ VISUAL LINE (chọn hàng thay vì chọn từ như VISUAL)

Esc: Chuyển sang chế độ NORMAL


**Thao tác với văn bản:**

x: Xóa kí tự tại con trỏ

y: Copy phần văn văn bản đã chọn trong chế độ VISUAL

p: Paste phần văn bản đã lưu

d: Delete văn bản

d2w: Xóa 2 từ đăng sau con trỏ (delete ... word)

d$: Xóa đến cuối dòng

d3b: Xóa 2 từ đằng trước con trỏ (delete ... backwards)

dt): Xóa đến kí tự ")" (delete till ...)

d2j: Xóa 2 dòng bên dưới (delete ... j là xuống)

d2h: Xóa 2 chữ bên trải (delete ... h là qua trái)

dd: Xóa dòng hiện tại của con trỏ

u: Undo 

Ctrl-r: Redo


**Câu lệnh thường gặp:**

:w: Lưu văn bản

:wq: Lưu và thoát văn bản ( hoặc sử dụng ZZ )

:q!: Thoát không lưu