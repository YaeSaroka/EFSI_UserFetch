import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './userlist.css';


const UsersList = () => {
    const urlApi = "https://randomuser.me/api/?results=5";
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
  
    useEffect(() => {
      fetch(urlApi)
        .then((response) => response.json())
        .then((data) => setUsers(data.results))
        .catch((error) => console.log("Hubo un error " + error));
    }, []);
  
    /*FUNCIONES PARA EL MODAL*/
    const openModal = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    /**/
  
    return (
      <div>
        <h1>Listado: </h1>
        
          {users.map((user, index) => (
            <>
            <div id="Personas">
                <img src={user.picture.medium} alt="fotito de perfil"></img>
                <h1>{user.name.first}</h1>
                <Button onClick={() => openModal(user)}>Click</Button>
            </div>
            </>
          ))}
       
  
        {selectedUser && (
          <ModalFuncion
            user={selectedUser}
            showModal={showModal}
            closeModal={closeModal}
          />
        )}
      </div>
    );
  };
  
  function ModalFuncion({ user, showModal, closeModal }) {
    return (
      <div>
        {showModal && (
          <div className="modal show" style={{ display: "block" }}>
            <Modal.Dialog>
              <Modal.Header closeButton onClick={closeModal}>
                <Modal.Title>Más información</Modal.Title>
              </Modal.Header>
  
              <Modal.Body>
                <h1>{user.name.first}</h1>
                <h5>{user.dob.age}</h5>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </Modal.Body>
  
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )}
      </div>
    );
  }
  
  export default UsersList;
  