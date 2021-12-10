//Next, React (core node_modules) imports must be placed here
import { useState } from 'react';
import styled from "styled-components";

//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import { CheckmarkCircle2, AlertCircle } from "@styled-icons/evaicons-solid";

import styles from './Rules.module.scss'

const StyledCheckmark = styled(CheckmarkCircle2)`
  width: 40px;
  color: #ff6B00;
  padding: 0;
`;
const StyledAlert = styled(AlertCircle)`
  width: 40px;
  color: #ff6B00;
  padding: 0;
`;
const Rules = (props) => {
	const [toggleState, setToggleState] = useState(1);
	const toggleTab = (index) => {
		setToggleState(index);
	};
	return (
		<div className={styles.container}>
			<div className={styles.tabsContainer}>
				<div
					className={
						toggleState === 1
							? `${styles.tabs} ${styles.activeTabs}`
							: `${styles.tabs}`
					}
					onClick={() => toggleTab(1)}
				>
					<h2>Ганцаарчилсан</h2>
				</div>
				<div
					className={
						toggleState === 2
							? `${styles.tabs} ${styles.activeTabs}`
							: `${styles.tabs}`
					}
					onClick={() => toggleTab(2)}
				>
					<h2>Багийн Төрөлд</h2>
				</div>
			</div>
			<div className={styles.contentTabs}>
				<div
					className={
						toggleState === 1
							? `${styles.content}  ${styles.activeContent}`
							: `${styles.content}`
					}
				>
					<div className={styles.single}>
						<ul>
						<div>
							<li>5, 7, 9 цагираг</li>
							<li>Нэр дуудах үед гарч ирэх</li>
							<li>Сандал дээр сууж оролцох</li>
							<li>Хувийн кимастер ашиглах</li>
						</div>
						<div>
							<li>Хугацаа хэмжигч заавал ашиглах</li>
							<li>Зөвхөн нэг удаа оролдлого хийх</li>
							<li>Хяналтын шүүгчээр хугацааг тэмдэглүүлэх</li>
							<li>Цагирагыг салгаад цаг зогсооно</li>
						</div>
						</ul>
					</div>
				</div>

				<div
					className={
						toggleState === 2
							? `${styles.content}  ${styles.activeContent}`
							: `${styles.content}`
					}
				>
					<div className={styles.team}>
						<ul>
							<div>
							<li>Багт 4 тамирчин байна</li>
							<li>7 түлхүүрээр өрсөлдөнө</li>
							<li>Эхний тамирчин цоожыг салгах, дараагийх нь цоожлох байдлаар явна.</li>
							<li>Тамирчин зөвхөн нэг багыг төлөөлж оролцоно</li>
							</div>
							<div>
							<li>Эхний тамирчин ширээний ард эхлэхэд бэлэн байх</li>
							<li>Бусад тамирчин 2метрийн зайнд байрлах</li>
							<li>Шүүгчийн дохиогоор эхлэх</li>
							<li>Зурвас нэг хөл давсны дараа, дараагын тамирчин гүйх</li>
							</div>
						</ul>

					</div>

				</div>
			</div>
			<div className={styles.alert}><div className={styles.icon}><StyledCheckmark /></div><p><b>Үүний дараа гараа солбиж цоожилно. Салгасан хугацаа, цоожилсон хугацааг харгалзаж тус тусын рекордыг тэмдэглэнэ.</b></p></div>
			<div className={styles.alert}><div className={styles.icon}><StyledAlert /></div><p><b>Тэмцээнд насны ангилал болон төрөл тус бүрт оролцох тамирчдын тоо 50 байна.</b></p></div>
			<div className={styles.alert}><div className={styles.icon}><StyledAlert /></div><p><b>50-аас илүү тамирчин оролцохоор бүртгүүлсэн тохиолдолд урьдчилсан шалгаруулалт хийнэ.</b></p></div>
		</div>
	)
};

export default Rules;
