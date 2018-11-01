let SubBox = class SubBox extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(1);
        return React.createElement(
            'div',
            null,
            this.props.data.msg,
            this.props.data.msg2
        );
    }
};

let SubBox2 = class SubBox extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(2);
        return React.createElement(
            'div',
            null,
            this.props.data.msg
        );
    }
};
let Box = class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                msg: 'this is data1',
                msg2: "this is data1 msg2",
            },
            data2: []
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: { ...this.state.data, msg: 'this is changed data1' }
            });
        }, 1000);
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(SubBox, { data: this.state.data }),
            React.createElement(SubBox2, { data: this.state.data2 })
        );
    }
};


ReactDOM.render(React.createElement(Box, null), document.getElementById("app"));
