//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./LeaderboardTable.module.scss";
import { Ussunnah } from "styled-icons/fa-brands";

const LeaderboardTable = (props, id) => {
  const [isFetched, setIsFetched] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedType, setSelectedType] = useState("Keymaster 5");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [filteredLeaderBoard, setFilteredLeaderBoard] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/user", { signal: controller.signal })
      .then(({ data }) => {
        if (!data.msg) {
          setLeaderboard(data.data);
        }

        setIsFetched(true);
      })
      .catch((err) => {
        console.log("Leaderboard Fetch Aborted", err);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const typeFilteredLeaderBoard = leaderboard.map((user) => {
      const getTimeByType = (record) => {
        let time;
        record.forEach((r) => {
          if (r.keymasterType === selectedType) {
            time = r.time;
          }
        });

        return time;
      };

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

      const newUser = {
        _id: user._id,
        name: `${user.lastName} ${user.firstName}`,
        // gender: user.gender,
        gender: user.gender === "male" ? "Эр" : "Эм",
        photoLink: user.photoLink,
        age: calculateAge(user.birthDate),
        // time: getTimeByType(user.record),
        time: Math.floor(Math.random() * 40 + 2),
      };

      return newUser;
    });

    typeFilteredLeaderBoard.sort((a, b) => {
      return a.time - b.time;
    });

    if (selectedAgeGroup.length === 0 && search.length === 0) {
      setFilteredLeaderBoard(typeFilteredLeaderBoard);
      return;
    } else if (selectedAgeGroup.length === 0 && search.length > 0) {
      const searchFilteredLeaderBoard = typeFilteredLeaderBoard.filter(
        (user) => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        }
      );

      setFilteredLeaderBoard(searchFilteredLeaderBoard);
      return;
    } else if (selectedAgeGroup.length > 0 && search.length === 0) {
      const ageFilteredLeaderBoard = typeFilteredLeaderBoard.filter((user) => {
        if (
          user.age >= +selectedAgeGroup[0] &&
          user.age <= +selectedAgeGroup[1]
        ) {
          return user;
        }
      });

      setFilteredLeaderBoard(ageFilteredLeaderBoard);
      return;
    } else {
      const ageFilteredLeaderBoard = typeFilteredLeaderBoard.filter((user) => {
        if (
          user.age >= +selectedAgeGroup[0] &&
          user.age <= +selectedAgeGroup[1]
        ) {
          return user;
        }
      });

      const searchFilteredLeaderBoard = ageFilteredLeaderBoard.filter(
        (user) => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        }
      );

      setFilteredLeaderBoard(searchFilteredLeaderBoard);
      return;
    }
  }, [isFetched, selectedType, search, selectedAgeGroup]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAgeGroup = (e) => {
    const ageGroup = e.target.value.split("-");
    if (ageGroup.length === 1) {
      setSelectedAgeGroup([...ageGroup, ageGroup[0]]);
    } else {
      setSelectedAgeGroup(ageGroup);
    }
  };

  const handleType = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <input
            className={styles.search}
            placeholder="Овог/Нэр"
            type="text"
            onChange={handleSearch}
          />
          <div className={styles.tabsContainer}>
            <select
              className={styles.tab}
              onChange={handleAgeGroup}
              defaultValue=""
            >
              <option disabled value="">
                Нас сонгох
              </option>
              <option value="4">4 нас</option>
              <option value="5">5 нас</option>
              <option value="6">6 нас</option>
              <option value="7-8">7-8 нас</option>
              <option value="9-11">9-11 нас</option>
              <option value="12-14">12-14 нас</option>
              <option value="15-17">15-17 нас</option>
              <option value="18">18-аас дээш нас</option>
            </select>
            <select className={styles.tab}>
              <option>Онлайн рекорд</option>
              <option>Тэмцээний рекорд</option>
            </select>
            <select className={styles.tab} onChange={handleType}>
              <option>Keymaster 5</option>
              <option>Keymaster 7</option>
              <option>Keymaster 9</option>
            </select>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={`${styles.tableHeaderCol} ${styles.placementCol}`}>
              Байр
            </div>
            <div
              className={`${styles.tableHeaderCol} ${styles.profileCol}`}
            ></div>
            <div className={`${styles.tableHeaderCol} ${styles.nameCol}`}>
              Овог Нэр
            </div>
            <div className={`${styles.tableHeaderCol} ${styles.ageCol}`}>
              Нас
            </div>
            <div className={`${styles.tableHeaderCol} ${styles.genderCol}`}>
              Хүйс
            </div>
            <div className={`${styles.tableHeaderCol} ${styles.timeCol}`}>
              Хугацаа (сек)
            </div>
          </div>
          <div className={styles.tableBody}>
            {isFetched &&
              filteredLeaderBoard.map((user, index) => {
                return (
                  <Link href={`/users/${user._id}`} key={user._id}>
                    <div className={styles.tableRow}>
                      <div
                        className={`${styles.tableBodyCol} ${styles.placementCol}`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`${styles.tableBodyCol} ${styles.profileCol}`}
                      >
                        <Image
                          src={user.photoLink}
                          layout="fill"
                          objectFit="cover"
                          alt="profile"
                        />
                      </div>
                      <div
                        className={`${styles.tableBodyCol} ${styles.nameCol}`}
                      >
                        {user.name}
                      </div>
                      <div
                        className={`${styles.tableBodyCol} ${styles.ageCol}`}
                      >
                        {user.age}
                      </div>
                      <div
                        className={`${styles.tableBodyCol} ${styles.genderCol}`}
                      >
                        {user.gender}
                      </div>
                      <div
                        className={`${styles.tableBodyCol} ${styles.timeCol}`}
                      >
                        {user.time}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
