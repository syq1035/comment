import React, { Component } from 'react'
import PropTypes from 'prop-types'
class CommentInput extends Component{
    static propTypes ={
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            username: "",
            content: "",
            createdTime: ""
        }
    }
    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()})
        }
        this.setState({content: ""})
    }
    componentDidMount(){
        this.textarea.focus()
    }
    componentWillMount(){
        this._loadUsername()
    }
    _loadUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({ username })
        }
    }
    //把用户的输入内容保存到 LocalStorage 当中
    _saveUsername(username){
        localStorage.setItem('username',username)
    }
    //把用户输入的内容传给了 _saveUsername 私有方法（所有私有方法都以 _ 开头）
    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }
    render(){
        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username} onBlur={this.handleUsernameBlur.bind(this)} onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea ref={(textarea) => this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                <button onClick={this.handleSubmit.bind(this)}>
                    发布
                </button>
                </div>
            </div>
        )
    }
}
export default CommentInput;