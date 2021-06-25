import React, {Component} from 'react';
import {Col, Form, Button, Badge, Table} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import { Ranking_URL } from "../constants";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Ranking extends Component{

    state = {
        city: "",
        final_city: "",
        data: [],
        ranges: [],
    }
    componentDidMount(){
        this.searchData();
    }

    onChange = e => {
            console.log("e.target.value =", e.target.value);
            this.setState({ [e.target.name]: e.target.value });
    };

    round = val => {
        if(val === null){
            return val
        }
        else{
            return val.toFixed(2);
        }
    }

    searchData = () => {
        //e.preventDefault();
        this.setState({final_city: this.state.city})
        axios.get(Ranking_URL +"/?city=" + this.state.city).
        then( res => {
            this.setState({ 
                data: res.data.agg,
                ranges: res.data.ranges
            });
        }).then(console.log(this.state.data))

    };

    getCity(t){
        if(t === ""){
            return "All Data";
        }
        else{
            return t;
        }
    }

    deleteCompanyData = () =>{
        this.setState({deleted : true});
    }

    render() {
    		const options = {
                animationEnabled: true,
                theme: "light1", // "light1", "light2", "dark1", "dark2"
                title: {
                    text: "Average Salary Ranking of " + this.getCity(this.state.final_city)
                },
                axisY: {
                    title: "",
                    suffix: "$"
                },
                axisX: {
                    title: "Companies"
                },
                data: [{
                    type: "column",
                    yValueFormatString: "#,##0.0#\"$\"",
                    dataPoints: this.state.data.slice(0,10)
                }]
            }

            const pie_options = {
                theme: "light1", // "light1", "light2", "dark1", "dark2"
                //exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Percentage of Salary in " + this.getCity(this.state.final_city)
                },
                data: [{
                    type: "pie",
                    startAngle: -90,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: this.state.ranges
                }]
            }

    		if(this.state.deleted){
    		    return(<p></p>);

    		}
    		return (

    		<Card border="dark" className="m-5">
                <Card.Body>

                    <div>
                        		<Button variant="danger" style={{ float: "right"}} onClick={this.deleteCompanyData}>X</Button>
                        		<div className="center_comp mb-5">
                        		    <Form>
                                      <Form.Row className="align-items-center">
                                        <Col sm={8} className="my-1">
                                          <Form.Control onChange={this.onChange}  type="text" name="city" placeholder="Enter Company Name" />
                                        </Col>
                                        <Col xs="auto" className="my-1">
                                            <Button onClick={this.searchData}>Search</Button>
                                        </Col>
                                      </Form.Row>
                                    </Form>
                        		</div>
                        		<CanvasJSChart options = {options}/>
                                <p></p>
                                <CanvasJSChart options = {pie_options} />
                    </div>

                </Card.Body>
           </Card>




    		);
    	}
}

export default Ranking;