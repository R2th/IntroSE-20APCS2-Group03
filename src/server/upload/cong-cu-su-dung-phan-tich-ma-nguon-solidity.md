Solidity là ngôn ngữ lập trình bậc cao, được các lập trình viên thường dùng để phát triển hợp đồng thông minh (Smart Contract). Phương pháp phân tích và công cụ hỗ trợ để phân tích của đội ngũ Manuel Araoz CTO, Zeppelin được trích dẫn từ nguồn để cuối bài viết.

**Chúng được cấu trúc thành 3 loại chính:**
(1) Code visualization – trực quan hóa mã
(2) Static analysis – phân tích tĩnh.
(3) Testing/fuzzing – kiểm tra / kiểm tra mờ.

Các danh mục này áp dụng cho cả mã C ++ của trình biên dịch, cũng như cho đầu ra EVM mà nó tạo ra.

# C++ Visualization
SourceTrail:

* Source explorer for C++ and Java. 
* Extremely useful for rapid visual navigation of a large codebase. 

Visual Paradigm:

* UML generation tools.
* Can automatically produce useful diagrams with a bit of tweaking.

Ctags:

* Source code indexer.
* Facilitates in-editor code navigation.

Cscope:

* Source code browser.
* Ctags on steroids.

# C++ Static Analysis
Clang-tidy:

* Clang-based C++ linter aimed to diagnose typical programming errors.
* Includes boost checks.

CppCheck:

* Static analysis tool for C++ aimed at detecting real errors (minimal false positives).

CppDepend:

* Powerful static analysis aimed at improving code quality.

Flawfinder:

* Tool for detecting possible security issues in C++ code.

CppLint:

* Scan-build
* lizard (A simple code complexity analyser)


# C++ Testing/Fuzzing
Grammarinator:

* Generates random tests according to an ANTLR grammar definition.
* Federico Bond’s Solidity.g4 brings us a step closer to make this work, but needs a bit of work.

American Fuzzy Lop
LibFuzzer
Clang’s AddressSanitizer, MemorySanitizer, Fuzzer, SanitizerCoverage
gdb/lldb (for debugging)
Dhex (hexadecimal editor)
# EVM Tools (Compiler Output Code)

Hệ sinh thái Ethereum đã tạo ra một loạt các công cụ có khả năng hữu ích cho việc phân tích của chúng tôi. Các công cụ trực quan hóa giúp chúng tôi hiểu đầu ra của trình biên dịch, ở mức khá thấp và khó đọc một cách tự nhiên. Việc hình dung như vậy đặc biệt quan trọng để đánh giá các tối ưu hóa opcode EVM. Phân tích tĩnh giúp chúng tôi xác định các vấn đề về luồng điều khiển mà trong đầu ra EVM và các công cụ làm mờ cho phép chúng tôi kiểm tra bytecode bên ngoài giao diện ABI được sử dụng rộng rãi hiện được đề cập trong nhiều khuôn khổ như Truffle.

## EVM Visualization
Solplay
* Realtime Solidity to various solc output visualizer, including post bytecode processing by other tools.
* Built by Zeppelin specifically for this audit, intended to accelerate the usage of other visualization tools.


Solmap
* Realtime to bytecode output visualizer, with the ability to select opcode ranges and see the associated Solidity sources. Uses the compiler’s sourcemap information.
* Also built by Zeppelin for this audit.


Remix
Solidity IDE.
* Very robust for debugging Solc output.


Evmdis
* EVM disassembler that groups opcodes into more readable expressions.
* Very handy for visualization but not 100% accurate.


go-ethereum/evm
* Developer utility EVM.
* Excellent for debugging EVM execution at a very low level.


Evm-tools
* Tools for EVM execution and disassembly.
* Rather outdated, but useful mainly for educational purposes. Not reliable enough.


## EVM Static Analysis
Không sử dụng.
## EVM Testing/Fuzzing
Web3
* Ethereum Javascript API.


Geth
* Go ethereum node implementation.

Cpp-ethereum
* C++ ethereum node implementation.

## Tài liệu tham khảo:
- Từ Openzeppelin : https://blog.openzeppelin.com/solidity-compiler-audit-8cfc0316a420/
- Nguồn bài viết: https://ngochai.info/blockchain/solidity/cong-cu-su-dung-phan-tich-ma-nguon-solidity
- Bài viết về Blockchain: https://ngochai.info/blockchain/