import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { registerUser } from "../actions/authActions";
import classnames from 'classnames';

class CreateUser extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    onChangePasswordConfirm(e){
        this.setState({
            passwordConfirm: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        this.props.registerUser(user, this.props.history);

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.date));

        this.setState({
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        });
    }
    render (){
        const {errors} = this.state;
        return(
            <div>
                <h3>Create New User</h3>
                <form noValidate onSubmit={this.onSubmit}>
                <div className ="form-group">
                    <label>Username: </label>
                    <span className="red-text">{errors.username}</span>
                    <input type="text"
                        id="username"
                        required
                        className={classnames("", {
                            invalid: errors.username
                          })}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        error={errors.username}
                        />
                    <label>Email: </label>
                    <span className="red-text">{errors.email}</span>
                    <input type="email"
                        id="email"
                        required
                        className={classnames("", {
                            invalid: errors.email
                          })}
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        placeholder="ex: name@email.com"
                        error={errors.email}
                        />
                    <label>Password: </label>
                    <span className="red-text">{errors.password}</span>
                    <input type="password"
                        id="password"
                        required
                        className={classnames("", {
                            invalid: errors.password
                          })}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        error={errors.password}
                        />
                    <label>Confirm Password: </label>
                    <span className="red-text">{errors.passwordConfirm}</span>
                    <input type="password"
                        id="passwordConfirm"
                        required
                        className={classnames("", {
                            invalid: errors.passwordConfirm
                          })}
                        value={this.state.passwordConfirm}
                        onChange={this.onChangePasswordConfirm}
                        error={errors.password}
                        />           

                </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Create User" />
            </div>
                </form>
            </div>
        )
    }
}

CreateUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
) (withRouter(CreateUser));