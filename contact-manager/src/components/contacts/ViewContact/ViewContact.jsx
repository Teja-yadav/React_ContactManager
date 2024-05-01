import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { ContactService } from "../../../services/ContactService";

let ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: "An error occured..",
        });
      }
    }

    handleResp();
  }, [contactId]);

  let { loading, contact, errorMessage, group } = state;

  return (
    <React.Fragment>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p className="fst-italic">
                Get a comprehensive overview of your contact's information at a
                glance. From essential details like name and phone number to
                additional notes and tags, everything you need to know is
                conveniently organized on this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <section className="view-contact">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={contact.photo} alt="" className="contact-img" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name : <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company :{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title : <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={"/contacts/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewContact;
