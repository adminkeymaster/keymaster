import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "@/components/Loader";

import styles from "./LeaderboardTableRefactored.module.scss";

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

const keyTypes = ["Keymaster 5", "Keymaster 7", "Keymaster 9"];

const LeaderboardTableRefactored = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnlineRecord, setIsOnlineRecord] = useState(true);
  const [competitionData, setCompetitionData] = useState([]);
  const [selectedCompetitionName, setSelectedCompetitionName] = useState("");
  const [selectedCompetitionType, setSelectedCompetitionType] = useState("");
  const [competitionList, setCompetitionList] = useState([]);
  const [onlineData, setOnlineData] = useState([]);
  const [renderedData, setRenderedData] = useState([]);
  const [keyType, setKeyType] = useState("Keymaster 5");
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
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (controller) => {
    try {
      const { data: competitionListRes } = await axios.get("/api/competition", {
        signal: controller.signal,
      });

      if (competitionListRes.data.length === 0) return;
      setSelectedCompetitionName(competitionListRes.data[0].compName);
      setSelectedCompetitionType(competitionListRes.data[0].type[0]);
      setCompetitionList(competitionListRes.data);

      const { data } = await axios.get("/api/user", {
        signal: controller.signal,
      });

      const normalizedData = await data.data.map((user) => {
        return {
          ...user,
          name: `${user.lastName} ${user.firstName}`,
          gender: user.gender === "male" ? "Эр" : "Эм",
          age: calculateAge(user.birthDate),
          record: user.record.reduce((prev, next) => {
            return {
              ...prev,
              [next.keymasterType]: next.time,
            };
          }, {}),
        };
      });

      const normalizedCompetitionData = await data.data
        .filter((user) => user.lastComp.length > 0)
        .map((user) => {
          return {
            ...user,
            name: `${user.lastName} ${user.firstName}`,
            gender: user.gender === "male" ? "Эр" : "Эм",
            age: calculateAge(user.birthDate),
            lastComp: user.lastComp.reduce((prevLastComp, nextLastComp) => {
              return {
                ...prevLastComp,
                [nextLastComp.compName]: {
                  ...prevLastComp[nextLastComp.compName],
                  [nextLastComp.type]: nextLastComp.record.reduce(
                    (prevRecord, nextRecord) => {
                      return {
                        ...prevRecord,
                        [nextRecord.keymasterType]: nextRecord.time,
                      };
                    },
                    {}
                  ),
                },
              };
            }, {}),
          };
        });

      setOnlineData(normalizedData);
      setCompetitionData(normalizedCompetitionData);
      setRenderedData(normalizedData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, []);

  //   Age Group Side Effect Handler
  useEffect(() => {
    if (competitionList.length === 0 || selectedCompetitionName === "") return;
    setSelectedAgeGroup("");
    setAgeGroups(
      isOnlineRecord
        ? ["4", "5", "6", "7-8", "9-11", "12-14", "15-17", "18"]
        : competitionList.find((competition) => {
            return competition.compName === selectedCompetitionName;
          }).ageGroup
    );
  }, [isOnlineRecord, selectedCompetitionName, competitionList]);

  //   Competition Type Side Effect Handler
  useEffect(() => {
    if (isOnlineRecord) return;
    setSelectedCompetitionName(competitionList[0].compName);
    setSelectedCompetitionType(competitionList[0].type[0]);
  }, [isOnlineRecord]);

  // Record Type handler
  const handleRecordTypeChange = (e) => {
    setIsOnlineRecord(e.target.value === "true");
    setRenderedData(e.target.value === "true" ? onlineData : competitionData);
  };

  // Key Type Handler
  const handleKeyTypeChange = (e) => {
    setKeyType(e.target.value);
  };

  // Age Group Handler
  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
  };

  // Search Handler
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Competition Name Handler
  const handleCompetitionNameChange = (e) => {
    setSelectedCompetitionName(e.target.value);
    setSelectedCompetitionType(
      competitionList.find(
        (competition) => competition.compName === e.target.value
      ).type[0]
    );
  };

  //   Competition Type Handler
  const handleCompetitionTypeChange = (e) => {
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
            value={searchValue}
            onChange={handleSearchChange}
          />
          <div className={styles.tabsContainer}>
            <select
              className={styles.tab}
              onChange={handleAgeGroupChange}
              value={selectedAgeGroup}
            >
              <option value="">Бүх нас</option>
              {ageGroups.map((ageGroup) => {
                return (
                  <option key={ageGroup} value={ageGroup}>
                    {ageGroup}
                  </option>
                );
              })}
            </select>
            <select
              value={isOnlineRecord}
              className={styles.tab}
              onChange={handleRecordTypeChange}
            >
              <option value="true">Онлайн рекорд</option>
              <option value="false">Тэмцээний рекорд</option>
            </select>

            {!isOnlineRecord && (
              <select
                value={selectedCompetitionName}
                className={styles.tab}
                onChange={handleCompetitionNameChange}
              >
                {competitionList.map((competition) => {
                  return (
                    <option
                      key={competition.compName}
                      value={competition.compName}
                    >
                      {competition.compName}
                    </option>
                  );
                })}
              </select>
            )}

            {!isOnlineRecord && (
              <select
                value={selectedCompetitionType}
                className={styles.tab}
                onChange={handleCompetitionTypeChange}
              >
                {competitionList
                  .find((competition) => {
                    return competition.compName === selectedCompetitionName;
                  })
                  .type.map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
              </select>
            )}

            <select
              value={keyType}
              className={styles.tab}
              onChange={handleKeyTypeChange}
            >
              {keyTypes.map((key) => {
                return (
                  <option key={key} value={key}>
                    {key}
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
            {!isLoading ? (
              renderedData.length > 0 &&
              renderedData
                .filter((user) => {
                  const hasSearchValue = user.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());

                  const hasCompetitionType = !isOnlineRecord
                    ? user.lastComp.hasOwnProperty(selectedCompetitionName)
                      ? user.lastComp[selectedCompetitionName].hasOwnProperty(
                          selectedCompetitionType
                        )
                      : false
                    : true;

                  const hasKeyType = isOnlineRecord
                    ? user.record.hasOwnProperty(keyType)
                    : hasCompetitionType
                    ? user.lastComp[selectedCompetitionName][
                        selectedCompetitionType
                      ][keyType]
                    : false;

                  const isInAgeGroup =
                    selectedAgeGroup === ""
                      ? true
                      : user.age >= +selectedAgeGroup.split("-")[0] &&
                        user.age <= +selectedAgeGroup.split("-")[1];

                  return (
                    hasSearchValue &&
                    hasCompetitionType &&
                    hasKeyType &&
                    isInAgeGroup
                  );
                })
                .sort((a, b) => {
                  if (isOnlineRecord)
                    return a.record[keyType] - b.record[keyType];

                  return (
                    a.lastComp[selectedCompetitionName][
                      selectedCompetitionType
                    ][keyType] -
                    b.lastComp[selectedCompetitionName][
                      selectedCompetitionType
                    ][keyType]
                  );
                })
                .map((user, index) => {
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
                          {isOnlineRecord
                            ? user.record[keyType]
                            : user.lastComp[selectedCompetitionName][
                                selectedCompetitionType
                              ][keyType]}
                        </div>
                      </div>
                    </Link>
                  );
                })
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTableRefactored;
