import { Box, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const ClientForm = ({setnames, setlastnames, setphone, setaddress, data}) => {
  return (
    <>
      <Box>
        <FormLabel htmlFor="names">Names</FormLabel>
        <Input
          id="names"
          placeholder="Please enter a names"
          defaultValue={data?.names}
          onChange={(e) => {
            setnames(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="lastnames">Lastnames</FormLabel>
        <Input
          id="lastnames"
          placeholder="Please enter a lastnames"
          defaultValue={data?.lastnames}
          onChange={(e) => {
            setlastnames(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          id="address"
          placeholder="Please enter a address"
          defaultValue={data?.address}
          onChange={(e) => {
            setaddress(e.target.value)
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          id="phone"
          placeholder="Please enter a phone"
          defaultValue={data?.phone}
          onChange={(e) => {
            setphone(e.target.value)
          }}
        />
      </Box>
    </>
  );
};

export default ClientForm;
