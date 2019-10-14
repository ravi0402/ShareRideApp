import React, { Fragment } from 'react';
import axios from 'axios';
import styles from './SignIn.scss';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: '',
                password: '',
            },
            error: null
        };
    }

    handleUserChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                username: e.target.value,
            },
            error: ''
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                password: e.target.value,
            },
            error: ''
        });
    }

    handleRegisterClick = () => {
        this.props.onRegisterClick();
    }

    handleClick = () => {
        const {
            formData: {
                username,
                password
            }
        } = this.state;

        if (!username) {
            this.setState({
                error: 'Enter username'
            });
            return;
        }

        if (!password) {
            this.setState({
                error: 'Enter password'
            });
            return;
        }

        axios(`http://localhost:3000/users/`)
            .then(({ data }) => {
                data.some(item => {
                    if (item.email === username && item.password === password) {
                        this.setState({
                            error: null
                        })
                        this.props.onSubmit();
                        return;
                    }
                });
                this.setState({
                    error: 'Incorrect Username/Password!'
                })
            }).catch(e => {
                this.setState({
                    error: 'Something went wrong!'
                })
            })
    }

    render() {

        const {
            formData: {
                username,
                password
            },
            error
        } = this.state;

        return (
            <Fragment>
                <div className={styles.header}>Sign-In Now</div>
                <div className={styles.container}>
                    <div className={styles.inputField}>
                        <label htmlFor="username">Username</label>
                        <input
                            name='username'
                            value={username}
                            className={styles.input}
                            placeholder="Enter your email ID"
                            type="text"
                            onChange={this.handleUserChange}
                        />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="password">Password</label>
                        <input
                            name='password'
                            value={password}
                            onChange={this.handlePasswordChange}
                            className={styles.input}
                            type="password"
                        />
                    </div>
                    <div className={styles.error}>{error ? error : null}</div>
                    <div className={styles.btnWrapper}>
                        <button
                            className='btn waves-effect waves-light'
                            type="submit"
                            onClick={this.handleClick}
                        >
                            LOGIN
                    </button>
                    </div>
                </div>
                <div className={styles.registerNow}>
                    Don't have an account? <span onClick={this.handleRegisterClick}>Register</span>
                </div>
            </Fragment>
        )
    }
}