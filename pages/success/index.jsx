//Next, React (core node_modules) imports must be placed here
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'
import LandingLayout from '@/layouts/Landing';
//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'
import { CheckmarkCircle2Outline } from "@styled-icons/evaicons-outline";
import styles from './Success.module.scss'
const StyledCheckmarkCircle = styled(CheckmarkCircle2Outline)`
  width: 72px;
  color: #159900;
  padding: 0;
`;
const SuccessPage = (props) => {
	 return (
        <motion.main exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 1 }}
        className={styles.container}>
            <div className={styles.success}>
                <StyledCheckmarkCircle />
                <h4>Таны хүсэлт амжилттай илгээгдлээ</h4>
                <p><span>Бид таны хүсэлтийг 48 цагийн дотор</span>
                <span>шалгаад эргээд холбогдоно.</span>
                <span>Баярлалаа</span></p>
                <Link href="/">Нүүр хуудас руу буцах</Link>
            </div>
        </motion.main>
	)
};
SuccessPage.Layout = LandingLayout;
export default SuccessPage;
