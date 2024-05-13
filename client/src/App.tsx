import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import Promotion from "./shared/types/Promotion";
import PromotionItem from "./components/PormotionItem/PromotionItem";
import ModalRouter from "./components/modals/ModalRouter";
import { useDispatch, useSelector } from "react-redux";
import getCurrentModal from "./redux/selectors/getCurrentModal";
import useModal from "./hooks/useModal";
import { SearchSharp, CancelRounded } from "@material-ui/icons";
import selectPromotion from "./redux/actions/app/promotions/selectPromotion";
import { RootState } from "./redux/store";
import fetchPromotions from "./redux/thunk/fetchPromotions";
import deletePromotion from "./redux/thunk/deletePromotion";
import queryPromotions from "./redux/thunk/queryPromotions";

function App() {
  const [page, setPage] = useState<number>(0);
  const currentModal = useSelector(getCurrentModal);
  const dispatch = useDispatch<any>();
  const rowsPerPage = 5;

  const [search, setSearch] = useState("");

  const items = useSelector((state: RootState) => state.app.promotions);
  const count = useSelector(
    (state: RootState) => state.app.promotionsTotalCount
  );
  const searchedCount = useSelector(
    (state: RootState) => state.app.searchedCount
  );
  const searchedPromotions = useSelector(
    (state: RootState) => state.app.searchedPromotions
  );

  const modal = useModal();

  const onEdit = useCallback(
    (item: Promotion) => {
      dispatch(selectPromotion(item));
      modal.open("edit");
    },
    [dispatch, modal]
  );

  const onDelete = useCallback(
    (item: Promotion) => {
      dispatch(deletePromotion(item));
    },
    [dispatch]
  );

  const onSearch = (key: string) => {
    if (key === "Enter") {
      dispatch(
        queryPromotions({
          search,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      queryPromotions({
        page: page,
      })
    );
  }, [page, dispatch]);

  return (
    <div className="App">
      <Container maxWidth="md">
        <TextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          size="small"
          value={search}
          onInput={(e) => setSearch((e.target as any).value)}
          onKeyUp={(e) => onSearch(e.key)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharp />
              </InputAdornment>
            ),

            endAdornment: true && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setSearch("")}
              >
                <CancelRounded />
              </IconButton>
            ),
          }}
        />
        <ModalRouter currentModal={currentModal} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название рассылки</TableCell>
              <TableCell>Дата рассылки</TableCell>
              <TableCell>Кол-во подарков</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search && searchedCount
              ? searchedPromotions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <PromotionItem
                      key={item.id}
                      item={item}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))
              : items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <PromotionItem
                      key={item.id}
                      item={item}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))}

            <TableRow>
              {!(search && searchedCount) && (
                <TablePagination
                  count={count}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[rowsPerPage]}
                  page={page}
                  onPageChange={(_, page) => setPage(page)}
                />
              )}
            </TableRow>
          </TableBody>
        </Table>
        <Button
          className="add-btn"
          variant="contained"
          color="primary"
          onClick={() => modal.open("create")}
        >
          Добавить
        </Button>
      </Container>
    </div>
  );
}

export default App;
