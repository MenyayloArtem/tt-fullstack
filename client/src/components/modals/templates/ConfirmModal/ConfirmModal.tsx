import React from 'react';
import "./ConfirmModal.scss"
import { Button } from '@material-ui/core';
import BasicModal from '../BasicModal/BasicModal';

interface Props {
    text : string,
    onAccept : Function,
    onDeny : Function
}

function ConfirmModal ({text, onAccept, onDeny} : Props) {
    return <BasicModal title={text} open={false}>
        <div className="confirmModal">
            <Button variant='contained' color='secondary'
            onClick={() => onDeny()}
            >
                Отмена
            </Button>
            <Button variant="contained" color='primary'
            onClick={() => onAccept()}
            >
                ОК
            </Button>
        </div>
    </BasicModal>
}

export default ConfirmModal