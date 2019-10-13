import React, { Fragment } from 'react';
import axios from 'axios';
import cx from 'classnames';
import Modal from '../components/Modal';
import styles from './SearchCar.scss';

class SearchCar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            formData: {
                cars: [],
                carsList: [],
                source: null,
                destination: null,
            },
            showSuccessModal: false,
            selectedCar: {},
        };
    }

    componentDidMount() {
        this.getCars();
    }

    getCars = () => {
        axios(`http://localhost:3000/cars/`)
            .then(({ data }) => {
                this.setState({
                    cars: data,
                    carsList: [...data],
                });
            })
    }


    handleSearch = (e) => {
        const { formData, cars, carsList } = this.state;
        const { name, value } = e.target;
        this.setState({
            formData: {
                ...formData,
                [name]: value
            },
            cars: _.filter(carsList, (car) => {
                if (_.includes(_.lowerCase(car[name]), _.lowerCase(value))) return true;
                else false;
            })
        });
    }

    handleConfirmClick = () => {
        const { selectedCar } = this.state;
        if (_.isEmpty(selectedCar)) {
            this.setState({
                error: 'Select a car first!'
            })
            return;
        }

        axios(`http://localhost:3000/cars/`)
            .then(({ data }) => {
                _.forEach(data, (car, index) => {
                    if (car.id === selectedCar.id) {
                        axios.put(`http://localhost:3000/cars/${car.id}/`, {
                            ...car,
                            seatsAvailable: car.seatsAvailable - 1,
                        }).then(() => {
                            this.setState({
                                showSuccessModal: true,
                            })
                            this.getCars();
                        })
                    }
                })
            })
            .catch(e => { });

    }

    handleCarSelect = (car) => {
        this.setState({
            selectedCar: this.state.selectedCar.id !== car.id ? car : {}
        });
    }

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            formData: {
                cars: [],
                carsList: [],
                source: null,
                destination: null,
            },
            showSuccessModal: false,
            selectedCar: {},
        })
    }

    render() {
        const {
            formData,
            error,
            cars,
            selectedCar,
            showSuccessModal
        } = this.state;

        return (
            <Fragment>
                <div className={styles.header}>Pick a Ride</div>
                <div className={styles.container}>
                    <div className={styles.search}>
                        <div className={styles.inputField}>
                            <label htmlFor="source">Start From</label>
                            <input
                                value={formData.source}
                                placeholder="Enter start location" name="source" type="text"
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="destination">Destination</label>
                            <input
                                value={formData.destination}
                                placeholder="Enter destination" name="destination" type="text"
                                onChange={this.handleSearch}
                            />
                        </div>
                    </div>
                    <div className={styles.results}>Search Results</div>
                    <div className={styles.carList}>
                        {
                            _.map(cars, (car, index) => {
                                return (
                                    <div key={index} onClick={() => { this.handleCarSelect(car) }}
                                        className={cx(styles.car,
                                            { [styles.disabled]: car.seatsAvailable === 0 },
                                            { [styles.selected]: car.id === selectedCar.id }
                                        )}>
                                        <div className={styles.icon}></div>
                                        <div className={styles.carInfo}>
                                            {car.name}
                                            <div className={styles.route}>Route: <span>{car.route}</span></div>
                                            <div className={styles.carName}>Car: <span>{car.car}</span></div>
                                            <div className={styles.carName}>Seats Available: <span>{car.seatsAvailable}</span></div>
                                        </div>
                                        <div className={styles.rating}>
                                            Rating: <span>{car.rating}/5</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.error}>{error ? error : null}</div>
                    <div className={styles.btnWrapper}>
                        <button onClick={this.handleConfirmClick} className="btn waves-effect waves-light">Confirm Ride</button>
                    </div>
                </div>
                {
                    showSuccessModal ? (
                        <Modal onClose={this.closeModal} car={selectedCar} onConfirmClick={this.closeModal} />
                    ) : null
                }
            </Fragment>
        )
    }
}

export default SearchCar;