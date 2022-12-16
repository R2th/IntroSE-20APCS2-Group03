# 1. Mở đầu
Trong vòng vài năm gần đây hooks đang được rất ưa chuộng trong đội ngũ reactjs, một trong những lý do chính đó là sự thuận tiện, ngắn gọn tuyệt vời mà nó mang lại. Hơn thế nữa chúng ta hoàn toàn có thể có thêm lựa chọn để chia code một cách tường minh. Một trong số cách tuyệt vời đó là custom hooks.
# 2, Custom Hooks là gì và ví dụ:
`Có thể hiểu đơn giản custom hooks là một cách chia code dẽ dàng và hiệu quả.`

Ok trong một dự án các bạn sẽ thấy có một file .eslintrc, file này sẽ quy định các quy tắc viết code của bạn, thường để đảm bảo tính tường minh và dễ bảo trì thì độ dài của một file sẽ vào khoảng 200 dòng. Nó đảm bảo bạn sẽ chia các đoạn code theo từng tác vụ mà nó thực hiện, nếu bạn chỉ đơn giản viết tách ra một componenter và import vào thì đơn giản nhưng bạn sẽ phải lặp lại đoạn import thư viện, defaul value vv... khá là nhiều công việc phải lặp lại đúng không nào. Thay vì đó bạn có thể tạo ra một custorm hooks và viết tất cả chúng vào, khi nào cần chỉ cần useNameHook đó vào là song. 

Để thấy rõ vấn đề này chúng ta sẽ cùng đi vào một số ví dụ để thấy được sự thú vị của hàm này nhé. 

Đầu tiên mình muốn vẽ một table, chúng ta sẽ có một đoạn code như sau:
```js
const Table = ({
    Data, paginate, delete,
    fetch, search, id, authUser,
    updateStatus, userProject, roleUser
}) => {
    const {Option} = Select;

    function renderTagSeverity(severity) {
        switch (severity) {
        case 'critical':
            return '#991aff';
        case 'high':
            return '#f80000';
        case 'medium':
            return '#fb9900';
        case 'low':
            return 'rgb(195, 195, 32)';
        default:
            return 'red';
        }
    }

    function checkShowStatus(status) {
        switch (status) {
        case PROCESS:
            return PROCESS;
        case APPROVED:
            return APPROVED;
        case REJECT:
            return REJECT;
        default:
            return PROCESS;
        }
    }

    function getColumn() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '12%'
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                width: '12%'
            },
            {
                title: 'Score',
                dataIndex: 'score',
                width: '12%'
            },
            {
                title: 'Impact',
                dataIndex: 'impact',
                width: '12%'
            },
            {
                title: 'Owner',
                dataIndex: 'username',
                width: '16%'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '15%',
                render: (text, record) => (
                    showSelectWithRole(text, record)
                )
            },
            {
                title: 'Action',
                dataIndex: 'action',
                width: '14%'
            }
        ];
        return columns;
    }

    function handleChange(record, value) {
        updateStatus({
            id: record.key,
            status: value,
            userId: authUser.get('id')
        });
    }

    function handlePageChange(page) {
        fetch({id, search: {...search, page}});
    }

    function confirm(id) {
        delete(id);
    }

    function showSelectWithRole(text, record) {
        const userCreateId = record(['user_id', 'id']);
        if (roleUser === ADMIN || userProject === PM || userCreateId === authUser.get('id')) {
            return (
                <Select
                    name='status'
                    defaultValue={checkShowStatus(record.('status'))}
                    style={{width: 140}}
                    onChange={value => handleChange(record, value)}
                >
                    <Option value={PROCESS}>PROCESS</Option>
                    <Option value={APPROVED}>APPROVED</Option>
                    <Option value={REJECT}>REJECT</Option>
                </Select>
            );
        }
        return (
            <Select
                name='status'
                defaultValue={checkShowStatus(record.get('status'))}
                onChange={value => handleChange(record, value)}
                disabled
                showArrow={false}
            >
                <Option value={PROCESS}>PROCESS</Option>
                <Option value={APPROVED}>APPROVED</Option>
                <Option value={REJECT}>REJECT</Option>
            </Select>
        );
    }

    function checkRole(userId, id, idProject) {
        if (userId === authUser.get('id')) {
            return (
                <div>
                    <Tooltip title='Edit' placement='top'>
                        <Link to={`/project/${idProject}/edit/${id}`}>
                            <Button>
                                <EditOutlined />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Popconfirm
                        title='Are you sure delete this security vulnerability?'
                        onConfirm={() => confirm(id)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <Tooltip title='Delete' placement='top'>
                            <Button danger>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                </div>
            );
        }
        return '';
    }

    const dataTable = [];
    Data.map((data) => {
        dataTable.push({
            key: data.getIn(['id']),
            name: data.getIn(['name']),
            severity: (
                <span>
                    <Tag
                        color={renderTagSeverity(data.getIn(['severity']))}
                    >
                        {data.getIn(['severity'])}
                    </Tag>
                </span>
            ),
            score: (
                <span>
                    <a
                        style={{color: '#01a9ac'}}
                        href={data.getIn(['score'])}
                        target='__blank'
                    >
                        {data.getIn(['score'])}
                    </a>
                </span>
            ),
            impact: (
                <span>
                    {data.getIn(['impact'])}
                </span>
            ),
            username: (
                <span>
                    {data.getIn(['user_id', 'name'])}
                </span>
            ),
            status: (
                <span>
                    {data}
                </span>
            ),
            action: (
                checkRole(data.getIn(['user_id', 'id']), data.get('id'), id)
            )
        });
        return dataTable;
    });
    const columns = getColumn();
    return (
        <>
            <Table
                dataSource={dataTable}
                columns={columns}
                scroll={{y: '55vh'}}
                pagination={
                    {
                        defaultPageSize: pagination.pageSize,
                        pageSize: paginate.get('perPage'),
                        defaultCurrent: pagination.currentPage,
                        current: paginate.get('currentPage'),
                        total: paginate.get('total'),
                        showSizeChanger: false,
                        onChange: page => handlePageChange(page)
                    }
                }
            />
        </>
    );
};

```
với `Data` là dữ liệu mình muốn render ra, `paginate` là phân trang, và các hàm `delete, fetch, search, id, authUser, updateStatus, userProject, roleUser` là các hàm sử lý của mình. Các bạn không cần quá quan tâm xem nó thực hiện các tác vụ gì, mà thực ra từ cái tên các bạn đã dễ dàng nhận ra nó để làm gì rồi :D. Vấn đề mình muốn nói tới ở đây dù mình đã đặt tên khá tường mình nhưng thật khó để các bạn heo dõi luồng xử lý logic của mình. 

