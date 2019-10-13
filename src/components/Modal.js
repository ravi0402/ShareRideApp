import React from 'react';
import Modal from 'react-modal';
import cx from 'classnames';
import styles from './Modal.scss';

export default class SuccessModal extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {
            car,
            onClose,
            onConfirmClick
        } = this.props;

        return (
            <Modal
                isOpen
                onRequestClose={this.props.onClose}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <div className={styles.wrapper}>
                    <div className={styles.text}>Booking Successful!</div>
                    <div className={styles.carInfo}>Car Name:  <span>{car.car}</span></div>
                    <div className={styles.carInfo}>Car Owner's Name: <span>{car.name}</span></div>
                </div>
                <button onClick={onConfirmClick} className={cx(styles.btn, 'btn waves-effect waves-light')}>Book Another Ride</button>
            </Modal>
        )
    }
}