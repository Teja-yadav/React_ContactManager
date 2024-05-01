import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from "./components/contacts/AddContacts/AddContacts";
import EditContact from "./components/contacts/EditContact/EditContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import Spinner from "./components/Spinner/Spinner";
let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contacts/list"} />} />
        <Route path={"/contacts/list"} element={<ContactList />} />
        <Route path={"/contacts/add"} element={<AddContact />} />
        <Route path={"/contacts/view/:contactId"} element={<ViewContact />} />
        <Route path={"/contacts/edit/:contactId"} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
