import React, { Component } from 'react';
import './../App.css';
import AddUser from './AddUser';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import DataUser from './Data.json'


const { v4: uuidv4 } = require('uuid');

class App extends Component {
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
 
  constructor(props) {
    super(props);
    this.state={
      hienthiForm:false,
      data:[],
      searchText:"",
      editUserStatus:false,
      userEditObject:{}
    }
  }
  componentWillMount() {
    // kiem tra xem co localstorage chua
    if(localStorage.getItem('userData')=== null){
      localStorage.setItem('userData',JSON.stringify(DataUser));
      // biến thành chuỗi đẩy vào local
    }
    else{
      var temp =JSON.parse(localStorage.getItem('userData'));
      // lấy ra phải giải mã lại dùng parse
      this.setState({
        data:temp
      });
    }
  }
  changeEditUserStatus = ()=>{
    this.setState({
      editUserStatus:!this.state.editUserStatus
    })
  }
  deleteUser  =(idUser) =>{
    // hàm filter
    // var arr=[1,2,3];
    // var x=2;
    // arr =arr.filter(item=>item!=x);
    // bỏ đi nhưng phần tử thoa mãn yêu cầu xoá
   
    // biến trung gian


    var tempData =this.state.data.filter(item=>item.id!==idUser);
    this.setState({
      data:tempData
    })
    // đẩy vào dữ liệu
    localStorage.setItem('userData',JSON.stringify(tempData));
    // logic xoa dữ liệu để ở state
    // tempData.forEach((value,key)=>{
    //   if(value.id===idUser){
    //     console.log(key);
       
    //   }
    // });
  }
  getUserEditInfoApp=(info)=>{
    console.log("Thông tin đã đc sửa là "+ info.name);
    this.state.data.forEach((value,key)=>{
       if(value.id===info.id){
         value.name=info.name;
         value.tel=info.tel;
         value.permission=info.permission;
       }
    });
    localStorage.setItem('userData',JSON.stringify(this.state.data));
  }
  editUser  =(user) =>{
    // truyền xuống qua props còn gửi lên qua tham số truyền vào
    console.log("Đã kết nối ok");
    this.setState({
      userEditObject:user
    })
    console.log(user);
  }
  getNewUserData =(name,tel,permission)=>{
    var item = {};
    item.id=uuidv4();;
    item.name=name;
    item.tel=tel;
    item.permission=permission;
    var items = this.state.data;
    items.push(item);
    this.setState({
      // cap nhat lai state data dc luu trong state
      data:items
      // state co du lieu r tu dong co luon state luon la trung gian
    })
    // console.log("ket noi ok");
    // console.log(this.state.data);
    // du lieu nam trong data
    localStorage.setItem('userData',JSON.stringify(items));
  }
  doiTrangThai =()=>{
    this.setState({
      hienThiForm: !this.state.hienThiForm
    });
  }
  getTextSearch =(dl)=>{
    this.setState({
      searchText:dl
    });
    console.log("Du lieu bo nhan dc la "+ this.state.searchText)
  }
  render() {
    // localStorage.setItem('usserData',JSON.stringify(DataUser));
    var ketqua=[];
    this.state.data.forEach((item)=>{
      if(item.name.indexOf(this.state.searchText) !== -1){
        ketqua.push(item);
      }
    })
    // console.log(ketqua);
    return (
      <div>
        <Header/>
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search
              getUserEditInfoApp={(info)=>{this.getUserEditInfoApp(info)}} 
              userEditObject={this.state.userEditObject}
              changeEditUserStatus={()=>this.changeEditUserStatus()}
              editUserStatus={this.state.editUserStatus}
              checkConnectProps ={(dl)=>this.getTextSearch(dl)}
              ketNoi={()=>this.doiTrangThai()}
              hienThiForm={this.state.hienThiForm}/>
              <TableData  
              deleteUser  ={(idUser) =>this.deleteUser(idUser)}
              changeEditUserStatus={()=>this.changeEditUserStatus()}
              editFun={(user)=>{this.editUser(user)}} 
              dataUserProps={ketqua}/>
              <AddUser add={(name,tel,permission)=>this.getNewUserData(name,tel,permission)}
               hienThiForm={this.state.hienThiForm}/>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

