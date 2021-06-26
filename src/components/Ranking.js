import React, {Component} from 'react';
import {Col, Form, Button, Badge, Table} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import axios from "axios";
import { Ranking_URL, ALL_City_URL } from "../constants";
import CanvasJSReact from './canvasjs.react';
import { Typeahead } from 'react-bootstrap-typeahead';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Ranking extends Component{

    state = {
        city: "",
        final_city: "",
        data: [],
        ranges: [],
        all_city: [],
        width: window.innerWidth,
    }

    handleResize = (e) => {
        this.setState({ width: window.innerWidth });
       };

    componentDidMount(){
        this.searchData();
        window.addEventListener("resize", this.handleResize);

        axios.get(ALL_City_URL)
        .then(res => {
            this.setState({all_city: res.data.all_cities}); 
        })
        
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
      } 

    onChange = e => {
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
                ranges: this.cleanRanges(res.data.ranges)
            });
        })
    };

    cleanRanges(ranges){
        let new_ranges = []
        let i = 0;
        for(i; i < ranges.length; i++){
            if(ranges[i] != null){
                new_ranges.push(ranges[i]);
            }
        }
        return new_ranges;
    }

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
            const width = this.state.width;
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
                    indexLabelFontSize: 13,
                    indexLabel: "",
                    dataPoints: this.state.ranges
                }]
            }

    		if(this.state.deleted){
    		    return(<p></p>);

    		}
    		return (

    		<Card border="dark" className={width > 500 ? "m-5" : ""}>
                <Card.Body>

                    <div>
                        <Button variant="danger" style={{ float: "right", marginTop: "5px", marginLeft: "5px"}} onClick={this.deleteCompanyData}>X</Button>
                        <div className="center_comp mb-5">
                            <Form>
                                <Form.Row className="align-items-center">
                                <Col sm={8} className="my-1">
                                    <Typeahead
                                        onChange={(selected) => {
                                            this.setState({city: selected[0]})
                                        }}
                                        options={this.state.all_city}
                                        id="basic-typeahead-single"
                                        placeholder="City Name"
                                    />
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
