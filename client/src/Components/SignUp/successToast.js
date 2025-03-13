import { Toast, ToastContainer } from "react-bootstrap";

const SuccessToast = ({ show, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Registro Exitoso</strong>
        </Toast.Header>
        <Toast.Body>Tu cuenta ha sido creada correctamente.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SuccessToast;
