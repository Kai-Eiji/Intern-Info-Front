import React, { Component } from "react";
import { Table } from "reactstrap";
import SeeDetail from "./SeeDetail";

class StudentList extends Component {
  state = {
    width: window.innerWidth,
  }

  handleResize = (e) => {
    this.setState({ width: window.innerWidth });
   };

  componentDidMount() {
  window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
  window.addEventListener("resize", this.handleResize);
  } 

  render() {
    const students = this.props.students;
    const width = this.state.width;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company {width}</th>
            <th>Salary</th>
            <th>City</th>
            {
              width > 500 ?
              <React.Fragment>
                <th>Year</th>
                <th>Date Posted</th>
              </React.Fragment> 
              :
              ""
            }
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No data Available</b>
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.pk}>
                <td>{student.company}</td>
                <td>${student.salary}</td>
                <td>{student.city}</td>
                {
                  width > 500 ?
                  <React.Fragment>
                    <td>{student.grade_year}</td>
                    <td>{student.post_date}</td>
                  </React.Fragment>
                  :
                  ""
                }
                <td align="center">
                  <SeeDetail
                    student={student}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
