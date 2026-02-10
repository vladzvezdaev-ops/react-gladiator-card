import { useMemo } from "react";
import styles from "@/components/CharacterCard/_CharacterCard.module.scss";
import classNames from "classnames";

interface IGladiatorData {
  username: string;
  age: string | number;
  gender: string;
  city: string;
  bio: string;
}

interface CharacterCardProps {
  data: IGladiatorData;
  avatar: string | null;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  data,
  avatar,
}) => {
  const { username, age, gender, city, bio } = data;

  const gladiatorId = useMemo(() => Math.floor(Math.random() * 1000), []);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Посвідчення Гладиатора</h3>
        <span className={styles.id}>ID: {gladiatorId}</span>
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.avatarWrapper}>
          {avatar ? (
            <img src={avatar} alt="Gladiator" className={styles.image} />
          ) : (
            <div className={styles.avatarPlaceholder}>?</div>
          )}
        </div>

        <div className={styles.stats}>
          <p>
            <strong>Ім'я:</strong> {username || "..."}
          </p>
          <p>
            <strong>Вік:</strong> {age ? `${age} років` : "..."}
          </p>
          <p>
            <strong>Стать:</strong>
            <span
              className={classNames(styles.genderIcon, {
                [styles.male]: gender === "male",
                [styles.female]: gender === "female",
              })}
            >
              {gender === "male"
                ? " ♂"
                : gender === "female"
                  ? " ♀"
                  : " не обрано"}
            </span>
          </p>
          <p>
            <strong>Регіон:</strong> {city !== "disabled" ? city : "Мандрівник"}
          </p>
        </div>
      </div>
      <div className={styles.bioBlock}>
        <p className={styles.bioLabel}>Історія подвигів:</p>
        <p className={styles.bioText}>{bio || "Тут буде ваша легенда..."}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.stamp}>
          МІЙ ПРОЕКТ, <br /> ЛЮБЛЮ СВОЮ <br /> ДРУЖИНУ НАСТЮ
        </div>
      </div>
    </div>
  );
};
