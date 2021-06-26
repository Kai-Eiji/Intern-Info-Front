import React, {Component} from 'react';
import Ranking from './Ranking';
import {Button, Card} from 'react-bootstrap';

class RankingList extends Component{

    state = {
        rankingList :[<Ranking />]
    }

    addRanking = () => {
        let newList =  this.state.rankingList.concat(<Ranking />);
        this.setState({rankingList : newList});
    }

    render(){
        return(
            <div>
                    {
                        this.state.rankingList.map( (ranking) => {
                            return <div>{ranking}</div>
                        })
                    }

                <div className="center_comp">
                    <Button className="mb-3" onClick={this.addRanking}>Add Another Ranking</Button>
                </div>

            </div>
        );
    }
}
export default RankingList;
