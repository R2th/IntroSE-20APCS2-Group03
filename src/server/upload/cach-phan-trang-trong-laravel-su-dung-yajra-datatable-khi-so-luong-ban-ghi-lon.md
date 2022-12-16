Các bạn cho mình hỏi cách để chia nhỏ dữ liệu trong yajra datatable  để tải lên trình duyệt khi số lượng bản ghi lớn. <br>
**Code Controller **<br>
public function index()
    {
        if(request()->ajax())
        {
            $item =  Monhoc::select(['id','name'])->orderBy('id', 'desc');
            return Datatables::of($item)
            ->addColumn('action', function($item){****
                       
                        $button = '<a href="monhoc/'. $item->id .'/edit" class="btn btn-primary btn-xs"><i class="fa fa-edit"></i></a>';
                        $button .= '&nbsp;&nbsp;';
                        $button .= '<button type="button" name="delete" id="'.$item->id.'" class="delete btn btn-danger btn-xs"><i class="fa fa-trash"></i></button>';
                        return $button;
                    })
         ->rawColumns(['action'])
         ->make(true);
        }
        return view('admin/monhoc/index');
    }
<br>    
****    Code view:****<br>    
    $(document).ready(function() {
     // Load data
    $(' #monhoc_table').DataTable( {
         processing: true,
         serverSide: true,
         ajax: '{{ route('monhoc.index') }}',

         columns: [
            {data: 'id'},
            {data: 'name'},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
        
    } );
    
    Tuy nhiên cách này khi số lượng bản ghi lớn nó bị treo trình duyệt hoặc load rất lâu ( dữ liệu khoảng 7000 bản ghi ).
    Các bạn cho mình hỏi làm sao để phân chia nhỏ dữ liệu trước khi tải lên trình duyệt. Cảm ơn mọi người