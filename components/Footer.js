import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2020 TeamPura. All Rights Reserved</p>
      <p>
        Contact us through Neil Matthew Lua:{" "}
        <span style={{ textDecoration: "underline" }}>
          neil_matthew_lua@dlsu.edu.ph
        </span>
      </p>
    </footer>
  );
}
