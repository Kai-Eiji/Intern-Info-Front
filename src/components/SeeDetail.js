import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Container} from "reactstrap";
import '../App.css';

class SeeDetail extends Component{
    state = { modal: false };

    prev_exp(exp_num){
        if(exp_num == -1){
            return "N/A";
        }
        else{
            return exp_num;
        }
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    not_req = (val) => {
        if(val == 0 | val == "" | val == null){
            return 'N/A'
        }
        else{
            return val
        }
    }

    show_comment = (cm, pk) =>{
        if(cm == "" || pk < 594){
            return <></>
        }
        else{
            return(
                <Row>
                    <Col>
                    <div className="comment">
                        <p className="t-1 mb-1">Other:</p>
                        <p className="t-1" >{this.props.student.comment}</p>
                    </div>
                    </Col>
                </Row>
            )
        }
    }

    show_housing_amount = () =>{
        if(this.props.student.housing === "Housing Stipend"){
            if(this.props.student.housing_amount != null){
                return(
                    <span>
                        <p className="t-1">Snippend Amount:</p>&nbsp;&nbsp;
                        <h5>${this.props.student.housing_amount}</h5>
                    </span>
                );
            }
            else{
                return(
                    <span>
                        <p className="t-1">Stipend Amount:</p>&nbsp;&nbsp;
                        <h5>N/A</h5>
                    </span>
                );
            }
        }
    }

    detail = (
        <Container>
          <Row className="show-grid">
            <Col md={4}>
                <span>
                    <p className="t-1">Company:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.company}</h5>
                </span>
              
            </Col>
            <Col md={4}>
                <span>
                    <p className="t-1">Location:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.city}, {this.props.student.state}</h5>
                </span>
            </Col>
            <Col md={2}>
                <span>
                    <p className="t-1">Salary:</p>&nbsp;&nbsp;
                    <h5>${this.props.student.salary}</h5>
                </span>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={4}>
                <span>
                    <p className="t-1">University:</p>&nbsp;&nbsp;
                    <h5>{this.not_req(this.props.student.university)}</h5>
                </span>
            </Col>
            <Col md={4}>
                <span>
                    <p className="t-1">Year:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.grade_year}</h5>
                </span>
            </Col>
            <Col md={3}>
                <span>
                    <p className="t-1">GPA:</p>&nbsp;&nbsp;
                    <h5>{this.not_req(this.props.student.gpa)}</h5>
                </span>
            </Col>
          </Row>
          <Row className="show-grid">
          <Col md={4}>
                <span>
                    <p className="t-1">Job Title:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.job_role}</h5>
                </span>
            </Col>
            <Col md={4}>
                <span>
                    <p className="t-1">Number of Previous Internships:</p>&nbsp;&nbsp;
                    <h5>{this.prev_exp(this.props.student.prev_exp_num)}</h5>
                </span>
            </Col>
            {/* <Col md={4}>
                <span>
                    <p className="t-1">Number of Jobs Applied:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.jobs_applied}</h5>
                </span>
            </Col> */}
          </Row>
          <Row className="show-grid">
          <Col md={4}>
                <span>
                    <p className="t-1">Housing:</p>&nbsp;&nbsp;
                    <h5>{this.props.student.housing}</h5>
                </span>
            </Col>
            <Col md={4}>
                {this.show_housing_amount()}
            </Col>
          </Row>
          {this.show_comment(this.props.student.comment, this.props.student.pk)}
        </Container>
    )
    
    render(){
        return(
            //<Fragment>
            <div>
                <Button onClick={this.toggle}>See Detail</Button>
                <Modal size="xl" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Detail</ModalHeader>
                <ModalBody>
                    {this.detail}
                </ModalBody>
                </Modal>
            </div>
            //</Fragment>
        );
    }
}

export default SeeDetail;