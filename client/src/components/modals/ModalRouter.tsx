import React from "react";
import { ModalName } from "../../redux/reducers/modalReducer";
import CreateModal from "./templates/PromotionFormModal/PromotionFormModal";
import GiftModal from "./GiftModal/GiftModal";
import AddPromotionModal from "./AddPromotionModal/AddPromotionModal";
import ConfirmModal from "./templates/ConfirmModal/ConfirmModal";
import EditPromotionModal from "./EditPromotionModal/EditPromotionModal";

interface Props {
  currentModal: ModalName | null;
}


function ModalRouter({ currentModal }: Props) {
  return (
    <>
      <EditPromotionModal open={currentModal === "edit"}/>
      <AddPromotionModal open={currentModal === "create"}/>
      <GiftModal open={currentModal === "gifts"}/>
    </>
  );
}

export default ModalRouter;
