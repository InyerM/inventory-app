import { Box, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

const UserForm = ({
  setnames,
  setlastnames,
  setphone,
  setusername,
  setrole,
  setpassword,
  data,
}) => {
  return (
    <>
      <Box>
        <FormLabel htmlFor="names">Names</FormLabel>
        <Input
          id="names"
          placeholder="Please enter a names"
          defaultValue={data?.names}
          onChange={(e) => {
            setnames(e.target.value);
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
            setlastnames(e.target.value);
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
            setphone(e.target.value);
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Please enter a username"
          defaultValue={data?.username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="role">Role</FormLabel>
        <Select id="role" defaultValue={data?.role} onChange={(e) => {
            setrole(e.target.value);
          }}>
          <option value="default">Select a role ...</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
      </Box>
    </>
  );
};

export default UserForm;
