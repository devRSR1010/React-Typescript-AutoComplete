import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import * as PropTypes from 'prop-types';

interface Props {
    data: Array<string>;
}

interface State {
    country: string;
    dropdownOpen: boolean;
    matched: boolean;
    searchWords: Array<string>;
}

class SearchEdit extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            country: '',
            dropdownOpen: false,
            matched: false,
            searchWords: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
    }
    handleOnFocus() {
        this.setState({ dropdownOpen: true })
    }
    handleOnBlur(e: any) {
        if (e.relatedTarget === null || e.relatedTarget.className !== 'dropdown-item') {
            this.setState({ dropdownOpen: false })
        }
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    onClickItem(index: any) {
        this.setState({
            matched: true,
            dropdownOpen: false,
            country: this.state.searchWords[index]
        });
    }
    onAddItem() {
        this.setState({ dropdownOpen: false })
        alert(this.state.country);
    }
    handleChange(event: any) {
        this.setState({ country: event.target.value });
        let count = 0;
        let i = 0;
        let matched = false;
        for (i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i] === event.target.value) {
                matched = true;
                break;
            }
        }

        const searchWords = Array<string>();
        for (i = 0; i < this.props.data.length; i++) {
            if (count === 5) {
                break;
            }
            if (this.props.data[i].includes(event.target.value)) {
                searchWords.push(this.props.data[i]);
                count = count + 1;
            }
        }
        this.setState({ searchWords });
        this.setState({ matched });
    }
    public render() {
        const { country } = this.state;
        return (
            <Col>
                <Row>
                    <Input
                        type="text"
                        placeholder="please input country name"
                        style={{ height: 40, textAlign: 'center', fontSize: 16 }}
                        value={country}
                        onChange={this.handleChange}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleOnBlur}
                    />
                </Row>
                <Row>
                    <Dropdown
                        isOpen={this.state.dropdownOpen}
                        style={this.state.country === '' ?
                            { display: 'none' } :
                            { display: 'flex', flex: 1, marginRight: 20, marginTop: -15 }}
                    >
                        <DropdownToggle
                            caret={true}
                            style={{ color: 'transparent', backgroundColor: 'transparent', marginTop: -20, width: 1, borderColor: 'transparent' }}
                        >
                            Dropdown
                            </DropdownToggle>
                        <DropdownMenu style={{ width: '100%' }}>
                            <DropdownItem
                                style={this.state.matched === true ?
                                    { display: 'none', borderColor: 'transparent' } :
                                    { backgroundColor: '#5b6fc7', display: 'flex', width: '100%' }}
                                onClick={this.onAddItem}
                            >
                                <Row
                                >
                                    <Col>
                                        +
                                    </Col>
                                    <Col>
                                        Add {country}
                                    </Col>
                                </Row>
                            </DropdownItem>
                            {
                                this.state.matched === false ?
                                    this.state.searchWords.map((value, index) =>
                                        (
                                            <DropdownItem
                                                onClick={this.onClickItem.bind(this, index)}
                                            >
                                                {value}
                                            </DropdownItem>
                                        )) :
                                    <DropdownItem
                                        onClick={this.onClickItem.bind(this, 0)}
                                        style={{ backgroundColor: '#5b6fc7' }}
                                    >
                                        {this.state.country}
                                    </DropdownItem>
                            }
                        </DropdownMenu>
                    </Dropdown>

                </Row>
            </Col>
        );
    }
}

Dropdown.propTypes = {
    disabled: PropTypes.bool,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    group: PropTypes.bool,
    isOpen: PropTypes.bool,
    nav: PropTypes.bool,
    active: PropTypes.bool,
    inNavbar: PropTypes.bool,
    tag: PropTypes.string,
    toggle: PropTypes.func,
    setActiveFromChild: PropTypes.bool
};

DropdownToggle.propTypes = {
    caret: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    'data-toggle': PropTypes.string,
    'aria-haspopup': PropTypes.bool,
    nav: PropTypes.bool,
    tag: PropTypes.any
};

DropdownMenu.propTypes = {
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
    right: PropTypes.bool,
    flip: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    modifiers: PropTypes.object,
    persist: PropTypes.bool
};

DropdownItem.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    header: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    toggle: PropTypes.bool
};

export default SearchEdit;