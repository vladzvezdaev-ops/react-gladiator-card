import styles from "@/components/LiveCard/_LiveCard.module.scss";
import classNames from "classnames";
import { useRef, useState } from "react";
import sharedInputs from "@/shared/ui/inputs.module.scss";
import btnStyles from "@/shared/ui/buttons.module.scss";
import { useForm } from "react-hook-form";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard.tsx";

export const LiveCard = () => {
  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      username: "",
      age: "",
      email: "",
      city: "disabled",
      gender: "",
      bio: "",
    },
  });

  const allValues = watch();
  const bioValue = watch("bio") || "";
  const [avatar, setAvatar] = useState(null);
  const MAX_LENGTH = 200;
  const usRef = useRef(null);

  const handleSpanClick = () => usRef.current.click();

  const onSubmit = (data) => {
    console.log("ГЛАДІАТОР ГОТОВИЙ:", { ...data, avatar });
    alert("Персонаж створений");
  };

  const handleFullReset = () => {
    handleSetAvatar();
    reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSetAvatar = () => {
    if (avatar) {
      URL.revokeObjectURL(avatar);
    }
    setAvatar("");
  };

  const isStarted =
    Object.values(allValues).some(
      (value) => value !== "" && value !== "disabled" && value !== false,
    ) || !!avatar;

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formMainInfo}>
          <fieldset className={styles.Mainfieldset}>
            <legend>Реквізити бійця</legend>
            <input
              {...register("username")}
              className={sharedInputs.baseInput}
              type="text"
              placeholder="Ім'я Гладиатора"
            />
            <input
              {...register("age")}
              className={sharedInputs.baseInput}
              type="number"
              min="14"
              max="100"
              placeholder="Вік"
            />
            <input
              {...register("email")}
              className={sharedInputs.baseInput}
              type="email"
              placeholder="Пошта"
            />
          </fieldset>

          <fieldset className={styles.Secondfieldset}>
            <legend>Походження</legend>
            <select
              {...register("city")}
              className={sharedInputs.baseSelect}
              defaultValue="disabled"
            >
              <option value="disabled" disabled>
                Оберіть Регіон
              </option>
              <option value="west">Західна Україна</option>
              <option value="center">Центральна Україна</option>
              <option value="east">Східна Україна</option>
            </select>

            <div className={styles.radioGroup}>
              <input
                {...register("gender")}
                id="male"
                type="radio"
                value="male"
              />
              <label htmlFor="male">Чоловік</label>

              <input
                {...register("gender")}
                id="female"
                type="radio"
                value="female"
              />
              <label htmlFor="female">Жінка</label>
            </div>
          </fieldset>
        </div>

        <div className={styles.bioSection}>
          <fieldset
            style={avatar ? { height: 216 } : { height: "auto" }}
            className={styles.Thirdfieldset}
          >
            <label htmlFor="avatar-upload" className={styles.avatarLabel}>
              {avatar ? (
                <img className={styles.imagePreview}
                  style={{ width: "60%", height: "80%" }}
                  src={avatar}
                  alt="Preview"
                />
              ) : (
                "Завантажити фото"
              )}
            </label>
            <input
              className={styles.inputPhoto}
              onChange={handleFileChange}
              accept="image/*"
              ref={usRef}
              type="file"
              id="avatar-upload"
              hidden
            />
            <span
              onClick={handleSpanClick}
              className={classNames(
                styles.spanContent,
                avatar ? styles.spanHidden : styles.spanIcon,
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) setAvatar(URL.createObjectURL(file));
              }}
            >
              ?
            </span>
            <textarea
              {...register("bio")}
              style={{ height: "36%", resize: "none" }}
              className={classNames(styles.textarea, sharedInputs.baseTextarea)}
              maxLength={MAX_LENGTH}
              placeholder="Розкажіть про свої подвиги..."
            ></textarea>
            <span className={styles.spanCounter}>
              {avatar ? `${(bioValue || "").length} / ${MAX_LENGTH}` : ""}
            </span>
          </fieldset>
        </div>

        <button
          className={classNames(styles.submitBtn, btnStyles.goldButton)}
          type="submit"
        >
          Вступити в бій
        </button>
        <button
          type="button"
          onClick={handleFullReset}
          className={classNames(styles.resetBtn, btnStyles.sandButton)}
        >
          Відступити
        </button>
      </form>
      <div className={styles.previewSection}>
        {isStarted && <CharacterCard data={allValues} avatar={avatar} />}
      </div>
    </>
  );
};
