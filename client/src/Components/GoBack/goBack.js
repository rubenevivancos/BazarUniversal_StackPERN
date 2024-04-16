import { useNavigate   } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';


export default function GoBack() {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Retrocede una página en el historial
    };

    return(
        <div className="text-start">
            <Button 
                variant="outline-secondary" 
                className="p-0 border-0"
                size="xs" 
                onClick={goBack}>
                    <BiArrowBack />Volver
            </Button>
        </div>
    )
}