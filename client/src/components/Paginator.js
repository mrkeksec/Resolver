import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPage } from '../actions/tasksActions';

class Paginator extends Component {
constructor(props) {
  super(props);

  this.onChangePage = this.onChangePage.bind(this);
}

  onChangePage(page) {
    console.log(this.props.page)
    console.log(page);
    this.props.setPage(page)
  }

  render() {
    var numbers = [];
    for (let i = 1; i <= Math.ceil(this.props.totalTaskCount / 3); i++) {
      numbers.push(i);
    }

    return numbers.length > 0 ? (
      <ul className="pagination center">
      {
        this.props.page <= 1 ? (
          <li className="page-item disabled">
              <div className="page-linker" title="Back"><i className="material-icons keyboard_arrow_left">keyboard_arrow_left</i></div>
          </li>
        ) :
        (
          <li className="page-item">
              <div className="page-linker" title="Back" onClick={() => this.onChangePage(Number(this.props.page) - 1)}><i className="material-icons keyboard_arrow_left">keyboard_arrow_left</i></div>
          </li>
        )
      }
      {
        numbers.map(number => (
          number == this.props.page ? (
            <li className="page-item active">
                <div className="page-linker" onClick={() => this.onChangePage(number)}>{number} <span className="sr-only">(current)</span></div>
            </li>
          ) :
          (
            <li className="page-item">
          	  <div className="page-linker" onClick={() => this.onChangePage(number)}>{number}</div>
            </li>
          )
        ))
      }
      {
        this.props.page >= numbers.length ? (
          <li className="page-item disabled">
              <div className="page-linker" title="Next"><i className="material-icons keyboard_arrow_right">keyboard_arrow_right</i></div>
          </li>
        ) :
        (
          <li className="page-item">
              <div className="page-linker" title="Next" onClick={() => this.onChangePage(Number(this.props.page) + 1)}><i className="material-icons keyboard_arrow_right">keyboard_arrow_right</i></div>
          </li>
        )
      }
      </ul>
    ) : (<></>)
  }
}

const mapStateToProps = state => ({
  totalTaskCount: state.data.totalTaskCount,
  page: state.data.page
})

export default connect(mapStateToProps, { setPage })(Paginator);
