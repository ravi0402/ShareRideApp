import React, { Fragment } from 'react';
// import fetch from 'fetch';
import _ from 'lodash';
import axios from 'axios';
import styles from './Register.scss';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {},
            error: null,
        }
    }

    handleInputChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value,
            },
            error: null
        });
    }

    handleSubmit = () => {
        const { formData } = this.state;
        const {
            fullname,
            email,
            mobilenumber,
            password,
            repassword,
        } = formData;

        if (!fullname) {
            this.setState({
                error: 'Name is a mandatory field',
            })
            return;
        } else if (!mobilenumber) {
            this.setState({
                error: 'Mobile Number is a mandatory field',
            })
            return;
        } else if (!email) {
            this.setState({
                error: 'Email is a mandatory field',
            })
            return;
        } else if (!password) {
            this.setState({
                error: 'Password is a mandatory field',
            })
            return;
        } else if (password !== repassword) {
            this.setState({
                error: 'Password does not match!',
            })
            return;
        }

        axios(`http://localhost:3000/users/`)
            .then(({ data }) => {
                let userId;
                if (data.some(item => {
                    if (item.email === email) {
                        userId = item.id;
                        return true
                    }
                })) {
                    axios.put(`http://localhost:3000/users/${userId}`, formData);
                } else {
                    axios.post(`http://localhost:3000/users/`, { ...formData, id: Math.floor(Math.random() * (999 - 1) + 1) });
                }
            })
            .catch(e => { });

        this.props.onSubmit(formData);
    }

    handleLoginClick = () => {
        this.props.onSubmit();
    }


    render() {
        const {
            error
        } = this.state;

        return (
            <Fragment>
                <div className={styles.header}>Register Now</div>
                <div className={styles.container}>
                    <div className={styles.inputField}>
                        <label htmlFor="fullname">Full Name</label>
                        <input placeholder="Full Name" onChange={this.handleInputChange} name="fullname" type="text" className="validate" placeholder="Enter your firstname and lastname" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="email">Email</label>
                        <input name="email" onChange={this.handleInputChange} type="email" className="validate" placeholder="Enter your email id" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="mobilenumber">Mobile Number</label>
                        <input name="mobilenumber" onChange={this.handleInputChange} type="number" className="validate" placeholder="Enter your 10 digit mobile number" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="password">Password </label>
                        <input name="password" onChange={this.handleInputChange} type="password" className="validate" placeholder="Set your Password" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="repassword"> Renter Password</label>
                        <input name="repassword" onChange={this.handleInputChange} type="password" className="validate" placeholder="Re-enter your password" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="carmodel"> Car Model</label>
                        <input name="carmodel" onChange={this.handleInputChange} type="text" className="validate" placeholder="Name of the car you have" />
                    </div>
                    <div className={styles.error}>{error ? error : null}</div>
                    <div className={styles.btnWrapper}>
                        <button onClick={this.handleSubmit} className="btn waves-effect waves-light">REGISTER</button>
                    </div>
                </div>
                <div className={styles.loginNow}>
                    Already have an account? <span onClick={this.handleLoginClick}>Login</span>
                </div>
            </Fragment>
        )
    }
}

export default Register;