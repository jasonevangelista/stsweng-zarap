import Background from '../public/bezier_curve.svg';
import styles from '../styles/landingpage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <div className={styles.top_bg}></div>
                <h2 className={styles.landing_title}> Find what you like </h2>
            </div>
            <div className={styles.bottom_container}>
                <div className={styles.bottom_bg}></div>
            </div>
        </div>
    )
}
  