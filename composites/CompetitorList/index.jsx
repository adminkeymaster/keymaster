//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

import styles from "./CompetitorList.module.scss";

const CompetitorList = (props) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>КиМастер Тэмцээн</h2>
        <select>
          <option value="1">4 нас</option>
          <option value="1">5 нас</option>
          <option value="1">6 нас</option>
          <option value="1">7-8 нас</option>
          <option value="1">9-11 нас</option>
          <option value="1">12-14 нас</option>
          <option value="1">15-17 нас</option>
          <option value="1">18-аас дээш нас</option>
        </select>
      </header>
      <div className={styles.table}>
        <div className={styles.head}>
          <span className={styles.col1}>Эхлэх огноо</span>
          <span className={styles.col2}>Дуусах огноо</span>
          <span className={styles.col3}>Тэмцээн</span>
          <span className={styles.col4}>Байршил</span>
        </div>
        <div className={styles.row}>
          <span className={styles.col1}>2021-12-31 9:00</span>
          <span className={styles.col2}>2021-12-31 17:00</span>
          <span className={styles.col3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            cum eius a sit tempora laudantium ducimus molestiae, velit, aut eos
            repellat dolor mollitia similique ad maxime nulla. Optio, quasi
            accusamus!
          </span>
          <span className={styles.col4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            minima doloremque est accusamus distinctio obcaecati maxime harum
            eum suscipit, delectus voluptate eligendi, aliquid fugiat
            consectetur ullam tempore fuga dignissimos voluptates!
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.col1}>2021-12-31 9:00</span>
          <span className={styles.col2}>2021-12-31 17:00</span>
          <span className={styles.col3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            cum eius a sit tempora laudantium ducimus molestiae, velit, aut eos
            repellat dolor mollitia similique ad maxime nulla. Optio, quasi
            accusamus!
          </span>
          <span className={styles.col4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            minima doloremque est accusamus distinctio obcaecati maxime harum
            eum suscipit, delectus voluptate eligendi, aliquid fugiat
            consectetur ullam tempore fuga dignissimos voluptates!
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.col1}>2021-12-31 9:00</span>
          <span className={styles.col2}>2021-12-31 17:00</span>
          <span className={styles.col3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            cum eius a sit tempora laudantium ducimus molestiae, velit, aut eos
            repellat dolor mollitia similique ad maxime nulla. Optio, quasi
            accusamus!
          </span>
          <span className={styles.col4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            minima doloremque est accusamus distinctio obcaecati maxime harum
            eum suscipit, delectus voluptate eligendi, aliquid fugiat
            consectetur ullam tempore fuga dignissimos voluptates!
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.col1}>2021-12-31 9:00</span>
          <span className={styles.col2}>2021-12-31 17:00</span>
          <span className={styles.col3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            cum eius a sit tempora laudantium ducimus molestiae, velit, aut eos
            repellat dolor mollitia similique ad maxime nulla. Optio, quasi
            accusamus!
          </span>
          <span className={styles.col4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
            minima doloremque est accusamus distinctio obcaecati maxime harum
            eum suscipit, delectus voluptate eligendi, aliquid fugiat
            consectetur ullam tempore fuga dignissimos voluptates!
          </span>
        </div>
      </div>
    </section>
  );
};

export default CompetitorList;
