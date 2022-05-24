import React, { useEffect, useRef, useState } from "react";
import AppService from "../services/AppService";
import { Button } from "@chakra-ui/react";
import Table from "../components/Table";
import Loader from "../components/Loader";
import UserForm from "../components/forms/UserForm";
import Drawer from "../components/chakra/Drawer";
import Modal from "./../components/chakra/Modal";

const usersUrl = "http://localhost:3001/api/users";

const Users = () => {
  const [users, setusers] = useState([]);

  const [names, setnames] = useState();
  const [lastnames, setlastnames] = useState();
  const [role, setrole] = useState();
  const [username, setusername] = useState();
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
    setnames("");
    setlastnames("");
    setrole("");
    setusername("");
    setphone("");
  };

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

  const editUser = async (data, id_) => {
    try {
      await AppService.modify(data, usersUrl, id_);
      setModalContent(
        undefined,
        "User edited",
        <p>User edited successfully</p>,
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
    const user_ = await getUser(id_);
    setnames(user_?.names);
    setlastnames(user_?.lastnames);
    setrole(user_?.role);
    setusername(user_?.username);
    setphone(user_?.phone);
    setid(id_);

    setDrawerContent(
      () => editUser,
      "Edit user",
      <UserForm
        setnames={setnames}
        setlastnames={setlastnames}
        setrole={setrole}
        setusername={setusername}
        setphone={setphone}
        data={user_}
      />
    );
  };

  const delUser = async (id_) => {
    try {
      await AppService.remove(usersUrl, id_);
      setModalContent(
        undefined,
        "User removed",
        <p>User removed successfully</p>,
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
      delUser,
      "Delete user",
      <p>Are you sure that you want to delete this user?</p>,
      true
    );
  };

  const addUser = async (data) => {
    try {
      await AppService.createNew(data, usersUrl);
      setModalContent(
        undefined,
        "User added",
        <p>New user added successfully</p>,
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
    setDrawerContent(
      () => addUser,
      "Add new user",
      <UserForm
        setnames={setnames}
        setlastnames={setlastnames}
        setrole={setrole}
        setusername={setusername}
        setphone={setphone}
      />
    );
  };

  const getUser = async (id_) => {
    try {
      const { user } = await AppService.getOne(usersUrl, id_);
      return user;
    } catch (e) {}
  };

  const getUsers = async () => {
    const users = await AppService.getAll(usersUrl);
    setusers(users);
  };

  const handleReload = () => {
    setReloaded(!reloaded);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
      reloadStates();
    }, 2000);
  };

  useEffect(() => {
    getUsers();
  }, [reloaded]);

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Table title="Users" add={add} handleReload={handleReload}>
            {reloading ? (
              <Loader className='m-5'/>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Names</th>
                    <th>Lastnames</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((i) => {
                    cont++;
                    return (
                      <tr key={i?.id} id={i?.id}>
                        <td>{cont}</td>
                        <td>{i?.names}</td>
                        <td>{i?.lastnames}</td>
                        <td>{i?.username}</td>
                        <td>{i?.phone}</td>
                        <td>{i?.role}</td>
                        <td
                          style={{ listStyle: "none" }}
                          className="mt-3 mb-3 d-flex justify-content-center"
                        >
                          <Button
                            colorScheme="facebook"
                            variant="solid"
                            onClick={edit}
                          >
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
                        </td>
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
        data={{ names, lastnames, role, username, phone }}
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

export default Users;
