import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from './../services/movieService';



class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}  
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Numbers in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404 ) 
                this.props.history.replace('/not-found');
            }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genre: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {

        await saveMovie(this.state.data);
        window.location = '/';
    };

    render() { 
        return <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.doSubmit}>
                {this.renderInput("title", "Title")}
                {this.renderSelect("genre", "Genre", this.state.genres)}
                {this.renderInput('numberInStock', "Number In Stock", "number")}
                {this.renderInput("dailyRentalRate", "Daily Rental Rate")   }
                {this.renderButton("Save")}
            </form>
        </div>
    }
}

// const MovieForm = ({ match, history }) => {
//     return ( 
//         <div>
//             <h1>Movie Form {match.params.id} </h1>
//             <button className='btn btn-primary' onClick={() => history.push('/movies')}>Save</button>
//         </div>
//     );
//}
 
export default MovieForm;   