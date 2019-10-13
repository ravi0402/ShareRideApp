import React from 'react';
import styles from './Header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { onStepChange } = this.props;
        onStepChange && onStepChange();
    }

    render() {
        const { activeStep } = this.props;
        let action;

        console.log(activeStep);

        switch (activeStep) {
            case 'Login':
                action = 'Register'
                break;
            case 'Register':
                action = 'Login'
                break;
            case 'SearchCar':
                action = 'Logout'
                break;
        }
        return (
            <div className={styles.header}>
                <div className={styles.text}>SHARE RIDE</div>
                <div className={styles.action} onClick={this.handleClick}>{action}</div>
            </div>
        )
    }
}