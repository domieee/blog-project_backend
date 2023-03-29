import { useParams } from 'react-router-dom';
import './Blogpage.scss'

const Blogpage = () => {

    const params = useParams();
    console.log(params);
    return (
        <h1>Blogpage</h1>
    );
}

export default Blogpage;