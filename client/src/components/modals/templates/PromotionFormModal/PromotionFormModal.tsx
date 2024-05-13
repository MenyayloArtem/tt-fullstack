import React, { useEffect, useState } from "react";
import "./PromotionFormModal.scss";
import BasicModal from "../BasicModal/BasicModal";
import { Button } from "@material-ui/core";
import useModal from "../../../../hooks/useModal";
import * as Yup from "yup";
import {
  FormikTouched,
  FormikValues,
  setNestedObjectValues,
  useFormik,
} from "formik";
import ValidationTextField from "../../../ValidationTextField/ValidationTextField";
import Promotion, { RawPromotion } from "../../../../shared/types/Promotion";
import { useDispatch, useSelector } from "react-redux";
import selectedGiftSelector from "../../../../redux/selectors/gifts/selectedGiftSelector";
import selectGift from "../../../../redux/actions/app/gifts/selectGift";
import selectPromotion from "../../../../redux/actions/app/promotions/selectPromotion";
import daysToDate from "../../../../heplers/daysToDate";

interface Props {
  onSave: (item: Promotion) => void;
  title: string;
  item?: RawPromotion | Promotion;
  open: boolean;
}

const req = "Please, enter the value";
const min = "Значение не может быть меньше единицы";
const maxErr = "Не менее 2 дней до сгорания подарка";

function PromotionFormModal({ title, onSave, item, open }: Props) {
  const modal = useModal();

  const selectedGift = useSelector(selectedGiftSelector);
  const gift = selectedGift || item?.gift;
  const [giftWarn, setGiftWarn] = useState(false);
  const dispatch = useDispatch();

  Yup.addMethod(Yup.string, "enum", function (errorMessage) {
    return this.test(`test`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        value?.toLowerCase() === value?.toUpperCase() ||
        createError({ path, message: errorMessage })
      );
    });
  });

  let maxDays = item?.gift?.fireDate
    ? daysToDate(item.gift.fireDate) - 2
    : Infinity;
  maxDays = maxDays < 0 ? 0 : maxDays;
  let maxGifts = item?.gift?.avaliableCount
    ? item.gift.avaliableCount
    : Infinity;

  const shema = Yup.object().shape({
    name: Yup.string().required(req),
    giftsSent: Yup.number()
      .min(1, min)
      .max(maxGifts, "Достигнуто максимальное кол-во подарков")
      .required(req),
    daysForGet: Yup.number().min(1, min).max(maxDays, maxErr).required(req),
    daysForReceive: Yup.number().min(1, min).max(maxDays, maxErr).required(req),
    description: Yup.string().max(500, "Максимальная длина: 500").required(req),
    nums: (Yup as any)
      .string()
      .max(5000, "Максимальная длина: 5000")
      .required(req)
      .enum("Некорректное значение"),
  });

  const formik = useFormik({
    validationSchema: shema,
    initialValues: {
      name: item ? item.name : "",
      giftsSent: item ? item.giftsSent : "",
      daysForGet: item ? item.daysForGet : "",
      daysForReceive: item ? item.daysForReceive : "",
      description: item ? item.description : "",
      nums: item ? item.nums : "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (item) {
      formik.setValues(item as any, false);
    }
    // eslint-disable-next-line
  }, [item]);

  const clearState = () => {
    dispatch(selectGift(null));
    dispatch(selectPromotion(null));
  };

  const onSaveHandler = () => {
    if (item) {
      formik.validateForm().then((errors) => {
        formik.setTouched(
          setNestedObjectValues<FormikTouched<FormikValues>>(errors, true)
        );

        if (Object.keys(errors).length) {
          console.log("Некорректные поля");

          if (!item.gift) {
            setGiftWarn(true);
          }
        } else {
          if (selectedGift || item.gift) {
            setGiftWarn(false);
            if (selectedGift || item.gift) {
              onSave({
                ...item,
                name: formik.values.name,
                gift: (selectedGift || item.gift)!,
                giftsSent: +formik.values.giftsSent,
                daysForGet: +formik.values.daysForGet,
                daysForReceive: +formik.values.daysForReceive,
                description: formik.values.description,
                nums: formik.values.nums,
              });
              clearState();
            }
          } else {
            setGiftWarn(true);
          }
        }
      });
    }
  };

  return (
    <BasicModal title={title} open={open} onClose={clearState}>
      <div className="createModal">
        <Button fullWidth onClick={() => modal.open("gifts")}>
          Выбрать подарок
        </Button>

        {gift ? (
          <span>Подарок: {gift.name}</span>
        ) : giftWarn ? (
          <span className="warn">Необходимо выбрать подарок</span>
        ) : (
          <span>Выберите подарок</span>
        )}

        <ValidationTextField
          name="name"
          label="Название рассылки"
          touched={formik.touched.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          helperText={formik.errors.name}
        />

        <ValidationTextField
          name="giftsSent"
          label="Количесво подарков"
          type="number"
          touched={formik.touched.giftsSent}
          value={formik.values.giftsSent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.giftsSent}
          helperText={formik.errors.giftsSent}
        />

        <ValidationTextField
          name="daysForGet"
          label="Дни до взятия"
          type="number"
          touched={formik.touched.daysForGet}
          value={formik.values.daysForGet}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.daysForGet}
          helperText={formik.errors.daysForGet}
        />

        <ValidationTextField
          name="daysForReceive"
          label="Дни до получения"
          type="number"
          touched={formik.touched.daysForReceive}
          value={formik.values.daysForReceive}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.daysForReceive}
          helperText={formik.errors.daysForReceive}
        />

        <ValidationTextField
          name="description"
          label="Описание"
          touched={formik.touched.description}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          helperText={formik.errors.description}
        />

        <ValidationTextField
          name="nums"
          label="Номера карт"
          touched={formik.touched.nums}
          value={formik.values.nums}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.nums}
          helperText={formik.errors.nums}
        />

        <Button
          className="createModal__save-btn"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onSaveHandler()}
        >
          Сохранить
        </Button>
      </div>
    </BasicModal>
  );
}

export default PromotionFormModal;
