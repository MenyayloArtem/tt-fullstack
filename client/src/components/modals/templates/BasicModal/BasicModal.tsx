import React from "react";
import "./BasicModal.scss";
import { Modal } from "@material-ui/core";
import useModal from "../../../../hooks/useModal";

interface Props {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose? : Function
}

function BasicModal(props: Props) {
  const modal = useModal();

  const onClose = () => {
    if (props.onClose) {
      props.onClose()
    }

    modal.close()
  }
  return (
    <Modal open={props.open} className="modal" onClose={() => onClose()}>
      <div className="modal__inner">
        <div className="modal__title">{props.title || ""}</div>
        <div className="modal__body">{props.children}</div>
      </div>
    </Modal>
  );
}

export default BasicModal;
