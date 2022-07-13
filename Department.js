import React, { Component } from 'react';
import {Table} from "react-bootstrap";

import {Button,ButtonToolbar} from 'react-bootstrap';
import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';

class Department extends Component {
    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+"Department")//måste startas om vid ny fil
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid,depname){
        if(window.confirm('Are you sure you want to delete '+depname+'?')){
            fetch(process.env.REACT_APP_API+"Department/"+depid,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            })
        }
    }

    render() { 
        const {deps, depid, depname }= this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});

        return (
            <div className='mt-5 d-flex justify-content-left'>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </thead>
                    <thead>
                        {deps.map(dep => 
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                        className='mr-2'
                                        variant='info'
                                        onClick={() => this.setState({
                                        editModalShow:true,
                                        depid:dep.DepartmentId,
                                        depname:dep.DepartmentName
                                        })}>
                                            Edit
                                        </Button>

                                        <Button
                                        className='mr-2'
                                        variant='danger'
                                        onClick={() => this.deleteDep(dep.DepartmentId, dep.DepartmentName)}>
                                            Delete 
                                        </Button>

                                        <EditDepModal 
                                        show={this.state.editModalShow} 
                                        onHide={editModalClose}
                                        depid={depid}
                                        depname={depname}/>
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
                            Add Department
                        </Button>

                        <AddDepModal 
                        show={this.state.addModalShow} 
                        onHide={addModalClose}/>
                    </ButtonToolbar>

                </Table>
            </div>
        );
    }
}
 
export default Department;