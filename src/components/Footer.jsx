import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer>
            <Link to="/completed">Completed Tasks</Link>
            <p>Copyright &copy; 2021</p>
            <Link to="/about">About</Link>
        </footer>
    )
}


export default Footer