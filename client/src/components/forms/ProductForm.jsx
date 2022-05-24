import { Box, FormLabel, Input, Textarea } from "@chakra-ui/react";
import React from "react";

const ProductForm = ({setname, setdescription, setsalesValue, setpurchaseValue, setstocks, settype, data}) => {
  return (
    <>
      <Box>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Please enter a name"
          defaultValue={data?.name}
          onChange={(e) => {
            setname(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          placeholder="Please enter a description"
          defaultValue={data?.description}
          onChange={(e) => {
            setdescription(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="purchaseValue">Purchase value</FormLabel>
        <Input
          id="purchaseValue"
          type='number'
          step={0.1}
          placeholder="Please enter a purchaseValue"
          defaultValue={data?.purchaseValue}
          onChange={(e) => {
            setpurchaseValue(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="salesValue">Sales value</FormLabel>
        <Input
          id="salesValue"
          placeholder="Please enter a salesValue"
          type='number'
          step={0.1}
          defaultValue={data?.salesValue}
          onChange={(e) => {
            setsalesValue(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="stocks">Stocks</FormLabel>
        <Input
          id="stocks"
          placeholder="Please enter a stocks"
          type='number'
          defaultValue={data?.stocks}
          onChange={(e) => {
            setstocks(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="type">Type</FormLabel>
        <Input
          id="type"
          placeholder="Please enter a type"
          defaultValue={data?.type}
          onChange={(e) => {
            settype(e.target.value)
          }}
        />
      </Box>
    </>
  );
};

export default ProductForm;
