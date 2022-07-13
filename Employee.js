import React, { Component } from 'react';
import {Table} from "react-bootstrap";

import {Button,ButtonToolbar} from 'react-bootstrap';
import AddEmpModal from './AddEmpModal';
import EditEmpModal from './EditEmpModal';

class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+"Employee")//måste startas om vid ny fil
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid,empname){
        if(window.confirm('Are you sure you want to delete '+empname+'?')){
            fetch(process.env.REACT_APP_API+"Employee/"+empid,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            })
        }
    }

    render() { 
        const {emps, empid, empname, depmt, phofinam, doj }= this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});

        return (
            <div className='mt-5 d-flex justify-content-left'>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>DateOfJoining</th>
                        <th>PhotoFileName</th>
                        <th>Options</th>
                    </thead>
                    <thead>
                        {emps.map(emp => 
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>{emp.PhotoFileName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                        className='mr-2'
                                        variant='info'
                                        onClick={() => this.setState({
                                        editModalShow:true,
                                        empid:emp.EmployeeId,
                                        empname:emp.EmployeeName,
                                        depmt:emp.Department,
                                        phofinam:emp.PhotoFileName,
                                        doj:emp.DateOfJoining
                                        })}>
                                            Edit
                                        </Button>

                                        <Button
                                        className='mr-2'
                                        variant='danger'
                                        onClick={() => this.deleteEmp(emp.EmployeeId, emp.EmployeeName)}>
                                            Delete 
                                        </Button>

                                        <EditEmpModal 
                                        show={this.state.editModalShow} 
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        depmt={depmt}
                                        phofinam={phofinam}
                                        doj={doj}/>
                                    </ButtonToolbar>
                                </td>

                            </tr>
                        )}
                    </thead>

                    <ButtonToolbar>
                        <Button 
                        variant='primary' 
                        onClick={() => this.setState({
                        addModalShow:true
                        })}>
                            Add Employee
                        </Button>

                        <AddEmpModal 
                        show={this.state.addModalShow} 
                        onHide={addModalClose}/>
                    </ButtonToolbar>

                </Table>
            </div>
        );
    }
}
 
export default Employee;