import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from '../services/fakeGenreService';
import _ from "lodash";


export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: '',
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{ name: 'All Genres', _id: ''}, ...getGenres()];
        this.setState({movies: getMovies(), genres});
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState( {movies});
    };

    handlePageChange = page => {
        this.setState({ currentPage: page});
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    } 

    getPagedData = () => {
        
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;

        const filtered = selectedGenre&&selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };  
    }
 
    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (count === 0) return <p>There are no movies.</p>

        const { totalCount, data: movies } = this.getPagedData();

        return (
        <div className="row">
            <div className="col-4">
                <ListGroup	
                    items={this.state.genres} 
                    selectedItem={this.state.selectedGenre}
                    onItemsSelect={this.handleGenreSelect}/>
            </div>
            <div className="col">
                <Link 
                    to="/movies/new"
                    className='btn btn-primary'
                    style={{marginBottom: 20}}
                >New Movie
                </Link>
                <p>There are {totalCount} movies</p>
                <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}/>
                <Pagination 
                    itemsCount={totalCount} 
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
            </div>
        </div>
        )} }