import React, { useState } from "react";
import styles from "./ErrorMessage.module.css";
import { AlertCircle, X } from "react-feather";

function ErrorMessage({ message }) {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div className={styles.errorMessage} onClick={() => setShow(false)}>
        <AlertCircle size={24} />
        <p>{message}</p>
        <X />
      </div>
    )
  );
}

export default ErrorMessage;
