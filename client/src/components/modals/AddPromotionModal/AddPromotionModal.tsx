import React, { useMemo } from "react";
import "./AddPromotionModal.scss";
import PromotionFormModal from "../templates/PromotionFormModal/PromotionFormModal";
import Promotion from "../../../shared/types/Promotion";
import { useDispatch } from "react-redux";

import useModal from "../../../hooks/useModal";
import addPromotion from "../../../redux/thunk/addPromotion";
import formatDate from "../../../heplers/formatDate";
interface Props {
  open: boolean;
}

function AddPromotionModal({ open }: Props) {
  const dispatch = useDispatch();
  const modal = useModal();
  const onSave = (item: Promotion) => {
    console.log(item);
    // @ts-ignore
    dispatch(addPromotion(item));
    modal.close();
  };

  const item = useMemo<Omit<Promotion, "gift">>(() => {
    return {
      id: Math.random(),
      name: "",
      description: "",
      nums: "",
      daysForGet: 0,
      daysForReceive: 0,
      giftsSent: 0,
      date: formatDate(new Date(Date.now())),
    };
  }, []);

  return (
    <PromotionFormModal
      open={open}
      onSave={onSave}
      title="Создать акцию"
      item={item}
    />
  );
}

export default AddPromotionModal;
