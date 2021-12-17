import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Timer } from "styled-icons/boxicons-regular";
import LandingLayout from "@/layouts/Landing";
import Header from "@/views/Products/Header";
import styles from "./Users.module.scss";

import DropDownDiv from "@/components/DropDownDiv";

const StyledTimer = styled(Timer)`
  width: 2rem;
  height: 2rem;
`;

const UserPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/user/${id}`).then(({ data }) => {
      console.log(data.data);
      setUserData(data.data);
      setIsFetched(true);
    });
  }, [id]);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <main className={styles.container}>
      <Header />
      {isFetched && (
        <>
          <div className={styles.userHeading}>
            <div className={styles.userProfile}>
              <div className={styles.userImage}>
                <Image
                  src={userData.photoLink}
                  layout="fill"
                  objectFit="contain"
                  alt="User Profile"
                />
              </div>
            </div>
            <h2 className={styles.name}>
              {userData.lastName} {userData.firstName}
            </h2>
            <p className={styles.age}>
              Нас: {calculateAge(userData.birthDate)}
            </p>
          </div>
          <div className={styles.recordHistory}>
            <div className={styles.recordHeading}>Миний Түүх</div>
            <div className={styles.records}>
              {(userData.record.length > 0 &&
                userData.record.map((r) => {
                  return (
                    <div className={styles.recordContent} key={r._id}>
                      <div className={styles.recordType}>{r.keymasterType}</div>
                      <div className={styles.recordTime}>
                        <StyledTimer /> {r.time} секунд
                      </div>
                    </div>
                  );
                })) || (
                <>
                  <div className={styles.recordContent}>
                    <div className={styles.recordType}>-</div>
                    <div className={styles.recordTime}>
                      <StyledTimer /> - секунд
                    </div>
                  </div>
                  <div className={styles.recordContent}>
                    <div className={styles.recordType}>-</div>
                    <div className={styles.recordTime}>
                      <StyledTimer /> - секунд
                    </div>
                  </div>
                  <div className={styles.recordContent}>
                    <div className={styles.recordType}>-</div>
                    <div className={styles.recordTime}>
                      <StyledTimer /> - секунд
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.compHistory}>
            <div className={styles.recordHeading}>
              Миний оролцсон тэмцээнүүд
            </div>
            {userData.lastComp.length > 0 && (
              <div className={styles.compList}>
                {userData.lastComp.map((competition) => {
                  return (
                    <DropDownDiv
                      className={styles.comp}
                      key={competition._id}
                      as={
                        <div style={{ display: "flex", width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            {competition.compName}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            {competition.ageGroup}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          >
                            {competition.type}
                          </div>
                        </div>
                      }
                    >
                      <div className={styles.records}>
                        {competition.record.length > 0 &&
                          competition.record.map((r) => {
                            return (
                              <div className={styles.recordContent}>
                                <div className={styles.recordType}>
                                  {r.keymasterType}
                                </div>
                                <div className={styles.recordTime}>
                                  <StyledTimer /> {r.time} секунд
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </DropDownDiv>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

UserPage.Layout = LandingLayout;

export default UserPage;
