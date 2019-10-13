import React, { Component } from 'react';
import Header from '../../components/Header';
import SignIn from '../../components/SignIn';
import SearchCar from '../../components/SearchCar';
import Register from '../../components/Register';
import styles from './index.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: false,
            activeStep: 'Login',
        };
    }

    handleStepChange = () => {
        const { activeStep } = this.state;
        switch (activeStep) {
            case 'Login': {
                this.setState({
                    activeStep: 'Register',
                })
                break;
            }
            case 'Register': {
                this.setState({
                    activeStep: 'Login',
                })
                break;
            }
            case 'SearchCar': {
                this.setState({
                    activeStep: 'Login',
                })
                break;
            }
        }
    }

    handleSubmit = (data) => {
        const { activeStep } = this.state;
        switch (activeStep) {
            case 'Login': {
                this.setState({
                    activeStep: 'SearchCar'
                })
                break;
            }
            case 'Register': {
                this.setState({
                    activeStep: 'Login',
                })
                break;
            }
            case 'SearchCar': {
                this.setState({
                    activeStep: 'Login',
                })
                break;
            }
        }
    }

    handleRegisterClick = () => {
        this.setState({
            activeStep: 'Register'
        });
    }

    render() {

        const {
            activeStep
        } = this.state;

        let contentNode;


        switch (this.state.activeStep) {
            case 'Login': {
                contentNode = (
                    <SignIn onSubmit={this.handleSubmit} onRegisterClick={this.handleRegisterClick} />
                )
                break;
            }

            case 'Register': {
                contentNode = (
                    <Register onSubmit={this.handleSubmit} />
                )
                break;
            }

            case 'SearchCar': {
                contentNode = (
                    <SearchCar onSubmit={this.handleSubmit} />
                )
                break;
            }
            default:
                contentNode = null
                break;
        }
        return (
            <div className={styles.homeWrapper}>
                <Header onStepChange={this.handleStepChange} activeStep={activeStep} />
                {contentNode}
            </div>
        );
    }
};

export default Home;