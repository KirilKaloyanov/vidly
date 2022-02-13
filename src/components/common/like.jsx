const Like = (props) => {
        let classes = "fa fa-heart";
        if (!props.liked) classes += '-o';
    
        return ( <i 
                style={{ cursor: "pointer"}} 
                className={classes} aria-hidden="true"
                onClick={() => props.onLike(props.movie)} 
                ></i> );
}
  
export default Like;