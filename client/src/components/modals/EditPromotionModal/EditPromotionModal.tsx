import React from "react";
import "./EditPromotionModal.scss";
import PromotionFormModal from "../templates/PromotionFormModal/PromotionFormModal";
import Promotion from "../../../shared/types/Promotion";
import { useDispatch, useSelector } from "react-redux";
import currentPromotionSelector from "../../../redux/selectors/currentPromotionSelector";
import savePromotion from "../../../redux/actions/app/promotions/savePromotion";
import useModal from "../../../hooks/useModal";
import updatePromotion from "../../../redux/thunk/updatePromotion";

interface Props {
  open: boolean;
}

function EditPromotionModal({ open }: Props) {
  const modal = useModal();
  const dispatch = useDispatch();
  const onSave = (item: Promotion) => {
    // @ts-ignore
    dispatch(updatePromotion(item));
    modal.close();
  };

  const item = useSelector(currentPromotionSelector)!;
  return (
    <PromotionFormModal
      open={open}
      title="Редактировать"
      onSave={onSave}
      item={item}
    />
  );
}

export default EditPromotionModal;
