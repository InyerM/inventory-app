import { Box, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AppService from "../../services/AppService";

const productsUrl = "http://localhost:3001/api/products";
const clientsUrl = "http://localhost:3001/api/clients";

const PurchaseForm = ({
  setclientId,
  setproductId,
  setpurchaseDate,
  setdiscount,
  data,
}) => {
  const [clients, setclients] = useState([]);
  const [products, setproducts] = useState([]);

  const getProducts = async () => {
    const products = await AppService.getAll(productsUrl);
    setproducts(products);
  };

  const getClients = async () => {
    try {
      const clients = await AppService.getAll(clientsUrl);
      setclients(clients);
    } catch (e) {}
  };

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  return (
    <>
      <Box>
        <FormLabel htmlFor="client">Client</FormLabel>
        <Select
          id="client"
          defaultValue={'default'}
          onChange={(e) => {
            setclientId(e.target.value);
          }}
        >
          <option value="default" disabled>Select a client...</option>
          {clients.map((i) => {
            return (
              <option value={i?.id} key={i?.id}>
                {i?.names} {i?.lastnames}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box>
        <FormLabel htmlFor="product">Product</FormLabel>
        <Select
          id="product"
          defaultValue={'default'}
          onChange={(e) => {
            setproductId(e.target.value);
          }}
        >
          <option value="default" disabled>Select a product...</option>
          {products.map((i) => {
            return <option key={i?.id} value={i?.id}>{i?.name}</option>;
          })}
        </Select>
      </Box>
      <Box>
        <FormLabel htmlFor="purchaseDate">Purchase date</FormLabel>
        <Input
          id="purchaseDate"
          type="date"
          placeholder="Please enter a purchase date"
          defaultValue={data?.purchaseDate}
          onChange={(e) => {
            setpurchaseDate(e.target.value);
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="discount">Discount</FormLabel>
        <Input
          id="discount"
          type='number'
          placeholder="Please enter a discount"
          defaultValue={data?.discount}
          onChange={(e) => {
            setdiscount(e.target.value);
          }}
        />
      </Box>
    </>
  );
};

export default PurchaseForm;
