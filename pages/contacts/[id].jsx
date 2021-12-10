import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ContactPage = (props) => {
  const [isFetched, setIsFetched] = useState(false);
  const [contact, setContact] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/contact/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setContact(data.data);
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/contacts/[id] fetch aborted", err);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <main>
      This is Contact Page
      <div>{contact?.title}</div>
      <div>{contact?.description}</div>
      <div>{contact?.email}</div>
      <div>{contact?.name}</div>
      <div>{contact?.phoneNumber}</div>
    </main>
  );
};

export default ContactPage;
