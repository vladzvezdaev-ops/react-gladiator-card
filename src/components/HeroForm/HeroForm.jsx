import styles from "@/components/HeroForm/_HeroForm.module.scss";
import bgSvg from "@/assets/icons/background.svg";
import templeSvg from "@/assets/icons/temple.svg";
import { LiveCard } from "@/components/LiveCard/LiveCard";

export const HeroForm = () => {
  return (
    <section className={styles.hero}>
      <img src={bgSvg} className={styles.background} alt="Background" />

      <div className={styles.templeContainer}>
        <div className={styles.templeWrapper}>
          <img src={templeSvg} className={styles.homeTemple} alt="Temple" />
          <div className={styles.formContent}>
            <LiveCard />
          </div>
        </div>
      </div>
    </section>
  );
};
