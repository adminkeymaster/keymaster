//Next, React (core node_modules) imports must be placed here
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import DashboardLayout from "@/layouts/Dashboard";
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import Notification from "@/components/Notification";

import styles from "./Create.module.scss";
import axios from "axios";

const CreateCompetitionPage = (props) => {
    const router = useRouter();

    const { data: session, status } = useSession();

    const [form, setForm] = useState({
        competitionName: "",
        type: "",
        ageGroup: "",
        record: "",
        status: true,
    });
    const { id } = router.query;

    const [notification, setNotification] = useState({
        message: "",
        success: false,
    });

    useEffect(() => {
        if (!notification.message) return;

        const timer = setTimeout(() => {
            setNotification({
                message: "",
                success: false,
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [notification]);

    if (status === "loading") return null;
    if (!session || !session.user.isAdmin) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`/api/record-history/${id}`, form)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    router.push(
                        {
                            pathname: "/dashboard/record-history/",
                            query: {
                                success: true,
                                message: "Мэдээлэл амжилттай нэмэгдлээ",
                            },
                        },
                        "/dashboard/competitions"
                    );
                }
            })
            .catch((err) => {
                setNotification({
                    message: "Мэдээлэл нэмэхэд алдаа гарлаа.",
                    success: false,
                });
                console.log("CreateCompetitionPage Submit:", err);
            });
    };

    return (
        <main className={styles.container}>
            <Notification
                message={notification.message}
                success={notification.success}
            />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.headingContainer}>
                    <h1 className={styles.heading}>Тэмцээн нэмэх</h1>
                    <button type="submit" className={styles.button}>
                        Хадгалаx
                    </button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="competitionName" className={styles.inputLabel}>
                        Тэмцээний нэр
                    </label>

                    <input
                        type="text"
                        id="competitionName"
                        name="competitionName"
                        className={styles.input}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type" className={styles.inputLabel}>
                        Төрөл
                    </label>

                    <input
                        type="text"
                        id="type"
                        name="type"
                        className={styles.input}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ageGroup" className={styles.inputLabel}>
                        Насны ангилал
                    </label>

                    <input
                        type="text"
                        id="ageGroup"
                        name="ageGroup"
                        className={styles.input}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="record" className={styles.inputLabel}>
                        Рекорд
                    </label>

                    <input
                        type="text"
                        id="record"
                        name="record"
                        className={styles.inputArea}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </main>
    );
};

CreateCompetitionPage.Layout = DashboardLayout;

export default CreateCompetitionPage;
