import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {
    deleteButtonClick=(idUser)=>{
        this.props.deleteUser(idUser);
    }
    mappingDataUser = ()=> this.props.dataUserProps.map((value,key)=>(
    // map duyệt từng phần tử 1 mỗi phần tử chứa trong 1 value
        <TableDataRow 
        deleteButtonClick ={(idUser)=>this.deleteButtonClick(idUser)}
        changeEditUserStatus={()=>this.props.changeEditUserStatus()}
        // chuyền từ cha sang con dùng this.props còn trong tabledata thì dùng this
        editFunClick={(user)=>this.props.editFun(value)} 
        userName={value.name}
        key={key}
        tel={value.tel}
        permission={value.permission}
        id={value.id}
        stt={key}/>
         
        // trong này có bao nhiêu phần tử thì nó cũng có bấy nhiêu đấy
    ))
   
    render() {

        return (
                <div className="col">
                    <table className="table table-striped table-inverse table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Quyền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                                

                                {
                                    this.mappingDataUser()
                                }
                        </tbody>
                    </table>
                </div>
            );
    }
}

export default TableData;
