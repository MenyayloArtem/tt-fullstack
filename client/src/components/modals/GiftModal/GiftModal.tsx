import React, { useCallback, useEffect } from "react";
import "./GiftModal.scss";
import BasicModal from "../templates/BasicModal/BasicModal";
import GiftItem from "../../GiftItem/GiftItem";
import { Button, Grid } from "@material-ui/core";
import useModal from "../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import giftsSelector from "../../../redux/selectors/giftsSelector";
import fetchGifts from "../../../redux/thunk/fetchGifts";
import Gift from "../../../shared/types/Gift";
import selectGift from "../../../redux/actions/app/gifts/selectGift";

interface Props {
  open: boolean;
}

function GiftModal({ open }: Props) {
  const modal = useModal();
  const gifts = useSelector(giftsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchGifts());
  }, [dispatch]);

  const onSelect = useCallback(
    (gift: Gift) => {
      dispatch(selectGift(gift));
      modal.back();
    },
    [dispatch, modal]
  );

  return (
    <BasicModal title="Подарки" open={open}>
      <div className="">
        <Grid container spacing={1}>
          {gifts.map((gift) => (
            <Grid item key={gift.id} xs={6}>
              <GiftItem key={gift.id} item={gift} onSelect={onSelect} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Button className="gifts-back" fullWidth variant="outlined" onClick={() => modal.back()}>
        Назад
      </Button>
    </BasicModal>
  );
}

export default GiftModal;
