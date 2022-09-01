//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
//import STORE from '@/store'

//import COMPONENT from '@/components'

import styles from "./LeaderboardTable.module.scss";

const LeaderboardTable = (props, id) => {
  const [isFetched, setIsFetched] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredLeaderBoard, setFilteredLeaderBoard] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [keymasterTypes, setKeymasterTypes] = useState([]);
  const [competitionTypes, setCompetitionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const [ageGroups, setAgeGroups] = useState([
    "4",
    "5",
    "6",
    "7-8",
    "9-11",
    "12-14",
    "15-17",
    "18",
  ]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedCompetitionType, setSelectedCompetitionType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios.get("/api/competition").then(({ data }) => {
      if (data.data.length === 0) return;

      console.log(data);

      setCompetitions(data.data);
      setSelectedCompetition(data.data[0]);
      setSelectedCompetitionType(data.data[0].type[0]);
    });

    axios
      .get("/api/keymasterTypes", { signal: controller.signal })
      .then(({ data }) => {
        setKeymasterTypes(data.data);
        setSelectedType(data.data[0].keymasterType);
      });

    axios
      .get("/api/user", { signal: controller.signal })
      .then(({ data }) => {
        setFetchedData(data.data);
        setFilteredData(
          data.data.filter((user) => {
            return user.lastComp.length > 0;
          })
        );
        setIsFetched(true);
      })
      .catch((err) => {
        console.log("Leaderboard Fetch Aborted", err);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isFetched) return;

    if (isOnline) {
      const usersWithRecords = fetchedData.filter((user) => {
        return user.record.length > 0;
      });
      setAgeGroups(["4", "5", "6", "7-8", "9-11", "12-14", "15-17", "18"]);
      setSelectedAgeGroup("");
      setLeaderboard(usersWithRecords);
    } else {
      if (filteredData.length === 0) return;

      setSelectedAgeGroup("");
      const usersByCompetition = [];

      filteredData.forEach((user) => {
        user.lastComp.forEach((competition) => {
          if (
            competition.compName === selectedCompetition.compName &&
            competition.type === selectedCompetitionType
          ) {
            usersByCompetition.push({
              ...user,
              record: competition.record,
            });
          }
        });
      });

      setAgeGroups(selectedCompetition.ageGroup);
      setCompetitionTypes(selectedCompetition.type);
      setLeaderboard(usersByCompetition);
      if (!competitionTypes.includes(selectedCompetitionType)) {
        setSelectedCompetitionType(selectedCompetition.type[0]);
      }
    }
  }, [
    isFetched,
    isOnline,
    selectedCompetition,
    competitionTypes,
    selectedCompetitionType,
  ]);

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
        time: getTimeByType(user.record),
      };

      return newUser;
    });

    typeFilteredLeaderBoard.sort((a, b) => {
      return a.time - b.time;
    });

    if (!isOnline && filteredData.length === 0) return;

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
  }, [leaderboard, selectedType, search, selectedAgeGroup]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAgeGroup = (e) => {
    if (e.target.value === "") {
      setSelectedAgeGroup("");
      return;
    }

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

  const handleRecordType = (e) => {
    setIsOnline(e.target.value === "true" ? true : false);
  };

  const handleCompetitions = (e) => {
    setSelectedCompetition(
      competitions.find((comp) => comp.compName === e.target.value)
    );
  };

  const handleCompetitionTypes = (e) => {
    setSelectedCompetitionType(e.target.value);
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
              defaultValue={selectedAgeGroup.toString()}
            >
              <option value="">Нас сонгох</option>
              {ageGroups.map((ageGroup) => {
                return (
                  <option key={ageGroup} value={ageGroup.toString()}>
                    {ageGroup}
                  </option>
                );
              })}
            </select>
            <select
              defaultValue={isOnline}
              className={styles.tab}
              onChange={handleRecordType}
            >
              <option value={true}>Онлайн рекорд</option>
              <option value={false}>Тэмцээний рекорд</option>
            </select>

            {!isOnline && competitions.length > 0 && (
              <select
                className={styles.tab}
                defaultValue={selectedCompetition.compName}
                onChange={handleCompetitions}
              >
                {competitions.map((competition, index) => {
                  return (
                    <option key={index} value={competition.compName}>
                      {competition.compName}
                    </option>
                  );
                })}
              </select>
            )}

            {!isOnline && competitionTypes.length > 0 && (
              <select
                className={styles.tab}
                defaultValue={selectedCompetitionType}
                onChange={handleCompetitionTypes}
              >
                {competitionTypes.map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            )}

            <select
              className={styles.tab}
              onChange={handleType}
              defaultValue={selectedCompetitionType}
            >
              {keymasterTypes.map((type) => {
                return (
                  <option key={type._id} value={type.keymasterType}>
                    {type.keymasterType}
                  </option>
                );
              })}
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
                        {user.photoLink && (
                          <Image
                            src={user.photoLink}
                            layout="fill"
                            objectFit="cover"
                            alt="profile"
                          />
                        )}
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
            {isFetched && !isOnline && filteredData.length === 0 && (
              <div className={styles.tableRow}>
                Одоогоор тэмцээний рекорд олдсонгүй
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
