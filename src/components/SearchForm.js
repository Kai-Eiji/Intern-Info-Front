import React, {Component} from 'react';
import {Col, Form, Button} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination'
import axios from "axios";
import StudentList from "./InternList";
import { Search_URL, ALL_City_URL, ALL_Company_URL } from "../constants";
import { Typeahead } from 'react-bootstrap-typeahead';

class SearchForm extends Component{

    state = {
        company : "",
        city: "",
        max_salary: 100000000000,
        min_salary: 0,
        students : [],
        next: "",
        prev: "",
        limit: 20,
        resultNum: 0,
        all_city: [""],
        all_company: []
    }

    componentDidMount(){
        axios.get(ALL_City_URL)
          .then(res => {
              this.setState({all_city: res.data.all_cities.concat([""])}); 
          })

        axios.get(ALL_Company_URL)
        .then(res => {
            this.setState({all_company: res.data.all_companies}); 
        })
    }

    onChange = e => {
        console.log('e', e.target.value);
        this.setState({ [e.target.name]: e.target.value });
     };

   onChangeNum = e => {
      var integer = 0;
      if( e.target.value == ""){
        if(e.target.name == "min_salary"){ integer = 0;}
        if(e.target.name == "max_salary"){ integer = 10000;}
      }
      else{
        var integer = parseInt(e.target.value, 10);
      }
      this.setState({ [e.target.name]:  integer});
    };

    onChangeLimit = e => {
       this.setState({limit : e.target.value});
     };

     getNext = () => {
           axios.get(this.state.next).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous}));
         };

    getPrev = () => {
        axios.get(this.state.prev).then(res => this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous}));
      };

    searchData = () => {
        //e.preventDefault();
        let city = this.state.city == undefined ? "" : this.state.city;
        let company = this.state.company == undefined ? "" : this.state.company;
  
        axios.get(Search_URL +"/?limit=" + this.state.limit + "&salary_min="+this.state.min_salary+"&salary_max="+this.state.max_salary+"&order_by=salary&company=" + company +"&city=" + city).
        then( res => {
            this.setState({ students: res.data.results, next: res.data.next, prev: res.data.previous, resultNum : res.data.count});
        });

    };


    render(){
        return(
            <div className="container">

               <Form>
                 <Form.Row >
                     <Form.Group as={Col} md="3" >
                        <Form.Label>Company</Form.Label>
                        <Typeahead
                            onChange={(selected) => {
                                this.setState({company: selected[0]})
                            }}
                            options={this.state.all_company}
                            id="basic-typeahead-single"
                            placeholder="Any company if blank"
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" >
                        <Form.Label>City</Form.Label>
                        <Typeahead
                            onChange={(selected) => {
                                this.setState({city: selected[0]})
                            }}
                            options={this.state.all_city}
                            id="basic-typeahead-single"
                            placeholder="Any city if blank"
                        />
                    </Form.Group>
                 </Form.Row>


                <Form.Row>
                  <Form.Group as={Col} md="3">
                    <Form.Label>Salary-Min</Form.Label>
                    <Form.Control onChange={this.onChangeNum}  type="number" step="0.1" name="min_salary" placeholder="$ per hour (No min if blank)" required />
                  </Form.Group>

                  <Form.Group as={Col} md="3">
                    <Form.Label>Salary-Max</Form.Label>
                    <Form.Control onChange={this.onChangeNum}  type="number" step="0.1" name="max_salary" placeholder="$ per hour (No max if blank)" required />
                  </Form.Group>
                </Form.Row>

                <Button className="mb-3" onClick={this.searchData} variant="primary">Search</Button>
               </Form>

            <Form>
              <Form.Group as={Col} md="2" style={{paddingLeft: "0rem"}} >
                <Form.Label style={{marginBottom: "0rem"}}>Per Page Results</Form.Label>
                <Form.Control onChange={this.onChangeLimit} as="select">
                  <option>20</option>
                  <option>50</option>
                  <option>100</option>
                </Form.Control>
              </Form.Group>
            </Form>

            <p>
                {this.state.resultNum} matches found
            </p>

           <StudentList
             students={this.state.students}
           />

           <div className="center">
               <Pagination>
                 <Pagination.First />
                 <Pagination.Prev onClick={this.getPrev} />
                 <Pagination.Next onClick={this.getNext} />
                 <Pagination.Last />
               </Pagination>
           </div>
        </div>
        );
    }
  }

export default SearchForm;
