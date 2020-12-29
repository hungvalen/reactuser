import React, { Component } from 'react';
import EditUser from './EditUser';
// Bố muốn truyền cho con thì phải truyền qua props
// con muốn truyền cho bố thì phải truyền qua tham số của hàm trong props
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempValue: "",
            userObj:""
            // giá trị trungGian: lưu dữ liệu vào text
        }
    }
    // props.changeEditUserStatus
    // lấy thông tin cần sửa phải có tham số
    getUserEditInfo=(info)=>{
        this.setState({
            userObj:info
            
            // đối tượng này là info nhận đc
        })
        this.props.getUserEditInfoApp(info);
        console.log(info);
    }
    isShowEditForm = ()=>{
        if(this.props.editUserStatus ===true){
            return <EditUser 
            getUserEditInfo ={(info)=>this.getUserEditInfo(info)}
            userEditObject={this.props.userEditObject}
            changeEditUserStatus={ () =>this.props.changeEditUserStatus()}/>
            // truyền cho thằng cháu edituser 
        }
    }
    isChange = (event) => {
        console.log(event.target.value)
        this.setState({
            tempValue: event.target.value
        });
        this.props.checkConnectProps(this.state.tempValue);
    }
    hienThiNut = () => {
        if (this.props.hienThiForm === true) {
            return (
                <div className="btn btn-danger btn-block" onClick={() => this.props.ketNoi()} style={{ width: '1110px' }} >Đóng lại</div>

            );
        }
        else {
            return (
                <div className="btn btn-primary btn-block" onClick={() => this.props.ketNoi()} style={{ width: '1110px' }} >Thêm mới</div>

            )
        }
    }
    render() {
        return (
            <div>
                <div className="col-12">
                    {this.isShowEditForm()}
                    <div className="form-group">
                        <div className="btn-group">
                            <input onChange={(event) => { this.isChange(event) }} type="text" className="form-control" placeholder="Nhập từ khoá " style={{ width: '1059px' }} />
                            <div className="btn btn-info" onClick={(dl) => {
                                this.props.checkConnectProps(this.state.tempValue)

                            }}>Tìm</div>
                        </div>
                        <div className="btn-group1">

                            {
                                this.hienThiNut()
                            }
                        </div>
                    </div>
                    <hr />

                </div>
            </div>
        );
    }
}

export default Search;
