import styles from "../styles/footer.module.css";
import { FacebookFilled } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2020 TeamPura. All Rights Reserved</p>
      <p>
        Contact us through
        {"   "}
        <a href="https://www.messenger.com/t/neil.lua" target="_blank" rel="noreferrer noopener">
          <FacebookFilled />
        </a>
        {"   "}
        Neil Matthew Lua:
        {"   "}
        <span style={{ textDecoration: "underline" }}>
          neil_matthew_lua@dlsu.edu.ph
        </span>
      </p>
    </footer>
  );
}
