# Đặt vấn đề
Một project web sẽ phải có rất nhiều API, chúng ta sẽ phải viết rất nhiều hàm test và testcase, nếu ta không xử lý, cấu trúc code test một cách tốt nhất thì dù cho phần code base rất đẹp rất chuẩn thì phần code test sẽ chỉ là đống rác lộn xộn và rất khó maintain.
Để có thể cấu trúc test tốt, ta bắt đầu từ viết testcase
# Cấu trúc của testcase
Ta sẽ tạo folder với cấp cao nhất trong cấu trúc của Project (để tách biệt với phần code base), ta tạo các folder con là tên của các file API, trong các folder con ta tạo các file với tên là từng API trong file API 
Mỗi API sẽ có một file testcase gồm nhiều testcases với các trường hợp mà ta định kiểm thử (các trường hợp chạy thành công, chạy gặp lỗi)
Ta sẽ khởi tạo biến TEST_CASE = {} là một dict 
Các testcase sẽ là 1 item của dict TEST_CASE với key là tên của testcase, value là nội dung của nó
Ví dụ: 
```
TEST_CASE = {}

TEST_CASE["LOGIN_FAILED"] = {
    "INPUT": {
        "username": "hello",
        "password": "123",
    },
    "MOCK": [
        {
            "path": "project.service.example_service.database",
            "return_value": Database(
                return_delete=None,
                return_insert_one="1",
            ),
        },
    ],
    "OUTPUT": Exception(),
    "FUNCTION": login,
}
```
Tên của testcase phía trên là LOGIN_FAILED
Ta thấy có 4 phần cho mỗi testcase
1. INPUT
        Bao gồm các key-value là tên và giá trị của các param mà hàm xử lý của API sẽ nhận (trong ví dụ trên hàm xử lý của API `login` sẽ nhận `username` và `password`
2. MOCK
        Sẽ là danh sách các đường dẫn và giá trị của các hàm/class cần fake giá trị trả về của chúng
        (Lưu ý đường dẫn sẽ phải trỏ đến nơi mà hàm cần fake được gọi chứ không phải là nơi mà hàm đó được viết)
        Trong ví dụ trên, ta sử dụng Database, là class giả lập cho database thật, với các giá trị truyền vào bắt đầu bằng `return` để quy định giá trị trả về của database trong code khi nó gọi các phương thức tương ứng như `insert_one` (sẽ trả về 1)
3. OUTPUT
        Sẽ bao gồm giá trị ta muốn so sánh với kết quả của API khi xử lý đầu vào trong phần INPUT
4. FUNCTION
        Là tên của hàm xử lý API (ở đây là hàm `login`)
# Cấu trúc của file test
Việc có 1 Template cho các testcases sẽ giúp ta viết 1 dynamic funciton testing một cách dễ dàng (ta sẽ viết 1 hàm test duy nhất cho tất cả các testcase, hay nói cách khác ta viết để không phải động đến hàm test nữa mà chỉ quan tâm test API nào thì tạo file viết testcase cho API đó)
Để làm được điều đó thì trước khi vào file test và tạo hàm test, ta cần viết file `conftest.py`, với tên file này, Pytest sẽ thực thi nó trước khi chạy hàm test. Ta có thể import các testcase vào từ file này, nhưng ta không phải làm điều đó thủ công bằng tay (sau đó lại phải chạy hàm test bằng command), điều đó rất thiết chuyên nghiệp, thay vào đó ta sẽ sử custom thêm các flag ở command để cho pytest biết là ta cần chạy testcase cho APIs nào
## file `conftest.py`:
```
import datetime
import os
import importlib

import pytest

testcases_dir = "testcases"


def get_immediate_subdirectories(a_dir):
    return [
        name
        for name in os.listdir(a_dir)
        if os.path.isdir(os.path.join(a_dir, name)) and name.endswith("router")
    ]


def get_list_of_files(dirName):
    listOfFile = os.listdir(dirName)
    allFiles = list()
    for entry in listOfFile:
        fullPath = os.path.join(dirName, entry)
        if os.path.isdir(fullPath):
            allFiles = allFiles + get_list_of_files(fullPath)
        else:
            allFiles.append(fullPath)

    return allFiles


def get_tree_testcases():
    PATHS = {}
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    testcases_path = os.path.split(ROOT_DIR)[0]
    folder_paths = get_immediate_subdirectories(testcases_path + "/" + testcases_dir)
    for folder_path in folder_paths:
        PATHS[folder_path] = []
        parent = testcases_path + "/" + testcases_dir + "/" + folder_path + "/"
        files_path = get_list_of_files(parent)
        for file_path in files_path:
            if "__init__" in file_path:
                continue
            list_file_name = file_path.split("/")
            PATHS[folder_path].append(
                list_file_name[len(list_file_name) - 1].split(".")[0]
            )
    return PATHS


def pytest_addoption(parser):
    parser.addoption("--files", action="store")
    parser.addoption("--folders", action="store")
    parser.addoption("--excludes", action="store")


def append_path(paths, _folder, _file):
    new_path = testcases_dir + "." + _folder + "." + _file
    if new_path not in paths:
        paths.append(new_path)


def generate_path(folders=None, files=None):
    PATHS = get_tree_testcases()
    paths = []
    if not folders and not files:
        for _folder, _files in PATHS.items():
            for _file in _files:
                append_path(paths, _folder, _file)
    elif not files:
        for _folder, _files in PATHS.items():
            for folder in folders:
                if folder not in _folder:
                    continue
                for _file in _files:
                    append_path(paths, _folder, _file)
    else:
        for _folder, _files in PATHS.items():
            if (
                folders and any([(folder in _folder) for folder in folders])
            ) or not folders:
                for file in files:
                    for _file in _files:
                        if file not in _file:
                            continue
                        append_path(paths, _folder, _file)
    return paths


def pytest_generate_tests(metafunc):
    testcases = []
    files = None
    folders = None
    if metafunc.config.getoption("files"):
        name_files = metafunc.config.option.files
        files = name_files.split("+")
    if metafunc.config.getoption("folders"):
        name_folders = metafunc.config.option.folders
        folders = name_folders.split("+")
    paths = generate_path(folders, files)
    for path in paths:
        testcase = importlib.import_module(path).TEST_CASE
        for name_test, data_test in testcase.items():
            data_test["NAME"] = name_test
            testcases.append(data_test)
    if metafunc.config.getoption("excludes"):
        excludes_attr = metafunc.config.option.excludes
        for _testcase in testcases:
            _testcase["COMPARISON_EXCLUDE"] = excludes_attr.split("+")
    tcs = []
    metafunc.parametrize("testcase", testcases)
```
Hàm đầu tiên ta cần chú ý là `pytest_addoption` sẽ định nghĩa ra các flag mà ta sử dụng trong command-line
Hàm `generate_path` sẽ tìm đường dẫn tương ứng với các tên file hay folder mà ta nhập trong command-line
Hàm `pytest_generate_tests` sẽ từ các đường dẫn mà import vào các TEST_CASE trong các file testcase và tạo ra multi-test cho Pytest
## file `test_master.py`
Đây chính là linh hồn của cả phần testing (1 file viết cho nhiều testcase, không phải chỉnh sửa)
```
from unittest.mock import MagicMock
import mock
import pytest
from typing import TypeVar
from pydantic import BaseModel

T = TypeVar("T")


def get_dict_from_testing_result(object: T, COMPARITION_EXCLUDE: list = []):
    res = {}
    data = object if type(object) is dict else object.__dict__
    for attr in COMPARITION_EXCLUDE:
        if attr in data.keys():
            data.pop(attr)
    for key, value in data.items():
        if value == None:
            continue
        if isinstance(value, BaseModel):
            res[key] = get_dict_from_testing_result(value, COMPARITION_EXCLUDE)
        elif type(value) is not dict:
            res[key] = value
        elif len(value.keys()) == 0:
            continue
        else:
            res[key] = get_dict_from_testing_result(value, COMPARITION_EXCLUDE)
    return res


@pytest.mark.asyncio
async def test_master(
    testcase,
    mocker,
):
    for item in testcase["MOCK"]:
        mocker.patch(item["path"], return_value=item["return_value"])
    print(testcase["FUNCTION"].__name__, testcase["NAME"])
    if isinstance(testcase["OUTPUT"], Exception):
        with pytest.raises(testcase["OUTPUT"].__class__) as exception:
            await testcase["FUNCTION"](*testcase["INPUT"].values())
        print(exception.__dict__["_excinfo"])
    else:
        resutl = await testcase["FUNCTION"](*testcase["INPUT"].values())
        if "COMPARISON_EXCLUDE" in testcase.keys():
            assert get_dict_from_testing_result(
                resutl, testcase["COMPARISON_EXCLUDE"]
            ) == get_dict_from_testing_result(
                testcase["OUTPUT"], testcase["COMPARISON_EXCLUDE"]
            )
        else:
            assert (
                resutl == testcase["OUTPUT"]
            ), "a few values are realtime so not equal while testing"

```
# Cách chạy test
> pytest [-p no warnings] [-vv] [-s] [--folders param1[+pram2+...]] [--files param1[+param2+...]] [--excludes param1[+param2+...]]
```
	 [-p no warnings] sẽ bỏ qua warnings của pytest
	 [-vv] hiển thị kết quả chạy chi tiết của testcase
	 [-s] hiển thị chi tiết thông tin khi chạy testcase
	 [--folders] xác định folders testcase sẽ chạy
	 [--files] xác định files testcase sẽ chạy
	 [--excludes] không so sánh thuộc tính được liệt kê
```