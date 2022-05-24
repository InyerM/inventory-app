import { Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import Drawer from "../components/chakra/Drawer";
import AppService from "../services/AppService";
import ClientForm from "../components/forms/ClientForm";
import Modal from "./../components/chakra/Modal";
import Loader from "./../components/Loader";

const clientsUrl = "http://localhost:3001/api/clients";

const Clients = () => {
  const [clients, setclients] = useState([]);

  const [names, setnames] = useState();
  const [lastnames, setlastnames] = useState();
  const [address, setaddress] = useState();
  const [phone, setphone] = useState();
  const [title, settitle] = useState();
  const [content, setcontent] = useState();
  const [modaltitle, setmodaltitle] = useState();
  const [modalcontent, setmodalcontent] = useState();
  const [action, setaction] = useState();
  const [modalaction, setmodalaction] = useState();
  const [id, setid] = useState();
  const [canceloption, setcanceloption] = useState();
  const [reloading, setReloading] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const drawerRef = useRef();
  const modalRef = useRef();

  let cont = 0;


  const reloadStates = () => {
    setnames('')
    setlastnames('')
    setphone('')
    setaddress('')
  }

  const setModalContent = (action_, title_, content_, canceloption_) => {
    action_ ? setmodalaction(() => action_) : setmodalaction(() => {});
    setmodaltitle(title_);
    setmodalcontent(content_);
    setcanceloption(canceloption_);
    modalRef.current();
  };

  const setDrawerContent = (action_, title_, content_) => {
    setaction(action_);
    settitle(title_);
    setcontent(content_);
    drawerRef.current();
  };

  const editClient = async (data, id_) => {
    try {
      await AppService.modify(data, clientsUrl, id_);
      setModalContent(
        undefined,
        "Client edited",
        <p>Client edited successfully</p>,
        false
      );
      handleReload();
    } catch (e) {
      setModalContent(
        undefined,
        "Error",
        <p>There was an error, try again</p>,
        false
      );
    }
  };

  const edit = async (e) => {
    const id_ = e.currentTarget.parentNode.parentNode.id;
    const client_ = await getClient(id_)
    setnames(client_?.names)
    setlastnames(client_?.lastnames)
    setphone(client_?.phone)
    setaddress(client_?.address)
    setid(id_);
    
    setDrawerContent(() => editClient, 'Edit client', 
    <ClientForm
        setnames={setnames}
        setlastnames={setlastnames}
        setphone={setphone}
        setaddress={setaddress}
        data={client_}
      />)
  };

  const delClient = async (id_) => {
    try {
      await AppService.remove(clientsUrl, id_);
      setModalContent(
        undefined,
        "Client removed",
        <p>Client removed successfully</p>,
        false
      );
      handleReload();
    } catch (e) {
      setModalContent(
        undefined,
        "Error",
        <p>There was an error, try again</p>,
        false
      );
    }
  };

  const del = (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    setid(id);
    setModalContent(
      delClient,
      "Delete client",
      <p>Are you sure that you want to delete this client?</p>,
      true
    );
  };

  const addClient = async (data) => {
    try {
      await AppService.createNew(
        data,
        clientsUrl
      );
      setModalContent(
        undefined,
        "Client added",
        <p>New client added successfully</p>,
        false
      );
      handleReload();
    } catch (e) {
      setModalContent(
        undefined,
        "Error",
        <p>There was an error, try again</p>,
        false
      );
    }
  };

  const add = () => {
    setDrawerContent(() => addClient, "Add new client",
    <ClientForm
        setnames={setnames}
        setlastnames={setlastnames}
        setphone={setphone}
        setaddress={setaddress}
      />)
  };

  const getClient = async (id_) => {
    try {
      const {client} = await AppService.getOne(clientsUrl, id_);
      return client
    } catch (e) {}
  };

  const getClients = async () => {
    try {
      const clients = await AppService.getAll(clientsUrl);
      setclients(clients);
    } catch (e) {}
  };

  const handleReload = () => {
    setReloaded(!reloaded);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
      reloadStates()
    }, 2000);
  };

  useEffect(() => {
    getClients();
  }, [reloaded]);

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Table title="Clients" add={add} handleReload={handleReload}>
            {reloading ? (
              <Loader className='m-5'/>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Names</th>
                    <th>Lastnames</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((i) => {
                    cont++;
                    return (
                      <tr key={i?.id} id={i?.id}>
                        <td>{cont}</td>
                        <td>{i?.names}</td>
                        <td>{i?.lastnames}</td>
                        <td>{i?.address}</td>
                        <td>{i?.phone}</td>
                        <div
                          style={{ listStyle: "none" }}
                          className="mt-3 mb-3 d-flex justify-content-center"
                        >
                          <Button colorScheme="facebook" variant="solid" onClick={edit}>
                            <i className="uil uil-edit"></i>
                          </Button>
                          <Button
                            colorScheme="red"
                            variant="solid"
                            className="ms-3"
                            onClick={del}
                          >
                            <i className="uil uil-trash"></i>
                          </Button>
                        </div>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Table>
        </section>
      </main>
      <Drawer
        title={title}
        submit={action}
        ref={drawerRef}
        data={{names, lastnames, phone, address}}
        id={id}
      >
        {content}
      </Drawer>
      <Modal
        title={modaltitle}
        ref={modalRef}
        action={modalaction}
        cancelOption={canceloption}
        id={id}
      >
        {modalcontent}
      </Modal>
    </div>
  );
};

export default Clients;
