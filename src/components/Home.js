import React, { Component } from "react";
import Pagination from 'react-bootstrap/Pagination'
import { Col, Container, Row } from "reactstrap";
import InternList from "./InternList";
import NewModal from "./NewModal";
import Form from 'react-bootstrap/Form'
import '../App.css';
import axios from "axios";
import { List_URL } from "../constants";

class Home extends Component {
  state = {
    students: [],
    next: "",
    prev: "",
    limit: 600,
    dataNum: 0,
    width: window.innerWidth,
  };

  handleResize = (e) => {
    this.setState({ width: window.innerWidth });
   };

  componentDidMount() {
    this.resetState();
    window.addEventListener("resize", this.handleResize);
  }

   componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  } 

  getStudents = () => {
    axios.get(List_URL+"?limit="+this.state.limit).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous, dataNum : res.data.count})).then();
  };

  getNext = () => {
      axios.get(this.state.next).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous})).then();
    };

   getPrev = () => {
       axios.get(this.state.prev).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous})).then();
     };

   getLast = () => {
       let offSet = Math.floor(this.state.dataNum / this.state.limit) * this.state.limit;
       if(this.state.dataNum % this.state.limit === 0 ){
            offSet = offSet - this.state.limit;
       }
       axios.get(List_URL+"?limit="+this.state.limit+"&offset="+offSet).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous, dataNum : res.data.count}));
   }

   onChange = e => {
       this.setState({limit : e.target.value});
       axios.get(List_URL+"?limit="+e.target.value).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous}));
     };

  resetState = () => {
    this.getStudents();
  };

  render() {
    const width = this.state.width;
    return (
      <Container style={{ marginTop: "20px" }}>
        <div className="text-center " style={ width > 500 ?
          {display: "flex", justifyContent: "space-between", flexWrap: "wrap" }
          :
          {display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div >
                <Form onSubmit={this.changePageLimit}>
                  <Form.Group>
                    <Form.Label style={{marginBottom: "0rem"}}>Per Page Results</Form.Label>
                    <Form.Control onChange={this.onChange} as="select">
                      <option>20</option>
                      <option>50</option>
                      <option>100</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
            </div>
            <h1 className="">Salary List</h1>
            <NewModal resetState={this.resetState} />
        </div>
    
       
        <InternList
          students={this.state.students}
          resetState={this.resetState}
        />

        <div className="center">
            <Pagination>
              <Pagination.First onClick={this.getStudents}/>
              <Pagination.Prev onClick={this.getPrev} />
              <Pagination.Next onClick={this.getNext} />
              <Pagination.Last onClick={this.getLast}/>
            </Pagination>
        </div>
      </Container>
    );
  }
}

export default Home;
