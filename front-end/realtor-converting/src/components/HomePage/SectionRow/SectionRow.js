import PropTypes from 'prop-types';
import "./SectionRow.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row} from 'react-bootstrap';
import CardsContainer from "../../CardPost/CardsContainer/CardsContainer";

function SectionRow(props) {

    const {sections, onTodoClick} = props;

    return (
        <Container className='mb-5 mt-5'>
            <div className='mb-5'>
                {sections.map((title) => (
                    <Row key={title.id} className='mt-4 mb-3'>
                        <div className='row-title'>{title.title}</div>
                        <a href={title.link}>View all recommended house in Bao Loc</a>
                        <CardsContainer apiUrl={title.apiUrl}/>
                    </Row>
                ))}
            </div>
        </Container>
    );
}

export default SectionRow;
