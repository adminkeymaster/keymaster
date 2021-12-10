import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const ContactsPage = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/contact", { signal: controller.signal })
      .then(({ data }) => {
        setContacts(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/contacts fetch aborted", err);
      });

    return () => controller.abort();
  }, []);

  console.log(contacts);
  return (
    <main>
      This is Contacts Page
      <div>
        <ul>
          {isFetched &&
            contacts.map((contact) => {
              return (
                <li key={contact._id}>
                  <Link href={`/contacts/${contact._id}`}>
                    <a>{contact.name}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
};

export default ContactsPage;
