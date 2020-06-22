import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | 
            <a href="#" onClick={() => {props.deleteExercises(props.exercise._id) }}>Delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props){
        super(props);

        this.deleteExercises = this.deleteExercises.bind(this);

        this.state={exercises: []};
    }

    componentDidMount(){
        axios.get("http://localhost:5000/exercises/list")
            .then(response => {
                this.setState({ exercises: response.data})
            })
            .catch((error) =>{
            console.log(error);
            })
    }

    deleteExercises(id){
        axios.delete("http://localhost:5000/exercises/"+id)
            .then (res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} 
                    deleteExercises={this.deleteExercises} 
                    key={currentexercise._id}/>;
        })
    }
    render (){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration (in Minutes)</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}