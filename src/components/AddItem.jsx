import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ShopCart from './ShopCart';
import Snackbar from 'material-ui/Snackbar';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            price: 1,
            imgSrc: '../no-image.png'
        }
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleName(e) {
        this.setState({ name: e.target.value })
    }
    handlePrice(e) {
        const val = e.target.value;
        val > 0 ? this.setState({ price: val }) : null;
    }

    addItem = (name, price, imgSrc) => event => {
        name ? this.props.onAdd(name.trim(), price, imgSrc) : null;
        this.setState({ name: '', price: 1, imgSrc: '../no-image.png' });
    }

    handleUpload(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ imgSrc: reader.result, open: true })
        }
    }
    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { name, price, imgSrc } = this.state;
        return (
            <form>
                <TextField
                    type="text"
                    id="uncontrolled"
                    label="Product Name"
                    onChange={this.handleName}
                    value={this.state.name}
                    style={{ 'width': 200, 'marginRight': 10 }}
                />
                <TextField
                    type="number"
                    id="uncontrolled"
                    label="Price $"
                    onChange={this.handlePrice}
                    value={this.state.price}
                    style={{ 'width': 100, 'marginRight': 10 }}
                />
                <input
                    accept="image/*"
                    style={{ 'display': 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={this.handleUpload}
                />
                <label htmlFor="raised-button-file">
                    <Button raised component="span">
                        Upload
                    </Button>
                </label>
                <Button raised color="primary" onClick={this.addItem(name, price, imgSrc)} disabled={!name}>
                    Add
                </Button>
                <Snackbar
                    onClick={this.handleRequestClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Image Uploaded</span>}
                    action={
                        <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
                            Close
                        </Button>
                    }
                />
            </form>
        )
    }
}

export default AddItem;