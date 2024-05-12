import { useDispatch, useSelector } from "react-redux";
// import getCurrentModal from "../redux/selectors/getCurrentModal";
import modalHistory from "../redux/selectors/modalHistory";
import { useCallback, useEffect } from "react";
import { ModalName } from "../redux/reducers/modalReducer";
import setCurrentModal from "../redux/actions/modals/setCurrentModal";
import historyPush from "../redux/actions/modals/historyPush";
import historyPop from "../redux/actions/modals/historyPop";
import setHistory from "../redux/actions/modals/setHistory";

export default function useModal() {
    // const currentModal = useSelector(getCurrentModal)
    const history = useSelector(modalHistory)
    const dispatch = useDispatch()

    const open = useCallback((name : ModalName) => {
        dispatch(historyPush(name))
    }, [dispatch])

    const back = useCallback(() => {
        dispatch(historyPop())
    }, [dispatch])

    const close = useCallback(() => {
        dispatch(setHistory([]))
    }, [dispatch])

    useEffect(() => {
        // if (history.length) {}
        dispatch(setCurrentModal(history.length ? history.at(-1)! : null))
    }, [dispatch, history])

    return {
        open, back, close
    }
}