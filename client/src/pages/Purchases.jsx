import React, { useEffect, useRef, useState } from "react";
import AppService from "../services/AppService";
import { Button } from "@chakra-ui/react";
import Table from "../components/Table";
import Loader from "../components/Loader";
import PurchaseForm from "../components/forms/PurchaseForm";
import Drawer from "../components/chakra/Drawer";
import Modal from "./../components/chakra/Modal";

const purchasesUrl = "http://localhost:3001/api/allPurchases";
const purchasesurl = "http://localhost:3001/api/purchases";
const fullPurchaseUrl = "http://localhost:3001/api/showPurchase";

const Purchases = () => {
  const [purchases, setpurchases] = useState([]);

  const [clientId, setclientId] = useState();
  const [productId, setproductId] = useState();
  const [purchaseDate, setpurchaseDate] = useState();
  const [discount, setdiscount] = useState();
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
  let total = 0;

  const reloadStates = () => {
    setclientId("");
    setproductId("");
    setpurchaseDate("");
    setdiscount("");
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

  const editPurchase = async (data, id_) => {
    try {
      await AppService.modify(data, purchasesurl, id_);
      setModalContent(
        undefined,
        "Purchase edited",
        <p>Purchase edited successfully</p>,
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
    const purchase_ = await getPurchase(id_);
    setclientId(purchase_?.clientId);
    setproductId(purchase_?.productId);
    setpurchaseDate(purchase_?.purchaseDate);
    setdiscount(purchase_?.discount);
    setid(id_);

    setDrawerContent(
      () => editPurchase,
      "Edit purchase",
      <PurchaseForm
        setclientId={setclientId}
        setproductId={setproductId}
        setpurchaseDate={setpurchaseDate}
        setdiscount={setdiscount}
        data={purchase_}
      />
    );
  };

  const delPurchase = async (id_) => {
    try {
      await AppService.remove(purchasesurl, id_);
      setModalContent(
        undefined,
        "Purchase removed",
        <p>Purchase removed successfully</p>,
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
      delPurchase,
      "Delete purchase",
      <p>Are you sure that you want to delete this purchase?</p>,
      true
    );
  };

  const addPurchase = async (data) => {
    try {
      await AppService.createNew(data, purchasesurl);
      setModalContent(
        undefined,
        "Purchase added",
        <p>New purchase added successfully</p>,
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
      () => addPurchase,
      "Add new purchase",
      <PurchaseForm
        setclientId={setclientId}
        setproductId={setproductId}
        setpurchaseDate={setpurchaseDate}
        setdiscount={setdiscount}
      />
    );
  };

  const getPurchase = async (id_) => {
    try {
      const purchase = await AppService.getOne(fullPurchaseUrl, id_);
      return purchase;
    } catch (e) {}
  };

  const handleReload = () => {
    setReloaded(!reloaded);
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
      reloadStates();
    }, 2000);
  };

  const getPurchases = async () => {
    const purchases = await AppService.getAll(purchasesUrl);
    setpurchases(purchases);
  };

  useEffect(() => {
    getPurchases();
  }, [reloaded]);

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Table title="Purchases" add={add} handleReload={handleReload}>
            {reloading ? (
              <Loader className="mt-5" />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Lastnames</th>
                    <th>Phone</th>
                    <th>Product</th>
                    <th>Purchased at</th>
                    <th>Discount</th>
                    <th>Final value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((i) => {
                    cont++;
                    const discount =
                      i?.discount *
                      Math.pow(10, -parseInt(String(i?.discount).length));
                    const discountedValue =
                      parseInt(i?.product.salesValue) * discount;
                    const value =
                      parseInt(i?.product.salesValue) - discountedValue;
                    total += value;
                    return (
                      <tr key={i?.id} id={i?.id}>
                        <td>{i?.id}</td>
                        <td>{i?.client.names}</td>
                        <td>{i?.client.lastnames}</td>
                        <td>{i?.client.phone}</td>
                        <td>{i?.product.name}</td>
                        <td>{String(i?.purchaseDate).slice(0, 10)}</td>
                        <td>{i?.discount}%</td>
                        <td>$ {value}</td>
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
                  <tr>
                    <td></td>
                    <th>Total</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th>$ {total}</th>
                    <td></td>
                  </tr>
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
        data={{ clientId, productId, purchaseDate, discount }}
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

export default Purchases;
