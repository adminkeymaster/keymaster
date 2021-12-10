//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import COMPONENT from '@/components'
import CompetitionCard from '@/composites/CompetitionCard'
import styles from './CompetitionTable.module.scss'

const CompetitionTable = (props) => {
	return (
		<div className={styles.container}>
			<div className={styles.table}>
				<div className={styles.tableHeader}>
					<div className={`${styles.tableHeaderCol} ${styles.nameCol}`}>
						Тэмцээн
					</div>
					<div className={`${styles.tableHeaderCol} ${styles.startCol}`}>
						Эхлэх огноо
					</div>
					<div className={`${styles.tableHeaderCol} ${styles.endCol}`}>
						Дуусах огноо
					</div>
					<div className={`${styles.tableHeaderCol} ${styles.locationCol}`}>
						Байршил
					</div>
				</div>
				<div className={styles.tableBody}>
					<CompetitionCard
						name={"Кимастер Хотын аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2022-01-15  Дуусах: 2022-01-30"}
						location={"Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
					/>
					<CompetitionCard
						name={"Кимастер бүсийн аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2021-12-20  Дуусах: 2021-12-31"}
						location={"Байршил: Дүүрэг тус бүр дээр"}
					/>
					<CompetitionCard
						name={"Кимастер Улсын аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2022-02-13  Дуусах: 2022-02-20"}
						location={"Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
					/>
					<CompetitionCard
						name={"Кимастер Улсын аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2022-02-13  Дуусах: 2022-02-20"}
						location={"Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
					/>
					<CompetitionCard
						name={"Кимастер Улсын аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2022-02-13  Дуусах: 2022-02-20"}
						location={"Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
					/>
					<CompetitionCard
						name={"Кимастер Улсын аварга шалгаруулах тэмцээн"}
						date={"Эхлэх: 2022-02-13  Дуусах: 2022-02-20"}
						location={"Байршил: ХУД, ЧӨЧ, 15р хороо 6а-17 тоот"}
					/>
				</div>
			</div>
		</div>
	)
};

export default CompetitionTable;
