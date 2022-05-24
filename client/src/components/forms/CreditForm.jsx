import { Box, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AppService from "../../services/AppService";

const CreditForm = ({
  setdebt,
  setpurchaseId,
  data,
}) => {

  return (
    <>
      <Box>
        <FormLabel htmlFor="purchaseId">Purchase id</FormLabel>
        <Input
          id="purchaseId"
          type="number"
          placeholder="Please enter a purchase id"
          defaultValue={data?.purchaseId}
          onChange={(e) => {
            setpurchaseId(e.target.value);
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="debt">Debt</FormLabel>
        <Input
          id="debt"
          placeholder="Please enter a debt"
          defaultValue={data?.debt}
          onChange={(e) => {
            setdebt(e.target.value);
          }}
        />
      </Box>
    </>
  );
};

export default CreditForm;