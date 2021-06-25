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
      <Table className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Salary</th>
            <th>City</th>
            {
              width > 500 ?
              <React.Fragment>
                <th>Year</th>
                <th>Date Posted</th>
              </React.Fragment> 
              :
              null
            }
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
                <td style={{textAlign: "cenetr"}}>
                  {student.company}
                  {
                    width < 500 ?
                    <SeeDetail
                      style={{fontSize: "12px"}}
                      student={student}
                      resetState={this.props.resetState}
                    />
                    : ""
                  }
                </td>
                <td>${student.salary}</td>
                <td>{student.city}</td>
                {
                  width > 500 ?
                  <React.Fragment>
                    <td>{student.grade_year}</td>
                    <td>{student.post_date}</td>
                    <td align="center">
                      <SeeDetail
                        student={student}
                        resetState={this.props.resetState}
                      />
                    </td>
                  </React.Fragment>
                  :
                  ""
                }
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
