import '../App.scss';
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import FooterRealtor from "../Footer/FooterRealtor";
import IndexSearch from "./SearchBanner/IndexSearch";
import SectionRow from './SectionRow/SectionRow';

function Home() {


    const [sections, setSections] = useState([
        {
            id: 1,
            title: "Recommend",
            link: "#",
            apiUrl: "https://realestate-restapi-django3.herokuapp.com/api/re-post-list-pagination/?limit=4&offset=8"
        },
        {
            id: 2,
            title: "Lastest posts",
            link: "#",
            apiUrl: "https://realestate-restapi-django3.herokuapp.com/api/re-post-list-pagination/?limit=4&offset=8"
        },
        {
            id: 3,
            title: "Upcoming",
            link: "#",
            apiUrl: "https://realestate-restapi-django3.herokuapp.com/api/re-post-list-pagination/?limit=4&offset=8"
        },
    ]);

    return (

        <div>
            <IndexSearch></IndexSearch>
            <SectionRow sections={sections}/>
        </div>
    );

}

export default Home;
