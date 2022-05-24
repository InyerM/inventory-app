import React, { useEffect, useRef, useState } from "react";
import AppService from "../services/AppService";
import { Button } from "@chakra-ui/react";
import Table from "../components/Table";
import Loader from "../components/Loader";
import ProductForm from "../components/forms/ProductForm";
import Drawer from "../components/chakra/Drawer";
import Modal from "./../components/chakra/Modal";

const productsUrl = "http://localhost:3001/api/products";

const Products = () => {
  const [products, setproducts] = useState([]);

  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [purchaseValue, setpurchaseValue] = useState();
  const [salesValue, setsalesValue] = useState();
  const [stocks, setstocks] = useState();
  const [type, settype] = useState();
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
    setname("");
    setdescription("");
    setpurchaseValue("");
    setsalesValue("");
    setstocks("");
    settype("");
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

  const editProduct = async (data, id_) => {
    try {
      await AppService.modify(data, productsUrl, id_);
      setModalContent(
        undefined,
        "Product edited",
        <p>Product edited successfully</p>,
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
    const product_ = await getProduct(id_);
    setname(product_?.names);
    setdescription(product_?.description);
    setpurchaseValue(product_?.purchaseValue);
    setsalesValue(product_?.salesValue);
    setstocks(product_?.stocks);
    settype(product_?.type);
    setid(id_);

    setDrawerContent(
      () => editProduct,
      "Edit product",
      <ProductForm
        setname={setname}
        setdescription={setdescription}
        setpurchaseValue={setpurchaseValue}
        setsalesValue={setsalesValue}
        setstocks={setstocks}
        settype={settype}
        data={product_}
      />
    );
  };

  const delProduct = async (id_) => {
    try {
      await AppService.remove(productsUrl, id_);
      setModalContent(
        undefined,
        "Product removed",
        <p>Product removed successfully</p>,
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
      delProduct,
      "Delete product",
      <p>Are you sure that you want to delete this product?</p>,
      true
    );
  };

  const addProduct = async (data) => {
    try {
      await AppService.createNew(data, productsUrl);
      setModalContent(
        undefined,
        "Product added",
        <p>New product added successfully</p>,
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
      () => addProduct,
      "Add new product",
      <ProductForm
        setname={setname}
        setdescription={setdescription}
        setpurchaseValue={setpurchaseValue}
        setsalesValue={setsalesValue}
        setstocks={setstocks}
        settype={settype}
      />
    );
  };

  const getProduct = async (id_) => {
    try {
      const { product } = await AppService.getOne(productsUrl, id_);
      return product;
    } catch (e) {}
  };

  const getProducts = async () => {
    const products = await AppService.getAll(productsUrl);
    setproducts(products);
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
    getProducts();
  }, [reloaded]);

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Table title="Products" add={add} handleReload={handleReload}>
            {reloading ? (
              <Loader className="m-5" />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Purchase value</th>
                    <th>Value</th>
                    <th>Stocks</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((i) => {
                    cont++;
                    return (
                      <tr key={i?.id} id={i?.id}>
                        <td>{cont}</td>
                        <td>{i?.name}</td>
                        <td>{i?.description}</td>
                        <td>$ {i?.purchaseValue}</td>
                        <td>$ {i?.salesValue}</td>
                        <td>{i?.stocks} u</td>
                        <td>{i?.type}</td>
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
        data={{ name, description, salesValue, purchaseValue, stocks, type }}
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

export default Products;
