//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";

import styled from "styled-components";

import {
  FacebookSquare,
  Youtube,
  Twitter,
  Instagram,
} from "@styled-icons/boxicons-logos";
import ContactForm from "@/composites/ContactForm";
import LogoDark from "@/components/LogoDark";
//Styles must be imported here
import styles from "./Footer.module.scss";

const StyledFacebook = styled(FacebookSquare)`
  width: 24px;
  color: #121212;
  margin-right: 2rem;
  cursor: pointer;
`;
const StyledYoutube = styled(Youtube)`
  width: 24px;
  color: #121212;
  margin-right: 2rem;
  cursor: pointer;
`;
const StyledTwitter = styled(Twitter)`
  width: 24px;
  color: #121212;
  margin-right: 2rem;
  cursor: pointer;
`;
const StyledInstagram = styled(Instagram)`
  width: 24px;
  color: #121212;
  margin-right: 2rem;
  cursor: pointer;
`;
const Footer = (props) => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.contentLeft}>
            <div className={styles.web}>
              <h4>кимастер</h4>
              <Link href="/about">
                <p>Тухай</p>
              </Link>
              <Link href="/competition">
                <p>тэмцээн</p>
              </Link>
              <Link href="/news">
                <p>мэдээ</p>
              </Link>
            </div>
            <div className={styles.info}>
              <div className={styles.infoTop}>
                <h4>бидэнтэй холбогдох</h4>
                <p>
                  Та форумыг бөглөн илгээх товчыг дарснаар манай оператортой 24
                  цагийн дотор холбогдох болно. Баярлалаа!
                </p>
              </div>
              <div className={styles.infoBottom}>
                <h4>
                  Хан-Уул дүүрэг, 15 дугаар хороо, Чингисийн өргөн чөлөө , 6A-
                  17
                </h4>
                <p>
                  <span>
                    {" "}
                    admin@keymaster.mn
                    <br />
                    (+976) 88111488
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.contentRight}>
            <ContactForm />
          </div>
        </div>
        <hr></hr>
        <div className={styles.contentBottom}>
          <div className={styles.legal}>
            <div className={styles.socialContainer}>
              <Link href="">
                <StyledFacebook />
              </Link>
              <Link href="">
                <StyledYoutube />
              </Link>
              <Link href="">
                <StyledInstagram />
              </Link>
              <Link href="">
                <StyledTwitter />
              </Link>
            </div>
            <Link href="/">
              <div className={styles.legalRight}>
                <LogoDark size={8} />
              </div>
            </Link>
            <div className={styles.legalLeft}>
              <p>&lt;/&gt; 2021 Solid Frameworks LLC</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bluestar}>
        <Image
          width={"100%"}
          height={"100%"}
          src="/bluestar.png"
          layout="fill"
        />
      </div>
    </footer>
  );
};

export default Footer;
