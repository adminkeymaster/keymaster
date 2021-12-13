//Next, React (core node_modules) imports must be placed here
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./User.module.scss";

const UserPage = (props) => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    message: '',
    status: '',
  });
  const [isFetched, setIsFetched] = useState(false);
  const { data: session, status } = useSession();
  const _id = session?.user._id;
  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: '',
    phoneNumber: '',
    password: '',
    // photoLink: null,
  });
  useEffect(() => {
    if (!_id) {
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/user/${_id}`, { signal: controller.signal })
      .then(({ data }) => {
        setFormData({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
        });
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("/dashboard/user/[id] fetch aborted", err);
      });

    return () => controller.abort();
  }, [_id]);
  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      setNotification({
        message: '',
        success: false,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`/api/user/${session.user._id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          router.push(
            {
              pathname: "/profile/user",
              query: {
                message: "Мэдээлэл амжилттай засагдлаа",
                success: true,
              },
            },
            "/profile/user"
          );
        }
      })
      .catch((err) => {
        setNotification({
          message: "Мэдээлэл засахад алдаа гарлаа",
          success: false,
        });
        console.log("Edit UserInfo handleSubmit", err);
      });
  };
  return (
    <main className={styles.container}>
      <h2>Хэрэглэгчийн мэдээлэл</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputFileSend}
          type="file"
          name="photoUpload"
          id="photoUpload"
          accept="image/png, image/jpeg"
        />        
        <input type="text" id="firstName" name="firstName" onChange={handleInputFormData} defaultValue={formData.firstName} required/>
        <input type="text" id="lastName" name="lastName" onChange={handleInputFormData} defaultValue={formData.lastName} required />
        <input type="email" id="email" name="email" onChange={handleInputFormData} defaultValue={formData.email} required />
        <input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleInputFormData} defaultValue={formData.phoneNumber} required/>
        <input type="password" id="password" onChange={handleInputFormData} name="password" placeholder="Password" required />
        <input type="password" id="passwordconfirm" name="passwordconfirm" placeholder="Confirm Password" required />
        <button type="submit">Мэдээлэл солих</button>
      </form>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </main>
  );
};

UserPage.Layout = DashboardLayout;

export default UserPage;
