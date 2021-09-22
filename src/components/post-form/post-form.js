import React from 'react';
import { connect } from 'react-redux';

import { createPost, showAlert } from '../../redux/actions';

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
    }

    submitHandler = event => {
        event.preventDefault();

        const { title } = this.state;

        if (!title.trim()) {
            this.props.showAlert('Введите что-то значимое. Название поста не может быть пустым')
            return;
        }

        const newPost = {
            title,
            id: Date.now().toString()
        };

        this.setState({ title: '' });

        this.props.createPost(newPost);
    }

    changeInputHandler = event => {
        this.setState((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                {this.props.alert && (
                    <div className="alert alert-warning" role="alert">
                        {this.props.alert}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Post title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title"
                        name="title"
                        aria-describedby="title" 
                        value={this.state.title}
                        onChange={this.changeInputHandler}
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.app.alert
})

const mapDispatchToProps = {
    createPost, showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);