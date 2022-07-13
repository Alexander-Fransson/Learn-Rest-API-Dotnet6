import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, ModalBody} from 'react-bootstrap';

class AddDepModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){

        event.preventDefault();

        fetch(process.env.REACT_APP_API+"Department",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                departmentName:event.target.DepartmentName.value, 
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert(error)
        });
    }

    render() { 
        return (<div className='container'>

            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header clooseButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Department
                    </Modal.Title>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId='DepartmentName'>
                                        
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type='text' name='DepartmentName' 
                                        required placeholder='DepartmentName'/>

                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Add Department
                                        </Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Modal.Header>
            </Modal>

        </div>);
    }
}
 
export default AddDepModal;