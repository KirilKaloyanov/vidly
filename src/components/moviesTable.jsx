import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Table from './common/table'; 
import Like from "./common/like";

class MoviesTable extends Component {
    columns = [
        { key: 'title', path: 'title', label: 'Title', content: movie => ( <Link 
            to={`/movies/${movie._id}`}>{movie.title}</Link>)},
        { key: 'genre', path: 'genre.name', label: 'Genre'},
        { key: 'stock', path: 'numberInStock', label: 'Stock'},
        { key: 'rate', path: 'dailyRentalRate', label: 'Rate'},
        { key: 'like', content: movie => ( <Like 
            liked={movie.liked} 
            onLike={() => this.props.onLike(movie)}/>)}
    ];

    theDeleteColumn = { 
        key: 'delete', content: movie => ( <button 
        onClick={() => this.props.onDelete(movie)} 
        className="btn btn-danger btn-sm">Delete</button>)
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.theDeleteColumn);
    }

    render() {  
        const { movies, sortColumn, onSort} = this.props; 
        
            return ( 
                <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort}/>
            );
        }
        
    }
 
export default MoviesTable;