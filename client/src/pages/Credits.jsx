import React, { useEffect, useRef, useState } from "react";
import AppService from "../services/AppService";
import { Button } from "@chakra-ui/react";
import Table from "../components/Table";
import Loader from "../components/Loader";
import creditForm from "../components/forms/creditForm";
import Drawer from "../components/chakra/Drawer";
import Modal from "./../components/chakra/Modal";
import CreditForm from "../components/forms/creditForm";

const creditsUrl = "http://localhost:3001/api/allCredits";
const creditsurl = "http://localhost:3001/api/credits";

const Credits = () => {
  const [credits, setcredits] = useState([]);

  const [purchaseId, setpurchaseId] = useState();
  const [debt, setdebt] = useState();
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
    setclientId("");
    setcreditId("");
    setpurchaseId("");
    setdebt("");
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

  const editCredit = async (data, id_) => {
    try {
      await AppService.modify(data, creditsurl, id_);
      setModalContent(
        undefined,
        "Credit edited",
        <p>Credit edited successfully</p>,
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
    const credit_ = await getCredit(id_);
    setclientId(credit_?.clientId);
    setproductId(credit_?.productId);
    setpurchaseId(credit_?.purchaseId);
    setdebt(credit_?.debt);
    setid(id_);

    setDrawerContent(
      () => editCredit,
      "Edit credit",
      <CreditForm
        setdebt={setdebt}
        setpurchaseId={setpurchaseId}
        data={credit_}
      />
    );
  };

  const delCredit = async (id_) => {
    try {
      await AppService.remove(creditsurl, id_);
      setModalContent(
        undefined,
        "Credit removed",
        <p>Credit removed successfully</p>,
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
      delCredit,
      "Delete credit",
      <p>Are you sure that you want to delete this credit?</p>,
      true
    );
  };

  const addCredit = async (data) => {
    try {
      await AppService.createNew(data, creditsurl);
      setModalContent(
        undefined,
        "Credit added",
        <p>New credit added successfully</p>,
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
      () => addCredit,
      "Add new credit",
      <CreditForm
        setdebt={setdebt}
        setpurchaseId={setpurchaseId}
      />
    );
  };

  const getCredit = async (id_) => {
    try {
      const { credit } = await AppService.getOne(creditsurl, id_);
      return credit;
    } catch (e) {}
  };

  const getCredits = async () => {
    const credits = await AppService.getAll(creditsUrl);
    setcredits(credits);
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
    getCredits();
  }, [reloaded]);

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Table title="Credits" add={add} handleReload={handleReload}>
            {reloading ? (
              <Loader className="m-5" />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Phone</th>
                    <th>Product</th>
                    <th>Discount</th>
                    <th>Value</th>
                    <th>Debt</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.map((i) => {
                    cont++;
                    const discount =
                      i?.discount *
                      Math.pow(10, - parseInt(String(i?.discount).length));
                    const discountedValue =
                      parseInt(i?.product.salesValue) * discount;
                    const value =
                      parseInt(i?.product.salesValue) - discountedValue;
                    return (
                      <tr key={i?.id} id={i?.id}>
                        <td>{cont}</td>
                        <td>{i?.client.names}</td>
                        <td>{i?.client.phone}</td>
                        <td>{i?.product.name}</td>
                        <td>{i?.discount}%</td>
                        <td>$ {value}</td>
                        <td>{i?.credit.debt}</td>
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
        data={{ purchaseId, debt }}
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

export default Credits;