thay vì đó mình sẽ tách các một số hàm trên thành một file đặt tên là: **useSupportHook.js** các bạn chú ý lên đặt tên có phần **use** đằng trước nhé. Và mình có đoạn nột dung như sau:
```js
import {PROCESS, APPROVED, REJECT} from '~/utils/status';

const renderTagSeverity = (severity) => {
    switch (severity) {
    case 'critical':
        return '#991aff';
    case 'high':
        return '#f80000';
    case 'medium':
        return '#fb9900';
    case 'low':
        return 'rgb(195, 195, 32)';
    default:
        return 'red';
    }
};

const checkShowStatus = (status) => {
    switch (status) {
    case PROCESS:
        return PROCESS;
    case APPROVED:
        return APPROVED;
    case REJECT:
        return REJECT;
    default:
        return PROCESS;
    }
};


const useSupportHook = (showSelectWithRole) => {
    function getColumn() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '12%'
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                width: '12%'
            },
            {
                title: 'Score',
                dataIndex: 'score',
                width: '12%'
            },
            {
                title: 'Impact',
                dataIndex: 'impact',
                width: '12%'
            },
            {
                title: 'Owner',
                dataIndex: 'username',
                width: '16%'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '15%',
                render: (text, record) => (
                    showSelectWithRole(text, record)
                )
            },
            {
                title: 'Action',
                dataIndex: 'action',
                width: '14%'
            }
        ];
        return columns;
    }

    return [
        renderTagSeverity,
        checkShowStatus,
        getColumn
    ];
};
export default useSupportHook;
```

và bên file mình sẽ import vào *import useSupportHook from './useSupportHook';* và use vào:
```
const [renderTagSeverity, checkShowStatus, getColumn] = useSupportHook(showSelectWithRole);
```
và bây giời mình chỉ việc sử dụng chúng thôi :D thật ngắn gọn và tường mình đúng không nào.

# 3, Kết luận:
Đọc tới đây chắc các bạn cũng đã hình dung được custom hook là gì cũng như cách sử dụng, hoạt động của nó rồi đúng không ạ :D. Tương tự với cách sử dụng như vậy, bạn có thể tạo ra nhiều các biến thể khác nhau cho phù hợp với mục đích sử dụng. Các ơn các bạn đã theo dõi.

![](https://images.viblo.asia/7b655f48-8bcb-4fb7-8e53-82a2d417bc51.png)